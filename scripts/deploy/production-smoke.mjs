#!/usr/bin/env node

const args = process.argv.slice(2);

function readArg(name, fallback = undefined) {
  const index = args.indexOf(name);
  if (index === -1) return fallback;
  return args[index + 1] ?? fallback;
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

if (!baseUrl) {
  console.error("Missing --base-url or NEXT_PUBLIC_SITE_URL/SITE_URL.");
  process.exit(2);
}

function url(path) {
  return `${baseUrl}${path}`;
}

async function expectOk(path, expectedText) {
  const response = await fetch(url(path), { redirect: "follow" });
  const text = await response.text();

  if (response.status !== 200) {
    throw new Error(`${path} returned ${response.status}`);
  }

  if (expectedText && !text.toLowerCase().includes(expectedText.toLowerCase())) {
    throw new Error(`${path} did not contain expected text: ${expectedText}`);
  }

  return { path, status: response.status, bytes: text.length };
}

function expectHeader(headers, name, expectedValue) {
  const actual = headers.get(name);

  if (!actual) {
    throw new Error(`Missing security header: ${name}`);
  }

  if (expectedValue instanceof RegExp) {
    if (!expectedValue.test(actual)) {
      throw new Error(`Security header ${name} did not match ${expectedValue}: ${actual}`);
    }
    return actual;
  }

  if (actual !== expectedValue) {
    throw new Error(`Security header ${name} expected ${expectedValue}, got ${actual}`);
  }

  return actual;
}

async function expectSecurityHeaders() {
  const response = await fetch(url("/"), { redirect: "follow" });

  if (response.status !== 200) {
    throw new Error(`Security header check expected / to return 200, got ${response.status}`);
  }

  const headers = {
    "x-content-type-options": expectHeader(
      response.headers,
      "x-content-type-options",
      "nosniff",
    ),
    "x-frame-options": expectHeader(response.headers, "x-frame-options", "DENY"),
    "referrer-policy": expectHeader(
      response.headers,
      "referrer-policy",
      "strict-origin-when-cross-origin",
    ),
    "permissions-policy": expectHeader(
      response.headers,
      "permissions-policy",
      /camera=\(\).*microphone=\(\).*geolocation=\(\)/,
    ),
    "strict-transport-security": expectHeader(
      response.headers,
      "strict-transport-security",
      /max-age=\d+/,
    ),
  };

  return { path: "/", securityHeaders: headers };
}

async function expectAdminRedirect() {
  return expectSignInRedirect("/admin/dashboard");
}

async function expectSignInRedirect(path) {
  const response = await fetch(url(path), { redirect: "manual" });
  const location = response.headers.get("location") ?? "";
  const redirected = [301, 302, 303, 307, 308].includes(response.status);

  if (!redirected || !location.includes("/sign-in")) {
    throw new Error(
      `${path} should redirect anonymous users to sign-in; got ${response.status} ${location}`,
    );
  }

  return { path, status: response.status, location };
}

async function expectConvexAuthEndpoint() {
  if (!convexSiteUrl) {
    return { skipped: true, reason: "NEXT_PUBLIC_CONVEX_SITE_URL not provided" };
  }

  const response = await fetch(`${convexSiteUrl}/api/auth/get-session`);
  if (response.status !== 200) {
    throw new Error(`Convex auth endpoint returned ${response.status}`);
  }

  return { endpoint: `${convexSiteUrl}/api/auth/get-session`, status: response.status };
}

const results = [];

const publicPages = [
  { path: "/", expectedText: "Beasell" },
  { path: "/sign-in", expectedText: "Entrar" },
  { path: "/sign-up", expectedText: "Criar" },
  { path: "/plataforma/cursos", expectedText: "Cursos" },
];

const protectedRoutes = [
  "/admin/dashboard",
  "/admin/cursos",
  "/admin/alunos",
  "/admin/conteudos",
  "/admin/analise",
  "/admin/pagamentos",
  "/admin/precos",
  "/admin/settings",
  "/plataforma/meus-cursos",
  "/plataforma/cursos/mestres-vendas-mercado-angolano/aulas/smoke-lesson",
];

for (const page of publicPages) {
  results.push(await expectOk(page.path, page.expectedText));
}

for (const path of protectedRoutes) {
  results.push(
    path === "/admin/dashboard" ? await expectAdminRedirect() : await expectSignInRedirect(path),
  );
}

results.push(await expectConvexAuthEndpoint());
results.push(await expectSecurityHeaders());

console.log(
  JSON.stringify(
    {
      baseUrl,
      checkedAt: new Date().toISOString(),
      convexSiteUrl: convexSiteUrl || null,
      results,
    },
    null,
    2,
  ),
);
