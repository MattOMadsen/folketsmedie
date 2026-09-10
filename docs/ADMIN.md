# Admin — Folkets Medie

Adresse: `/folketsmedie/admin/`  
Ikke i menuen. Ikke til søgemaskiner.

Én indgang, tre rum — som de tre sider:

1. **Folkets Medie** — artikler (ny, rediger, bed AI om at skrive, kladde, udgiv, billede)
2. **Politiske skandaler** — ny politiker, ny skandale, nyt brudt løfte
3. **Skattejægeren** — sager (beløb, resumé, kilder). `draft` vises ikke på sitet

## Login

Du skal bruge et **GitHub-token** med ret til at læse og skrive i `MattOMadsen/folketsmedie`.

- Classic PAT: scope `repo` (eller `public_repo` hvis repoet er offentligt)
- Fine-grained: Contents = Read and write, på dette repo

Tokenet gemmes kun i din browser (`localStorage`). Det kommer ikke i git.

## Artikler

- **Gem kladde** skriver til `data/manual.json` med `status: "draft"`. Forsiden ignorerer den.
- **Udgiv** sætter `status: "published"` og pusher til `main`. GitHub Actions bygger `gh-pages`.
- Arkivet i `data/export.json` overskrives ikke. Rettelser af gamle artikler gemmes som overlay i `manual.json`.
- **Bed AI om at skrive** kræver en nøgle (xAI/Grok eller anden OpenAI-kompatibel). Standard: `https://api.x.ai/v1`, model `grok-4`. Kladde kommer i felterne — du læser og retter, før du udgiver.

## Når det er live

Efter Udgiv: vent på det grønne hak under Actions på GitHub, så hård genindlæsning på sitet.
