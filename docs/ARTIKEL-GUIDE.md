# Sådan skrives artikler til Folkets Medie

Note til redaktion, frivillige og AI-assistenter.  
Mål: artikler der lyder som **Folkets Medie** — skarpe, kildenære, fra folket til folket — og som virker teknisk i det statiske arkiv (GitHub Pages).

**Live:** https://mattomadsen.github.io/folketsmedie/

---

## 0. Stående regler (Matt)

1. **Research før skrivning.** Slå datoer, citater og myndighedstekster efter. Skriv ikke noget, der ikke kan belægges. Ingen opdigtede «stadig» eller «på én gang».
2. **Kladde i chatten først.** Matt læser og godkender. Ingen udgivelse, ingen tidsplan, før han siger ja.
3. **Når han siger hvordan det skal være:** skriv det ned her og i `AGENTS.md`. Glem det ikke næste gang.
4. **Støtte (15. aug. 2026).** Bjælke øverst + siden `/stoet/`. Hjælp med at få Folkets Medie tilbage på en rigtig hjemmeside. Mail: mattomadsen@proton.me. MobilePay: 28896782 (kun nummeret offentligt). Overførsel: 9070 / 8060896667. Ingen reklamer.
5. **Ved godkendt udgivelse:**
   - billeder der passer (lokalt under `public/media/featured/`, ingen døde folketsmedie.dk-URL’er, ingen AI-ansigter af navngivne personer, ingen ulæselig tekst på billedet)
   - links til kilder og til de omtalte på X
   - gerne et kort, relevant videoklip (ikke nødvendigvis hele mødet)
   - HTML i `export.json`, featured absolut + lokal sti, så build + `gh-pages`

---

## 1. Stemme og vinkel

### Hvad FM er
- Uafhængigt medie **uden** statsfinansieret mainstream-narrativ.
- Nyheder og baggrund som magten og Big Media undertrykker, nedtoner eller latterliggør.
- **Ikke** “neutral DR-stil”. **Ikke** tech-virksomheds-tone. **Ikke** akademisk tågesnak.

### Tone
- Dansk, klar, direkte, lidt skarp.
- Respekt for læseren: forklar, pej på kilder, lad dem dømme.
- Kritik af: Big Pharma, WHO/EU-agendaer, censur, “settled science”-slogan, statsnære medier.
- Undgå: personangreb uden belæg, rene påstande uden kilde, copy-paste af hele X-tråde uden bearbejdning.

### Fast indledningsmønster (ofte brugt)
Mange artikler starter i stil med:

> *I en tid, hvor [magt / Big Pharma / EU / medier] …, [sker X / viser Y / afslører Z].*

Derefter: hvad er nyt, hvorfor det er vigtigt, hvad mainstream skjuler.

### Fast afslutning
- **Konklusion** med call-to-action: del, læs kilder, kræv informeret samtykke, husk arkiv-link osv.
- **Kildelinje** til sidst (se afsnit 5).

---

## 2. Struktur (anbefalet skelet)

1. **Hook** (1–2 afsnit) — tidens kontekst + hovedpåstand  
2. **Featured-billede** (teknisk: se afsnit 6)  
3. **Hvad er sket?** / kerneafsnit med fakta  
4. **2–4 mellemrubrikker** (`h2`) med underpunkter  
5. **Danmark / “hvad betyder det for os”** (når det giver mening)  
6. **Konklusion**  
7. **Kilder** + evt. X-embed  

### Mellemrubrikker (`h2`)
- Korte, konkrete, gerne med bid (ikke “Indledning / Analyse / Afrunding”).
- Eksempler fra arkivet:
  - *Mawson-Studiet Afslører Alarmerende Forskelle*
  - *SMS’erne om gravide…*
  - *Konklusion: Tid til Sandhed*

### Længde
- **Nyhedsartikel / X-baseret:** ca. 400–900 ord  
- **Stor baggrund (Fauci, større afsløring):** op til ~1200–1500 ord  
- Hellere skarp og læst færdig end lang og udvandet  

