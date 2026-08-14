#!/usr/bin/env bash
# Udgiv Colombia/El Tigre-artiklen kl. 12:00 15. aug 2026.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
export TZ=Europe/Copenhagen
python3 "$ROOT/scripts/insert-colombia-tigre.py"
export COMMIT_MSG="Deploy: Colombia El Tigre (12:00 15. aug 2026)"
"$ROOT/scripts/deploy-gh-pages.sh"
git add data/export.json public/media/featured/colombia-el-tigre-*.jpg \
  scripts/insert-colombia-tigre.py scripts/publish-colombia-1200.sh
if ! git diff --cached --quiet; then
  git commit -m "Udgiv Colombia El Tigre-artikel (godkendt, 12:00)"
  git push origin main || true
fi
echo "colombia publish done $(date -Iseconds)"
