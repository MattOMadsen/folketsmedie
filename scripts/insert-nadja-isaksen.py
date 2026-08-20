#!/usr/bin/env python3
import json
from pathlib import Path

EXPORT = Path(__file__).resolve().parents[1] / "data" / "export.json"

CONTENT = r"""<p class="wp-block-paragraph">I en tid, hvor folketingsmedlemmer gerne kalder sig borgernes stemme, viser det sig, hvor tynd den stemme er, når den, der rammes, har været ubehagelig.</p>

<p class="wp-block-paragraph">Kent Nielsen sidder i fængsel. Sagen er på vej mod Højesteret. Danmarks Fængsler nægtede udsættelse. <a href="https://x.com/Statsstyret" target="_blank" rel="noopener">Statsstyret</a> har med aktindsigt vist, at han kun er dømt efter straffelovens <strong>§ 119 a</strong> — chikane af offentligt ansatte — ikke trusler efter § 119. Alligevel byggede afslaget på, at han var dømt for personfarlig kriminalitet. Afgørelsen kom to arbejdsdage før afsoning. Den kan ikke påklages til højere myndighed.</p>

<p class="wp-block-paragraph">Det er ikke et skænderi. Det er, om loven gælder, når den ramte er irriterende.</p>

<figure class="wp-block-image size-large">
<img src="/folketsmedie/media/featured/nadja-isaksen-samtale-1.jpg" alt="Samtale på X: Nadja Isaksen afviser at kigge på Kent Nielsens sag" loading="eager" />
<figcaption>Nadja Isaksen: «Det har jeg ikke interesse i. Og det er Kent Nielsen faktisk helt selv skyld i.» Skærmbillede via Statsstyret.</figcaption>
</figure>

<figure class="wp-block-embed is-type-rich is-provider-twitter wp-block-embed-twitter"><div class="wp-block-embed__wrapper">
<blockquote class="twitter-tweet" data-width="550" data-dnt="true"><p lang="da" dir="ltr">Vi har ikke været for heldige med Nadja Isaksen. Hun afviser simpelthen, som borgernes repræsentant i Folketinget, at se på at vi nu har et retssystem, hvor du nu skal afsone din straf, selvom din sag er i ankeproces til Højesteret.</p>&mdash; Statsstyret (@Statsstyret) <a href="https://twitter.com/Statsstyret/status/2090150609382977655">August 19, 2026</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div></figure>

<h2 class="wp-block-heading">Hvad hun selv skrev</h2>

<p class="wp-block-paragraph">Det er ikke kun Statsstyrets gengivelse. Det står i hendes egne svar.</p>

<p class="wp-block-paragraph">En borger bad hende kigge på sagen og evt. hjælpe Kent. Nadja Natalie Isaksen svarede 18. august:</p>

<blockquote class="wp-block-quote"><p>Det har jeg ikke interesse i. Og det er Kent Nielsen faktisk helt selv skyld i :-).</p></blockquote>

<p class="wp-block-paragraph">Dagen efter, da Statsstyret holdt fast i, at det handler om retssikkerhed — administrativ ekstra straf på opspin, uden rekurs — skrev hun:</p>

<blockquote class="wp-block-quote"><p>Jeg tror at pointen om, at Kent Nielsen har tilsvinet mig på det groveste netop fløj hen over hovedet på dig. Men den oplevelse, så kan jeg næppe se, hvorfor jeg skal gå ind i hans sag. Længere er den ikke.</p></blockquote>

<figure class="wp-block-image size-large">
<img src="/folketsmedie/media/featured/nadja-isaksen-samtale-2.jpg" alt="Samtale fortsætter: Nadja Isaksen vil ikke have hjælp og afviser sagen" loading="lazy" />
<figcaption>Hun vil ikke kigge. Hun vil heller ikke høre, at mandatet kun rækker, så længe nogen gider bakke hende op.</figcaption>
</figure>

<p class="wp-block-paragraph">Hun skrev også, at hun ikke kender sagen og ikke har sat sig ind i den — og derfor ikke kan vurdere, om der er et problem. I samme åndedrag afviste hun den alligevel, fordi Kent «selv er skyld i det», og fordi han har «tilsvinet» hende.</p>

<p class="wp-block-paragraph">Man kan ikke både sige «jeg kender den ikke» og «jeg gider ikke, for han har været grim». Det ene udelukker det andet.</p>

<h2 class="wp-block-heading">Retsstaten eller såret stolthed</h2>

<p class="wp-block-paragraph">Et folketingsmedlem behøver ikke lide den, der kommer i klemme. Det er jobbet at kigge alligevel.</p>

<p class="wp-block-paragraph">Hvis en borger skal afsone, mens Højesteret endnu ikke har talt, og hvis fængslet bruger en paragraf, han ikke er dømt efter, er det ikke «et skænderi». § 119 a er ikke det samme som § 119. Det er derfor Statsstyret slog alarm. Fængslernes presseafdeling vil som udgangspunkt ikke udtale sig om borgerens forhold — og henviser ham til at klage over en afgørelse, der ifølge dem selv ikke kan påklages opad.</p>

<p class="wp-block-paragraph">Lukket kreds. Forkert grundlag. For kort tid.</p>

<p class="wp-block-paragraph">Og så en politiker, der siger det højt: hun går ikke ind i det, fordi hun er blevet talt grimt til.</p>

<p class="wp-block-paragraph">Læs baggrunden her: <a href="/folketsmedie/artikel/kent-nielsen-faengsel-119a-statsstyret-danmarks-faengsler/">Kent Nielsen sidder inde — på et forkert grundlag</a>.</p>

<h2 class="wp-block-heading">Det er mønsteret</h2>

<p class="wp-block-paragraph">Folketinget er fuld af folk, der taler om retssikkerhed, indtil det koster dem en pinlighed. Så bliver det personligt. Så er det «han kunne jo opføre sig ordentligt».</p>

<p class="wp-block-paragraph">Det er præcis den sætning, magten elsker. Den flytter fokus fra papiret til tonelejet. Den siger: du har ikke krav på rigtig paragraf, hvis du har været ubehagelig.</p>

<p class="wp-block-paragraph">Nadja Isaksen blev valgt ind i 2026, forlod Borgernes Parti i maj og sidder uden for grupperne. Hun behøver ikke være enig med Kent Nielsen i ét eneste opslag. Hun skal kunne tåle, at en borger, der rammes af en forkert afgørelse, stadig er en borger.</p>

<h2 class="wp-block-heading">Konklusion</h2>

<p class="wp-block-paragraph">Det er ikke længere «ifølge nogen». Det står i hendes egne tweets. Hun vil ikke se på en afsoning på forkert grundlag, fordi der har været skænderi.</p>

<p class="wp-block-paragraph">Så er «repræsentant» bare et ord på et visitkort.</p>

<p class="wp-block-paragraph">Læs Statsstyrets aktindsigt. Læs samtalen. Spørg hende offentligt, om hun vil kigge alligevel — nu hvor hun har sagt, at hun ikke kender sagen.</p>

<p class="wp-block-paragraph"><strong>Kilder:</strong>
<a href="https://x.com/Statsstyret/status/2090150609382977655" target="_blank" rel="noopener">@Statsstyret 19. aug. 2026</a> ·
<a href="https://x.com/Statsstyret/status/2089677664726520261" target="_blank" rel="noopener">@Statsstyret 18. aug. (aktindsigt)</a> ·
<a href="https://x.com/NadjaIsaksen" target="_blank" rel="noopener">@NadjaIsaksen</a> ·
<a href="https://www.ft.dk/medlemmer/mf/n/nadja-natalie-isaksen" target="_blank" rel="noopener">Folketinget: Nadja Natalie Isaksen</a> ·
<a href="/folketsmedie/artikel/kent-nielsen-faengsel-119a-statsstyret-danmarks-faengsler/">Folkets Medie: Kent Nielsen og § 119 a</a>.</p>
"""

article = {
    "id": 1000017,
    "title": "Nadja Isaksen vil ikke se på Kent Nielsens sag — fordi han har sagt noget grimt",
    "slug": "nadja-isaksen-afviser-kent-nielsen-119a-afsoning",
    "date": "2026-08-20 07:00:00",
    "excerpt": "Folketingsmedlem Nadja Isaksen afviser at kigge på, at Kent Nielsen skal afsone mens anken kører. Hun skriver det selv: hun har ikke interesse, og det er hans egen skyld — fordi han har tilsvinet hende.",
    "content": CONTENT,
    "featured_image": "https://mattomadsen.github.io/folketsmedie/media/featured/nadja-isaksen-samtale-1.jpg",
    "featured_image_local": "/media/featured/nadja-isaksen-samtale-1.jpg",
    "source": "manual",
}

data = json.loads(EXPORT.read_text(encoding="utf-8"))
data["articles"] = [
    a
    for a in data["articles"]
    if a.get("id") != 1000017 and a.get("slug") != article["slug"]
]
data["articles"].insert(0, article)
EXPORT.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("inserted", article["slug"])
