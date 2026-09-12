#!/usr/bin/env bash
# Udgiv live-sitet til origin/gh-pages (GitHub Pages).
# Kilde (export.json + billeder) committes på den gren, du står på.
# Live er ALTID gh-pages — ikke main.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if ! command -v rsync >/dev/null 2>&1; then
  echo "mangler rsync — installer: sudo apt-get install -y rsync" >&2
  exit 1
fi

npm run build
touch dist/.nojekyll
test -f dist/.nojekyll

git worktree prune
for d in /tmp/fm-gh-pages.*; do
  [ -e "$d" ] || continue
  git worktree remove -f "$d" 2>/dev/null || rm -rf "$d"
done
git worktree prune

git fetch origin gh-pages
OLD_SHA="$(git rev-parse origin/gh-pages)"
WT="$(mktemp -d /tmp/fm-gh-pages.XXXXXX)"
git worktree add -B gh-pages "$WT" origin/gh-pages

rsync -a --delete --exclude .git dist/ "$WT/"
test -f "$WT/.nojekyll" || touch "$WT/.nojekyll"

# rsync --delete fjerner filer der kun lever på gh-pages (admin, ekstra featured, skandale-bundle).
# Gendan dem fra forrige live-commit — undtagen gamle hashed CSS i _astro/.
cd "$WT"
while IFS= read -r f; do
  [ -n "$f" ] || continue
  case "$f" in
    _astro/*) continue ;;
  esac
  git checkout "$OLD_SHA" -- "$f"
done < <(git diff --diff-filter=D --name-only "$OLD_SHA")

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
      git -C "$ROOT" push -u origin HEAD || true
    fi
  fi
fi
