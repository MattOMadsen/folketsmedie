#!/usr/bin/env bash
# Udgiv korstogsartikel kl. 07:00 17. aug. 2026.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
export TZ=Europe/Copenhagen
python3 "$ROOT/scripts/insert-korstogene.py"
export COMMIT_MSG="Deploy: Korstogene var et svar (mandag 07:00)"
"$ROOT/scripts/deploy-gh-pages.sh"
git add data/export.json \
  public/media/featured/korstogene-stenkirke-middelhav.jpg \
  scripts/insert-korstogene.py \
  scripts/publish-korstogene-0700.sh
if ! git diff --cached --quiet; then
  git commit -m "Udgiv korstogsartikel (mandag 07:00)"
  git push origin main || true
fi
echo "korstogene publish done $(date -Iseconds)"
