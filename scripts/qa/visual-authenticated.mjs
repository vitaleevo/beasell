import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { ConvexHttpClient } from "convex/browser";

import { api } from "../../convex/_generated/api.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "../..");
const require = createRequire(import.meta.url);
const { chromium } = require(
  process.env.PLAYWRIGHT_REQUIRE_PATH ??
    path.join(root, ".tmp/qa/playwright-node/node_modules/playwright"),
);
const nextOrigin = process.env.NEXT_ORIGIN ?? "http://localhost:3002";
const trustedOrigin = process.env.TRUSTED_ORIGIN ?? "http://localhost:3002";
const convexUrl = process.env.CONVEX_URL ?? "http://127.0.0.1:3210";
const outputDir = process.env.VISUAL_OUTPUT_DIR
  ? path.resolve(process.env.VISUAL_OUTPUT_DIR)
  : path.join(root, ".tmp/qa");
const screenshotsDir = path.join(outputDir, "screenshots");
const reportPath = path.join(outputDir, "visual-report.json");
const password = "Teste12345!";
const stamp = Date.now();
const routeFilter = process.env.VISUAL_ROUTE_FILTER?.trim() ?? "";
const envText = readFileSync(path.join(root, ".env.local"), "utf8");
const originalAdminEmails = envText.match(/^ADMIN_EMAILS=(.*)$/m)?.[1]?.trim() ?? "";
const adminEmail = `visual-admin-${stamp}@beasell.test`;
const studentEmail = `visual-student-${stamp}@beasell.test`;

mkdirSync(screenshotsDir, { recursive: true });

function setConvexEnv(name, value) {
  execFileSync("./node_modules/.bin/convex", ["env", "set", name, value], {
    cwd: root,
    stdio: ["ignore", "ignore", "pipe"],
  });
}

function splitSetCookie(value) {
  if (!value) return [];
  return value.split(/,\s*(?=[^;,\s]+=)/g);
}

function getSetCookies(headers) {
  if (typeof headers.getSetCookie === "function") {
    return headers.getSetCookie();
  }

  return splitSetCookie(headers.get("set-cookie"));
}

function toCookieHeader(setCookies) {
  return setCookies
    .map((cookie) => cookie.split(";")[0])
    .filter(Boolean)
    .join("; ");
}

function parseCookieForBrowser(cookie) {
  const [nameValue] = cookie.split(";").map((item) => item.trim());
  const [name, ...valueParts] = nameValue.split("=");
  return {
    name,
    value: valueParts.join("="),
    url: nextOrigin,
  };
}

function getCookieValue(cookieHeader, name) {
  const match = cookieHeader.split("; ").find((cookie) => cookie.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function signup(email, name) {
  const response = await fetch(`${nextOrigin}/api/auth/sign-up/email`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: trustedOrigin,
    },
    body: JSON.stringify({ name, email, password }),
  });
  const body = await response.text();
  const setCookies = getSetCookies(response.headers);
  const cookieHeader = toCookieHeader(setCookies);
  const jwt = getCookieValue(cookieHeader, "better-auth.convex_jwt");

  if (!response.ok || !jwt) {
    throw new Error(`signup failed ${response.status}: ${body.slice(0, 300)}`);
  }

  const client = new ConvexHttpClient(convexUrl);
  client.setAuth(jwt);

  return {
    browserCookies: setCookies
      .map(parseCookieForBrowser)
      .filter((cookie) => cookie.name && cookie.value && cookie.url),
    client,
    cookieHeader,
  };
}

function screenshotName(viewportName, label) {
  return `${viewportName}-${label
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase()}.png`;
}

function filterRoutes(routes) {
  if (!routeFilter) return routes;

  return routes.filter(
    (route) => route.label.includes(routeFilter) || route.path.includes(routeFilter),
  );
}

