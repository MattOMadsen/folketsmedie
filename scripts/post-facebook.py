#!/usr/bin/env python3
"""Læg seneste udgivne artikel på Folkets Medies Facebook-side.

Kræver filen ~/.folketsmedie/facebook.env med:
  FACEBOOK_PAGE_ID=...
  FACEBOOK_PAGE_TOKEN=...

Token skal være et Page access token med pages_manage_posts.
Kører kun hvis filen findes. Springer over artikler, der allerede er slået op.
"""
from __future__ import annotations

import json
import os
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ENV_FILE = Path.home() / ".folketsmedie" / "facebook.env"
POSTED = ROOT / "data" / "facebook-posted.json"
EXPORT = ROOT / "data" / "export.json"
SITE = "https://mattomadsen.github.io/folketsmedie"


def load_env() -> dict[str, str]:
    out: dict[str, str] = {}
    if ENV_FILE.is_file():
        for line in ENV_FILE.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, v = line.split("=", 1)
            out[k.strip()] = v.strip().strip('"').strip("'")
    for k in ("FACEBOOK_PAGE_ID", "FACEBOOK_PAGE_TOKEN"):
        if os.environ.get(k):
            out[k] = os.environ[k]
    return out


def is_published(date: str, now: datetime) -> bool:
    try:
        t = datetime.fromisoformat(str(date).replace(" ", "T"))
    except ValueError:
        return False
    return t <= now


def latest_article() -> dict | None:
    data = json.loads(EXPORT.read_text(encoding="utf-8"))
    now = datetime.now()
    arts = [a for a in data.get("articles", []) if is_published(a.get("date", ""), now)]
    arts.sort(key=lambda a: a.get("date", ""), reverse=True)
    return arts[0] if arts else None


def posted_slugs() -> list[str]:
    if not POSTED.is_file():
        return []
    try:
        return list(json.loads(POSTED.read_text(encoding="utf-8")))
    except json.JSONDecodeError:
        return []


def mark_posted(slug: str) -> None:
    slugs = posted_slugs()
    if slug not in slugs:
        slugs.append(slug)
    POSTED.write_text(json.dumps(slugs, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def post(page_id: str, token: str, message: str, link: str) -> str:
    url = f"https://graph.facebook.com/v21.0/{page_id}/feed"
    data = urllib.parse.urlencode(
        {"message": message, "link": link, "access_token": token}
    ).encode()
    req = urllib.request.Request(url, data=data, method="POST")
    with urllib.request.urlopen(req, timeout=30) as res:
        body = json.loads(res.read().decode())
    return str(body.get("id", ""))


def main() -> int:
    env = load_env()
    page_id = env.get("FACEBOOK_PAGE_ID", "")
    token = env.get("FACEBOOK_PAGE_TOKEN", "")
    if not page_id or not token:
        print("facebook: sprunget over (mangler ~/.folketsmedie/facebook.env)")
        return 0

    art = latest_article()
    if not art:
        print("facebook: ingen udgivet artikel")
        return 0

    slug = art["slug"]
    if slug in posted_slugs():
        print(f"facebook: {slug} er allerede slået op")
        return 0

    url = f"{SITE}/artikel/{slug}/"
    excerpt = (art.get("excerpt") or "").strip()
    message = art["title"] if not excerpt else f"{art['title']}\n\n{excerpt}"
    message = f"{message}\n\nLæs mere her:\n{url}"

    try:
        pid = post(page_id, token, message, url)
    except urllib.error.HTTPError as e:
        err = e.read().decode(errors="replace")
        print(f"facebook: fejl {e.code} {err}")
        return 1

    mark_posted(slug)
    print(f"facebook: slået op {slug} id={pid}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
