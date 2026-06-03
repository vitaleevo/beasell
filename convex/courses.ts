import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import type { MutationCtx, QueryCtx } from "./_generated/server";
import type { Doc, Id } from "./_generated/dataModel";
import {
  canReadRestrictedContent,
  getCurrentAppUser,
  getOrCreateCurrentAppUser,
  isPublicPublishedListing,
  validateAdmin,
} from "./authorization";
import { calculateCourseProgress } from "./courseProgress";
import {
  getPaymentProofUrl,
  rejectLegacyPaymentProofUrl,
  validatePaymentProofStorage,
} from "./paymentProof";
import { getChangedFields, writeAuditLog } from "./audit";
import { assertRateLimit, userRateLimitKey } from "./rateLimit";

type CourseDoc = Doc<"courses">;
type EnrollmentDoc = Doc<"enrollments">;
type LessonDoc = Doc<"lessons">;

function isCoursePublished(course: CourseDoc) {
  return course.isPublished === true || course.status === "published";
}

function normalizeCourse(course: CourseDoc) {
  return {
    ...course,
    description: course.description ?? course.shortDescription ?? "",
    isPublished: isCoursePublished(course),
  };
}

function getLessonDuration(lesson: LessonDoc) {
  return lesson.duration ?? lesson.videoDuration ?? 0;
}

function toPublicLesson(lesson: LessonDoc) {
  return {
    _id: lesson._id,
    moduleId: lesson.moduleId,
    courseId: lesson.courseId,
    title: lesson.title,
    type: lesson.type,
    duration: getLessonDuration(lesson),
    isFree: lesson.isFree ?? false,
    order: lesson.order,
  };
}

async function getModulesWithLessons(ctx: QueryCtx | MutationCtx, courseId: Id<"courses">) {
  const modules = await ctx.db
    .query("modules")
    .withIndex("by_courseId", (q) => q.eq("courseId", courseId))
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
    }),
  );

  return modulesWithLessons.sort((a, b) => a.order - b.order);
}

async function getEnrollment(
  ctx: QueryCtx | MutationCtx,
  userId: Id<"users"> | undefined,
  courseId: Id<"courses">,
) {
  if (!userId) return null;

  return await ctx.db
    .query("enrollments")
    .withIndex("by_user_course", (q) => q.eq("userId", userId).eq("courseId", courseId))
    .unique();
}

async function getCourseCompletions(
  ctx: QueryCtx | MutationCtx,
  userId: Id<"users"> | undefined,
  courseId: Id<"courses">,
) {
  if (!userId) return [];

  return await ctx.db
    .query("completions")
    .withIndex("by_user_course", (q) => q.eq("userId", userId).eq("courseId", courseId))
    .collect();
}

async function getActiveCertificate(
  ctx: QueryCtx | MutationCtx,
  userId: Id<"users"> | undefined,
  courseId: Id<"courses">,
) {
  if (!userId) return null;

  return await ctx.db
    .query("certificates")
    .withIndex("by_user_course", (q) => q.eq("userId", userId).eq("courseId", courseId))
    .filter((q) => q.eq(q.field("status"), "active"))
    .first();
}

function getUserDisplayName(user: Doc<"users">) {
  const nameFromParts = [user.firstName, user.lastName].filter(Boolean).join(" ");
  return user.name || nameFromParts || user.email || "Aluno Beasell";
}

function certificateEnabled(course: CourseDoc) {
  return course.certificateEnabled !== false;
}

function isPaymentRequired(course: CourseDoc) {
  return !course.isFree && course.price > 0;
}

function cleanOptionalString(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function cleanRequiredString(value: string, field: string, maxLength = 5000) {
  const trimmed = value.trim();
  if (!trimmed) {
    throw new Error(`${field} e obrigatorio.`);
  }
  if (trimmed.length > maxLength) {
    throw new Error(`${field} deve ter no maximo ${maxLength} caracteres.`);
  }

  return trimmed;
}

function cleanStringList(value: string[] | undefined) {
  const list = (value ?? []).map((item) => item.trim()).filter(Boolean);
  return list.length > 0 ? list : undefined;
}

function cleanSlug(value: string) {
  const slug = cleanRequiredString(value, "Slug", 120).toLowerCase();
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error("Slug deve conter apenas letras, numeros e hifens.");
  }

  return slug;
}

function cleanCurrency(value: string | undefined) {
  const currency = cleanOptionalString(value)?.toUpperCase() ?? "AOA";
  if (!/^[A-Z]{3}$/.test(currency)) {
    throw new Error("Moeda deve usar codigo ISO de 3 letras.");
  }

  return currency;
}

function validateNonNegativeNumber(value: number, field: string) {
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`${field} deve ser um numero valido maior ou igual a zero.`);
  }

  return Math.round(value);
}

async function requireRateLimitedAdmin(ctx: MutationCtx) {
  await validateAdmin(ctx);
  const admin = await getCurrentAppUser(ctx);
  if (admin) {
    await assertRateLimit(ctx, {
      key: userRateLimitKey(admin._id),
      action: "course.admin_write",
      limit: 80,
      windowMs: 60 * 60 * 1000,
    });
  }

  return admin;
}

function detectVideoProvider(source: string | undefined) {
  if (!source) return undefined;

  try {
    const url = new URL(source);
    const host = url.hostname.replace(/^www\./, "");

    if (
      host === "youtu.be" ||
      host === "youtube.com" ||
      host === "m.youtube.com" ||
      host === "youtube-nocookie.com"
    ) {
      return "youtube" as const;
    }

    if (host.endsWith("vimeo.com")) {
      return "vimeo" as const;
    }
  } catch {
    return undefined;
  }

  return undefined;
}

function resolveVideoProvider({
  type,
  contentUrl,
  videoProvider,
}: {
  type: "video" | "text" | "quiz";
  contentUrl: string | undefined;
  videoProvider: "youtube" | "vimeo" | undefined;
}) {
  if (type !== "video") return undefined;

  if (!contentUrl?.trim()) {
    throw new Error("Informe o URL do video da aula.");
  }

  const provider = videoProvider ?? detectVideoProvider(contentUrl);
  if (!provider) {
    throw new Error("Use um URL de video do YouTube ou Vimeo.");
  }

  return provider;
}

