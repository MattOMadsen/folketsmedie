#!/usr/bin/env python3
"""Byg data/home-index.json: alle politikere + tællinger i én fil."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"
OUT = DATA / "home-index.json"


def load_json(path: Path):
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return None


def scandal_count_and_severity(slug: str) -> tuple[int, float, int]:
    folder = DATA / "scandals" / slug
    manifest = load_json(folder / "manifest.json")
    files = []
    if isinstance(manifest, dict) and isinstance(manifest.get("scandals"), list):
        files = [folder / name for name in manifest["scandals"]]
    single = DATA / "scandals" / f"{slug}.json"
    items = []
    if files:
        for f in files:
            item = load_json(f)
            if item:
                items.append(item)
    else:
        data = load_json(single)
        if isinstance(data, dict) and isinstance(data.get("scandals"), list):
            items = data["scandals"]
        elif isinstance(data, list):
            items = data
    n = 0
    sev_sum = 0.0
    sev_n = 0
    for s in items:
        if not s:
            continue
        n += 1
        sev = s.get("ourSeverity", s.get("severity"))
        if isinstance(sev, (int, float)) and sev > 0:
            sev_sum += sev
            sev_n += 1
    return n, sev_sum, sev_n


def broken_count(slug: str) -> int:
    folder = DATA / "broken-promises" / slug
    manifest = load_json(folder / "manifest.json")
    if isinstance(manifest, dict) and isinstance(manifest.get("brokenPromises"), list):
        return len(manifest["brokenPromises"])
    data = load_json(DATA / "broken-promises" / f"{slug}.json")
    if isinstance(data, dict) and isinstance(data.get("brokenPromises"), list):
        return len(data["brokenPromises"])
    if isinstance(data, list):
        return len(data)
    return 0


def main() -> None:
    manifest = load_json(DATA / "politicians" / "manifest.json") or {}
    slugs = manifest.get("politicians") or []
    politicians = []
    total_scandals = 0
    total_broken = 0
    sev_sum = 0.0
    sev_n = 0

    for slug in slugs:
        core = load_json(DATA / "politicians" / f"{slug}.json")
        if not core:
            continue
        sc, ssum, sn = scandal_count_and_severity(slug)
        bc = broken_count(slug)
        total_scandals += sc
        total_broken += bc
        sev_sum += ssum
        sev_n += sn
        politicians.append(
            {
                **core,
                "slug": slug,
                "_scandalCount": sc,
                "_brokenCount": bc,
                "_severitySum": ssum,
                "_severityN": sn,
            }
        )

    payload = {
        "generated": "2026-08-19",
        "totalScandals": total_scandals,
        "totalBrokenPromises": total_broken,
        "severitySum": sev_sum,
        "severityN": sev_n,
        "politicians": politicians,
    }
    OUT.write_text(json.dumps(payload, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(f"Wrote {OUT} ({len(politicians)} politikere, {total_scandals} skandaler)")


if __name__ == "__main__":
    main()
