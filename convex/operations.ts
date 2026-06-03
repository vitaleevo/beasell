import { query } from "./_generated/server";
import { validateAdmin } from "./authorization";

const DAY_MS = 24 * 60 * 60 * 1000;

export const getPlatformHealth = query({
  args: {},
  handler: async (ctx) => {
    await validateAdmin(ctx);

    const now = Date.now();
    const [courses, payments, services, auditLogs] = await Promise.all([
      ctx.db.query("courses").collect(),
      ctx.db.query("payments").collect(),
      ctx.db.query("services").collect(),
      ctx.db.query("auditLogs").withIndex("by_createdAt").order("desc").take(50),
    ]);

    const publishedCourses = courses.filter(
      (course) => course.isPublished === true || course.status === "published",
    ).length;
    const draftCourses = courses.filter(
      (course) => !(course.isPublished === true || course.status === "published"),
    ).length;
    const pendingPayments = payments.filter((payment) => payment.status === "pending").length;
    const submittedPayments = payments.filter((payment) => payment.status === "submitted").length;
    const staleSubmittedPayments = payments.filter(
      (payment) => payment.status === "submitted" && payment.updatedAt < now - 2 * DAY_MS,
    ).length;
    const recentAuditEvents = auditLogs.filter((entry) => entry.createdAt >= now - DAY_MS).length;

    const status =
      staleSubmittedPayments > 0 || submittedPayments > 10
        ? "attention"
        : submittedPayments > 0 || pendingPayments > 0
          ? "watch"
          : "healthy";

    return {
      status,
      checkedAt: now,
      metrics: {
        publishedCourses,
        draftCourses,
        services: services.length,
        pendingPayments,
        submittedPayments,
        staleSubmittedPayments,
        recentAuditEvents,
      },
      checks: [
        {
          label: "Cursos publicados",
          value: publishedCourses,
          status: publishedCourses > 0 ? "ok" : "attention",
        },
        {
          label: "Pagamentos para rever",
          value: submittedPayments,
          status: staleSubmittedPayments > 0 ? "attention" : submittedPayments > 0 ? "watch" : "ok",
        },
        {
          label: "Pacotes de preço",
          value: services.length,
          status: services.length > 0 ? "ok" : "attention",
        },
        {
          label: "Auditoria 24h",
          value: recentAuditEvents,
          status: recentAuditEvents > 0 ? "ok" : "watch",
        },
      ],
    };
  },
});