---

## 3. Titel, slug, excerpt

| Felt | Krav |
|------|------|
| **title** | Klar, dansk, gerne med konkret vinkel. Kan bruge anførselstegn ved citat. Undgå ALL CAPS i hele titlen. |
| **slug** | Kun små bogstaver, tal, bindestreg. Dansk æ/ø/å → `ae`/`oe`/`aa` eller omskriv. Max ~80–90 tegn. Unik. |
| **excerpt** | 1–2 sætninger (ca. 150–220 tegn). Bruges til forside, SEO og SoMe-beskrivelse. |
| **date** | `YYYY-MM-DD HH:MM:SS` — nyere dato = øverst på forsiden. |
| **source** | Ved manuelt indhold: `"manual"`. |

### Slug-eksempler
- `fauci-loej-for-amerika-dagbog-sms-er-og-5-amendment-afsloerer-manden-bag-videnskaben`
- `der-er-ingen-videnskab-der-viser-vacciner-giver-autisme-undtagen-alle-disse-publicerede-studier`

---

## 4. HTML-indhold (`content`)

Artikler gemmes som **HTML-strenge** i `data/export.json` (ikke bare Markdown i produktion).

### Anbefalede tags
```html
<p class="wp-block-paragraph">…</p>
<h2 class="wp-block-heading">Mellemrubrik</h2>
<ul class="wp-block-list"><li>…</li></ul>
<blockquote class="wp-block-quote"><p>Citat</p></blockquote>
<figure class="wp-block-image size-large">
  <img src="…" alt="kort beskrivelse" loading="lazy" />
  <figcaption>Valgfri billedtekst</figcaption>
</figure>
```

### X / Twitter-embed
```html
<figure class="wp-block-embed is-type-rich is-provider-twitter wp-block-embed-twitter">
  <div class="wp-block-embed__wrapper">
    <blockquote class="twitter-tweet" data-width="550" data-dnt="true">
      <p lang="en" dir="ltr">Kort tekst…</p>
      &mdash; Navn (@handle)
      <a href="https://twitter.com/handle/status/ID">dato</a>
    </blockquote>
    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
  </div>
</figure>
```

### Interne links
- Link til andre FM-artikler med **arkiv-stier**, ikke døde `folketsmedie.dk`-URL’er, når det er muligt:
  - `/folketsmedie/artikel/slug-her/`
- Eksterne kilder: `target="_blank" rel="noopener"`.

### Undgå
- WordPress shortcodes (`[caption]`, `[aiovg_video]`, Forminator osv.) — de strippes/virker ikke.
- Relative `/media/...`-stier **uden** base: brug **`/folketsmedie/media/...`** i HTML til inline-billeder på Pages.
- At love “daglig redaktion”, medmindre det er aftalt — arkivet er bevarelse + nye opslag efter behov.

---

## 5. Kilder (meget vigtigt)

### Prioritet (som i eksisterende FM-stof)
1. **X.com** — primære opslag med handle + status-URL  
2. **Alternative medier** — Just the News, Slay News, The Post Millennial, Becker News, Substack, Rumble m.fl.  
3. **Primærkilder** — PubMed, kongresdokumenter, pakningsindlæg, officielle høringer, dagbøger/mails  
4. Mainstream kun som **modpol** (“mens DR siger X, viser dokumenterne Y”) — ikke som eneste belæg  

### Handlere der ofte optræder i arkivet
`@KanekoaTheGreat`, `@VigilantFox`, `@Jim_Jordan`, `@SenRonJohnson`, `@MJTruthUltra`, `@TRobinsonNewEra`, `@SecKennedy` m.fl. — brug dem der **faktisk** er kilden til den konkrete historie.

### Kildelinje (standard)
Til sidst i artiklen:

```html
<p class="wp-block-paragraph">Kilde: Baseret på opslag fra
  <a href="https://x.com/HANDLE/status/ID">@HANDLE på X</a>.</p>
```

Ved flere kilder:

