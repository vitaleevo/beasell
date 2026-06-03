import { describe, expect, it } from "vitest";

import { createAuthOptions } from "./betterAuth/auth";

describe("Better Auth rate limit configuration", () => {
  it("enables login and signup throttling with forwarded IP headers", () => {
    const options = createAuthOptions({} as Parameters<typeof createAuthOptions>[0]);

    expect(options.rateLimit?.enabled).toBe(true);
    expect(options.rateLimit?.storage).toBe("database");
    expect(options.rateLimit?.customRules?.["/sign-in/*"]).toEqual({
      window: 60,
      max: 5,
    });
    expect(options.rateLimit?.customRules?.["/api/auth/sign-in/*"]).toEqual({
      window: 60,
      max: 5,
    });
    expect(options.rateLimit?.customRules?.["/sign-up/*"]).toEqual({
      window: 300,
      max: 5,
    });
    expect(options.rateLimit?.customRules?.["/api/auth/sign-up/*"]).toEqual({
      window: 300,
      max: 5,
    });
    expect(options.advanced?.ipAddress?.ipAddressHeaders).toContain("x-forwarded-for");
    expect(options.advanced?.ipAddress?.ipAddressHeaders).toContain("x-vercel-forwarded-for");
  });
});
