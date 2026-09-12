#!/usr/bin/env bash
# Udgiv live-sitet til origin/gh-pages (GitHub Pages).
# Kilde (export.json + billeder) committes på den gren, du står på.
# Live er ALTID gh-pages — ikke main.
#
# Intet udgivet må fjernes (Matt, 12. sep. 2026).
# Blind rsync --delete uden først at kopiere manglende live-filer
# ind i dist/ er forbudt. Efter deploy må forsidens artikeltal ikke falde.
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
WT="$(mktemp -d /tmp/fm-gh-pages.XXXXXX)"
git worktree add -B gh-pages "$WT" origin/gh-pages

cleanup_wt() {
  git -C "$ROOT" worktree remove -f "$WT" 2>/dev/null || rm -rf "$WT"
}

count_artikel_html() {
  local dir="$1"
  if [ ! -d "$dir/artikel" ]; then
    echo 0
    return
  fi
  find "$dir/artikel" -mindepth 2 -maxdepth 2 -name index.html | wc -l | tr -d ' '
}

front_artikel_count() {
  local index="$1/index.html"
  if [ ! -f "$index" ]; then
    echo 0
    return
  fi
  python3 - "$index" <<'PY'
import re, sys
html = open(sys.argv[1], encoding="utf-8", errors="ignore").read()
m = re.search(r"(\d+)\s+artikler", html, re.I)
print(m.group(1) if m else 0)
PY
}

LIVE_HTML="$(count_artikel_html "$WT")"
LIVE_FRONT="$(front_artikel_count "$WT")"

# Kopiér manglende live-filer ind i dist/ FØR rsync --delete.
# --ignore-existing: overskriv ikke det nye build.
# Spring _astro over (gamle hashed CSS/JS). Behold artikler, admin, bundle, media.
rsync -a --ignore-existing --exclude .git --exclude _astro "$WT/" "$ROOT/dist/"

# admin/ og skandale-bundle lever kun på gh-pages — sørg for at de er i dist.
if [ -d "$WT/admin" ] && [ ! -e "$ROOT/dist/admin" ]; then
  rsync -a "$WT/admin/" "$ROOT/dist/admin/"
fi
if [ -f "$WT/apps/skandale/data/bundle.json" ] && [ ! -f "$ROOT/dist/apps/skandale/data/bundle.json" ]; then
  mkdir -p "$ROOT/dist/apps/skandale/data"
  cp -a "$WT/apps/skandale/data/bundle.json" "$ROOT/dist/apps/skandale/data/bundle.json"
fi

DIST_HTML="$(count_artikel_html "$ROOT/dist")"
DIST_FRONT="$(front_artikel_count "$ROOT/dist")"

if [ "$DIST_HTML" -lt "$LIVE_HTML" ]; then
  echo "ABORT: deploy ville sænke antal artikel-HTML fra $LIVE_HTML til $DIST_HTML." >&2
  echo "Intet udgivet må fjernes. Merge de manglende artikler ind i data/export.json og prøv igen." >&2
  cleanup_wt
  exit 1
fi
if [ "$DIST_FRONT" -lt "$LIVE_FRONT" ]; then
  echo "ABORT: deploy ville sænke forsidens artikeltal fra $LIVE_FRONT til $DIST_FRONT." >&2
  echo "Intet udgivet må fjernes. Merge de manglende artikler ind i data/export.json og prøv igen." >&2
  cleanup_wt
  exit 1
fi

echo "deploy tæller: live HTML=$LIVE_HTML forside=$LIVE_FRONT → dist HTML=$DIST_HTML forside=$DIST_FRONT"

rsync -a --delete --exclude .git "$ROOT/dist/" "$WT/"
test -f "$WT/.nojekyll" || touch "$WT/.nojekyll"
test -d "$WT/admin" || { echo "ABORT: admin/ mangler på gh-pages efter rsync" >&2; cleanup_wt; exit 1; }
test -f "$WT/apps/skandale/data/bundle.json" || { echo "ABORT: apps/skandale/data/bundle.json mangler efter rsync" >&2; cleanup_wt; exit 1; }

cd "$WT"
git add -A
if git diff --cached --quiet; then
  echo "no gh-pages changes"
else
  git commit -m "${COMMIT_MSG:-Deploy: opdater gh-pages}"
  git push origin gh-pages
fi
cd "$ROOT"
cleanup_wt
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
