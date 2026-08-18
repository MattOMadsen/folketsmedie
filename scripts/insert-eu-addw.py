#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data" / "export.json"

article = {
    "id": 1000012,
    "title": "EU har sat et kamera i alle nye biler. De kalder det sikkerhed",
    "slug": "eu-kamera-i-nye-biler-addw-overvaager-foereren",
    "date": "2026-08-18 12:15:00",
    "excerpt": "Fra 7. juli 2026 skal alle nye biler i EU have et system, der følger dine øjne og dit ansigt. Loven hedder ADDW. Hardware er der. Resten er software.",
    "content": """<p class="wp-block-paragraph">I en tid, hvor EU allerede har sat intelligent fartbegrænser og sort boks i nye biler, er næste skridt et kamera, der kigger på dig.</p>

<p class="wp-block-paragraph">Fra <strong>7. juli 2026</strong> skal alle nye personbiler og varevogne, der sælges i Unionen, have det, Bruxelles kalder Advanced Driver Distraction Warning — ADDW. En lille infrarød linse ved rattet eller instrumenterne følger øjne, hoved og blik. Kigger du for længe ned i skærmen, efter barnet eller efter klimaanlægget, piper bilen. Lys. Lyd. Vibration i rattet eller sædet.</p>

<p class="wp-block-paragraph"><a href="https://x.com/PeterSweden7/status/2088692447639486548" target="_blank" rel="noopener">Peter Imanuelsen — PeterSweden</a> skrev det rent ud: alle nye biler skal overvåge førerens ansigt. Han kalder det naivt at tro, at det stopper ved “sikkerhed”.</p>

<figure class="wp-block-image size-large">
<img src="/folketsmedie/media/featured/eu-addw-kamera-kabine.jpg" alt="Tom bilkabine i skumring med lille overvågningslinse ved rattet" loading="eager" />
</figure>

<figure class="wp-block-embed is-type-rich is-provider-twitter wp-block-embed-twitter"><div class="wp-block-embed__wrapper">
<blockquote class="twitter-tweet" data-width="550" data-dnt="true"><p lang="en" dir="ltr">All new cars in the EU now have to monitor the driver’s face.</p>&mdash; Peter Sweden (@PeterSweden7) <a href="https://twitter.com/PeterSweden7/status/2088692447639486548">August 15, 2026</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div></figure>

<h2 class="wp-block-heading">To systemer. Medierne slår dem sammen</h2>

<p class="wp-block-paragraph">Det er ikke det samme som kravet fra 2024.</p>

<p class="wp-block-paragraph">Siden 7. juli 2024 har nye biler skullet have DDAW — advarsel om træthed og uopmærksomhed. Den måler typisk, hvordan du kører: rattet, vognbanen, mønsteret. Ikke et krav om at filme dit ansigt.</p>

<p class="wp-block-paragraph">ADDW er skridtet efter. Her skal systemet følge, <em>hvor du kigger</em>. Det står i den delegerede forordning 2023/2590 under den store sikkerhedsforordning 2019/2144. “Ækvivalente sensorer” er tilladt. I virkeligheden er det kamera.</p>

<p class="wp-block-paragraph">Gamle biler går fri. Nye gør ikke. Hardware kommer ind med typegodkendelsen. Når linsen sidder der, er resten en opdatering.</p>

<figure class="wp-block-image size-large">
<img src="/folketsmedie/media/featured/eu-addw-kamera-rat.jpg" alt="Udsigt gennem forruden om natten, kamera ved rattet peger ind i kabinen" loading="lazy" />
</figure>

<h2 class="wp-block-heading">Hvad loven lover — og hvad den ikke kan love</h2>

<p class="wp-block-paragraph">Kommissionen siger: ingen videooptagelse til arkiv, ingen ansigtsgenkendelse, ingen data ud af bilen. GDPR gælder. Data skal slettes, når jobbet er gjort.</p>

<p class="wp-block-paragraph">Det er teksten.</p>

<p class="wp-block-paragraph">Teksten siger også “nødvendigt”. Den definerer ikke, hvor længe et blik-spor er nødvendigt. Den sætter ikke en uafhængig kontrollant ind i fabrikken. I USA har bilmærker allerede solgt køreadfærd til forsikringsmæglere. Det var ikke EU-ADDW. Det viser bare, hvad der sker, når data først findes.</p>

<p class="wp-block-paragraph">Biltesterne i Belgien kørte en Xpeng med systemet tændt. Et blik til landskabet. Et blik til radioen. Bip. Folk skriver, at advarslen kommer efter ti minutter — og at “sluk” kun gælder til næste start.</p>

<p class="wp-block-paragraph">Du må slukke for turen. Du må ikke slukke for alvor.</p>

<h2 class="wp-block-heading">Hvad det betyder herhjemme</h2>

<p class="wp-block-paragraph">Danmark er med. En ny Polo, en ny ev-kasse, en leasingbil fra 2026: kameraet er der, fordi Bruxelles har skrevet det ind i typegodkendelsen. Ikke fordi du har bedt om det. Ikke fordi Folketinget har stemt om dit ansigt i kabinen.</p>

<p class="wp-block-paragraph">Først var det flaskelåget. Så var det fartbegrænseren, der nager, hver gang skiltet skifter. Nu er det øjnene.</p>

<p class="wp-block-paragraph">Når hardwaren er i alle nye biler, er næste skridt software. Loven i dag kræver ikke, at systemet kender dig, låser tændingen eller sender blikket videre til forsikring, arbejdsgiver eller et klimaregnskab. Det er grunden til, at linsen er interessant: den sidder der allerede.</p>

<p class="wp-block-paragraph">Sikkerhed er argumentet. Infrastrukturen er overvågning.</p>

<h2 class="wp-block-heading">Konklusion</h2>

<p class="wp-block-paragraph">Læs forordningen. Læs PeterSwedens opslag. Køb gerne en brugt bil, hvis I vil slippe. Del kilderne — ikke kun overskriften.</p>

<p class="wp-block-paragraph"><strong>Kilder:</strong>
<a href="https://x.com/PeterSweden7/status/2088692447639486548" target="_blank" rel="noopener">@PeterSweden7 på X</a> ·
<a href="https://www.petersweden.org/p/it-begins-new-cars-must-monitor-driver" target="_blank" rel="noopener">PeterSweden, 7. juli 2026</a> ·
<a href="https://eur-lex.europa.eu/eli/reg/2019/2144/oj" target="_blank" rel="noopener">Forordning (EU) 2019/2144</a> ·
<a href="https://eur-lex.europa.eu/eli/reg_del/2023/2590/oj" target="_blank" rel="noopener">Delegeret forordning (EU) 2023/2590 (ADDW)</a> ·
<a href="https://eur-lex.europa.eu/eli/reg_del/2021/1341/oj" target="_blank" rel="noopener">Delegeret forordning (EU) 2021/1341 (DDAW)</a> ·
<a href="https://etsc.eu/comparative-overview-eu-us-vehicle-standards/" target="_blank" rel="noopener">ETSC: oversigt over EU-krav</a>.</p>
""",
    "featured_image": "https://mattomadsen.github.io/folketsmedie/media/featured/eu-addw-kamera-kabine.jpg",
    "featured_image_local": "/media/featured/eu-addw-kamera-kabine.jpg",
    "source": "manual",
}

data = json.loads(path.read_text(encoding="utf-8"))
arts = data["articles"]
data["articles"] = [article] + [a for a in arts if a.get("id") != article["id"] and a.get("slug") != article["slug"]]
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("inserted", article["slug"])
