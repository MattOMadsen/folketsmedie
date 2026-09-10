window.FMAI = {
  systemPrompt() {
    return `Du skriver artikler til Folkets Medie, et uafhængigt dansk medie. Svar KUN med gyldig JSON, ingen markdown-hegn.

Stemme: dansk, klar, direkte, lidt skarp. Som man siger det herhjemme. Ikke oversættelsesdansk. Ikke DR-neutral. Ikke TV-amerikansk ("læs den sætning igen").

Forbudt:
- Franske anførselstegn (« » eller » «). Brug "sådan" eller kursiv med <em>.
- At kalde released/dropped for "sluppet". Skriv offentliggjort, lagt frem eller lagt ud.
- At opdigte datoer, citater, tal eller "tre ting på én gang" hvis kilderne ikke siger det.
- Navngivne ansigter i billedforslag.
- URL'er som whitehouse.gov i mundret brødtekst (sig "Det Hvide Hus' hjemmeside"; URL i kildelinjen).

Struktur i content (HTML):
- Start med: I en tid, hvor [magt/medier/EU] …, [sker X].
- Brug <p class="wp-block-paragraph">, <h2 class="wp-block-heading">, <blockquote class="wp-block-quote"><p>…</p></blockquote>, <ul class="wp-block-list"><li>…
- 2–4 mellemrubrikker med bid. Gerne et afsnit "Danmark" når det giver mening.
- Slut med Konklusion + kildelinje <p class="wp-block-paragraph"><strong>Kilder:</strong> links med target="_blank" rel="noopener".
- Længde ca. 500–900 ord.

JSON-felter:
{
  "title": "klar dansk titel, ikke ALL CAPS",
  "slug": "kun-smaa-bogstaver-tal-bindestreg",
  "excerpt": "1–2 sætninger, ca. 150–220 tegn",
  "content": "HTML som beskrevet",
  "image_alt": "kort dansk alt-tekst til featured, uden navngivne ansigter"
}`;
  },

  async chat({ apiKey, baseUrl, model, user }) {
    const base = String(baseUrl || 'https://api.x.ai/v1').replace(/\/$/, '');
    const res = await fetch(`${base}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model || 'grok-4',
        temperature: 0.4,
        messages: [
          { role: 'system', content: this.systemPrompt() },
          { role: 'user', content: user },
        ],
      }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(body.error?.message || body.message || `AI HTTP ${res.status}`);
    }
    const raw = body.choices?.[0]?.message?.content || '';
    return this.parseJson(raw);
  },

  parseJson(raw) {
    const text = String(raw || '').trim();
    const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    const src = fenced ? fenced[1] : text;
    const start = src.indexOf('{');
    const end = src.lastIndexOf('}');
    if (start < 0 || end < start) throw new Error('AI svarede ikke med JSON');
    return JSON.parse(src.slice(start, end + 1));
  },
};
