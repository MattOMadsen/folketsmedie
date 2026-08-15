#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data" / "export.json"

article = {
    "id": 1000008,
    "title": "CO2 er 0,043 procent af luften. Alligevel skal det styre hele landet",
    "slug": "co2-er-et-sporstof-vanddamp-havet-og-net-nul",
    "date": "2026-08-15 18:00:00",
    "excerpt": "Kuldioxid er et sporstof. Vanddamp og havet bærer det meste af klimaet. Alligevel bygger EU og DR politik på, at ét molekyle skal styre industri, landbrug og jeres varme.",
    "content": """<p class="wp-block-paragraph">I en tid, hvor Bruxelles og DR gør et sporstof til hele sandheden, er det værd at slå op, hvor meget der faktisk er i luften.</p>

<p class="wp-block-paragraph">Peter Clack skrev det 14. august på X. Det er ikke en lækage fra et ministerium. Det er fysik, I sjældent får i den rækkefølge.</p>

<p class="wp-block-paragraph">Kuldioxid ligger på cirka <strong>429 milliontedele</strong> af atmosfæren. Det er NOAA’s måling på Mauna Loa i juli 2026. Det svarer til <strong>0,043 procent</strong>. Clack skrev 426. Vi bruger det tal, der står hos NOAA.</p>

<figure class="wp-block-image size-large">
<img src="/folketsmedie/media/featured/co2-hav-skyer.jpg" alt="Hav og skyer — det meste af varmen sidder her, ikke i et sporstof" loading="eager" />
</figure>

<h2 class="wp-block-heading">Hvad betyder ppm?</h2>

<p class="wp-block-paragraph"><strong>ppm</strong> er engelsk for <em>parts per million</em>: milliontedele. Tag en million luftmolekyler. Så er 429 af dem kuldioxid. Resten er næsten kun kvælstof og ilt.</p>

<p class="wp-block-paragraph">En procent er 10.000 ppm. Vanddamp på én til to procent er altså 10.000 til 20.000 ppm — i størrelsesorden <strong>tyve til halvtreds gange</strong> mere end CO2. Fire molekyler CO2 ud af ti tusind luftmolekyler. Det er det, I skal betale for, som om det var hele maskinen.</p>

<h2 class="wp-block-heading">Vanddampen fylder. CO2 er et sporstof</h2>

<p class="wp-block-paragraph">CO2 sluger visse bølgelængder af den varme, Jorden sender ud. Det gør vanddamp også — og der er langt mere af den. I fugtige troper kan vanddamp udgøre op til omkring fire procent af luften. Globalt ligger den typisk på en til to procent.</p>

<p class="wp-block-paragraph">Derfor er vanddamp den største naturlige drivhusgas. Skyer dækker det meste af kloden det meste af tiden. Det står i de samme bøger, som politikerne ellers sværger til. Det, de ikke siger, er: I skal alligevel betale, som om det lille sporstof er hele historien.</p>

<p class="wp-block-paragraph">Svaret fra FN’s klimapanel er, at vanddamp følger med, når det bliver varmere, og at CO2 er knappen. Det er deres model. Det er ikke det samme som, at 0,043 procent retfærdiggør at lukke landbrug, stål og billig strøm.</p>

<h2 class="wp-block-heading">Mennesket er en lille slange på et stort kredsløb</h2>

<p class="wp-block-paragraph">Robin Monotti peger på et andet tal, I næsten aldrig hører: Den naturlige udveksling af CO2 mellem luft, planter og hav er <strong>mange gange større</strong> end det, mennesker puster ud på et år. Tom Nelson citerer den samme pointe: de naturlige udledninger hvert år er i størrelsesorden <strong>tyve gange</strong> de menneskeskabte. IPCC’s eget kulstofkredsløb viser det samme mønster. Mennesket er en lille slange på et stort kredsløb — typisk nogle få procent af den årlige trafik.</p>

<p class="wp-block-paragraph">Monotti regner videre: Hvis vanddamp og skyer står for omkring 80 procent af drivhuseffekten, og CO2 for omkring 20, og menneskets andel af det årlige CO2-kredsløb er omkring 5 procent, så lander menneskets bid i hans regnestykke på omkring <strong>én procent</strong> af den samlede drivhuseffekt. Det er hans gangestykke. Det er ikke NOAA’s officielle tabel. Hold de to ting adskilt.</p>

<p class="wp-block-paragraph">Det, I skal holde fast i, er forskellen på <em>trafik</em> og <em>beholdning</em>. Hvert år går hundredvis af milliarder ton kulstof frem og tilbage. Det meste går ind igen i planter og hav. Det, der er steget siden 1750 — fra cirka 280 ppm til 429 — er den lille rest, der bliver hængende, når slangen er større den ene vej. IPCC siger, at den rest kommer fra os. Kritikere siger, at naturen stadig sluger omkring halvdelen af det, vi sender op. Begge dele kan være sande på samme tid. Ingen af dem gør 0,043 procent til hele politikken.</p>

<p class="wp-block-paragraph">NASA har desuden målt, at mere CO2 gør planeten <strong>grønnere</strong>. Flere blade. Mere vækst. Det er planteføde. Ikke bare et affaldsprodukt fra en skorsten.</p>

<figure class="wp-block-embed is-type-rich is-provider-twitter wp-block-embed-twitter"><div class="wp-block-embed__wrapper">
<blockquote class="twitter-tweet" data-width="550" data-dnt="true"><p lang="en" dir="ltr">Consider the physics of planetary scale: Carbon dioxide makes up just 0.042% of our atmosphere.</p>&mdash; Peter Clack (@PeterDClack) <a href="https://twitter.com/PeterDClack/status/2088397591583264808">August 14, 2026</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div></figure>

<figure class="wp-block-embed is-type-rich is-provider-twitter wp-block-embed-twitter"><div class="wp-block-embed__wrapper">
<blockquote class="twitter-tweet" data-width="550" data-dnt="true"><p lang="en" dir="ltr">Not only man made CO2 is only 5% of yearly CO2, but total CO2 in the atmosphere, including 95% natural, is ONLY 20% of the greenhouse gas effect, as 80% is water vapour!</p>&mdash; Robin Monotti (@robinmonotti) <a href="https://twitter.com/robinmonotti/status/2088226153265848662">August 14, 2026</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div></figure>

<h2 class="wp-block-heading">Livet spiser CO2. Havet holder varmen</h2>

<p class="wp-block-paragraph">Uden CO2 ingen fotosyntese. Planter laver sukker og ilt. I havet står mikroskopisk planteplankton for en stor del af klodens fotosyntese — ofte sat til mindst halvdelen. Koraller og skaldyr bygger med opløst kulstof.</p>

<figure class="wp-block-image size-large">
<img src="/folketsmedie/media/featured/co2-planter-sol.jpg" alt="Sol på grønne blade — planter lever af CO2" loading="lazy" />
</figure>

<p class="wp-block-paragraph">Havet dækker omkring 71 procent af Jordens overflade. Vand er hundredvis af gange tættere end luft. De øverste par meter hav rummer omtrent samme varmemængde som <strong>hele atmosfæren</strong>. Langt det meste af klimasystemets varme sidder i havet — FN’s eget klimapanel har talt om over 90 procent. Havstrømme flytter varme fra troperne mod polerne. Ét kredsløb tager århundreder.</p>

<p class="wp-block-paragraph">Jorden er ikke et regneark med én celle, der hedder ppm.</p>

<h2 class="wp-block-heading">Hvad det betyder herhjemme</h2>

<p class="wp-block-paragraph">I Danmark er CO2 blevet moral. Afgift på landbruget. Vindmøller, der kræver reserve, når det ikke blæser. Skræmmekampagner til børn. Over 1.600 forskere har skrevet under på, at der ikke er nogen klimakrise, og at net-nul er skadelig politik. Patrick Moore, tidligere i Greenpeace, har sagt det ligeud: I lægger kulstof tilbage, hvor det kom fra.</p>

<p class="wp-block-paragraph">Læs også: <a href="/folketsmedie/artikel/mere-end-1-600-forskere-herunder-to-nobelprismodtagere-erklaerer-klimaets-noedsituation-for-en-myte/">1.600 forskere: klimaets nødsituation er en myte</a> · <a href="/folketsmedie/artikel/dr-patrick-moore-medstifter-af-greenpeace-mere-co2-i-atmosfaeren-er-en-god-ting/">Patrick Moore: mere CO2 er en god ting</a>.</p>

<h2 class="wp-block-heading">Konklusion</h2>

<p class="wp-block-paragraph">Læs Clack. Læs Monotti. Slå NOAA’s kurve op. Spørg så, hvorfor et sporstof på 0,043 procent — og en lille slange på et kæmpe kredsløb — skal styre jeres varme, jeres mad og jeres industri.</p>

<p class="wp-block-paragraph"><strong>Kilder:</strong>
<a href="https://x.com/PeterDClack/status/2088397591583264808" target="_blank" rel="noopener">@PeterDClack på X</a> ·
<a href="https://x.com/robinmonotti/status/2088226153265848662" target="_blank" rel="noopener">@robinmonotti</a> ·
<a href="https://x.com/TomANelson/status/2087856703173747121" target="_blank" rel="noopener">@TomANelson</a> ·
<a href="https://gml.noaa.gov/ccgg/trends/" target="_blank" rel="noopener">NOAA Mauna Loa, juli 2026: 429,12 ppm</a> ·
<a href="https://www.co2.earth/daily-co2" target="_blank" rel="noopener">Dagligt CO2, 12. august 2026</a>.</p>
""",
    "featured_image": "https://mattomadsen.github.io/folketsmedie/media/featured/co2-hav-skyer.jpg",
    "featured_image_local": "/media/featured/co2-hav-skyer.jpg",
    "source": "manual",
}

data = json.loads(path.read_text(encoding="utf-8"))
arts = data["articles"]
data["articles"] = [article] + [a for a in arts if a.get("id") != article["id"] and a.get("slug") != article["slug"]]
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("inserted", article["slug"])
