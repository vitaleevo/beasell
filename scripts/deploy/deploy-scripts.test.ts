import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

const temporaryDirs: string[] = [];

function makeTempDir() {
  const dir = mkdtempSync(path.join(tmpdir(), "beasell-deploy-test-"));
  temporaryDirs.push(dir);
  return dir;
}

function writeEnvFile(content: string) {
  const dir = makeTempDir();
  const file = path.join(dir, "env");
  writeFileSync(file, content.trim().concat("\n"));
  return file;
}

function runNode(args: string[]) {
  return spawnSync("node", args, {
    cwd: process.cwd(),
    encoding: "utf8",
  });
}

function validProductionEnv(overrides: Record<string, string> = {}) {
  return {
    ADMIN_EMAILS: "owner@beasell.invalid",
    BETTER_AUTH_SECRET: "abcdefghijklmnopqrstuvwxyz1234567890",
    BETTER_AUTH_TRUSTED_ORIGINS: "https://beasell.invalid",
    CONVEX_DEPLOYMENT: "prod:beasell",
    NEXT_PUBLIC_CONVEX_SITE_URL: "https://beasell.convex.site",
    NEXT_PUBLIC_CONVEX_URL: "https://beasell.convex.cloud",
    NEXT_PUBLIC_SITE_URL: "https://beasell.invalid",
    SITE_URL: "https://beasell.invalid",
    ...overrides,
  };
}

function toEnvText(values: Record<string, string>) {
  return Object.entries(values)
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");
}

afterEach(() => {
  for (const dir of temporaryDirs.splice(0)) {
    rmSync(dir, { force: true, recursive: true });
  }
});

describe("deployment scripts", () => {
  it("validates production env without leaking sensitive values", () => {
    const envFile = writeEnvFile(toEnvText(validProductionEnv()));
    const result = runNode([
      "scripts/deploy/check-env.mjs",
      "--file",
      envFile,
      "--mode",
      "production",
    ]);

    expect(result.status).toBe(0);
    expect(result.stdout).toContain("Environment readiness passed.");
    expect(result.stdout).toContain("BETTER_AUTH_SECRET: configured -> [set, 36 chars]");
    expect(result.stdout).toContain("ADMIN_EMAILS: configured -> [set, 21 chars]");
    expect(result.stdout).not.toContain("abcdefghijklmnopqrstuvwxyz1234567890");
    expect(result.stdout).not.toContain("owner@beasell.invalid");
  });

  it("rejects local URLs and non-production Convex deployments in production mode", () => {
    const envFile = writeEnvFile(
      toEnvText(
        validProductionEnv({
          BETTER_AUTH_TRUSTED_ORIGINS: "http://localhost:3000",
          CONVEX_DEPLOYMENT: "dev:beasell",
          NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
          SITE_URL: "http://localhost:3000",
        }),
      ),
    );
    const result = runNode([
      "scripts/deploy/check-env.mjs",
      "--file",
      envFile,
      "--mode",
      "production",
    ]);
    const output = `${result.stdout}\n${result.stderr}`;

    expect(result.status).toBe(1);
    expect(output).toContain("CONVEX_DEPLOYMENT must point to a prod: deployment");
    expect(output).toContain("SITE_URL must use https in production");
    expect(output).toContain("SITE_URL cannot use localhost");
    expect(output).toContain("BETTER_AUTH_TRUSTED_ORIGINS cannot include localhost");
  });

  it("filters only Convex server-side env keys", () => {
    const envFile = writeEnvFile(
      toEnvText(
        validProductionEnv({
          BETTER_AUTH_SECRET: "abc'defghijklmnopqrstuvwxyz1234567890",
        }),
      ),
    );
    const outputFile = path.join(makeTempDir(), "convex.env");
    const result = runNode([
      "scripts/deploy/filter-convex-env.mjs",
      "--input",
      envFile,
      "--output",
      outputFile,
    ]);
    const filtered = readFileSync(outputFile, "utf8");

    expect(result.status).toBe(0);
    expect(filtered).toContain("SITE_URL='https://beasell.invalid'");
    expect(filtered).toContain("BETTER_AUTH_TRUSTED_ORIGINS='https://beasell.invalid'");
    expect(filtered).toContain("BETTER_AUTH_SECRET='abc'\\''defghijklmnopqrstuvwxyz1234567890'");
    expect(filtered).toContain("ADMIN_EMAILS='owner@beasell.invalid'");
    expect(filtered).not.toContain("NEXT_PUBLIC_CONVEX_URL");
    expect(filtered).not.toContain("CONVEX_DEPLOYMENT");
  });

  it("initializes a production env file outside the repository", () => {
    const outputFile = path.join(makeTempDir(), "beasell.env.production");
    const result = runNode([
      "scripts/deploy/init-production-env.mjs",
      "--domain",
      "beasell.invalid",
      "--deployment",
      "beasell-prod",
      "--owner-email",
      "owner@beasell.invalid",
      "--output",
      outputFile,
    ]);
    const generated = readFileSync(outputFile, "utf8");
    const secretMatch = generated.match(/^BETTER_AUTH_SECRET=(.+)$/m);

    expect(result.status).toBe(0);
    expect(result.stdout).toContain("Environment readiness passed.");
    expect(result.stdout).toContain(`Production env file created: ${outputFile}`);
    expect(generated).toContain("CONVEX_DEPLOYMENT=prod:beasell-prod");
    expect(generated).toContain("SITE_URL=https://beasell.invalid");
    expect(generated).toContain("NEXT_PUBLIC_CONVEX_URL=https://beasell-prod.convex.cloud");
    expect(generated).toContain("ADMIN_EMAILS=owner@beasell.invalid");
    expect(secretMatch?.[1]).toHaveLength(64);
    expect(statSync(outputFile).mode & 0o777).toBe(0o600);
  });

  it("refuses to initialize production env files inside the repository", () => {
    const result = runNode([
      "scripts/deploy/init-production-env.mjs",
      "--domain",
      "beasell.invalid",
      "--deployment",
      "beasell-prod",
      "--owner-email",
      "owner@beasell.invalid",
      "--output",
      path.join(process.cwd(), ".tmp", "beasell.env.production"),
    ]);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain("Refusing to write production secrets inside the repository");
  });
});
