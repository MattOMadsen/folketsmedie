#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data" / "export.json"

article = {
    "id": 1000007,
    "title": "USA og Mexico øvede sammen ved grænsen — kartellerne er stemplet som terror",
    "slug": "usa-mexico-faelles-oevelse-graense-karteller-terror",
    "date": "2026-08-15 15:00:00",
    "excerpt": "Torsdag øvede amerikanske og mexicanske styrker sammen ved El Paso og Ciudad Juárez. Det er ikke det samme som Colombias invitation — men det er et skifte.",
    "content": """<p class="wp-block-paragraph">I en tid, hvor kokain, fentanyl og mennesker krydser Rio Grande, mens Europa holder seminar, øvede USA og Mexico <strong>torsdag den 14. august</strong> sammen ved grænsen.</p>

<p class="wp-block-paragraph">Helikoptere. Folk ned ad reb. Hurtig indsats. På den ene bred: amerikansk grænsepoliti og immigrationsmyndigheder. På den anden: mexicansk hær og nationalgarde. Det skete ved El Paso og Ciudad Juárez — der, hvor Juárez-kartellet holder til.</p>

<p class="wp-block-paragraph">Et opslag på X kalder det officielt: Mexico har aftalt at sende militær <em>sammen med</em> amerikanere ind mod kartellerne. Det er for groft. Det, der er belæg for, er en <strong>fælles øvelse</strong> — og at Washington har givet sig selv flere juridiske værktøjer.</p>

<figure class="wp-block-image size-large">
<img src="/folketsmedie/media/featured/usa-mexico-graense-oevelse.jpg" alt="Ørkenflod og hegn i skumring — grænsen, hvor øvelsen fandt sted" loading="eager" />
</figure>

<h2 class="wp-block-heading">Hvad der skete ved floden</h2>

<p class="wp-block-paragraph">Ifølge AFP og amerikanske grænse-medier var det en binational sikkerhedsøvelse, ledet fra amerikansk side af Border Patrols El Paso-sektor. Styrkerne patruljerede <strong>hver på sin side</strong> af floden. Ingen af de officielle referater dokumenterer, at amerikanske tropper er sat i land inde i Mexico for at jage karteller, som Colombia netop har bedt om.</p>

<p class="wp-block-paragraph">Øvelsen kom, efter Washington i juli stemplede <strong>Juárez-kartellet</strong> som terrororganisation — sammen med Sinaloa og Jalisco New Generation. Det er det, opslaget rammer rigtigt: terror-stemplet udvider, hvad USA kan bruge af love og samarbejde, uden at spørge om lov hos de samme diplomater, der i årevis kaldte kartellerne et »retshåndhævelsesproblem«.</p>

<figure class="wp-block-embed is-type-rich is-provider-twitter wp-block-embed-twitter"><div class="wp-block-embed__wrapper">
<blockquote class="twitter-tweet" data-width="550" data-dnt="true"><p lang="en" dir="ltr">JUST IN: Mexico has agreed to deploy its armed forces alongside U.S. personnel under President Trump to target cartels.</p>&mdash; The Patriot Oasis (@ThePatriotOasis) <a href="https://twitter.com/ThePatriotOasis/status/2088264625968001082">August 14, 2026</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div></figure>

<h2 class="wp-block-heading">Ikke Colombia. Heller ikke ingenting</h2>

<p class="wp-block-paragraph">Samme uge bad Colombias nye præsident, El Tigre, USA om fælles militære operationer på colombiansk jord. Pete Hegseth sagde i Panama, at Colombia træder ind i den amerikansk-ledede koalition mod karteller — og at <strong>Mexico ikke er med</strong>, selv om de største karteller bor der.</p>

<p class="wp-block-paragraph">Det er forskellen. Bogotá åbner døren. Mexico City øver ved hegnet. Trump har presset Mexico på både migranter og stoffer, siden han kom tilbage. Øvelsen er svaret, de vil vise frem. Det er ikke det samme som en invitation til amerikansk krig inde i landet.</p>

<p class="wp-block-paragraph">Læs også: <a href="/folketsmedie/artikel/colombia-el-tigre-trump-usa-militaer-karteller/">Colombias præsident beder Trump om militær mod kartellerne</a>.</p>

<h2 class="wp-block-heading">Hvad det betyder herhjemme</h2>

<p class="wp-block-paragraph">Pulveret og pillerne i Danmark kommer ikke fra Padborg. De kommer fra de samme ruter, som nu bliver øvet imod ved Juárez. Når danske medier kun skriver om bandeindsatser i boligblokke, og ikke om producenten og korridoren, er det halve historien.</p>

<p class="wp-block-paragraph">Pas på de virale overskrifter. En fælles øvelse er rigtig. En mexicansk blankocheck til amerikansk militær inde i landet er ikke det, AFP så torsdag.</p>

<h2 class="wp-block-heading">Konklusion</h2>

<p class="wp-block-paragraph">Læs, hvad der skete ved El Paso. Læs, hvad Hegseth sagde om forskellen: Colombia i koalitionen, Mexico udenfor. Del klippet, hvis I vil — men del også forskellen på en øvelse og en invitation.</p>

<p class="wp-block-paragraph"><strong>Kilder:</strong>
<a href="https://x.com/ThePatriotOasis/status/2088264625968001082" target="_blank" rel="noopener">@ThePatriotOasis på X</a> ·
<a href="https://www.france24.com/en/live-news/20260814-us-mexico-conduct-security-exercises-near-border" target="_blank" rel="noopener">AFP / France 24, 14. august 2026</a> ·
<a href="https://www.borderreport.com/border-report-tour/border-crime/strong-border-security-presence-at-the-u-s-mexico-border-aims-to-disrupt-cartel-operations/" target="_blank" rel="noopener">Border Report</a> ·
<a href="https://english.aawsat.com/world/5306777-hegseth-us-plans-attacks-land-against-drug-cartels-latin-america" target="_blank" rel="noopener">Hegseth om landoperationer og at Mexico ikke er i koalitionen</a> ·
<a href="/folketsmedie/artikel/colombia-el-tigre-trump-usa-militaer-karteller/">Folkets Medie: El Tigre</a>.</p>
""",
    "featured_image": "https://mattomadsen.github.io/folketsmedie/media/featured/usa-mexico-graense-oevelse.jpg",
    "featured_image_local": "/media/featured/usa-mexico-graense-oevelse.jpg",
    "source": "manual",
}

data = json.loads(path.read_text(encoding="utf-8"))
arts = data["articles"]
data["articles"] = [article] + [a for a in arts if a.get("id") != article["id"] and a.get("slug") != article["slug"]]
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("inserted", article["slug"])
