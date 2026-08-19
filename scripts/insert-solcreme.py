#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data" / "export.json"

article = {
    "id": 1000015,
    "title": "De der smurte mest, havde mest hudkræft",
    "slug": "solcreme-hudkraeft-uk-biobank-benzen-hulscher",
    "date": "2026-08-19 09:50:00",
    "excerpt": "I UK Biobank havde de, der altid brugte solcreme, markant mere melanom, basalcelle og pladecelle. Forskerne blev selv overraskede. I 27 procent af testede solcremer fandt et laboratorium benzen.",
    "content": """<p class="wp-block-paragraph">Hele sommeren får I den samme prædiken. Smør jer. Smør børnene. Smør igen. Kræftens Bekæmpelse, hudlægen, reklamen i Matas: cremen er det ansvarlige valg. Uden den er I letsindige.</p>

<p class="wp-block-paragraph">Så kom et britisk register med over 470.000 mennesker. De, der sagde, de <em>altid</em> smurte, havde ikke mindre hudkræft. De havde mere. Af det hele.</p>

<figure class="wp-block-image size-large">
<img src="/folketsmedie/media/featured/solcreme-tuber-strand.jpg" alt="Brugte solcreme-tuber i sandet på en tom strand" loading="eager" />
</figure>

<figure class="wp-block-embed is-type-rich is-provider-twitter wp-block-embed-twitter"><div class="wp-block-embed__wrapper">
<blockquote class="twitter-tweet" data-width="550" data-dnt="true"><p lang="en" dir="ltr">The LARGEST sunscreen-skin cancer study EVER conducted found sunscreen users faced FAR higher risks of EVERY major skin cancer.</p>&mdash; Nicolas Hulscher, MPH (@NicHulscher) <a href="https://twitter.com/NicHulscher/status/2088621268316602534">August 15, 2026</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div></figure>

<h2 class="wp-block-heading">Hvad papiret faktisk viser</h2>

<p class="wp-block-paragraph">Studiet ligger i <em>Cancer Epidemiology, Biomarkers &amp; Prevention</em>, november 2023. Forskerne er fra McGill i Canada. De brugte UK Biobank. <a href="https://x.com/NicHulscher/status/2088621268316602534" target="_blank" rel="noopener">Nicolas Hulscher</a> fra McCullough Foundation har trukket tallene frem igen i august 2026. De er ikke opfundet til et opslag. De står i tabellen.</p>

<p class="wp-block-paragraph">Sammenlignet med dem, der sjældent eller aldrig brugte solcreme, havde de mest flittige:</p>

<ul class="wp-block-list">
<li>invasivt melanom: <strong>3,92 gange</strong> så høj risiko — plus 292 procent</li>
<li>melanom i det øverste hudlag: <strong>3,58</strong> — plus 258 procent</li>
<li>basalcelle: <strong>2,40</strong> — plus 140 procent</li>
<li>pladecelle: <strong>2,26</strong> — plus 126 procent</li>
</ul>

<p class="wp-block-paragraph">Jo oftere de sagde, de smurte, jo stejlere kurve.</p>

<p class="wp-block-paragraph">Forskerne skrev det selv: først blev de overraskede. Hyppig brug hang stærkt sammen med <em>alle</em> de hudkræftformer, de målte.</p>

<p class="wp-block-paragraph">Det er et observationsstudie. Det beviser ikke, at tuben <em>skaber</em> kræften. Det viser, at i det største register af den slags passer “smør jer, så er I sikre” ikke på tallene.</p>

<h2 class="wp-block-heading">Så kom undskyldningen</h2>

<p class="wp-block-paragraph">Industrien og fact-tjekkerne har én forklaring: folk, der smører, ligger længere i solen. De glemmer at smøre igen. Eller de er allerede de lyshudede, der brænder nemt. På engelsk kalder de det sunscreen paradox.</p>

<p class="wp-block-paragraph">Det kan være en del af det. Forskerne skriver det selv som en mulig forklaring.</p>

<p class="wp-block-paragraph">Hulscher peger på det, fact-tjekkerne helst hopper over: forskerne havde allerede regnet på hudfarve, hårfarve, hvor nemt man bliver brun, solskoldninger som barn, solarium, tid udendørs, alder og køn. Sammenhængen blev stående.</p>

<p class="wp-block-paragraph">Hvis forklaringen bare er, at brugerne ligger for længe, hvorfor sælger I så cremen som det, der fjerner risikoen? McGill har selv kaldt det et paradoks og sagt, at creme er det dårligste værn — tøj og skygge slår den.</p>

<p class="wp-block-paragraph">I Danmark er budskabet stadig: køb en ny flaske.</p>

<h2 class="wp-block-heading">Så er der det, I smører ind</h2>

<p class="wp-block-paragraph">I 2021 testede laboratoriet Valisure <strong>294 partier</strong> solcreme og after-sun fra <strong>69 firmaer</strong>. I <strong>27 procent</strong> fandt de <strong>benzen</strong>. Nogle partier lå op til tre gange over den amerikanske grænse på 2 ppm. Benzen er ikke en urt. Det er et stof, myndighederne selv kalder kræftfremkaldende. Det kan trænge ind gennem huden.</p>

<p class="wp-block-paragraph">Det sad i spray, gel og lotion. Både kemiske og mineralske. Forskelligt fra parti til parti — også inden for samme mærke. 217 partier var rene i den første test. Resten var det ikke.</p>

<p class="wp-block-paragraph">I 2019 viste et studie i <em>JAMA</em>, at de kemiske filtre — oxybenzon, octocrylen, homosalat og flere — er i blodet efter en enkelt dag med normal brug. I årevis fik I at vide, at cremen bliver på huden.</p>

<p class="wp-block-paragraph">Den ene hånd siger, I skal smøre jer for at undgå kræft. Den anden hånd har solgt tuber med et kendt kræftstof i hver fjerde testede. Og det største register viser mere — ikke mindre — hudkræft hos dem, der smurte mest.</p>

<h2 class="wp-block-heading">Hvad det betyder herhjemme</h2>

<p class="wp-block-paragraph">Ingen dansk myndighed har, så vidt vi kan se, gentaget Valisure-testen på de mærker, der står i Kvickly. Til gengæld kører kampagnen uændret: faktor 30 på ungerne, hele kroppen, hver anden time.</p>

<p class="wp-block-paragraph">Ingen her siger, at I skal stege jer røde. En forbrænding er skidt. Solen laver også D-vitamin, og kroppen er ikke bygget til at leve i skygge med et kemikalielag. Hulschers råd er det kedelige, fornuftige: kort, fornuftig sol uden at brænde. Er I ude i timevis i juli, så tøj og skygge først — og hvis creme, så zink, ikke den cocktail, der er målt i blodet næste morgen.</p>

<h2 class="wp-block-heading">Konklusion</h2>

<p class="wp-block-paragraph">I er blevet solgt en flaske som forsikring. Registeret siger: de, der brugte den mest, havde mest af den kræft, flasken skulle holde væk. Laboratoriet siger: i mange tuber sad der benzen.</p>

<p class="wp-block-paragraph">Det er ikke anti-sol. Det er anti-reklame. Læs tallene, før I smører ungerne ind i årets tilbud.</p>

<p class="wp-block-paragraph"><strong>Kilder:</strong>
<a href="https://x.com/NicHulscher/status/2088621268316602534" target="_blank" rel="noopener">@NicHulscher på X</a> ·
<a href="https://www.thefocalpoints.com/p/study-finds-sunscreen-use-linked" target="_blank" rel="noopener">Hulscher / Focal Points</a> ·
<a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10840669/" target="_blank" rel="noopener">Jeremian, Xie, Litvinov m.fl., 2023 (PMC10840669)</a> ·
<a href="https://www.valisure.com/valisure-newsroom/valisure-detects-benzene-in-sunscreen" target="_blank" rel="noopener">Valisure, 25. maj 2021</a> ·
<a href="https://jamanetwork.com/journals/jama/fullarticle/2759002" target="_blank" rel="noopener">JAMA 2019, optag af kemiske filtre</a> ·
<a href="https://www.mcgill.ca/newsroom/channels/news/sunscreen-paradox-mcgill-university-researchers-warn-false-sense-security-352205" target="_blank" rel="noopener">McGill om paradokset</a>.</p>
""",
    "featured_image": "https://mattomadsen.github.io/folketsmedie/media/featured/solcreme-tuber-strand.jpg",
    "featured_image_local": "/media/featured/solcreme-tuber-strand.jpg",
    "source": "manual",
}

data = json.loads(path.read_text(encoding="utf-8"))
arts = data["articles"]
arts = [a for a in arts if a.get("id") != article["id"] and a.get("slug") != article["slug"]]
arts.insert(0, article)
data["articles"] = arts
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("inserted", article["slug"], "id", article["id"])
