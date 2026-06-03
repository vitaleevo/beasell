#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
IMAGE="${BEASELL_QA_NODE_IMAGE:-node:22-bookworm-slim}"
CONVEX_CONTAINER="${BEASELL_QA_CONVEX_CONTAINER:-beasell-qa-convex}"
NEXT_CONTAINER="${BEASELL_QA_NEXT_CONTAINER:-beasell-qa-next}"
CONVEX_LOCAL_CONFIG="$ROOT/.convex/local/default/config.json"
CONVEX_LOCAL_BACKEND_VERSION="${CONVEX_LOCAL_BACKEND_VERSION:-}"
NEXT_PORT="${NEXT_PORT:-3002}"
SITE_URL="${SITE_URL:-http://localhost:$NEXT_PORT}"

if [[ -z "$CONVEX_LOCAL_BACKEND_VERSION" && -f "$CONVEX_LOCAL_CONFIG" ]]; then
  CONVEX_LOCAL_BACKEND_VERSION="$(
    node -e 'const fs = require("fs"); const file = process.argv[1]; const config = JSON.parse(fs.readFileSync(file, "utf8")); process.stdout.write(config.backendVersion || "");' \
      "$CONVEX_LOCAL_CONFIG"
  )"
fi

if [[ -z "$CONVEX_LOCAL_BACKEND_VERSION" ]]; then
  echo "Missing CONVEX_LOCAL_BACKEND_VERSION and no local Convex config was found." >&2
  exit 1
fi

http_code() {
  local url="$1"
  curl -sS -o /dev/null -w "%{http_code}" --max-time 8 "$url" 2>/dev/null || true
}

wait_for() {
  local name="$1"
  local url="$2"
  local expected="$3"
  local container="$4"

  for _ in $(seq 1 90); do
    code="$(http_code "$url")"
    if [[ "$code" == "$expected" ]]; then
      echo "$name ready ($code): $url"
      return 0
    fi
    sleep 2
  done

  echo "$name did not become ready at $url" >&2
  docker logs --tail 120 "$container" >&2 || true
  return 1
}

cd "$ROOT"

"$ROOT/scripts/qa/stop-local-docker.sh" >/dev/null 2>&1 || true
"$ROOT/scripts/qa/stop-local.sh" >/dev/null 2>&1 || true

docker run -d \
  --name "$CONVEX_CONTAINER" \
  --network host \
  --user 1000:1000 \
  -e HOME=/home/node \
  -e CONVEX_LOCAL_BACKEND_VERSION="$CONVEX_LOCAL_BACKEND_VERSION" \
  -v "$ROOT:/app" \
  -v "/home/alexandre/.cache/convex:/home/node/.cache/convex" \
  -w /app \
  "$IMAGE" \
  sh -lc './node_modules/.bin/convex dev --local-backend-version "$CONVEX_LOCAL_BACKEND_VERSION"' \
  >/dev/null

wait_for "Convex" "http://127.0.0.1:3211/api/auth/get-session" "200" "$CONVEX_CONTAINER"

docker run -d \
  --name "$NEXT_CONTAINER" \
  --network host \
  --user 1000:1000 \
  -e HOME=/home/node \
  -e SITE_URL="$SITE_URL" \
  -e NEXT_PORT="$NEXT_PORT" \
  -e NEXT_PUBLIC_CONVEX_URL=http://127.0.0.1:3210 \
  -e NEXT_PUBLIC_CONVEX_SITE_URL=http://127.0.0.1:3211 \
  -v "$ROOT:/app" \
  -w /app \
  "$IMAGE" \
  sh -lc 'npm run dev -- --webpack --hostname 0.0.0.0 --port "$NEXT_PORT"' \
  >/dev/null

wait_for "Next" "http://127.0.0.1:$NEXT_PORT/sign-in" "200" "$NEXT_CONTAINER"

echo "Beasell Docker QA ready:"
echo "- Next: http://localhost:$NEXT_PORT"
echo "- Convex: http://127.0.0.1:3211"
