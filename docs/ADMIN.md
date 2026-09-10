# Admin — Folkets Medie

Adresse: `/folketsmedie/admin/`  
Ikke i menuen. Ikke til søgemaskiner.

Én indgang, **tre rum** — samme opdeling som de tre sider. Intet går live, før du trykker Udgiv.

| Rum | Live side | Hvad du styrer | Hvor det gemmes |
|---|---|---|---|
| **Folkets Medie** | artikler | ny, rediger, Cursor-kladde, billede, skjul, forhåndsvisning | `data/manual.json` |
| **Politiske skandaler** | `/skandale/` | politikere, skandaler, brudte løfter | `public/apps/skandale/data/…` |
| **Skattejægeren** | `/skattejaegeren/` | sager | `public/apps/skattejaegeren/data/cases/` |

## Login — én gang

GitHub-token (contents read/write på `folketsmedie`). Gemmes i browseren. Se forrige chat om at lave tokenet.

## Cursor / Grok — én gang (ikke xAI-nøgle)

Admin kalder **ikke** Grok-API. Den starter din **Cursor cloud-agent** (din Grok-build).

1. [cursor.com/dashboard/api](https://cursor.com/dashboard/api) — lav en API-nøgle
2. GitHub → repo **folketsmedie** → Settings → Secrets and variables → Actions → `CURSOR_API_KEY`
3. I Cursor: sæt **Grok** som standardmodel
4. Valgfrit: GitHub variable `CURSOR_ENVIRONMENT` = navnet på dit faste Cursor-miljø

Derefter: noter + kilder i admin → **Skriv med Cursor**. Kladde kommer tilbage. Du udgiver selv.

Se `docs/AI-KLADDE.md`.

## Artikler

- **Gem kladde** / **Skjul** / **Udgiv** som før (`manual.json`)
- **Forhåndsvisning** viser HTML som på sitet
- **Skriv med Cursor** lægger en fil i `data/ai-requests/open/` og venter på kladden
