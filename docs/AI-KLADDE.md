# AI-kladde via Cursor / Grok

Admin kalder **ikke** xAI direkte. Matt sætter Cursor op **én gang**. Bagefter skriver hans Grok-build (standardmodel i Cursor) kladden.

## Én gang (Matt)

1. [Cursor Dashboard → API Keys](https://cursor.com/dashboard/api) — lav en nøgle.
2. GitHub: `MattOMadsen/folketsmedie` → **Settings → Secrets and variables → Actions → New repository secret**
   - Navn: `CURSOR_API_KEY`
   - Værdi: nøglen fra Cursor
3. I Cursor: sæt **Grok** som standardmodel (så cloud-agenten bruger din Grok-build, ikke en ekstra xAI-nøgle).
4. Valgfrit: GitHub **Variables** `CURSOR_ENVIRONMENT` = navnet på dit Cursor cloud-miljø, hvis du har et fast "build" til repoet.

Når det er gjort, rører du det ikke igen. Admin har ingen API-felter.

## Sådan virker knappen

1. Du skriver noter + kilder i admin.
2. **Skriv med Cursor** gemmer en kladde og en fil i `data/ai-requests/open/`.
3. GitHub Action starter en Cursor cloud-agent på repoet.
4. Agenten skriver HTML ind i `data/manual.json` med `status: "draft"`.
5. Admin henter kladden. Du læser, retter, trykker **Udgiv** selv.

Intet går på forsiden, før du udgiver.
