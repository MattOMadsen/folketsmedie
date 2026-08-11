import exportData from '../../data/export.json';

export type Article = {
  id: number;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  featured_image_local?: string | null;
  source?: string;
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
  embed_html?: string;
  watch_url?: string;
  video_type?: string;
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
  live_sync?: {
    fetched_at: string;
    live_total: number;
    added: number;
  };
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

export function articleImage(a: Article, base: string): string | null {
  if (a.featured_image_local) {
    // local paths are absolute from site root; prefix base for GH pages
    const p = a.featured_image_local.replace(/^\//, '');
    return `${base}${p}`;
  }
  return a.featured_image;
}

/** Rewrite WP shortcodes / media URLs for static display — stream embeds, no local video */
export function cleanHtml(html: string): string {
  if (!html) return '';
  let out = html;

  // [caption ...]...[/caption] → figure
  out = out.replace(
    /\[caption[^\]]*\]([\s\S]*?)\[\/caption\]/gi,
    '<figure class="wp-caption">$1</figure>'
  );

  // AIOVG shortcode → leave a note (real embeds on video pages)
  out = out.replace(
    /\[aiovg_video[^\]]*\]/gi,
    '<p class="muted">[Video — se Dokumentar-sektionen eller original artikel]</p>'
  );

  // Strip form shortcodes (no backend)
  out = out.replace(/\[forminator_form[^\]]*\]/gi, '');
  out = out.replace(/\[\/?vdz_show_more[^\]]*\]/gi, '');
  out = out.replace(/\[wp_links_page[^\]]*\]/gi, '');

  // Gutenberg youtube/rumble embed blocks often leave bare URLs or figure.wp-block-embed
  // Convert rumble.com/embed URLs to iframe
  out = out.replace(
    /https?:\/\/rumble\.com\/embed\/([a-zA-Z0-9]+)[^\s<"']*/g,
    '<div class="video-embed"><iframe src="https://rumble.com/embed/$1/?pub=4" allowfullscreen loading="lazy" title="Video"></iframe></div>'
  );

  // youtube watch / youtu.be / embed
  out = out.replace(
    /https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{6,})[^\s<"']*/g,
    '<div class="video-embed"><iframe src="https://www.youtube-nocookie.com/embed/$1" allowfullscreen loading="lazy" title="Video"></iframe></div>'
  );
  out = out.replace(
    /https?:\/\/youtu\.be\/([a-zA-Z0-9_-]{6,})[^\s<"']*/g,
    '<div class="video-embed"><iframe src="https://www.youtube-nocookie.com/embed/$1" allowfullscreen loading="lazy" title="Video"></iframe></div>'
  );
  out = out.replace(
    /https?:\/\/(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{6,})[^\s<"']*/g,
    '<div class="video-embed"><iframe src="https://www.youtube-nocookie.com/embed/$1" allowfullscreen loading="lazy" title="Video"></iframe></div>'
  );

  // wp-block-embed: if still has figure with blank, try data-url
  out = out.replace(
    /\[embed\]([\s\S]*?)\[\/embed\]/gi,
    (_, url) => {
      const u = url.trim();
      if (u.includes('rumble.com/embed/')) {
        const id = u.match(/embed\/([a-zA-Z0-9]+)/)?.[1];
        if (id)
          return `<div class="video-embed"><iframe src="https://rumble.com/embed/${id}/?pub=4" allowfullscreen loading="lazy" title="Video"></iframe></div>`;
      }
      if (u.includes('youtube') || u.includes('youtu.be')) {
        return cleanHtml(u); // recurse once via simple path
      }
      return `<p class="video-link"><a href="${u}" target="_blank" rel="noopener">Se video ↗</a></p>`;
    }
  );

  // Strip common leftover shortcodes
  out = out.replace(/\[\/?(?:vc_[^\]]*|et_pb_[^\]]*|row|column|section)[^\]]*\]/gi, '');

  // Gutenberg comments
  out = out.replace(/<!--\s*\/?wp:[^>]*-->/g, '');

  // Empty p tags
  out = out.replace(/<p>\s*<\/p>/g, '');
  out = out.replace(/<p>\s*(<div class="video-embed">)/g, '$1');
  out = out.replace(/(<\/div>)\s*<\/p>/g, '$1');

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
