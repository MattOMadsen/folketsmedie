# Folkets Medie

Statisk arkiv af [folketsmedie.dk](https://www.folketsmedie.dk) — artikler, dokumentarfilm, nyttige links og Om.

**Live:** https://mattomadsen.github.io/folketsmedie/

## Indhold

- 400+ artikler (inkl. sync fra live API + manuelle opslag)
- 26 dokumentarfilm (stream via Rumble / Bitchute / YouTube)
- Interne links pejer på dette arkiv
- Video uploades **ikke** til GitHub
- Like- og deleknapper + Open Graph til SoMe

## Skriv nye artikler

Se den fulde note: **[docs/ARTIKEL-GUIDE.md](docs/ARTIKEL-GUIDE.md)**  
(stemme, struktur, kilder, billeder, `export.json`, deploy-faldgruber).

## Lokalt

```bash
npm install
npm run dev
```

## Deploy

Byg med `npm run build`, sørg for `dist/.nojekyll`, commit kilde til `main`, deploy `dist/` til `gh-pages`.
