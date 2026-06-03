import { v } from "convex/values";
import { query } from "./_generated/server";
import { getCurrentAppUser, validateAdmin } from "./authorization";

function normalizeVerificationCode(code: string) {
  return code.replace(/[^a-z0-9]/gi, "").toUpperCase();
}

export const getMyCertificates = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentAppUser(ctx);
    if (!user) return [];

    const certificates = await ctx.db
      .query("certificates")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    const rows = await Promise.all(
      certificates
        .filter((certificate) => certificate.status === "active")
        .map(async (certificate) => {
          const course = await ctx.db.get(certificate.courseId);
          return {
            certificate,
            course: course
              ? {
                  _id: course._id,
                  title: course.title,
                  slug: course.slug,
                  thumbnailUrl: course.thumbnailUrl,
                }
              : null,
          };
        }),
    );

    return rows.sort((a, b) => b.certificate.issuedAt - a.certificate.issuedAt);
  },
});

export const verifyByCode = query({
  args: { code: v.string() },
  handler: async (ctx, args) => {
    const verificationCode = normalizeVerificationCode(args.code);
    if (!verificationCode) return null;

    const certificate = await ctx.db
      .query("certificates")
      .withIndex("by_verificationCode", (q) => q.eq("verificationCode", verificationCode))
      .unique();

    if (!certificate || certificate.status !== "active") return null;

    const course = await ctx.db.get(certificate.courseId);
    const user = await ctx.db.get(certificate.userId);

    return {
      certificate,
      course: course
        ? {
            _id: course._id,
            title: course.title,
            slug: course.slug,
            thumbnailUrl: course.thumbnailUrl,
            isPublished: course.isPublished === true || course.status === "published",
          }
        : null,
      user: user
        ? {
            _id: user._id,
            name: user.name,
            email: user.email,
          }
        : null,
    };
  },
});

export const listByStudent = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    await validateAdmin(ctx);

    const certificates = await ctx.db
      .query("certificates")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    return certificates.sort((a, b) => b.issuedAt - a.issuedAt);
  },
});