function getEnrollmentPaymentStatus(enrollment: EnrollmentDoc | null, course: CourseDoc) {
  if (!isPaymentRequired(course)) return "not_required" as const;
  if (!enrollment) return "not_enrolled" as const;
  if (enrollment.paymentStatus) return enrollment.paymentStatus;
  return enrollment.accessGranted === false ? ("pending" as const) : ("approved" as const);
}

function hasLearningAccess(enrollment: EnrollmentDoc | null, course: CourseDoc) {
  if (!enrollment) return false;
  if (!isPaymentRequired(course)) return true;
  if (enrollment.accessGranted === true) return true;
  if (enrollment.paymentStatus === "approved") return true;
  if (!enrollment.paymentStatus && enrollment.accessGranted !== false) return true;
  return false;
}

async function getPaymentSummary(
  ctx: QueryCtx | MutationCtx,
  enrollment: EnrollmentDoc | null,
  course: CourseDoc,
) {
  const requiresPayment = isPaymentRequired(course);
  const status = getEnrollmentPaymentStatus(enrollment, course);
  const proofUrl = await getPaymentProofUrl(
    ctx,
    enrollment?.paymentProofStorageId,
    enrollment?.paymentProofUrl,
  );
  const payment = enrollment
    ? await ctx.db
        .query("payments")
        .withIndex("by_enrollment", (q) => q.eq("enrollmentId", enrollment._id))
        .first()
    : null;

  return {
    requiresPayment,
    status,
    canAccessLessons: !requiresPayment || hasLearningAccess(enrollment, course),
    amountDue: requiresPayment ? (enrollment?.amountDue ?? course.price) : 0,
    amountPaid: enrollment?.amountPaid ?? 0,
    reference: enrollment?.paymentReference ?? null,
    proofUrl,
    proofStorageId: enrollment?.paymentProofStorageId ?? null,
    method: enrollment?.paymentMethod ?? null,
    adminNote: payment?.adminNote ?? null,
    submittedAt: enrollment?.paymentSubmittedAt ?? null,
    reviewedAt: enrollment?.paymentReviewedAt ?? null,
  };
}

function buildCertificateNumber(now: number, enrollmentId: Id<"enrollments">) {
  return `BEA-${new Date(now).getFullYear()}-${now
    .toString(36)
    .toUpperCase()}-${enrollmentId.slice(-4).toUpperCase()}`;
}

async function issueCertificateIfEligible({
  ctx,
  user,
  course,
  enrollment,
  completedAt,
  progress,
  totalLessons,
  completedLessons,
}: {
  ctx: MutationCtx;
  user: Doc<"users">;
  course: CourseDoc;
  enrollment: Doc<"enrollments">;
  completedAt: number;
  progress: number;
  totalLessons: number;
  completedLessons: number;
}) {
  if (!certificateEnabled(course) || progress < 100 || totalLessons === 0) {
    return null;
  }

  const existing = await ctx.db
    .query("certificates")
    .withIndex("by_user_course", (q) => q.eq("userId", user._id).eq("courseId", course._id))
    .filter((q) => q.eq(q.field("status"), "active"))
    .first();

  if (existing) {
    if (!enrollment.certificateIssued) {
      await ctx.db.patch(enrollment._id, { certificateIssued: true });
    }
    return existing;
  }

  const issuedAt = Date.now();
  const certificateNumber = buildCertificateNumber(issuedAt, enrollment._id);
  const verificationCode = certificateNumber.replace(/-/g, "");

  const certificateId = await ctx.db.insert("certificates", {
    userId: user._id,
    courseId: course._id,
    enrollmentId: enrollment._id,
    certificateNumber,
    verificationCode,
    recipientName: getUserDisplayName(user),
    courseTitle: course.title,
    instructorName: course.instructor?.name ?? "Beasell Angola",
    issuedAt,
    completedAt,
    progress,
    totalLessons,
    completedLessons,
    status: "active",
  });

  await ctx.db.patch(enrollment._id, { certificateIssued: true });
  return await ctx.db.get(certificateId);
}

async function syncCertificateStateAfterProgressChange({
  ctx,
  userId,
  courseId,
  isCompleted,
}: {
  ctx: MutationCtx;
  userId: Id<"users">;
  courseId: Id<"courses">;
  isCompleted: boolean;
}) {
  if (isCompleted) return;

  const activeCertificate = await ctx.db
    .query("certificates")
    .withIndex("by_user_course", (q) => q.eq("userId", userId).eq("courseId", courseId))
    .filter((q) => q.eq(q.field("status"), "active"))
    .first();

  if (activeCertificate) {
    await ctx.db.patch(activeCertificate._id, { status: "revoked" });
  }
}

async function updateEnrollmentProgress(
  ctx: MutationCtx,
  userId: Id<"users">,
  courseId: Id<"courses">,
) {
  const enrollment = await getEnrollment(ctx, userId, courseId);
  if (!enrollment) return null;

  const user = await ctx.db.get(userId);
  const course = await ctx.db.get(courseId);
  if (!user || !course) return null;

  const modules = await getModulesWithLessons(ctx, courseId);
  const lessonIds = modules.flatMap((module) => module.lessons.map((lesson) => lesson._id));
  const completions = await getCourseCompletions(ctx, userId, courseId);
  const progressResult = calculateCourseProgress({
    lessonIds,
    completedLessonIds: completions.map((completion) => completion.lessonId),
  });
  const now = Date.now();
  const completedAt = enrollment.completedAt ?? now;

  const enrollmentPatch: {
    completedLessons: Id<"lessons">[];
    progress: number;
    status: string;
    completedAt?: number;
    certificateIssued?: boolean;
  } = {
    completedLessons: progressResult.completedLessonIds,
    progress: progressResult.progress,
    status: progressResult.isCompleted ? "completed" : "active",
  };

  if (progressResult.isCompleted) {
    enrollmentPatch.completedAt = completedAt;
  } else {
    enrollmentPatch.certificateIssued = false;
  }

  await ctx.db.patch(enrollment._id, enrollmentPatch);
  if (progressResult.isCompleted) {
    await issueCertificateIfEligible({
      ctx,
      user,
      course,
      enrollment,
      completedAt,
      progress: progressResult.progress,
      totalLessons: progressResult.totalLessons,
      completedLessons: progressResult.completedLessons,
    });
  } else {
    await syncCertificateStateAfterProgressChange({
      ctx,
      userId,
      courseId,
      isCompleted: progressResult.isCompleted,
    });
  }
  await updateCourseStats(ctx, courseId);

  return progressResult;
}

