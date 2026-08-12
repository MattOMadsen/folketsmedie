#!/usr/bin/env bash
# Kør kl. 12:00 13. aug 2026 — efter Fauci-deploy kl. 07. Indsætter godkendt Grok-artikel og deployer.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
python3 "$ROOT/scripts/insert-grok-artikel.py"
"$ROOT/scripts/deploy-gh-pages.sh"
git add data/export.json
if ! git diff --cached --quiet; then
  git commit -m "Udgiv Grok 4.6-artikel (godkendt, 12:00)"
  git push origin main || true
fi
echo "grok publish done $(date -Iseconds)"
