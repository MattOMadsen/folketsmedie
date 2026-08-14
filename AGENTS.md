## Deploy

After source changes that should be public: build and push `gh-pages`.
The live site is GitHub Pages from `gh-pages`, not `main`.
Always deploy unless the user says not to.

```
npm run build
# publish dist/ to origin/gh-pages (keep .nojekyll)
```

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Folkets Medie — artikler

**Før du skriver eller publicerer en artikel:** læs `docs/ARTIKEL-GUIDE.md`.

### Stående ordrer fra Matt (skriv ned, når han siger hvordan det skal være)

- **Kladde først.** Vis den færdige artikel her i chatten. Udgiv aldrig før han har læst og godkendt.
- **Research først.** Tjek datoer, citater, myndighedstekster og X-kilder. Ingen gætteri, ingen «tre ting på én gang» hvis det ikke er sandt.
- **Ved udgivelse (efter ok):** billeder der passer, lokale featured-filer, links til kilder og til navngivne personer på X, gerne relevant kort video. Deploy til `gh-pages`.
- **Når Matt siger hvordan noget skal være:** skriv det ind i denne fil og i `docs/ARTIKEL-GUIDE.md` med det samme.
- **Dansk sprog, ikke oversættelsesdansk.** Skriv, som man siger det herhjemme. Ikke copy-paste fra engelsk.
  - Brug **ikke** de franske tegn « ». På dansk: »sådan« eller almindelige anførselstegn.
  - *Released* er **ikke** »sluppet«. Skriv *offentliggjort*, *lagt frem* eller *lagt ud*.
  - Oversæt og forklar engelske betegnelser: *defensive briefings* → advarende briefinger; *task force* → arbejdsgruppe (engelsk navn i parentes første gang); *viral clip* → det klip, der går viralt; *narrative to neutralize* → fortælling, der skulle slås ned.
  - Ikke TV-amerikansk: »Læs den sætning igen«, »Læs Hegseth«, »Håndjern er der endnu ingen af«, »den interne maskine bag«. Skriv hvad læseren skal læse.
  - whitehouse.gov og andre URL’er hører hjemme i kildelinjen, ikke som mundret brødtekst (sig »Det Hvide Hus’ hjemmeside«).

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
