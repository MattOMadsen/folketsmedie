#!/usr/bin/env bash
# Udgiv gødskningslov-artikel kl. 12:30 22. aug. 2026.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
export TZ=Europe/Copenhagen
python3 "$ROOT/scripts/insert-goedskningslov.py"
export COMMIT_MSG="Deploy: Gødskningslov / stormøde Odense (12:30)"
"$ROOT/scripts/deploy-gh-pages.sh"
git add data/export.json \
  public/media/featured/danmark-efteraar-saa-mark-goedskning.jpg \
  scripts/insert-goedskningslov.py \
  scripts/publish-goedskningslov-1230.sh \
  data/artikel-emner.md \
  data/kladde-goedskningslov-stormoede.md
if ! git diff --cached --quiet; then
  git commit -m "Udgiv gødskningslov-artikel (lørdag 12:30)"
  git push origin main || true
fi
echo "goedskningslov publish done $(date -Iseconds)"
