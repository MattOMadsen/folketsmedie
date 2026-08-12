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
  git commit -m "Deploy: Fauci-SMS om gravide (07:00)"
  git push origin gh-pages
fi
cd "$ROOT"
git worktree remove -f "$WT"
git branch -f gh-pages origin/gh-pages
echo "deploy done $(date -Iseconds)"
