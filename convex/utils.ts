import { QueryCtx, MutationCtx } from "./_generated/server";

export async function isAdmin(ctx: QueryCtx | MutationCtx) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return false;

    const user = await ctx.db
        .query("users")
        .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
        .unique();

    return user?.role === "admin";
}

export async function validateAdmin(ctx: MutationCtx) {
    const isAd = await isAdmin(ctx);
    if (!isAd) {
        throw new Error("Apenas administradores podem realizar esta acção.");
    }
}
