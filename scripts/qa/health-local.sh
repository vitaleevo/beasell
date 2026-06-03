#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
NEXT_URL="${NEXT_URL:-http://127.0.0.1:3002}"
CONVEX_SITE_URL="${CONVEX_SITE_URL:-http://127.0.0.1:3211}"
TMP_DIR="$ROOT/.tmp/qa"

http_code() {
  local url="$1"
  curl -sS -o /dev/null -w "%{http_code}" --max-time 8 "$url" 2>/dev/null || true
}

next_code="$(http_code "$NEXT_URL/sign-in")"
convex_code="$(http_code "$CONVEX_SITE_URL/api/auth/get-session")"

next_ok=0
convex_ok=0

case "$next_code" in
  200|307|308) next_ok=1 ;;
esac

case "$convex_code" in
  200) convex_ok=1 ;;
esac

echo "next=$next_code url=$NEXT_URL"
echo "convex=$convex_code url=$CONVEX_SITE_URL"

if [[ -f "$TMP_DIR/next.pid" ]]; then
  echo "next_pid=$(cat "$TMP_DIR/next.pid")"
fi

if [[ -f "$TMP_DIR/convex.pid" ]]; then
  echo "convex_pid=$(cat "$TMP_DIR/convex.pid")"
fi

if [[ "$next_ok" == "1" && "$convex_ok" == "1" ]]; then
  exit 0
fi

exit 1
