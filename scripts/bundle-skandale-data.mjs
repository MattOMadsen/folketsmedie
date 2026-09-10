#!/usr/bin/env node
/**
 * Packs Politiske skandaler's many JSON files into one payload.
 * Source of truth remains the granular files under public/apps/skandale/data/.
 * Run automatically via npm predev / prebuild.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = path.join(root, 'public/apps/skandale/data');
const outFile = path.join(dataDir, 'bundle.json');

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function walk(dir, prefix, files) {
  for (const name of fs.readdirSync(dir)) {
    if (name === 'bundle.json' || name.startsWith('.')) continue;
    const full = path.join(dir, name);
    const rel = prefix ? `${prefix}/${name}` : name;
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (rel === 'details') continue;
      walk(full, rel, files);
      continue;
    }
    if (!name.endsWith('.json')) continue;
    files[`data/${rel}`] = readJson(full);
  }
}

function skipDuplicateFlatFile(key, files) {
  const match = key.match(/^data\/(scandals|broken-promises)\/([^/]+)\.json$/);
  if (!match) return false;
  const [, type, slug] = match;
  return Object.prototype.hasOwnProperty.call(files, `data/${type}/${slug}/manifest.json`);
}

const files = {};
walk(dataDir, '', files);

for (const key of Object.keys(files)) {
  if (skipDuplicateFlatFile(key, files)) {
    delete files[key];
  }
}

const manifest = files['data/politicians/manifest.json'];
const politicians = Array.isArray(manifest?.politicians) ? manifest.politicians : [];

const bundle = {
  generatedAt: new Date().toISOString(),
  politicians,
  files
};

fs.writeFileSync(outFile, JSON.stringify(bundle));
const bytes = fs.statSync(outFile).size;
console.log(
  `[bundle-skandale-data] ${politicians.length} politikere, ${Object.keys(files).length} filer, ${(bytes / 1024).toFixed(0)} KB → ${path.relative(root, outFile)}`
);
