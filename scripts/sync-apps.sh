#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PARENT="$(cd "$ROOT/.." && pwd)"
SKANDALE="$PARENT/Skandale.dk"
SKATTE="$PARENT/Skattejægeren"
mkdir -p "$ROOT/public/apps/skandale" "$ROOT/public/apps/skattejaegeren"

rsync -a --delete \
  --exclude node_modules \
  --exclude .git \
  --exclude sw.js \
  --exclude 'js/config/secrets.js' \
  --exclude package-lock.json \
  --exclude main \
  "$SKANDALE/" "$ROOT/public/apps/skandale/"

rsync -a --delete \
  --exclude node_modules \
  --exclude .git \
  --exclude data/live-composer.md \
  --exclude data/live-scratch.md \
  "$SKATTE/" "$ROOT/public/apps/skattejaegeren/"

echo "sync-apps done"
