#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
TMP_DIR="$ROOT/.tmp/qa"

kill_pid_file() {
  local file="$1"
  if [[ ! -f "$file" ]]; then
    return
  fi

  local pid
  pid="$(cat "$file" 2>/dev/null || true)"
  if [[ -n "$pid" ]] && kill -0 "$pid" 2>/dev/null; then
    kill "$pid" 2>/dev/null || true
  fi
}

mkdir -p "$TMP_DIR"

kill_pid_file "$TMP_DIR/next.pid"
kill_pid_file "$TMP_DIR/convex.pid"

sleep 2

kill_pid_file "$TMP_DIR/next.pid"
kill_pid_file "$TMP_DIR/convex.pid"

while read -r pid cmd; do
  [[ -z "${pid:-}" ]] && continue
  if [[ "$cmd" == *"$ROOT"* ]] && {
    [[ "$cmd" == *"next dev"* ]] ||
    [[ "$cmd" == *"convex dev"* ]] ||
    [[ "$cmd" == *"convex-local-backend"* ]];
  }; then
    kill "$pid" 2>/dev/null || true
  fi
done < <(ps -eo pid=,cmd=)

sleep 2

while read -r pid cmd; do
  [[ -z "${pid:-}" ]] && continue
  if [[ "$cmd" == *"$ROOT"* ]] && {
    [[ "$cmd" == *"next dev"* ]] ||
    [[ "$cmd" == *"convex dev"* ]] ||
    [[ "$cmd" == *"convex-local-backend"* ]];
  }; then
    kill -9 "$pid" 2>/dev/null || true
  fi
done < <(ps -eo pid=,cmd=)

rm -f "$TMP_DIR/next.pid" "$TMP_DIR/convex.pid"

echo "Stopped Beasell local QA services."
