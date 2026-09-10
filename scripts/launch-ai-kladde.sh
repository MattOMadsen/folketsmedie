#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ -z "${CURSOR_API_KEY:-}" ]]; then
  echo "CURSOR_API_KEY mangler. Sæt den én gang under GitHub Actions secrets. Springer over."
  exit 0
fi

shopt -s nullglob
files=(data/ai-requests/open/*.json)
if [[ ${#files[@]} -eq 0 ]]; then
  echo "Ingen åbne AI-anmodninger."
  exit 0
fi

failed=0
for f in "${files[@]}"; do
  echo "Starter Cursor for $f"
  if ! python3 - "$f" > /tmp/cursor-payload.json <<'PY'
import json, os, sys
from pathlib import Path
req = json.loads(Path(sys.argv[1]).read_text())
task = (req.get("task") or "").strip()
if not task:
    raise SystemExit("tom task")
payload = {
    "prompt": {"text": task},
    "name": ("FM kladde: " + (req.get("title") or "artikel"))[:100],
    "autoCreatePR": False,
    "workOnCurrentBranch": True,
}
env_name = os.environ.get("CURSOR_ENVIRONMENT", "").strip()
if env_name:
    payload["env"] = {"type": "cloud", "name": env_name}
else:
    payload["repos"] = [{
        "url": "https://github.com/MattOMadsen/folketsmedie",
        "startingRef": "main",
    }]
print(json.dumps(payload))
PY
  then
    echo "Springer $f over (ingen task)."
    continue
  fi
  CODE=$(curl -sS -o /tmp/cursor-agent.json -w "%{http_code}" \
    -u "${CURSOR_API_KEY}:" \
    -H "Content-Type: application/json" \
    --request POST \
    --url https://api.cursor.com/v1/agents \
    --data @/tmp/cursor-payload.json)
  echo "Cursor HTTP $CODE"
  cat /tmp/cursor-agent.json
  echo
  if [[ "$CODE" != "200" && "$CODE" != "201" ]]; then
    failed=1
  fi
done

exit "$failed"
