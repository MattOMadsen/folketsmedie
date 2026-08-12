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
  episode_count?: number;
  source_url?: string;
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

const articleSlugs = new Set(data.articles.map((a) => a.slug));
const docSlugs = new Set(data.videos.map((v) => v.slug));

export function getArticles(): Article[] {
  return [...data.articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getArticle(slug: string): Article | undefined {
  return data.articles.find((a) => a.slug === slug);
}

/** Documentaries only (from /dokumentar-film/), not misc site videos */
export function getVideos(): Video[] {
  return [...data.videos].sort((a, b) => a.title.localeCompare(b.title, 'da'));
}

export function getVideo(slug: string): Video | undefined {
  return data.videos.find((v) => v.slug === slug);
}

export function articleImage(a: Article, base: string): string | null {
  if (a.featured_image_local) {
    const p = a.featured_image_local.replace(/^\//, '');
    return `${base}${p}`;
  }
  return a.featured_image;
}

/** HTML-brødtekst til ren tekst til SoMe / meta. */
export function htmlToPlainText(html: string): string {
  return (html || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function clipSentence(text: string, max: number): string {
  const t = text.replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const at = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? '), cut.lastIndexOf(' '));
  const clipped = (at > max * 0.45 ? cut.slice(0, at) : cut).replace(/[.,;:–—-]+\s*$/, '');
  return `${clipped}…`;
}

/**
 * Uddrag til deling: excerpt hvis det er rigtig brødtekst, ellers start af artiklen.
 * Overskriften holdes ude — den sendes separat som titel.
 */
export function shareTeaser(input: {
  title: string;
  excerpt?: string | null;
  content: string;
  max?: number;
}): string {
  const max = input.max ?? 240;
  const title = (input.title || '').replace(/\s+/g, ' ').trim();
  const excerpt = (input.excerpt || '').replace(/\s+/g, ' ').trim();
  const excerptOk =
    excerpt.length >= 40 && excerpt.toLowerCase() !== title.toLowerCase();
  let source = excerptOk ? excerpt : htmlToPlainText(input.content);
  if (title && source.toLowerCase().startsWith(title.toLowerCase())) {
    source = source.slice(title.length).replace(/^[\s:–—-]+/, '');
  }
  return clipSentence(source, max);
}

function rumbleEmbed(id: string): string {
  return `<div class="video-embed"><iframe src="https://rumble.com/embed/${id}/" allowfullscreen allow="autoplay; encrypted-media; picture-in-picture; fullscreen" loading="lazy" title="Video" referrerpolicy="origin"></iframe></div>`;
}

function youtubeEmbed(id: string): string {
  return `<div class="video-embed"><iframe src="https://www.youtube-nocookie.com/embed/${id}" allowfullscreen allow="autoplay; encrypted-media; picture-in-picture; fullscreen" loading="lazy" title="Video" referrerpolicy="origin"></iframe></div>`;
}

function genericEmbed(src: string): string {
  const safe = src.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  return `<div class="video-embed"><iframe src="${safe}" allowfullscreen allow="autoplay; encrypted-media; picture-in-picture; fullscreen" loading="lazy" title="Video" referrerpolicy="origin"></iframe></div>`;
}

function embedFromSrc(src: string): string {
  src = src.replace(/&amp;/g, '&');
  const rid = src.match(/rumble\.com\/embed\/([a-zA-Z0-9]+)/i);
  if (rid) return rumbleEmbed(rid[1]);
  const yid = src.match(
    /(?:youtube\.com\/embed\/|youtube-nocookie\.com\/embed\/)([a-zA-Z0-9_-]+)/i
  );
  if (yid) return youtubeEmbed(yid[1]);
  return genericEmbed(src);
}

/** Ensure base ends with / */
function normBase(base: string): string {
  if (!base) return '/';
  return base.endsWith('/') ? base : `${base}/`;
}

/**
 * Map a folketsmedie.dk path to a local archive path (relative to site base).
 * Returns null for media/uploads (left on original URL until downloaded).
 * Returns local path string without leading domain, starting after base.
 */
function mapInternalPath(pathname: string): string | null | 'keep-media' {
  let path = pathname.split('?')[0].split('#')[0] || '/';
  // decode once
  try {
    path = decodeURIComponent(path);
  } catch {
    /* keep */
  }
  path = path.replace(/\/+/g, '/');
  if (!path.startsWith('/')) path = `/${path}`;

  // Media — keep absolute live URL for now (handled separately)
  if (path.startsWith('/wp-content/uploads/')) return 'keep-media';

  // Home
  if (path === '/' || path === '') return '';

  // Static sections
  if (
    path === '/dokumentar-film' ||
    path === '/dokumentar-film/' ||
    path.startsWith('/video-category/dokumentar')
  ) {
    return 'dokumentar/';
  }
  if (
    path.startsWith('/om-folkets-medie') ||
    path === '/om-fm' ||
    path === '/om-fm/' ||
    path.startsWith('/indsigt-i-folkets-medie')
  ) {
    return 'om/';
  }
  if (path.startsWith('/nyttige-links')) {
    return 'nyttige-links/';
  }
  if (
    path.startsWith('/kontakt') ||
    path.startsWith('/stoet') ||
    path.startsWith('/støt')
  ) {
    return 'om/';
  }

  // Documentary film page: /dokumentar-film/slug/
  const dok = path.match(/^\/dokumentar-film\/([^/]+)\/?$/i);
  if (dok) {
    const slug = dok[1];
    if (docSlugs.has(slug)) return `dokumentar/${slug}/`;
    // try without parent
    return 'dokumentar/';
  }

  // Dated posts: /2025/09/10/my-slug/ or /2025/09/10/my-slug
  const dated = path.match(/^\/(\d{4})\/(\d{2})\/(\d{2})\/([^/]+)\/?$/);
  if (dated) {
    const slug = dated[4];
    if (articleSlugs.has(slug)) return `artikel/${slug}/`;
    // unknown article — still prefer archive 404 over dead domain
    return `artikel/${slug}/`;
  }

  // aiovg video single → dokumentar hub or matching film
  const aiovg = path.match(/^\/aiovg_videos\/([^/]+)\/?$/i);
  if (aiovg) {
    const slug = aiovg[1];
    if (docSlugs.has(slug)) return `dokumentar/${slug}/`;
    // series parts often match film name prefix
    for (const d of docSlugs) {
      if (slug.startsWith(d) || d.startsWith(slug.replace(/-part-\d+$/, '').replace(/-episode-\d+$/, ''))) {
        return `dokumentar/${d}/`;
      }
    }
    return 'dokumentar/';
  }

  // Category / tag / author / search → home list
  if (
    path.startsWith('/category/') ||
    path.startsWith('/tag/') ||
    path.startsWith('/author/') ||
    path.startsWith('/page/') ||
    path.startsWith('/?') ||
    path.startsWith('/feed') ||
    path.startsWith('/wp-') ||
    path.startsWith('/login') ||
    path.startsWith('/community') ||
    path.startsWith('/forum') ||
    path.startsWith('/account')
  ) {
    return '';
  }

  // Bare slug path: /some-article-slug/
  const bare = path.match(/^\/([^/]+)\/?$/);
  if (bare) {
    const slug = bare[1];
    if (articleSlugs.has(slug)) return `artikel/${slug}/`;
    if (docSlugs.has(slug)) return `dokumentar/${slug}/`;
    // common page slugs
    if (slug === 'privatlivspolitik') return 'om/';
  }

  // Nested bare: /foo/bar/ → try last segment as article
  const parts = path.split('/').filter(Boolean);
  if (parts.length >= 1) {
    const last = parts[parts.length - 1];
    if (articleSlugs.has(last)) return `artikel/${last}/`;
    if (docSlugs.has(last)) return `dokumentar/${last}/`;
  }

  // Unknown internal page → home (better than dead domain)
  return '';
}

/**
 * Rewrite all folketsmedie.dk hrefs (and bare paths) to local archive URLs.
 * Leaves /wp-content/uploads/ on original host until media is local.
 */
export function rewriteInternalLinks(html: string, base: string): string {
  if (!html) return '';
  const b = normBase(base);

  return html.replace(
    /\bhref=(["'])([^"']+)\1/gi,
    (full, quote: string, href: string) => {
      const raw = href.replace(/&amp;/g, '&').trim();
      if (!raw || raw.startsWith('#') || raw.startsWith('mailto:') || raw.startsWith('tel:')) {
        return full;
      }
      // external non-FM
      if (/^https?:\/\//i.test(raw) && !/folketsmedie\.dk/i.test(raw)) {
        return full;
      }
      // protocol-relative //www.folketsmedie.dk/...
      let url = raw;
      if (url.startsWith('//')) url = `https:${url}`;

      let pathname = url;
      if (/^https?:\/\//i.test(url)) {
        if (!/folketsmedie\.dk/i.test(url)) return full;
        try {
          pathname = new URL(url).pathname + (new URL(url).search || '');
        } catch {
          const m = url.match(/folketsmedie\.dk(\/[^?#]*)/i);
          pathname = m ? m[1] : '/';
        }
      } else if (url.startsWith('/')) {
        // root-relative on old site
        pathname = url;
      } else {
        // relative path — leave
        return full;
      }

      const mapped = mapInternalPath(pathname);
      if (mapped === 'keep-media') {
        // force absolute media URL so it still loads while domain lives
        if (!/^https?:\/\//i.test(raw)) {
          return `href=${quote}https://www.folketsmedie.dk${pathname.startsWith('/') ? pathname : `/${pathname}`}${quote}`;
        }
        return full;
      }
      if (mapped === null) return full;

      const local = `${b}${mapped}`;
      return `href=${quote}${local}${quote}`;
    }
  );
}

/** Clean WP HTML: fix embeds, rewrite internal links, strip junk */
export function cleanHtml(html: string, base = '/'): string {
  if (!html) return '';
  let out = html;

  // Replace iframes (WP often uses sandbox + secret that 404s on Rumble)
  out = out.replace(
    /<iframe\b[^>]*\bsrc=["']([^"']+)["'][^>]*(?:\/>|>\s*<\/iframe>)/gi,
    (_, src: string) => embedFromSrc(src)
  );

  // Bare rumble/youtube URLs in text
  out = out.replace(
    /(?<!src=["'])https?:\/\/rumble\.com\/embed\/([a-zA-Z0-9]+)[^\s<"']*/g,
    (_, id) => rumbleEmbed(id)
  );
  out = out.replace(
    /(?<!src=["'])https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{6,})[^\s<"']*/g,
    (_, id) => youtubeEmbed(id)
  );
  out = out.replace(
    /(?<!src=["'])https?:\/\/youtu\.be\/([a-zA-Z0-9_-]{6,})[^\s<"']*/g,
    (_, id) => youtubeEmbed(id)
  );

  out = out.replace(
    /\[caption[^\]]*\]([\s\S]*?)\[\/caption\]/gi,
    '<figure class="wp-caption">$1</figure>'
  );
  out = out.replace(/\[aiovg_video[^\]]*\]/gi, '');
  out = out.replace(/\[forminator_form[^\]]*\]/gi, '');
  out = out.replace(/\[\/?vdz_show_more[^\]]*\]/gi, '');
  out = out.replace(/\[wp_links_page[^\]]*\]/gi, '');
  out = out.replace(/\[embed\]([\s\S]*?)\[\/embed\]/gi, (_, url) => {
    const u = String(url).trim();
    const rid = u.match(/rumble\.com\/embed\/([a-zA-Z0-9]+)/);
    if (rid) return rumbleEmbed(rid[1]);
    const yid = u.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (yid) return youtubeEmbed(yid[1]);
    return `<p class="video-link"><a href="${u}" target="_blank" rel="noopener">Se video ↗</a></p>`;
  });

  out = out.replace(/\[\/?(?:vc_[^\]]*|et_pb_[^\]]*|row|column|section)[^\]]*\]/gi, '');
  out = out.replace(/<!--\s*\/?wp:[^>]*-->/g, '');
  out = out.replace(/<p>\s*<\/p>/g, '');

  out = out.replace(
    /<figure[^>]*wp-block-embed[^>]*>\s*<div[^>]*wp-block-embed__wrapper[^>]*>\s*(<div class="video-embed">[\s\S]*?<\/div>)\s*<\/div>\s*<\/figure>/gi,
    '$1'
  );

  // Internal links → archive (must be after embed work)
  out = rewriteInternalLinks(out, base);

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
