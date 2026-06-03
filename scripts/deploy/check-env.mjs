#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);

function readArg(name, fallback = undefined) {
  const index = args.indexOf(name);
  if (index === -1) return fallback;
  return args[index + 1] ?? fallback;
}

function hasFlag(name) {
  return args.includes(name);
}

if (hasFlag("--help")) {
  console.log(`Usage:
  node scripts/deploy/check-env.mjs --file .env.local --mode local
  node scripts/deploy/check-env.mjs --file .env.production --mode production
  node scripts/deploy/check-env.mjs --file .env.example --mode example

Modes:
  local       Validates local/dev values without exposing secrets.
  production  Enforces production-safe URLs, deployment and placeholders.
  example     Checks that the sample file documents every required key.`);
  process.exit(0);
}

const mode = readArg("--mode", "local");
const envFile = readArg("--file");
const allowedModes = new Set(["local", "production", "example"]);

if (!allowedModes.has(mode)) {
  console.error(`Invalid mode: ${mode}`);
  process.exit(2);
}

function parseEnvFile(file) {
  const absolutePath = path.resolve(file);
  if (!existsSync(absolutePath)) {
    throw new Error(`Environment file not found: ${absolutePath}`);
  }

  const values = {};
  const text = readFileSync(absolutePath, "utf8");

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const separator = line.indexOf("=");
    if (separator === -1) continue;

    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    values[key] = value;
  }

  return values;
}

const env = envFile ? parseEnvFile(envFile) : process.env;

const required = [
  {
    key: "CONVEX_DEPLOYMENT",
    description: "Convex deployment name.",
    sensitive: false,
  },
  {
    key: "SITE_URL",
    description: "Canonical app URL used by Better Auth.",
    sensitive: false,
    url: true,
  },
  {
    key: "BETTER_AUTH_TRUSTED_ORIGINS",
    description: "Comma-separated trusted origins for Better Auth.",
    sensitive: false,
  },
  {
    key: "NEXT_PUBLIC_CONVEX_URL",
    description: "Convex client URL.",
    sensitive: false,
    url: true,
  },
  {
    key: "NEXT_PUBLIC_CONVEX_SITE_URL",
    description: "Convex HTTP/auth site URL.",
    sensitive: false,
    url: true,
  },
  {
    key: "BETTER_AUTH_SECRET",
    description: "Server-side Better Auth secret.",
    sensitive: true,
  },
  {
    key: "ADMIN_EMAILS",
    description: "Comma-separated owner/admin emails.",
    sensitive: true,
  },
];

const productionOnly = [
  {
    key: "NEXT_PUBLIC_SITE_URL",
    description: "Canonical public URL used by SEO metadata.",
    sensitive: false,
    url: true,
  },
];

function isPlaceholder(value) {
  const normalized = String(value ?? "").toLowerCase();
  return [
    "your-",
    "replace-",
    "example.com",
    "admin@example",
    "dummy-",
    "localhost:3000",
  ].some((needle) => normalized.includes(needle));
}

function isLocalUrl(value) {
  const normalized = String(value ?? "").toLowerCase();
  return (
    normalized.includes("localhost") ||
    normalized.includes("127.0.0.1") ||
    normalized.includes("0.0.0.0")
  );
}

function parseUrl(value) {
  try {
    return new URL(value);
  } catch {
    return null;
  }
}

function mask(value, sensitive) {
  if (!value) return "";
  if (!sensitive) return value;
  return `[set, ${String(value).length} chars]`;
}

const checks = mode === "production" || mode === "example" ? [...required, ...productionOnly] : required;
const errors = [];
const warnings = [];
const rows = [];

for (const item of checks) {
  const value = env[item.key];
  const configured = typeof value === "string" && value.trim().length > 0;

  rows.push({
    key: item.key,
    status: configured ? "configured" : "missing",
    value: configured ? mask(value, item.sensitive) : "",
  });

  if (!configured) {
    errors.push(`${item.key} is required (${item.description})`);
    continue;
  }

  if (mode === "example") {
    continue;
  }

  if (mode === "production" && isPlaceholder(value)) {
    errors.push(`${item.key} still looks like a placeholder`);
  }

  if (item.url) {
    const parsed = parseUrl(value);
    if (!parsed) {
      errors.push(`${item.key} must be a valid URL`);
    } else if (mode === "production" && parsed.protocol !== "https:") {
      errors.push(`${item.key} must use https in production`);
    }
  }
}

const trustedOrigins = String(env.BETTER_AUTH_TRUSTED_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

if (mode === "production") {
  const deployment = String(env.CONVEX_DEPLOYMENT ?? "");
  if (!deployment.startsWith("prod:")) {
    errors.push("CONVEX_DEPLOYMENT must point to a prod: deployment in production mode");
  }

  for (const key of ["SITE_URL", "NEXT_PUBLIC_SITE_URL", "NEXT_PUBLIC_CONVEX_URL", "NEXT_PUBLIC_CONVEX_SITE_URL"]) {
    if (isLocalUrl(env[key])) {
      errors.push(`${key} cannot use localhost or private loopback in production`);
    }
  }

  if (!trustedOrigins.includes(env.SITE_URL)) {
    errors.push("BETTER_AUTH_TRUSTED_ORIGINS must include SITE_URL");
  }

  if (trustedOrigins.some(isLocalUrl)) {
    errors.push("BETTER_AUTH_TRUSTED_ORIGINS cannot include localhost in production");
  }

  if (String(env.BETTER_AUTH_SECRET ?? "").length < 32) {
    errors.push("BETTER_AUTH_SECRET must have at least 32 characters");
  }

  const adminEmails = String(env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);

  if (adminEmails.length !== 1) {
    warnings.push("This is a one-owner LMS; production should normally have exactly one admin email");
  }

  for (const email of adminEmails) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push(`ADMIN_EMAILS contains an invalid email: ${email}`);
    }
  }
}

if (mode === "local") {
  if (String(env.BETTER_AUTH_SECRET ?? "").length < 16) {
    warnings.push("BETTER_AUTH_SECRET is short for local testing; use at least 32 chars in production");
  }

  if (!trustedOrigins.includes(env.SITE_URL)) {
    warnings.push("BETTER_AUTH_TRUSTED_ORIGINS should include SITE_URL");
  }
}

console.log(`Beasell environment readiness (${mode})`);
for (const row of rows) {
  const suffix = row.value ? ` -> ${row.value}` : "";
  console.log(`- ${row.key}: ${row.status}${suffix}`);
}

if (warnings.length > 0) {
  console.log("\nWarnings:");
  for (const warning of warnings) {
    console.log(`- ${warning}`);
  }
}

if (errors.length > 0) {
  console.error("\nErrors:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("\nEnvironment readiness passed.");