async function updateCourseStats(ctx: MutationCtx, courseId: Id<"courses">) {
  const course = await ctx.db.get(courseId);
  if (!course) return;

  const enrollments = await ctx.db
    .query("enrollments")
    .withIndex("by_course", (q) => q.eq("courseId", courseId))
    .collect();

  await ctx.db.patch(courseId, {
    stats: {
      activeEnrollments: enrollments.filter((enrollment) => enrollment.status !== "completed")
        .length,
      completions: enrollments.filter((enrollment) => enrollment.status === "completed").length,
      enrollments: enrollments.length,
      totalRatings: course.stats?.totalRatings ?? 0,
      totalRevenue: enrollments.reduce(
        (total, enrollment) => total + (enrollment.amountPaid ?? 0),
        0,
      ),
    },
  });
}

export const list = query({
  args: { onlyPublished: v.optional(v.boolean()) },
  handler: async (ctx, args) => {
    if (!isPublicPublishedListing(args.onlyPublished)) {
      await validateAdmin(ctx);
    }

    const courses = await ctx.db.query("courses").collect();
    const visibleCourses = args.onlyPublished ? courses.filter(isCoursePublished) : courses;

    return visibleCourses.map(normalizeCourse);
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const course = await ctx.db
      .query("courses")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();

    if (!course) {
      return null;
    }

    const normalizedCourse = normalizeCourse(course);
    if (normalizedCourse.isPublished) {
      return normalizedCourse;
    }

    const user = await getCurrentAppUser(ctx);
    return canReadRestrictedContent(user?.role) ? normalizedCourse : null;
  },
});

export const getFullCourse = query({
  args: { courseId: v.id("courses") },
  handler: async (ctx, args) => {
    await validateAdmin(ctx);

    const course = await ctx.db.get(args.courseId);
    if (!course) return null;

    const modulesWithLessons = await getModulesWithLessons(ctx, args.courseId);

    return {
      ...normalizeCourse(course),
      modules: modulesWithLessons,
    };
  },
});

export const getCourseOverviewBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const course = await ctx.db
      .query("courses")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();

    if (!course) return null;

    const user = await getCurrentAppUser(ctx);
    const canViewDraft = canReadRestrictedContent(user?.role);
    if (!isCoursePublished(course) && !canViewDraft) {
      return null;
    }

    const modules = await getModulesWithLessons(ctx, course._id);
    const publicModules = modules.map((module) => ({
      ...module,
      lessons: module.lessons.map(toPublicLesson),
    }));
    const allLessons = publicModules.flatMap((module) => module.lessons);
    const enrollment = await getEnrollment(ctx, user?._id, course._id);
    const completions = enrollment ? await getCourseCompletions(ctx, user?._id, course._id) : [];
    const certificate = enrollment ? await getActiveCertificate(ctx, user?._id, course._id) : null;
    const progressResult = calculateCourseProgress({
      lessonIds: allLessons.map((lesson) => lesson._id),
      completedLessonIds: completions.map((completion) => completion.lessonId),
    });

    return {
      course: normalizeCourse(course),
      modules: publicModules,
      enrollment,
      payment: await getPaymentSummary(ctx, enrollment, course),
      totalLessons: allLessons.length,
      totalDuration: allLessons.reduce((total, lesson) => total + lesson.duration, 0),
      completedLessons: progressResult.completedLessons,
      completedLessonIds: progressResult.completedLessonIds,
      progress: progressResult.progress,
      certificate,
      firstLessonId: allLessons[0]?._id ?? null,
    };
  },
});

export const getLearningSession = query({
  args: {
    slug: v.string(),
    lessonId: v.optional(v.id("lessons")),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentAppUser(ctx);
    if (!user) {
      return { authRequired: true };
    }

    const course = await ctx.db
      .query("courses")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();

    if (!course) return null;

    const canViewDraft = canReadRestrictedContent(user.role);
    if (!isCoursePublished(course) && !canViewDraft) {
      return null;
    }

    const modules = await getModulesWithLessons(ctx, course._id);
    const allLessons = modules.flatMap((module) => module.lessons);
    const selectedLesson =
      (args.lessonId ? allLessons.find((lesson) => lesson._id === args.lessonId) : allLessons[0]) ??
      null;

    const enrollment = await getEnrollment(ctx, user._id, course._id);
    const canAccessLessons = canViewDraft || hasLearningAccess(enrollment, course);
    if (!canAccessLessons) {
      return {
        requiresEnrollment: true,
        requiresPayment: Boolean(enrollment),
        course: normalizeCourse(course),
        modules: modules.map((module) => ({
          ...module,
          lessons: module.lessons.map(toPublicLesson),
        })),
        enrollment,
        payment: await getPaymentSummary(ctx, enrollment, course),
        firstLessonId: allLessons[0]?._id ?? null,
      };
    }

    const completions = await getCourseCompletions(ctx, user._id, course._id);
    const certificate = await getActiveCertificate(ctx, user._id, course._id);
    const progressResult = calculateCourseProgress({
      lessonIds: allLessons.map((lesson) => lesson._id),
      completedLessonIds: completions.map((completion) => completion.lessonId),
    });
    const completedLessonIds = new Set(progressResult.completedLessonIds);
    const currentIndex = selectedLesson
      ? allLessons.findIndex((lesson) => lesson._id === selectedLesson._id)
      : -1;

    return {
      authRequired: false,
      requiresEnrollment: false,
      course: normalizeCourse(course),
      modules: modules.map((module) => ({
        ...module,
        lessons: module.lessons.map((lesson) => ({
          ...toPublicLesson(lesson),
          isCompleted: completedLessonIds.has(lesson._id),
          isActive: selectedLesson?._id === lesson._id,
        })),
      })),
      lesson: selectedLesson,
      enrollment,
      payment: await getPaymentSummary(ctx, enrollment, course),
      totalLessons: progressResult.totalLessons,
      completedLessons: progressResult.completedLessons,
      completedLessonIds: progressResult.completedLessonIds,
      progress: progressResult.progress,
      certificate,
      previousLessonId: currentIndex > 0 ? allLessons[currentIndex - 1]._id : null,
      nextLessonId:
        currentIndex >= 0 && currentIndex < allLessons.length - 1
          ? allLessons[currentIndex + 1]._id
          : null,
      firstLessonId: allLessons[0]?._id ?? null,
    };
  },
});

