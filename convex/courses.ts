import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { validateAdmin } from "./utils";

// --- Queries ---

export const list = query({
    args: { onlyPublished: v.optional(v.boolean()) },
    handler: async (ctx, args) => {
        let q = ctx.db.query("courses");
        if (args.onlyPublished) {
            q = q.filter((q) => q.eq(q.field("isPublished"), true));
        }
        return await q.collect();
    },
});

export const getBySlug = query({
    args: { slug: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("courses")
            .withIndex("by_slug", (q) => q.eq("slug", args.slug))
            .unique();
    },
});

export const getFullCourse = query({
    args: { courseId: v.id("courses") },
    handler: async (ctx, args) => {
        const course = await ctx.db.get(args.courseId);
        if (!course) return null;

        const modules = await ctx.db
            .query("modules")
            .withIndex("by_courseId", (q) => q.eq("courseId", args.courseId))
            .collect();

        const modulesWithLessons = await Promise.all(
            modules.map(async (module) => {
                const lessons = await ctx.db
                    .query("lessons")
                    .withIndex("by_moduleId", (q) => q.eq("moduleId", module._id))
                    .collect();
                return {
                    ...module,
                    lessons: lessons.sort((a, b) => a.order - b.order),
                };
            })
        );

        return {
            ...course,
            modules: modulesWithLessons.sort((a, b) => a.order - b.order),
        };
    },
});

// --- Mutations ---

export const createCourse = mutation({
    args: {
        title: v.string(),
        slug: v.string(),
        description: v.string(),
        thumbnailUrl: v.string(),
        price: v.number(),
        isPublished: v.boolean(),
    },
    handler: async (ctx, args) => {
        await validateAdmin(ctx);
        return await ctx.db.insert("courses", args);
    },
});

export const updateCourse = mutation({
    args: {
        id: v.id("courses"),
        title: v.optional(v.string()),
        description: v.optional(v.string()),
        thumbnailUrl: v.optional(v.string()),
        price: v.optional(v.number()),
        isPublished: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        await validateAdmin(ctx);
        const { id, ...rest } = args;
        await ctx.db.patch(id, rest);
    },
});

export const addModule = mutation({
    args: {
        courseId: v.id("courses"),
        title: v.string(),
        order: v.number(),
    },
    handler: async (ctx, args) => {
        await validateAdmin(ctx);
        return await ctx.db.insert("modules", args);
    },
});

export const addLesson = mutation({
    args: {
        moduleId: v.id("modules"),
        title: v.string(),
        type: v.union(v.literal("video"), v.literal("text"), v.literal("quiz")),
        contentUrl: v.string(),
        duration: v.number(),
        order: v.number(),
    },
    handler: async (ctx, args) => {
        await validateAdmin(ctx);
        return await ctx.db.insert("lessons", args);
    },
});

export const deleteModule = mutation({
    args: { id: v.id("modules") },
    handler: async (ctx, args) => {
        await validateAdmin(ctx);
        // Delete all lessons in this module
        const lessons = await ctx.db
            .query("lessons")
            .withIndex("by_moduleId", (q) => q.eq("moduleId", args.id))
            .collect();
        for (const lesson of lessons) {
            await ctx.db.delete(lesson._id);
        }
        return await ctx.db.delete(args.id);
    },
});

export const deleteLesson = mutation({
    args: { id: v.id("lessons") },
    handler: async (ctx, args) => {
        await validateAdmin(ctx);
        return await ctx.db.delete(args.id);
    },
});

export const toggleCompletion = mutation({
    args: {
        lessonId: v.id("lessons"),
        courseId: v.id("courses"),
        completed: v.boolean(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) =>
                q.eq("clerkId", identity.subject)
            )
            .unique();

        if (!user) throw new Error("User not found");

        const existing = await ctx.db
            .query("completions")
            .withIndex("by_user_course", (q) =>
                q.eq("userId", user._id).eq("courseId", args.courseId)
            )
            .filter((q) => q.eq(q.field("lessonId"), args.lessonId))
            .unique();

        if (args.completed && !existing) {
            await ctx.db.insert("completions", {
                userId: user._id,
                lessonId: args.lessonId,
                courseId: args.courseId,
            });
        } else if (!args.completed && existing) {
            await ctx.db.delete(existing._id);
        }
    },
});

export const getUserCompletions = query({
    args: { courseId: v.id("courses") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return [];

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) =>
                q.eq("clerkId", identity.subject)
            )
            .unique();

        if (!user) return [];

        return await ctx.db
            .query("completions")
            .withIndex("by_user_course", (q) =>
                q.eq("userId", user._id).eq("courseId", args.courseId)
            )
            .collect();
    },
});

export const enroll = mutation({
    args: { courseId: v.id("courses") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) =>
                q.eq("clerkId", identity.subject)
            )
            .unique();

        if (!user) throw new Error("User not found");

        const existing = await ctx.db
            .query("enrollments")
            .withIndex("by_user_course", (q) =>
                q.eq("userId", user._id).eq("courseId", args.courseId)
            )
            .unique();

        if (!existing) {
            await ctx.db.insert("enrollments", {
                userId: user._id,
                courseId: args.courseId,
                enrolledAt: Date.now(),
                progress: 0,
                completedLessons: [],
            });
        }
    },
});

export const checkEnrollment = query({
    args: { courseId: v.id("courses") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return false;

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) =>
                q.eq("clerkId", identity.subject)
            )
            .unique();

        if (!user) return false;

        const enrollment = await ctx.db
            .query("enrollments")
            .withIndex("by_user_course", (q) =>
                q.eq("userId", user._id).eq("courseId", args.courseId)
            )
            .unique();

        return !!enrollment;
    },
});
