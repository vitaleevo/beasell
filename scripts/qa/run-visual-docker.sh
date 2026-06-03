#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
IMAGE="${BEASELL_QA_PLAYWRIGHT_IMAGE:-mcr.microsoft.com/playwright:v1.57.0-noble}"
PLAYWRIGHT_NODE_DIR="${BEASELL_QA_PLAYWRIGHT_NODE_DIR:-/tmp/beasell-playwright-node}"
VISUAL_OUTPUT_DIR="${BEASELL_QA_VISUAL_OUTPUT_DIR:-/tmp/beasell-visual-qa}"

"$ROOT/scripts/qa/start-local-docker.sh"

mkdir -p "$PLAYWRIGHT_NODE_DIR"
mkdir -p "$VISUAL_OUTPUT_DIR"

docker run --rm \
  --network host \
  --user 1000:1000 \
  -e HOME=/tmp \
  -e npm_config_cache=/tmp/npm-cache \
  -e PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 \
  -v "$PLAYWRIGHT_NODE_DIR:/playwright-node" \
  -w /playwright-node \
  "$IMAGE" \
  sh -lc 'if [ ! -d node_modules/playwright ]; then npm init -y >/dev/null 2>&1; npm install playwright@1.57.0 >/dev/null; fi'

docker run --rm \
  --network host \
  --user 1000:1000 \
  -e HOME=/tmp \
  -e NODE_PATH=/playwright-node/node_modules \
  -e PLAYWRIGHT_REQUIRE_PATH=/playwright-node/node_modules/playwright \
  -e NEXT_ORIGIN=http://localhost:3002 \
  -e TRUSTED_ORIGIN=http://localhost:3002 \
  -e CONVEX_URL=http://127.0.0.1:3210 \
  -e VISUAL_ROUTE_FILTER="${VISUAL_ROUTE_FILTER:-}" \
  -e VISUAL_OUTPUT_DIR=/visual-output \
  -v "$ROOT:/app" \
  -v "$PLAYWRIGHT_NODE_DIR:/playwright-node" \
  -v "$VISUAL_OUTPUT_DIR:/visual-output" \
  -w /app \
  "$IMAGE" \
  node scripts/qa/visual-authenticated.mjs
