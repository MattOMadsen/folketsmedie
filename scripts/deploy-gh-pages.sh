#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
npm run build
touch dist/.nojekyll
git fetch origin gh-pages
WT="$(mktemp -d /tmp/fm-gh-pages.XXXXXX)"
git worktree add -B gh-pages "$WT" origin/gh-pages
rsync -a --delete --exclude .git dist/ "$WT/"
test -f "$WT/.nojekyll" || touch "$WT/.nojekyll"
cd "$WT"
git add -A
if git diff --cached --quiet; then
  echo "no gh-pages changes"
else
  git commit -m "${COMMIT_MSG:-Deploy: opdater gh-pages}"
  git push origin gh-pages
fi
cd "$ROOT"
git worktree remove -f "$WT"
git branch -f gh-pages origin/gh-pages
echo "deploy done $(date -Iseconds)"
# Valgfri Facebook-opslag, hvis token ligger i ~/.folketsmedie/facebook.env
if python3 "$ROOT/scripts/post-facebook.py"; then
  if ! git -C "$ROOT" diff --quiet -- data/facebook-posted.json 2>/dev/null; then
    git -C "$ROOT" add data/facebook-posted.json
    if ! git -C "$ROOT" diff --cached --quiet; then
      git -C "$ROOT" commit -m "Facebook: marker seneste artikel som slået op" || true
      git -C "$ROOT" push origin main || true
    fi
  fi
fi
