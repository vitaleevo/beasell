import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentAppUser, validateAdmin } from "./authorization";
import { getChangedFields, writeAuditLog } from "./audit";
import { assertRateLimit, userRateLimitKey } from "./rateLimit";

const serviceCategoryValidator = v.union(
  v.literal("individual"),
  v.literal("empresarial"),
  v.literal("workshop"),
  v.literal("consultoria"),
);

const currencyValidator = v.union(v.literal("AOA"), v.literal("USD"), v.literal("EUR"));

function cleanText(value: string, field: string) {
  const cleaned = value.trim();
  if (!cleaned) {
    throw new Error(`${field} e obrigatorio.`);
  }

  return cleaned;
}

function cleanFeatures(features: string[]) {
  const cleaned = features.map((feature) => feature.trim()).filter(Boolean);
  if (cleaned.length === 0) {
    throw new Error("Informe pelo menos uma caracteristica.");
  }

  return cleaned.slice(0, 20);
}

function validatePrice(price: number) {
  if (!Number.isFinite(price) || price < 0) {
    throw new Error("O preco deve ser um numero valido maior ou igual a zero.");
  }

  return Math.round(price);
}

async function applyAdminWriteLimit(ctx: Parameters<typeof assertRateLimit>[0]) {
  const admin = await getCurrentAppUser(ctx);
  if (admin) {
    await assertRateLimit(ctx, {
      key: userRateLimitKey(admin._id),
      action: "service.admin_write",
      limit: 80,
      windowMs: 60 * 60 * 1000,
    });
  }

  return admin;
}

export const list = query({
  args: {},
  handler: async (ctx) => {
    await validateAdmin(ctx);
    return await ctx.db.query("services").collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    price: v.number(),
    currency: currencyValidator,
    duration: v.string(),
    features: v.array(v.string()),
    popular: v.boolean(),
    category: serviceCategoryValidator,
  },
  handler: async (ctx, args) => {
    await validateAdmin(ctx);
    const admin = await applyAdminWriteLimit(ctx);
    const now = Date.now();
    const payload = {
      name: cleanText(args.name, "Nome"),
      description: cleanText(args.description, "Descricao"),
      price: validatePrice(args.price),
      currency: args.currency,
      duration: cleanText(args.duration, "Duracao"),
      features: cleanFeatures(args.features),
      popular: args.popular,
      category: args.category,
      createdAt: now,
      updatedAt: now,
      createdBy: admin?._id,
      updatedBy: admin?._id,
    };

    const serviceId = await ctx.db.insert("services", payload);
    await writeAuditLog(ctx, {
      actor: admin,
      action: "service.created",
      resourceType: "service",
      resourceId: serviceId,
      summary: `${admin?.email ?? "Admin"} criou o servico '${payload.name}'.`,
      metadata: {
        serviceId,
        category: payload.category,
        price: payload.price,
        currency: payload.currency,
        popular: payload.popular,
      },
    });

    return serviceId;
  },
});

export const update = mutation({
  args: {
    id: v.id("services"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    price: v.optional(v.number()),
    currency: v.optional(currencyValidator),
    duration: v.optional(v.string()),
    features: v.optional(v.array(v.string())),
    popular: v.optional(v.boolean()),
    category: v.optional(serviceCategoryValidator),
  },
  handler: async (ctx, args) => {
    await validateAdmin(ctx);
    const admin = await applyAdminWriteLimit(ctx);
    const serviceBefore = await ctx.db.get(args.id);
    if (!serviceBefore) {
      throw new Error("Servico nao encontrado.");
    }

    const patch: Partial<typeof serviceBefore> = {
      updatedAt: Date.now(),
      updatedBy: admin?._id,
    };

    if (args.name !== undefined) patch.name = cleanText(args.name, "Nome");
    if (args.description !== undefined) {
      patch.description = cleanText(args.description, "Descricao");
    }
    if (args.price !== undefined) patch.price = validatePrice(args.price);
    if (args.currency !== undefined) patch.currency = args.currency;
    if (args.duration !== undefined) patch.duration = cleanText(args.duration, "Duracao");
    if (args.features !== undefined) patch.features = cleanFeatures(args.features);
    if (args.popular !== undefined) patch.popular = args.popular;
    if (args.category !== undefined) patch.category = args.category;

    await ctx.db.patch(args.id, patch);

    const changedFields = getChangedFields(serviceBefore, patch, [
      "name",
      "description",
      "price",
      "currency",
      "duration",
      "features",
      "popular",
      "category",
    ]);

    if (changedFields.length > 0) {
      await writeAuditLog(ctx, {
        actor: admin,
        action: "service.updated",
        resourceType: "service",
        resourceId: args.id,
        summary: `${admin?.email ?? "Admin"} actualizou o servico '${
          patch.name ?? serviceBefore.name
        }'.`,
        metadata: {
          serviceId: args.id,
          changedFields,
          priceBefore: serviceBefore.price,
          priceAfter: patch.price ?? serviceBefore.price,
          currency: patch.currency ?? serviceBefore.currency,
        },
      });
    }
  },
});

export const remove = mutation({
  args: { id: v.id("services") },
  handler: async (ctx, args) => {
    await validateAdmin(ctx);
    const admin = await applyAdminWriteLimit(ctx);
    const service = await ctx.db.get(args.id);
    if (!service) {
      throw new Error("Servico nao encontrado.");
    }

    await ctx.db.delete(args.id);
    await writeAuditLog(ctx, {
      actor: admin,
      action: "service.deleted",
      resourceType: "service",
      resourceId: args.id,
      summary: `${admin?.email ?? "Admin"} removeu o servico '${service.name}'.`,
      metadata: {
        serviceId: args.id,
        category: service.category,
        price: service.price,
        currency: service.currency,
      },
    });
  },
});
