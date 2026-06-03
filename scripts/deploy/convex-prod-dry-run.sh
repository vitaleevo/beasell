#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
ENV_FILE="${1:-${PRODUCTION_ENV_FILE:-}}"

if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  cat <<'USAGE'
Usage:
  scripts/deploy/convex-prod-dry-run.sh /tmp/beasell.env.production

The env file must contain production-safe values, including:
  CONVEX_DEPLOYMENT=prod:<deployment-name>
  SITE_URL=https://<domain>
  NEXT_PUBLIC_SITE_URL=https://<domain>
  BETTER_AUTH_TRUSTED_ORIGINS=https://<domain>
  NEXT_PUBLIC_CONVEX_URL=https://<deployment>.convex.cloud
  NEXT_PUBLIC_CONVEX_SITE_URL=https://<deployment>.convex.site
  BETTER_AUTH_SECRET=<server-secret>
  ADMIN_EMAILS=<owner-email>

This script validates the file and runs Convex deploy in --dry-run mode only.
USAGE
  exit 0
fi

if [[ -z "$ENV_FILE" ]]; then
  echo "Missing production env file path." >&2
  echo "Pass it as the first argument or set PRODUCTION_ENV_FILE." >&2
  exit 2
fi

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Production env file not found: $ENV_FILE" >&2
  exit 1
fi

cd "$ROOT"

node scripts/deploy/check-env.mjs --file "$ENV_FILE" --mode production
./node_modules/.bin/convex deploy --dry-run --env-file "$ENV_FILE" --typecheck enable
