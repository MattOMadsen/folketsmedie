#!/usr/bin/env bash
# Udgiv DOJ-valgliste-artikel kl. 11:00 16. aug. 2026.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
export TZ=Europe/Copenhagen
python3 "$ROOT/scripts/insert-doj-valglister.py"
export COMMIT_MSG="Deploy: DOJ-valglister, døde og 81 millioner (11:00)"
"$ROOT/scripts/deploy-gh-pages.sh"
git add data/export.json \
  public/media/featured/biden-81-millioner-amter-bellwether.jpg \
  scripts/insert-doj-valglister.py \
  scripts/publish-doj-valglister-1100.sh
if ! git diff --cached --quiet; then
  git commit -m "Udgiv DOJ-valgliste-artikel (11:00)"
  git push origin main || true
fi
echo "doj valglister publish done $(date -Iseconds)"
