import type { Event } from "@sentry/nextjs";

const SENSITIVE_EVENT_KEYS = [
  "authorization",
  "cookie",
  "set-cookie",
  "token",
  "secret",
  "password",
  "paymentProofUrl",
  "proofUrl",
  "proofStorageId",
];

function scrubValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(scrubValue);
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  const scrubbed: Record<string, unknown> = {};
  for (const [key, nestedValue] of Object.entries(value as Record<string, unknown>)) {
    const normalizedKey = key.toLowerCase();
    if (SENSITIVE_EVENT_KEYS.some((sensitiveKey) => normalizedKey.includes(sensitiveKey))) {
      scrubbed[key] = "[Filtered]";
      continue;
    }
    scrubbed[key] = scrubValue(nestedValue);
  }

  return scrubbed;
}

export function scrubSentryEvent<TEvent extends Event>(event: TEvent): TEvent {
  if (event.user) {
    delete event.user.email;
    delete event.user.ip_address;
    delete event.user.username;
  }

  if (event.request?.headers) {
    event.request.headers = scrubValue(event.request.headers) as Record<string, string>;
  }

  if (event.request?.cookies) {
    event.request.cookies = {};
  }

  if (event.request?.url) {
    event.request.url = event.request.url.split("?")[0];
  }

  if (event.extra) {
    event.extra = scrubValue(event.extra) as Record<string, unknown>;
  }

  if (event.contexts) {
    event.contexts = scrubValue(event.contexts) as Event["contexts"];
  }

  return event;
}

export function sentrySampleRate(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  if (Number.isFinite(parsed) && parsed >= 0 && parsed <= 1) {
    return parsed;
  }
  return fallback;
}