async function inspectPage(page, route, viewportName, label) {
  const diagnostics = {
    console: [],
    pageErrors: [],
    requestFailures: [],
  };

  page.on("console", (message) => {
    diagnostics.console.push({
      text: message.text().slice(0, 300),
      type: message.type(),
    });
  });
  page.on("pageerror", (error) => {
    diagnostics.pageErrors.push({
      message: error.message.slice(0, 300),
      stack: error.stack?.slice(0, 1000) ?? "",
    });
  });
  page.on("requestfailed", (request) => {
    diagnostics.requestFailures.push({
      failure: request.failure()?.errorText ?? "",
      method: request.method(),
      url: request.url(),
    });
  });

  console.log(`visual:${viewportName}:${label}:${route.path}`);
  let gotoError = "";
  await page
    .goto(`${nextOrigin}${route.path}`, {
      timeout: 30000,
      waitUntil: "domcontentloaded",
    })
    .catch((error) => {
      gotoError = error instanceof Error ? error.message : String(error);
    });

  for (let attempt = 1; attempt <= 2; attempt += 1) {
    await page.waitForLoadState("networkidle", { timeout: 8000 }).catch(() => {});
    await page
      .waitForFunction(
        () => {
          const text = document.body.innerText.trim();
          return (
            (text !== "A carregar..." && text.length > 40) ||
            location.pathname.startsWith("/sign-in") ||
            location.pathname.startsWith("/unauthorized")
          );
        },
        { timeout: 30000 },
      )
      .catch(() => {});
    await page.waitForTimeout(700);

    const bodyText = await page
      .evaluate(() => document.body.innerText.trim())
      .catch(() => "");
    const currentPath = new URL(page.url()).pathname;
    if (
      bodyText.length > 40 ||
      currentPath.startsWith("/sign-in") ||
      currentPath.startsWith("/unauthorized")
    ) {
      break;
    }

    if (attempt < 2) {
      await page
        .reload({ timeout: 30000, waitUntil: "domcontentloaded" })
        .catch((error) => {
          const message = error instanceof Error ? error.message : String(error);
          gotoError = gotoError ? `${gotoError}\nreload: ${message}` : `reload: ${message}`;
        });
    }
  }

  const screenshot = path.join(screenshotsDir, screenshotName(viewportName, label));
  await page.screenshot({ path: screenshot, fullPage: true });

  let metrics;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      metrics = await page.evaluate(() => {
        const viewportWidth = document.documentElement.clientWidth;
        const viewportHeight = window.innerHeight;
        const scrollWidth = document.documentElement.scrollWidth;
        const scrollHeight = document.documentElement.scrollHeight;
        const offenders = [];

        for (const element of document.querySelectorAll("body *")) {
          const rect = element.getBoundingClientRect();
          const style = window.getComputedStyle(element);
          if (
            rect.width <= 0 ||
            rect.height <= 0 ||
            style.visibility === "hidden" ||
            style.display === "none"
          ) {
            continue;
          }

          if (rect.right > viewportWidth + 2 || rect.left < -2) {
            offenders.push({
              tag: element.tagName.toLowerCase(),
              text: element.textContent?.trim().slice(0, 80) ?? "",
              className:
                typeof element.className === "string" ? element.className.slice(0, 160) : "",
              left: Math.round(rect.left),
              right: Math.round(rect.right),
              width: Math.round(rect.width),
            });
          }

          if (offenders.length >= 12) break;
        }

        return {
          bodyText: document.body.innerText.slice(0, 600),
          currentUrl: window.location.href,
          overflowX: scrollWidth - viewportWidth,
          scrollHeight,
          scrollWidth,
          title: document.title,
          viewportHeight,
          viewportWidth,
          offenders,
        };
      });
      metrics.diagnostics = diagnostics;
      metrics.gotoError = gotoError;
      break;
    } catch (error) {
      if (attempt === 3) {
        metrics = {
          bodyText: "",
          currentUrl: page.url(),
          diagnostics,
          error: error instanceof Error ? error.message : String(error),
          gotoError,
          offenders: [],
          overflowX: 0,
          scrollHeight: 0,
          scrollWidth: 0,
          title: "",
          viewportHeight: page.viewportSize()?.height ?? 0,
          viewportWidth: page.viewportSize()?.width ?? 0,
        };
        break;
      }
      await page.waitForLoadState("domcontentloaded", { timeout: 10000 }).catch(() => {});
      await page.waitForTimeout(1000);
    }
  }

  if (!metrics) {
    throw new Error(`visual metrics were not collected for ${route.path}`);
  }

  const redirectedToSignIn = new URL(metrics.currentUrl).pathname.startsWith("/sign-in");
  const failed =
    redirectedToSignIn ||
    metrics.overflowX > 2 ||
    metrics.bodyText.trim().length < 40 ||
    metrics.offenders.length > 0;

  return {
    failed,
    label,
    route: route.path,
    screenshot,
    viewport: viewportName,
    metrics,
  };
}

