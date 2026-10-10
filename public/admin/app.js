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

  const MONTHS = ['jan.', 'feb.', 'mar.', 'apr.', 'maj', 'jun.', 'jul.', 'aug.', 'sep.', 'okt.', 'nov.', 'dec.'];

  const DEMO_ARTICLES = [
    {
      id: 1000034,
      title: '70 millioner amerikanske børn har nu fået en investeringskonto i eget navn',
      slug: 'trump-konti-70-millioner-boern-oktober-2026',
      date: '2026-10-10T09:00:00Z',
      excerpt: '',
      content: '<p>Eksempeltekst.</p>',
      featured_image_local: '/media/featured/wh-billede-1.jpg',
      status: 'published',
    },
    {
      id: 1000033,
      title: 'Vælgerne går til højre i hele Europa. Domstole og brandmure står i vejen',
      slug: 'vaelgerne-gaar-til-hoejre-europa-domstole-brandmure-oktober-2026',
      date: '2026-10-06T09:30:00Z',
      excerpt: '',
      content: '<p>Eksempeltekst.</p>',
      featured_image_local: '/media/featured/hoejrefloej-maalinger-oktober-2026.png',
      status: 'published',
    },
    {
      id: 1000032,
      title: 'Trump vil have svindlere i fængsel. Og politikere, der ser stille til, skal selv betale',
      slug: 'trump-faengsel-svindlere-politikere-betaler-oktober-2026',
      date: '2026-10-06T05:00:00Z',
      excerpt: '',
      content: '<p>Eksempeltekst.</p>',
      featured_image_local: '/media/featured/trump-svindel-video-still-2026-10-03.jpg',
      status: 'published',
    },
    {
      id: 1000031,
      title: 'AfD vinder igen i øst. Brandmuren står. Tyskland og Europa betaler prisen',
      slug: 'afd-vinder-igen-i-oest-brandmur-tyskland-europa',
      date: '2026-09-20 18:00:00',
      excerpt: '',
      content: '<p>Eksempeltekst.</p>',
      featured_image_local: '/media/featured/afd-vinder-igen-i-oest-brandmur.png',
      status: 'published',
    },
    {
      id: 1000101,
      title: 'Udkast: gennemgang af talen',
      slug: 'udkast-gennemgang-af-talen',
      date: '2026-10-10 14:30:00',
      excerpt: '',
      content: '<p>Eksempelkladde.</p>',
      featured_image_local: '/media/featured/dublin-liberty-hall-luas-gade.jpg',
      status: 'draft',
    },
    {
      id: 1000102,
      title: 'Udkast: kilder mangler',
      slug: 'udkast-kilder-mangler',
      date: '2026-10-09 09:00:00',
      excerpt: '',
      content: '',
      featured_image_local: '',
      status: 'draft',
    },
  ];

  const DEMO_POLITICIANS = [
    { slug: 'mette-frederiksen', name: 'Mette Frederiksen', party: 'Socialdemokratiet', role: 'Statsminister siden 2019', live: true },
    { slug: 'lars-loekke-rasmussen', name: 'Lars Løkke Rasmussen', party: 'Moderaterne', role: 'Udenrigsminister', live: true },
    { slug: 'eksempel-politiker', name: 'Eksempelpolitiker', party: 'Venstre', role: 'Kladde', live: false },
  ];

  const DEMO_CASES = [
    {
      slug: 'statens-kunstfond',
      title: 'Statens Kunstfond: millioner til kunst — ikke til ældrepleje',
      status: 'approved',
      amountLabel: '27,8 mio. kr.',
      amountDkk: 27800000,
      inIndex: true,
    },
    {
      slug: 'eksempel-sag',
      title: 'Eksempelsag om en pulje',
      status: 'draft',
      amountLabel: '4,2 mio. kr.',
      amountDkk: 4200000,
      inIndex: false,
    },
  ];

  const root = document.getElementById('admin-root');
  const base = root?.dataset.base || '/folketsmedie/';

  const state = {
    token: '',
    repo: 'MattOMadsen/folketsmedie',
    branch: 'main',
    house: houseFromHash(),
    view: 'list',
    fmFilter: 'live',
    demo: false,
    gcKey: '',
    visits: { mode: 'example', total: 12480, bySlug: {}, note: '' },
    editorTab: 'skriv',
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

  let pollTimer = null;
  function stopPoll() {
    if (pollTimer) {
      clearInterval(pollTimer);
      pollTimer = null;
    }
  }

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
        gcKey: raw.gcKey || '',
      });
    } catch {
      /* ignore */
    }
  }

  function saveLocal() {
    let token = state.token;
    let repo = state.repo;
    let branch = state.branch;
    if (state.demo) {
      try {
        const raw = JSON.parse(localStorage.getItem(STORAGE) || '{}');
        token = raw.token || '';
        repo = raw.repo || repo;
        branch = raw.branch || branch;
      } catch {
        token = '';
      }
    }
    localStorage.setItem(
      STORAGE,
      JSON.stringify({
        token,
        repo,
        branch,
        gcKey: state.gcKey || '',
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
      ? '<span class="badge live">Live</span>'
      : '<span class="badge draft">Kladde</span>';
  }

  function articleBadge(a) {
    if (a.status === 'hidden') return '<span class="badge draft">Skjult</span>';
    if (a.status === 'draft') return '<span class="badge draft">Kladde</span>';
    return '<span class="badge live">Live</span>';
  }

  function isDraftArticle(a) {
    return a.status === 'draft' || a.status === 'hidden';
  }

  function withClock(day, month, year, hour, minute) {
    const mon = MONTHS[month - 1] || '';
    const hm = minute ? ` kl. ${hour}.${String(minute).padStart(2, '0')}` : ` kl. ${hour}`;
    return `${day}. ${mon} ${year}${hm}`;
  }

  function formatDa(input) {
    const s = String(input || '').trim();
    if (!s) return '';
    const hasZone = /[zZ]$|[+-]\d{2}:?\d{2}$/.test(s);
    const m = s.match(/^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}))?/);
    if (!m) return s;
    if (!hasZone) {
      const day = Number(m[3]);
      const month = Number(m[2]);
      const year = Number(m[1]);
      if (!m[4]) return `${day}. ${MONTHS[month - 1]} ${year}`;
      return withClock(day, month, year, Number(m[4]), Number(m[5]));
    }
    const d = new Date(s);
    if (Number.isNaN(d.getTime())) return s;
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Copenhagen',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    }).formatToParts(d);
    const g = (t) => Number(parts.find((p) => p.type === t)?.value);
    return withClock(g('day'), g('month'), g('year'), g('hour'), g('minute'));
  }

  function formatCount(n) {
    return Number(n || 0).toLocaleString('da-DK');
  }

  function exampleCount(key) {
    const s = String(key || 'x');
    let h = 2166136261;
    for (let i = 0; i < s.length; i += 1) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return 800 + ((h >>> 0) % 42000);
  }

  function visitHtml(key) {
    const live = state.visits.mode === 'live';
    const n = live ? Number(state.visits.bySlug[key] || 0) : exampleCount(key);
    const ex = live ? '' : '<span class="ex">eksempel</span>';
    return `<span class="hits">${formatCount(n)} besøg ${ex}</span>`;
  }

  function articleImage(a) {
    const local = a.featured_image_local || '';
    if (local) {
      if (/^https?:/i.test(local)) return local;
      const path = local.startsWith('/') ? local : `/${local}`;
      if (path.startsWith(base)) return path;
      return `${base.replace(/\/$/, '')}${path}`;
    }
    return a.featured_image || '';
  }

  function partyColor(name) {
    const hit = PARTIES.find(([n]) => n === name);
    return hit ? hit[1] : '#2a3236';
  }

  function tabsHtml(counts) {
    const tabs = [
      ['live', 'Live', counts.live],
      ['draft', 'Kladder', counts.draft],
      ['all', 'Alle', counts.all],
    ];
    return `<div class="tabs" role="tablist">${tabs
      .map(
        ([id, label, n]) =>
          `<button type="button" data-filter="${id}" class="${state.fmFilter === id ? 'is-on' : ''}" role="tab" aria-selected="${state.fmFilter === id}">${label} <span class="count">${n}</span></button>`
      )
      .join('')}</div>`;
  }

  function bindListChrome(rerender) {
    const q = document.getElementById('q');
    q?.addEventListener('input', (e) => {
      state.q = e.target.value;
      const pos = e.target.selectionStart;
      rerender();
      const again = document.getElementById('q');
      if (again) {
        again.focus();
        try {
          again.setSelectionRange(pos, pos);
        } catch {
          /* search inputs */
        }
      }
    });
    document.querySelectorAll('.tabs [data-filter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.fmFilter = btn.dataset.filter;
        rerender();
      });
    });
  }

  function blockDemo() {
    if (!state.demo) return false;
    setStatus('Eksempelvisning. Her gemmes ingenting.', 'err');
    return true;
  }

  async function loadVisits() {
    if (state.demo) return;
    if (!state.gcKey) {
      state.visits = {
        mode: 'example',
        total: 12480,
        bySlug: {},
        note: 'Eksempeltal. Sæt nøglen i menuen for at hente de rigtige.',
      };
      return;
    }
    try {
      const headers = {
        Authorization: `Bearer ${state.gcKey}`,
        Accept: 'application/json',
      };
      const api = 'https://folketsmedie.goatcounter.com/api/v0';
      const totalRes = await fetch(`${api}/stats/total`, { headers });
      if (!totalRes.ok) throw new Error('besøg');
      const totalJson = await totalRes.json();
      const bySlug = {};
      let offset = 0;
      for (let page = 0; page < 6; page += 1) {
        const res = await fetch(`${api}/stats/hits?limit=100&offset=${offset}`, { headers });
        if (!res.ok) throw new Error('besøg');
        const json = await res.json();
        const hits = Array.isArray(json.hits) ? json.hits : [];
        for (const hit of hits) {
          const path = String(hit.path || '');
          const found = path.match(/\/(?:artikel|skandale|skattejaegeren)\/([^/?#]+)/);
          if (!found) continue;
          const slug = decodeURIComponent(found[1].replace(/\/$/, ''));
          bySlug[slug] = (bySlug[slug] || 0) + Number(hit.count || 0);
        }
        if (!json.more || !hits.length) break;
        offset += hits.length;
      }
      state.visits = {
        mode: 'live',
        total: Number(totalJson.total ?? totalJson.total_utc ?? 0),
        bySlug,
        note: '',
      };
    } catch {
      state.visits = {
        mode: 'example',
        total: 12480,
        bySlug: {},
        note: 'Tallene kunne ikke hentes her. Telefonen kan blokere goatcounter.com. Eksempeltal vises i stedet.',
      };
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
    let exportData = { articles: [] };
    try {
      exportData = await FMGit.rawJson('data/export.json');
    } catch (err) {
      try {
        const file = await FMGit.getJson('data/export.json', { articles: [] });
        exportData = file.data || { articles: [] };
      } catch {
        console.warn('Kunne ikke hente arkivet', err);
      }
    }
    const manualFile = await FMGit.getJson('data/manual.json', { articles: [] });
    state.archive = exportData.articles || [];
    state.manual = manualFile.data || { articles: [] };
    if (!Array.isArray(state.manual.articles)) state.manual.articles = [];
    state.manualSha = manualFile.sha;
    setStatus(`${mergedArticles().length} artikler klar.`);
  }

  function setHouse(house) {
    stopPoll();
    state.house = house;
    state.view = 'list';
    state.q = '';
    if (!state.demo) {
      state.polList = [];
      state.caseSummaries = [];
    }
    if (location.hash.replace(/^#/, '') !== house) {
      history.replaceState(null, '', `#${house}`);
    }
    render();
  }

  function newLabel() {
    if (state.house === 'skandale') return 'Ny politiker';
    if (state.house === 'skatte') return 'Ny sag';
    return 'Ny artikel';
  }

  function startNew() {
    stopPoll();
    if (state.house === 'fm') {
      state.article = blankArticle();
      state.view = 'edit';
      render();
      return;
    }
    if (state.house === 'skandale') {
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
      return;
    }
    state.caseFile = blankCase();
    state.caseSha = null;
    state.caseSlug = '';
    state.view = 'edit';
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
        <h1>Admin</h1>
        <p>Folkets Medie, Politiske skandaler og Skattejægeren. Nøglen gemmes kun i denne browser. Intet går live, før du trykker Udgiv.</p>
        <label for="tok">GitHub-nøgle</label>
        <input id="tok" type="password" autocomplete="off" placeholder="ghp_…" value="${esc(state.demo ? '' : state.token)}">
        <details class="more">
          <summary>Flere indstillinger</summary>
          <label for="repo">Repo</label>
          <input id="repo" value="${esc(state.repo)}">
          <label for="branch">Branch</label>
          <input id="branch" value="${esc(state.branch)}">
        </details>
        <div class="actions">
          <button class="btn" id="login" type="button">Log ind</button>
          <a class="btn secondary" href="${esc(base)}">Se siden</a>
        </div>
        <div id="admin-status" class="status ${state.statusKind}">${esc(state.status)}</div>
      </div>`;
  }

  function bindLogin() {
    document.getElementById('login')?.addEventListener('click', async () => {
      state.demo = false;
      state.token = document.getElementById('tok').value.trim();
      state.repo = document.getElementById('repo')?.value.trim() || state.repo;
      state.branch = document.getElementById('branch')?.value.trim() || 'main';
      if (!state.token) return setStatus('Sæt en GitHub-nøgle.', 'err');
      const url = new URL(location.href);
      url.searchParams.delete('demo');
      history.replaceState(null, '', url.pathname + url.search + url.hash);
      saveLocal();
      applyGit();
      state.busy = true;
      try {
        await FMGit.api('');
        await bootData();
        await loadVisits();
        render();
      } catch (err) {
        setStatus(err.message || 'Login fejlede', 'err');
      }
      state.busy = false;
    });
  }

  function shellHtml() {
    const h = HOUSES[state.house];
    const live = state.visits.mode === 'live';
    const ex = live ? '' : '<span class="ex">eksempel</span>';
    const note = state.visits.note ? `<p class="hint visits-note">${esc(state.visits.note)}</p>` : '';
    return `
      <div class="shell">
        <header class="topbar">
          <button class="btn" id="go-new" type="button">${esc(newLabel())}</button>
          <button class="btn secondary menu-btn" id="menu-btn" type="button" aria-expanded="false" aria-controls="main-menu">Menu</button>
        </header>
        <div class="menu" id="main-menu" hidden>
          <a class="btn secondary" href="${esc(base + h.live)}" target="_blank" rel="noopener">Se siden</a>
          <button class="btn secondary" id="logout" type="button">Log ud</button>
          <div class="menu-key">
            <label for="gc-key">Nøgle til besøgstal</label>
            <input id="gc-key" type="password" autocomplete="off" placeholder="Sættes én gang i browseren" value="${esc(state.gcKey)}">
            <button class="btn" id="gc-save" type="button">Hent tal</button>
            <p class="hint">Nøglen bliver kun i denne browser.</p>
          </div>
        </div>
        <nav class="houses" aria-label="Vælg side">
          <button type="button" data-house="fm" class="${state.house === 'fm' ? 'is-on' : ''}">Folkets Medie</button>
          <button type="button" data-house="skandale" class="${state.house === 'skandale' ? 'is-on' : ''}">Politiske skandaler</button>
          <button type="button" data-house="skatte" class="${state.house === 'skatte' ? 'is-on' : ''}">Skattejægeren</button>
        </nav>
        <section class="visits" aria-label="Besøg i alt">
          <p class="kicker">Besøg i alt</p>
          <p class="visits-num">${formatCount(state.visits.total)} ${ex}</p>
        </section>
        ${note}
        <div id="admin-main"></div>
        <div id="admin-status" class="status ${state.statusKind}">${esc(state.status)}</div>
      </div>`;
  }

  function bindShell() {
    const menuBtn = document.getElementById('menu-btn');
    const menu = document.getElementById('main-menu');
    menuBtn?.addEventListener('click', () => {
      const open = menu.hasAttribute('hidden');
      if (open) menu.removeAttribute('hidden');
      else menu.setAttribute('hidden', '');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.getElementById('logout')?.addEventListener('click', () => {
      if (state.demo) {
        state.demo = false;
        state.token = '';
        const url = new URL(location.href);
        url.searchParams.delete('demo');
        history.replaceState(null, '', url.pathname + url.search + url.hash);
        loadLocal();
        state.token = '';
        saveLocal();
        render();
        return;
      }
      state.token = '';
      saveLocal();
      render();
    });
    document.getElementById('gc-save')?.addEventListener('click', async () => {
      state.gcKey = document.getElementById('gc-key').value.trim();
      saveLocal();
      if (state.demo) {
        setStatus('Eksempelvisning. Her hentes ingen tal.', 'err');
        return;
      }
      setStatus('Henter besøgstal…');
      await loadVisits();
      setStatus(
        state.visits.mode === 'live' ? 'Besøgstal opdateret.' : state.visits.note,
        state.visits.mode === 'live' ? 'ok' : 'err'
      );
      render();
    });
    document.getElementById('go-new')?.addEventListener('click', startNew);
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
    const all = mergedArticles();
    const counts = {
      all: all.length,
      draft: all.filter(isDraftArticle).length,
      live: all.filter((a) => !isDraftArticle(a)).length,
    };
    const q = state.q.trim().toLowerCase();
    const list = all.filter((a) => {
      const draft = isDraftArticle(a);
      if (state.fmFilter === 'draft' && !draft) return false;
      if (state.fmFilter === 'live' && draft) return false;
      if (!q) return true;
      return String(a.title || '').toLowerCase().includes(q);
    });
    main.innerHTML = `
      <div class="list-tools">
        ${tabsHtml(counts)}
        <input class="search" id="q" type="search" placeholder="Søg i rubrik" value="${esc(state.q)}" enterkeyhint="search">
      </div>
      <div class="cards" id="alist">
        ${
          list.length
            ? list.map((a) => articleCard(a)).join('')
            : '<p class="hint">Ingen artikler her.</p>'
        }
      </div>`;
    bindListChrome(() => renderFm());
    document.querySelectorAll('#alist [data-slug]').forEach((btn) => {
      btn.addEventListener('click', () => openArticle(btn.dataset.slug));
    });
  }

  function articleCard(a) {
    const img = articleImage(a);
    const thumb = img
      ? `<img src="${esc(img)}" alt="" loading="lazy">`
      : '<span class="thumb-fallback" aria-hidden="true"></span>';
    return `<button type="button" class="story" data-slug="${esc(a.slug)}">
      ${thumb}
      <span class="story-body">
        <span class="story-title">${esc(a.title)}</span>
        <span class="story-meta">${articleBadge(a)}<span class="when">${esc(formatDa(a.date))}</span>${visitHtml(a.slug)}</span>
      </span>
    </button>`;
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
    const tab = state.editorTab === 'preview' ? 'preview' : 'skriv';
    return `
      <div class="editor">
        <div class="card editor-main">
          <div class="actions" style="margin-top:0">
            <button class="btn secondary" id="back" type="button">Tilbage</button>
          </div>
          <label for="a-title">Rubrik</label>
          <input id="a-title" value="${esc(a.title)}">
          <input id="a-slug" type="hidden" value="${esc(a.slug)}">
          <div class="row">
            <div>
              <label for="a-date">Dato</label>
              <input id="a-date" value="${esc(a.date)}">
              <p class="hint">${esc(formatDa(a.date))}</p>
            </div>
            <div>
              <label for="a-excerpt">Uddrag</label>
              <input id="a-excerpt" value="${esc(a.excerpt)}">
            </div>
          </div>
          <div class="filters" role="tablist">
            <button type="button" data-tab="skriv" class="${tab === 'skriv' ? 'is-on' : ''}">Tekst</button>
            <button type="button" data-tab="preview" class="${tab === 'preview' ? 'is-on' : ''}">Forhåndsvisning</button>
          </div>
          <textarea class="body ${tab === 'preview' ? 'is-hidden' : ''}" id="a-content">${esc(a.content)}</textarea>
          <iframe id="a-preview" class="preview-frame ${tab === 'skriv' ? 'is-hidden' : ''}" title="Forhåndsvisning"></iframe>
        </div>
        <div class="card editor-side">
          <h2 class="section">Kladdehjælp</h2>
          <p class="hint">Skriv noter og kilder. Knappen laver et udkast, som du læser, før noget udgives.</p>
          <label for="a-notes">Noter</label>
          <textarea id="a-notes">${esc(a.notes || '')}</textarea>
          <label for="a-sources">Kilder (en adresse pr. linje)</label>
          <textarea id="a-sources">${esc(a.sourcesText || '')}</textarea>
          <div class="actions">
            <button class="btn" id="ai-write" type="button">Skriv kladde</button>
          </div>
          <label for="a-image">Billede</label>
          <input id="a-image" type="file" accept="image/jpeg,image/png,image/webp">
          <p class="hint">${a.featured_image_local || a.featured_image ? 'Billede er sat.' : 'Intet billede endnu.'}</p>
          <div class="actions sticky-actions">
            <button class="btn secondary" id="save-draft" type="button">Gem kladde</button>
            <button class="btn" id="publish" type="button">Udgiv</button>
            <button class="btn secondary" id="hide" type="button">Skjul</button>
          </div>
          <p class="hint">Kladde kommer ikke på forsiden. Udgiv kun når du har læst teksten.</p>
        </div>
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
    return state.article;
  }

  const PREVIEW_CSS = `html,body{margin:0;padding:16px;background:#0a0b0c;color:#c8c4bb;font-family:"DM Sans",system-ui,sans-serif;line-height:1.65}h2,h3{color:#f2f0eb;font-family:Georgia,serif}a{color:#e8b84a}img{max-width:100%}blockquote{border-left:3px solid #e8b84a;margin:0 0 1em;padding:.8rem 1rem;background:rgba(232,184,74,.08)}`;

  function refreshPreview() {
    const iframe = document.getElementById('a-preview');
    const content = document.getElementById('a-content');
    if (!iframe || !content) return;
    iframe.srcdoc = `<!doctype html><html><head><meta charset="utf-8"><style>${PREVIEW_CSS}</style></head><body class="prose">${content.value}</body></html>`;
  }

  function bindFmEditor() {
    document.getElementById('back')?.addEventListener('click', () => {
      stopPoll();
      state.view = 'list';
      render();
    });
    document.getElementById('a-title')?.addEventListener('blur', () => {
      const slug = document.getElementById('a-slug');
      if (slug && !slug.value.trim()) slug.value = slugify(document.getElementById('a-title').value);
    });
    document.querySelectorAll('[data-tab]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.editorTab = btn.dataset.tab;
        const skriv = document.getElementById('a-content');
        const prev = document.getElementById('a-preview');
        document.querySelectorAll('[data-tab]').forEach((b) => b.classList.toggle('is-on', b === btn));
        skriv?.classList.toggle('is-hidden', state.editorTab === 'preview');
        prev?.classList.toggle('is-hidden', state.editorTab === 'skriv');
        if (state.editorTab === 'preview') refreshPreview();
      });
    });
    document.getElementById('a-content')?.addEventListener('input', refreshPreview);
    refreshPreview();
    document.getElementById('ai-write')?.addEventListener('click', runAi);
    document.getElementById('save-draft')?.addEventListener('click', () => saveArticle('draft'));
    document.getElementById('publish')?.addEventListener('click', () => saveArticle('published'));
    document.getElementById('hide')?.addEventListener('click', () => saveArticle('hidden'));
  }

  async function refreshManual() {
    const manualFile = await FMGit.getJson('data/manual.json', { articles: [] });
    state.manual = manualFile.data || { articles: [] };
    if (!Array.isArray(state.manual.articles)) state.manual.articles = [];
    state.manualSha = manualFile.sha;
  }

  async function runAi() {
    if (blockDemo()) return;
    const a = readArticleForm();
    const notes = a.notes || a.title;
    if (!notes.trim()) return setStatus('Skriv noter eller en rubrik, så kladden kan skrives.', 'err');
    if (!a.title) {
      a.title = notes.trim().split('\n')[0].slice(0, 90);
      const t = document.getElementById('a-title');
      if (t) t.value = a.title;
    }
    if (!a.slug) {
      a.slug = slugify(a.title || notes);
      const slugEl = document.getElementById('a-slug');
      if (slugEl) slugEl.value = a.slug;
    }
    setStatus('Bestiller kladde…');
    try {
      await saveArticle('draft');
      const id = `${Date.now()}-${a.slug}`.slice(0, 80);
      const request = {
        id,
        created: new Date().toISOString(),
        house: 'fm',
        slug: a.slug,
        title: a.title || a.slug,
        notes: a.notes,
        sources: a.sourcesText,
        task: FMAI.buildTask(a),
      };
      await FMGit.saveJson(
        `data/ai-requests/open/${id}.json`,
        request,
        `AI-anmodning: ${request.title}`
      );
      setStatus('Kladde er bestilt. Den dukker op her, når den er skrevet. Udgiv den ikke, før du har læst den.', 'ok');
      startPoll(a.slug);
    } catch (err) {
      setStatus(err.message || 'Kunne ikke bestille kladden', 'err');
    }
  }

  function startPoll(slug) {
    stopPoll();
    let n = 0;
    pollTimer = setInterval(async () => {
      n += 1;
      if (n > 40) {
        stopPoll();
        setStatus('Kladdehjælpen svarer ikke endnu. Prøv igen om lidt.', 'err');
        return;
      }
      try {
        await refreshManual();
        const found = (state.manual.articles || []).find((x) => x.slug === slug);
        if (found && found.content && found.content.length > 80) {
          stopPoll();
          const notes = state.article.notes;
          const sourcesText = state.article.sourcesText;
          state.article = { ...blankArticle(), ...found, notes, sourcesText };
          if (state.view === 'edit' && state.house === 'fm') {
            const title = document.getElementById('a-title');
            if (title) {
              title.value = found.title || '';
              document.getElementById('a-slug').value = found.slug || '';
              document.getElementById('a-excerpt').value = found.excerpt || '';
              document.getElementById('a-date').value = found.date || '';
              document.getElementById('a-content').value = found.content || '';
              refreshPreview();
            }
          }
          setStatus('Kladde er klar i felterne. Læs den, ret den, og udgiv kun når du er tilfreds.', 'ok');
        }
      } catch {
        /* prøv igen */
      }
    }, 8000);
  }

  async function saveArticle(status) {
    if (blockDemo()) return;
    const a = readArticleForm();
    if (!a.title || !a.slug) return setStatus('Rubrikken skal udfyldes.', 'err');
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
          ? 'Udgivet. Sitet opdaterer om et øjeblik.'
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
    if (state.demo || state.polList.length) return;
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
    if (!state.demo && !state.polList.length) {
      main.innerHTML = `<div class="card"><p>Henter politikere…</p></div>`;
      try {
        await ensurePoliticians();
      } catch (err) {
        main.innerHTML = `<div class="card"><p class="status err">${esc(err.message)}</p></div>`;
        return;
      }
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
    const all = state.polList;
    const counts = {
      all: all.length,
      live: all.filter((p) => p.live).length,
      draft: all.filter((p) => !p.live).length,
    };
    const q = state.q.trim().toLowerCase();
    const list = all.filter((p) => {
      if (state.fmFilter === 'live' && !p.live) return false;
      if (state.fmFilter === 'draft' && p.live) return false;
      if (!q) return true;
      return `${p.name} ${p.party}`.toLowerCase().includes(q);
    });
    main.innerHTML = `
      <div class="list-tools">
        ${tabsHtml(counts)}
        <input class="search" id="q" type="search" placeholder="Søg i navn" value="${esc(state.q)}" enterkeyhint="search">
      </div>
      <div class="cards" id="plist">
        ${
          list.length
            ? list
                .map(
                  (p) => `<button type="button" class="story" data-slug="${esc(p.slug)}">
                    <span class="thumb-fallback" style="background:${esc(partyColor(p.party))}" aria-hidden="true"></span>
                    <span class="story-body">
                      <span class="story-title">${esc(p.name)}</span>
                      <span class="story-meta">${badge(p.live)}<span>${esc(p.party)}${p.role ? ' · ' + esc(p.role) : ''}</span>${visitHtml(p.slug)}</span>
                    </span>
                  </button>`
                )
                .join('')
            : '<p class="hint">Ingen politikere her.</p>'
        }
      </div>`;
    bindListChrome(() => renderSkandale());
    document.querySelectorAll('#plist [data-slug]').forEach((btn) => {
      btn.addEventListener('click', () => openPolitician(btn.dataset.slug));
    });
  }

  async function openPolitician(slug) {
    if (state.demo) {
      const hit = state.polList.find((p) => p.slug === slug) || {
        slug,
        name: slug,
        party: 'Socialdemokratiet',
        role: '',
        live: false,
      };
      state.politicianSlug = slug;
      state.polCore = { ...blankPolitician(), ...hit, slug };
      state.polLive = !!hit.live;
      state.scandals = [];
      state.promises = [];
      state.view = 'politician';
      render();
      setStatus('');
      return;
    }
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
          <button class="btn secondary" id="back" type="button">Tilbage</button>
        </div>
        <p class="hint">${isNew ? 'Ny politiker' : `Profil: <strong>${esc(p.name || '')}</strong> ${badge(state.polLive)}`}</p>
        <label for="np-name">Navn</label>
        <input id="np-name" value="${esc(p.name)}">
        <input id="np-slug" type="hidden" value="${esc(p.slug)}" ${isNew ? '' : 'data-locked="1"'}>
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
        <label>Billede (rigtigt foto, ikke et opdigtet ansigt)</label>
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
                      <div class="item-meta">${esc(s.year)}</div>
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
                      <div class="item-meta">${esc(s.year)}</div>
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
      if (slug && !slug.dataset.locked && !slug.value.trim()) {
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
    if (blockDemo()) return;
    const p = readPoliticianForm();
    if (!p.name || !p.slug) return setStatus('Navnet skal udfyldes.', 'err');
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
    if (blockDemo()) return;
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
        <p class="hint">Skandale om <strong>${esc(state.polCore.name || 'politikeren')}</strong> ${badge(!!live)}</p>
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
        <p class="hint">Kladde er ikke på sitet. Udgiv, når teksten er læst.</p>
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
    if (blockDemo()) return;
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
    if (blockDemo()) return;
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
      setStatus('Skandalen er skjult.', 'ok');
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
        <p class="hint">Brudt løfte om <strong>${esc(state.polCore.name || 'politikeren')}</strong> ${badge(!!live)}</p>
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
    if (blockDemo()) return;
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
    if (blockDemo()) return;
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
    if (state.demo || (state.casesIndex && state.caseSummaries.length)) return;
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
    if (!state.demo && !state.caseSummaries.length) {
      main.innerHTML = `<div class="card"><p>Henter sager…</p></div>`;
      try {
        await ensureCases();
      } catch (err) {
        main.innerHTML = `<div class="card"><p class="status err">${esc(err.message)}</p></div>`;
        return;
      }
    }
    if (state.view === 'edit') {
      main.innerHTML = caseFormHtml();
      bindCaseForm();
      return;
    }
    const all = state.caseSummaries;
    const isDraft = (s) => s.status === 'draft' || !s.inIndex;
    const counts = {
      all: all.length,
      draft: all.filter(isDraft).length,
      live: all.filter((s) => !isDraft(s)).length,
    };
    const q = state.q.trim().toLowerCase();
    const shown = all.filter((s) => {
      if (state.fmFilter === 'draft' && !isDraft(s)) return false;
      if (state.fmFilter === 'live' && isDraft(s)) return false;
      if (!q) return true;
      return String(s.title || '').toLowerCase().includes(q);
    });
    main.innerHTML = `
      <div class="list-tools">
        ${tabsHtml(counts)}
        <input class="search" id="q" type="search" placeholder="Søg i sag" value="${esc(state.q)}" enterkeyhint="search">
      </div>
      <div class="cards" id="clist">
        ${
          shown.length
            ? shown
                .map(
                  (s) => `<button type="button" class="story" data-slug="${esc(s.slug)}">
                    <span class="thumb-fallback amount">${esc(s.amountLabel || 'Sag')}</span>
                    <span class="story-body">
                      <span class="story-title">${esc(s.title)}</span>
                      <span class="story-meta">${isDraft(s) ? badge(false) : badge(true)}${visitHtml(s.slug)}</span>
                    </span>
                  </button>`
                )
                .join('')
            : '<p class="hint">Ingen sager her.</p>'
        }
      </div>`;
    bindListChrome(() => renderSkatte());
    document.querySelectorAll('#clist [data-slug]').forEach((btn) => {
      btn.addEventListener('click', () => openCase(btn.dataset.slug));
    });
  }

  async function openCase(slug) {
    if (state.demo) {
      const hit = state.caseSummaries.find((s) => s.slug === slug) || {};
      state.caseSha = null;
      state.caseSlug = slug;
      state.caseFile = {
        ...blankCase(),
        ...hit,
        slug,
        status: hit.status || 'draft',
      };
      state.view = 'edit';
      render();
      setStatus('');
      return;
    }
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
          <button class="btn secondary" id="back" type="button">Tilbage</button>
        </div>
        <label for="c-title">Titel</label>
        <input id="c-title" value="${esc(c.title)}">
        <input id="c-slug" type="hidden" value="${esc(c.slug)}">
        <label for="c-status">Status</label>
        <select id="c-status">
          <option value="draft" ${c.status === 'draft' ? 'selected' : ''}>Kladde</option>
          <option value="approved" ${c.status === 'approved' ? 'selected' : ''}>Live</option>
        </select>
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
          <option value="official" ${c.amountKind === 'official' ? 'selected' : ''}>Officielt tal</option>
          <option value="claim" ${c.amountKind === 'claim' ? 'selected' : ''}>Påstand</option>
        </select>
        <label>Kort resumé</label>
        <textarea id="c-sum">${esc(c.summary)}</textarea>
        <label>Vinkel</label>
        <textarea id="c-angle">${esc(c.angle)}</textarea>
        <label>Indledning</label>
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
    if (blockDemo()) return;
    const title = document.getElementById('c-title').value.trim();
    const slug = slugify(document.getElementById('c-slug').value.trim() || title);
    if (!title || !slug) return setStatus('Titlen skal udfyldes.', 'err');
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
          ? 'Sagen er udgivet. Den kommer med, næste gang sitet bygges.'
          : status === 'draft'
            ? 'Kladde gemt. Den er ikke på sitet.'
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
  if (new URLSearchParams(location.search).has('demo')) {
    state.demo = true;
    state.token = 'demo';
    state.fmFilter = 'all';
    state.archive = DEMO_ARTICLES.filter((a) => !isDraftArticle(a));
    state.manual = { articles: DEMO_ARTICLES.filter((a) => isDraftArticle(a)) };
    state.polList = DEMO_POLITICIANS;
    state.caseSummaries = DEMO_CASES;
    state.casesIndex = { slugs: DEMO_CASES.filter((c) => c.inIndex).map((c) => c.slug) };
    state.visits = {
      mode: 'example',
      total: 12480,
      bySlug: {},
      note: 'Eksempeltal. Sæt nøglen i menuen, når denne browser kan hente de rigtige.',
    };
    render();
  } else if (state.token) {
    applyGit();
    bootData()
      .then(() => loadVisits())
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
