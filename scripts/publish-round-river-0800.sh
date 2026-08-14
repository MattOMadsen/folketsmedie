#!/usr/bin/env bash
# Udgiv Round River-artiklen kl. 08:00 15. aug 2026 (Europe/Copenhagen).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
export TZ=Europe/Copenhagen
python3 "$ROOT/scripts/insert-round-river.py"
export COMMIT_MSG="Deploy: FBI Round River (08:00 15. aug 2026)"
"$ROOT/scripts/deploy-gh-pages.sh"
git add data/export.json public/media/featured/fbi-round-river-*.jpg \
  scripts/insert-round-river.py scripts/publish-round-river-0800.sh \
  AGENTS.md docs/ARTIKEL-GUIDE.md scripts/deploy-gh-pages.sh
if ! git diff --cached --quiet; then
  git commit -m "Udgiv Round River-artikel (godkendt, 08:00)"
  git push origin main || true
fi
echo "round-river publish done $(date -Iseconds)"