```html
<p class="wp-block-paragraph"><strong>Kilder:</strong> …</p>
```

### Checkliste før publicering
- [ ] Mindst én **konkret** kilde (link)  
- [ ] X-status kan åbnes / er citeret korrekt  
- [ ] Tal, datoer og citater er ikke opfundne  
- [ ] Skelnen mellem *påstand*, *dokument* og *fortolkning* er tydelig  

---

## 6. Billeder

### Featured (forside + artikel-top + SoMe)
- Fil under: `public/media/featured/`
- Filnavn: kort, dansk-slug-agtigt, `kebab-case.jpg` (eller `.png`)
- Anbefalet: **16:9**, ca. 1200×630 eller 1280×720 (godt til Open Graph)
- I `export.json`:
  - `featured_image_local`: `/media/featured/filnavn.jpg`
  - `featured_image`: fuld absolut URL  
    `https://mattomadsen.github.io/folketsmedie/media/featured/filnavn.jpg`

### Inline-billeder i brødteksten
```html
<img src="/folketsmedie/media/featured/andet-billede.jpg" alt="…" loading="lazy" />
```
**Husk** `/folketsmedie/`-prefix — ellers 404 på GitHub Pages.

### Indhold i billeder
- **Relevant for *denne* artikel (Matt, 15. aug. 2026).** Ikke endnu et mørkt skrivebord med en stak mapper. Vælg motiv, der peger på emnet: Andes og ruter til kokain, grænsehegn til Mexico, laboratorium til vaccine, osv. Dokument-stemning kun når historien *er* dokumenter.
- Atmosfære / symbolik er fint, hvis den kan genkendes som sagen.
- **Ingen** ulæselig AI-tekst på billedet (logoer og “fake screenshots” med garbled text).
- **Ingen** billeder af rigtige navngivne personer uden rigtigt referencefoto (brug hellere symbolik).
- `alt`-tekst: kort, dansk, meningsfuld.

### SoMe-preview (Open Graph)
Sitet sætter automatisk `og:image` og `twitter:image` ud fra featured-billede, **hvis** det er et absolut, offentligt tilgængeligt URL (lokal fil under `public/media/…` der er deployed).

- Uden featured → dårligt/intet preview.  
- Gamle `folketsmedie.dk`-URL’er virker **ikke** (domæne nede) — brug altid lokale filer til nye artikler.

---

## 7. Teknisk: tilføj artikel i arkivet

Artikler lever i **`data/export.json`** under `articles[]`.

### Minimumsfelter
```json
{
  "id": 1000002,
  "title": "Titel her",
  "slug": "titel-her-som-slug",
  "date": "2026-08-12 15:00:00",
  "excerpt": "Kort teaser…",
  "content": "<p class=\"wp-block-paragraph\">…</p>",
  "featured_image": "https://mattomadsen.github.io/folketsmedie/media/featured/….jpg",
  "featured_image_local": "/media/featured/….jpg",
  "source": "manual"
}
```

### `id`
- Vælg et tal **højere** end eksisterende max (manuelle artikler bruger typisk ≥ 999999 / 1000000).

### Efter ændring
```bash
npm run build
# sørg for dist/.nojekyll (ellers CSS 404 på Pages)
touch dist/.nojekyll
# commit source (export.json + billeder) til main
# deploy dist → branch gh-pages (med .nojekyll)
```

### Deploy-faldgruber
| Problem | Årsag / fix |
|---------|-------------|
| Siden er “uden design” | Manglende `.nojekyll` → `_astro/` CSS skjules af Jekyll |
| Intet billede ved deling | Manglende `og:image` / featured ikke absolut / ikke deployed |
| Billede 404 i artikel | Inline `src` uden `/folketsmedie/` |
| Artikel ikke øverst | `date` er for gammel |

### Hvad sitet automatisk giver
- Like-knap (øverst + nederst)  
- Deleknapper: X, Facebook, Telegram, e-mail, kopiér link, native share  
- Open Graph / Twitter Card (titel, beskrivelse, billede)  

