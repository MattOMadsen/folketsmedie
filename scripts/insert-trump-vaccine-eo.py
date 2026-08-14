#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EXPORT = ROOT / "data" / "export.json"

CONTENT = r"""<p class="wp-block-paragraph">I årevis har CDC, de amerikanske børnelæger og de store medier sagt det samme: Skemaet er færdigt. Debatten er slut. Forældre, der tøver, er farlige.</p>

<p class="wp-block-paragraph"><strong>10. august 2026</strong> skrev præsident <strong>Donald Trump</strong> noget andet under i Det Ovale Kontor. Færre stik til alle børn. Den samlede MFR-sprøjte skal kunne deles i tre. Og det er forældrene — ikke skolen — der skal have det sidste ord.</p>

<p class="wp-block-paragraph">Det er ikke et rygte fra et forum. Det er en præsidentiel bekendtgørelse med den mundrette titel <em>Gold Standard Childhood Vaccine Recommendations</em>. Ved siden af ham stod sundhedsminister <a href="https://x.com/SecKennedy" target="_blank" rel="noopener">Robert F. Kennedy Jr.</a> og chefen for de amerikanske sundhedsforskningsinstitutter, <strong>Jay Bhattacharya</strong>.</p>

<p class="wp-block-paragraph">De danske og amerikanske TV-aviser gjorde, hvad de plejer. Farligt. Uvidenskabeligt. Et angreb på børnene. De citerer sjældent selve listen. Den er konkret.</p>

<figure class="wp-block-image size-large">
<img src="/folketsmedie/media/featured/trump-guldstandard-boernevacciner-skrivebord.jpg" alt="Skrivebord med mapper, pen og tre adskilte ampuller" loading="eager" />
</figure>

<h2 class="wp-block-heading">Det, der står på papiret</h2>

<p class="wp-block-paragraph">Bekendtgørelsen deler børnevaccinerne i tre hylder.</p>

<p class="wp-block-paragraph"><strong>Til alle børn:</strong> mæslinger, fåresyge, røde hunde, difteri, stivkrampe, kighoste, polio, Hib, pneumokok, HPV og skoldkopper. Det er <strong>elleve sygdomme</strong>.</p>

<p class="wp-block-paragraph"><strong>Til børn med særlig risiko:</strong> RSV-antistof, hepatitis A og B, visse meningokokker og dengue.</p>

<p class="wp-block-paragraph"><strong>Det, læge og forældre skal tale om:</strong> hepatitis A og B, rotavirus, meningokok, influenza og covid-19.</p>

<p class="wp-block-paragraph">Det Hvide Hus skriver det rent ud: I <strong>2024</strong> anbefalede CDC vaccination mod <strong>atten sygdomme</strong>. Nu er de universelle nede på elleve. Det, der ryger ud af «alle børn», bliver ikke forbudt. Det bliver en samtale. Trump sagde, at forsikringen stadig dækker, hvis forældrene vil have det hele.</p>

<p class="wp-block-paragraph">Sundhedsministeriets egen gennemgang fra <strong>januar 2026</strong> sætter tallene i relief. I <strong>1980</strong> fik et amerikansk barn <strong>23 doser i syv stik</strong> mod <strong>syv sygdomme</strong>. I <strong>2024</strong>: mindst <strong>84 doser i 57 stik</strong> mod <strong>sytten sygdomme</strong>, plus RSV. Trump sagde i kontoret, at USA i mange tilfælde kræver <strong>72 stik</strong>. Kennedy rettede: det kan være <strong>op til 94</strong>, før barnet fylder atten. Ingen sammenligneligt land ligger der.</p>

<p class="wp-block-paragraph">Hold fast i forskellen. Det er <strong>sygdomme</strong> og <strong>doser</strong>. Ikke «72 sprøjter ned til 11», som nogle tråde har slået sammen til én sætning.</p>

<figure class="wp-block-embed is-type-rich is-provider-twitter wp-block-embed-twitter"><div class="wp-block-embed__wrapper">
<blockquote class="twitter-tweet" data-width="550" data-dnt="true"><p lang="en" dir="ltr">For too long, America recommended more childhood vaccines than any peer nation. No longer.</p>&mdash; The White House (@WhiteHouse) <a href="https://twitter.com/WhiteHouse/status/2086932055963689467">August 10, 2026</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div></figure>

<h2 class="wp-block-heading">Ét stik eller tre</h2>

<p class="wp-block-paragraph">Teksten siger, at <strong>MFR</strong> — mæslinger, fåresyge og røde hunde — skal gives som <strong>tre enkeltstoffer</strong>, når de findes på det amerikanske marked. Og at børnevacciner <strong>så vidt muligt</strong> skal gives ved <strong>hver sit lægebesøg</strong>.</p>

<p class="wp-block-paragraph">Trump sagde det, som han siger ting. Samlet <em>kan</em> de tre stoffer ifølge ham være «ganske dødelige». Hver for sig «slet ikke». Han vil have fem separate ture til lægen i et-årsalderen i stedet for, som han formulerede det, en sodavandsflaske hældt ind i et lille barn. Bekendtgørelsen er tørrere: del, spred, kig på rækkefølgen.</p>

<figure class="wp-block-image size-large">
<img src="/folketsmedie/media/featured/trump-guldstandard-mfr-tre-ampuller.jpg" alt="Tre adskilte ampuller på et bord — ét stof ad gangen" loading="lazy" />
<figcaption>Bekendtgørelsen vil have MFR som tre enkeltstoffer, når de findes på markedet.</figcaption>
</figure>

<p class="wp-block-paragraph">Sundhedsministeriet har <strong>halvfems dage</strong> til at komme med en plan: enkeltstoffer (først MFR), tidspunkter, <strong>andre hjælpestoffer end aluminium</strong>, løbende vejning af risiko og nytte, og bedre overvågning. Den task force, Kongressen oprettede i <strong>1986</strong>, og som gik i hi i <strong>1998</strong>, er åbnet igen.</p>

<p class="wp-block-paragraph">Justitsministeren får besked på at gå efter <strong>statslove</strong>, der spærrer for religiøs og medicinsk fritagelse. I Californien, Connecticut, Maine og New York er den dør i praksis lukket, hvis barnet skal i skole. Trump vil have den åbnet.</p>

<figure class="wp-block-embed is-type-rich is-provider-twitter wp-block-embed-twitter"><div class="wp-block-embed__wrapper">
<blockquote class="twitter-tweet" data-width="550" data-dnt="true"><p lang="en" dir="ltr">Protecting our children against the most dangerous and deadly diseases without over-vaccinating them.</p>&mdash; The White House (@WhiteHouse) <a href="https://twitter.com/WhiteHouse/status/2086902312459550811">August 10, 2026</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div></figure>

<h2 class="wp-block-heading">Autisme blev sagt højt. Ordet står ikke i loven</h2>

<p class="wp-block-paragraph">I bekendtgørelsen står der ikke «autisme». I rummet gjorde der.</p>

<p class="wp-block-paragraph">Kennedy mindede om Treffert-undersøgelsen i Wisconsin i <strong>1970</strong>: cirka <strong>0,8 tilfælde pr. 10.000</strong>. CDC i dag: <strong>ét barn ud af 31</strong>. I Californien <strong>ét ud af 19</strong>, <strong>ét ud af 12,5 drenge</strong>. Forklaringen «vi er bare blevet bedre til at opdage det» er ifølge ham slået ihjel både af forskning og af almindelig fornuft. Stigningen sidder hos børn født omkring <strong>1989 og senere</strong>. De ældre generationer har ikke den kurve. <em>Gener giver ikke epidemier,</em> sagde han.</p>

<p class="wp-block-paragraph">Han fortalte, at ministeriet allerede sammenligner <strong>vaccinerede og uvaccinerede</strong>, kigger på <strong>aluminium</strong>, hepatitis B til nyfødte og stik under graviditet. Fem af de store autismestudier under NIH skal have vacciner med som mulig årsag. Bhattacharya sagde det, mange forskere har hvisket: Nu må man stille spørgsmålet uden at miste jobbet.</p>

<p class="wp-block-paragraph">Det er deres påstand. Det er ikke det samme som et afsluttet bevis. Forskellen på denne uge og de sidste tyve år er, at magten siger <strong>undersøg det</strong> — i stedet for at stemple det som forbudt tale.</p>

<p class="wp-block-paragraph">En tidligere ændring af skemaet er <strong>stoppet i retten</strong>, efter de amerikanske børnelæger sagsøgte. Trump skriver selv, at det er derfor, han tager et nyt skridt. Lægeforeningen kalder delingen af MFR farlig. Reuters har skrevet, at enkeltstofferne kan tage <strong>år</strong> at få på hylden. Ingen af delene sletter teksten på whitehouse.gov.</p>

<h2 class="wp-block-heading">Og herhjemme?</h2>

<p class="wp-block-paragraph">I Danmark vaccinerer det officielle program mod <strong>ti sygdomme</strong> (<a href="https://www.ssi.dk/vaccinationer/boernevaccination" target="_blank" rel="noopener">Statens Serum Institut</a>, opdateret maj 2026). Det er et <strong>tilbud</strong>, ikke et amerikansk skolemøde med politi bag døren. MFR er stadig <strong>ét stik</strong>. Hepatitis B til alle nyfødte, rotavirus, årlig influenza og covid til raske børn ligger <strong>ikke</strong> i kernen, som i det gamle amerikanske skema.</p>

<figure class="wp-block-image size-large">
<img src="/folketsmedie/media/featured/trump-guldstandard-ventevaerelse.jpg" alt="Tomt venteværelse i eftermiddagssol — programmet kører videre herhjemme" loading="lazy" />
</figure>

<p class="wp-block-paragraph">Når Washington nu skærer ned mod <strong>elleve universelle sygdomme</strong> og siger, at Europa får høj tilslutning uden skoletvang, ligner det mere den danske model, end TV-avisen får det til at lyde. Det, amerikanerne tilføjer — og som København <strong>ikke</strong> har gjort — er det åbne spørgsmål: Er kombinationsstik, aluminium og «alt på én dag» undersøgt, som forældrene blev lovet? Eller er det blevet en trosartikel?</p>

<p class="wp-block-paragraph">Herhjemme får I stadig at vide, at I skal «følge programmet». I fik det samme om covid til gravide, mens Fauci skrev ordet abort i en SMS. Det har vi skrevet om. Logikken er den samme. <strong>Informeret samtykke</strong> betyder, at tvivlen kommer på bordet, før nålen rammer armen.</p>

<p class="wp-block-paragraph">Læs også: <a href="/folketsmedie/artikel/fauci-sms-gravide-abort-foerste-trimester-walensky-helt-sikkert/">De sagde «helt sikkert» til gravide</a>.</p>

<h2 class="wp-block-heading">Konklusion</h2>

<p class="wp-block-paragraph">Trump har ikke forbudt vacciner. Han har skrevet, at staten anbefaler færre til alle, at MFR skal kunne deles, at stikkene skal spredes, og at forældre, der siger nej af tro eller helbred, ikke skal smides ud af skolen uden kamp.</p>

<p class="wp-block-paragraph">Læs bekendtgørelsen. Læs gennemgangen fra januar. Læs, hvad de sagde i rummet. Så kan I selv høre forskellen på «videnskaben er færdig» og et skema, der voksede fra syv til atten sygdomme, mens autisme-tallene gjorde det samme.</p>

<p class="wp-block-paragraph">Del kilderne. Spørg de danske myndigheder, hvorfor MFR <em>skal</em> være ét stik, og hvad de ved — og ikke ved — om tidspunkter og hjælpestoffer. Ikke sloganet. Papiret.</p>

<p class="wp-block-paragraph"><strong>Kilder:</strong>
<a href="https://www.whitehouse.gov/presidential-actions/2026/08/delivering-gold-standard-childhood-vaccine-recommendations-for-americans/" target="_blank" rel="noopener">Bekendtgørelsen, 10. august 2026</a> ·
<a href="https://www.whitehouse.gov/fact-sheets/2026/08/fact-sheet-president-donald-j-trump-delivers-gold-standard-childhood-vaccine-recommendations-for-americans/" target="_blank" rel="noopener">Det Hvide Hus’ gennemgang</a> ·
<a href="https://rollcall.com/factbase/trump/transcript/donald-trump-remarks-executive-order-vaccination-schedules-august-10-2026/" target="_blank" rel="noopener">Ordret referat, Factbase</a> ·
<a href="https://www.hhs.gov/sites/default/files/assessment-of-the-us-childhood-and-adolescent-immunization-schedule-compared-to-other-countries.pdf" target="_blank" rel="noopener">HHS, januar 2026</a> ·
<a href="https://x.com/WhiteHouse/status/2086932055963689467" target="_blank" rel="noopener">@WhiteHouse</a> ·
<a href="https://x.com/WhiteHouse/status/2086902312459550811" target="_blank" rel="noopener">@WhiteHouse, video</a> ·
<a href="https://x.com/SecKennedy" target="_blank" rel="noopener">@SecKennedy</a> ·
<a href="https://www.ssi.dk/vaccinationer/boernevaccination" target="_blank" rel="noopener">SSI, børnevaccinationsprogrammet</a>.</p>
"""

article = {
    "id": 1000004,
    "title": "Trump skærer i børnevaccinerne: færre stik, MFR i tre, og forældrene skal selv bestemme",
    "slug": "trump-guldstandard-boernevacciner-11-sygdomme-mfr-rfk",
    "date": "2026-08-14 15:00:00",
    "excerpt": "10. august skrev Trump under på, at USA kun skal anbefale 11 sygdomme til alle børn, at MFR skal kunne deles, og at stater, der nægter religiøs fritagelse, kan møde justitsministeren. Læs selv papiret.",
    "content": CONTENT,
    "featured_image": "https://mattomadsen.github.io/folketsmedie/media/featured/trump-guldstandard-boernevacciner-skrivebord.jpg",
    "featured_image_local": "/media/featured/trump-guldstandard-boernevacciner-skrivebord.jpg",
    "source": "manual",
}

data = json.loads(EXPORT.read_text(encoding="utf-8"))
arts = data["articles"]
arts = [a for a in arts if a.get("id") != article["id"] and a.get("slug") != article["slug"]]
arts.insert(0, article)
data["articles"] = arts
EXPORT.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("inserted", article["slug"], "articles", len(arts))
