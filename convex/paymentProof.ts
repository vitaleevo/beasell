import type { Id } from "./_generated/dataModel";
import type { MutationCtx, QueryCtx } from "./_generated/server";

const MAX_PAYMENT_PROOF_BYTES = 8 * 1024 * 1024;
const ALLOWED_PAYMENT_PROOF_CONTENT_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export async function validatePaymentProofStorage(
  ctx: MutationCtx,
  storageId: Id<"_storage"> | undefined,
) {
  if (!storageId) return;

  const metadata = await ctx.db.system.get("_storage", storageId);
  if (!metadata) {
    throw new Error("Comprovativo nao encontrado no storage.");
  }

  if (metadata.size > MAX_PAYMENT_PROOF_BYTES) {
    throw new Error("O comprovativo deve ter no maximo 8 MB.");
  }

  if (metadata.contentType && !ALLOWED_PAYMENT_PROOF_CONTENT_TYPES.has(metadata.contentType)) {
    throw new Error("Envie um comprovativo em PDF, PNG, JPG ou WEBP.");
  }
}

export async function getPaymentProofUrl(
  ctx: QueryCtx | MutationCtx,
  storageId: Id<"_storage"> | undefined,
  fallbackUrl: string | null | undefined,
) {
  if (!storageId) return fallbackUrl ?? null;
  return (await ctx.storage.getUrl(storageId)) ?? fallbackUrl ?? null;
}
