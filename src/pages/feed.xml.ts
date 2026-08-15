import type { APIRoute } from 'astro';
import { getArticles, htmlToPlainText, shareTeaser } from '../lib/content';

function xmlEscape(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export const GET: APIRoute = () => {
  const site = String(import.meta.env.SITE || 'https://mattomadsen.github.io').replace(/\/$/, '');
  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  const home = `${site}${base}`;
  const items = getArticles().slice(0, 30);

  const body = items
    .map((a) => {
      const url = `${home}artikel/${a.slug}/`;
      const desc = shareTeaser({
        title: a.title,
        excerpt: a.excerpt,
        content: a.content,
        max: 280,
      });
      const pub = new Date(String(a.date).replace(' ', 'T')).toUTCString();
      return `    <item>
      <title>${xmlEscape(a.title)}</title>
      <link>${xmlEscape(url)}</link>
      <guid isPermaLink="true">${xmlEscape(url)}</guid>
      <pubDate>${pub}</pubDate>
      <description>${xmlEscape(desc)}</description>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Folkets Medie</title>
    <link>${xmlEscape(home)}</link>
    <description>Nyheder fra folket til folket</description>
    <language>da</language>
${body}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  });
};
