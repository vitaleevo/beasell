import * as Sentry from "@sentry/nextjs";
import { scrubSentryEvent, sentrySampleRate } from "./sentry.shared";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    environment:
      process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT ?? process.env.VERCEL_ENV ?? process.env.NODE_ENV,
    sendDefaultPii: false,
    tracesSampleRate: sentrySampleRate(process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE, 0.05),
    replaysSessionSampleRate: sentrySampleRate(
      process.env.NEXT_PUBLIC_SENTRY_REPLAYS_SESSION_SAMPLE_RATE,
      0,
    ),
    replaysOnErrorSampleRate: sentrySampleRate(
      process.env.NEXT_PUBLIC_SENTRY_REPLAYS_ERROR_SAMPLE_RATE,
      0,
    ),
    beforeSend: scrubSentryEvent,
  });
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
