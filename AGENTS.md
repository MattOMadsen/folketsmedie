## Deploy

After source changes that should be public: build and push `gh-pages`.
The live site is GitHub Pages from `gh-pages`, not `main`.
Always deploy unless the user says not to.

```
COMMIT_MSG="Deploy: kort beskrivelse" bash scripts/deploy-gh-pages.sh
```

Scriptet: `npm run build` → `dist/.nojekyll` → rsync til `origin/gh-pages` → gendan filer som kun lever på live (admin, ekstra featured, skandale-bundle) → Facebook hvis `~/.folketsmedie/facebook.env` findes.

### Artikel-udgivelse (Matt, 12. sep. 2026)

Kladde i chatten først. Ingen live, før han siger ja. Når han siger udgiv:

1. Featured 16:9 under `public/media/featured/` (kebab-case). Ingen navngivne AI-ansigter. Ingen ulæselig tekst. Motiv der ligner *denne* historie.
2. Ny post forrest i `data/export.json` (`articles[]`). `id` højere end max. `source: "manual"`. `featured_image` absolut + `featured_image_local`.
3. **Dato i UTC, allerede passeret.** `isPublished()` i `src/lib/content.ts` smider fremtidige datoer ud af buildet. Cloud-VM kører UTC. Sæt aldrig et dansk eftermiddagsklokkeslæt (fx `11:20`), hvis klokken på maskinen er `09:xx` UTC — så kommer artiklen slet ikke med. Brug fx `date -u +'%Y-%m-%d %H:%M:%S'` minus en buffer, eller samme dags dato med et klokkeslæt der allerede er gået i UTC.
4. Commit kilde (json + billede) på arbejdsgreenen. Push.
5. Kør deploy-scriptet. Tjek at `rsync` er installeret (`sudo apt-get install -y rsync` hvis den mangler).
6. Verificer live: forside (øverst), artiklen, featured-billede, CSS (ikke nøgen HTML), `feed.xml`. Admin og gamle featured-filer skal stadig svare 200.
7. Facebook: scriptet kører efter deploy. Mangler env-filen, så spring over.

`rsync --delete` uden gendannelse har tidligere slettet `/admin/`, `apps/skandale/data/bundle.json` og featured-billeder der kun lå på `gh-pages`. Scriptet gendanner slettede filer fra forrige live-commit (ikke `_astro/`-hashes).

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
- **Ikke nedgøre venlige kilder (12. sep. 2026).** Ramte de lidt ved siden af: ret tal og dato i teksten. Kør ikke på dem. Skriv historien, som om læseren ikke har set opslaget.
- **Censur og ytringer (12. sep. 2026).** Folkets Medie er imod censur og imod at anholde folk for at åbne munden. Vold og reelle trusler er en sag. At sige noget er det ikke. Artiklen skal handle om mennesker, der bliver hentet for at tale — navngivne, latterlige eller chikanøse sager — ikke om et tal, der ligger fladt. Danmark-afsnittet skal have bid: samme logik sælges her som "hadefulde ytringer" og "trygt onlinemiljø". Ikke et slapt "måske kopierer vi det".
- **Ved udgivelse (efter ok):** billeder der passer, lokale featured-filer, links til kilder og til navngivne personer på X, gerne relevant kort video. Deploy til `gh-pages` med `scripts/deploy-gh-pages.sh`. Dato i UTC, allerede passeret. Se afsnittet *Artikel-udgivelse* under Deploy.
- **Billeder skal ligne historien (15. aug. 2026).** Ikke det samme skrivebord med en stak papir igen. Colombia = Andes/grænse/kartel-rute. Mexico = Rio Grande/hegn. FBI-dokumenter må gerne være arkiv — men kun når artiklen *er* papirer. Ingen navngivne ansigter uden rigtigt foto. Ingen ulæselig tekst på billedet.
- **Når Matt siger hvordan noget skal være:** skriv det ind i denne fil og i `docs/ARTIKEL-GUIDE.md` med det samme.
- **Facebook-opslag ved udgivelse.** `scripts/post-facebook.py` kører efter deploy, hvis `~/.folketsmedie/facebook.env` findes (PAGE_ID + PAGE_TOKEN). Ellers spring over. RSS: `/folketsmedie/feed.xml`.
- **Støtte (15. aug. 2026):** Bjælke + side `/stoet/`. Tekst om at hjælpe Folkets Medie tilbage på en rigtig hjemmeside.
  - Mail: `mattomadsen@proton.me`
  - MobilePay: `28896782` (offentligt kun nummeret — ikke hvis hvis konto)
  - Overførsel: reg. `9070`, konto `8060896667`
  - Ingen reklamer. Frivilligt. Arkivet er midlertidigt.
- **Dansk sprog, ikke oversættelsesdansk.** Skriv, som man siger det herhjemme. Ikke copy-paste fra engelsk.
  - Brug **ikke** franske anførselstegn (« » eller » «). Skriv "sådan" eller brug kursiv. Aldrig guillemets i artikler.
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
