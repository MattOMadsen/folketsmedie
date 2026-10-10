window.FMAI = {
  /** Opgave til Cursor/Grok — ingen xAI-nøgle i browseren. */
  buildTask(article) {
    const title = article.title || '(ingen titel endnu)';
    const slug = article.slug || '';
    const notes = article.notes || '';
    const sources = article.sourcesText || '(ingen)';
    return `Skriv en Folkets Medie-kladde. Udgiv ALDRIG. Sæt status til draft.

Læs docs/ARTIKEL-GUIDE.md og docs/AI-KLADDE.md før du skriver.

Slug: ${slug || '(lav ud fra titlen)'}
Titel-udkast: ${title}

Noter fra Matt:
${notes}

Kilder (en pr. linje):
${sources}

Skriv artiklen ind i data/manual.json som overlay på slug. Behold øvrige artikler. status SKAL være "draft". Flyt derefter anmodningsfilen fra data/ai-requests/open/ til data/ai-requests/done/. Åbn ikke PR medmindre main er låst. Ingen Grok/xAI API-nøgle. Du kører i Cursor.`;
  },
};
