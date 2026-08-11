import exportData from '../../data/export.json';

export type Article = {
  id: number;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
};

export type SimplePage = {
  title: string;
  slug: string;
  content: string;
  date: string;
};

export type Video = {
  id: number;
  title: string;
  slug: string;
  date: string;
  content: string;
  excerpt: string;
  featured_image: string | null;
};

export type ExportData = {
  source: string;
  backup_date: string;
  articles: Article[];
  pages: {
    om: SimplePage | null;
    nyttige_links: SimplePage | null;
    dokumentar: SimplePage | null;
  };
  videos: Video[];
};

export const data = exportData as ExportData;

export function getArticles(): Article[] {
  return [...data.articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getArticle(slug: string): Article | undefined {
  return data.articles.find((a) => a.slug === slug);
}

export function getVideos(): Video[] {
  return [...data.videos].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getVideo(slug: string): Video | undefined {
  return data.videos.find((v) => v.slug === slug);
}

/** Rewrite WP shortcodes / media URLs for static display */
export function cleanHtml(html: string): string {
  if (!html) return '';
  let out = html;

  // [caption ...]...[/caption] → figure
  out = out.replace(
    /\[caption[^\]]*\]([\s\S]*?)\[\/caption\]/gi,
    '<figure class="wp-caption">$1</figure>'
  );

  // Strip common leftover shortcodes but keep inner content when possible
  out = out.replace(/\[\/?(?:vc_[^\]]*|et_pb_[^\]]*|row|column|section)[^\]]*\]/gi, '');
  out = out.replace(/\[embed\]([\s\S]*?)\[\/embed\]/gi, '<p class="embed">$1</p>');
  out = out.replace(/\[youtube[^\]]*\]([\s\S]*?)\[\/youtube\]/gi, '$1');

  // Convert bare YouTube/Rumble URLs in paragraphs to iframes later via CSS/link
  // Keep absolute media URLs (live site / CDN) for v1

  // Gutenberg comments
  out = out.replace(/<!--\s*\/?wp:[^>]*-->/g, '');

  // Empty p tags
  out = out.replace(/<p>\s*<\/p>/g, '');

  return out;
}

export function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('da-DK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return iso;
  }
}

export function yearMonth(iso: string): string {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  return `${y}/${m}`;
}