Du behøver **ikke** indkode like/share i HTML-indholdet.

---

## 8. Emner og vinkler der passer til FM

- Sundhed: vacciner, bivirkninger, Big Pharma, CDC/NIH/Fauci, RFK Jr., pakningsindlæg, studier  
- Magt & censur: medier, “fact check”, platforme, lab-læk, gain-of-function  
- Suverænitet: EU, WHO, migration, national kultur  
- Økonomi/klima-agenda når det rammer almindelige mennesker  
- USA-afsløringer **oversat til dansk relevans** (“hvad betyder det her for os”)

### Udgangspunkt i et X-opslag
1. Læs hele opslaget + tråd/medier.  
2. Find 2–5 **stærke** links (PubMed, dokumenter, andre X-kilder).  
3. Skriv dansk artikel — **ikke** ordret maskinoversættelse.  
4. Indsæt X-embed + kilde-linje.  
5. Featured + evt. 1–2 inline-billeder.  

---

## 9. Sprogdetaljer

- Dansk retskrivning; engelske citater må stå på engelsk med kontekst.  
- Tal: brug danske formuleringer (“over 1.100 sider”, “januar 2021”).  
- Navne: fuldt navn første gang (Anthony Fauci, Rochelle Walensky, Rand Paul…).  
- Undgå unødvendig engelsk jargon; forklar (“5. amendment” = retten til ikke at inkriminere sig selv).  

### Dansk, ikke oversættelsesdansk (Matt, 14. aug. 2026)

Artiklen skal lyde, som om den er skrevet på dansk — ikke som en ordret oversættelse fra X eller Just the News.

- **Ikke** de franske anførselstegn « ». Brug »sådan« eller almindelige citationstegn.
- *Released* / *dropped* er **ikke** »sluppet«. Skriv *offentliggjort*, *lagt frem* eller *lagt ud*.
- Oversæt og forklar: *defensive briefings* → advarende briefinger; *task force* → arbejdsgruppe (engelsk navn i parentes første gang); *viral clip* → det klip, der går viralt; *narrative to neutralize* → fortælling, der skulle slås ned; *machine behind* → det apparat, der kørte bag.
- Ikke amerikansk TV-retorik: »Læs den sætning igen«, »Håndjern er der endnu ingen af«, »Læs Hegseth« (skriv *hvad* de skal læse: »Læs, hvad Hegseth sagde i Panama«).
- Domæner som whitehouse.gov hører til i kildelinjen. I brødtekst: »Det Hvide Hus’ hjemmeside«.  

---

## 10. Kort checkliste (print / copy)

- [ ] FM-stemme (skarpt, ikke DR)  
- [ ] Hook + 2–4 `h2` + konklusion  
- [ ] Titel, slug, excerpt, dato  
- [ ] HTML med `wp-block-*` klasser (valgfrit men konsistent)  
- [ ] Kilder (X + primær/alternativ) + kildelinje  
- [ ] Featured-billede lokalt + absolut URL  
- [ ] Inline-billeder med `/folketsmedie/media/...`  
- [ ] X-embed hvis historien kommer fra X  
- [ ] Indsat i `export.json` med `source: "manual"`  
- [ ] `npm run build` + deploy med `.nojekyll`  
- [ ] Tjek live: forside, artikel, CSS, SoMe-preview  

---

## 11. Fil-reference i repo

| Fil / mappe | Rolle |
|-------------|--------|
| `data/export.json` | Alle artikler (sandhedskilde) |
| `public/media/featured/` | Featured- og delte billeder |
| `src/pages/artikel/[slug].astro` | Artikelside (like/share automatisk) |
| `src/layouts/BaseLayout.astro` | Design + Open Graph |
| `src/components/EngageBar.astro` | Like + del |
| `docs/ARTIKEL-GUIDE.md` | Denne note |

---

*Opdater denne note, når workflow eller stil ændres — så både mennesker og AI skriver ensartet Folkets Medie.*
