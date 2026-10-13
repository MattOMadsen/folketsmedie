/* Folkets Medie
 * HTML: network-first, never stored. A cached front page would hide new articles.
 * Offline: the small offline.html shell, not an article list.
 * Cache: hashed build files and icons only.
 */
const VERSION = 'fm-pwa-3';
const SHELL = `fm-shell-${VERSION}`;
const ASSETS = `fm-assets-${VERSION}`;
const SCOPE = '/folketsmedie/';
const OFFLINE_URL = `${SCOPE}offline.html`;

const PRECACHE = [
  OFFLINE_URL,
  `${SCOPE}favicon.svg`,
  `${SCOPE}icons/icon-192.png`,
  `${SCOPE}icons/icon-512.png`,
  `${SCOPE}icons/icon-maskable-192.png`,
  `${SCOPE}icons/icon-maskable-512.png`,
  `${SCOPE}icons/apple-touch-icon.png`,
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(SHELL)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== SHELL && key !== ASSETS).map((key) => caches.delete(key))),
      )
      .then(() => self.clients.claim()),
  );
});

function isHtml(request) {
  if (request.mode === 'navigate') return true;
  const accept = request.headers.get('accept') || '';
  return accept.includes('text/html');
}

function isStaticAsset(url) {
  return (
    url.pathname.startsWith(`${SCOPE}_astro/`) ||
    url.pathname.startsWith(`${SCOPE}icons/`) ||
    url.pathname.endsWith('/favicon.svg') ||
    url.pathname.endsWith('/favicon.ico')
  );
}

async function networkFirstHtml(request) {
  try {
    // Bypass the browser HTTP cache. GitHub Pages may keep HTML for minutes,
    // and a cached front page would hide newly published articles.
    return await fetch(request, { cache: 'no-store' });
  } catch {
    const cache = await caches.open(SHELL);
    const offline = await cache.match(OFFLINE_URL);
    if (offline) return offline;
    return new Response('Du er offline.', {
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
}

async function cacheFirstAsset(request) {
  const cache = await caches.open(ASSETS);
  const hit = await cache.match(request);
  if (hit) return hit;
  const response = await fetch(request);
  if (response.ok) cache.put(request, response.clone());
  return response;
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  if (request.headers.has('range')) return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (!url.pathname.startsWith(SCOPE)) return;

  if (url.pathname.endsWith('/sw.js') || url.pathname.endsWith('/manifest.webmanifest')) {
    event.respondWith(fetch(request));
    return;
  }

  if (isHtml(request)) {
    event.respondWith(networkFirstHtml(request));
    return;
  }

  if (isStaticAsset(url)) {
    event.respondWith(cacheFirstAsset(request));
  }
});
