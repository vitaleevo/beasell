import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function isConfigured(name: string) {
  return Boolean(process.env[name]?.trim());
}

export async function GET() {
  const checks = {
    siteUrl: isConfigured("NEXT_PUBLIC_SITE_URL") || isConfigured("SITE_URL"),
    convexClientUrl: isConfigured("NEXT_PUBLIC_CONVEX_URL"),
    convexSiteUrl: isConfigured("NEXT_PUBLIC_CONVEX_SITE_URL"),
    authSecret: isConfigured("BETTER_AUTH_SECRET"),
    trustedOrigins: isConfigured("BETTER_AUTH_TRUSTED_ORIGINS"),
    adminEmails: isConfigured("ADMIN_EMAILS"),
  };
  const missing = Object.entries(checks)
    .filter(([, configured]) => !configured)
    .map(([name]) => name);
  const status = missing.length === 0 ? "ok" : "degraded";

  return NextResponse.json(
    {
      app: "beasell",
      status,
      checkedAt: new Date().toISOString(),
      checks,
      observability: {
        sentryConfigured: isConfigured("NEXT_PUBLIC_SENTRY_DSN") || isConfigured("SENTRY_DSN"),
        monitorWebhookConfigured: isConfigured("BEASELL_MONITOR_WEBHOOK_URL"),
      },
      missing,
      revision: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 12) ?? null,
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    },
  );
}
