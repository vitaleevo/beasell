import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.optional(v.string()),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    email: v.string(),
    role: v.optional(v.union(v.literal("admin"), v.literal("super_admin"), v.literal("student"))),
    authUserId: v.optional(v.string()),
    clerkId: v.optional(v.string()),
    status: v.optional(v.string()),
    createdAt: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
    stats: v.optional(
      v.object({
        certificatesEarned: v.number(),
        completedCourses: v.number(),
        currentStreak: v.number(),
        lastActive: v.number(),
        totalCourses: v.number(),
        totalStudyTime: v.number(),
      }),
    ),
  }).index("by_authUserId", ["authUserId"]),

  courses: defineTable({
    title: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    shortDescription: v.optional(v.string()),
    fullDescription: v.optional(v.string()),
    thumbnailUrl: v.string(),
    price: v.number(),
    isPublished: v.optional(v.boolean()),
    status: v.optional(v.union(v.literal("draft"), v.literal("published"), v.literal("archived"))),
    category: v.optional(v.string()),
    currency: v.optional(v.string()),
    language: v.optional(v.string()),
    level: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    objectives: v.optional(v.array(v.string())),
    requirements: v.optional(v.array(v.string())),
    isFree: v.optional(v.boolean()),
    allowPreview: v.optional(v.boolean()),
    certificateEnabled: v.optional(v.boolean()),
    hasPromotion: v.optional(v.boolean()),
    createdAt: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
    publishedAt: v.optional(v.number()),
    createdBy: v.optional(v.string()),
    updatedBy: v.optional(v.string()),
    instructor: v.optional(
      v.object({
        name: v.string(),
        userId: v.string(),
      }),
    ),
    stats: v.optional(
      v.object({
        activeEnrollments: v.number(),
        completions: v.number(),
        enrollments: v.number(),
        totalRatings: v.number(),
        totalRevenue: v.number(),
      }),
    ),
  }).index("by_slug", ["slug"]),

  modules: defineTable({
    courseId: v.id("courses"),
    title: v.string(),
    order: v.number(),
    status: v.optional(v.string()),
    createdAt: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
    stats: v.optional(
      v.object({
        completionRate: v.number(),
        totalDuration: v.number(),
        totalLessons: v.number(),
      }),
    ),
  }).index("by_courseId", ["courseId"]),

  lessons: defineTable({
    moduleId: v.id("modules"),
    courseId: v.optional(v.id("courses")),
    title: v.string(),
    type: v.union(v.literal("video"), v.literal("text"), v.literal("quiz")),
    contentUrl: v.optional(v.string()),
    duration: v.optional(v.number()),
    videoUrl: v.optional(v.string()),
    videoDuration: v.optional(v.number()),
    videoProvider: v.optional(v.string()),
    isFree: v.optional(v.boolean()),
    isRequired: v.optional(v.boolean()),
    allowDownload: v.optional(v.boolean()),
    attachments: v.optional(v.array(v.any())),
    createdAt: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
    stats: v.optional(
      v.object({
        averageWatchTime: v.number(),
        completions: v.number(),
        dropoffRate: v.number(),
        views: v.number(),
      }),
    ),
    order: v.number(),
  }).index("by_moduleId", ["moduleId"]),

  enrollments: defineTable({
    userId: v.id("users"),
    courseId: v.id("courses"),
    completedLessons: v.optional(v.array(v.id("lessons"))),
    completedAt: v.optional(v.number()),
    enrolledAt: v.number(),
    progress: v.number(),
    status: v.optional(v.string()),
    accessGranted: v.optional(v.boolean()),
    amountPaid: v.optional(v.number()),
    amountDue: v.optional(v.number()),
    certificateIssued: v.optional(v.boolean()),
    paymentMethod: v.optional(v.string()),
    paymentStatus: v.optional(
      v.union(
        v.literal("not_required"),
        v.literal("pending"),
        v.literal("submitted"),
        v.literal("approved"),
        v.literal("rejected"),
      ),
    ),
    paymentReference: v.optional(v.string()),
    paymentProofUrl: v.optional(v.string()),
    paymentProofStorageId: v.optional(v.id("_storage")),
    paymentNotes: v.optional(v.string()),
    paymentSubmittedAt: v.optional(v.number()),
    paymentReviewedAt: v.optional(v.number()),
    paymentReviewedBy: v.optional(v.id("users")),
    totalWatchTime: v.optional(v.number()),
  })
    .index("by_user", ["userId"])
    .index("by_course", ["courseId"])
    .index("by_user_course", ["userId", "courseId"]),

  payments: defineTable({
    enrollmentId: v.id("enrollments"),
    userId: v.id("users"),
    courseId: v.id("courses"),
    amount: v.number(),
    currency: v.string(),
    method: v.optional(v.string()),
    reference: v.optional(v.string()),
    proofUrl: v.optional(v.string()),
    proofStorageId: v.optional(v.id("_storage")),
    status: v.union(
      v.literal("pending"),
      v.literal("submitted"),
      v.literal("approved"),
      v.literal("rejected"),
    ),
    adminNote: v.optional(v.string()),
    submittedAt: v.optional(v.number()),
    reviewedAt: v.optional(v.number()),
    reviewedBy: v.optional(v.id("users")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_enrollment", ["enrollmentId"])
    .index("by_user", ["userId"])
    .index("by_course", ["courseId"])
    .index("by_status", ["status"]),

  auditLogs: defineTable({
    actorUserId: v.optional(v.id("users")),
    actorEmail: v.optional(v.string()),
    actorRole: v.optional(v.string()),
    action: v.string(),
    resourceType: v.string(),
    resourceId: v.optional(v.string()),
    summary: v.string(),
    metadata: v.optional(v.any()),
    createdAt: v.number(),
  })
    .index("by_createdAt", ["createdAt"])
    .index("by_actor", ["actorUserId", "createdAt"])
    .index("by_resource", ["resourceType", "resourceId", "createdAt"])
    .index("by_action", ["action", "createdAt"]),

  rateLimits: defineTable({
    key: v.string(),
    action: v.string(),
    windowStartedAt: v.number(),
    count: v.number(),
    updatedAt: v.number(),
  }).index("by_key_action", ["key", "action"]),

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
  })
    .index("by_slug", ["slug"])
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
    createdAt: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
    createdBy: v.optional(v.id("users")),
    updatedBy: v.optional(v.id("users")),
  }).index("by_category", ["category"]),

  completions: defineTable({
    userId: v.id("users"),
    lessonId: v.id("lessons"),
    courseId: v.id("courses"),
    completedAt: v.optional(v.number()),
  }).index("by_user_course", ["userId", "courseId"]),

  certificates: defineTable({
    userId: v.id("users"),
    courseId: v.id("courses"),
    enrollmentId: v.id("enrollments"),
    certificateNumber: v.string(),
    verificationCode: v.string(),
    recipientName: v.string(),
    courseTitle: v.string(),
    instructorName: v.string(),
    issuedAt: v.number(),
    completedAt: v.number(),
    progress: v.number(),
    totalLessons: v.number(),
    completedLessons: v.number(),
    status: v.union(v.literal("active"), v.literal("revoked")),
  })
    .index("by_user", ["userId"])
    .index("by_course", ["courseId"])
    .index("by_user_course", ["userId", "courseId"])
    .index("by_verificationCode", ["verificationCode"]),
});
