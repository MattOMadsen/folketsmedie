#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data" / "export.json"

article = {
    "id": 1000023,
    "title": "De lovede grøn strøm til alle. Nu er der kø, og ministeren bestemmer rækkefølgen",
    "slug": "elnet-akutplan-datacentre-bagerst-nawa",
    "date": "2026-08-23 08:00:00",
    "excerpt": "Lovforslag 20. august: først til mølle på elnettet droppes. Fire køer. Store datacentre bagerst. Energinet kan afvise. Sommerens elpris er den dyreste siden 2022.",
    "content": """<p class="wp-block-paragraph">I en tid, hvor magten sælger "grøn strøm til alle", er der ikke plads på ledningen. Så rangerer Folketinget, hvem der må på.</p>

<p class="wp-block-paragraph">Torsdag den 20. august 2026 fremsatte regeringen lovforslaget om en akutplan for elnettet. 77 høringssvar er gennemgået. Først til mølle er slut. Energinet og netselskaberne skal stille projekter i fire køer. I særlige tilfælde kan de sige nej.</p>

<p class="wp-block-paragraph">Det er ikke et teknisk lillepapir. Det er indrømmelsen: nettet er presset, og politikerne tager kølappen.</p>

<figure class="wp-block-image size-large">
<img src="/folketsmedie/media/featured/danmark-elnet-hojspaending-moerke.jpg" alt="Højspændingsmaster og transformerstation under dansk aftenhimmel" loading="eager" />
</figure>

<h2 class="wp-block-heading">Fire køer. Datacentre bagerst</h2>

<p class="wp-block-paragraph">Aftalen blev indgået 29. juni. Ni partier: regeringen (S, SF, M, RV) plus Venstre, Dansk Folkeparti, Konservative, Enhedslisten og Alternativet.</p>

<p class="wp-block-paragraph">Klima-, energi- og forsyningsminister Samira Nawa (R) sagde det selv: manglen på plads risikerer at bremse den "grønne klimahandling". Almindelige husstande, sundhed, forsvar og vedvarende energi skal ikke stå bagerst, "mens meget store og ufleksible projekter optager den begrænsede kapacitet."</p>

<p class="wp-block-paragraph">De fire kategorier, ministeriet selv har skrevet op:</p>

<ol class="wp-block-list">
<li>Beskyttede behov og samfundskritiske funktioner — blandt andet almindeligt forbrug, husholdninger, mindre erhverv, forsvar og sundhed. Datacentre, der hører til det kritiske, kan lande her.</li>
<li>Direkte elektrificering, vedvarende energi, CO<sub>2</sub>-fangst, brint, Power-to-X og øvrige projekter.</li>
<li>Energilagre og det, der skal hjælpe selve systemet.</li>
<li>Visse store energiforbrugere.</li>
</ol>

<p class="wp-block-paragraph">Kategori 4 er den, alle ved betyder datacentre, der ikke er "samfundskritiske". Nawa understregede i juni, at det <em>ikke</em> er et forbud. Det er bare den nederste hylde. Dansk Erhverv har noteret, at anmodninger i kategori 3 og 4 kan afvises, hvis der ikke er kapacitet. Klagen går til Forsyningstilsynet.</p>

<p class="wp-block-paragraph">Socialdemokraternes ordfører Jesper Petersen sagde det uden omsvøb: at folk kan lade elbilen, at virksomheder kan bygge ud, og at varmen kan væk fra fossil, "må nu engang være vigtigere end at lade al vores grønne strøm gå til meget strømslugende udenlandsk ejede datacentre."</p>

<p class="wp-block-paragraph">Så hedder det ikke længere marked. Det hedder rækkefølge.</p>

<h2 class="wp-block-heading">Nettet er fuldt. Køen er længere end selve nettet</h2>

<p class="wp-block-paragraph">Ministeriet skriver, at Danmark historisk har haft elnet nok. Det har vi ikke længere. Kapaciteten er tæt på at være brugt op flere steder. Efterspørgslen vokser hurtigere, end udbygningen kan følge med.</p>

<p class="wp-block-paragraph">Danmarks Naturfredningsforening har citeret Information for, at Energinet i 2025 fik ansøgninger svarende til 33,5 GW ny kapacitet — på størrelse med det net, der <em>allerede</em> er der. Alene datacentre skulle stå for 16 GW af bunken. Det er ikke Folkets Medies tal. Det er det, der ligger i den kø, politikerne nu vil sortere.</p>

<p class="wp-block-paragraph">Børsen har tidligere skrevet, at tænketanken Concito forventer, at datacentre kan sluge mere end 20 procent af Danmarks elforbrug i 2030, hvis de får lov. Det er et skøn. Det er derfor, de nu stilles bagerst.</p>

<p class="wp-block-paragraph">Reglerne skal, hvis Folketinget vedtager dem, bruges, når Energinet til efteråret behandler de næste store tilslutninger. Loven er lagt op til at træde i kraft dagen efter bekendtgørelse i Lovtidende. Den er <em>ikke</em> gældende endnu.</p>

<h2 class="wp-block-heading">Samtidig er strømmen dyr. Selv om solen skinner</h2>

<p class="wp-block-paragraph">Andel Energi opgjorde 16. august, at sommeren 2026 er den dyreste for danske elkunder siden energikrisen i 2022. I juni, juli og august 2023–2025 kom gennemsnittet ikke over 70 øre pr. kWh (før skatter, afgifter og tariffer). I år har det ligget over det hele sommeren.</p>

<p class="wp-block-paragraph">Første syv måneder af 2026: cirka 76 øre. Samme periode 2025: 61. 2024: 47. Frem til 14. august i år lå august på 88,78 øre. August 2025: 56,21.</p>

<p class="wp-block-paragraph">Juni alene: 81,4 øre — dyreste sommermåned siden 2022. Forskellen på den billigste og den dyreste time i juni: omkring 5,10 kroner. Negative priser midt på dagen, når solen bager. Dyrt om aftenen, når alle skal bruge den.</p>

<p class="wp-block-paragraph">Andel skyder en stor del af skylden på geopolitisk uro — blandt andet Hormuzstrædet. Det er prisen time for time på elbørsen. Akutplanen handler om stikket: hvem der overhovedet må kobles på, når ledningen er fuld.</p>

<p class="wp-block-paragraph">To historier. Samme resultat for folk derhjemme: I skulle have billig, grøn strøm i overflod. I fik kø, sving og en minister, der rangerer jer.</p>

<h2 class="wp-block-heading">Hvad det betyder</h2>

<p class="wp-block-paragraph">Når staten rangerer forbrugere, er det, fordi løftet ikke holdt. Elbiler, varmepumper, brint, Power-to-X, datacentre og "elektrificering af alt" skulle køre på den samme ledning, der blev bygget til et andet Danmark.</p>

<p class="wp-block-paragraph">Nu får hospitalet og husstanden forrang — det er fornuftigt, når der <em>er</em> knaphed. Spørgsmålet, de ikke stiller i pressemeddelelsen, er, hvorfor knapheden kom, mens de stadig taler om 100 procent vedvarende energi og flere store strømslugere.</p>

<p class="wp-block-paragraph">Nawa siger selv, at akutplanen ikke løser det. Der skal "mere elnet" og en plan til 2035. Indtil da er det fire køer og retten til at sige nej.</p>

<p class="wp-block-paragraph">Læs ministeriets egen tekst. Læs Jesper Petersen. Læs Andels priser. Døm så, om "grøn strøm til alle" stadig er en beskrivelse — eller et nummer i køen.</p>

<p class="wp-block-paragraph"><strong>Kilder:</strong>
<a href="https://www.kefm.dk/aktuelt/nyheder/2026/jun/bred-politisk-opbakning-til-akutplan-for-elnettet" target="_blank" rel="noopener">KEFM 29. juni 2026</a> ·
<a href="https://www.berlingske.dk/virksomheder/nu-kommer-regeringens-akutplan-for-elnettet" target="_blank" rel="noopener">Berlingske 20. aug. 2026</a> ·
<a href="https://www.dr.dk/nyheder/indland/sommerens-elpriser-har-vaeret-de-hoejeste-i-flere-aar" target="_blank" rel="noopener">DR / Andel Energi 16. aug. 2026</a> ·
<a href="https://andelenergi.dk/om-os/nyheder-og-presse/elpriser-dyreste-sommermaaned-i-fire-aar/" target="_blank" rel="noopener">Andel Energi 30. juni 2026</a> ·
<a href="https://www.danskerhverv.dk/presse-og-nyheder/nyheder/2026/juni/akutplan-for-elnettet-nye-regler-kan-flytte-din-virksomhed-frem-eller-tilbage-i-koen-til-elnettet/" target="_blank" rel="noopener">Dansk Erhverv 29. juni 2026</a>.</p>
""",
    "featured_image": "https://mattomadsen.github.io/folketsmedie/media/featured/danmark-elnet-hojspaending-moerke.jpg",
    "featured_image_local": "/media/featured/danmark-elnet-hojspaending-moerke.jpg",
    "source": "manual",
}

data = json.loads(path.read_text(encoding="utf-8"))
arts = data["articles"]
data["articles"] = [article] + [
    a for a in arts if a.get("id") != article["id"] and a.get("slug") != article["slug"]
]
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("inserted", article["slug"])
