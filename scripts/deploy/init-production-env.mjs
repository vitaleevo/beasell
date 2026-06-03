#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import { existsSync, writeFileSync, chmodSync } from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const root = process.cwd();

function readArg(name, fallback = undefined) {
  const index = args.indexOf(name);
  if (index === -1) return fallback;
  return args[index + 1] ?? fallback;
}

function hasFlag(name) {
  return args.includes(name);
}

if (hasFlag("--help") || hasFlag("-h")) {
  console.log(`Usage:
  node scripts/deploy/init-production-env.mjs --domain beasell.ao --deployment <convex-deployment> --owner-email dono@beasell.ao

Options:
  --output /tmp/beasell.env.production  Path to write. Defaults to PRODUCTION_ENV_FILE or /tmp/beasell.env.production.
  --force                               Overwrite an existing output file.

This writes a production env file outside the repository with mode 0600,
generates a strong BETTER_AUTH_SECRET, and validates the result.`);
  process.exit(0);
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

function requireArg(name, envName) {
  const value = readArg(name, process.env[envName]);
  if (!value || !String(value).trim()) {
    fail(`Missing ${name}.`);
  }
  return String(value).trim();
}

function normalizeSiteUrl(input) {
  const raw = String(input).trim();
  const withProtocol = raw.startsWith("http://") || raw.startsWith("https://") ? raw : `https://${raw}`;
  let parsed;

  try {
    parsed = new URL(withProtocol);
  } catch {
    fail("--domain must be a valid domain or HTTPS URL.");
  }

  if (parsed.protocol !== "https:") {
    fail("--domain must use https in production.");
  }

  if (parsed.pathname !== "/" || parsed.search || parsed.hash) {
    fail("--domain must not include path, query string, or hash.");
  }

  const hostname = parsed.hostname.toLowerCase();
  if (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "0.0.0.0" ||
    hostname.includes("<") ||
    hostname.includes("example.com")
  ) {
    fail("--domain must be a real public production domain.");
  }

  return `https://${hostname}${parsed.port ? `:${parsed.port}` : ""}`;
}

function normalizeDeployment(input) {
  const raw = String(input).trim();
  const deployment = raw.startsWith("prod:") ? raw.slice("prod:".length) : raw;

  if (!deployment || deployment.includes("<") || /\s/.test(deployment) || deployment.includes("/")) {
    fail("--deployment must be a Convex production deployment name, without spaces or placeholders.");
  }

  return deployment;
}

function normalizeOwnerEmail(input) {
  const email = String(input).trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.includes("<") || email.includes("example.")) {
    fail("--owner-email must be the real email of the owner/professor.");
  }
  return email;
}

function ensureOutputOutsideRepo(outputPath) {
  const absoluteOutput = path.resolve(outputPath);
  const absoluteRoot = path.resolve(root);
  if (absoluteOutput === absoluteRoot || absoluteOutput.startsWith(`${absoluteRoot}${path.sep}`)) {
    fail("Refusing to write production secrets inside the repository.");
  }
  return absoluteOutput;
}

const siteUrl = normalizeSiteUrl(requireArg("--domain", "PRODUCTION_DOMAIN"));
const deployment = normalizeDeployment(requireArg("--deployment", "CONVEX_PRODUCTION_DEPLOYMENT"));
const ownerEmail = normalizeOwnerEmail(requireArg("--owner-email", "PRODUCTION_OWNER_EMAIL"));
const output = ensureOutputOutsideRepo(
  readArg("--output", process.env.PRODUCTION_ENV_FILE ?? "/tmp/beasell.env.production"),
);
const force = hasFlag("--force") || process.env.FORCE === "1";

if (existsSync(output) && !force) {
  fail(`Output file already exists: ${output}. Use --force to overwrite.`);
}

const secret = randomBytes(48).toString("base64url");
const content = [
  "# Beasell production environment.",
  "# Generated outside the repository. Do not commit this file.",
  "",
  `CONVEX_DEPLOYMENT=prod:${deployment}`,
  `SITE_URL=${siteUrl}`,
  `NEXT_PUBLIC_SITE_URL=${siteUrl}`,
  `BETTER_AUTH_TRUSTED_ORIGINS=${siteUrl}`,
  `NEXT_PUBLIC_CONVEX_URL=https://${deployment}.convex.cloud`,
  `NEXT_PUBLIC_CONVEX_SITE_URL=https://${deployment}.convex.site`,
  `BETTER_AUTH_SECRET=${secret}`,
  `ADMIN_EMAILS=${ownerEmail}`,
  "",
].join("\n");

writeFileSync(output, content, { mode: 0o600 });
chmodSync(output, 0o600);

const validation = spawnSync(
  "node",
  ["scripts/deploy/check-env.mjs", "--file", output, "--mode", "production"],
  {
    cwd: root,
    encoding: "utf8",
  },
);

process.stdout.write(validation.stdout);
process.stderr.write(validation.stderr);

if (validation.status !== 0) {
  process.exit(validation.status ?? 1);
}

console.log(`Production env file created: ${output}`);
console.log("File mode: 0600");
console.log("Next: run npm run deploy:convex:env -- /tmp/beasell.env.production");
