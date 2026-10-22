/**
 * Kryptering af besøgstal. Samme parametre bruges i admin (WebCrypto).
 * Nøgle og klartekst må ikke skrives til git eller til loggen.
 */
export const STATS_ITER = 600000;

const subtle = globalThis.crypto.subtle;

function bytesToB64(bytes) {
  const buf = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let bin = '';
  for (let i = 0; i < buf.length; i += 1) bin += String.fromCharCode(buf[i]);
  return btoa(bin);
}

export function b64ToBytes(b64) {
  const bin = atob(String(b64 || ''));
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) out[i] = bin.charCodeAt(i);
  return out;
}

async function deriveKey(password, salt, iterations, usages) {
  const material = await subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveKey']
  );
  return subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
    material,
    { name: 'AES-GCM', length: 256 },
    false,
    usages
  );
}

export async function encryptStats(payload, password) {
  if (!password) throw new Error('mangler kodeord');
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(password, salt, STATS_ITER, ['encrypt']);
  const plain = new TextEncoder().encode(JSON.stringify(payload));
  const ct = new Uint8Array(await subtle.encrypt({ name: 'AES-GCM', iv }, key, plain));
  return {
    v: 1,
    kdf: 'PBKDF2',
    hash: 'SHA-256',
    iter: STATS_ITER,
    salt: bytesToB64(salt),
    iv: bytesToB64(iv),
    ct: bytesToB64(ct),
  };
}

export async function decryptStats(packed, password) {
  const iter = Number(packed?.iter);
  if (packed?.v !== 1 || packed?.kdf !== 'PBKDF2' || packed?.hash !== 'SHA-256') {
    throw new Error('ukendt fil');
  }
  if (!Number.isFinite(iter) || iter < 100000 || iter > 2000000) throw new Error('ukendt fil');
  const salt = b64ToBytes(packed.salt);
  const iv = b64ToBytes(packed.iv);
  const ct = b64ToBytes(packed.ct);
  if (salt.length < 16 || iv.length < 12 || ct.length < 16 || ct.length > 1500000) {
    throw new Error('ukendt fil');
  }
  const key = await deriveKey(password, salt, iter, ['decrypt']);
  const plain = await subtle.decrypt({ name: 'AES-GCM', iv }, key, ct);
  return JSON.parse(new TextDecoder().decode(plain));
}
