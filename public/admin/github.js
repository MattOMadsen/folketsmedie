/* global FMGit */
window.FMGit = {
  token: '',
  repo: 'MattOMadsen/folketsmedie',
  branch: 'main',

  headers() {
    return {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${this.token}`,
      'X-GitHub-Api-Version': '2022-11-28',
    };
  },

  encPath(path) {
    return String(path)
      .replace(/^\/+/, '')
      .split('/')
      .map(encodeURIComponent)
      .join('/');
  },

  encode(text) {
    return btoa(unescape(encodeURIComponent(text)));
  },

  decode(b64) {
    return decodeURIComponent(escape(atob(String(b64 || '').replace(/\n/g, ''))));
  },

  async api(path, opts = {}) {
    const url = `https://api.github.com/repos/${this.repo}${path || ''}`;
    const res = await fetch(url, {
      ...opts,
      headers: { ...this.headers(), ...(opts.headers || {}) },
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      const msg = body.message || `GitHub HTTP ${res.status}`;
      const err = new Error(msg);
      err.status = res.status;
      err.body = body;
      throw err;
    }
    return body;
  },

  async getFile(path) {
    const meta = await this.api(`/contents/${this.encPath(path)}?ref=${encodeURIComponent(this.branch)}`);
    let text = '';
    if (meta.content) {
      text = this.decode(meta.content);
    } else if (meta.sha) {
      const blob = await this.api(`/git/blobs/${meta.sha}`);
      text = this.decode(blob.content);
    }
    return { sha: meta.sha, text, path: meta.path };
  },

  async getJson(path, fallback = null) {
    try {
      const file = await this.getFile(path);
      return { sha: file.sha, data: file.text ? JSON.parse(file.text) : fallback };
    } catch (err) {
      if (err.status === 404) return { sha: null, data: fallback };
      throw err;
    }
  },

  async putText(path, text, sha, message) {
    const payload = {
      message,
      content: this.encode(text),
      branch: this.branch,
    };
    if (sha) payload.sha = sha;
    return this.api(`/contents/${this.encPath(path)}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  async putJson(path, data, sha, message) {
    return this.putText(path, `${JSON.stringify(data, null, 2)}\n`, sha, message);
  },

  async putBase64(path, b64, sha, message) {
    const payload = {
      message,
      content: String(b64).replace(/^data:[^;]+;base64,/, '').replace(/\s/g, ''),
      branch: this.branch,
    };
    if (sha) payload.sha = sha;
    return this.api(`/contents/${this.encPath(path)}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  async rawJson(path) {
    // Ingen Authorization: den header udløser CORS-preflight, som raw.githubusercontent.com afviser.
    const url = `https://raw.githubusercontent.com/${this.repo}/${this.branch}/${path}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Kunne ikke hente ${path} (${res.status})`);
    return res.json();
  },

  async listDir(path) {
    try {
      const meta = await this.api(
        `/contents/${this.encPath(path)}?ref=${encodeURIComponent(this.branch)}`
      );
      return Array.isArray(meta) ? meta : [];
    } catch (err) {
      if (err.status === 404) return [];
      throw err;
    }
  },

  /** Hent sha (hvis filen findes) og skriv JSON. */
  async saveJson(path, data, message) {
    const cur = await this.getJson(path, null);
    return this.putJson(path, data, cur.sha, message);
  },
};
