import type { Doc } from "./_generated/dataModel";
import type { MutationCtx, QueryCtx } from "./_generated/server";

type AuditPrimitive = string | number | boolean | null | undefined;
type AuditMetadata = Record<string, AuditPrimitive | AuditPrimitive[]>;

const MAX_AUDIT_STRING_LENGTH = 240;
const REDACTED_FIELD_PATTERN = /(proof|password|secret|token|key|url|email)/i;

function sanitizeValue(
  value: AuditPrimitive | AuditPrimitive[],
): AuditPrimitive | AuditPrimitive[] {
  if (Array.isArray(value)) {
    return value.slice(0, 12).map((item) => sanitizeValue(item) as AuditPrimitive);
  }

  if (typeof value === "string") {
    return value.length > MAX_AUDIT_STRING_LENGTH
      ? `${value.slice(0, MAX_AUDIT_STRING_LENGTH)}...`
      : value;
  }

  return value;
}

export function sanitizeAuditMetadata(metadata: AuditMetadata | undefined) {
  if (!metadata) return undefined;

  return Object.fromEntries(
    Object.entries(metadata).map(([key, value]) => [
      key,
      REDACTED_FIELD_PATTERN.test(key) ? "[redacted]" : sanitizeValue(value),
    ]),
  );
}

export function getChangedFields<T extends Record<string, unknown>>(
  before: T | null | undefined,
  after: Partial<T>,
  fields: (keyof T)[],
) {
  if (!before) return fields.map((field) => String(field));

  return fields
    .filter((field) => {
      if (!(field in after)) return false;
      return JSON.stringify(before[field]) !== JSON.stringify(after[field]);
    })
    .map((field) => String(field));
}

export async function writeAuditLog(
  ctx: MutationCtx,
  {
    actor,
    action,
    resourceType,
    resourceId,
    summary,
    metadata,
  }: {
    actor?: Doc<"users"> | null;
    action: string;
    resourceType: string;
    resourceId?: string;
    summary: string;
    metadata?: AuditMetadata;
  },
) {
  await ctx.db.insert("auditLogs", {
    actorUserId: actor?._id,
    actorEmail: actor?.email,
    actorRole: actor?.role,
    action,
    resourceType,
    resourceId,
    summary,
    metadata: sanitizeAuditMetadata(metadata),
    createdAt: Date.now(),
  });
}

export async function listAuditLogs(
  ctx: QueryCtx,
  {
    resourceType,
    resourceId,
    limit = 20,
  }: {
    resourceType?: string;
    resourceId?: string;
    limit?: number;
  },
) {
  const cappedLimit = Math.min(Math.max(limit, 1), 100);

  if (resourceType && resourceId) {
    return await ctx.db
      .query("auditLogs")
      .withIndex("by_resource", (q) =>
        q.eq("resourceType", resourceType).eq("resourceId", resourceId),
      )
      .order("desc")
      .take(cappedLimit);
  }

  if (resourceType) {
    return await ctx.db
      .query("auditLogs")
      .withIndex("by_createdAt")
      .filter((q) => q.eq(q.field("resourceType"), resourceType))
      .order("desc")
      .take(cappedLimit);
  }

  return await ctx.db.query("auditLogs").order("desc").take(cappedLimit);
}
