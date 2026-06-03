#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
ENV_FILE="${1:-${PRODUCTION_ENV_FILE:-}}"
CONVEX_DEPLOYMENT_TARGET="${CONVEX_DEPLOYMENT_TARGET:-prod}"
APPLY="${APPLY:-0}"
FORCE="${FORCE:-0}"

if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  cat <<'USAGE'
Usage:
  scripts/deploy/apply-convex-env.sh /tmp/beasell.env.production

Dry-run is the default. It validates the production env file, extracts only
the Convex server-side keys, and prints which deployment target would be used.

Apply for real:
  APPLY=1 scripts/deploy/apply-convex-env.sh /tmp/beasell.env.production

Optional:
  CONVEX_DEPLOYMENT_TARGET=prod
  CONVEX_DEPLOYMENT_TARGET=<specific-deployment-name>
  FORCE=1  # overwrite existing Convex env values

Server-side keys applied to Convex:
  SITE_URL
  BETTER_AUTH_TRUSTED_ORIGINS
  BETTER_AUTH_SECRET
  ADMIN_EMAILS
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

filtered_env="$(mktemp)"
trap 'rm -f "$filtered_env"' EXIT

node scripts/deploy/filter-convex-env.mjs --input "$ENV_FILE" --output "$filtered_env"

echo "Convex deployment target: $CONVEX_DEPLOYMENT_TARGET"
echo "Convex env keys: SITE_URL, BETTER_AUTH_TRUSTED_ORIGINS, BETTER_AUTH_SECRET, ADMIN_EMAILS"

if [[ "$APPLY" != "1" ]]; then
  echo "Dry-run only. Set APPLY=1 to write these variables to Convex."
  exit 0
fi

cmd=(./node_modules/.bin/convex env --deployment "$CONVEX_DEPLOYMENT_TARGET" set --from-file "$filtered_env")
if [[ "$FORCE" == "1" ]]; then
  cmd+=(--force)
fi

"${cmd[@]}"
echo "Convex environment variables applied."
