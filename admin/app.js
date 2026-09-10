/* global FMGit, FMAI */
(function () {
  const STORAGE = 'fm-admin-v1';
  const PARTIES = [
    ['Socialdemokratiet', '#C8102E'],
    ['Venstre', '#006758'],
    ['Danmarksdemokraterne', '#F7D417'],
    ['Moderaterne', '#7E5AAA'],
    ['Liberal Alliance', '#21C6CE'],
    ['Det Konservative Folkeparti', '#00583C'],
    ['Enhedslisten', '#D0021B'],
    ['Socialistisk Folkeparti', '#C60C30'],
    ['Dansk Folkeparti', '#E8B84A'],
    ['Radikale Venstre', '#7C2D83'],
    ['Alternativet / Uafhængig', '#00A95C'],
    ['Nye Borgerlige', '#124B64'],
  ];

  const root = document.getElementById('admin-root');
  const base = root?.dataset.base || '/folketsmedie/';

  const state = {
    token: '',
    repo: 'MattOMadsen/folketsmedie',
    branch: 'main',
    aiKey: '',
    aiBase: 'https://api.x.ai/v1',
    aiModel: 'grok-4',
    house: 'fm',
    view: 'list',
    status: '',
    statusKind: '',
    busy: false,
    q: '',
    archive: [],
    manual: { articles: [] },
    manualSha: null,
    article: blankArticle(),
    politicians: [],
    politicianSlug: '',
    scandals: [],
    promises: [],
    scandal: blankScandal(),
    promise: blankPromise(),
    politician: blankPolitician(),
    casesIndex: null,
    casesIndexSha: null,
    caseFile: blankCase(),
    caseSha: null,
    caseSlug: '',
  };

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
      sourceName: '',
      sourceUrl: '',
    };
  }

  function blankPromise() {
    return {
      id: '',
      title: '',
      year: String(new Date().getFullYear()),
      whatHappened: '',
      sourceText: '',
      sourceUrl: '',
    };
  }

  function blankPolitician() {
    return {
      name: '',
      slug: '',
      party: 'Socialdemokratiet',
      role: '',
      inFolketinget: true,
    };
  }

  function blankCase() {
    return {
      slug: '',
      title: '',
      status: 'draft',
      summary: '',
      amountDkk: 0,
      amountLabel: '',
      amountKind: 'official',
      sourceTitle: '',
      sourceUrl: '',
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
        <p>Én indgang til artikler, politiske skandaler og Skattejægeren. Intet går live, før du trykker Udgiv.</p>
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
    return `
      <div class="admin-top">
        <div>
          <h1>Admin</h1>
          <p>Tre sider. Tre rum. Gem kladde først — udgiv kun når du vil.</p>
        </div>
        <div class="actions">
          <a class="btn secondary" href="${esc(base)}">Se sitet</a>
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
      btn.addEventListener('click', () => {
        state.house = btn.dataset.house;
        state.view = 'list';
        state.q = '';
        render();
      });
    });
  }

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
      <div class="card">
        <div class="actions" style="margin-top:0">
          <button class="btn" id="new-article">Ny artikel</button>
        </div>
        <input class="search" id="q" placeholder="Søg i titel…" value="${esc(state.q)}">
        <div class="list" id="alist">
          ${list
            .slice(0, 80)
            .map((a) => {
              const draft = a.status === 'draft' || a.status === 'hidden';
              return `<button class="item" data-slug="${esc(a.slug)}">
                <div class="item-title">${esc(a.title)}
                  <span class="badge ${draft ? 'draft' : 'live'}">${draft ? 'kladde' : 'live'}</span>
                </div>
                <div class="item-meta">${esc(a.date)} · ${esc(a.slug)}</div>
              </button>`;
            })
            .join('')}
        </div>
        <p class="hint">Viser ${Math.min(80, list.length)} af ${list.length}. Nye og rettede artikler ligger i data/manual.json, så arkivet ikke overskrives.</p>
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
      ? {
          ...blankArticle(),
          ...found,
          notes: '',
          sourcesText: '',
        }
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
        </div>
        <p class="hint">Kladde kommer ikke på forsiden. Udgiv skriver til GitHub og sætter status til published. GitHub Actions bygger herefter den live side.</p>
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
    setStatus(status === 'published' ? 'Udgiver…' : 'Gemmer kladde…');
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
        await FMGit.putBase64(
          `public/${rel}`,
          b64,
          sha,
          `Billede: ${a.slug}`
        );
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

  async function loadPoliticians() {
    const man = await FMGit.getJson('public/apps/skandale/data/politicians/manifest.json', { politicians: [] });
    state.politicians = man.data?.politicians || [];
  }

  async function renderSkandale() {
    const main = document.getElementById('admin-main');
    main.innerHTML = `<div class="card"><p>Henter politikere…</p></div>`;
    try {
      if (!state.politicians.length) await loadPoliticians();
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
    if (state.view === 'newpol') {
      main.innerHTML = politicianFormHtml();
      bindPoliticianForm();
      return;
    }
    main.innerHTML = `
      <div class="card">
        <div class="actions" style="margin-top:0">
          <button class="btn" id="new-pol">Ny politiker</button>
          <button class="btn secondary" id="new-sc">Ny skandale</button>
          <button class="btn secondary" id="new-pr">Nyt brudt løfte</button>
        </div>
        <label>Politiker</label>
        <select id="pol">
          <option value="">Vælg…</option>
          ${state.politicians
            .map((s) => `<option value="${esc(s)}" ${s === state.politicianSlug ? 'selected' : ''}>${esc(s)}</option>`)
            .join('')}
        </select>
        <p class="hint">Skandaler og løfter gemmes i de samme JSON-mapper, siden allerede bruger. Bundlen laves ved næste build.</p>
      </div>`;
    document.getElementById('pol')?.addEventListener('change', (e) => {
      state.politicianSlug = e.target.value;
    });
    document.getElementById('new-pol')?.addEventListener('click', () => {
      state.politician = blankPolitician();
      state.view = 'newpol';
      render();
    });
    document.getElementById('new-sc')?.addEventListener('click', () => {
      if (!state.politicianSlug) state.politicianSlug = document.getElementById('pol').value;
      if (!state.politicianSlug) return setStatus('Vælg en politiker først.', 'err');
      state.scandal = blankScandal();
      state.view = 'scandal';
      render();
    });
    document.getElementById('new-pr')?.addEventListener('click', () => {
      if (!state.politicianSlug) state.politicianSlug = document.getElementById('pol').value;
      if (!state.politicianSlug) return setStatus('Vælg en politiker først.', 'err');
      state.promise = blankPromise();
      state.view = 'promise';
      render();
    });
  }

  function scandalFormHtml() {
    const s = state.scandal;
    return `
      <div class="card">
        <div class="actions" style="margin-top:0">
          <button class="btn secondary" id="back">← Skandaler</button>
        </div>
        <p class="hint">Ny skandale til <strong>${esc(state.politicianSlug)}</strong></p>
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
        <textarea id="s-long">${esc(s.longDesc)}</textarea>
        <div class="row">
          <div>
            <label>Kildenavn</label>
            <input id="s-srcn" value="${esc(s.sourceName)}">
          </div>
          <div>
            <label>Kilde-URL</label>
            <input id="s-srcu" value="${esc(s.sourceUrl)}">
          </div>
        </div>
        <div class="actions">
          <button class="btn" id="save-sc">Gem skandale</button>
        </div>
      </div>`;
  }

  function bindScandalForm() {
    document.getElementById('back')?.addEventListener('click', () => {
      state.view = 'list';
      render();
    });
    document.getElementById('save-sc')?.addEventListener('click', saveScandal);
  }

  async function saveScandal() {
    const slug = state.politicianSlug;
    const title = document.getElementById('s-title').value.trim();
    if (!title) return setStatus('Titel mangler.', 'err');
    const id = slugify(title);
    const item = {
      id,
      title,
      year: document.getElementById('s-year').value.trim(),
      ourSeverity: Number(document.getElementById('s-sev').value) || 3,
      shortDesc: document.getElementById('s-short').value.trim(),
      longDesc: document.getElementById('s-long').value.trim(),
      mediaLinks: [],
      lastUpdated: new Date().toISOString().slice(0, 10),
    };
    const srcN = document.getElementById('s-srcn').value.trim();
    const srcU = document.getElementById('s-srcu').value.trim();
    if (srcN || srcU) item.mediaLinks.push({ name: srcN || 'Kilde', url: srcU });
    const filename = `${id}.json`;
    const dir = `public/apps/skandale/data/scandals/${slug}`;
    setStatus('Gemmer skandale…');
    try {
      const man = await FMGit.getJson(`${dir}/manifest.json`, { scandals: [] });
      const files = Array.isArray(man.data?.scandals) ? man.data.scandals : [];
      if (!files.includes(filename)) files.push(filename);
      await FMGit.putJson(`${dir}/${filename}`, item, null, `Skandale: ${title}`);
      await FMGit.putJson(`${dir}/manifest.json`, { scandals: files }, man.sha, `Manifest skandale: ${slug}`);
      setStatus('Skandale gemt. Den kommer med ved næste build/udgivelse af sitet.', 'ok');
      state.view = 'list';
      render();
    } catch (err) {
      setStatus(err.message || 'Kunne ikke gemme skandale', 'err');
    }
  }

  function promiseFormHtml() {
    const p = state.promise;
    return `
      <div class="card">
        <div class="actions" style="margin-top:0">
          <button class="btn secondary" id="back">← Skandaler</button>
        </div>
        <p class="hint">Nyt brudt løfte til <strong>${esc(state.politicianSlug)}</strong></p>
        <label>Titel / løftet</label>
        <input id="p-title" value="${esc(p.title)}">
        <label>År</label>
        <input id="p-year" value="${esc(p.year)}">
        <label>Hvad skete der</label>
        <textarea id="p-what">${esc(p.whatHappened)}</textarea>
        <div class="row">
          <div>
            <label>Kildetekst</label>
            <input id="p-srcn" value="${esc(p.sourceText)}">
          </div>
          <div>
            <label>Kilde-URL</label>
            <input id="p-srcu" value="${esc(p.sourceUrl)}">
          </div>
        </div>
        <div class="actions">
          <button class="btn" id="save-pr">Gem løfte</button>
        </div>
      </div>`;
  }

  function bindPromiseForm() {
    document.getElementById('back')?.addEventListener('click', () => {
      state.view = 'list';
      render();
    });
    document.getElementById('save-pr')?.addEventListener('click', savePromise);
  }

  async function savePromise() {
    const slug = state.politicianSlug;
    const title = document.getElementById('p-title').value.trim();
    if (!title) return setStatus('Titel mangler.', 'err');
    const id = slugify(title);
    const item = {
      id,
      title,
      year: document.getElementById('p-year').value.trim(),
      whatHappened: document.getElementById('p-what').value.trim(),
      sources: [],
    };
    const srcT = document.getElementById('p-srcn').value.trim();
    const srcU = document.getElementById('p-srcu').value.trim();
    if (srcT || srcU) item.sources.push({ text: srcT || 'Kilde', url: srcU });
    const filename = `${id}.json`;
    const dir = `public/apps/skandale/data/broken-promises/${slug}`;
    setStatus('Gemmer løfte…');
    try {
      const man = await FMGit.getJson(`${dir}/manifest.json`, { brokenPromises: [] });
      const files = Array.isArray(man.data?.brokenPromises) ? man.data.brokenPromises : [];
      if (!files.includes(filename)) files.push(filename);
      await FMGit.putJson(`${dir}/${filename}`, item, null, `Brudt løfte: ${title}`);
      await FMGit.putJson(
        `${dir}/manifest.json`,
        { brokenPromises: files },
        man.sha,
        `Manifest løfte: ${slug}`
      );
      setStatus('Løfte gemt.', 'ok');
      state.view = 'list';
      render();
    } catch (err) {
      setStatus(err.message || 'Kunne ikke gemme løfte', 'err');
    }
  }

  function politicianFormHtml() {
    const p = state.politician;
    return `
      <div class="card">
        <div class="actions" style="margin-top:0">
          <button class="btn secondary" id="back">← Skandaler</button>
        </div>
        <label>Navn</label>
        <input id="np-name" value="${esc(p.name)}">
        <label>Slug</label>
        <input id="np-slug" value="${esc(p.slug)}" placeholder="fx mette-frederiksen">
        <label>Parti</label>
        <select id="np-party">
          ${PARTIES.map(
            ([name]) =>
              `<option ${name === p.party ? 'selected' : ''}>${esc(name)}</option>`
          ).join('')}
        </select>
        <label>Rolle</label>
        <input id="np-role" value="${esc(p.role)}">
        <label><input id="np-ft" type="checkbox" ${p.inFolketinget ? 'checked' : ''} style="width:auto"> I Folketinget nu</label>
        <div class="actions">
          <button class="btn" id="save-pol">Opret politiker</button>
        </div>
      </div>`;
  }

  function bindPoliticianForm() {
    document.getElementById('back')?.addEventListener('click', () => {
      state.view = 'list';
      render();
    });
    document.getElementById('np-name')?.addEventListener('blur', () => {
      const slug = document.getElementById('np-slug');
      if (slug && !slug.value.trim()) slug.value = slugify(document.getElementById('np-name').value);
    });
    document.getElementById('save-pol')?.addEventListener('click', savePolitician);
  }

  async function savePolitician() {
    const name = document.getElementById('np-name').value.trim();
    const slug = slugify(document.getElementById('np-slug').value.trim() || name);
    if (!name || !slug) return setStatus('Navn og slug skal udfyldes.', 'err');
    const party = document.getElementById('np-party').value;
    const color = (PARTIES.find(([n]) => n === party) || [party, '#64748b'])[1];
    const initials = name
      .split(/\s+/)
      .map((n) => n[0])
      .join('')
      .slice(0, 3)
      .toUpperCase();
    const core = {
      id: Date.now() % 100000,
      name,
      party,
      partyColor: color,
      role: document.getElementById('np-role').value.trim(),
      inFolketinget: document.getElementById('np-ft').checked,
      avatarColor: color,
      initials,
      bio: '',
      careerTimeline: '',
    };
    setStatus('Opretter politiker…');
    try {
      const man = await FMGit.getJson('public/apps/skandale/data/politicians/manifest.json', {
        politicians: [],
      });
      const list = man.data?.politicians || [];
      if (list.includes(slug)) return setStatus('Slug findes allerede.', 'err');
      list.push(slug);
      await FMGit.putJson(
        `public/apps/skandale/data/politicians/${slug}.json`,
        core,
        null,
        `Politiker: ${name}`
      );
      await FMGit.putJson(
        'public/apps/skandale/data/politicians/manifest.json',
        { politicians: list },
        man.sha,
        `Manifest politiker: ${slug}`
      );
      await FMGit.putJson(
        `public/apps/skandale/data/scandals/${slug}/manifest.json`,
        { scandals: [] },
        null,
        `Tom skandale-mappe: ${slug}`
      );
      await FMGit.putJson(
        `public/apps/skandale/data/broken-promises/${slug}/manifest.json`,
        { brokenPromises: [] },
        null,
        `Tom løfte-mappe: ${slug}`
      );
      await FMGit.putJson(
        `public/apps/skandale/data/affiliations/${slug}.json`,
        { affiliations: [] },
        null,
        `Affiliations: ${slug}`
      );
      await FMGit.putJson(
        `public/apps/skandale/data/economic-support/${slug}.json`,
        { politician: name, donations: [] },
        null,
        `Økonomisk støtte: ${slug}`
      );
      state.politicians = list;
      state.politicianSlug = slug;
      setStatus(`${name} er oprettet.`, 'ok');
      state.view = 'list';
      render();
    } catch (err) {
      setStatus(err.message || 'Kunne ikke oprette politiker', 'err');
    }
  }

  async function renderSkatte() {
    const main = document.getElementById('admin-main');
    main.innerHTML = `<div class="card"><p>Henter sager…</p></div>`;
    try {
      if (!state.casesIndex) {
        const idx = await FMGit.getJson('public/apps/skattejaegeren/data/cases/index.json', { slugs: [] });
        state.casesIndex = idx.data;
        state.casesIndexSha = idx.sha;
      }
    } catch (err) {
      main.innerHTML = `<div class="card"><p class="status err">${esc(err.message)}</p></div>`;
      return;
    }
    if (state.view === 'edit') {
      main.innerHTML = caseFormHtml();
      bindCaseForm();
      return;
    }
    const slugs = state.casesIndex.slugs || [];
    const q = state.q.trim().toLowerCase();
    const shown = slugs.filter((s) => !q || s.includes(q));
    main.innerHTML = `
      <div class="card">
        <div class="actions" style="margin-top:0">
          <button class="btn" id="new-case">Ny sag</button>
        </div>
        <input class="search" id="q" placeholder="Søg i slug…" value="${esc(state.q)}">
        <div class="list">
          ${shown
            .map(
              (s) => `<button class="item" data-slug="${esc(s)}">
                <div class="item-title">${esc(s)}</div>
              </button>`
            )
            .join('')}
        </div>
      </div>`;
    document.getElementById('q')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        state.q = e.target.value;
        renderSkatte();
      }
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
        summary: d.summary || d.plainLead || '',
        amountDkk: d.amountDkk || 0,
        amountLabel: d.amountLabel || '',
        amountKind: d.amountKind || 'official',
        sourceTitle: d.depth?.sources?.[0]?.title || '',
        sourceUrl: d.depth?.sources?.[0]?.url || d.verifiedFacts?.[0]?.url || '',
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
          <button class="btn secondary" id="back">← Sager</button>
        </div>
        <label>Titel</label>
        <input id="c-title" value="${esc(c.title)}">
        <label>Slug</label>
        <input id="c-slug" value="${esc(c.slug)}">
        <label>Status (draft bliver stående i filen — sæt approved når den skal frem)</label>
        <select id="c-status">
          <option ${c.status === 'draft' ? 'selected' : ''}>draft</option>
          <option ${c.status === 'approved' ? 'selected' : ''}>approved</option>
        </select>
        <label>Kort resumé</label>
        <textarea id="c-sum">${esc(c.summary)}</textarea>
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
        <div class="row">
          <div>
            <label>Kildenavn</label>
            <input id="c-srcn" value="${esc(c.sourceTitle)}">
          </div>
          <div>
            <label>Kilde-URL</label>
            <input id="c-srcu" value="${esc(c.sourceUrl)}">
          </div>
        </div>
        <div class="actions">
          <button class="btn secondary" id="save-case">Gem</button>
          <button class="btn" id="pub-case">Gem som approved</button>
        </div>
      </div>`;
  }

  function bindCaseForm() {
    document.getElementById('back')?.addEventListener('click', () => {
      state.view = 'list';
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
    const srcN = document.getElementById('c-srcn').value.trim();
    const srcU = document.getElementById('c-srcu').value.trim();
    const raw = state.caseFile._raw && typeof state.caseFile._raw === 'object' ? state.caseFile._raw : {};
    const next = {
      ...raw,
      slug,
      title,
      status,
      summary,
      plainLead: raw.plainLead || summary,
      amountDkk,
      amountLabel: amountLabel || `${amountDkk.toLocaleString('da-DK')} kr.`,
      amountKind: raw.amountKind || 'official',
    };
    if (srcU) {
      next.depth = next.depth || { status, headline: title, body: [], sources: [] };
      const sources = Array.isArray(next.depth.sources) ? next.depth.sources : [];
      if (!sources.some((s) => s.url === srcU)) {
        sources.unshift({ title: srcN || 'Kilde', url: srcU, kind: 'official' });
      }
      next.depth.sources = sources;
      next.depth.status = status;
    }
    setStatus('Gemmer sag…');
    try {
      const put = await FMGit.putJson(
        `public/apps/skattejaegeren/data/cases/${slug}.json`,
        next,
        state.caseSlug === slug ? state.caseSha : null,
        `Skattejægeren: ${title}`
      );
      state.caseSha = put.content?.sha || state.caseSha;
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
      setStatus(approve ? 'Sag gemt som approved.' : 'Sag gemt.', 'ok');
    } catch (err) {
      setStatus(err.message || 'Kunne ikke gemme sag', 'err');
    }
  }

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
