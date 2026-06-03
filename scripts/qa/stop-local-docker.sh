#!/usr/bin/env bash
set -euo pipefail

CONVEX_CONTAINER="${BEASELL_QA_CONVEX_CONTAINER:-beasell-qa-convex}"
NEXT_CONTAINER="${BEASELL_QA_NEXT_CONTAINER:-beasell-qa-next}"

docker rm -f "$NEXT_CONTAINER" "$CONVEX_CONTAINER" >/dev/null 2>&1 || true

echo "Stopped Beasell Docker QA services."
