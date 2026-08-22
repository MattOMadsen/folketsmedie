#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data" / "export.json"

article = {
    "id": 1000020,
    "title": "I England kan det bedre betale sig at lade marken stå",
    "slug": "england-bedre-betalt-for-tom-mark-end-for-broed-sfi",
    "date": "2026-08-22 10:15:00",
    "excerpt": "En landmand fik 2.500 pund i tre år for ikke at levere mad. Det er hans lille slat. Staten har selv talt 340.000 hektar ud af drift. Og ministeriet har indrømmet, at pengene blev for gode til at så korn.",
    "content": """<p class="wp-block-paragraph">I en tid, hvor I får at vide, at Europa skal brødføde sig selv, betaler England landmænd for at lade marken stå.</p>

<p class="wp-block-paragraph">Han står i et lokale blandt andre landmænd og siger det, som det er.</p>

<p class="wp-block-paragraph">Vi er blevet tilbudt to et halvt tusind pund for at gå med i tre år. I den periode leverer vi jer ikke noget mad.</p>

<p class="wp-block-paragraph">Folk i salen mumler. En siger, I kommer til at sulte. Han er færdig. Klippet er under to minutter. Det har kørt på nettet i årevis og kom op igen den 18. august.</p>

<figure class="wp-block-image size-large">
<img src="/folketsmedie/media/featured/england-tom-mark-sfi-blomster.jpg" alt="Engelsk kornmark der står urørt med blomsterstriber i stedet for høst" loading="eager" />
</figure>

<figure class="wp-block-embed is-type-rich is-provider-twitter wp-block-embed-twitter"><div class="wp-block-embed__wrapper">
<blockquote class="twitter-tweet" data-width="550" data-dnt="true"><p lang="en" dir="ltr">We've been offered two and a half thousand pounds to go into a scheme for three years. During that period we will supply you no food.</p>&mdash; (@dejanirasilveir) <a href="https://twitter.com/dejanirasilveir/status/2089798927839007199">August 18, 2026</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div></figure>

<p class="wp-block-paragraph">2.500 pund er ikke en gård, der lukker. Det er en lille bunke for en plet, der ikke skal give korn. Det er derfor, det lyder næsten latterligt — indtil man ser, hvad naboen kan hente, hvis han tager rigtig jord ud.</p>

<h2 class="wp-block-heading">Sådan ser regnestykket ud, når det er en mark — ikke et hjørne</h2>

<p class="wp-block-paragraph">Efter Brexit smed England den gamle støtte, der fulgte med, fordi I dyrkede noget. Nu hedder kassen Sustainable Farming Incentive. Pengene kommer, når I gør det, staten kalder godt for naturen. Blomster. Fuglefoder. Bræmmer. En mark, der står stille.</p>

<p class="wp-block-paragraph">Taksterne er pr. hektar, om året, i tre år:</p>

<ul class="wp-block-list">
<li>blomsterstriber: 798 pund</li>
<li>pollen og nektar: omkring 739 pund</li>
<li>vinterfuglefoder på ager: 648 pund — før 853</li>
<li>hjørner, der tages helt ud: 333 pund</li>
<li>forbedret stub: 589 pund — YouTuberen Harry's Farm sagde det rent ud: over 230 pund pr. acre for at lave ingenting</li>
</ul>

<p class="wp-block-paragraph">På Clarksons Farm siger forvalteren Charlie Ireland det samme på TV: omkring 160 pund pr. acre, hvis I ikke dyrker mad.</p>

<p class="wp-block-paragraph">Statens eget landbrugsråd, AHDB, har regnet på en almindelig kornbedrift. Lægger I de rigtige poster ovenpå hinanden, stiger overskuddet med 15 til 25 procent. Rådgiverne skriver det uden at rødme: nogle af de her poster slår hvede og byg.</p>

<p class="wp-block-paragraph">Så 2.500 pund i klippet er ikke loftet. Loftet i den nye runde er 100.000 pund om året pr. bedrift. En fjerdedel af jorden må lægges i de poster, der tager den ud af drift.</p>

<h2 class="wp-block-heading">Ministeriet har selv sagt det</h2>

<p class="wp-block-paragraph">I februar 2026 skrev Defra, hvorfor de skar i pengene: de gamle beløb var sat for højt. Det blev for fristende at tage god jord ud af fødevareproduktion.</p>

<p class="wp-block-paragraph">De satte et loft på 25 procent. De skar i fuglefoder og kløverbrak.</p>

<p class="wp-block-paragraph">En landmand, der har dyrket i 500 år, sagde det til et kamera: nu får vi mere for vilde blomster end for mad.</p>

<h2 class="wp-block-heading">340.000 hektar. Mere end hele Fyn</h2>

<p class="wp-block-paragraph">Defra, 1. oktober 2025:</p>

<ul class="wp-block-list">
<li>44.500 aftaler</li>
<li>340.000 hektar i poster, der midlertidigt tager jord ud af drift</li>
<li>3,9 procent af Englands landbrugsjord</li>
</ul>

<p class="wp-block-paragraph">I april 2024 var det 149.000 hektar. På halvandet år mere end fordoblet.</p>

<p class="wp-block-paragraph">Samme sommer faldt Storbritanniens selvforsyning, målt i værdi, fra 65 til 60 procent. Det, I kan dyrke hjemme: fra 77 til 72. Defras egne tal, juli 2026.</p>

<p class="wp-block-paragraph">England er det sted i Europa, hvor I ikke længere får støtte for at fylde tallerkenen. I får støtte for at fylde plakaten.</p>

<h2 class="wp-block-heading">Så lukkede de kassen. Så åbnede de den igen</h2>

<p class="wp-block-paragraph">I marts 2025 smækkede Labour SFI i uden varsel. I juni 2026 kom SFI26. Første ansøgningsrunde lukker 28. august. Emma Reynolds lover både natur og mad.</p>

<p class="wp-block-paragraph">Samtidig har de kæmpet om arveafgift på familiebrug. Tusindvis kørte til London.</p>

<h2 class="wp-block-heading">Det er det samme som vildmosen</h2>

<p class="wp-block-paragraph">I Danmark køber staten kartoffelavlerne ud, så tørven kan blive våd. I England er det blomster og fuglefoder, indtil ministeriet selv må skrue ned, fordi kornet taber.</p>

<p class="wp-block-paragraph">31. august kalder Landbrug &amp; Fødevarer landmænd til Odense. De skal så nu. Gødskningslovens færdige regler kommer til efteråret. Så kan de pløje det op igen.</p>

<h2 class="wp-block-heading">Konklusion</h2>

<p class="wp-block-paragraph">Hør manden med de 2.500 pund. Så kig på taksten pr. hektar. Så kig på Defras eget tal: 340.000 hektar. Så kig på selvforsyningen, der kravler nedad.</p>

<p class="wp-block-paragraph">De kalder det bæredygtigt. Han kalder det tre år uden at levere mad.</p>

<p class="wp-block-paragraph">Læs også: <a href="/folketsmedie/artikel/staten-koeber-vildmosekartoflen-vaek-store-vildmose/">Staten køber vildmosekartoflen væk. Så kommer mosen igen</a>.</p>

<p class="wp-block-paragraph"><strong>Kilder:</strong>
<a href="https://x.com/dejanirasilveir/status/2089798927839007199" target="_blank" rel="noopener">@dejanirasilveir på X</a> ·
<a href="https://x.com/TinyTalkMatters/status/2087280535756238957" target="_blank" rel="noopener">samme klip, engelsk</a> ·
<a href="https://www.gov.uk/government/statistics/sustainable-farming-incentive-action-uptake-data-october-2025/sustainable-farming-incentive-action-uptake-data-october-2025" target="_blank" rel="noopener">Defra, SFI-optag oktober 2025</a> ·
<a href="https://defrafarming.blog.gov.uk/2026/02/24/sfi26-details-definitions-and-what-to-expect/" target="_blank" rel="noopener">Defra-blog februar 2026</a> ·
<a href="https://www.gov.uk/government/publications/sustainable-farming-incentive-2026-sfi26/sfi26-scheme-rules-and-guidance" target="_blank" rel="noopener">SFI26-regler</a> ·
<a href="https://www.farminguk.com/news/climate-impacts-blamed-as-uk-food-self-sufficiency-drops-to-60-_68792.html" target="_blank" rel="noopener">selvforsyning 60 %</a> ·
<a href="https://ahdb.org.uk/stacking-options-for-SFI-2026-arable" target="_blank" rel="noopener">AHDB stacking</a>.</p>
""",
    "featured_image": "https://mattomadsen.github.io/folketsmedie/media/featured/england-tom-mark-sfi-blomster.jpg",
    "featured_image_local": "/media/featured/england-tom-mark-sfi-blomster.jpg",
    "source": "manual",
}

data = json.loads(path.read_text(encoding="utf-8"))
arts = data["articles"]
data["articles"] = [article] + [
    a for a in arts if a.get("id") != article["id"] and a.get("slug") != article["slug"]
]
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("inserted", article["slug"])
