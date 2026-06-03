import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import type { MutationCtx } from "./_generated/server";
import type { Id } from "./_generated/dataModel";
import { getCurrentAppUser, validateAdmin } from "./authorization";
import {
  getPaymentProofUrl,
  rejectLegacyPaymentProofUrl,
  validatePaymentProofStorage,
} from "./paymentProof";
import { writeAuditLog } from "./audit";
import { assertRateLimit, identityRateLimitKey, userRateLimitKey } from "./rateLimit";

const paymentStatusValidator = v.union(
  v.literal("pending"),
  v.literal("submitted"),
  v.literal("approved"),
  v.literal("rejected"),
);

async function refreshCourseStats(ctx: MutationCtx, courseId: Id<"courses">) {
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

async function getPaymentForEnrollment(ctx: MutationCtx, enrollmentId: Id<"enrollments">) {
  return await ctx.db
    .query("payments")
    .withIndex("by_enrollment", (q) => q.eq("enrollmentId", enrollmentId))
    .unique();
}

export const listForAdmin = query({
  args: {
    status: v.optional(paymentStatusValidator),
  },
  handler: async (ctx, args) => {
    await validateAdmin(ctx);

    const payments = args.status
      ? await ctx.db
          .query("payments")
          .withIndex("by_status", (q) => q.eq("status", args.status!))
          .collect()
      : await ctx.db.query("payments").collect();

    const rows = await Promise.all(
      payments.map(async (payment) => {
        const [user, course, enrollment] = await Promise.all([
          ctx.db.get(payment.userId),
          ctx.db.get(payment.courseId),
          ctx.db.get(payment.enrollmentId),
        ]);
        const proofUrl = await getPaymentProofUrl(ctx, payment.proofStorageId, payment.proofUrl);

        return {
          payment: {
            ...payment,
            proofUrl,
          },
          user,
          course,
          enrollment,
        };
      }),
    );

    return rows.sort((a, b) => b.payment.updatedAt - a.payment.updatedAt);
  },
});

export const generateProofUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Autenticacao obrigatoria.");
    }

    await assertRateLimit(ctx, {
      key: identityRateLimitKey(identity.subject),
      action: "payment.proof_upload_url",
      limit: 12,
      windowMs: 60 * 60 * 1000,
    });

    return await ctx.storage.generateUploadUrl();
  },
});

export const submitProof = mutation({
  args: {
    courseId: v.id("courses"),
    paymentMethod: v.optional(v.string()),
    paymentReference: v.optional(v.string()),
    paymentProofUrl: v.optional(v.string()),
    paymentProofStorageId: v.optional(v.id("_storage")),
    paymentNotes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentAppUser(ctx);
    if (!user) {
      throw new Error("Autenticacao obrigatoria.");
    }

    await assertRateLimit(ctx, {
      key: userRateLimitKey(user._id),
      action: "payment.submit_proof",
      limit: 8,
      windowMs: 60 * 60 * 1000,
    });

    const enrollment = await ctx.db
      .query("enrollments")
      .withIndex("by_user_course", (q) => q.eq("userId", user._id).eq("courseId", args.courseId))
      .unique();

    if (!enrollment) {
      throw new Error("Inscricao obrigatoria para submeter pagamento.");
    }

    if (enrollment.paymentStatus === "approved") {
      throw new Error("Este pagamento ja foi aprovado.");
    }

    rejectLegacyPaymentProofUrl(args.paymentProofUrl);
    await validatePaymentProofStorage(ctx, args.paymentProofStorageId);

    const payment = await getPaymentForEnrollment(ctx, enrollment._id);
    if (!payment) {
      throw new Error("Registo de pagamento nao encontrado.");
    }

    const now = Date.now();
    const status =
      args.paymentReference || args.paymentProofUrl || args.paymentProofStorageId
        ? "submitted"
        : "pending";
    await ctx.db.patch(payment._id, {
      method: args.paymentMethod,
      reference: args.paymentReference,
      proofUrl: args.paymentProofUrl,
      proofStorageId: args.paymentProofStorageId,
      status,
      adminNote: undefined,
      reviewedAt: undefined,
      reviewedBy: undefined,
      submittedAt: status === "submitted" ? now : payment.submittedAt,
      updatedAt: now,
    });

    await ctx.db.patch(enrollment._id, {
      paymentMethod: args.paymentMethod,
      paymentReference: args.paymentReference,
      paymentProofUrl: args.paymentProofUrl,
      paymentProofStorageId: args.paymentProofStorageId,
      paymentNotes: args.paymentNotes,
      paymentStatus: status,
      paymentSubmittedAt: status === "submitted" ? now : enrollment.paymentSubmittedAt,
      status: "pending_payment",
      accessGranted: false,
      amountPaid: 0,
    });

    await writeAuditLog(ctx, {
      actor: user,
      action: "payment.submitted",
      resourceType: "payment",
      resourceId: payment._id,
      summary: `${user.email} submeteu comprovativo para pagamento.`,
      metadata: {
        courseId: args.courseId,
        enrollmentId: enrollment._id,
        status,
        hasReference: Boolean(args.paymentReference),
        hasStorageProof: Boolean(args.paymentProofStorageId),
        hasLegacyProofUrl: Boolean(args.paymentProofUrl),
      },
    });
  },
});

