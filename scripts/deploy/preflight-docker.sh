#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
IMAGE="${BEASELL_PREFLIGHT_NODE_IMAGE:-node:22-alpine}"
RUN_VISUAL="${RUN_VISUAL:-0}"
PRODUCTION_ENV_FILE="${PRODUCTION_ENV_FILE:-}"

docker_node() {
  docker run --rm \
    --user 1000:1000 \
    -e NEXT_TELEMETRY_DISABLED=1 \
    -v "$ROOT:/app" \
    -w /app \
    "$IMAGE" \
    "$@"
}

echo "== Beasell preflight: env example =="
docker_node npm run qa:env:example

echo "== Beasell preflight: env local =="
docker_node npm run qa:env

if [[ -n "$PRODUCTION_ENV_FILE" ]]; then
  if [[ ! -f "$PRODUCTION_ENV_FILE" ]]; then
    echo "Production env file not found: $PRODUCTION_ENV_FILE" >&2
    exit 1
  fi

  production_env_abs="$(realpath "$PRODUCTION_ENV_FILE")"
  echo "== Beasell preflight: env production =="
  docker run --rm \
    --user 1000:1000 \
    -v "$ROOT:/app" \
    -v "$production_env_abs:/tmp/beasell-production.env:ro" \
    -w /app \
    "$IMAGE" \
    node scripts/deploy/check-env.mjs --file /tmp/beasell-production.env --mode production
else
  echo "== Beasell preflight: env production skipped =="
  echo "Set PRODUCTION_ENV_FILE=/tmp/beasell.env.production to validate production values."
fi

echo "== Beasell preflight: lint =="
docker_node npm run lint

echo "== Beasell preflight: tests =="
docker_node npm run test

echo "== Beasell preflight: build =="
"$ROOT/scripts/qa/stop-local-docker.sh" >/dev/null 2>&1 || true
docker_node npm run build

echo "== Beasell preflight: local authenticated smokes =="
"$ROOT/scripts/qa/run-smokes-docker.sh"

if [[ "$RUN_VISUAL" == "1" ]]; then
  echo "== Beasell preflight: visual QA =="
  "$ROOT/scripts/qa/run-visual-docker.sh"
else
  echo "== Beasell preflight: visual QA skipped =="
  echo "Set RUN_VISUAL=1 to run Playwright screenshots for all primary pages."
fi

echo "== Beasell preflight: health =="
"$ROOT/scripts/qa/health-local-docker.sh"

echo "Beasell Docker preflight passed."
