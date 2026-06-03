import type { MutationCtx } from "./_generated/server";

export async function assertRateLimit(
  ctx: MutationCtx,
  {
    key,
    action,
    limit,
    windowMs,
  }: {
    key: string;
    action: string;
    limit: number;
    windowMs: number;
  },
) {
  const now = Date.now();
  const existing = await ctx.db
    .query("rateLimits")
    .withIndex("by_key_action", (q) => q.eq("key", key).eq("action", action))
    .unique();

  if (!existing || now - existing.windowStartedAt >= windowMs) {
    if (existing) {
      await ctx.db.patch(existing._id, {
        windowStartedAt: now,
        count: 1,
        updatedAt: now,
      });
    } else {
      await ctx.db.insert("rateLimits", {
        key,
        action,
        windowStartedAt: now,
        count: 1,
        updatedAt: now,
      });
    }

    return;
  }

  if (existing.count >= limit) {
    throw new Error("Muitas tentativas num curto periodo. Aguarde um pouco e tente novamente.");
  }

  await ctx.db.patch(existing._id, {
    count: existing.count + 1,
    updatedAt: now,
  });
}

export function userRateLimitKey(userId: string) {
  return `user:${userId}`;
}

export function identityRateLimitKey(subject: string) {
  return `identity:${subject}`;
}