export const approve = mutation({
  args: {
    paymentId: v.id("payments"),
    adminNote: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await validateAdmin(ctx);
    const admin = await getCurrentAppUser(ctx);
    if (admin) {
      await assertRateLimit(ctx, {
        key: userRateLimitKey(admin._id),
        action: "payment.review",
        limit: 40,
        windowMs: 60 * 60 * 1000,
      });
    }

    const payment = await ctx.db.get(args.paymentId);
    if (!payment) {
      throw new Error("Pagamento nao encontrado.");
    }

    if (payment.status === "approved") {
      throw new Error("Pagamento ja aprovado.");
    }

    if (payment.status === "rejected") {
      throw new Error("Pagamento rejeitado precisa de novo envio antes de aprovacao.");
    }

    if (payment.status !== "submitted") {
      throw new Error("Apenas pagamentos submetidos podem ser aprovados.");
    }

    const enrollment = await ctx.db.get(payment.enrollmentId);
    if (!enrollment) {
      throw new Error("Inscricao nao encontrada.");
    }

    if (enrollment.paymentStatus === "approved" || enrollment.accessGranted === true) {
      throw new Error("Esta inscricao ja tem acesso aprovado.");
    }

    const now = Date.now();
    await ctx.db.patch(payment._id, {
      status: "approved",
      adminNote: args.adminNote,
      reviewedAt: now,
      reviewedBy: admin?._id,
      updatedAt: now,
    });

    await ctx.db.patch(enrollment._id, {
      paymentStatus: "approved",
      paymentReviewedAt: now,
      paymentReviewedBy: admin?._id,
      accessGranted: true,
      amountPaid: payment.amount,
      status: "active",
    });

    await refreshCourseStats(ctx, payment.courseId);

    await writeAuditLog(ctx, {
      actor: admin,
      action: "payment.approved",
      resourceType: "payment",
      resourceId: payment._id,
      summary: `${admin?.email ?? "Admin"} aprovou pagamento e liberou acesso.`,
      metadata: {
        courseId: payment.courseId,
        enrollmentId: payment.enrollmentId,
        amount: payment.amount,
        currency: payment.currency,
      },
    });
  },
});

export const reject = mutation({
  args: {
    paymentId: v.id("payments"),
    adminNote: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await validateAdmin(ctx);
    const admin = await getCurrentAppUser(ctx);
    const adminNote = args.adminNote?.trim();
    if (!adminNote || adminNote.length < 8) {
      throw new Error("Informe um motivo de rejeicao com pelo menos 8 caracteres.");
    }

    if (admin) {
      await assertRateLimit(ctx, {
        key: userRateLimitKey(admin._id),
        action: "payment.review",
        limit: 40,
        windowMs: 60 * 60 * 1000,
      });
    }

    const payment = await ctx.db.get(args.paymentId);
    if (!payment) {
      throw new Error("Pagamento nao encontrado.");
    }

    if (payment.status === "approved") {
      throw new Error("Pagamento aprovado nao pode ser rejeitado.");
    }

    if (payment.status === "rejected") {
      throw new Error("Pagamento ja rejeitado.");
    }

    if (payment.status !== "submitted") {
      throw new Error("Apenas pagamentos submetidos podem ser rejeitados.");
    }

    const enrollment = await ctx.db.get(payment.enrollmentId);
    if (!enrollment) {
      throw new Error("Inscricao nao encontrada.");
    }

    const now = Date.now();
    await ctx.db.patch(payment._id, {
      status: "rejected",
      adminNote,
      reviewedAt: now,
      reviewedBy: admin?._id,
      updatedAt: now,
    });

    await ctx.db.patch(enrollment._id, {
      paymentStatus: "rejected",
      paymentReviewedAt: now,
      paymentReviewedBy: admin?._id,
      accessGranted: false,
      amountPaid: 0,
      status: "payment_rejected",
    });

    await refreshCourseStats(ctx, payment.courseId);

    await writeAuditLog(ctx, {
      actor: admin,
      action: "payment.rejected",
      resourceType: "payment",
      resourceId: payment._id,
      summary: `${admin?.email ?? "Admin"} rejeitou pagamento.`,
      metadata: {
        courseId: payment.courseId,
        enrollmentId: payment.enrollmentId,
        amount: payment.amount,
        currency: payment.currency,
        reasonLength: adminNote.length,
      },
    });
  },
});
