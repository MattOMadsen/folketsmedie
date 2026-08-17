#!/usr/bin/env bash
# Udgiv vildmose-artikel kl. 18:00 17. aug. 2026.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
export TZ=Europe/Copenhagen
python3 "$ROOT/scripts/insert-vildmosekartoflen.py"
export COMMIT_MSG="Deploy: Vildmosekartoflen (mandag 18:00)"
"$ROOT/scripts/deploy-gh-pages.sh"
git add data/export.json \
  public/media/featured/vildmosekartoflen-toervejord-mose.jpg \
  scripts/insert-vildmosekartoflen.py \
  scripts/publish-vildmose-1800.sh \
  data/artikel-emner.md
if ! git diff --cached --quiet; then
  git commit -m "Udgiv vildmose-artikel (mandag 18:00)"
  git push origin main || true
fi
echo "vildmose publish done $(date -Iseconds)"
