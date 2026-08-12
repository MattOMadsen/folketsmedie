#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EXPORT = ROOT / "data" / "export.json"

CONTENT = r"""<p class="wp-block-paragraph">To rum. To sandheder.</p>

<p class="wp-block-paragraph">I det ene rum — pressemøder, TV, Sundhedsstyrelsen — fik gravide at vide, at stikket var sikkert. I USA sagde den daværende CDC-direktør <strong>Rochelle Walensky</strong>, at det var «absolutely safe», og at der «ikke findes et dårligt tidspunkt»: hverken når man tænker på at få barn, eller når man allerede er gravid.</p>

<p class="wp-block-paragraph">I det andet rum — en SMS-tråd den 25.–26. januar 2021 — skrev <strong>Anthony Fauci</strong> til netop Walensky og den senere Surgeon General <strong>Vivek Murthy</strong>, at andet stik ofte giver kraftig cytokinstorm og feber, og at det <em>«theoretically could be associated with miscarriage in the 1st trimester»</em>. Walensky svarede: <em>«Definitely a good point, esp after dose two.»</em></p>

<p class="wp-block-paragraph">Det er ikke en «konspirationsteoretiker» på et forum. Det er deres egne beskeder, hentet fra Faucis tjenestetelefon.</p>

<figure class="wp-block-image size-large">
<img src="/folketsmedie/media/featured/fauci-sms-tjenestetelefon.jpg" alt="Tjenestetelefon og mapper på et skrivebord — den samtale, der skulle blive intern" loading="eager" />
<figcaption>Den samtale, der skulle blive intern, ligger nu sort på hvidt.</figcaption>
</figure>

<h2 class="wp-block-heading">SMS’en, I aldrig skulle have set</h2>

<p class="wp-block-paragraph">Den 10. august 2026 lagde senatorerne <a href="https://x.com/SenRonJohnson" target="_blank" rel="noopener">Ron Johnson</a> og <a href="https://x.com/RandPaul" target="_blank" rel="noopener">Rand Paul</a> den første bunke beskeder frem. Over 34.000 SMS’er og hundredvis af voicemails er gendannet fra Faucis officielle iPhone. HHS udleverede materialet 5. august.</p>

<p class="wp-block-paragraph"><a href="https://x.com/Surgeon_General" target="_blank" rel="noopener">Murthy</a> spørger, om der er data — eller bare en teoretisk grund — til at vaccinere tidligt eller sent i graviditeten.</p>

<p class="wp-block-paragraph">Fauci svarer først, at han ikke kender nogen grund til at foretrække det ene frem for det andet. Så kommer sætningen, som de aldrig sagde højt: mange får kraftig reaktion efter <em>andet</em> stik, og det <em>kan teoretisk</em> hænge sammen med abort i første trimester.</p>

<p class="wp-block-paragraph">Walensky er enig. I beskeden. Ikke i mikrofonen.</p>

<p class="wp-block-paragraph">Derefter går hun ud og siger det stik modsatte til kvinder, der skal træffe en beslutning for to liv.</p>

<p class="wp-block-paragraph">Det er ikke «vi vidste ikke nok». Det er: vi talte om risikoen internt — og solgte sikkerhed eksternt.</p>

<div class="video-embed"><iframe src="https://www.youtube-nocookie.com/embed/z1qgoYUt0Yg" allowfullscreen allow="autoplay; encrypted-media; picture-in-picture; fullscreen" loading="lazy" title="Ron Johnson om Faucis SMS’er og gravide" referrerpolicy="origin"></iframe></div>
<p class="wp-block-paragraph"><em>Kort klip: senator Ron Johnson gennemgår beskederne fra Faucis tjenestetelefon.</em></p>

<h2 class="wp-block-heading">«Han vidste bedre end dig, hvad der var rigtigt for dig»</h2>

<p class="wp-block-paragraph"><a href="https://x.com/DrRedfieldCDC" target="_blank" rel="noopener">Robert Redfield</a>, tidligere CDC-direktør, har i interviews sagt det uden omsvøb: Der var en bevidst linje, også hos Fauci, om ikke at slå noget op, der kunne få folk til at tøve. Fauci mente, ifølge Redfield, at han vidste bedre, hvad der var rigtigt for dig, end du selv gjorde.</p>

<p class="wp-block-paragraph">På Fox News siger Ainsley Earhardt, at mødre, der mistede ufødte børn, kommer til at slæbe «eksperterne» i retten. <a href="https://x.com/MeghanMcCain/status/2086899028956954825" target="_blank" rel="noopener">Meghan McCain</a> — næppe Folkets Medies naturlige allierede — skriver med store bogstaver: <em>PUT FAUCI IN JAIL</em>, og tilføjer, at hun selv var gravid og fik abort under covid.</p>

<figure class="wp-block-embed is-type-rich is-provider-twitter wp-block-embed-twitter"><div class="wp-block-embed__wrapper">
<blockquote class="twitter-tweet" data-width="550" data-dnt="true"><p lang="en" dir="ltr">PUT FAUCI IN JAIL!!!! (I am a woman who was pregnant and had a miscarriage during Covid)</p>&mdash; Meghan McCain (@MeghanMcCain) <a href="https://twitter.com/MeghanMcCain/status/2086899028956954825">August 10, 2026</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div></figure>

<p class="wp-block-paragraph"><a href="https://x.com/VigilantFox/status/2087253163719942246" target="_blank" rel="noopener">The Vigilant Fox</a> har samlet klippene: Walenskys «no bad time», Redfields forklaring, og den SMS, der nu ligger offentligt.</p>

<figure class="wp-block-embed is-type-rich is-provider-twitter wp-block-embed-twitter"><div class="wp-block-embed__wrapper">
<blockquote class="twitter-tweet" data-width="550" data-dnt="true"><p lang="en" dir="ltr">An outraged Ainsley Earhardt says the RAGE of mothers who lost unborn babies to the COVID shot is going to unleash HELL on “the experts” who told us it was safe.</p>&mdash; The Vigilant Fox (@VigilantFox) <a href="https://twitter.com/VigilantFox/status/2087253163719942246">August 11, 2026</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div></figure>

<p class="wp-block-paragraph">Sådan ser det ud, når sløret ryger: Selv folk, der troede på programmet, opdager, at de ikke fik det, Fauci skrev til kollegerne.</p>

<p class="wp-block-paragraph">Mainstream gør, hvad de plejer. NBC kalder historien for «falske påstande» om abort. Læg mærke til tricket: De diskuterer ikke, om SMS’en er ægte. De diskuterer, om I må bruge den.</p>

<p class="wp-block-paragraph">Papiret er der. Citatet er der. Det, der mangler, er den offentlige advarsel.</p>

<figure class="wp-block-image size-large">
<img src="/folketsmedie/media/featured/fauci-sms-hoeringssal.jpg" alt="Tom høringssal med mikrofon — papirerne kom frem via senatet" loading="lazy" />
</figure>

<h2 class="wp-block-heading">Mens de skrev «teoretisk abort», stak Danmark gravide</h2>

<p class="wp-block-paragraph">I Danmark anbefalede Sundhedsstyrelsen fra 21. juli 2021 vaccination af <strong>alle gravide, uanset trimester</strong> — og så tidligt som muligt, «for at den gravide og fosteret sikres bedst beskyttelse». I april 2022 oplyste de, at <strong>41.732 gravide</strong> allerede var vaccineret under graviditeten.</p>

<p class="wp-block-paragraph">Det var efter Faucis SMS. Det var efter Walensky havde nikkende i tråden.</p>

<p class="wp-block-paragraph">Ingen danske gravide fik at vide, at manden bag «videnskaben» selv havde skrevet ordet <em>miscarriage</em> i en intern besked om andet stik. De fik at vide, at det var trygt, og at tidligt var bedst.</p>

<p class="wp-block-paragraph">I dag anbefaler SST ikke længere raske gravide covid-stikket — fordi sygdommen er blevet mildere, siger de. Ikke fordi de står frem og siger: Vi burde have lagt den interne tvivl på bordet, før nålen ramte armen.</p>

<p class="wp-block-paragraph">Det er forskellen på informeret samtykke og et program.</p>

<p class="wp-block-paragraph">Læs også vores tidligere artikel: <a href="/folketsmedie/artikel/fauci-loej-for-amerika-dagbog-sms-er-og-5-amendment-afsloerer-manden-bag-videnskaben/">Fauci løj for Amerika: dagbog, SMS’er og 5. amendment</a>.</p>

<h2 class="wp-block-heading">Konklusion</h2>

<p class="wp-block-paragraph">Enten var risikoen reel nok til at skrive om den til CDC-chefen. Så skulle mødrene have hørt det.</p>

<p class="wp-block-paragraph">Eller også var det bare «teori». Så skulle de ikke have solgt det som absolut sikkert.</p>

<p class="wp-block-paragraph">De valgte en tredje vej: Hviske i SMS. Råbe i TV.</p>

<p class="wp-block-paragraph">Læs beskederne selv. Del dem. Kræv, at danske myndigheder forklarer, hvad de vidste i 2021, og hvad de bevidst undlod at sige til gravide.</p>

<p class="wp-block-paragraph"><strong>Kilder:</strong>
<a href="https://www.ronjohnson.senate.gov/2026/08/10/senators-johnson-paul-release-initial-texts-from-dr-faucis-government-iphone-2/" target="_blank" rel="noopener">Ron Johnson og Rand Paul, 10. august 2026</a>
(inkl. <a href="https://www.ronjohnson.senate.gov/wp-content/uploads/2026/08/text-message-Fauci-redacted_Redacted.pdf" target="_blank" rel="noopener">SMS-udskrift som PDF</a>) ·
<a href="https://www.washingtonpost.com/politics/2026/08/10/gop-lawmakers-release-fauci-texts-discussing-covid-vaccine-pregnancy/" target="_blank" rel="noopener">Washington Post</a> ·
<a href="https://www.cnn.com/2026/08/11/politics/fauci-text-messages-released-covid-vaccine-pregnancy-hnk" target="_blank" rel="noopener">CNN</a> ·
<a href="https://x.com/VigilantFox/status/2087253163719942246" target="_blank" rel="noopener">@VigilantFox</a> ·
<a href="https://x.com/MeghanMcCain/status/2086899028956954825" target="_blank" rel="noopener">@MeghanMcCain</a> ·
<a href="https://x.com/SenRonJohnson" target="_blank" rel="noopener">@SenRonJohnson</a> ·
<a href="https://x.com/RandPaul" target="_blank" rel="noopener">@RandPaul</a> ·
<a href="https://www.sst.dk/media/qr5dmsup/notat-opdatering-vedr_-covid-19-vaccination-af-gravide.pdf" target="_blank" rel="noopener">Sundhedsstyrelsen, april 2022</a> (41.732 vaccinerede gravide; anbefaling fra juli 2021).</p>
"""

article = {
    "id": 1000002,
    "title": "De sagde «helt sikkert» til gravide. I SMS’en skrev Fauci «abort i første trimester»",
    "slug": "fauci-sms-gravide-abort-foerste-trimester-walensky-helt-sikkert",
    "date": "2026-08-13 07:00:00",
    "excerpt": "I januar 2021 skrev Fauci til CDC-chefen, at andet stik teoretisk kunne hænge sammen med abort. Offentligt lød det: der findes ikke et dårligt tidspunkt at vaccinere en gravid.",
    "content": CONTENT,
    "featured_image": "https://mattomadsen.github.io/folketsmedie/media/featured/fauci-sms-gravide-hospital.jpg",
    "featured_image_local": "/media/featured/fauci-sms-gravide-hospital.jpg",
    "source": "manual",
}

data = json.loads(EXPORT.read_text(encoding="utf-8"))
if any(a.get("id") == 1000002 or a.get("slug") == article["slug"] for a in data["articles"]):
    data["articles"] = [a for a in data["articles"] if a.get("id") != 1000002 and a.get("slug") != article["slug"]]
data["articles"].insert(0, article)
EXPORT.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("inserted", article["slug"])
