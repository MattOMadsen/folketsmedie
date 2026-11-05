import { readFileSync } from 'node:fs';
import { decryptStats, encryptStats, STATS_ITER } from './stats-crypto.mjs';
import { dailyRows, pageRows, rangeLast30Days, referrerRows } from './fetch-goatcounter-stats.mjs';

const password = 'hemmeligt-kodeord-æøå';
const payload = {
  updated: '2026-10-11T06:00:00.000Z',
  total: 424242,
  daily: [{ date: '2026-10-11', count: 17 }],
  pages: [{ path: '/folketsmedie/artikel/test-slug-ikke-offentlig/', count: 9 }],
  referrers: [{ name: 'Google', count: 4 }],
};

const packed = await encryptStats(payload, password);
const packedText = JSON.stringify(packed);
if (packedText.includes('424242') || packedText.includes('test-slug-ikke-offentlig') || packedText.includes(password)) {
  throw new Error('klartekst eller kodeord ligger i den krypterede fil');
}
if (packed.iter !== STATS_ITER || packed.kdf !== 'PBKDF2' || packed.hash !== 'SHA-256' || packed.v !== 1) {
  throw new Error('forkert filformat');
}

const back = await decryptStats(packed, password);
if (JSON.stringify(back) !== JSON.stringify(payload)) {
  throw new Error('dekryptering matchede ikke');
}

let wrong = false;
try {
  await decryptStats(packed, 'forkert-kodeord');
} catch {
  wrong = true;
}
if (!wrong) throw new Error('forkert kodeord blev godkendt');

const days = dailyRows(
  [
    { day: '2026-09-01', daily: 2 },
    { day: '2026-10-10T00:00:00Z', daily: 5 },
    { day: '2026-10-11', daily: 7 },
  ],
  '2026-10-01'
);
if (days.length !== 2 || days[0].date !== '2026-10-10' || days[1].count !== 7) {
  throw new Error('dagslisten er forkert');
}

const pages = pageRows([
  { path: '/folketsmedie/artikel/a/', count: 3, event: false },
  { path: '/klik', count: 9, event: true },
  { path: '/folketsmedie/', count: 8, event: false },
]);
if (pages.length !== 2 || pages[0].path !== '/folketsmedie/' || pages[0].count !== 8) {
  throw new Error('sidelisten er forkert');
}

const refs = referrerRows([
  { name: 'Google', count: 4 },
  { name: '', count: 9 },
  { name: 'Andet', count: 11 },
]);
if (refs.length !== 2 || refs[0].name !== 'Andet') throw new Error('henvisninger er forkerte');

const range = rangeLast30Days(new Date('2026-10-11T15:40:00Z'));
if (range.end !== '2026-10-11T15:00:00Z' || range.startDay !== '2026-09-12') {
  throw new Error(`datointerval er forkert: ${range.start} ${range.end} ${range.startDay}`);
}

const admin = readFileSync(new URL('../public/admin/app.js', import.meta.url), 'utf8');
if (admin.includes('goatcounter.com')) throw new Error('admin kalder goatcounter.com');
if (!admin.includes(String(STATS_ITER))) throw new Error('admin bruger ikke samme iterationstal');
if (!admin.includes("kdf !== 'PBKDF2'") || !admin.includes("name: 'AES-GCM'")) {
  throw new Error('admin dekrypterer ikke med AES-GCM og PBKDF2');
}

const start = admin.indexOf('function b64ToBytes');
const end = admin.indexOf('\n  function indexArticlePaths');
if (start < 0 || end < start) throw new Error('finder ikke dekryptering i admin');
const decryptPacked = new Function(`${admin.slice(start, end)}; return decryptPacked;`)();
const viaAdmin = await decryptPacked(packed, password);
if (JSON.stringify(viaAdmin) !== JSON.stringify(payload)) {
  throw new Error('admin dekrypterer ikke den samme fil');
}

console.log('krypto-test ok');
