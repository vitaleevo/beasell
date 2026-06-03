import { v } from "convex/values";
import { query } from "./_generated/server";
import { validateAdmin } from "./authorization";
import { listAuditLogs } from "./audit";

export const listForAdmin = query({
  args: {
    resourceType: v.optional(v.string()),
    resourceId: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await validateAdmin(ctx);

    return await listAuditLogs(ctx, {
      resourceType: args.resourceType,
      resourceId: args.resourceId,
      limit: args.limit ?? 30,
    });
  },
});
