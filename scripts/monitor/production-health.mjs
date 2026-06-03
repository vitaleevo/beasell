#!/usr/bin/env node

const args = process.argv.slice(2);

function readArg(name, fallback = undefined) {
  const index = args.indexOf(name);
  if (index === -1) return fallback;
  return args[index + 1] ?? fallback;
}

function hasFlag(name) {
  return args.includes(name);
}

function normalizeOrigin(value) {
  if (!value) return "";
  return value.replace(/\/+$/, "");
}

const baseUrl = normalizeOrigin(
  readArg("--base-url", process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL),
);
const convexSiteUrl = normalizeOrigin(
  readArg("--convex-site-url", process.env.NEXT_PUBLIC_CONVEX_SITE_URL),
);
const webhookUrl = readArg("--webhook-url", process.env.BEASELL_MONITOR_WEBHOOK_URL);
const timeoutMs = Number(readArg("--timeout-ms", process.env.BEASELL_MONITOR_TIMEOUT_MS ?? 10000));
const warnOnly = hasFlag("--warn-only") || process.env.BEASELL_MONITOR_WARN_ONLY === "1";
const requireSentry =
  hasFlag("--require-sentry") || process.env.BEASELL_MONITOR_REQUIRE_SENTRY === "1";
const vercelBypassSecret = readArg(
  "--vercel-bypass-secret",
  process.env.VERCEL_AUTOMATION_BYPASS_SECRET,
);

if (!baseUrl) {
  console.error("Missing --base-url or NEXT_PUBLIC_SITE_URL/SITE_URL.");
  process.exit(2);
}

function url(path) {
  return `${baseUrl}${path}`;
}

function requestOptions(options = {}) {
  if (!vercelBypassSecret) return options;

  return {
    ...options,
    headers: {
      ...options.headers,
      "x-vercel-protection-bypass": vercelBypassSecret,
    },
  };
}

function isVercelDeploymentProtection(response, text = "") {
  return (
    response.status === 401 &&
    /Authentication Required|Deployment Protection|x-vercel-protection-bypass/i.test(text)
  );
}

async function responseText(response) {
  return await response.clone().text().catch(() => "");
}

function deploymentProtectionResult(name, status) {
  return {
    name,
    ok: false,
    status,
    deploymentProtection: "vercel",
    reason:
      "Vercel Deployment Protection blocked this check. Configure VERCEL_AUTOMATION_BYPASS_SECRET or pass --vercel-bypass-secret for protected previews.",
  };
}

async function fetchWithTimeout(target, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(target, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

function securityHeader(headers, name, expectedValue) {
  const actual = headers.get(name);
  if (!actual) {
    return { ok: false, name, expected: String(expectedValue), actual: null };
  }

  if (expectedValue instanceof RegExp) {
    return { ok: expectedValue.test(actual), name, expected: String(expectedValue), actual };
  }

  return { ok: actual === expectedValue, name, expected: expectedValue, actual };
}

async function checkHealthEndpoint() {
  const response = await fetchWithTimeout(url("/api/health"), requestOptions({ redirect: "manual" }));
  const text = await responseText(response);
  if (isVercelDeploymentProtection(response, text)) {
    return deploymentProtectionResult("health-endpoint", response.status);
  }

  const body = await response.json().catch(() => null);
  const sentryConfigured = body?.observability?.sentryConfigured === true;
  const ok =
    response.status === 200 && body?.status === "ok" && (!requireSentry || sentryConfigured);

  return {
    name: "health-endpoint",
    ok,
    status: response.status,
    appStatus: body?.status ?? null,
    sentryConfigured,
    sentryRequired: requireSentry,
    missing: Array.isArray(body?.missing) ? body.missing : [],
  };
}

async function checkPublicPage() {
  const response = await fetchWithTimeout(url("/"), requestOptions({ redirect: "follow" }));
  const text = await response.text();
  if (isVercelDeploymentProtection(response, text)) {
    return deploymentProtectionResult("public-homepage", response.status);
  }

  return {
    name: "public-homepage",
    ok: response.status === 200 && text.toLowerCase().includes("beasell"),
    status: response.status,
    bytes: text.length,
  };
}

async function checkAdminRedirect() {
  const response = await fetchWithTimeout(
    url("/admin/dashboard"),
    requestOptions({ redirect: "manual" }),
  );
  const text = await responseText(response);
  if (isVercelDeploymentProtection(response, text)) {
    return deploymentProtectionResult("admin-auth-redirect", response.status);
  }

  const location = response.headers.get("location") ?? "";
  const redirected = [301, 302, 303, 307, 308].includes(response.status);

  return {
    name: "admin-auth-redirect",
    ok: redirected && location.includes("/sign-in"),
    status: response.status,
    location: location ? new URL(location, baseUrl).pathname : null,
  };
}

async function checkSecurityHeaders() {
  const response = await fetchWithTimeout(url("/"), requestOptions({ redirect: "follow" }));
  const text = await responseText(response);
  if (isVercelDeploymentProtection(response, text)) {
    return deploymentProtectionResult("security-headers", response.status);
  }

  const headers = [
    securityHeader(response.headers, "x-content-type-options", "nosniff"),
    securityHeader(response.headers, "x-frame-options", "DENY"),
    securityHeader(response.headers, "referrer-policy", "strict-origin-when-cross-origin"),
    securityHeader(
      response.headers,
      "permissions-policy",
      /camera=\(\).*microphone=\(\).*geolocation=\(\)/,
    ),
    securityHeader(response.headers, "strict-transport-security", /max-age=\d+/),
  ];

  return {
    name: "security-headers",
    ok: response.status === 200 && headers.every((header) => header.ok),
    status: response.status,
    headers,
  };
}

async function checkConvexAuthEndpoint() {
  if (!convexSiteUrl) {
    return {
      name: "convex-auth-endpoint",
      ok: true,
      skipped: true,
      reason: "NEXT_PUBLIC_CONVEX_SITE_URL not provided",
    };
  }

  const response = await fetchWithTimeout(`${convexSiteUrl}/api/auth/get-session`);

  return {
    name: "convex-auth-endpoint",
    ok: response.status === 200,
    status: response.status,
  };
}

async function notify(report) {
  if (!webhookUrl || report.ok) return;

  await fetchWithTimeout(webhookUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      app: "beasell",
      status: "attention",
      checkedAt: report.checkedAt,
      baseUrl: report.baseUrl,
      failedChecks: report.results.filter((result) => !result.ok).map((result) => result.name),
    }),
  }).catch((error) => {
    report.notification = {
      ok: false,
      reason: error instanceof Error ? error.message : String(error),
    };
  });

  report.notification ??= { ok: true };
}

async function main() {
  const results = [];

  for (const check of [
    checkHealthEndpoint,
    checkPublicPage,
    checkAdminRedirect,
    checkSecurityHeaders,
    checkConvexAuthEndpoint,
  ]) {
    try {
      results.push(await check());
    } catch (error) {
      results.push({
        name: check.name,
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  const report = {
    baseUrl,
    checkedAt: new Date().toISOString(),
    convexSiteUrl: convexSiteUrl ? "configured" : "not-configured",
    vercelBypassConfigured: Boolean(vercelBypassSecret),
    ok: results.every((result) => result.ok),
    results,
  };

  await notify(report);
  console.log(JSON.stringify(report, null, 2));

  if (!report.ok && !warnOnly) {
    process.exit(1);
  }
}

await main();
