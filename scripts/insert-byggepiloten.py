#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data" / "export.json"

article = {
    "id": 1000016,
    "title": "ByggePiloten: skriv hvad der skal laves, og få bud fra lokale håndværkere",
    "slug": "byggepiloten-gratis-bud-fra-lokale-haandvaerkere",
    "date": "2026-08-19 13:00:00",
    "excerpt": "En ny dansk side, hvor man skriver opgaven og får bud fra murer, tømrer, elektriker og andre lokale. Gratis at oprette. Ingen abonnement. Beta er åben.",
    "content": """<p class="wp-block-paragraph">Det kender de fleste: taget drypper, stikket virker ikke, badeværelset skal laves. Så ringer man tre steder. Den ene ringer ikke tilbage. Den anden kan først om tre måneder. Den tredje sender et tilbud, man ikke kan gennemskue.</p>

<p class="wp-block-paragraph">Eller man går ind på de store portaler, hvor det koster kassen at være med, og hvor man ender med at betale for at stå i kø.</p>

<p class="wp-block-paragraph">ByggePiloten er et forsøg på at gøre det enklere. Siden er i <strong>beta</strong> nu. Adressen er <a href="https://byggepiloten.dk" target="_blank" rel="noopener">byggepiloten.dk</a>.</p>

<figure class="wp-block-image size-large">
<img src="/folketsmedie/media/featured/byggepiloten-hus-vaerktoej.jpg" alt="Dansk parcelhus under renovering med stige, værktøjskasse og nyt vindue" loading="eager" />
</figure>

<figure class="wp-block-embed is-type-rich is-provider-twitter wp-block-embed-twitter"><div class="wp-block-embed__wrapper">
<blockquote class="twitter-tweet" data-width="550" data-dnt="true"><p lang="da" dir="ltr">ByggePiloten beta er nu åben! Endelig en nem og gratis måde at få håndværkere til dit næste projekt.</p>&mdash; Mattie Danmark (@MattieDanmark) <a href="https://twitter.com/MattieDanmark/status/2078805816728248675">July 19, 2026</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div></figure>

<h2 class="wp-block-heading">Sådan virker det</h2>

<p class="wp-block-paragraph">Man skriver, hvad der skal laves. En ny dør. Et badeværelse. En stikkontakt. En hæk.</p>

<p class="wp-block-paragraph">Lokale firmaer kan byde. Murer, tømrer, elektriker, VVS, maler, anlægsgartner. Både private og virksomheder kan bruge den.</p>

<p class="wp-block-paragraph">Så vælger man selv, hvem man vil have. Buddene er uforpligtende. Det er gratis at oprette opgaven. Der er ikke abonnement, og der er ikke et fast månedligt gebyr.</p>

<p class="wp-block-paragraph">Det er det, siden lover. Den er ny. Den skal testes af rigtige opgaver — ikke af en pæn brochure.</p>

<h2 class="wp-block-heading">Hvorfor det overhovedet er nødvendigt</h2>

<p class="wp-block-paragraph">Håndværkere i Danmark drukner i portaler, Google-annoncer og mellemled, der tager en bid, hver gang nogen skal have skiftet en hane.</p>

<p class="wp-block-paragraph">Boligejere drukner i ventetid og i tilbud, de ikke kan sammenligne.</p>

<p class="wp-block-paragraph">Tanken bag ByggePiloten er den kedelige, fornuftige: lad opgaven møde den lokale, der kan løse den. Uden at nogen skal betale sig til at være synlig hver måned.</p>

<p class="wp-block-paragraph">I juli blev betaen åbnet. Der blev bedt om hjælp til at teste — både fra folk med en opgave og fra firmaer, der vil byde. Mailen er <a href="mailto:admin@byggepiloten.dk">admin@byggepiloten.dk</a>.</p>

<h2 class="wp-block-heading">Det, man skal vide, før man hopper i</h2>

<p class="wp-block-paragraph">Det er beta. Ting kan knirke.</p>

<p class="wp-block-paragraph">En opgave, der er dårligt beskrevet, giver dårlige bud. Det er ikke sidens skyld alene. Tag billeder. Skriv mål. Skriv, om det er hus eller lejlighed. Jo klarere, jo bedre tilbud.</p>

<p class="wp-block-paragraph">Håndværkeren skal stadig ses i øjnene. Tjek CVR. Tjek forsikring. Tjek referencer. En platform fjerner ikke, at man skal bruge sin sunde fornuft.</p>

<p class="wp-block-paragraph">Og vælg selv. Det er meningen.</p>

<h2 class="wp-block-heading">Konklusion</h2>

<p class="wp-block-paragraph">Har man en opgave, kan man lægge den ind. Har man et firma, kan man byde. Det koster ikke at oprette, og der er ikke et abonnement, der tikker hver måned.</p>

<p class="wp-block-paragraph">Prøv det, mens det er beta — og sig til, hvis noget ikke virker. Det er sådan en side bliver til noget, folk kan bruge.</p>

<p class="wp-block-paragraph"><a href="https://byggepiloten.dk" target="_blank" rel="noopener">byggepiloten.dk</a></p>

<p class="wp-block-paragraph"><strong>Kilder:</strong>
<a href="https://byggepiloten.dk" target="_blank" rel="noopener">ByggePiloten</a> ·
<a href="https://x.com/MattieDanmark/status/2078805816728248675" target="_blank" rel="noopener">@MattieDanmark på X, 19. juli 2026</a>.</p>
""",
    "featured_image": "https://mattomadsen.github.io/folketsmedie/media/featured/byggepiloten-hus-vaerktoej.jpg",
    "featured_image_local": "/media/featured/byggepiloten-hus-vaerktoej.jpg",
    "source": "manual",
}

data = json.loads(path.read_text(encoding="utf-8"))
arts = data["articles"]
arts = [a for a in arts if a.get("id") != article["id"] and a.get("slug") != article["slug"]]
arts.insert(0, article)
data["articles"] = arts
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("inserted", article["slug"], "id", article["id"])
