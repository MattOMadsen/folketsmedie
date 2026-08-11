# Folkets Medie — statisk arkiv

GitHub Pages-arkiv med artikler, dokumentar, nyttige links og Om FM.
Importeret fra All-in-One WP Migration backup (**1. sep 2023**).

## Indhold (v0.1)

- **384 artikler** (sep 2021 – aug 2023)
- **176 videoer / dokumentar**
- Sider: Om FM, Nyttige links, Dokumentar
- Nyt mørkt design, mobilvenligt
- Medier (billeder) peget midlertidigt på `folketsmedie.dk/wp-content/uploads`

## Udvikl lokalt

```bash
cd "Grok Projects/folketsmedie-arkiv"
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy

Push til `main` → GitHub Actions publicerer til Pages.

Repo → Settings → Pages → Source: **GitHub Actions**.

URL (forventet): `https://mattomadsen.github.io/folketsmedie-arkiv/`

## Næste skridt

1. Importere frisk backup (2025-artikler)
2. Udpakke billeder lokalt i `public/media/`
3. Skrive nye artikler som markdown under `src/content/`
4. Custom domain hvis ønsket