export const getMyCourses = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentAppUser(ctx);
    if (!user) return [];

    const enrollments = await ctx.db
      .query("enrollments")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    const rows = await Promise.all(
      enrollments.map(async (enrollment) => {
        const course = await ctx.db.get(enrollment.courseId);
        if (!course) return null;

        const modules = await getModulesWithLessons(ctx, course._id);
        const lessons = modules.flatMap((module) => module.lessons);
        const certificate = await getActiveCertificate(ctx, user._id, course._id);

        return {
          enrollment,
          course: normalizeCourse(course),
          payment: await getPaymentSummary(ctx, enrollment, course),
          totalLessons: lessons.length,
          firstLessonId: lessons[0]?._id ?? null,
          certificate,
        };
      }),
    );

    return rows
      .filter((row): row is NonNullable<typeof row> => row !== null)
      .sort((a, b) => b.enrollment.enrolledAt - a.enrollment.enrolledAt);
  },
});

const rangeInMs = {
  "7d": 7 * 24 * 60 * 60 * 1000,
  "30d": 30 * 24 * 60 * 60 * 1000,
  "90d": 90 * 24 * 60 * 60 * 1000,
  "1y": 365 * 24 * 60 * 60 * 1000,
};

const monthLabels = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];
const dayLabels = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

function percentage(value: number, total: number) {
  if (total <= 0) return 0;
  return Math.round((value / total) * 100);
}

function monthKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}`;
}

export const getAdminAnalytics = query({
  args: {
    range: v.optional(
      v.union(v.literal("7d"), v.literal("30d"), v.literal("90d"), v.literal("1y")),
    ),
  },
  handler: async (ctx, args) => {
    await validateAdmin(ctx);

    const range = args.range ?? "30d";
    const now = Date.now();
    const rangeStart = now - rangeInMs[range];

    const users = await ctx.db.query("users").collect();
    const courses = await ctx.db.query("courses").collect();
    const enrollments = await ctx.db.query("enrollments").collect();
    const posts = await ctx.db.query("posts").collect();

    const students = users.filter((user) => user.role === "student");
    const periodEnrollments = enrollments.filter(
      (enrollment) => enrollment.enrolledAt >= rangeStart,
    );
    const completedEnrollments = enrollments.filter(
      (enrollment) => enrollment.status === "completed",
    );
    const totalRevenue = periodEnrollments.reduce(
      (total, enrollment) => total + (enrollment.amountPaid ?? 0),
      0,
    );
    const averageProgress =
      enrollments.length === 0
        ? 0
        : Math.round(
            enrollments.reduce((total, enrollment) => total + enrollment.progress, 0) /
              enrollments.length,
          );

    const revenueBuckets = new Map<string, { month: string; revenue: number; students: number }>();
    for (let offset = 5; offset >= 0; offset -= 1) {
      const date = new Date(now);
      date.setMonth(date.getMonth() - offset);
      revenueBuckets.set(monthKey(date), {
        month: monthLabels[date.getMonth()],
        revenue: 0,
        students: 0,
      });
    }

    for (const enrollment of enrollments) {
      const date = new Date(enrollment.enrolledAt);
      const bucket = revenueBuckets.get(monthKey(date));
      if (!bucket) continue;
      bucket.revenue += enrollment.amountPaid ?? 0;
      bucket.students += 1;
    }

    const activityBuckets = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(now);
      date.setDate(date.getDate() - (6 - index));
      return {
        day: dayLabels[date.getDay()],
        registrations: 0,
      };
    });

    for (const user of users) {
      const createdAt = user.createdAt ?? 0;
      if (createdAt < now - 7 * 24 * 60 * 60 * 1000) continue;
      const daysAgo = Math.floor((now - createdAt) / (24 * 60 * 60 * 1000));
      const bucketIndex = 6 - daysAgo;
      if (activityBuckets[bucketIndex]) {
        activityBuckets[bucketIndex].registrations += 1;
      }
    }

    const courseEngagement = courses
      .map((course) => {
        const courseEnrollments = enrollments.filter(
          (enrollment) => enrollment.courseId === course._id,
        );
        const courseCompletions = courseEnrollments.filter(
          (enrollment) => enrollment.status === "completed",
        );

        return {
          course: course.title,
          completion: percentage(courseCompletions.length, courseEnrollments.length),
          enrolled: courseEnrollments.length,
          revenue: courseEnrollments.reduce(
            (total, enrollment) => total + (enrollment.amountPaid ?? 0),
            0,
          ),
        };
      })
      .sort((a, b) => b.enrolled - a.enrolled)
      .slice(0, 6);

    const publishedCourses = courses.filter(isCoursePublished).length;
    const archivedCourses = courses.filter((course) => course.status === "archived").length;
    const draftCourses = courses.length - publishedCourses - archivedCourses;

    return {
      stats: {
        totalRevenue,
        totalStudents: students.length,
        activeCourses: publishedCourses,
        totalCourses: courses.length,
        activeEnrollments: enrollments.filter((enrollment) => enrollment.status !== "completed")
          .length,
        periodEnrollments: periodEnrollments.length,
        totalPosts: posts.length,
        completionRate: percentage(completedEnrollments.length, enrollments.length),
        averageProgress,
      },
      revenueData: Array.from(revenueBuckets.values()),
      userActivity: activityBuckets,
      courseDistribution: [
        { name: "Publicados", value: publishedCourses, color: "#1d4ed8" },
        { name: "Rascunhos", value: Math.max(draftCourses, 0), color: "#f97316" },
        { name: "Arquivados", value: archivedCourses, color: "#64748b" },
      ].filter((item) => item.value > 0),
      courseEngagement,
    };
  },
});

export const createCourse = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    fullDescription: v.optional(v.string()),
    thumbnailUrl: v.string(),
    price: v.number(),
    currency: v.optional(v.string()),
    category: v.optional(v.string()),
    language: v.optional(v.string()),
    level: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    objectives: v.optional(v.array(v.string())),
    requirements: v.optional(v.array(v.string())),
    instructorName: v.optional(v.string()),
    isFree: v.optional(v.boolean()),
    allowPreview: v.optional(v.boolean()),
    hasPromotion: v.optional(v.boolean()),
    isPublished: v.boolean(),
    certificateEnabled: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const admin = await requireRateLimitedAdmin(ctx);
    const slug = cleanSlug(args.slug);
    const existing = await ctx.db
      .query("courses")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();

    if (existing) {
      throw new Error("Ja existe um curso com este slug.");
    }

    const now = Date.now();
    const title = cleanRequiredString(args.title, "Titulo", 160);
    const description = cleanRequiredString(args.description, "Descricao", 5000);
    const thumbnailUrl = cleanRequiredString(args.thumbnailUrl, "Imagem do curso", 1000);
    const price = validateNonNegativeNumber(args.price, "Preco");
    const currency = cleanCurrency(args.currency);
    const instructorName = cleanOptionalString(args.instructorName);
    const isFree = args.isFree ?? price <= 0;

    const courseId = await ctx.db.insert("courses", {
      title,
      slug,
      description,
      shortDescription: description,
      fullDescription: cleanOptionalString(args.fullDescription),
      thumbnailUrl,
      price: isFree ? 0 : price,
      status: args.isPublished ? "published" : "draft",
      isPublished: args.isPublished,
      currency,
      category: cleanOptionalString(args.category),
      language: cleanOptionalString(args.language) ?? "pt",
      level: cleanOptionalString(args.level),
      tags: cleanStringList(args.tags),
      objectives: cleanStringList(args.objectives),
      requirements: cleanStringList(args.requirements),
      isFree,
      allowPreview: args.allowPreview ?? true,
      hasPromotion: args.hasPromotion ?? false,
      certificateEnabled: args.certificateEnabled ?? true,
      createdAt: now,
      updatedAt: now,
      createdBy: admin?._id,
      updatedBy: admin?._id,
      instructor: instructorName && admin ? { name: instructorName, userId: admin._id } : undefined,
      publishedAt: args.isPublished ? now : undefined,
      stats: {
        activeEnrollments: 0,
        completions: 0,
        enrollments: 0,
        totalRatings: 0,
        totalRevenue: 0,
      },
    });

    await writeAuditLog(ctx, {
      actor: admin,
      action: "course.created",
      resourceType: "course",
      resourceId: courseId,
      summary: `${admin?.email ?? "Admin"} criou o curso '${title}'.`,
      metadata: {
        courseId,
        price: isFree ? 0 : price,
        currency,
        isPublished: args.isPublished,
      },
    });

    return courseId;
  },
});

export const updateCourse = mutation({
  args: {
    id: v.id("courses"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    fullDescription: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),
    price: v.optional(v.number()),
    currency: v.optional(v.string()),
    category: v.optional(v.string()),
    language: v.optional(v.string()),
    level: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    objectives: v.optional(v.array(v.string())),
    requirements: v.optional(v.array(v.string())),
    instructorName: v.optional(v.string()),
    isFree: v.optional(v.boolean()),
    allowPreview: v.optional(v.boolean()),
    hasPromotion: v.optional(v.boolean()),
    isPublished: v.optional(v.boolean()),
    certificateEnabled: v.optional(v.boolean()),
    slug: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const admin = await requireRateLimitedAdmin(ctx);
    const { id, instructorName, ...rest } = args;
    const courseBefore = await ctx.db.get(id);
    if (!courseBefore) {
      throw new Error("Curso nao encontrado.");
    }

    const nextSlug = rest.slug === undefined ? undefined : cleanSlug(rest.slug);
    if (nextSlug !== undefined) {
      const existing = await ctx.db
        .query("courses")
        .withIndex("by_slug", (q) => q.eq("slug", nextSlug))
        .unique();

      if (existing && existing._id !== id) {
        throw new Error("Ja existe outro curso com este slug.");
      }
    }

    const patch: Partial<Omit<CourseDoc, "_id" | "_creationTime">> = {
      updatedAt: Date.now(),
      updatedBy: admin?._id,
    };

    if (rest.title !== undefined) patch.title = cleanRequiredString(rest.title, "Titulo", 160);
    if (nextSlug !== undefined) patch.slug = nextSlug;
    if (rest.description !== undefined) {
      patch.description = cleanRequiredString(rest.description, "Descricao", 5000);
    }
    if (rest.fullDescription !== undefined) {
      patch.fullDescription = cleanOptionalString(rest.fullDescription);
    }
    if (rest.thumbnailUrl !== undefined) {
      patch.thumbnailUrl = cleanRequiredString(rest.thumbnailUrl, "Imagem do curso", 1000);
    }
    if (rest.currency !== undefined) patch.currency = cleanCurrency(rest.currency);
    if (rest.category !== undefined) patch.category = cleanOptionalString(rest.category);
    if (rest.language !== undefined) patch.language = cleanOptionalString(rest.language) ?? "pt";
    if (rest.level !== undefined) patch.level = cleanOptionalString(rest.level);
    if (rest.tags !== undefined) patch.tags = cleanStringList(rest.tags);
    if (rest.objectives !== undefined) patch.objectives = cleanStringList(rest.objectives);
    if (rest.requirements !== undefined) patch.requirements = cleanStringList(rest.requirements);
    if (rest.isFree !== undefined) patch.isFree = rest.isFree;
    if (rest.allowPreview !== undefined) patch.allowPreview = rest.allowPreview;
    if (rest.hasPromotion !== undefined) patch.hasPromotion = rest.hasPromotion;
    if (rest.certificateEnabled !== undefined) {
      patch.certificateEnabled = rest.certificateEnabled;
    }

    if (rest.description !== undefined) {
      patch.shortDescription = patch.description;
    }

    if (rest.price !== undefined) {
      patch.price = rest.isFree ? 0 : validateNonNegativeNumber(rest.price, "Preco");
    } else if (rest.isFree === true) {
      patch.price = 0;
    }

    if (instructorName !== undefined) {
      const cleanedInstructorName = cleanOptionalString(instructorName);
      patch.instructor =
        cleanedInstructorName && admin
          ? { name: cleanedInstructorName, userId: admin._id }
          : undefined;
    }

    if (rest.isPublished !== undefined) {
      patch.isPublished = rest.isPublished;
      patch.status = rest.isPublished ? "published" : "draft";
      if (rest.isPublished) {
        patch.publishedAt = Date.now();
      }
    }

    await ctx.db.patch(id, patch);

    const changedFields = getChangedFields(courseBefore, patch, [
      "title",
      "slug",
      "description",
      "fullDescription",
      "thumbnailUrl",
      "price",
      "currency",
      "category",
      "language",
      "level",
      "tags",
      "objectives",
      "requirements",
      "isFree",
      "allowPreview",
      "hasPromotion",
      "certificateEnabled",
      "isPublished",
      "status",
    ]);

    if (changedFields.length > 0 || instructorName !== undefined) {
      await writeAuditLog(ctx, {
        actor: admin,
        action: "course.updated",
        resourceType: "course",
        resourceId: id,
        summary: `${admin?.email ?? "Admin"} actualizou o curso '${patch.title ?? courseBefore.title}'.`,
        metadata: {
          courseId: id,
          changedFields,
          priceBefore: courseBefore.price,
          priceAfter: patch.price ?? courseBefore.price,
          published: patch.isPublished ?? courseBefore.isPublished ?? false,
        },
      });
    }
  },
});

export const addModule = mutation({
  args: {
    courseId: v.id("courses"),
    title: v.string(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    const admin = await requireRateLimitedAdmin(ctx);
    const title = cleanRequiredString(args.title, "Titulo do modulo", 160);
    const order = validateNonNegativeNumber(args.order, "Ordem do modulo");
    const moduleId = await ctx.db.insert("modules", {
      ...args,
      title,
      order,
      status: "published",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      stats: {
        completionRate: 0,
        totalDuration: 0,
        totalLessons: 0,
      },
    });

    await writeAuditLog(ctx, {
      actor: admin,
      action: "module.created",
      resourceType: "course",
      resourceId: args.courseId,
      summary: `${admin?.email ?? "Admin"} criou o modulo '${title}'.`,
      metadata: {
        courseId: args.courseId,
        moduleId,
        order,
      },
    });

    return moduleId;
  },
});

export const updateModule = mutation({
  args: {
    id: v.id("modules"),
    title: v.string(),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const admin = await requireRateLimitedAdmin(ctx);
    const moduleBefore = await ctx.db.get(args.id);
    if (!moduleBefore) {
      throw new Error("Modulo nao encontrado.");
    }

    const patch: { title: string; order?: number; updatedAt: number } = {
      title: cleanRequiredString(args.title, "Titulo do modulo", 160),
      updatedAt: Date.now(),
    };

    if (args.order !== undefined) {
      patch.order = validateNonNegativeNumber(args.order, "Ordem do modulo");
    }

    await ctx.db.patch(args.id, patch);

    await writeAuditLog(ctx, {
      actor: admin,
      action: "module.updated",
      resourceType: "course",
      resourceId: moduleBefore.courseId,
      summary: `${admin?.email ?? "Admin"} actualizou o modulo '${patch.title}'.`,
      metadata: {
        courseId: moduleBefore.courseId,
        moduleId: args.id,
        changedFields: getChangedFields(moduleBefore, patch, ["title", "order"]),
      },
    });
  },
});

export const addLesson = mutation({
  args: {
    moduleId: v.id("modules"),
    title: v.string(),
    type: v.union(v.literal("video"), v.literal("text"), v.literal("quiz")),
    contentUrl: v.string(),
    videoProvider: v.optional(v.union(v.literal("youtube"), v.literal("vimeo"))),
    duration: v.number(),
    order: v.number(),
    isFree: v.optional(v.boolean()),
    isRequired: v.optional(v.boolean()),
    allowDownload: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const admin = await requireRateLimitedAdmin(ctx);
    const moduleDoc = await ctx.db.get(args.moduleId);
    if (!moduleDoc) {
      throw new Error("Modulo nao encontrado.");
    }
    const title = cleanRequiredString(args.title, "Titulo da aula", 160);
    const contentUrl = cleanRequiredString(args.contentUrl, "Conteudo da aula", 50000);
    const duration = validateNonNegativeNumber(args.duration, "Duracao da aula");
    const order = validateNonNegativeNumber(args.order, "Ordem da aula");
    const videoProvider = resolveVideoProvider({
      type: args.type,
      contentUrl,
      videoProvider: args.videoProvider,
    });

    const lessonId = await ctx.db.insert("lessons", {
      ...args,
      title,
      contentUrl,
      courseId: moduleDoc.courseId,
      videoUrl: args.type === "video" ? contentUrl : undefined,
      videoProvider,
      duration,
      order,
      videoDuration: duration,
      isRequired: args.isRequired ?? true,
      isFree: args.isFree ?? false,
      allowDownload: args.allowDownload ?? false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      stats: {
        averageWatchTime: 0,
        completions: 0,
        dropoffRate: 0,
        views: 0,
      },
    });

    await writeAuditLog(ctx, {
      actor: admin,
      action: "lesson.created",
      resourceType: "course",
      resourceId: moduleDoc.courseId,
      summary: `${admin?.email ?? "Admin"} criou a aula '${title}'.`,
      metadata: {
        courseId: moduleDoc.courseId,
        moduleId: args.moduleId,
        lessonId,
        type: args.type,
        videoProvider,
        isFree: args.isFree ?? false,
      },
    });

    return lessonId;
  },
});

export const updateLesson = mutation({
  args: {
    id: v.id("lessons"),
    title: v.string(),
    type: v.union(v.literal("video"), v.literal("text"), v.literal("quiz")),
    contentUrl: v.optional(v.string()),
    videoProvider: v.optional(v.union(v.literal("youtube"), v.literal("vimeo"))),
    duration: v.optional(v.number()),
    order: v.optional(v.number()),
    isFree: v.optional(v.boolean()),
    isRequired: v.optional(v.boolean()),
    allowDownload: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const admin = await requireRateLimitedAdmin(ctx);
    const lesson = await ctx.db.get(args.id);
    if (!lesson) {
      throw new Error("Aula nao encontrada.");
    }

    const existingProvider =
      lesson.videoProvider === "youtube" || lesson.videoProvider === "vimeo"
        ? lesson.videoProvider
        : undefined;
    const nextContentUrl =
      args.contentUrl === undefined
        ? lesson.contentUrl ?? lesson.videoUrl
        : cleanRequiredString(args.contentUrl, "Conteudo da aula", 50000);
    const patch: Partial<Omit<LessonDoc, "_id" | "_creationTime">> = {
      title: cleanRequiredString(args.title, "Titulo da aula", 160),
      type: args.type,
      isFree: args.isFree ?? lesson.isFree ?? false,
      updatedAt: Date.now(),
    };
    const videoProvider = resolveVideoProvider({
      type: args.type,
      contentUrl: nextContentUrl,
      videoProvider: args.videoProvider ?? existingProvider,
    });

    if (args.contentUrl !== undefined) {
      patch.contentUrl = nextContentUrl;
      if (args.type === "video") {
        patch.videoUrl = nextContentUrl;
        patch.videoProvider = videoProvider;
      } else {
        patch.videoUrl = undefined;
        patch.videoProvider = undefined;
      }
    }

    if (args.duration !== undefined) {
      patch.duration = validateNonNegativeNumber(args.duration, "Duracao da aula");
      patch.videoDuration = patch.duration;
    }

    if (args.order !== undefined) {
      patch.order = validateNonNegativeNumber(args.order, "Ordem da aula");
    }

    if (args.isRequired !== undefined) {
      patch.isRequired = args.isRequired;
    }

    if (args.allowDownload !== undefined) {
      patch.allowDownload = args.allowDownload;
    }

    await ctx.db.patch(args.id, patch);

    await writeAuditLog(ctx, {
      actor: admin,
      action: "lesson.updated",
      resourceType: "course",
      resourceId: lesson.courseId,
      summary: `${admin?.email ?? "Admin"} actualizou a aula '${patch.title}'.`,
      metadata: {
        courseId: lesson.courseId,
        moduleId: lesson.moduleId,
        lessonId: args.id,
        type: args.type,
        changedFields: getChangedFields(lesson, patch, [
          "title",
          "type",
          "contentUrl",
          "duration",
          "videoProvider",
          "isFree",
          "isRequired",
          "allowDownload",
          "order",
        ]),
      },
    });
  },
});

export const deleteModule = mutation({
  args: { id: v.id("modules") },
  handler: async (ctx, args) => {
    const admin = await requireRateLimitedAdmin(ctx);
    const moduleDoc = await ctx.db.get(args.id);
    if (!moduleDoc) {
      throw new Error("Modulo nao encontrado.");
    }

    const lessons = await ctx.db
      .query("lessons")
      .withIndex("by_moduleId", (q) => q.eq("moduleId", args.id))
      .collect();

    for (const lesson of lessons) {
      await ctx.db.delete(lesson._id);
    }

    await ctx.db.delete(args.id);

    await writeAuditLog(ctx, {
      actor: admin,
      action: "module.deleted",
      resourceType: "course",
      resourceId: moduleDoc.courseId,
      summary: `${admin?.email ?? "Admin"} removeu o modulo '${moduleDoc.title}'.`,
      metadata: {
        courseId: moduleDoc.courseId,
        moduleId: args.id,
        lessonsDeleted: lessons.length,
      },
    });
  },
});

export const deleteLesson = mutation({
  args: { id: v.id("lessons") },
  handler: async (ctx, args) => {
    const admin = await requireRateLimitedAdmin(ctx);
    const lesson = await ctx.db.get(args.id);
    if (!lesson) {
      throw new Error("Aula nao encontrada.");
    }

    await ctx.db.delete(args.id);

    await writeAuditLog(ctx, {
      actor: admin,
      action: "lesson.deleted",
      resourceType: "course",
      resourceId: lesson.courseId,
      summary: `${admin?.email ?? "Admin"} removeu a aula '${lesson.title}'.`,
      metadata: {
        courseId: lesson.courseId,
        moduleId: lesson.moduleId,
        lessonId: args.id,
        type: lesson.type,
      },
    });
  },
});

async function validateLessonCourse(
  ctx: QueryCtx | MutationCtx,
  courseId: Id<"courses">,
  lessonId: Id<"lessons">,
) {
  const lesson = await ctx.db.get(lessonId);
  if (!lesson) {
    throw new Error("Aula nao encontrada.");
  }

  const moduleDoc = await ctx.db.get(lesson.moduleId);
  if (!moduleDoc || moduleDoc.courseId !== courseId) {
    throw new Error("Aula nao pertence a este curso.");
  }
}

export const toggleCompletion = mutation({
  args: {
    lessonId: v.id("lessons"),
    courseId: v.id("courses"),
    completed: v.boolean(),
  },
  handler: async (ctx, args) => {
    const user = await getOrCreateCurrentAppUser(ctx);
    await validateLessonCourse(ctx, args.courseId, args.lessonId);

    const enrollment = await ctx.db
      .query("enrollments")
      .withIndex("by_user_course", (q) => q.eq("userId", user._id).eq("courseId", args.courseId))
      .unique();

    if (!enrollment) {
      throw new Error("Inscricao obrigatoria para concluir aulas.");
    }

    const course = await ctx.db.get(args.courseId);
    if (!course || !hasLearningAccess(enrollment, course)) {
      throw new Error("Pagamento aprovado obrigatorio para concluir aulas deste curso.");
    }

    const existing = await ctx.db
      .query("completions")
      .withIndex("by_user_course", (q) => q.eq("userId", user._id).eq("courseId", args.courseId))
      .filter((q) => q.eq(q.field("lessonId"), args.lessonId))
      .unique();

    if (args.completed && !existing) {
      await ctx.db.insert("completions", {
        userId: user._id,
        lessonId: args.lessonId,
        courseId: args.courseId,
        completedAt: Date.now(),
      });
    } else if (!args.completed && existing) {
      await ctx.db.delete(existing._id);
    }

    return await updateEnrollmentProgress(ctx, user._id, args.courseId);
  },
});

export const getUserCompletions = query({
  args: { courseId: v.id("courses") },
  handler: async (ctx, args) => {
    const user = await getCurrentAppUser(ctx);
    if (!user) return [];

    const enrollment = await ctx.db
      .query("enrollments")
      .withIndex("by_user_course", (q) => q.eq("userId", user._id).eq("courseId", args.courseId))
      .unique();

    if (!enrollment) return [];

    return await ctx.db
      .query("completions")
      .withIndex("by_user_course", (q) => q.eq("userId", user._id).eq("courseId", args.courseId))
      .collect();
  },
});

export const enroll = mutation({
  args: {
    courseId: v.id("courses"),
    paymentMethod: v.optional(v.string()),
    paymentReference: v.optional(v.string()),
    paymentProofUrl: v.optional(v.string()),
    paymentProofStorageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const user = await getOrCreateCurrentAppUser(ctx);
    const course = await ctx.db.get(args.courseId);

    await assertRateLimit(ctx, {
      key: userRateLimitKey(user._id),
      action: "course.enroll",
      limit: 20,
      windowMs: 60 * 60 * 1000,
    });

    if (!course || !isCoursePublished(course)) {
      throw new Error("Curso indisponivel.");
    }

    const existing = await ctx.db
      .query("enrollments")
      .withIndex("by_user_course", (q) => q.eq("userId", user._id).eq("courseId", args.courseId))
      .unique();

    if (existing) {
      await updateCourseStats(ctx, args.courseId);
      return existing._id;
    }

    const now = Date.now();
    const requiresPayment = isPaymentRequired(course);
    rejectLegacyPaymentProofUrl(args.paymentProofUrl);
    await validatePaymentProofStorage(ctx, args.paymentProofStorageId);
    const hasPaymentSubmission = Boolean(
      args.paymentReference || args.paymentProofUrl || args.paymentProofStorageId,
    );
    const paymentStatus = requiresPayment
      ? hasPaymentSubmission
        ? "submitted"
        : "pending"
      : "not_required";
    const enrollmentId = await ctx.db.insert("enrollments", {
      userId: user._id,
      courseId: args.courseId,
      enrolledAt: now,
      progress: 0,
      completedLessons: [],
      status: requiresPayment ? "pending_payment" : "active",
      accessGranted: !requiresPayment,
      amountDue: requiresPayment ? course.price : 0,
      amountPaid: 0,
      certificateIssued: false,
      paymentMethod: args.paymentMethod,
      paymentStatus,
      paymentReference: args.paymentReference,
      paymentProofUrl: args.paymentProofUrl,
      paymentProofStorageId: args.paymentProofStorageId,
      paymentSubmittedAt: hasPaymentSubmission ? now : undefined,
      totalWatchTime: 0,
    });

    if (requiresPayment) {
      await ctx.db.insert("payments", {
        enrollmentId,
        userId: user._id,
        courseId: args.courseId,
        amount: course.price,
        currency: course.currency ?? "AOA",
        method: args.paymentMethod,
        reference: args.paymentReference,
        proofUrl: args.paymentProofUrl,
        proofStorageId: args.paymentProofStorageId,
        status: hasPaymentSubmission ? "submitted" : "pending",
        submittedAt: hasPaymentSubmission ? now : undefined,
        createdAt: now,
        updatedAt: now,
      });
    }

    await updateCourseStats(ctx, args.courseId);
    await writeAuditLog(ctx, {
      actor: user,
      action: requiresPayment ? "course.enrollment.payment_pending" : "course.enrollment.created",
      resourceType: "course",
      resourceId: args.courseId,
      summary: `${user.email} inscreveu-se no curso '${course.title}'.`,
      metadata: {
        courseId: args.courseId,
        enrollmentId,
        requiresPayment,
        paymentStatus,
        hasPaymentSubmission,
      },
    });

    return enrollmentId;
  },
});

export const checkEnrollment = query({
  args: { courseId: v.id("courses") },
  handler: async (ctx, args) => {
    const user = await getCurrentAppUser(ctx);
    if (!user) return false;

    const enrollment = await ctx.db
      .query("enrollments")
      .withIndex("by_user_course", (q) => q.eq("userId", user._id).eq("courseId", args.courseId))
      .unique();

    return !!enrollment;
  },
});
