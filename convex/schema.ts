import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        name: v.string(),
        email: v.string(),
        role: v.union(v.literal("admin"), v.literal("student")),
        clerkId: v.string(),
    }).index("by_clerkId", ["clerkId"]),

    courses: defineTable({
        title: v.string(),
        slug: v.string(),
        description: v.string(),
        thumbnailUrl: v.string(),
        price: v.number(),
        isPublished: v.boolean(),
    }).index("by_slug", ["slug"]),

    modules: defineTable({
        courseId: v.id("courses"),
        title: v.string(),
        order: v.number(),
    }).index("by_courseId", ["courseId"]),

    lessons: defineTable({
        moduleId: v.id("modules"),
        title: v.string(),
        type: v.union(v.literal("video"), v.literal("text"), v.literal("quiz")),
        contentUrl: v.string(),
        duration: v.number(),
        order: v.number(),
    }).index("by_moduleId", ["moduleId"]),

    enrollments: defineTable({
        userId: v.id("users"),
        courseId: v.id("courses"),
        completedLessons: v.array(v.id("lessons")),
        completedAt: v.optional(v.number()),
        enrolledAt: v.number(),
        progress: v.number(),
    }).index("by_user", ["userId"])
        .index("by_course", ["courseId"])
        .index("by_user_course", ["userId", "courseId"]),

    posts: defineTable({
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
    }).index("by_slug", ["slug"])
        .index("by_published", ["isPublished", "publishedAt"]),

    categories: defineTable({
        name: v.string(),
        slug: v.string(),
    }).index("by_slug", ["slug"]),

    services: defineTable({
        name: v.string(),
        description: v.string(),
        price: v.number(),
        currency: v.string(),
        duration: v.string(),
        features: v.array(v.string()),
        popular: v.boolean(),
        category: v.string(), // individual, empresarial, workshop, consultoria
    }).index("by_category", ["category"]),

    completions: defineTable({
        userId: v.id("users"),
        lessonId: v.id("lessons"),
        courseId: v.id("courses"),
    }).index("by_user_course", ["userId", "courseId"]),
});
