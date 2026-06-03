#!/usr/bin/env bash
set -euo pipefail

CONVEX_CONTAINER="${BEASELL_QA_CONVEX_CONTAINER:-beasell-qa-convex}"
NEXT_CONTAINER="${BEASELL_QA_NEXT_CONTAINER:-beasell-qa-next}"
NEXT_PORT="${NEXT_PORT:-3002}"

http_code() {
  local url="$1"
  curl -sS -o /dev/null -w "%{http_code}" --max-time 8 "$url" 2>/dev/null || true
}

next_code="$(http_code "http://127.0.0.1:$NEXT_PORT/sign-in")"
convex_code="$(http_code "http://127.0.0.1:3211/api/auth/get-session")"

echo "next=$next_code url=http://127.0.0.1:$NEXT_PORT"
echo "convex=$convex_code url=http://127.0.0.1:3211"
docker ps --filter "name=$NEXT_CONTAINER" --filter "name=$CONVEX_CONTAINER" \
  --format '{{.Names}} {{.Status}} {{.Ports}}'

if [[ "$next_code" == "200" && "$convex_code" == "200" ]]; then
  exit 0
fi

exit 1
