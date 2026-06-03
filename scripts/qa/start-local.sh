#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
TMP_DIR="$ROOT/.tmp/qa"
NEXT_URL="${NEXT_URL:-http://127.0.0.1:3002}"
NEXT_HOST="${NEXT_HOST:-0.0.0.0}"
NEXT_PORT="${NEXT_PORT:-3002}"
SITE_URL="${SITE_URL:-http://localhost:3002}"
CONVEX_SITE_URL="${CONVEX_SITE_URL:-http://127.0.0.1:3211}"
CONVEX_LOCAL_CONFIG="$ROOT/.convex/local/default/config.json"
CONVEX_LOCAL_BACKEND_VERSION="${CONVEX_LOCAL_BACKEND_VERSION:-}"

mkdir -p "$TMP_DIR"
cd "$ROOT"

if [[ -z "$CONVEX_LOCAL_BACKEND_VERSION" && -f "$CONVEX_LOCAL_CONFIG" ]]; then
  CONVEX_LOCAL_BACKEND_VERSION="$(
    node -e 'const fs = require("fs"); const file = process.argv[1]; const config = JSON.parse(fs.readFileSync(file, "utf8")); process.stdout.write(config.backendVersion || "");' \
      "$CONVEX_LOCAL_CONFIG"
  )"
fi

http_code() {
  local url="$1"
  curl -sS -o /dev/null -w "%{http_code}" --max-time 8 "$url" 2>/dev/null || true
}

wait_for() {
  local name="$1"
  local url="$2"
  local expected="$3"
  local log_file="$4"

  for _ in $(seq 1 90); do
    code="$(http_code "$url")"
    if [[ "$code" == "$expected" ]]; then
      echo "$name ready ($code): $url"
      return 0
    fi
    sleep 2
  done

  echo "$name did not become ready at $url" >&2
  echo "Last log lines from $log_file:" >&2
  tail -n 80 "$log_file" >&2 || true
  return 1
}

if "$ROOT/scripts/qa/health-local.sh" >/dev/null 2>&1; then
  echo "Beasell local QA already ready at $SITE_URL"
  exit 0
fi

"$ROOT/scripts/qa/stop-local.sh" >/dev/null 2>&1 || true

convex_cmd=(./node_modules/.bin/convex dev)
if [[ -n "$CONVEX_LOCAL_BACKEND_VERSION" ]]; then
  convex_cmd+=(--local-backend-version "$CONVEX_LOCAL_BACKEND_VERSION")
fi

printf 'Starting Convex: %q ' "${convex_cmd[@]}" >"$TMP_DIR/convex.log"
printf '\n' >>"$TMP_DIR/convex.log"
nohup "${convex_cmd[@]}" >>"$TMP_DIR/convex.log" 2>&1 &
echo "$!" >"$TMP_DIR/convex.pid"
wait_for "Convex" "$CONVEX_SITE_URL/api/auth/get-session" "200" "$TMP_DIR/convex.log"

nohup env SITE_URL="$SITE_URL" npm run dev -- --webpack --hostname "$NEXT_HOST" --port "$NEXT_PORT" \
  >"$TMP_DIR/next.log" 2>&1 &
echo "$!" >"$TMP_DIR/next.pid"
wait_for "Next" "$NEXT_URL/sign-in" "200" "$TMP_DIR/next.log"

echo "Beasell local QA ready:"
echo "- Next: http://localhost:$NEXT_PORT"
echo "- Convex: $CONVEX_SITE_URL"
