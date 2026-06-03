import { QueryCtx, MutationCtx } from "./_generated/server";

export type AppRole = "admin" | "super_admin" | "student";

export function parseAdminEmails(value: string | undefined) {
  return new Set(
    (value ?? "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  );
}

export function roleForEmail(
  email: string | undefined,
  adminEmails = process.env.ADMIN_EMAILS,
): AppRole {
  if (email && parseAdminEmails(adminEmails).has(email.toLowerCase())) {
    return "admin";
  }

  return "student";
}

export function canReadRestrictedContent(role: AppRole | undefined) {
  return role === "admin" || role === "super_admin";
}

export function isPublicPublishedListing(onlyPublished: boolean | undefined) {
  return onlyPublished === true;
}

export async function getCurrentAppUser(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) return null;

  return await ctx.db
    .query("users")
    .withIndex("by_authUserId", (q) => q.eq("authUserId", identity.subject))
    .unique();
}

export async function getOrCreateCurrentAppUser(ctx: MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Autenticacao obrigatoria.");
  }

  const existing = await ctx.db
    .query("users")
    .withIndex("by_authUserId", (q) => q.eq("authUserId", identity.subject))
    .unique();

  const email = identity.email ?? "";
  const name = identity.name ?? email;
  const role = roleForEmail(email);
  const now = Date.now();

  if (existing) {
    await ctx.db.patch(existing._id, {
      name: name || existing.name || "Utilizador",
      email: email || existing.email,
      role,
      updatedAt: now,
    });
    return {
      ...existing,
      name: name || existing.name || "Utilizador",
      email: email || existing.email,
      role,
      updatedAt: now,
    };
  }

  const userId = await ctx.db.insert("users", {
    name: name || "Utilizador",
    email,
    authUserId: identity.subject,
    role,
    createdAt: now,
    updatedAt: now,
  });

  const user = await ctx.db.get(userId);
  if (!user) {
    throw new Error("Nao foi possivel criar o utilizador.");
  }

  return user;
}

export async function isAdmin(ctx: QueryCtx | MutationCtx) {
  const user = await getCurrentAppUser(ctx);
  return canReadRestrictedContent(user?.role);
}

export async function validateAdmin(ctx: QueryCtx | MutationCtx) {
  const allowed = await isAdmin(ctx);
  if (!allowed) {
    throw new Error("Apenas administradores podem realizar esta accao.");
  }
}
