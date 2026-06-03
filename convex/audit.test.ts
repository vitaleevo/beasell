import { describe, expect, it } from "vitest";
import { sanitizeAuditMetadata } from "./audit";

describe("sanitizeAuditMetadata", () => {
  it("redacts sensitive audit metadata keys", () => {
    expect(
      sanitizeAuditMetadata({
        proofUrl: "https://storage.example/proof.pdf",
        token: "secret-token",
        price: 150000,
        changedFields: ["price", "currency"],
      }),
    ).toEqual({
      proofUrl: "[redacted]",
      token: "[redacted]",
      price: 150000,
      changedFields: ["price", "currency"],
    });
  });

  it("truncates long audit values", () => {
    const result = sanitizeAuditMetadata({
      note: "a".repeat(300),
    });

    expect(String(result?.note)).toHaveLength(243);
    expect(String(result?.note).endsWith("...")).toBe(true);
  });
});