async function main() {
  setConvexEnv("ADMIN_EMAILS", [originalAdminEmails, adminEmail].filter(Boolean).join(","));

  try {
    await wait(2000);

    const admin = await signup(adminEmail, "Admin Visual QA");
    await admin.client.mutation(api.users.ensureCurrentUser, {});

    const courseId = await admin.client.mutation(api.courses.createCourse, {
      title: `Curso Visual QA ${stamp}`,
      slug: `curso-visual-qa-${stamp}`,
      description: "Curso temporario para validar QA visual autenticada.",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
      price: 21500,
      isPublished: true,
    });
    const moduleId = await admin.client.mutation(api.courses.addModule, {
      courseId,
      title: "Modulo Visual QA",
      order: 1,
    });
    const lessonId = await admin.client.mutation(api.courses.addLesson, {
      moduleId,
      title: "Aula Visual QA",
      type: "video",
      contentUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      duration: 10,
      order: 1,
    });

    const student = await signup(studentEmail, "Aluno Visual QA");
    const studentUser = await student.client.mutation(api.users.ensureCurrentUser, {});
    const enrollmentId = await student.client.mutation(api.courses.enroll, {
      courseId,
      paymentMethod: "transferencia",
      paymentReference: `VISUAL-${stamp}`,
    });
    const payments = await admin.client.query(api.payments.listForAdmin, {});
    const payment = payments.find((row) => row.payment.enrollmentId === enrollmentId);
    if (!payment) {
      throw new Error("payment record not found for visual QA enrollment");
    }
    await admin.client.mutation(api.payments.approve, {
      paymentId: payment.payment._id,
      adminNote: "Aprovado automaticamente pela QA visual.",
    });
    await student.client.mutation(api.courses.toggleCompletion, {
      courseId,
      lessonId,
      completed: true,
    });

    const adminRoutes = filterRoutes([
      { label: "admin-dashboard", path: "/admin/dashboard" },
      { label: "admin-cursos", path: "/admin/cursos" },
      { label: "admin-curso-detalhe", path: `/admin/cursos/${courseId}` },
      { label: "admin-alunos", path: "/admin/alunos" },
      { label: "admin-aluno-detalhe", path: `/admin/alunos/${studentUser._id}` },
      { label: "admin-conteudos", path: "/admin/conteudos" },
      { label: "admin-analise", path: "/admin/analise" },
      { label: "admin-pagamentos", path: "/admin/pagamentos" },
      { label: "admin-precos", path: "/admin/precos" },
      { label: "admin-settings", path: "/admin/settings" },
    ]);
    const studentRoutes = filterRoutes([
      { label: "plataforma-cursos", path: "/plataforma/cursos" },
      { label: "plataforma-curso-detalhe", path: `/plataforma/cursos/curso-visual-qa-${stamp}` },
      { label: "plataforma-meus-cursos", path: "/plataforma/meus-cursos" },
    ]);

    if (adminRoutes.length + studentRoutes.length === 0) {
      throw new Error(`VISUAL_ROUTE_FILTER did not match any route: ${routeFilter}`);
    }

    const browser = await chromium.launch({ headless: true });
    const results = [];

    try {
      for (const viewport of [
        { name: "desktop", width: 1440, height: 1000 },
        { name: "mobile", width: 390, height: 844 },
      ]) {
        const adminContext = await browser.newContext({
          viewport: { width: viewport.width, height: viewport.height },
        });
        await adminContext.addCookies(admin.browserCookies);

        for (const route of adminRoutes) {
          const adminPage = await adminContext.newPage();
          results.push(await inspectPage(adminPage, route, viewport.name, route.label));
          await adminPage.close();
        }
        await adminContext.close();

        const studentContext = await browser.newContext({
          viewport: { width: viewport.width, height: viewport.height },
        });
        await studentContext.addCookies(student.browserCookies);

        for (const route of studentRoutes) {
          const studentPage = await studentContext.newPage();
          results.push(await inspectPage(studentPage, route, viewport.name, route.label));
          await studentPage.close();
        }
        await studentContext.close();
      }
    } finally {
      await browser.close();
    }

    const failed = results.filter((result) => result.failed);
    const report = {
      adminEmail,
      failedCount: failed.length,
      generatedAt: new Date().toISOString(),
      password,
      screenshotDir: screenshotsDir,
      total: results.length,
      results,
    };

    writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(
      JSON.stringify({ failedCount: failed.length, reportPath, total: results.length }, null, 2),
    );

    if (failed.length > 0) {
      throw new Error(`Visual QA found ${failed.length} failing page(s). See ${reportPath}`);
    }
  } finally {
    setConvexEnv("ADMIN_EMAILS", originalAdminEmails);
  }
}

await main();
