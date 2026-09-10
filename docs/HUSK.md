# Husk — guid Matt senere

Matt har bedt om, at det her **ikke** skal laves nu. Næste gang han spørger, så guide ham trin for trin. Ikke mas.

## Cursor / Grok til admin (sæt op én gang)

Admin kalder **ikke** xAI. Knapen **Skriv med Cursor** lægger en fil i `data/ai-requests/open/`. En GitHub Action starter Matts Cursor-cloud-agent (hans Grok-build).

### Det Matt skal gøre, når han er klar

1. Åbn [cursor.com/dashboard/api](https://cursor.com/dashboard/api) mens han er logget ind som sig selv.
2. Lav en **API-nøgle** (Cursor-nøgle — ikke en Grok/xAI-nøgle).
3. GitHub → repo `MattOMadsen/folketsmedie` → **Settings → Secrets and variables → Actions → New repository secret**
   - Navn: `CURSOR_API_KEY`
   - Værdi: nøglen
4. I Cursor: sæt **Grok** som standardmodel, så cloud-agenten bruger hans Grok-build.
5. Valgfrit: GitHub **Variables** `CURSOR_ENVIRONMENT` = navnet på hans faste Cursor-miljø, hvis han har et.

Derefter: admin → noter + kilder → **Skriv med Cursor**. Kladde kommer tilbage. Han udgiver selv.

Actionen kører først, når workflow-filen ligger på `main` (admin-PR merged).

Se også `docs/ADMIN.md` og `docs/AI-KLADDE.md`.

## GitHub-token til admin

Stadig nødvendigt for at gemme. Guide: Settings → Developer settings → Fine-grained token → kun repo `folketsmedie` → Contents: Read and write. Tokenet i browseren, ikke i git.
