#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT"

bash "$ROOT/scripts/qa/start-local.sh"

node scripts/qa/auth-rate-limit.mjs
node scripts/qa/security-negative.mjs

if [[ "${RUN_LEGACY_TMP_SMOKES:-0}" == "1" ]]; then
  for smoke in .tmp/payment-smoke.mjs .tmp/student-detail-smoke.mjs .tmp/admin-route-smoke.mjs; do
    if [[ -f "$smoke" ]]; then
      node "$smoke"
    else
      echo "Optional legacy smoke not found, skipping: $smoke"
    fi
  done
else
  echo "Legacy .tmp smokes skipped. Set RUN_LEGACY_TMP_SMOKES=1 to run local legacy artifacts."
fi

echo "Beasell QA smokes passed."
