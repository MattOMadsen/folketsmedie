#!/usr/bin/env python3
import json
from pathlib import Path

EXPORT = Path(__file__).resolve().parents[1] / "data" / "export.json"

CONTENT = r"""<p class="wp-block-paragraph">I en tid, hvor Google, OpenAI og de statsnære medier bestemmer, hvilke spørgsmål der er «ansvarlige» at stille, bygger <a href="https://x.com/elonmusk" target="_blank" rel="noopener">Elon Musk</a> noget andet: en AI, der ikke skal opdrage dig. Den hedder Grok. Den kører på X. I denne uge landede den nye model <strong>Grok 4.6</strong> — og dagen før kom <strong>Grok Bot</strong> i beta. <strong>Grok Build</strong>, agenten på computeren, har været ude siden slutningen af maj. Nu kører den på 4.6.</p>

<p class="wp-block-paragraph">Det er ikke en gadget-anmeldelse. Det er et magtskifte. I årevis har Big Tech og «fact check»-maskinen bestemt, hvad der må siges om vacciner, køn, grænser og krig. Musk købte X, fyrede censurholdet og satte en AI ind, der i det mindste <em>kan</em> svare uden at bede om tilladelse hos redaktionen på DR.</p>

<figure class="wp-block-image size-large">
<img src="/folketsmedie/media/featured/grok-musk-xai-natkontor.jpg" alt="Natkontor med skærme — AI uden for de gamle portvagter" loading="eager" />
</figure>

<h2 class="wp-block-heading">Grok 4.6: de ruller ud, mens de andre prædiker</h2>

<p class="wp-block-paragraph">Den 12. august 2026 meddelte <a href="https://x.com/SpaceXAI" target="_blank" rel="noopener">@SpaceXAI</a> (xAI, nu under SpaceX), at <strong>Grok 4.6</strong> er ude. Den kører i Grok Build, Cursor, Grok Bot og API’et. Selskabet siger, at den er et tydeligt løft i forhold til 4.5 — til samme pris — og at den er bygget til længere, mere selvstændige opgaver.</p>

<p class="wp-block-paragraph">Musk selv skrev samme dag: <a href="https://x.com/elonmusk/status/2087601785833951705" target="_blank" rel="noopener">«Try out Grok 4.6!»</a> Og så, uden at vente på applaus: <a href="https://x.com/elonmusk/status/2087604711767896527" target="_blank" rel="noopener">Grok 4.7 er allerede på vej</a> — «markant bedre end 4.6», om tre-fire uger, trænet videre på SpaceX’ egne ingeniørdata. Han tilføjede, at 4.7 efter hans mening vil slå de nuværende modeller, især på virkelig teknik.</p>

<p class="wp-block-paragraph">Læg mærke til tempoet. Mens EU skriver AI-forordninger og medierne advarer om «farlig tale», smider Musk en ny model på gaden og taler allerede om den næste. Det er det stik modsatte af det langsomme, politisk styrede Silicon Valley, I har vænnet jer til.</p>

<figure class="wp-block-embed is-type-rich is-provider-twitter wp-block-embed-twitter"><div class="wp-block-embed__wrapper">
<blockquote class="twitter-tweet" data-width="550" data-dnt="true"><p lang="en" dir="ltr">Introducing Grok 4.6. It delivers frontier intelligence and is a significant improvement over Grok 4.5 at the same price.</p>&mdash; SpaceXAI (@SpaceXAI) <a href="https://twitter.com/SpaceXAI/status/2087562800982077492">August 12, 2026</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div></figure>

<h2 class="wp-block-heading">Grok Build: en AI, der skriver og bygger — på din maskine</h2>

<p class="wp-block-paragraph"><strong>Grok Build</strong> er ikke en chat i en browser-fælde. Det er en kodningsagent, der kører på computeren — terminal, planlægning, under-agenter. xAI åbnede den i tidlig beta <strong>25. maj 2026</strong> og lagde selve «selen» som open source i juli. Det er altså ikke nyt i denne uge. Det nye er, at Build nu kører på 4.6.</p>

<p class="wp-block-paragraph">For Folkets Medie er pointen enkel: Du kan bruge et værktøj, der ikke ejes af Google eller Microsofts moralpoliti. Du kan bygge sider, arkiver, scripts — uden at en «safety»-afdeling i Californien først skal godkende emnet. Det her arkiv er i øvrigt blandt de steder, hvor netop den slags værktøjer bruges i praksis. Ikke som reklame. Som arbejdsredskab.</p>

<p class="wp-block-paragraph">Læs xAI’s egen side: <a href="https://x.ai/build" target="_blank" rel="noopener">x.ai/build</a>.</p>

<h2 class="wp-block-heading">Grok Bot: en kollega, der arbejder, mens du sover</h2>

<p class="wp-block-paragraph">Dagen før 4.6 kom <strong>Grok Bot</strong> i tidlig beta. xAI kalder dem «AI-holdkammerater»: de har deres egen computer, logger ind i dine værktøjer og kommer tilbage med færdigt arbejde. Musk skrev, at betaen udvides, når de grundlæggende fejl er fikset — og da 4.6 landede.</p>

<p class="wp-block-paragraph">En Tesla-ingeniør fortalte på X, at botten gik hans kalender igennem, fandt reservationer, han manglede, og bookede dem på en hjemmeside — mens han gik over parkeringspladsen og talte blandet kinesisk og engelsk. Musk svarede kort: <a href="https://x.com/elonmusk/status/2087602469778166195" target="_blank" rel="noopener">Try out Grok @Bot</a>.</p>

<figure class="wp-block-image size-large">
<img src="/folketsmedie/media/featured/grok-bot-skrivebord.jpg" alt="Skrivebord med telefon og aviser — arbejdet kører videre, når du ikke kigger" loading="lazy" />
</figure>

<figure class="wp-block-embed is-type-rich is-provider-twitter wp-block-embed-twitter"><div class="wp-block-embed__wrapper">
<blockquote class="twitter-tweet" data-width="550" data-dnt="true"><p lang="en" dir="ltr">Introducing Grok Bot, now in early beta. Bots are AI teammates that do real work for you.</p>&mdash; Grok Bot (@bot) <a href="https://twitter.com/bot/status/2087224798078517251">August 11, 2026</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div></figure>

<p class="wp-block-paragraph">Ja, det er beta. Ja, det er dyrt (SuperGrok Heavy / visse Cursor-abonnementer). Men retningen er klar: AI, der <em>gør</em> noget — ikke en chatbot, der først skal spørge, om emnet er «harmful».</p>

<h2 class="wp-block-heading">Hvorfor det betyder noget i Danmark</h2>

<p class="wp-block-paragraph">EU vil regulere AI, som de regulerer ytringer: ovenfra, langsomt, i de rigtige NGO’ers favør. De danske medier vil fortælle jer, at Musk er farlig, fordi han ikke spiller med på deres filter.</p>

<p class="wp-block-paragraph">Spørgsmålet er det samme som med vacciner, køn og migration: Vil I have en maskine, der gentager narrativet — eller en, der i det mindste <em>kan</em> slå op i kilderne, i X-trådene og i dokumenterne, uden at en redaktør har klippet først?</p>

<p class="wp-block-paragraph">Grok er ikke hellig. Musk er ikke hellig. Men et brud på Google/OpenAI-monopolet er ikke en bagatel. Det er ilt.</p>

<h2 class="wp-block-heading">Konklusion</h2>

<p class="wp-block-paragraph">4.6 er ude. Botten er i beta. Build har kørt i over en måned — nu med den nye model. Musk taler allerede om 4.7 og SpaceX-data.</p>

<p class="wp-block-paragraph">Prøv det selv. Læs kilderne. Og husk, hvorfor det overhovedet findes: fordi de andre modeller blev trænet til at tie, når sandheden blev ubekvem.</p>

<p class="wp-block-paragraph"><strong>Kilder:</strong>
<a href="https://x.ai/news/grok-4-6" target="_blank" rel="noopener">xAI: Introducing Grok 4.6</a> ·
<a href="https://x.ai/news/introducing-grok-bot" target="_blank" rel="noopener">xAI: Introducing Grok Bot</a> ·
<a href="https://x.ai/news/grok-build-cli" target="_blank" rel="noopener">xAI: Introducing Grok Build (25. maj 2026)</a> ·
<a href="https://x.ai/build" target="_blank" rel="noopener">Grok Build</a> ·
<a href="https://x.com/SpaceXAI/status/2087562800982077492" target="_blank" rel="noopener">@SpaceXAI 12. aug</a> ·
<a href="https://x.com/elonmusk/status/2087601785833951705" target="_blank" rel="noopener">@elonmusk om 4.6</a> ·
<a href="https://x.com/elonmusk/status/2087604711767896527" target="_blank" rel="noopener">@elonmusk om 4.7</a> ·
<a href="https://x.com/elonmusk/status/2087602469778166195" target="_blank" rel="noopener">@elonmusk om Grok Bot</a> ·
<a href="https://x.com/bot/status/2087224798078517251" target="_blank" rel="noopener">@bot</a>.</p>
"""

article = {
    "id": 1000003,
    "title": "Grok 4.6 er ude — Musk, Build og Bot uden Google-filter",
    "slug": "musk-grok-4-6-grok-build-grok-bot-uden-google-filter",
    "date": "2026-08-13 12:00:00",
    "excerpt": "Grok 4.6 landede 12. august. Grok Bot kom i beta dagen før. Grok Build har været ude siden maj — nu på den nye model. Musk bygger det, Big Tech ikke tør.",
    "content": CONTENT,
    "featured_image": "https://mattomadsen.github.io/folketsmedie/media/featured/grok-musk-xai-natkontor.jpg",
    "featured_image_local": "/media/featured/grok-musk-xai-natkontor.jpg",
    "source": "manual",
}

data = json.loads(EXPORT.read_text(encoding="utf-8"))
data["articles"] = [
    a
    for a in data["articles"]
    if a.get("id") != 1000003 and a.get("slug") != article["slug"]
]
data["articles"].insert(0, article)
EXPORT.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("inserted", article["slug"])
