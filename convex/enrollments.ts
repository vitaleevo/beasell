import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getEnrollment = query({
    args: { courseId: v.id("courses") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return null;

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .unique();

        if (!user) return null;

        return await ctx.db
            .query("enrollments")
            .withIndex("by_user_course", (q) =>
                q.eq("userId", user._id).eq("courseId", args.courseId)
            )
            .unique();
    },
});

export const markLessonComplete = mutation({
    args: {
        courseId: v.id("courses"),
        lessonId: v.id("lessons")
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .unique();

        if (!user) throw new Error("User not found");

        const enrollment = await ctx.db
            .query("enrollments")
            .withIndex("by_user_course", (q) =>
                q.eq("userId", user._id).eq("courseId", args.courseId)
            )
            .unique();

        if (!enrollment) throw new Error("Enrollment not found");

        if (!enrollment.completedLessons.includes(args.lessonId)) {
            const updatedLessons = [...enrollment.completedLessons, args.lessonId];
            await ctx.db.patch(enrollment._id, {
                completedLessons: updatedLessons,
            });
        }
    },
});

export const enroll = mutation({
    args: { courseId: v.id("courses") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .unique();

        if (!user) throw new Error("User not found");

        const existing = await ctx.db
            .query("enrollments")
            .withIndex("by_user_course", (q) =>
                q.eq("userId", user._id).eq("courseId", args.courseId)
            )
            .unique();

        if (existing) return existing._id;

        return await ctx.db.insert("enrollments", {
            userId: user._id,
            courseId: args.courseId,
            completedLessons: [],
            enrolledAt: Date.now(),
            progress: 0,
        });
    },
});
