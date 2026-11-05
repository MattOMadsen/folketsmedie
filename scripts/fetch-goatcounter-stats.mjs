/**
 * Henter besøgstal hos GoatCounter og skriver kun den krypterede fil.
 * Køres af GitHub Actions. Browseren kalder ikke GoatCounter.
 */
import { mkdir, rename, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { encryptStats } from './stats-crypto.mjs';

const API = 'https://folketsmedie.goatcounter.com/api/v0';

function hourStamp(date) {
  const d = new Date(date);
  d.setUTCMinutes(0, 0, 0);
  return d.toISOString().replace(/\.\d{3}Z$/, 'Z');
}

export function rangeLast30Days(now = new Date()) {
  const end = new Date(now);
  end.setUTCMinutes(0, 0, 0);
  const start = new Date(end.getTime() - 29 * 24 * 60 * 60 * 1000);
  start.setUTCHours(0, 0, 0, 0);
  return { start: hourStamp(start), end: hourStamp(end), startDay: hourStamp(start).slice(0, 10) };
}

export function dailyRows(stats, startDay) {
  const rows = [];
  for (const row of stats || []) {
    const date = String(row?.day || '').slice(0, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) continue;
    if (startDay && date < startDay) continue;
    rows.push({ date, count: Number(row.daily || 0) });
  }
  rows.sort((a, b) => a.date.localeCompare(b.date));
  const seen = new Set();
  return rows.filter((row) => {
    if (seen.has(row.date)) return false;
    seen.add(row.date);
    return true;
  });
}

export function pageRows(hits) {
  const pages = [];
  for (const hit of hits || []) {
    if (hit?.event) continue;
    const path = String(hit?.path || '');
    if (!path) continue;
    pages.push({ path, count: Number(hit.count || 0) });
  }
  pages.sort((a, b) => b.count - a.count || a.path.localeCompare(b.path));
  return pages;
}

export function referrerRows(stats) {
  const rows = [];
  for (const row of stats || []) {
    const name = String(row?.name || '').trim();
    if (!name) continue;
    rows.push({ name, count: Number(row.count || 0) });
  }
  rows.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'da'));
  return rows.slice(0, 15);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function gcGet(token, pathAndQuery) {
  const res = await fetch(`${API}${pathAndQuery}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    const err = new Error(`GoatCounter HTTP ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

async function fetchPages(token, start, end) {
  const hits = [];
  const exclude = [];
  let truncated = false;
  for (let page = 0; page < 20; page += 1) {
    const q = new URLSearchParams({ start, end, limit: '100' });
    if (exclude.length) q.set('exclude_paths', exclude.join(','));
    if (String(q).length > 6000) {
      truncated = true;
      break;
    }
    const before = exclude.length;
    const data = await gcGet(token, `/stats/hits?${q}`);
    const batch = Array.isArray(data.hits) ? data.hits : [];
    for (const hit of batch) {
      hits.push(hit);
      if (hit?.path_id != null) exclude.push(String(hit.path_id));
    }
    if (!data.more || batch.length === 0 || exclude.length === before) break;
    if (page === 19 && data.more) truncated = true;
    await sleep(350);
  }
  return { pages: pageRows(hits), truncated };
}

export async function collectStats(token, now = new Date()) {
  const { start, end, startDay } = rangeLast30Days(now);
  const allStart = '2020-01-01T00:00:00Z';
  const period = await gcGet(token, `/stats/total?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`);
  await sleep(350);
  const allTime = await gcGet(
    token,
    `/stats/total?start=${encodeURIComponent(allStart)}&end=${encodeURIComponent(end)}`
  );
  await sleep(350);
  const { pages, truncated } = await fetchPages(token, allStart, end);
  await sleep(350);
  const refs = await gcGet(
    token,
    `/stats/toprefs?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}&limit=15`
  );
  return {
    updated: new Date(now).toISOString(),
    total: Number(allTime.total || 0),
    totalEvents: Number(allTime.total_events || 0),
    daily: dailyRows(period.stats, startDay),
    pages,
    referrers: referrerRows(refs.stats),
    truncated: Boolean(truncated),
  };
}

async function main() {
  const token = process.env.GOATCOUNTER_TOKEN || '';
  const password = process.env.STATS_PASS || '';
  const outPath = process.env.STATS_OUT || '';
  if (!token || !password || !outPath) {
    console.error('mangler GOATCOUNTER_TOKEN, STATS_PASS eller STATS_OUT');
    process.exit(1);
  }
  const payload = await collectStats(token);
  const packed = await encryptStats(payload, password);
  const text = `${JSON.stringify(packed)}\n`;
  if (text.includes(password) || text.includes(token)) {
    console.error('afbryder: hemmelighed må ikke skrives i filen');
    process.exit(1);
  }
  await mkdir(dirname(outPath), { recursive: true });
  const tmp = `${outPath}.tmp`;
  await writeFile(tmp, text, { mode: 0o644 });
  await rename(tmp, outPath);
  console.log('krypteret fil skrevet');
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch((err) => {
    console.error(err.status ? `hentning fejlede (HTTP ${err.status})` : 'hentning fejlede');
    process.exit(1);
  });
}
