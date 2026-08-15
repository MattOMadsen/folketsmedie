#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
export TZ=Europe/Copenhagen
python3 "$ROOT/scripts/insert-co2-sporstof.py"
export COMMIT_MSG="Deploy: CO2-sporstof (18:00 15. aug 2026)"
"$ROOT/scripts/deploy-gh-pages.sh"
git add data/export.json public/media/featured/co2-*.jpg scripts/insert-co2-sporstof.py scripts/publish-co2-1800.sh AGENTS.md docs/ARTIKEL-GUIDE.md
if ! git diff --cached --quiet; then
  git commit -m "Udgiv CO2-artikel (godkendt, 18:00)"
  git push origin main || true
fi
echo "co2 publish done $(date -Iseconds)"
