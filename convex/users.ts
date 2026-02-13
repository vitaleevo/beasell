import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const storeUser = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        clerkId: v.string(),
        role: v.optional(v.union(v.literal("admin"), v.literal("student"))),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
            .unique();

        if (user !== null) {
            // If the user exists, update it if necessary
            await ctx.db.patch(user._id, {
                name: args.name,
                email: args.email,
                // Don't overwrite role if it exists unless explicitly provided
                ...(args.role ? { role: args.role } : {}),
            });
            return user._id;
        }

        // New user
        return await ctx.db.insert("users", {
            name: args.name,
            email: args.email,
            clerkId: args.clerkId,
            role: args.role ?? "student", // Default role
        });
    },
});

export const currentUser = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            return null;
        }
        return await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .unique();
    },
});
export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("users").collect();
    },
});

export const getStats = query({
    args: {},
    handler: async (ctx) => {
        const users = await ctx.db.query("users").collect();
        const courses = await ctx.db.query("courses").collect();
        const enrollments = await ctx.db.query("enrollments").collect();
        const posts = await ctx.db.query("posts").collect();

        return {
            totalStudents: users.filter((u) => u.role === "student").length,
            totalCourses: courses.length,
            activeEnrollments: enrollments.length,
            totalPosts: posts.length,
        };
    },
});
