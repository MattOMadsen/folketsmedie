import { getArticles, getVideos, htmlToPlainText, articleImage, videoImage, type Article, type Video } from './content';

export type SearchKind = 'artikel' | 'dokumentar';

export type SearchItem = {
  kind: SearchKind;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  href: string;
  image: string | null;
  hay: string;
};

export function foldDa(s: string): string {
  return (s || '')
    .toLowerCase()
    .replace(/æ/g, 'ae')
    .replace(/ø/g, 'oe')
    .replace(/å/g, 'aa')
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function clip(text: string, max: number): string {
  const t = (text || '').replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max).replace(/\s+\S*$/, '')}…`;
}

export function buildSearchIndex(base: string): SearchItem[] {
  const b = base.endsWith('/') ? base : `${base}/`;
  const articles: SearchItem[] = getArticles().map((a: Article) => {
    const plain = htmlToPlainText(a.content || '');
    const excerpt = clip(a.excerpt || plain, 220);
    const hay = foldDa([a.title, a.excerpt, a.slug.replace(/-/g, ' '), plain.slice(0, 1200)].join(' '));
    return {
      kind: 'artikel',
      title: a.title,
      slug: a.slug,
      date: a.date,
      excerpt,
      href: `${b}artikel/${a.slug}/`,
      image: articleImage(a, b),
      hay,
    };
  });
  const films: SearchItem[] = getVideos().map((v: Video) => {
    const plain = htmlToPlainText(v.content || v.excerpt || '');
    const excerpt = clip(v.excerpt || plain, 220);
    const hay = foldDa([v.title, v.excerpt, v.slug.replace(/-/g, ' '), plain.slice(0, 800)].join(' '));
    return {
      kind: 'dokumentar',
      title: v.title,
      slug: v.slug,
      date: v.date,
      excerpt,
      href: `${b}dokumentar/${v.slug}/`,
      image: videoImage(v, b),
      hay,
    };
  });
  return [...articles, ...films];
}

export function queryTokens(q: string): string[] {
  return foldDa(q)
    .split(/\s+/)
    .filter((w) => w.length >= 2);
}

export function scoreItem(item: SearchItem, tokens: string[]): number {
  if (!tokens.length) return 0;
  const title = foldDa(item.title);
  const slug = foldDa(item.slug.replace(/-/g, ' '));
  let score = 0;
  for (const t of tokens) {
    if (!item.hay.includes(t)) return 0;
    if (title === t) score += 80;
    else if (title.startsWith(t)) score += 50;
    else if (title.includes(t)) score += 30;
    if (slug.includes(t)) score += 12;
    score += 8;
  }
  return score;
}

export function searchItems(items: SearchItem[], q: string, limit = 80): SearchItem[] {
  const tokens = queryTokens(q);
  if (!tokens.length) return [];
  return items
    .map((item) => ({ item, score: scoreItem(item, tokens) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.item.date.localeCompare(a.item.date))
    .slice(0, limit)
    .map((x) => x.item);
}
