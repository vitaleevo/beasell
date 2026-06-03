#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const convexEnvKeys = [
  "SITE_URL",
  "BETTER_AUTH_TRUSTED_ORIGINS",
  "BETTER_AUTH_SECRET",
  "ADMIN_EMAILS",
];

const args = process.argv.slice(2);

function readArg(name, fallback = undefined) {
  const index = args.indexOf(name);
  if (index === -1) return fallback;
  return args[index + 1] ?? fallback;
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
    const value = line.slice(separator + 1).trim();
    values[key] = value;
  }

  return values;
}

function shellQuote(value) {
  return String(value).replace(/'/g, "'\\''");
}

const input = readArg("--input");
const output = readArg("--output");

if (!input || !output) {
  console.error("Usage: node scripts/deploy/filter-convex-env.mjs --input <env-file> --output <env-file>");
  process.exit(2);
}

const env = parseEnvFile(input);
const missing = convexEnvKeys.filter((key) => !env[key]);

if (missing.length > 0) {
  console.error(`Missing Convex env key(s): ${missing.join(", ")}`);
  process.exit(1);
}

const content = convexEnvKeys
  .map((key) => `${key}='${shellQuote(env[key])}'`)
  .join("\n")
  .concat("\n");

writeFileSync(output, content, { mode: 0o600 });
console.log(`Wrote Convex env subset with keys: ${convexEnvKeys.join(", ")}`);
