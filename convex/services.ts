import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { validateAdmin } from "./utils";

export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("services").collect();
    },
});

export const create = mutation({
    args: {
        name: v.string(),
        description: v.string(),
        price: v.number(),
        currency: v.string(),
        duration: v.string(),
        features: v.array(v.string()),
        popular: v.boolean(),
        category: v.string(),
    },
    handler: async (ctx, args) => {
        await validateAdmin(ctx);
        return await ctx.db.insert("services", args);
    },
});

export const update = mutation({
    args: {
        id: v.id("services"),
        name: v.optional(v.string()),
        description: v.optional(v.string()),
        price: v.optional(v.number()),
        currency: v.optional(v.string()),
        duration: v.optional(v.string()),
        features: v.optional(v.array(v.string())),
        popular: v.optional(v.boolean()),
        category: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        await validateAdmin(ctx);
        const { id, ...rest } = args;
        await ctx.db.patch(id, rest);
    },
});

export const remove = mutation({
    args: { id: v.id("services") },
    handler: async (ctx, args) => {
        await validateAdmin(ctx);
        await ctx.db.delete(args.id);
    },
});
