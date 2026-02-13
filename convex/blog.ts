import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { validateAdmin } from "./utils";

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
        return await ctx.db
            .query("posts")
            .withIndex("by_slug", (q) => q.eq("slug", args.slug))
            .unique();
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
        await validateAdmin(ctx);
        return await ctx.db.insert("posts", args);
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
        await validateAdmin(ctx);
        const { id, ...rest } = args;
        await ctx.db.patch(id, rest);
    },
});
