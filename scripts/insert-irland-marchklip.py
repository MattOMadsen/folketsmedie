#!/usr/bin/env python3
import json
from pathlib import Path

EXPORT = Path(__file__).resolve().parents[1] / "data" / "export.json"

CONTENT = r"""<p class="wp-block-paragraph">I en tid, hvor X kan gøre et gammelt marchklip til "breaking news" på få timer, er det nemt at tro, at et land er væltet, bare fordi nogen skriver det med store bogstaver.</p>

<p class="wp-block-paragraph">Lørdag den 12. september 2026 lagde kontoen <a href="https://x.com/TrueOnX" target="_blank" rel="noopener">@TrueOnX</a> (Noah B. Price) et opslag ud: Irland er faldet. Patrioter har stormet Dublin og "enhver" storby. Gaderne står i brand. Regeringsbygninger er omringet. Hele økonomien lukkes, til "forræderne" giver sig. Folket er færdige med at blive udskiftet af EU-dukker. Del det, før de fjerner det.</p>

<p class="wp-block-paragraph">Det lyder som historiens vendepunkt. Det er det ikke.</p>

<figure class="wp-block-embed is-type-rich is-provider-twitter wp-block-embed-twitter"><div class="wp-block-embed__wrapper">
<blockquote class="twitter-tweet" data-width="550" data-dnt="true"><p lang="en" dir="ltr">BREAKING NEWS: IRELAND HAS FALLEN THIS IS NOT A DRILL</p>&mdash; Noah B. Price (@TrueOnX) <a href="https://twitter.com/TrueOnX/status/2098736471213547680">September 12, 2026</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div></figure>

<h2 class="wp-block-heading">Hvad der faktisk skete i Dublin</h2>

<p class="wp-block-paragraph">Samme dag var der tusindvis på gaden i Dublin — det er rigtigt. Men det var en march imod Donald Trumps besøg i Irland, arrangeret blandt andet af Irish Neutrality League, med støtte fra venstrefløjspartier. Ruten gik fra Garden of Remembrance ad O'Connell Street mod Leinster House. Trafik og kollektiv trafik blev forstyrret. Der var skilte, råb og politi.</p>

<p class="wp-block-paragraph">Det, irske medier beskriver, er en protest. Ikke et kup. Ikke landsdækkende storm. Ikke økonomisk nedlukning.</p>

<h2 class="wp-block-heading">Hvad videoen viser — og hvad den ikke viser</h2>

<p class="wp-block-paragraph">Opslaget havde et kort videoklip med. Seks sekunder. En håndholdt pan over en tæt gade. Gul sikkerhedsvest. En høj bygning. En Luas. En gul dobbeltdækkerbus.</p>

<p class="wp-block-paragraph">Bygningen er Liberty Hall — fagforeningen SIPTU's hus, ikke en regeringsbygning. Der er ingen ild. Ingen røg. Ingen storm. Ingen "økonomi lukket". Klippet er stærkt komprimeret og sløret, som noget, der er delt og genuploadet igen og igen. Det er Dublin — men det er ikke bevis for den historie, teksten sælger.</p>

<p class="wp-block-paragraph">Når teksten siger "gaderne står i brand", og billedet viser en sporvogn, er det ikke journalistik. Det er klikmaskine.</p>

<h2 class="wp-block-heading">Falsk håb er også propaganda</h2>

<p class="wp-block-paragraph">Mange længes efter et folk, der siger stop. Efter grænser. Efter et land, der stadig er deres. Det håb er forståeligt. Det er også farligt, når det fodres med løgne.</p>

<p class="wp-block-paragraph">Hvis du deler "Irland er faldet", fordi du ønsker, at det var sandt, hjælper du dem, der lever af din opmærksomhed — ikke dem, der kæmper for noget konkret. Falsk håb gør dig blind for de rigtige kampe: migration, EU-pagter, censur, valg, lokale protestbevægelser, der faktisk kan dokumenteres.</p>

<p class="wp-block-paragraph">Big Media lyver ofte ved at nedtone. X-maskinen lyver ofte ved at overdrive. Begge steder er prisen den samme: du mister grebet om, hvad der er sket.</p>

<h2 class="wp-block-heading">Hvad du kan gøre i stedet</h2>

<p class="wp-block-paragraph">Før du deler "breaking":</p>
<ul class="wp-block-list">
<li>Læs hele opslaget — også den nederste spam om "tag 1–5 venner" og "un-repost". Det er engagement-farme, ikke nyhedsbureau.</li>
<li>Match tekst til billede. Passer ilden til klippet?</li>
<li>Tjek en lokal kilde samme dag. Hvis Irland var "faldet", ville Dublin ikke bare have en Trump-march i aviserne.</li>
<li>Skeln mellem <em>påstand</em>, <em>dokument</em> og <em>ønske</em>.</li>
</ul>

<p class="wp-block-paragraph">Håb er fint. Falsk håb er gift.</p>

<h2 class="wp-block-heading">Konklusion</h2>

<p class="wp-block-paragraph">Del ikke branden, der ikke er der. Del kilden, der holder. Og næste gang nogen skriver, at et helt land er væltet på seks sekunder — så stop, før du trykker videre.</p>

<p class="wp-block-paragraph"><strong>Kilder:</strong> <a href="https://x.com/TrueOnX/status/2098736471213547680" target="_blank" rel="noopener">opslag fra @TrueOnX</a>; The Journal, Irish Examiner og Irish Times om Trump-protesten i Dublin 12. sep. 2026; videoklip ved Liberty Hall / Luas (samme opslag).</p>
"""

article = {
    "id": 1000030,
    "title": "De råbte, at Irland var faldet. Det var et gammelt marchklip",
    "slug": "de-raabte-at-irland-var-faldet-det-var-et-gammelt-marchklip",
    "date": "2026-09-13 07:00:00",
    "excerpt": "Et viralt X-opslag lovede ild, storm og økonomisk nedlukning i Irland. Klippet er genbrug ved Liberty Hall. I Dublin gik folk i protest — men ikke den, opslaget solgte.",
    "content": CONTENT,
    "featured_image": "https://mattomadsen.github.io/folketsmedie/media/featured/dublin-liberty-hall-luas-gade.jpg",
    "featured_image_local": "/media/featured/dublin-liberty-hall-luas-gade.jpg",
    "source": "manual",
}

data = json.loads(EXPORT.read_text(encoding="utf-8"))
before = len(data["articles"])
max_id = max(int(a["id"]) for a in data["articles"])
if article["id"] <= max_id and not any(int(a["id"]) == article["id"] for a in data["articles"]):
    raise SystemExit(f"id {article['id']} not > max {max_id}")
data["articles"] = [
    a
    for a in data["articles"]
    if a.get("id") != article["id"] and a.get("slug") != article["slug"]
]
data["articles"].insert(0, article)
EXPORT.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("inserted", article["slug"], "id", article["id"], "count", before, "->", len(data["articles"]), "max_was", max_id)
