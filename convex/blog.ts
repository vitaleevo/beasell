import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { canReadRestrictedContent, getCurrentAppUser, validateAdmin } from "./authorization";
import type { MutationCtx } from "./_generated/server";
import { getChangedFields, writeAuditLog } from "./audit";
import { assertRateLimit, userRateLimitKey } from "./rateLimit";

function cleanRequiredString(value: string, field: string, maxLength = 20000) {
    const trimmed = value.trim();
    if (!trimmed) {
        throw new Error(`${field} e obrigatorio.`);
    }
    if (trimmed.length > maxLength) {
        throw new Error(`${field} deve ter no maximo ${maxLength} caracteres.`);
    }

    return trimmed;
}

function cleanSlug(value: string) {
    const slug = cleanRequiredString(value, "Slug", 120).toLowerCase();
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
        throw new Error("Slug deve conter apenas letras, numeros e hifens.");
    }

    return slug;
}

function cleanTags(tags: string[]) {
    return tags.map((tag) => tag.trim()).filter(Boolean).slice(0, 20);
}

function cleanTimestamp(value: number) {
    if (!Number.isFinite(value) || value < 0) {
        throw new Error("Data de publicacao invalida.");
    }

    return Math.round(value);
}

async function requireRateLimitedAdmin(ctx: MutationCtx) {
    await validateAdmin(ctx);
    const admin = await getCurrentAppUser(ctx);
    if (admin) {
        await assertRateLimit(ctx, {
            key: userRateLimitKey(admin._id),
            action: "blog.admin_write",
            limit: 80,
            windowMs: 60 * 60 * 1000,
        });
    }

    return admin;
}

export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("posts")
            .filter((q) => q.eq(q.field("isPublished"), true))
            .order("desc")
            .collect();
    },
});

export const getBySlug = query({
    args: { slug: v.string() },
    handler: async (ctx, args) => {
        const post = await ctx.db
            .query("posts")
            .withIndex("by_slug", (q) => q.eq("slug", args.slug))
            .unique();

        if (!post || post.isPublished) {
            return post;
        }

        const user = await getCurrentAppUser(ctx);
        return canReadRestrictedContent(user?.role) ? post : null;
    },
});

export const listFeatured = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("posts")
            .filter((q) =>
                q.and(
                    q.eq(q.field("isPublished"), true),
                    q.eq(q.field("isFeatured"), true)
                )
            )
            .collect();
    },
});

export const listCategories = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("categories").collect();
    },
});
export const listAll = query({
    args: {},
    handler: async (ctx) => {
        await validateAdmin(ctx);
        return await ctx.db.query("posts").order("desc").collect();
    },
});

export const createPost = mutation({
    args: {
        title: v.string(),
        slug: v.string(),
        content: v.string(),
        excerpt: v.string(),
        author: v.string(),
        category: v.string(),
        tags: v.array(v.string()),
        image: v.string(),
        isPublished: v.boolean(),
        isFeatured: v.boolean(),
        publishedAt: v.number(),
    },
    handler: async (ctx, args) => {
        const admin = await requireRateLimitedAdmin(ctx);
        const slug = cleanSlug(args.slug);
        const existing = await ctx.db
            .query("posts")
            .withIndex("by_slug", (q) => q.eq("slug", slug))
            .unique();
        if (existing) {
            throw new Error("Ja existe um artigo com este slug.");
        }

        const payload = {
            title: cleanRequiredString(args.title, "Titulo", 180),
            slug,
            content: cleanRequiredString(args.content, "Conteudo"),
            excerpt: cleanRequiredString(args.excerpt, "Resumo", 500),
            author: cleanRequiredString(args.author, "Autor", 120),
            category: cleanRequiredString(args.category, "Categoria", 120),
            tags: cleanTags(args.tags),
            image: cleanRequiredString(args.image, "Imagem", 1000),
            isPublished: args.isPublished,
            isFeatured: args.isFeatured,
            publishedAt: cleanTimestamp(args.publishedAt),
        };
        const postId = await ctx.db.insert("posts", payload);
        await writeAuditLog(ctx, {
            actor: admin,
            action: "blog.post.created",
            resourceType: "post",
            resourceId: postId,
            summary: `${admin?.email ?? "Admin"} criou o artigo '${payload.title}'.`,
            metadata: {
                postId,
                slug,
                isPublished: payload.isPublished,
                isFeatured: payload.isFeatured,
            },
        });

        return postId;
    },
});

export const updatePost = mutation({
    args: {
        id: v.id("posts"),
        title: v.optional(v.string()),
        content: v.optional(v.string()),
        excerpt: v.optional(v.string()),
        isPublished: v.optional(v.boolean()),
        isFeatured: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const admin = await requireRateLimitedAdmin(ctx);
        const { id, ...rest } = args;
        const postBefore = await ctx.db.get(id);
        if (!postBefore) {
            throw new Error("Artigo nao encontrado.");
        }

        const patch = {
            ...(rest.title !== undefined
                ? { title: cleanRequiredString(rest.title, "Titulo", 180) }
                : {}),
            ...(rest.content !== undefined
                ? { content: cleanRequiredString(rest.content, "Conteudo") }
                : {}),
            ...(rest.excerpt !== undefined
                ? { excerpt: cleanRequiredString(rest.excerpt, "Resumo", 500) }
                : {}),
            ...(rest.isPublished !== undefined ? { isPublished: rest.isPublished } : {}),
            ...(rest.isFeatured !== undefined ? { isFeatured: rest.isFeatured } : {}),
        };
        await ctx.db.patch(id, patch);

        const changedFields = getChangedFields(postBefore, patch, [
            "title",
            "content",
            "excerpt",
            "isPublished",
            "isFeatured",
        ]);

        if (changedFields.length > 0) {
            await writeAuditLog(ctx, {
                actor: admin,
                action: "blog.post.updated",
                resourceType: "post",
                resourceId: id,
                summary: `${admin?.email ?? "Admin"} actualizou o artigo '${
                    patch.title ?? postBefore.title
                }'.`,
                metadata: {
                    postId: id,
                    changedFields,
                    isPublished: patch.isPublished ?? postBefore.isPublished,
                    isFeatured: patch.isFeatured ?? postBefore.isFeatured,
                },
            });
        }
    },
});
