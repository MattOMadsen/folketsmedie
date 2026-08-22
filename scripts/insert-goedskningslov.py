#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data" / "export.json"

article = {
    "id": 1000021,
    "title": "De skal så nu. Reglerne kommer til efteråret. Så kan de pløje det op igen",
    "slug": "landmaend-stormoede-goedskningslov-sproejteforbud-odense",
    "date": "2026-08-22 14:00:00",
    "excerpt": "Landbrug & Fødevarer kalder landmænd til Odense 31. august. Gødskningsloven ventes vedtaget i september — uden de færdige regler. Ministeren har afvist at undtage grøntsager.",
    "content": """<p class="wp-block-paragraph">I en tid, hvor magten kalder det grønt at tage jord ud af drift, skal danske landmænd så næste års afgrøder uden at kende næste års regler.</p>

<p class="wp-block-paragraph">Landbrug &amp; Fødevarer kalder til stormøde i Odense den 31. august. Formand Søren Søndergaard skriver til baglandet, at regeringen kører videre med gødskningsloven og med forhandlingerne om et nationalt sprøjteforbud — "på trods af vores mange advarsler". Han skriver, at det ser enormt svært ud, og at de alligevel bliver nødt til at kæmpe videre.</p>

<p class="wp-block-paragraph">Det er ikke et møde om vejr og priser. Det er et møde om, om der overhovedet er en fornuftig produktion tilbage, når loven er færdig.</p>

<figure class="wp-block-image size-large">
<img src="/folketsmedie/media/featured/danmark-efteraar-saa-mark-goedskning.jpg" alt="Dansk efterårsmark med såspor i mørk jord under grå himmel" loading="eager" />
</figure>

<h2 class="wp-block-heading">Så først. Kend loven bagefter</h2>

<p class="wp-block-paragraph">Gødskningsloven hedder officielt <em>Lov om bæredygtig forvaltning af næringsstoffer og drivhusgasser m.v. i land- og skovbruget</em>. Minister for natur og dyrevelfærd Christian Rabjerg Madsen (S) fremsatte den 25. juni 2026. Folketinget har førstebehandlet den i august.</p>

<p class="wp-block-paragraph">Loven ventes vedtaget i september. De konkrete regler, landmanden skal overholde på marken, bliver først færdige i løbet af efteråret. Loven skal træde i kraft ved årsskiftet. Den nye kvælstofmodel tager over 1. januar 2027.</p>

<p class="wp-block-paragraph">Ritzau skriver det, landmændene frygter: de nye regler ventes vedtaget med tilbagevirkende kraft. Det betyder, at de til næste år kan blive tvunget til at pløje afgrøder op, som de har pligt til at så her i efteråret.</p>

<p class="wp-block-paragraph">Økologisk Landsforenings egne rådgivere har skrevet det samme: plantedække og efterafgrøder, der lægges i 2026, får betydning for den nye udledningskvote. De endelige vilkår ventes først i september.</p>

<p class="wp-block-paragraph">Så staten siger: så nu. Vi fortæller jer bagefter, om det må stå.</p>

<h2 class="wp-block-heading">Ingen landbrugsminister. Ingen undtagelse til gulerødderne</h2>

<p class="wp-block-paragraph">Danmark har ikke længere et landbrugsministerium. Efter valget og den nye koalition hedder posten minister for natur og dyrevelfærd. Landbruget ligger under den kasket.</p>

<p class="wp-block-paragraph">Flere avlere af grøntsager siger, at den kommende regulering kan gøre det svært at fortsætte produktionen. Christian Rabjerg Madsen har over for AgriWatch afvist at undtage grøntsagsproduktionen.</p>

<p class="wp-block-paragraph">Samme uge flyttede Folketinget en milliard kroner fra EU-hektarstøtte over i en grøn reserve til arealudtagning. Ministeren kaldte det "grøn handling" i stedet for penge for at dyrke jorden.</p>

<p class="wp-block-paragraph">Sprøjteforbuddet er det andet spor. Miljøministeriet åbnede forhandlingerne 18. juni. Regeringsgrundlaget lover forbud på sårbare grundvandsdannende områder — også slam og forurenet jord. Kortlægningen af arealerne er ikke færdig før 2027. Alligevel skal lovgivningen ifølge regeringen frem i år.</p>

<p class="wp-block-paragraph">Det er den samme linje som i vildmosen: først tages kartoflerne. Så kommer mosen. Nu tages kvælstoffet og sprøjten. Så kommer "naturen" — og importen.</p>

<h2 class="wp-block-heading">Det er det samme som i England. Bare med dansk stempel</h2>

<p class="wp-block-paragraph">I Store Vildmose køber staten kartoffelavlerne ud, så tørven kan blive våd igen. Bjerregaard: 535 hektar, 172 millioner. I juli var der tre avlere tilbage.</p>

<p class="wp-block-paragraph">I England har staten selv talt 340.000 hektar ud af drift under SFI. Ministeriet har indrømmet, at pengene blev for gode til at så korn. En landmand fik 2.500 pund for tre år uden at levere mad — på hans lille slat. På en rigtig mark er taksten pr. hektar. Læs: <a href="/folketsmedie/artikel/england-bedre-betalt-for-tom-mark-end-for-broed-sfi/">I England kan det bedre betale sig at lade marken stå</a>.</p>

<p class="wp-block-paragraph">Danmark gør det med kvælstofkvote, sprøjteforbud og EU-støtte, der flyttes fra hektar til udtagning. Aftalen bag loven siger det rent ud: hvis regulering og udtagning ikke slår til i et opland, skal politikerne inden udgangen af 2026 beslutte mere regulering <em>og</em> statsligt opkøb.</p>

<p class="wp-block-paragraph">De kalder det bæredygtig forvaltning. På marken hedder det: I må ikke vide, om kornet må stå, før I har sået det.</p>

<h2 class="wp-block-heading">Konklusion</h2>

<p class="wp-block-paragraph">Hør Søren Søndergaard: regeringen kører videre. Læs Ritzau: pløj op næste år, hvis reglerne rammer det, I har sået. Læs ministerens afvisning: grøntsager får ingen undtagelse. Læs så <a href="/folketsmedie/artikel/staten-koeber-vildmosekartoflen-vaek-store-vildmose/">vildmose-artiklen</a>, og husk England.</p>

<p class="wp-block-paragraph">31. august er de i Odense. Derefter er det september, og så er loven vedtaget. Detaljerne kommer, når frøene er i jorden.</p>

<p class="wp-block-paragraph"><strong>Kilder:</strong>
<a href="https://politiken.dk/danmark/art10952813/Landbruget-indkalder-landm%C3%A6nd-til-storm%C3%B8de-om-g%C3%B8dskningslov" target="_blank" rel="noopener">Politiken / Ritzau 19. aug. 2026</a> ·
<a href="https://www.berlingske.dk/business/landbruget-indkalder-landmaend-til-stormoede-om-goedskningslov" target="_blank" rel="noopener">Berlingske</a> ·
<a href="https://x.com/politiken/status/2090197965981749415" target="_blank" rel="noopener">@politiken på X</a> ·
<a href="https://retsinformation.dk/eli/ft/202522L00005" target="_blank" rel="noopener">lovforslag L 5, fremsat 25. juni 2026</a> ·
<a href="https://mim.dk/nyheder/pressemeddelelser/2026/juni/nu-gaar-forhandlingerne-om-et-nationalt-sproejteforbud-i-gang" target="_blank" rel="noopener">Miljøministeriet 18. juni 2026</a>.</p>
""",
    "featured_image": "https://mattomadsen.github.io/folketsmedie/media/featured/danmark-efteraar-saa-mark-goedskning.jpg",
    "featured_image_local": "/media/featured/danmark-efteraar-saa-mark-goedskning.jpg",
    "source": "manual",
}

data = json.loads(path.read_text(encoding="utf-8"))
arts = data["articles"]
data["articles"] = [article] + [
    a for a in arts if a.get("id") != article["id"] and a.get("slug") != article["slug"]
]
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("inserted", article["slug"])
