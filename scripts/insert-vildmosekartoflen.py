#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data" / "export.json"

article = {
    "id": 1000011,
    "title": "Staten køber vildmosekartoflen væk. Så kommer mosen igen",
    "slug": "staten-koeber-vildmosekartoflen-vaek-store-vildmose",
    "date": "2026-08-17 18:00:00",
    "excerpt": "Naturstyrelsen har allerede lagt 172 millioner for 535 hektar. I juli var der tre avlere tilbage. Staten vil have jorden. Ikke kartoflerne.",
    "content": """<p class="wp-block-paragraph">I en tid, hvor I får at vide, at Danmark skal brødføde sig grønt og klimavenligt, køber staten de sidste nordjyder ud, der dyrker en af landets bedste spisekartofler.</p>

<p class="wp-block-paragraph">Vildmosekartoflen. Tynd skræl. Glat. Den, I kender fra posen med navn på, hvis I overhovedet stadig kan få den.</p>

<figure class="wp-block-image size-large">
<img src="/folketsmedie/media/featured/vildmosekartoflen-toervejord-mose.jpg" alt="Kartoffelrækker i tørvejord, der går over i våd mose i Store Vildmose" loading="eager" />
</figure>

<p class="wp-block-paragraph">I går skrev <a href="https://x.com/AlbergCarsten" target="_blank" rel="noopener">Carsten Alberg</a> det, mange tænker, når de ser billedet af marken: Hvad fanden sker der? Peder Bæk havde skrevet, at den største producent var købt for flere hundrede millioner, at arealerne skal nedlægges og oversvømmes, og at spisekartofler så skal hentes i udlandet. Det sidste er hans påstand. Det første rammer tæt på det, staten selv har lagt frem.</p>

<h2 class="wp-block-heading">Hvad staten har købt</h2>

<p class="wp-block-paragraph">7. september 2025 meddelte Naturstyrelsen, at den havde købt en række ejendomme i Store Vildmose for <strong>172 millioner kroner</strong>. <strong>535 hektar</strong>. Seks sæt bygninger. 490 hektar kan indgå i et klima-lavbundsprojekt. 45 hektar som erstatningsjord.</p>

<p class="wp-block-paragraph">Sælgeren var Jesper Bjerregaard, Store Vildmosegaard ved Aabybro og Sulsted. Nordjyske skrev, at han stod bag omkring halvdelen af de vildmosekartofler, I kunne købe. Han blev forpagter i en periode. Kartoflerne kunne stadig komme i butikken et par år. Titlen var gået fra ejer til lejer.</p>

<p class="wp-block-paragraph">Efter handlen ejede Naturstyrelsen <strong>1.444 hektar</strong> i området. Det samlede projekt er <strong>cirka 3.100 hektar</strong> — større end halve Fanø, skriver styrelsen. Resten er stadig private hænder. Forhandlingerne skulle i gang.</p>

<figure class="wp-block-embed is-type-rich is-provider-twitter wp-block-embed-twitter"><div class="wp-block-embed__wrapper">
<blockquote class="twitter-tweet" data-width="550" data-dnt="true"><p lang="da" dir="ltr">Hvad fanden sker der??? Er I med på den??? Danmarks største og dygtigste producent af særlig velsmagende vildmose kartofler er netop opkøbt for flere hundreder millioner af Staten…</p>&mdash; Carsten Alberg (@AlbergCarsten) <a href="https://twitter.com/AlbergCarsten/status/2088975897462222969">August 16, 2026</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div></figure>

<h2 class="wp-block-heading">Tre tilbage. Så ingen</h2>

<p class="wp-block-paragraph">I juli 2026 skrev både Nordjyske og LandbrugsAvisen det samme: Kun <strong>tre</strong> kartoffelavlere var tilbage i Store Vildmose. Én havde solgt. En anden var lige om lidt på vej. Den tredje forhandlede om at sælge hele butikken.</p>

<p class="wp-block-paragraph">Tørvejorden udleder CO₂, når den pløjes, siger de. Derfor skal kartoflerne væk. Ikke fordi de smager dårligt. Fordi tørven tæller i klimaregnskabet.</p>

<p class="wp-block-paragraph">Minister for Grøn Trepart, Jeppe Bruus, kaldte opkøbet et stærkt eksempel på fremdrift. Naturstyrelsen skal tage <strong>56.850 hektar</strong> lavbund ud frem mod 2030. I Vildmosen er målet at tage jorden ud af drift og lade vandet vende tilbage. Styrelsen lover omkring <strong>70.000 ton CO₂</strong> mindre om året, hvis det hele går igennem — klimaaftrykket fra flere end 10.000 danskere. Handlerne er frivillige og på markedsvilkår, skriver de.</p>

<p class="wp-block-paragraph">Frivilligt, når staten er den eneste køber med treparts-penge i lommen, er et pænt ord.</p>

<h2 class="wp-block-heading">Hvad der sker med maden</h2>

<p class="wp-block-paragraph">Store Vildmose blev drænet i første halvdel af 1900-tallet, så der kunne gro kartofler i tørven. Det blev en nordjysk specialitet. Nu skal uret drejes tilbage, fordi et regneark i treparten siger, at våd mose slår dyrket jord.</p>

<p class="wp-block-paragraph">Peder Bæk skriver, at spisekartofler så skal importeres fra Mallorca, Marokko, Polen og Asien. Det har jeg ikke set staten love sort på hvidt. Jeg har set staten love, at produktionen på de her marker stopper. Tomrummet i disken fylder nogen. Det bliver næppe en ny vildmoseavler.</p>

<p class="wp-block-paragraph">I får CO₂-tal. I mister en kartoffel, der voksede her. Importen kommer af sig selv, når I stadig vil have kartofler til aftensmaden.</p>

<h2 class="wp-block-heading">Hvad det betyder herhjemme</h2>

<p class="wp-block-paragraph">Det her er ikke et tørt EU-direktiv på et kontor i Bruxelles. Det er Jammerbugt og Aalborg-kanten. Det er en kartoffel med navn, som generationer har solgt. Det er Grøn Trepart i marken: I betaler to gange. Først de 172 millioner. Bagefter den pose, der kommer langvejs fra, mens I får at vide, at I redder klimaet ved at slukke for jeres egen jord.</p>

<p class="wp-block-paragraph">Lavbundsprojekter kan sænke udledning fra tørv. Det benægter jeg ikke. Det, I sjældent hører i samme sætning, er prisen i mad, i fag og i et landskab, der blev dyrket med vilje.</p>

<h2 class="wp-block-heading">Konklusion</h2>

<p class="wp-block-paragraph">Læs Naturstyrelsens egen meddelelse. Læs Nordjyske om Bjerregaard. Læs, at der i juli kun var tre tilbage. Se så opslaget fra Alberg, og spørg, om I synes, det er en sejr, at vildmosekartoflen skal dø, så et tal kan blive grønt.</p>

<p class="wp-block-paragraph">Staten køber ikke kartofler. Staten køber retten til at stoppe dem.</p>

<p class="wp-block-paragraph"><strong>Kilder:</strong>
<a href="https://x.com/AlbergCarsten/status/2088975897462222969" target="_blank" rel="noopener">@AlbergCarsten på X</a> ·
<a href="https://naturstyrelsen.dk/nyheder/2025/september/nyt-opkoeb-skal-bane-vejen-for-milepaelsprojekt-i-groen-trepart" target="_blank" rel="noopener">Naturstyrelsen, 7. sept. 2025</a> ·
<a href="https://nordjyske.dk/nyheder/aalborg/staar-bag-halvdelen-af-alle-vildmose-kartoflerne-nu-er-det-hele-solgt-i-kaempe-handel/5723475" target="_blank" rel="noopener">Nordjyske: Bjerregaard / 172 mio.</a> ·
<a href="https://nordjyske.dk/nyheder/nordjylland/snart-er-vildmosekartoflen-fortid-staten-er-ved-at-koebe-de-sidste-avlere-ud/6096067" target="_blank" rel="noopener">Nordjyske: de sidste avlere, juli 2026</a> ·
<a href="https://landbrugsavisen.dk/vildmosekartoflen-er-snart-fortid-staten-er-ved-at-koebe-de-sidste-avlere-ud-311234" target="_blank" rel="noopener">LandbrugsAvisen, 7. juli 2026</a>.</p>
""",
    "featured_image": "https://mattomadsen.github.io/folketsmedie/media/featured/vildmosekartoflen-toervejord-mose.jpg",
    "featured_image_local": "/media/featured/vildmosekartoflen-toervejord-mose.jpg",
    "source": "manual",
}

data = json.loads(path.read_text(encoding="utf-8"))
arts = data["articles"]
data["articles"] = [article] + [
    a for a in arts if a.get("id") != article["id"] and a.get("slug") != article["slug"]
]
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("inserted", article["slug"])
