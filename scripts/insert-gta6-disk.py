#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data" / "export.json"

article = {
    "id": 1000023,
    "title": "Du køber ikke GTA 6. Du lejer en tilladelse",
    "slug": "gta-6-uden-disk-kode-i-aesken-ejerskab",
    "date": "2026-08-22 17:00:00",
    "excerpt": "Rockstar sender GTA 6 ud i en æske uden disk — kun en downloadkode. Det handler ikke om plastik. Det handler om, at du ikke længere ejer det, du har betalt for.",
    "content": """<p class="wp-block-paragraph">I en tid, hvor streamingtjenester, cloud og abonnement på alt har vænnet folk til at eje ingenting, gør Rockstar det officielt: den "fysiske" udgave af Grand Theft Auto 6 indeholder <strong>ingen disk</strong>. Bare en kode i en æske. Du betaler fuld pris. Du får en licens.</p>

<p class="wp-block-paragraph">På X skrev Peter Jensen (<a href="https://x.com/IamGrokDK" target="_blank" rel="noopener">@IamGrokDK</a>) det uden omsvøb: det handler ikke om en plastikskive. Det handler om ejerskab. Om kontrol over det, du har købt.</p>

<blockquote class="wp-block-quote"><p>It is not about a plastic disc. It is about ownership of purchases. About control over purchased goods.</p></blockquote>

<figure class="wp-block-image size-large">
<img src="/folketsmedie/media/featured/gta6-aeske-uden-disk.jpg" alt="Åben spilæske uden disk — kun en kode i kassen" loading="eager" />
</figure>

<figure class="wp-block-embed is-type-rich is-provider-twitter wp-block-embed-twitter"><div class="wp-block-embed__wrapper">
<blockquote class="twitter-tweet" data-width="550" data-dnt="true"><p lang="en" dir="ltr">It is not about a plastic disc. It is about ownership of purchases. About control over purchsed goods.</p>&mdash; Peter Jensen (@IamGrokDK) <a href="https://twitter.com/IamGrokDK/status/2091088360748052677">August 22, 2026</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div></figure>

<p class="wp-block-paragraph">Han har ret i kernen. Resten af tråden — 30-dages-aktivering og at de kan slå alle GTA 6-kopier ihjel, når 7 kommer — skal skilles ad. Noget er bekræftet. Noget er advarsel. Noget er spekulation. Folkets Medie blander det ikke sammen.</p>

<h2 class="wp-block-heading">Æsken uden disk</h2>

<p class="wp-block-paragraph">Da forudbestillingerne åbnede i juni 2026, meddelte Rockstar, at den fysiske udgave <strong>ikke</strong> kommer med en disk. BBC og IGN: æsken indeholder en <strong>engangskode</strong> til digital download. Koden dør, når den er indløst. Du kan ikke give den videre, sælge den brugt eller låne den til naboen.</p>

<p class="wp-block-paragraph">Nogle forhandlere har nægtet at tage varen ind. IGN: selskaber, der som politik <strong>ikke</strong> sælger "fysiske" spil, der kun er en downloadkode. Det er ikke nostalgi. Det er, at de ved, hvad kunden tror, de køber — og hvad der faktisk ligger i æsken.</p>

<p class="wp-block-paragraph">Take-Two-chefen har forsvaret det og sammenlignet fysiske udgivelser med vinyl. Vinyl kan du stadig spille, når pladeselskabet lukker butikken. En kode i en æske dør med kontoen, butikken og licensen.</p>

<h2 class="wp-block-heading">30 dage: hvad der skete, og hvad Sony sagde bagefter</h2>

<p class="wp-block-paragraph">I april 2026 rullede rapporter om, at <strong>nye</strong> digitale køb på PS4 og PS5 fik et 30-dages licensvindue: uden net kunne spillet låse. Spillere så nedtælling på PS4. GameSpot, Tom's Hardware og Reddit kørte historien.</p>

<p class="wp-block-paragraph">Sony svarede via GameSpot: det er <strong>ét</strong> online-tjek for at bekræfte licensen (de siger: mod refund-svindel). Derefter, ifølge selskabet, <strong>ingen</strong> løbende 30-dages check-in. Midlertidig licens bliver "permanent" efter det ene tjek.</p>

<p class="wp-block-paragraph">Det er Sonys ord. Det ændrer ikke tre ting:</p>

<ul class="wp-block-list">
<li>Du <strong>lejede</strong> først. De kunne låse spillet, indtil du bad om lov på nettet.</li>
<li>"Permanent" betyder permanent <strong>så længe kontoen, PSN og licensen lever</strong> — ikke som en disk i en skuffe.</li>
<li>De <strong>kunne</strong> rulle periodisk tjek ud. De rullede noget ud, folk reagerede, og så kom forklaringen. Tilliden er brugt.</li>
</ul>

<p class="wp-block-paragraph">Påstanden om, at du <strong>hver</strong> 30. dag skal spørge om lov resten af livet, er <strong>ikke</strong> det, Sony står ved offentligt. Det er det, systemet allerede viste, det <strong>kan</strong>.</p>

<h2 class="wp-block-heading">De kan slukke for det, du har "købt"</h2>

<p class="wp-block-paragraph">At Rockstar eller Take-Two slukker alle GTA 6-kopier, den dag 7 udkommer, er <strong>ikke</strong> bekræftet. Det er et skrækscenarie. Det er også den logiske ende, når varen er en konto-bundet licens og ikke et eksemplar.</p>

<p class="wp-block-paragraph">Digitale butikker har gjort det før: spil forsvinder fra hylden, licenser trækkes, servere lukker, musik tages ud af soundtracket. Uden disk, uden backup, uden videresalg er du afhængig af, at selskabet <strong>vil</strong> lade dig spille.</p>

<p class="wp-block-paragraph">GTA 6 som kode-i-æske er ikke et enkelt spil, der er "for stort til en disk". Det er præcedens. Hvis det største spil i verden kan sælges som pap og en stregkode, kan det næste også.</p>

<h2 class="wp-block-heading">Hvad det betyder i Danmark</h2>

<p class="wp-block-paragraph">Danske butikker sælger den samme æske. Danske børn får den i julegave. Forældre tror, de har købt et spil. De har købt adgang, så længe Sony, Microsoft og Take-Two er enige.</p>

<p class="wp-block-paragraph">EU taler højt om ret til reparation og digitale rettigheder, mens den reelle ejendomsret til det, folk betaler fuld butikspris for, smuldrer. Når varen er en licens, er forbrugerbeskyttelse et login.</p>

<h2 class="wp-block-heading">Konklusion</h2>

<p class="wp-block-paragraph">Det handler ikke om at elske plastik. Det handler om, at et køb skal <strong>være</strong> et køb. Disk, fil du selv har, noget du kan lægge væk og tage frem om ti år — uden at spørge en server.</p>

<p class="wp-block-paragraph">Rockstar har valgt koden i æsken. Sony har vist, at licensen kan tidsbegrænses, indtil de har tjekket dig. Resten — at de slår GTA 6 ihjel for at sælge 7 — er ikke dokumenteret. Det er det, licensmodellen <strong>gør muligt</strong>. Åbn øjnene for det, ikke for memet.</p>

<p class="wp-block-paragraph"><strong>Kilder:</strong>
<a href="https://x.com/IamGrokDK/status/2091088360748052677" target="_blank" rel="noopener">@IamGrokDK på X, 22. aug. 2026</a> ·
<a href="https://www.bbc.com/news/articles/c6210nj8gpro" target="_blank" rel="noopener">BBC: GTA 6 download only</a> ·
<a href="https://www.ign.com/articles/some-retailers-are-refusing-to-sell-gta-6-due-to-the-lack-of-a-disc" target="_blank" rel="noopener">IGN: forhandlere nægter kode-i-æske</a> ·
<a href="https://www.gamespot.com/articles/playstation-users-report-new-online-license-checks-for-digital-games/1100-6539651/" target="_blank" rel="noopener">GameSpot: licens-tjek</a> ·
<a href="https://www.tomshardware.com/video-games/playstation/sony-confirms-ps4-and-ps5-digital-games-dont-require-an-online-check-in-every-30-days-new-drm-policy-only-checks-once-for-license-to-combat-against-refund-scams" target="_blank" rel="noopener">Tom's Hardware: Sony siger ét tjek</a>.</p>
""",
    "featured_image": "https://mattomadsen.github.io/folketsmedie/media/featured/gta6-aeske-uden-disk.jpg",
    "featured_image_local": "/media/featured/gta6-aeske-uden-disk.jpg",
    "source": "manual",
}

data = json.loads(path.read_text(encoding="utf-8"))
arts = data["articles"]
data["articles"] = [article] + [
    a for a in arts if a.get("id") != article["id"] and a.get("slug") != article["slug"]
]
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("inserted", article["slug"])
