/* global FMGit, FMAI */
(function () {
  const STORAGE = 'fm-admin-v1';
  const PARTIES = [
    ['Socialdemokratiet', '#C8102E'],
    ['Venstre', '#006758'],
    ['Danmarksdemokraterne', '#F7D417'],
    ['Moderaterne', '#7E5AAA'],
    ['Liberal Alliance', '#003087'],
    ['Det Konservative Folkeparti', '#00583C'],
    ['Enhedslisten', '#D0021B'],
    ['Socialistisk Folkeparti', '#C60C30'],
    ['Dansk Folkeparti', '#E8B84A'],
    ['Radikale Venstre', '#7C2D83'],
    ['Alternativet / Uafhængig', '#00A95C'],
    ['Nye Borgerlige', '#124B64'],
  ];

  const HOUSES = {
    fm: {
      title: 'Folkets Medie',
      kicker: 'Artikler',
      live: 'artikel/',
    },
    skandale: {
      title: 'Politiske skandaler',
      kicker: 'Politikere, skandaler, løfter',
      live: 'skandale/',
    },
    skatte: {
      title: 'Skattejægeren',
      kicker: 'Sager om skattekroner',
      live: 'skattejaegeren/',
    },
  };

  const root = document.getElementById('admin-root');
  const base = root?.dataset.base || '/folketsmedie/';

  const state = {
    token: '',
    repo: 'MattOMadsen/folketsmedie',
    branch: 'main',
    aiKey: '',
    aiBase: 'https://api.x.ai/v1',
    aiModel: 'grok-4',
    house: houseFromHash(),
    view: 'list',
    status: '',
    statusKind: '',
    busy: false,
    q: '',
    archive: [],
    manual: { articles: [] },
    manualSha: null,
    article: blankArticle(),
    polList: [],
    polManifest: { politicians: [] },
    polManifestSha: null,
    politicianSlug: '',
    polCore: blankPolitician(),
    polCoreSha: null,
    polLive: false,
    scandals: [],
    scManifest: { scandals: [] },
    scManifestSha: null,
    promises: [],
    prManifest: { brokenPromises: [] },
    prManifestSha: null,
    affiliationsText: '',
    affSha: null,
    donationsText: '',
    ecoSha: null,
    ecoName: '',
    scandal: blankScandal(),
    scandalFile: '',
    promise: blankPromise(),
    promiseFile: '',
    casesIndex: null,
    casesIndexSha: null,
    caseSummaries: [],
    caseFile: blankCase(),
    caseSha: null,
    caseSlug: '',
  };

  function houseFromHash() {
    const h = (location.hash || '').replace(/^#/, '');
    if (h === 'skandale' || h === 'skatte' || h === 'fm') return h;
    return 'fm';
  }

  function blankArticle() {
    return {
      id: 0,
      title: '',
      slug: '',
      date: nowStamp(),
      excerpt: '',
      content: '',
      featured_image: null,
      featured_image_local: '',
      source: 'manual',
      status: 'draft',
      notes: '',
      sourcesText: '',
    };
  }

  function blankScandal() {
    return {
      id: '',
      title: '',
      year: String(new Date().getFullYear()),
      ourSeverity: 3,
      shortDesc: '',
      longDesc: '',
      outcome: '',
      justiceAnalysis: '',
      consequences: '',
      whatTitle: '',
      whatContent: '',
      otherPoliticians: '',
      relatedTopics: '',
      mediaText: '',
      _raw: null,
    };
  }

  function blankPromise() {
    return {
      id: '',
      title: '',
      year: String(new Date().getFullYear()),
      whatHappened: '',
      sourcesText: '',
      _raw: null,
    };
  }

  function blankPolitician() {
    return {
      name: '',
      slug: '',
      party: 'Socialdemokratiet',
      role: '',
      inFolketinget: true,
      bio: '',
      careerTimeline: '',
      image: '',
      beforeTitle: '',
      beforeContent: '',
      _raw: null,
    };
  }

  function blankCase() {
    return {
      slug: '',
      title: '',
      status: 'draft',
      priority: 50,
      tags: '',
      summary: '',
      angle: '',
      plainLead: '',
      whatMoneyFor: '',
      amountDkk: 0,
      amountLabel: '',
      amountKind: 'official',
      orientation: '',
      orientationLabel: '',
      orientationNote: '',
      depthHeadline: 'Forstået på almindeligt dansk',
      depthBody: '',
      sourcesText: '',
      _raw: {},
    };
  }

  function nowStamp() {
    const d = new Date();
    const p = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:00`;
  }

  function esc(s) {
    return String(s ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function slugify(s) {
    return String(s || '')
      .toLowerCase()
      .replace(/æ/g, 'ae')
      .replace(/ø/g, 'oe')
      .replace(/å/g, 'aa')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80);
  }

  function linesToPairs(text, nameKey, urlKey) {
    return String(text || '')
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
      .map((line) => {
        const i = line.indexOf('|');
        if (i < 0) {
          if (/^https?:/i.test(line)) return { [nameKey]: 'Kilde', [urlKey]: line };
          return { [nameKey]: line, [urlKey]: '' };
        }
        return {
          [nameKey]: line.slice(0, i).trim(),
          [urlKey]: line.slice(i + 1).trim(),
        };
      });
  }

  function pairsToLines(arr, nameKey, urlKey) {
    return (arr || [])
      .map((x) => {
        const n = x[nameKey] || x.name || x.title || x.text || '';
        const u = x[urlKey] || x.url || '';
        return u ? `${n} | ${u}` : n;
      })
      .filter(Boolean)
      .join('\n');
  }

  function affiliationsToText(list) {
    return (list || [])
      .map((a) => [a.year, a.organization, a.name, a.role].map((x) => x || '').join(' | '))
      .join('\n');
  }

  function textToAffiliations(text) {
    return String(text || '')
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
      .map((line) => {
        const p = line.split('|').map((s) => s.trim());
        return {
          year: p[0] || '',
          organization: p[1] || '',
          name: p[2] || p[1] || '',
          role: p[3] || '',
        };
      });
  }

  function donationsToText(list) {
    return (list || [])
      .map((d) => {
        const src = d.source || {};
        return [d.year, d.name, d.amount, d.type, src.text || '', src.url || '']
          .map((x) => x || '')
          .join(' | ');
      })
      .join('\n');
  }

  function textToDonations(text) {
    return String(text || '')
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
      .map((line) => {
        const p = line.split('|').map((s) => s.trim());
        const row = {
          year: p[0] || '',
          name: p[1] || '',
          amount: p[2] || '',
          type: p[3] || '',
        };
        if (p[4] || p[5]) row.source = { text: p[4] || 'Kilde', url: p[5] || '' };
        return row;
      });
  }

  function csv(val) {
    return String(val || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }

  function loadLocal() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE) || '{}');
      Object.assign(state, {
        token: raw.token || '',
        repo: raw.repo || state.repo,
        branch: raw.branch || 'main',
        aiKey: raw.aiKey || '',
        aiBase: raw.aiBase || state.aiBase,
        aiModel: raw.aiModel || state.aiModel,
      });
    } catch {
      /* ignore */
    }
  }

  function saveLocal() {
    localStorage.setItem(
      STORAGE,
      JSON.stringify({
        token: state.token,
        repo: state.repo,
        branch: state.branch,
        aiKey: state.aiKey,
        aiBase: state.aiBase,
        aiModel: state.aiModel,
      })
    );
  }

  function applyGit() {
    FMGit.token = state.token;
    FMGit.repo = state.repo;
    FMGit.branch = state.branch;
  }

  function setStatus(msg, kind = '') {
    state.status = msg;
    state.statusKind = kind;
    const el = document.getElementById('admin-status');
    if (el) {
      el.className = `status ${kind}`;
      el.textContent = msg;
    }
  }

  function badge(live) {
    return live
      ? '<span class="badge live">live</span>'
      : '<span class="badge draft">kladde</span>';
  }

  function articleBadge(a) {
    if (a.status === 'draft' || a.status === 'hidden') {
      return `<span class="badge draft">${a.status === 'hidden' ? 'skjult' : 'kladde'}</span>`;
    }
    return '<span class="badge live">live</span>';
  }

  function mergedArticles() {
    const map = new Map();
    for (const a of state.archive) map.set(a.slug, { ...a, origin: 'arkiv' });
    for (const a of state.manual.articles || []) map.set(a.slug, { ...a, origin: 'admin' });
    return [...map.values()].sort((a, b) => String(b.date).localeCompare(String(a.date)));
  }

  async function bootData() {
    applyGit();
    setStatus('Henter artikler…');
    const [exportData, manualFile] = await Promise.all([
      FMGit.rawJson('data/export.json'),
      FMGit.getJson('data/manual.json', { articles: [] }),
    ]);
    state.archive = exportData.articles || [];
    state.manual = manualFile.data || { articles: [] };
    if (!Array.isArray(state.manual.articles)) state.manual.articles = [];
    state.manualSha = manualFile.sha;
    setStatus(`${mergedArticles().length} artikler klar.`);
  }

  function setHouse(house) {
    state.house = house;
    state.view = 'list';
    state.q = '';
    state.polList = [];
    state.caseSummaries = [];
    if (location.hash.replace(/^#/, '') !== house) {
      history.replaceState(null, '', `#${house}`);
    }
    render();
  }

  function render() {
    if (!root) return;
    if (!state.token) {
      root.innerHTML = loginHtml();
      bindLogin();
      return;
    }
    root.innerHTML = shellHtml();
    bindShell();
    if (state.house === 'fm') renderFm();
    else if (state.house === 'skandale') renderSkandale();
    else renderSkatte();
  }

  function loginHtml() {
    return `
      <div class="login-box card">
        <h1>Admin · Folkets Medie</h1>
        <p>Én indgang, tre rum — samme opdeling som sitet. Intet går live, før du trykker Udgiv.</p>
        <ul class="house-list">
          <li><strong>Folkets Medie</strong> — artikler</li>
          <li><strong>Politiske skandaler</strong> — politikere, skandaler, brudte løfter</li>
          <li><strong>Skattejægeren</strong> — sager om skattekroner</li>
        </ul>
        <label>GitHub-token (repo: contents read/write)</label>
        <input id="tok" type="password" autocomplete="off" placeholder="ghp_…" value="${esc(state.token)}">
        <div class="row">
          <div>
            <label>Repo</label>
            <input id="repo" value="${esc(state.repo)}">
          </div>
          <div>
            <label>Branch</label>
            <input id="branch" value="${esc(state.branch)}">
          </div>
        </div>
        <p class="hint">Token gemmes kun i din browser. Opret en classic PAT eller fine-grained token med adgang til dette repo.</p>
        <div class="actions">
          <button class="btn" id="login">Log ind</button>
          <a class="btn secondary" href="${esc(base)}">Tilbage til sitet</a>
        </div>
        <div id="admin-status" class="status ${state.statusKind}">${esc(state.status)}</div>
      </div>`;
  }

  function bindLogin() {
    document.getElementById('login')?.addEventListener('click', async () => {
      state.token = document.getElementById('tok').value.trim();
      state.repo = document.getElementById('repo').value.trim() || state.repo;
      state.branch = document.getElementById('branch').value.trim() || 'main';
      if (!state.token) return setStatus('Sæt et token.', 'err');
      saveLocal();
      applyGit();
      state.busy = true;
      try {
        await FMGit.api('');
        await bootData();
        render();
      } catch (err) {
        setStatus(err.message || 'Login fejlede', 'err');
      }
      state.busy = false;
    });
  }

  function shellHtml() {
    const h = HOUSES[state.house];
    return `
      <div class="admin-top">
        <div>
          <p class="kicker">${esc(h.kicker)}</p>
          <h1>Admin · ${esc(h.title)}</h1>
          <p>Tre sider. Tre rum. Gem kladde først — udgiv kun når du vil.</p>
        </div>
        <div class="actions">
          <a class="btn secondary" href="${esc(base + h.live)}" target="_blank" rel="noopener">Se ${esc(h.title)}</a>
          <a class="btn secondary" href="${esc(base)}">Forsiden</a>
          <button class="btn secondary" id="logout">Log ud</button>
        </div>
      </div>
      <nav class="houses" aria-label="Vælg rum">
        <button data-house="fm" class="${state.house === 'fm' ? 'is-on' : ''}">Folkets Medie</button>
        <button data-house="skandale" class="${state.house === 'skandale' ? 'is-on' : ''}">Politiske skandaler</button>
        <button data-house="skatte" class="${state.house === 'skatte' ? 'is-on' : ''}">Skattejægeren</button>
      </nav>
      <div id="admin-main"></div>
      <div id="admin-status" class="status ${state.statusKind}">${esc(state.status)}</div>
    `;
  }

  function bindShell() {
    document.getElementById('logout')?.addEventListener('click', () => {
      state.token = '';
      saveLocal();
      render();
    });
    document.querySelectorAll('[data-house]').forEach((btn) => {
      btn.addEventListener('click', () => setHouse(btn.dataset.house));
    });
  }

  /* ——— Folkets Medie: artikler ——— */

  function renderFm() {
    const main = document.getElementById('admin-main');
    if (state.view === 'edit') {
      main.innerHTML = fmEditorHtml();
      bindFmEditor();
      return;
    }
    const list = mergedArticles().filter((a) => {
      const q = state.q.trim().toLowerCase();
      if (!q) return true;
      return `${a.title} ${a.slug}`.toLowerCase().includes(q);
    });
    main.innerHTML = `
      <div class="card house-intro">
        <p>Her styrer du <strong>artiklerne</strong> — samme felter som sitet: titel, slug, dato, uddrag, HTML, featured-billede. Nye og rettede ligger i <code>data/manual.json</code>. Arkivet i <code>export.json</code> overskrives ikke.</p>
      </div>
      <div class="card">
        <div class="actions" style="margin-top:0">
          <button class="btn" id="new-article">Ny artikel</button>
        </div>
        <input class="search" id="q" placeholder="Søg i titel eller slug…" value="${esc(state.q)}">
        <div class="list" id="alist">
          ${list
            .slice(0, 120)
            .map(
              (a) => `<button class="item" data-slug="${esc(a.slug)}">
                <div class="item-title">${esc(a.title)} ${articleBadge(a)}</div>
                <div class="item-meta">${esc(a.date)} · ${esc(a.slug)} · ${esc(a.origin || '')}</div>
              </button>`
            )
            .join('')}
        </div>
        <p class="hint">Viser ${Math.min(120, list.length)} af ${list.length}.</p>
      </div>`;
    document.getElementById('q')?.addEventListener('input', (e) => {
      state.q = e.target.value;
    });
    document.getElementById('q')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') renderFm();
    });
    document.getElementById('new-article')?.addEventListener('click', () => {
      state.article = blankArticle();
      state.view = 'edit';
      render();
    });
    document.querySelectorAll('#alist [data-slug]').forEach((btn) => {
      btn.addEventListener('click', () => openArticle(btn.dataset.slug));
    });
  }

  function openArticle(slug) {
    const found = mergedArticles().find((a) => a.slug === slug);
    state.article = found
      ? { ...blankArticle(), ...found, notes: '', sourcesText: '' }
      : blankArticle();
    state.view = 'edit';
    render();
  }

  function fmEditorHtml() {
    const a = state.article;
    return `
      <div class="card">
        <div class="actions" style="margin-top:0">
          <button class="btn secondary" id="back">← Alle artikler</button>
        </div>
        <div class="row">
          <div>
            <label>Titel</label>
            <input id="a-title" value="${esc(a.title)}">
          </div>
          <div>
            <label>Slug</label>
            <input id="a-slug" value="${esc(a.slug)}" placeholder="bliver lavet ud fra titlen">
          </div>
        </div>
        <div class="row">
          <div>
            <label>Dato (YYYY-MM-DD HH:MM:SS)</label>
            <input id="a-date" value="${esc(a.date)}">
          </div>
          <div>
            <label>Uddrag</label>
            <input id="a-excerpt" value="${esc(a.excerpt)}">
          </div>
        </div>
        <label>Noter til AI (hvad er sket, hvad du vil have med)</label>
        <textarea id="a-notes">${esc(a.notes || '')}</textarea>
        <label>Kilder til AI (links, en pr. linje)</label>
        <textarea id="a-sources">${esc(a.sourcesText || '')}</textarea>
        <div class="row">
          <div>
            <label>AI-nøgle (xAI / OpenAI-kompatibel)</label>
            <input id="ai-key" type="password" value="${esc(state.aiKey)}" placeholder="xai-…">
          </div>
          <div>
            <label>Model</label>
            <input id="ai-model" value="${esc(state.aiModel)}">
          </div>
        </div>
        <label>API-base</label>
        <input id="ai-base" value="${esc(state.aiBase)}">
        <div class="actions">
          <button class="btn" id="ai-write">Bed AI om at skrive kladde</button>
        </div>
        <label>Indhold (HTML)</label>
        <textarea class="body" id="a-content">${esc(a.content)}</textarea>
        <label>Featured-billede (jpg/png, gerne 16:9)</label>
        <input id="a-image" type="file" accept="image/jpeg,image/png,image/webp">
        <p class="hint">Nuværende: ${esc(a.featured_image_local || 'ingen')}</p>
        <div class="actions">
          <button class="btn secondary" id="save-draft">Gem kladde</button>
          <button class="btn" id="publish">Udgiv</button>
          <button class="btn secondary" id="hide">Skjul</button>
        </div>
        <p class="hint">Kladde og skjulte kommer ikke på forsiden. Udgiv skriver til GitHub og sætter status til published. GitHub Actions bygger herefter den live side.</p>
      </div>`;
  }

  function readArticleForm() {
    const title = document.getElementById('a-title').value.trim();
    const slug = slugify(document.getElementById('a-slug').value.trim() || title);
    state.article = {
      ...state.article,
      title,
      slug,
      date: document.getElementById('a-date').value.trim() || nowStamp(),
      excerpt: document.getElementById('a-excerpt').value.trim(),
      content: document.getElementById('a-content').value,
      notes: document.getElementById('a-notes').value,
      sourcesText: document.getElementById('a-sources').value,
      source: 'manual',
    };
    state.aiKey = document.getElementById('ai-key').value.trim();
    state.aiModel = document.getElementById('ai-model').value.trim() || 'grok-4';
    state.aiBase = document.getElementById('ai-base').value.trim() || 'https://api.x.ai/v1';
    saveLocal();
    return state.article;
  }

  function bindFmEditor() {
    document.getElementById('back')?.addEventListener('click', () => {
      state.view = 'list';
      render();
    });
    document.getElementById('a-title')?.addEventListener('blur', () => {
      const slug = document.getElementById('a-slug');
      if (slug && !slug.value.trim()) slug.value = slugify(document.getElementById('a-title').value);
    });
    document.getElementById('ai-write')?.addEventListener('click', runAi);
    document.getElementById('save-draft')?.addEventListener('click', () => saveArticle('draft'));
    document.getElementById('publish')?.addEventListener('click', () => saveArticle('published'));
    document.getElementById('hide')?.addEventListener('click', () => saveArticle('hidden'));
  }

  async function runAi() {
    readArticleForm();
    if (!state.aiKey) return setStatus('Sæt en AI-nøgle først.', 'err');
    const notes = state.article.notes || state.article.title;
    if (!notes.trim()) return setStatus('Skriv noter eller en titel, AI kan arbejde ud fra.', 'err');
    setStatus('AI skriver kladde… det tager lidt.');
    try {
      const out = await FMAI.chat({
        apiKey: state.aiKey,
        baseUrl: state.aiBase,
        model: state.aiModel,
        user: `Skriv en Folkets Medie-kladde.\nTitel-udkast: ${state.article.title}\n\nNoter:\n${notes}\n\nKilder:\n${state.article.sourcesText || '(ingen)'}\n`,
      });
      if (out.title) document.getElementById('a-title').value = out.title;
      if (out.slug) document.getElementById('a-slug').value = slugify(out.slug);
      else document.getElementById('a-slug').value = slugify(out.title || state.article.title);
      if (out.excerpt) document.getElementById('a-excerpt').value = out.excerpt;
      if (out.content) document.getElementById('a-content').value = out.content;
      setStatus('Kladde lagt i felterne. Læs den. Ret den. Udgiv først når du er tilfreds.', 'ok');
    } catch (err) {
      setStatus(err.message || 'AI fejlede', 'err');
    }
  }

  async function saveArticle(status) {
    const a = readArticleForm();
    if (!a.title || !a.slug) return setStatus('Titel og slug skal udfyldes.', 'err');
    a.status = status;
    if (status === 'published' && !a.date) a.date = nowStamp();
    const fileInput = document.getElementById('a-image');
    const file = fileInput?.files?.[0];
    const label = status === 'published' ? 'Udgiver…' : status === 'hidden' ? 'Skjuler…' : 'Gemmer kladde…';
    setStatus(label);
    try {
      if (file) {
        const ext = (file.name.split('.').pop() || 'jpg').toLowerCase().replace('jpeg', 'jpg');
        const rel = `media/featured/${a.slug}.${ext}`;
        const b64 = await fileToB64(file);
        let sha = null;
        try {
          const existing = await FMGit.getFile(`public/${rel}`);
          sha = existing.sha;
        } catch {
          sha = null;
        }
        await FMGit.putBase64(`public/${rel}`, b64, sha, `Billede: ${a.slug}`);
        a.featured_image_local = `/${rel}`;
        a.featured_image = `https://mattomadsen.github.io/folketsmedie/${rel}`;
      }
      if (!a.id) {
        const ids = mergedArticles().map((x) => Number(x.id) || 0);
        a.id = Math.max(1000100, ...ids) + 1;
      }
      const record = {
        id: a.id,
        title: a.title,
        slug: a.slug,
        date: a.date,
        excerpt: a.excerpt,
        content: a.content,
        featured_image: a.featured_image,
        featured_image_local: a.featured_image_local || null,
        source: 'manual',
        status: a.status,
      };
      const idx = state.manual.articles.findIndex((x) => x.slug === a.slug);
      if (idx >= 0) state.manual.articles[idx] = record;
      else state.manual.articles.unshift(record);
      const put = await FMGit.putJson(
        'data/manual.json',
        state.manual,
        state.manualSha,
        status === 'published' ? `Udgiv artikel: ${a.title}` : `Kladde: ${a.title}`
      );
      state.manualSha = put.content?.sha || state.manualSha;
      state.article = { ...state.article, ...record };
      setStatus(
        status === 'published'
          ? 'Udgivet til GitHub. Sitet bygger om et øjeblik. Hard refresh når Actions er færdig.'
          : status === 'hidden'
            ? 'Skjult. Den er ikke på forsiden.'
            : 'Kladde gemt. Den er ikke på forsiden.',
        'ok'
      );
    } catch (err) {
      setStatus(err.message || 'Kunne ikke gemme', 'err');
    }
  }

  function fileToB64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /* ——— Politiske skandaler ——— */

  async function ensurePoliticians() {
    if (state.polList.length) return;
    const man = await FMGit.getJson('public/apps/skandale/data/politicians/manifest.json', {
      politicians: [],
    });
    state.polManifest = man.data || { politicians: [] };
    state.polManifestSha = man.sha;
    const live = new Set(state.polManifest.politicians || []);
    const dir = await FMGit.listDir('public/apps/skandale/data/politicians');
    const fromDir = dir
      .filter((f) => f.name.endsWith('.json') && f.name !== 'manifest.json')
      .map((f) => f.name.replace(/\.json$/, ''));
    const slugs = [...new Set([...live, ...fromDir])];
    const cores = await Promise.all(
      slugs.map(async (slug) => {
        try {
          const d = await FMGit.rawJson(`public/apps/skandale/data/politicians/${slug}.json`);
          return {
            slug,
            live: live.has(slug),
            name: d.name || slug,
            party: d.party || '',
            role: d.role || '',
          };
        } catch {
          return { slug, live: live.has(slug), name: slug, party: '', role: '' };
        }
      })
    );
    state.polList = cores.sort((a, b) => a.name.localeCompare(b.name, 'da'));
  }

  async function renderSkandale() {
    const main = document.getElementById('admin-main');
    main.innerHTML = `<div class="card"><p>Henter politikere…</p></div>`;
    try {
      await ensurePoliticians();
    } catch (err) {
      main.innerHTML = `<div class="card"><p class="status err">${esc(err.message)}</p></div>`;
      return;
    }
    if (state.view === 'scandal') {
      main.innerHTML = scandalFormHtml();
      bindScandalForm();
      return;
    }
    if (state.view === 'promise') {
      main.innerHTML = promiseFormHtml();
      bindPromiseForm();
      return;
    }
    if (state.view === 'politician' || state.view === 'newpol') {
      main.innerHTML = politicianFormHtml();
      bindPoliticianForm();
      return;
    }
    const q = state.q.trim().toLowerCase();
    const list = state.polList.filter(
      (p) => !q || `${p.name} ${p.slug} ${p.party}`.toLowerCase().includes(q)
    );
    main.innerHTML = `
      <div class="card house-intro">
        <p>Her styrer du <strong>Politiske skandaler</strong> som appen er bygget: én JSON pr. politiker, skandaler og brudte løfter i mapper med <code>manifest.json</code>. Kladde gemmes som fil, men kommer først på sitet når du trykker Udgiv — så ryger den i manifestet.</p>
      </div>
      <div class="card">
        <div class="actions" style="margin-top:0">
          <button class="btn" id="new-pol">Ny politiker</button>
        </div>
        <input class="search" id="q" placeholder="Søg i navn, parti eller slug…" value="${esc(state.q)}">
        <div class="list" id="plist">
          ${list
            .map(
              (p) => `<button class="item" data-slug="${esc(p.slug)}">
                <div class="item-title">${esc(p.name)} ${badge(p.live)}</div>
                <div class="item-meta">${esc(p.party)}${p.role ? ' · ' + esc(p.role) : ''} · ${esc(p.slug)}</div>
              </button>`
            )
            .join('')}
        </div>
        <p class="hint">${list.length} politikere. Vælg en for at rette profil, skandaler og løfter.</p>
      </div>`;
    document.getElementById('q')?.addEventListener('input', (e) => {
      state.q = e.target.value;
    });
    document.getElementById('q')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') renderSkandale();
    });
    document.getElementById('new-pol')?.addEventListener('click', () => {
      state.politicianSlug = '';
      state.polCore = blankPolitician();
      state.polCoreSha = null;
      state.polLive = false;
      state.scandals = [];
      state.promises = [];
      state.scManifest = { scandals: [] };
      state.prManifest = { brokenPromises: [] };
      state.scManifestSha = null;
      state.prManifestSha = null;
      state.affiliationsText = '';
      state.donationsText = '';
      state.affSha = null;
      state.ecoSha = null;
      state.view = 'newpol';
      render();
    });
    document.querySelectorAll('#plist [data-slug]').forEach((btn) => {
      btn.addEventListener('click', () => openPolitician(btn.dataset.slug));
    });
  }

  async function openPolitician(slug) {
    setStatus('Åbner politiker…');
    try {
      const [
        coreFile,
        scMan,
        prMan,
        affFile,
        ecoFile,
        scDir,
        prDir,
      ] = await Promise.all([
        FMGit.getJson(`public/apps/skandale/data/politicians/${slug}.json`, {}),
        FMGit.getJson(`public/apps/skandale/data/scandals/${slug}/manifest.json`, { scandals: [] }),
        FMGit.getJson(`public/apps/skandale/data/broken-promises/${slug}/manifest.json`, {
          brokenPromises: [],
        }),
        FMGit.getJson(`public/apps/skandale/data/affiliations/${slug}.json`, { affiliations: [] }),
        FMGit.getJson(`public/apps/skandale/data/economic-support/${slug}.json`, {
          politician: '',
          donations: [],
        }),
        FMGit.listDir(`public/apps/skandale/data/scandals/${slug}`),
        FMGit.listDir(`public/apps/skandale/data/broken-promises/${slug}`),
      ]);
      const d = coreFile.data || {};
      state.politicianSlug = slug;
      state.polCoreSha = coreFile.sha;
      state.polLive = (state.polManifest.politicians || []).includes(slug);
      state.polCore = {
        name: d.name || '',
        slug,
        party: d.party || 'Socialdemokratiet',
        role: d.role || '',
        inFolketinget: d.inFolketinget !== false,
        bio: d.bio || '',
        careerTimeline: d.careerTimeline || '',
        image: d.image || '',
        beforeTitle: d.beforePolitics?.title || '',
        beforeContent: d.beforePolitics?.content || '',
        _raw: d,
      };
      state.scManifest = scMan.data || { scandals: [] };
      state.scManifestSha = scMan.sha;
      state.prManifest = prMan.data || { brokenPromises: [] };
      state.prManifestSha = prMan.sha;
      state.affiliationsText = affiliationsToText(affFile.data?.affiliations || affFile.data || []);
      state.affSha = affFile.sha;
      state.donationsText = donationsToText(ecoFile.data?.donations || []);
      state.ecoSha = ecoFile.sha;
      state.ecoName = ecoFile.data?.politician || d.name || '';
      const liveSc = new Set(state.scManifest.scandals || []);
      const scFiles = scDir.filter((f) => f.name.endsWith('.json') && f.name !== 'manifest.json');
      state.scandals = (
        await Promise.all(
          scFiles.map(async (f) => {
            try {
              const item = await FMGit.rawJson(
                `public/apps/skandale/data/scandals/${slug}/${f.name}`
              );
              return {
                filename: f.name,
                live: liveSc.has(f.name),
                title: item.title || f.name,
                year: item.year || '',
                data: item,
              };
            } catch {
              return { filename: f.name, live: liveSc.has(f.name), title: f.name, year: '', data: {} };
            }
          })
        )
      ).sort((a, b) => String(b.year).localeCompare(String(a.year)));
      const livePr = new Set(state.prManifest.brokenPromises || []);
      const prFiles = prDir.filter((f) => f.name.endsWith('.json') && f.name !== 'manifest.json');
      state.promises = (
        await Promise.all(
          prFiles.map(async (f) => {
            try {
              const item = await FMGit.rawJson(
                `public/apps/skandale/data/broken-promises/${slug}/${f.name}`
              );
              return {
                filename: f.name,
                live: livePr.has(f.name),
                title: item.title || f.name,
                year: item.year || '',
                data: item,
              };
            } catch {
              return { filename: f.name, live: livePr.has(f.name), title: f.name, year: '', data: {} };
            }
          })
        )
      ).sort((a, b) => String(b.year).localeCompare(String(a.year)));
      state.view = 'politician';
      render();
      setStatus('');
    } catch (err) {
      setStatus(err.message || 'Kunne ikke åbne politiker', 'err');
    }
  }

  function politicianFormHtml() {
    const p = state.polCore;
    const isNew = state.view === 'newpol';
    return `
      <div class="card">
        <div class="actions" style="margin-top:0">
          <button class="btn secondary" id="back">← Alle politikere</button>
        </div>
        <p class="hint">${isNew ? 'Ny politiker' : `Profil: <strong>${esc(p.name || p.slug)}</strong> ${badge(state.polLive)}`}</p>
        <div class="row">
          <div>
            <label>Navn</label>
            <input id="np-name" value="${esc(p.name)}">
          </div>
          <div>
            <label>Slug</label>
            <input id="np-slug" value="${esc(p.slug)}" ${isNew ? '' : 'readonly'}>
          </div>
        </div>
        <div class="row">
          <div>
            <label>Parti</label>
            <select id="np-party">
              ${PARTIES.map(
                ([name]) => `<option ${name === p.party ? 'selected' : ''}>${esc(name)}</option>`
              ).join('')}
            </select>
          </div>
          <div>
            <label>Rolle</label>
            <input id="np-role" value="${esc(p.role)}">
          </div>
        </div>
        <label><input id="np-ft" type="checkbox" ${p.inFolketinget ? 'checked' : ''} style="width:auto"> I Folketinget nu</label>
        <label>Billede-URL (rigtigt foto, ikke AI-ansigt)</label>
        <input id="np-image" value="${esc(p.image)}">
        <label>Bio</label>
        <textarea id="np-bio">${esc(p.bio)}</textarea>
        <label>Karriere-tidslinje</label>
        <textarea id="np-career">${esc(p.careerTimeline)}</textarea>
        <label>Før politik — overskrift</label>
        <input id="np-bt" value="${esc(p.beforeTitle)}">
        <label>Før politik — tekst</label>
        <textarea id="np-bc">${esc(p.beforeContent)}</textarea>
        <label>Tilknytninger (en pr. linje: år | organisation | navn | rolle)</label>
        <textarea id="np-aff">${esc(state.affiliationsText)}</textarea>
        <label>Økonomisk støtte (en pr. linje: år | navn | beløb | type | kildetekst | url)</label>
        <textarea id="np-don">${esc(state.donationsText)}</textarea>
        <div class="actions">
          <button class="btn secondary" id="save-pol">Gem profil</button>
          <button class="btn" id="pub-pol">Udgiv politiker</button>
          ${state.polLive ? '<button class="btn secondary" id="hide-pol">Skjul politiker</button>' : ''}
        </div>
      </div>
      ${
        isNew
          ? '<p class="hint">Gem profil først. Bagefter kan du tilføje skandaler og løfter.</p>'
          : `
      <div class="card">
        <div class="actions" style="margin-top:0">
          <button class="btn" id="new-sc">Ny skandale</button>
        </div>
        <h2 class="section">Skandaler</h2>
        <div class="list" id="slist">
          ${
            state.scandals.length
              ? state.scandals
                  .map(
                    (s) => `<button class="item" data-file="${esc(s.filename)}">
                      <div class="item-title">${esc(s.title)} ${badge(s.live)}</div>
                      <div class="item-meta">${esc(s.year)} · ${esc(s.filename)}</div>
                    </button>`
                  )
                  .join('')
              : '<p class="hint">Ingen skandaler endnu.</p>'
          }
        </div>
      </div>
      <div class="card">
        <div class="actions" style="margin-top:0">
          <button class="btn" id="new-pr">Nyt brudt løfte</button>
        </div>
        <h2 class="section">Brudte løfter</h2>
        <div class="list" id="prlist">
          ${
            state.promises.length
              ? state.promises
                  .map(
                    (s) => `<button class="item" data-file="${esc(s.filename)}">
                      <div class="item-title">${esc(s.title)} ${badge(s.live)}</div>
                      <div class="item-meta">${esc(s.year)} · ${esc(s.filename)}</div>
                    </button>`
                  )
                  .join('')
              : '<p class="hint">Ingen brudte løfter endnu.</p>'
          }
        </div>
      </div>`
      }`;
  }

  function bindPoliticianForm() {
    document.getElementById('back')?.addEventListener('click', () => {
      state.view = 'list';
      render();
    });
    document.getElementById('np-name')?.addEventListener('blur', () => {
      const slug = document.getElementById('np-slug');
      if (slug && !slug.readOnly && !slug.value.trim()) {
        slug.value = slugify(document.getElementById('np-name').value);
      }
    });
    document.getElementById('save-pol')?.addEventListener('click', () => savePolitician(false));
    document.getElementById('pub-pol')?.addEventListener('click', () => savePolitician(true));
    document.getElementById('hide-pol')?.addEventListener('click', hidePolitician);
    document.getElementById('new-sc')?.addEventListener('click', () => {
      state.scandal = blankScandal();
      state.scandalFile = '';
      state.view = 'scandal';
      render();
    });
    document.getElementById('new-pr')?.addEventListener('click', () => {
      state.promise = blankPromise();
      state.promiseFile = '';
      state.view = 'promise';
      render();
    });
    document.querySelectorAll('#slist [data-file]').forEach((btn) => {
      btn.addEventListener('click', () => openScandal(btn.dataset.file));
    });
    document.querySelectorAll('#prlist [data-file]').forEach((btn) => {
      btn.addEventListener('click', () => openPromise(btn.dataset.file));
    });
  }

  function readPoliticianForm() {
    const name = document.getElementById('np-name').value.trim();
    const slugEl = document.getElementById('np-slug');
    const slug = slugify(slugEl.value.trim() || name);
    state.polCore = {
      ...state.polCore,
      name,
      slug,
      party: document.getElementById('np-party').value,
      role: document.getElementById('np-role').value.trim(),
      inFolketinget: document.getElementById('np-ft').checked,
      image: document.getElementById('np-image').value.trim(),
      bio: document.getElementById('np-bio').value,
      careerTimeline: document.getElementById('np-career').value,
      beforeTitle: document.getElementById('np-bt').value.trim(),
      beforeContent: document.getElementById('np-bc').value,
    };
    state.affiliationsText = document.getElementById('np-aff').value;
    state.donationsText = document.getElementById('np-don').value;
    return state.polCore;
  }

  async function savePolitician(publish) {
    const p = readPoliticianForm();
    if (!p.name || !p.slug) return setStatus('Navn og slug skal udfyldes.', 'err');
    const party = p.party;
    const color = (PARTIES.find(([n]) => n === party) || [party, '#64748b'])[1];
    const raw = p._raw && typeof p._raw === 'object' ? p._raw : {};
    const initials =
      raw.initials ||
      p.name
        .split(/\s+/)
        .map((n) => n[0])
        .join('')
        .slice(0, 3)
        .toUpperCase();
    const core = {
      ...raw,
      id: raw.id || Date.now() % 100000,
      name: p.name,
      party,
      partyColor: raw.partyColor || color,
      role: p.role,
      inFolketinget: p.inFolketinget,
      avatarColor: raw.avatarColor || color,
      initials,
      bio: p.bio,
      careerTimeline: p.careerTimeline,
    };
    if (p.image) core.image = p.image;
    if (p.beforeTitle || p.beforeContent) {
      core.beforePolitics = {
        title: p.beforeTitle || 'Før politik',
        content: p.beforeContent,
      };
    }
    const slug = p.slug;
    const isNew = !state.politicianSlug || state.view === 'newpol';
    setStatus(publish ? 'Udgiver politiker…' : 'Gemmer profil…');
    try {
      const put = await FMGit.saveJson(
        `public/apps/skandale/data/politicians/${slug}.json`,
        core,
        `Politiker: ${p.name}`
      );
      state.polCoreSha = put.content?.sha || state.polCoreSha;
      state.polCore._raw = core;
      state.politicianSlug = slug;
      await FMGit.saveJson(
        `public/apps/skandale/data/affiliations/${slug}.json`,
        { affiliations: textToAffiliations(state.affiliationsText) },
        `Tilknytninger: ${slug}`
      );
      await FMGit.saveJson(
        `public/apps/skandale/data/economic-support/${slug}.json`,
        { politician: p.name, donations: textToDonations(state.donationsText) },
        `Økonomisk støtte: ${slug}`
      );
      if (isNew) {
        await FMGit.saveJson(
          `public/apps/skandale/data/scandals/${slug}/manifest.json`,
          { scandals: [] },
          `Tom skandale-mappe: ${slug}`
        );
        await FMGit.saveJson(
          `public/apps/skandale/data/broken-promises/${slug}/manifest.json`,
          { brokenPromises: [] },
          `Tom løfte-mappe: ${slug}`
        );
      }
      if (publish) {
        const list = state.polManifest.politicians || [];
        if (!list.includes(slug)) {
          list.push(slug);
          state.polManifest.politicians = list;
          const manPut = await FMGit.putJson(
            'public/apps/skandale/data/politicians/manifest.json',
            state.polManifest,
            state.polManifestSha,
            `Udgiv politiker: ${slug}`
          );
          state.polManifestSha = manPut.content?.sha || state.polManifestSha;
        }
        state.polLive = true;
      }
      const existing = state.polList.find((x) => x.slug === slug);
      if (existing) {
        existing.name = p.name;
        existing.party = p.party;
        existing.role = p.role;
        existing.live = state.polLive;
      } else {
        state.polList.push({
          slug,
          name: p.name,
          party: p.party,
          role: p.role,
          live: state.polLive,
        });
        state.polList.sort((a, b) => a.name.localeCompare(b.name, 'da'));
      }
      setStatus(
        publish
          ? `${p.name} er udgivet. Sitet tager den med ved næste build.`
          : `${p.name} er gemt.${state.polLive ? '' : ' Ikke på sitet, før du trykker Udgiv politiker.'}`,
        'ok'
      );
      if (isNew) {
        state.view = 'politician';
        await openPolitician(slug);
      }
    } catch (err) {
      setStatus(err.message || 'Kunne ikke gemme politiker', 'err');
    }
  }

  async function hidePolitician() {
    const slug = state.politicianSlug;
    if (!slug) return;
    const list = (state.polManifest.politicians || []).filter((s) => s !== slug);
    setStatus('Skjuler politiker…');
    try {
      const manPut = await FMGit.putJson(
        'public/apps/skandale/data/politicians/manifest.json',
        { politicians: list },
        state.polManifestSha,
        `Skjul politiker: ${slug}`
      );
      state.polManifest.politicians = list;
      state.polManifestSha = manPut.content?.sha || state.polManifestSha;
      state.polLive = false;
      const row = state.polList.find((x) => x.slug === slug);
      if (row) row.live = false;
      setStatus('Politiker skjult. Filen ligger der stadig som kladde.', 'ok');
      render();
    } catch (err) {
      setStatus(err.message || 'Kunne ikke skjule', 'err');
    }
  }

  function openScandal(filename) {
    const found = state.scandals.find((s) => s.filename === filename);
    const d = found?.data || {};
    const what = d.whatShouldHaveHappened || {};
    state.scandalFile = filename;
    state.scandal = {
      ...blankScandal(),
      id: d.id || filename.replace(/\.json$/, ''),
      title: d.title || '',
      year: d.year || '',
      ourSeverity: d.ourSeverity ?? 3,
      shortDesc: d.shortDesc || '',
      longDesc: d.longDesc || '',
      outcome: d.outcome || '',
      justiceAnalysis: d.justiceAnalysis || '',
      consequences: d.consequences || '',
      whatTitle: what.title || '',
      whatContent: what.content || (typeof what === 'string' ? what : ''),
      otherPoliticians: (d.otherPoliticians || []).join(', '),
      relatedTopics: (d.relatedTopics || []).join(', '),
      mediaText: pairsToLines(d.mediaLinks || [], 'name', 'url'),
      _raw: d,
    };
    state.view = 'scandal';
    render();
  }

  function scandalFormHtml() {
    const s = state.scandal;
    const live = state.scandals.find((x) => x.filename === state.scandalFile)?.live;
    return `
      <div class="card">
        <div class="actions" style="margin-top:0">
          <button class="btn secondary" id="back">← ${esc(state.polCore.name || state.politicianSlug)}</button>
        </div>
        <p class="hint">Skandale til <strong>${esc(state.politicianSlug)}</strong>${state.scandalFile ? ` · ${esc(state.scandalFile)} ${badge(!!live)}` : ' · ny fil'}</p>
        <label>Titel</label>
        <input id="s-title" value="${esc(s.title)}">
        <div class="row">
          <div>
            <label>År</label>
            <input id="s-year" value="${esc(s.year)}">
          </div>
          <div>
            <label>Alvor (1–5)</label>
            <input id="s-sev" type="number" min="1" max="5" value="${esc(s.ourSeverity)}">
          </div>
        </div>
        <label>Kort beskrivelse</label>
        <textarea id="s-short">${esc(s.shortDesc)}</textarea>
        <label>Lang beskrivelse</label>
        <textarea class="mid" id="s-long">${esc(s.longDesc)}</textarea>
        <label>Udfald</label>
        <textarea id="s-out">${esc(s.outcome)}</textarea>
        <label>Hvad retten / kommissionen sagde</label>
        <textarea id="s-just">${esc(s.justiceAnalysis)}</textarea>
        <label>Konsekvenser</label>
        <textarea id="s-cons">${esc(s.consequences)}</textarea>
        <label>Hvad der burde være sket — overskrift</label>
        <input id="s-wt" value="${esc(s.whatTitle)}">
        <label>Hvad der burde være sket — tekst</label>
        <textarea id="s-wc">${esc(s.whatContent)}</textarea>
        <label>Andre politikere (kommasepareret)</label>
        <input id="s-others" value="${esc(s.otherPoliticians)}">
        <label>Emner (kommasepareret)</label>
        <input id="s-topics" value="${esc(s.relatedTopics)}">
        <label>Kilder (en pr. linje: navn | url)</label>
        <textarea id="s-media">${esc(s.mediaText)}</textarea>
        <div class="actions">
          <button class="btn secondary" id="save-sc">Gem kladde</button>
          <button class="btn" id="pub-sc">Udgiv skandale</button>
          ${state.scandalFile && live ? '<button class="btn secondary" id="hide-sc">Skjul</button>' : ''}
        </div>
        <p class="hint">Kladde skriver JSON-filen. Udgiv lægger filnavnet i politikerens skandale-manifest, som appen læser.</p>
      </div>`;
  }

  function bindScandalForm() {
    document.getElementById('back')?.addEventListener('click', () => {
      state.view = 'politician';
      render();
    });
    document.getElementById('save-sc')?.addEventListener('click', () => saveScandal(false));
    document.getElementById('pub-sc')?.addEventListener('click', () => saveScandal(true));
    document.getElementById('hide-sc')?.addEventListener('click', () => hideScandal());
  }

  function readScandalForm() {
    const raw = state.scandal._raw && typeof state.scandal._raw === 'object' ? state.scandal._raw : {};
    const title = document.getElementById('s-title').value.trim();
    const id = state.scandal.id || slugify(title);
    const item = {
      ...raw,
      id,
      title,
      year: document.getElementById('s-year').value.trim(),
      ourSeverity: Number(document.getElementById('s-sev').value) || 3,
      shortDesc: document.getElementById('s-short').value.trim(),
      longDesc: document.getElementById('s-long').value.trim(),
      outcome: document.getElementById('s-out').value.trim(),
      justiceAnalysis: document.getElementById('s-just').value.trim(),
      consequences: document.getElementById('s-cons').value.trim(),
      mediaLinks: linesToPairs(document.getElementById('s-media').value, 'name', 'url'),
      otherPoliticians: csv(document.getElementById('s-others').value),
      relatedTopics: csv(document.getElementById('s-topics').value),
      lastUpdated: new Date().toISOString().slice(0, 10),
    };
    const wt = document.getElementById('s-wt').value.trim();
    const wc = document.getElementById('s-wc').value.trim();
    if (wt || wc) item.whatShouldHaveHappened = { title: wt || 'Hvad der burde være sket', content: wc };
    return item;
  }

  async function saveScandal(publish) {
    const slug = state.politicianSlug;
    const item = readScandalForm();
    if (!item.title) return setStatus('Titel mangler.', 'err');
    const filename = state.scandalFile || `${slugify(item.id || item.title)}.json`;
    const path = `public/apps/skandale/data/scandals/${slug}/${filename}`;
    setStatus(publish ? 'Udgiver skandale…' : 'Gemmer kladde…');
    try {
      await FMGit.saveJson(path, item, `${publish ? 'Udgiv' : 'Kladde'} skandale: ${item.title}`);
      if (publish) {
        const files = Array.isArray(state.scManifest.scandals) ? [...state.scManifest.scandals] : [];
        if (!files.includes(filename)) files.push(filename);
        const manPut = await FMGit.saveJson(
          `public/apps/skandale/data/scandals/${slug}/manifest.json`,
          { scandals: files },
          `Manifest skandale: ${slug}`
        );
        state.scManifest = { scandals: files };
        state.scManifestSha = manPut.content?.sha || state.scManifestSha;
      }
      state.scandalFile = filename;
      state.scandal._raw = item;
      setStatus(
        publish ? 'Skandale udgivet. Med ved næste build.' : 'Kladde gemt. Ikke på sitet, før du udgiver.',
        'ok'
      );
      await openPolitician(slug);
    } catch (err) {
      setStatus(err.message || 'Kunne ikke gemme skandale', 'err');
    }
  }

  async function hideScandal() {
    const slug = state.politicianSlug;
    const filename = state.scandalFile;
    const files = (state.scManifest.scandals || []).filter((f) => f !== filename);
    try {
      const manPut = await FMGit.saveJson(
        `public/apps/skandale/data/scandals/${slug}/manifest.json`,
        { scandals: files },
        `Skjul skandale: ${filename}`
      );
      state.scManifest = { scandals: files };
      state.scManifestSha = manPut.content?.sha || state.scManifestSha;
      setStatus('Skandalen er skjult (fjernet fra manifest).', 'ok');
      await openPolitician(slug);
    } catch (err) {
      setStatus(err.message || 'Kunne ikke skjule', 'err');
    }
  }

  function openPromise(filename) {
    const found = state.promises.find((s) => s.filename === filename);
    const d = found?.data || {};
    state.promiseFile = filename;
    state.promise = {
      ...blankPromise(),
      id: d.id || filename.replace(/\.json$/, ''),
      title: d.title || '',
      year: d.year || '',
      whatHappened: d.whatHappened || '',
      sourcesText: pairsToLines(d.sources || [], 'text', 'url'),
      _raw: d,
    };
    state.view = 'promise';
    render();
  }

  function promiseFormHtml() {
    const p = state.promise;
    const live = state.promises.find((x) => x.filename === state.promiseFile)?.live;
    return `
      <div class="card">
        <div class="actions" style="margin-top:0">
          <button class="btn secondary" id="back">← ${esc(state.polCore.name || state.politicianSlug)}</button>
        </div>
        <p class="hint">Brudt løfte til <strong>${esc(state.politicianSlug)}</strong>${state.promiseFile ? ` · ${esc(state.promiseFile)} ${badge(!!live)}` : ' · ny fil'}</p>
        <label>Titel / løftet</label>
        <input id="p-title" value="${esc(p.title)}">
        <label>År</label>
        <input id="p-year" value="${esc(p.year)}">
        <label>Hvad skete der</label>
        <textarea class="mid" id="p-what">${esc(p.whatHappened)}</textarea>
        <label>Kilder (en pr. linje: tekst | url)</label>
        <textarea id="p-src">${esc(p.sourcesText)}</textarea>
        <div class="actions">
          <button class="btn secondary" id="save-pr">Gem kladde</button>
          <button class="btn" id="pub-pr">Udgiv løfte</button>
          ${state.promiseFile && live ? '<button class="btn secondary" id="hide-pr">Skjul</button>' : ''}
        </div>
      </div>`;
  }

  function bindPromiseForm() {
    document.getElementById('back')?.addEventListener('click', () => {
      state.view = 'politician';
      render();
    });
    document.getElementById('save-pr')?.addEventListener('click', () => savePromise(false));
    document.getElementById('pub-pr')?.addEventListener('click', () => savePromise(true));
    document.getElementById('hide-pr')?.addEventListener('click', hidePromise);
  }

  async function savePromise(publish) {
    const slug = state.politicianSlug;
    const title = document.getElementById('p-title').value.trim();
    if (!title) return setStatus('Titel mangler.', 'err');
    const raw = state.promise._raw && typeof state.promise._raw === 'object' ? state.promise._raw : {};
    const id = state.promise.id || slugify(title);
    const item = {
      ...raw,
      id,
      title,
      year: document.getElementById('p-year').value.trim(),
      whatHappened: document.getElementById('p-what').value.trim(),
      sources: linesToPairs(document.getElementById('p-src').value, 'text', 'url'),
    };
    const filename = state.promiseFile || `${slugify(id)}.json`;
    setStatus(publish ? 'Udgiver løfte…' : 'Gemmer kladde…');
    try {
      await FMGit.saveJson(
        `public/apps/skandale/data/broken-promises/${slug}/${filename}`,
        item,
        `${publish ? 'Udgiv' : 'Kladde'} løfte: ${title}`
      );
      if (publish) {
        const files = Array.isArray(state.prManifest.brokenPromises)
          ? [...state.prManifest.brokenPromises]
          : [];
        if (!files.includes(filename)) files.push(filename);
        const manPut = await FMGit.saveJson(
          `public/apps/skandale/data/broken-promises/${slug}/manifest.json`,
          { brokenPromises: files },
          `Manifest løfte: ${slug}`
        );
        state.prManifest = { brokenPromises: files };
        state.prManifestSha = manPut.content?.sha || state.prManifestSha;
      }
      state.promiseFile = filename;
      setStatus(publish ? 'Løfte udgivet.' : 'Kladde gemt.', 'ok');
      await openPolitician(slug);
    } catch (err) {
      setStatus(err.message || 'Kunne ikke gemme løfte', 'err');
    }
  }

  async function hidePromise() {
    const slug = state.politicianSlug;
    const filename = state.promiseFile;
    const files = (state.prManifest.brokenPromises || []).filter((f) => f !== filename);
    try {
      await FMGit.saveJson(
        `public/apps/skandale/data/broken-promises/${slug}/manifest.json`,
        { brokenPromises: files },
        `Skjul løfte: ${filename}`
      );
      state.prManifest = { brokenPromises: files };
      setStatus('Løfte skjult.', 'ok');
      await openPolitician(slug);
    } catch (err) {
      setStatus(err.message || 'Kunne ikke skjule', 'err');
    }
  }

  /* ——— Skattejægeren: sager ——— */

  async function ensureCases() {
    if (state.casesIndex && state.caseSummaries.length) return;
    const idx = await FMGit.getJson('public/apps/skattejaegeren/data/cases/index.json', { slugs: [] });
    state.casesIndex = idx.data;
    state.casesIndexSha = idx.sha;
    const dir = await FMGit.listDir('public/apps/skattejaegeren/data/cases');
    const fromDir = dir
      .filter((f) => f.name.endsWith('.json') && f.name !== 'index.json')
      .map((f) => f.name.replace(/\.json$/, ''));
    const slugs = [...new Set([...(state.casesIndex.slugs || []), ...fromDir])];
    state.caseSummaries = (
      await Promise.all(
        slugs.map(async (slug) => {
          try {
            const d = await FMGit.rawJson(`public/apps/skattejaegeren/data/cases/${slug}.json`);
            return {
              slug,
              title: d.title || slug,
              status: d.status || 'approved',
              amountLabel: d.amountLabel || '',
              amountDkk: d.amountDkk || 0,
              inIndex: (state.casesIndex.slugs || []).includes(slug),
            };
          } catch {
            return { slug, title: slug, status: 'draft', amountLabel: '', amountDkk: 0, inIndex: false };
          }
        })
      )
    ).sort((a, b) => a.title.localeCompare(b.title, 'da'));
  }

  async function renderSkatte() {
    const main = document.getElementById('admin-main');
    main.innerHTML = `<div class="card"><p>Henter sager…</p></div>`;
    try {
      await ensureCases();
    } catch (err) {
      main.innerHTML = `<div class="card"><p class="status err">${esc(err.message)}</p></div>`;
      return;
    }
    if (state.view === 'edit') {
      main.innerHTML = caseFormHtml();
      bindCaseForm();
      return;
    }
    const q = state.q.trim().toLowerCase();
    const shown = state.caseSummaries.filter(
      (s) => !q || `${s.title} ${s.slug}`.toLowerCase().includes(q)
    );
    main.innerHTML = `
      <div class="card house-intro">
        <p>Her styrer du <strong>Skattejægeren</strong> som appen er bygget: én JSON pr. sag i <code>data/cases/</code>. Listen kommer fra <code>index.json</code>. Status <code>draft</code> vises ikke på sitet — sæt <code>approved</code> når den skal frem.</p>
      </div>
      <div class="card">
        <div class="actions" style="margin-top:0">
          <button class="btn" id="new-case">Ny sag</button>
        </div>
        <input class="search" id="q" placeholder="Søg i titel eller slug…" value="${esc(state.q)}">
        <div class="list">
          ${shown
            .map(
              (s) => `<button class="item" data-slug="${esc(s.slug)}">
                <div class="item-title">${esc(s.title)} ${
                  s.status === 'draft' || !s.inIndex ? badge(false) : badge(true)
                }</div>
                <div class="item-meta">${esc(s.amountLabel || '')} · ${esc(s.slug)} · ${esc(s.status)}</div>
              </button>`
            )
            .join('')}
        </div>
        <p class="hint">${shown.length} sager.</p>
      </div>`;
    document.getElementById('q')?.addEventListener('input', (e) => {
      state.q = e.target.value;
    });
    document.getElementById('q')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') renderSkatte();
    });
    document.getElementById('new-case')?.addEventListener('click', () => {
      state.caseFile = blankCase();
      state.caseSha = null;
      state.caseSlug = '';
      state.view = 'edit';
      render();
    });
    document.querySelectorAll('[data-slug]').forEach((btn) => {
      btn.addEventListener('click', () => openCase(btn.dataset.slug));
    });
  }

  async function openCase(slug) {
    setStatus('Åbner sag…');
    try {
      const file = await FMGit.getJson(`public/apps/skattejaegeren/data/cases/${slug}.json`, {});
      const d = file.data || {};
      state.caseSha = file.sha;
      state.caseSlug = slug;
      state.caseFile = {
        slug: d.slug || slug,
        title: d.title || '',
        status: d.status || 'draft',
        priority: d.priority ?? 50,
        tags: (d.tags || []).join(', '),
        summary: d.summary || '',
        angle: d.angle || '',
        plainLead: d.plainLead || '',
        whatMoneyFor: d.whatMoneyFor || '',
        amountDkk: d.amountDkk || 0,
        amountLabel: d.amountLabel || '',
        amountKind: d.amountKind || 'official',
        orientation: d.orientation || '',
        orientationLabel: d.orientationLabel || '',
        orientationNote: d.orientationNote || '',
        depthHeadline: d.depth?.headline || 'Forstået på almindeligt dansk',
        depthBody: Array.isArray(d.depth?.body) ? d.depth.body.join('\n\n') : '',
        sourcesText: pairsToLines(d.depth?.sources || [], 'title', 'url'),
        _raw: d,
      };
      state.view = 'edit';
      render();
      setStatus('');
    } catch (err) {
      setStatus(err.message || 'Kunne ikke åbne sag', 'err');
    }
  }

  function caseFormHtml() {
    const c = state.caseFile;
    return `
      <div class="card">
        <div class="actions" style="margin-top:0">
          <button class="btn secondary" id="back">← Alle sager</button>
        </div>
        <label>Titel</label>
        <input id="c-title" value="${esc(c.title)}">
        <div class="row">
          <div>
            <label>Slug</label>
            <input id="c-slug" value="${esc(c.slug)}">
          </div>
          <div>
            <label>Status</label>
            <select id="c-status">
              <option value="draft" ${c.status === 'draft' ? 'selected' : ''}>draft — ikke på sitet</option>
              <option value="approved" ${c.status === 'approved' ? 'selected' : ''}>approved — live</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div>
            <label>Prioritet (lavt tal først)</label>
            <input id="c-pri" type="number" value="${esc(c.priority)}">
          </div>
          <div>
            <label>Tags (kommasepareret)</label>
            <input id="c-tags" value="${esc(c.tags)}">
          </div>
        </div>
        <div class="row">
          <div>
            <label>Beløb (kr, tal)</label>
            <input id="c-amt" type="number" value="${esc(c.amountDkk)}">
          </div>
          <div>
            <label>Beløb som tekst</label>
            <input id="c-amtl" value="${esc(c.amountLabel)}">
          </div>
        </div>
        <label>Beløbstype</label>
        <select id="c-kind">
          <option ${c.amountKind === 'official' ? 'selected' : ''}>official</option>
          <option ${c.amountKind === 'claim' ? 'selected' : ''}>claim</option>
        </select>
        <label>Kort resumé</label>
        <textarea id="c-sum">${esc(c.summary)}</textarea>
        <label>Vinkel</label>
        <textarea id="c-angle">${esc(c.angle)}</textarea>
        <label>Plain lead (almindeligt dansk)</label>
        <textarea id="c-lead">${esc(c.plainLead)}</textarea>
        <label>Hvad går pengene til</label>
        <textarea id="c-money">${esc(c.whatMoneyFor)}</textarea>
        <div class="row">
          <div>
            <label>Orientering (fx venstre)</label>
            <input id="c-ori" value="${esc(c.orientation)}">
          </div>
          <div>
            <label>Orientering som label</label>
            <input id="c-oril" value="${esc(c.orientationLabel)}">
          </div>
        </div>
        <label>Orientering — note</label>
        <textarea id="c-orin">${esc(c.orientationNote)}</textarea>
        <label>Dybde — overskrift</label>
        <input id="c-dh" value="${esc(c.depthHeadline)}">
        <label>Dybde — brødtekst (afsnit adskilt af tom linje)</label>
        <textarea class="body" id="c-db">${esc(c.depthBody)}</textarea>
        <label>Kilder (en pr. linje: titel | url)</label>
        <textarea id="c-src">${esc(c.sourcesText)}</textarea>
        <div class="actions">
          <button class="btn secondary" id="save-case">Gem kladde</button>
          <button class="btn" id="pub-case">Udgiv sag</button>
        </div>
      </div>`;
  }

  function bindCaseForm() {
    document.getElementById('back')?.addEventListener('click', () => {
      state.view = 'list';
      state.caseSummaries = [];
      render();
    });
    document.getElementById('save-case')?.addEventListener('click', () => saveCase(false));
    document.getElementById('pub-case')?.addEventListener('click', () => saveCase(true));
  }

  async function saveCase(approve) {
    const title = document.getElementById('c-title').value.trim();
    const slug = slugify(document.getElementById('c-slug').value.trim() || title);
    if (!title || !slug) return setStatus('Titel og slug skal udfyldes.', 'err');
    const status = approve ? 'approved' : document.getElementById('c-status').value;
    const summary = document.getElementById('c-sum').value.trim();
    const amountDkk = Number(document.getElementById('c-amt').value) || 0;
    const amountLabel = document.getElementById('c-amtl').value.trim();
    const raw = state.caseFile._raw && typeof state.caseFile._raw === 'object' ? state.caseFile._raw : {};
    const sources = linesToPairs(document.getElementById('c-src').value, 'title', 'url').map((s) => ({
      title: s.title,
      url: s.url,
      kind: 'official',
    }));
    const body = document
      .getElementById('c-db')
      .value.split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);
    const next = {
      ...raw,
      slug,
      title,
      status,
      priority: Number(document.getElementById('c-pri').value) || 50,
      tags: csv(document.getElementById('c-tags').value),
      summary,
      angle: document.getElementById('c-angle').value.trim(),
      plainLead: document.getElementById('c-lead').value.trim() || summary,
      whatMoneyFor: document.getElementById('c-money').value.trim(),
      amountDkk,
      amountLabel: amountLabel || `${amountDkk.toLocaleString('da-DK')} kr.`,
      amountKind: document.getElementById('c-kind').value,
      orientation: document.getElementById('c-ori').value.trim(),
      orientationLabel: document.getElementById('c-oril').value.trim(),
      orientationNote: document.getElementById('c-orin').value.trim(),
      depth: {
        ...(raw.depth || {}),
        status,
        headline: document.getElementById('c-dh').value.trim(),
        body,
        sources: sources.length ? sources : raw.depth?.sources || [],
      },
    };
    setStatus(approve ? 'Udgiver sag…' : 'Gemmer sag…');
    try {
      const put = await FMGit.putJson(
        `public/apps/skattejaegeren/data/cases/${slug}.json`,
        next,
        state.caseSlug === slug ? state.caseSha : null,
        `Skattejægeren: ${title}`
      );
      state.caseSha = put.content?.sha || state.caseSha;
      state.caseSlug = slug;
      const slugs = state.casesIndex.slugs || [];
      if (!slugs.includes(slug)) {
        slugs.push(slug);
        state.casesIndex.slugs = slugs;
        const idxPut = await FMGit.putJson(
          'public/apps/skattejaegeren/data/cases/index.json',
          state.casesIndex,
          state.casesIndexSha,
          `Index sag: ${slug}`
        );
        state.casesIndexSha = idxPut.content?.sha || state.casesIndexSha;
      }
      state.caseSummaries = [];
      setStatus(
        approve
          ? 'Sag udgivet som approved. Med ved næste build.'
          : status === 'draft'
            ? 'Kladde gemt. Ikke på sitet.'
            : 'Sag gemt.',
        'ok'
      );
    } catch (err) {
      setStatus(err.message || 'Kunne ikke gemme sag', 'err');
    }
  }

  window.addEventListener('hashchange', () => {
    const h = houseFromHash();
    if (h !== state.house) setHouse(h);
  });

  loadLocal();
  if (state.token) {
    applyGit();
    bootData()
      .then(() => render())
      .catch((err) => {
        state.status = err.message || 'Kunne ikke hente data';
        state.statusKind = 'err';
        state.token = '';
        render();
      });
  } else {
    render();
  }
})();
