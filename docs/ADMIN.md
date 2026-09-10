# Admin — Folkets Medie

Adresse: `/folketsmedie/admin/`  
Ikke i menuen. Ikke til søgemaskiner.

Én indgang, **tre rum** — samme opdeling som de tre sider. Hvert rum skriver i den datamodel, den side allerede bruger. Intet går live, før du trykker Udgiv.

| Rum | Live side | Hvad du styrer | Hvor det gemmes |
|---|---|---|---|
| **Folkets Medie** | artikler | ny, rediger, AI-kladde, billede, skjul | `data/manual.json` (+ `public/media/featured/`) |
| **Politiske skandaler** | `/skandale/` | politikere, skandaler, brudte løfter, tilknytninger, støtte | `public/apps/skandale/data/…` |
| **Skattejægeren** | `/skattejaegeren/` | sager (beløb, vinkel, dybde, kilder) | `public/apps/skattejaegeren/data/cases/` |

Direkte links: `/admin/#fm` · `/admin/#skandale` · `/admin/#skatte`

## Login

Du skal bruge et **GitHub-token** med ret til at læse og skrive i `MattOMadsen/folketsmedie`.

- Classic PAT: scope `repo` (eller `public_repo` hvis repoet er offentligt)
- Fine-grained: Contents = Read and write, på dette repo

Tokenet gemmes kun i din browser (`localStorage`). Det kommer ikke i git.

## Folkets Medie — artikler

- **Gem kladde** skriver til `data/manual.json` med `status: "draft"`. Forsiden ignorerer den.
- **Udgiv** sætter `status: "published"` og pusher til `main`. GitHub Actions bygger `gh-pages`.
- **Skjul** sætter `status: "hidden"`.
- Arkivet i `data/export.json` overskrives ikke. Rettelser af gamle artikler gemmes som overlay i `manual.json`.
- **Bed AI om at skrive** kræver en nøgle (xAI/Grok eller anden OpenAI-kompatibel). Standard: `https://api.x.ai/v1`, model `grok-4`. Kladde kommer i felterne — du læser og retter, før du udgiver.

## Politiske skandaler

Appen læser **manifest-filer**. Derfor:

- **Gem kladde** skriver JSON-filen (politiker / skandale / løfte), men rører ikke manifestet.
- **Udgiv** skriver filen **og** lægger slug/filnavn i det rigtige `manifest.json`.
- **Skjul** fjerner den fra manifestet. Filen bliver liggende.

Politiker-profilen har de felter siden viser: parti, rolle, Folketinget, bio, tidslinje, billede, før-politik, tilknytninger og økonomisk støtte. Skandaler har alvor, kort/lang tekst, udfald, kilder. Løfter har "hvad skete der" og kilder.

## Skattejægeren

- Én fil pr. sag: `public/apps/skattejaegeren/data/cases/<slug>.json`
- Listen kommer fra `cases/index.json`
- Appen viser **ikke** sager med `status: "draft"`
- **Udgiv sag** sætter `approved` og sørger for at slug ligger i index

## Når det er live

Efter Udgiv: vent på det grønne hak under Actions på GitHub, så hård genindlæsning på sitet.
