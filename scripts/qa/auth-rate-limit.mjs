#!/usr/bin/env node

const nextOrigin = process.env.NEXT_ORIGIN ?? "http://localhost:3002";
const trustedOrigin = process.env.TRUSTED_ORIGIN ?? nextOrigin;
const stamp = Date.now();
const testIp = `198.51.100.${(stamp % 200) + 1}`;
const email = `rate-limit-${stamp}@beasell.test`;
const password = "WrongPassword123!";

async function attempt(index) {
  const response = await fetch(`${nextOrigin}/api/auth/sign-in/email`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: trustedOrigin,
      "x-forwarded-for": testIp,
    },
    body: JSON.stringify({
      email,
      password,
      rememberMe: true,
    }),
  });

  const body = await response.text();
  return {
    index,
    status: response.status,
    retryAfter: response.headers.get("x-retry-after"),
    body: body.slice(0, 160),
  };
}

const results = [];

for (let index = 1; index <= 6; index += 1) {
  results.push(await attempt(index));
}

const blocked = results.some((result) => result.status === 429);

if (!blocked) {
  console.error(
    JSON.stringify(
      {
        ok: false,
        reason: "Expected login rate limit to return 429 after repeated attempts.",
        nextOrigin,
        testIp,
        results,
      },
      null,
      2,
    ),
  );
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      ok: true,
      nextOrigin,
      attempts: results.length,
      blockedAt: results.find((result) => result.status === 429)?.index,
      statuses: results.map((result) => result.status),
    },
    null,
    2,
  ),
);
