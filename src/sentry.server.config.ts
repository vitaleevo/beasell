import * as Sentry from "@sentry/nextjs";
import { scrubSentryEvent, sentrySampleRate } from "./sentry.shared";

const dsn = process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    environment: process.env.SENTRY_ENVIRONMENT ?? process.env.VERCEL_ENV ?? process.env.NODE_ENV,
    sendDefaultPii: false,
    tracesSampleRate: sentrySampleRate(process.env.SENTRY_TRACES_SAMPLE_RATE, 0.05),
    beforeSend: scrubSentryEvent,
    enableLogs: process.env.SENTRY_ENABLE_LOGS === "1",
  });
}
