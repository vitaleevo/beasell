import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import type { QueryCtx } from "./_generated/server";
import type { Doc, Id } from "./_generated/dataModel";
import { getCurrentAppUser, getOrCreateCurrentAppUser, validateAdmin } from "./authorization";

export const ensureCurrentUser = mutation({
  args: {},
  handler: async (ctx) => {
    return await getOrCreateCurrentAppUser(ctx);
  },
});

export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    return await getCurrentAppUser(ctx);
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    await validateAdmin(ctx);
    return await ctx.db.query("users").collect();
  },
});

export const listStudentsForAdmin = query({
  args: {},
  handler: async (ctx) => {
    await validateAdmin(ctx);

    const [users, enrollments, certificates] = await Promise.all([
      ctx.db.query("users").collect(),
      ctx.db.query("enrollments").collect(),
      ctx.db.query("certificates").collect(),
    ]);
    const students = users.filter((user) => user.role === "student");
    const enrollmentsByUser = new Map<Doc<"users">["_id"], Doc<"enrollments">[]>();
    const activeCertificatesByUser = new Map<Doc<"users">["_id"], number>();

    for (const enrollment of enrollments) {
      const rows = enrollmentsByUser.get(enrollment.userId) ?? [];
      rows.push(enrollment);
      enrollmentsByUser.set(enrollment.userId, rows);
    }

    for (const certificate of certificates) {
      if (certificate.status !== "active") continue;
      activeCertificatesByUser.set(
        certificate.userId,
        (activeCertificatesByUser.get(certificate.userId) ?? 0) + 1,
      );
    }

    return students
      .map((user) => {
        const studentEnrollments = enrollmentsByUser.get(user._id) ?? [];
        const lastActivity = Math.max(
          0,
          user.updatedAt ?? 0,
          ...studentEnrollments.map((enrollment) => enrollment.enrolledAt),
          ...studentEnrollments.map((enrollment) => enrollment.completedAt ?? 0),
          ...studentEnrollments.map((enrollment) => enrollment.paymentSubmittedAt ?? 0),
          ...studentEnrollments.map((enrollment) => enrollment.paymentReviewedAt ?? 0),
        );

        return {
          user: {
            _id: user._id,
            name: displayName(user),
            email: user.email,
            imageUrl: user.imageUrl ?? null,
            status: user.status ?? "active",
            createdAt: user.createdAt ?? null,
            updatedAt: user.updatedAt ?? null,
          },
          stats: {
            totalCourses: studentEnrollments.length,
            activeEnrollments: studentEnrollments.filter(
              (enrollment) => enrollment.status !== "completed",
            ).length,
            completedCourses: studentEnrollments.filter(
              (enrollment) => enrollment.status === "completed",
            ).length,
            pendingPayments: studentEnrollments.filter((enrollment) =>
              ["pending", "submitted"].includes(enrollment.paymentStatus ?? ""),
            ).length,
            rejectedPayments: studentEnrollments.filter(
              (enrollment) => enrollment.paymentStatus === "rejected",
            ).length,
            approvedPayments: studentEnrollments.filter(
              (enrollment) => enrollment.paymentStatus === "approved",
            ).length,
            certificatesEarned: activeCertificatesByUser.get(user._id) ?? 0,
            averageProgress: averageProgress(studentEnrollments),
            totalAmountPaid: studentEnrollments.reduce(
              (total, enrollment) => total + (enrollment.amountPaid ?? 0),
              0,
            ),
            lastActivity: lastActivity || null,
          },
        };
      })
      .sort((a, b) => (b.stats.lastActivity ?? 0) - (a.stats.lastActivity ?? 0));
  },
});

