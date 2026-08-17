#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data" / "export.json"

article = {
    "id": 1000010,
    "title": "Korstogene var et svar. Skolen glemmer de fire århundreder før 1095",
    "slug": "korstogene-svar-paa-islamisk-erobring-madden-1095",
    "date": "2026-08-17 07:00:00",
    "excerpt": "Et klip på X minder om det, danske lærebøger sjældent starter med: Første korstog kom, efter to tredjedele af den gamle kristne verden allerede var erobret. Det var et svar. Ikke et overfald ud af det blå.",
    "content": """<p class="wp-block-paragraph">I en tid, hvor skolen lærer børn, at korstogene var Europas første kolonikrig, går et kort klip viralt på X. En historiker bliver spurgt, om korstogene var en reaktion på islamisk vold. Svaret er ja: et nødvendigt svar på uafbrudt aggression. Det var det, der fremkaldte det første korstog.</p>

<p class="wp-block-paragraph">Det burde være almenviden. Det er det ikke. Derfor virker klippet.</p>

<figure class="wp-block-image size-large">
<img src="/folketsmedie/media/featured/korstogene-stenkirke-middelhav.jpg" alt="Stenkirke ved Middelhavet — den kristne verden, der blev erobret længe før 1095" loading="eager" />
</figure>

<h2 class="wp-block-heading">Hvad der skete, før Urban talte</h2>

<p class="wp-block-paragraph">Muhammed døde i 632. På under et århundrede tog arabiske hære Syrien, Palæstina, Egypten og Nordafrika. Det var ikke ørken. Det var kirkens kerne: Jerusalem, Alexandria, Kartago. I 711 gik de ind i Spanien. I 732 standsede Karl Martell dem ved Tours. Sicilien faldt i 800-tallet. I 1071 knuste seldsjukkerne Østrom ved Manzikert. Lilleasien, i århundreder kristent, begyndte at forsvinde.</p>

<p class="wp-block-paragraph">Thomas F. Madden, professor i middelalderhistorie ved Saint Louis University, har skrevet det uden pynt: Korstogene i øst var i alle væsentlige henseender forsvarskrige. Et svar på mere end fire århundreders erobringer, hvor muslimer allerede havde taget to tredjedele af den gamle kristne verden. På et tidspunkt måtte kristendommen som tro og kultur forsvare sig eller blive slugt.</p>

<p class="wp-block-paragraph">Det er ikke en blogger. Det er en af de historikere, der sidder i kilderne. Britannica, som ingen anklager for at være Folkets Medie, skriver det samme: Korstogene blev organiseret efter århundreders muslimske ekspansionskrige.</p>

<p class="wp-block-paragraph">I 1095 sendte den østromerske kejser Alexios 1. bud til paven. Han bad om hjælp. Urban 2. svarede i Clermont den 27. november 1095. Første korstog tog Jerusalem i 1099. Det var sent. Fire hundrede år sent.</p>

<figure class="wp-block-embed is-type-rich is-provider-twitter wp-block-embed-twitter"><div class="wp-block-embed__wrapper">
<blockquote class="twitter-tweet" data-width="550" data-dnt="true"><p lang="en" dir="ltr">Crusades were a reaction to Islamic violence? Historian: Yes, it was a much needed response to non-stop aggression from Muslims. That's what provoked the first Crusade. This should be common knowledge.</p>&mdash; Casey Krol (@CaseyKrol) <a href="https://twitter.com/CaseyKrol/status/2088272178706100476">August 14, 2026</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div></figure>

<h2 class="wp-block-heading">Hvad skolen stryger</h2>

<p class="wp-block-paragraph">Børn får 1095 som startskud og 1204 som hele sandheden. Det fjerde korstog plyndrede Konstantinopel, en kristen by. Det er skændigt, og det skal stå. Det sletter ikke 632, 711, 1071 og kejserens bøn.</p>

<p class="wp-block-paragraph">De får heller ikke at vide, at det, der i Spanien hed Reconquista, var at tage land tilbage, der havde været kristent, før det blev erobret. Eller at osmannerne i 1453 tog Konstantinopel, og at Wien først blev holdt i 1683. Korstogene sluttede ikke historien. De forsinkede den.</p>

<p class="wp-block-paragraph">Opslaget fra Casey Krol rammer den ene sætning, skolen nægter at sige. Det er ikke en ny afhandling. Det er et korrektiv.</p>

<h2 class="wp-block-heading">Hvad det betyder herhjemme</h2>

<p class="wp-block-paragraph">I Danmark får I stadig at vide, at Vesten skylder. At korset i historien er overgrebet, og at halvmånen er den krænkede. Samtidig bygges der moskeer i de samme byer, hvor kirker tømmes, og politikere kalder erobring for integration, så længe den sker med familiesammenføring i stedet for rytteri.</p>

<p class="wp-block-paragraph">Historien gentager ikke ridderne. Den gentager glemslen. Hvis 1095 var umotiveret aggression, er alt forsvar det samme. Hvis 1095 var et sent svar, skal man turde sige, hvad der kom først.</p>

<h2 class="wp-block-heading">Konklusion</h2>

<p class="wp-block-paragraph">Læs Madden. Slå 632, 711, 1071 og 1095 op i den rækkefølge. Se klippet. Og spørg den næste, der kalder korstogene for kolonialisme, hvad der skete med de kristne lande, før den første ridder red ud.</p>

<p class="wp-block-paragraph">Det fjerde korstog var et forræderi. De fire århundreder før det første var en erobring. Begge dele kan være sande. Kun den ene får I i skolen.</p>

<p class="wp-block-paragraph"><strong>Kilder:</strong>
<a href="https://x.com/CaseyKrol/status/2088272178706100476" target="_blank" rel="noopener">@CaseyKrol på X</a> ·
<a href="https://crisismagazine.com/opinion/the-real-history-of-the-crusades" target="_blank" rel="noopener">Thomas F. Madden: The Real History of the Crusades</a> ·
<a href="https://www.britannica.com/event/Crusades" target="_blank" rel="noopener">Britannica: Crusades</a> ·
Første korstog: Alexios 1., Urban 2., Clermont 27. november 1095, Jerusalem 1099 ·
Manzikert 1071 · Tours 732 · Spanien 711 · Konstantinopel 1453 · Wien 1683.</p>
""",
    "featured_image": "https://mattomadsen.github.io/folketsmedie/media/featured/korstogene-stenkirke-middelhav.jpg",
    "featured_image_local": "/media/featured/korstogene-stenkirke-middelhav.jpg",
    "source": "manual",
}

data = json.loads(path.read_text(encoding="utf-8"))
arts = data["articles"]
data["articles"] = [article] + [a for a in arts if a.get("id") != article["id"] and a.get("slug") != article["slug"]]
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("inserted", article["slug"])
