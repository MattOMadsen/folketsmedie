#!/usr/bin/env bash
# Udgiv Mexico-artikel + støtte-bjælke kl. 15:00 15. aug 2026.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
export TZ=Europe/Copenhagen
python3 "$ROOT/scripts/insert-mexico-grense.py"
export COMMIT_MSG="Deploy: Mexico-grænse + støtte-bjælke (15:00)"
"$ROOT/scripts/deploy-gh-pages.sh"
git add data/export.json public/media/featured/usa-mexico-graense-oevelse.jpg \
  scripts/insert-mexico-grense.py scripts/publish-mexico-1500.sh \
  src/components/SupportBanner.astro src/pages/stoet src/layouts/BaseLayout.astro \
  src/styles/global.css AGENTS.md docs/ARTIKEL-GUIDE.md
if ! git diff --cached --quiet; then
  git commit -m "Udgiv Mexico-artikel og støtteside (15:00)"
  git push origin main || true
fi
echo "mexico publish done $(date -Iseconds)"