export const getStats = query({
  args: {},
  handler: async (ctx) => {
    await validateAdmin(ctx);

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

function displayName(user: Doc<"users"> | null | undefined) {
  if (!user) return "Utilizador";
  const nameFromParts = [user.firstName, user.lastName].filter(Boolean).join(" ");
  return user.name || nameFromParts || user.email || "Utilizador";
}

async function getCourseLessons(ctx: QueryCtx, courseId: Id<"courses">) {
  const modules = await ctx.db
    .query("modules")
    .withIndex("by_courseId", (q) => q.eq("courseId", courseId))
    .collect();

  const moduleRows = await Promise.all(
    modules
      .sort((a, b) => a.order - b.order)
      .map(async (module) => {
        const lessons = await ctx.db
          .query("lessons")
          .withIndex("by_moduleId", (q) => q.eq("moduleId", module._id))
          .collect();

        return {
          module,
          lessons: lessons.sort((a, b) => a.order - b.order),
        };
      }),
  );

  return moduleRows.flatMap((row) =>
    row.lessons.map((lesson) => ({
      ...lesson,
      moduleTitle: row.module.title,
    })),
  );
}

function averageProgress(enrollments: Doc<"enrollments">[]) {
  if (enrollments.length === 0) return 0;
  return Math.round(
    enrollments.reduce((total, enrollment) => total + enrollment.progress, 0) / enrollments.length,
  );
}

async function getActiveCertificate(ctx: QueryCtx, userId: Id<"users">, courseId: Id<"courses">) {
  return await ctx.db
    .query("certificates")
    .withIndex("by_user_course", (q) => q.eq("userId", userId).eq("courseId", courseId))
    .filter((q) => q.eq(q.field("status"), "active"))
    .first();
}

export const getRecentActivity = query({
  args: {},
  handler: async (ctx) => {
    await validateAdmin(ctx);

    const users = await ctx.db.query("users").collect();
    const courses = await ctx.db.query("courses").collect();
    const lessons = await ctx.db.query("lessons").collect();
    const enrollments = await ctx.db.query("enrollments").collect();
    const completions = await ctx.db.query("completions").collect();
    const posts = await ctx.db.query("posts").order("desc").collect();

    const userById = new Map(users.map((user) => [user._id, user]));
    const courseById = new Map(courses.map((course) => [course._id, course]));
    const lessonById = new Map(lessons.map((lesson) => [lesson._id, lesson]));

    const enrollmentEvents = enrollments.map((enrollment) => {
      const course = courseById.get(enrollment.courseId);
      return {
        id: `enrollment-${enrollment._id}`,
        type: "enrollment" as const,
        actor: displayName(userById.get(enrollment.userId)),
        action: `inscreveu-se no curso '${course?.title ?? "Curso"}'`,
        timestamp: enrollment.enrolledAt,
        href: course ? `/admin/cursos/${course._id}` : "/admin/cursos",
      };
    });

    const completionEvents = completions
      .filter((completion) => completion.completedAt)
      .map((completion) => {
        const course = courseById.get(completion.courseId);
        const lesson = lessonById.get(completion.lessonId);
        return {
          id: `completion-${completion._id}`,
          type: "completion" as const,
          actor: displayName(userById.get(completion.userId)),
          action: `concluiu '${lesson?.title ?? "uma aula"}' no curso '${
            course?.title ?? "Curso"
          }'`,
          timestamp: completion.completedAt ?? 0,
          href: course ? `/admin/cursos/${course._id}` : "/admin/cursos",
        };
      });

    const userEvents = users
      .filter((user) => user.role === "student" && user.createdAt)
      .map((user) => ({
        id: `user-${user._id}`,
        type: "user" as const,
        actor: displayName(user),
        action: "registou-se na plataforma",
        timestamp: user.createdAt ?? 0,
        href: "/admin/alunos",
      }));

    const postEvents = posts
      .filter((post) => post.publishedAt)
      .map((post) => ({
        id: `post-${post._id}`,
        type: "post" as const,
        actor: post.author || "Beasell",
        action: `publicou '${post.title}' no blog`,
        timestamp: post.publishedAt,
        href: "/admin/conteudos",
      }));

    return [...enrollmentEvents, ...completionEvents, ...userEvents, ...postEvents]
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 8);
  },
});

export const getStudentDetail = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    await validateAdmin(ctx);

    const user = await ctx.db.get(args.userId);
    if (!user || user.role !== "student") return null;

    const enrollments = await ctx.db
      .query("enrollments")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    const courses = await Promise.all(
      enrollments.map(async (enrollment) => {
        const course = await ctx.db.get(enrollment.courseId);
        if (!course) return null;

        const lessons = await getCourseLessons(ctx, course._id);
        const completions = await ctx.db
          .query("completions")
          .withIndex("by_user_course", (q) => q.eq("userId", user._id).eq("courseId", course._id))
          .collect();
        const certificate = await getActiveCertificate(ctx, user._id, course._id);
        const completionByLessonId = new Map(
          completions.map((completion) => [completion.lessonId, completion]),
        );
        const completedLessonIds = new Set([
          ...(enrollment.completedLessons ?? []),
          ...completions.map((completion) => completion.lessonId),
        ]);
        const completedLessons = lessons
          .filter((lesson) => completedLessonIds.has(lesson._id))
          .map((lesson) => {
            const completion = completionByLessonId.get(lesson._id);
            return {
              lessonId: lesson._id,
              title: lesson.title,
              moduleTitle: lesson.moduleTitle,
              completedAt: completion?.completedAt ?? null,
            };
          });

        return {
          enrollment,
          course: {
            _id: course._id,
            title: course.title,
            slug: course.slug,
            thumbnailUrl: course.thumbnailUrl,
            price: course.price,
            isPublished: course.isPublished === true || course.status === "published",
          },
          totalLessons: lessons.length,
          completedLessons,
          completedLessonsCount: completedLessons.length,
          certificate,
        };
      }),
    );

    const visibleCourses = courses
      .filter((course): course is NonNullable<typeof course> => course !== null)
      .sort((a, b) => b.enrollment.enrolledAt - a.enrollment.enrolledAt);
    const completedCourses = enrollments.filter(
      (enrollment) => enrollment.status === "completed",
    ).length;
    const totalCompletedLessons = visibleCourses.reduce(
      (total, course) => total + course.completedLessonsCount,
      0,
    );
    const activeCertificates = visibleCourses.filter((course) => course.certificate).length;
    const lastActivity = Math.max(
      0,
      user.updatedAt ?? 0,
      ...enrollments.map((enrollment) => enrollment.enrolledAt),
      ...enrollments.map((enrollment) => enrollment.completedAt ?? 0),
      ...visibleCourses.flatMap((course) =>
        course.completedLessons.map((lesson) => lesson.completedAt ?? 0),
      ),
    );

    return {
      user: {
        _id: user._id,
        name: displayName(user),
        email: user.email,
        imageUrl: user.imageUrl ?? null,
        role: user.role,
        status: user.status ?? "active",
        createdAt: user.createdAt ?? null,
        updatedAt: user.updatedAt ?? null,
      },
      stats: {
        totalCourses: visibleCourses.length,
        activeEnrollments: enrollments.filter((enrollment) => enrollment.status !== "completed")
          .length,
        completedCourses,
        certificatesEarned: activeCertificates,
        totalCompletedLessons,
        averageProgress: averageProgress(enrollments),
        totalAmountPaid: enrollments.reduce(
          (total, enrollment) => total + (enrollment.amountPaid ?? 0),
          0,
        ),
        lastActivity: lastActivity || null,
      },
      courses: visibleCourses,
    };
  },
});
