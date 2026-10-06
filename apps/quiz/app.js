(function () {
  const D = window.OEJNE;
  if (!D) {
    document.body.insertAdjacentHTML("beforeend", "<p class='p-4'>data.js mangler.</p>");
    return;
  }

  const $ = (id) => document.getElementById(id);
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((btn) => {
    btn.addEventListener("click", () => show(btn.dataset.tab));
  });

  function show(name) {
    document.querySelectorAll(".panel").forEach((p) => p.classList.add("hidden"));
    $(name).classList.remove("hidden");
    tabs.forEach((b) => {
      const on = b.dataset.tab === name;
      b.setAttribute("aria-selected", on ? "true" : "false");
      b.className = "tab flex-1 py-2 text-sm rounded-lg " + (on ? "bg-moss/20 text-moss" : "text-white/50");
    });
    history.replaceState(null, "", "#" + name);
  }

  let qi = 0;
  let score = 0;
  let locked = false;

  function renderQuiz() {
    const root = $("quiz");
    if (qi >= D.quiz.length) {
      const n = D.quiz.length;
      root.innerHTML = `
        <div class="rounded-2xl border border-white/10 p-5">
          <p class="text-xs uppercase tracking-widest text-moss">Færdig</p>
          <p class="font-serif text-4xl mt-2">${score}/${n}</p>
          <p class="text-white/60 mt-2 text-sm">${score <= 2 ? "De fleste gætter for højt på børn og for lavt på pension." : score <= 4 ? "Du er tættere på end de fleste middagssamtaler." : "Du følger tallene. Del det alligevel — det er pointen."}</p>
          <div class="flex gap-2 mt-5">
            <button id="again" class="flex-1 bg-moss text-paper font-medium py-3 rounded-xl">Prøv igen</button>
            <button id="shareQ" class="flex-1 border border-white/20 py-3 rounded-xl">Del resultat</button>
          </div>
        </div>`;
      $("again") && $("again").addEventListener("click", () => { qi = 0; score = 0; renderQuiz(); });
      $("shareQ") && $("shareQ").addEventListener("click", shareQuiz);
      return;
    }

    const item = D.quiz[qi];
    locked = false;
    root.innerHTML = `
      <p class="text-xs text-white/40 mb-3">${qi + 1} / ${D.quiz.length}</p>
      <h2 class="font-serif text-2xl leading-snug mb-5">${esc(item.q)}</h2>
      <div class="grid gap-2" id="choices"></div>
      <div id="explain" class="hidden mt-5 text-sm leading-relaxed text-white/70"></div>`;

    item.choices.forEach((c, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "text-left px-4 py-3 rounded-xl border border-white/15 hover:border-moss/60";
      b.textContent = c;
      b.addEventListener("click", () => pick(i, item));
      $("choices").appendChild(b);
    });
  }

  function pick(i, item) {
    if (locked) return;
    locked = true;
    const buttons = [...$("choices").children];
    buttons.forEach((b, idx) => {
      b.disabled = true;
      if (idx === item.answer) b.className += " border-moss bg-moss/15";
      else if (idx === i) b.className += " border-red-400/50 bg-red-400/10";
    });
    if (i === item.answer) score += 1;
    const box = $("explain");
    box.classList.remove("hidden");
    box.innerHTML = `<p>${esc(item.explain)}</p>
      <p class="mt-2 text-xs text-white/40">Kilde: <a class="underline text-rust" href="${esc(item.sourceUrl)}" target="_blank" rel="noopener">${esc(item.source)}</a></p>
      <button id="nextQ" class="mt-4 w-full bg-moss text-paper font-medium py-3 rounded-xl">${qi + 1 === D.quiz.length ? "Se resultat" : "Næste"}</button>`;
    $("nextQ").addEventListener("click", () => { qi += 1; renderQuiz(); });
  }

  function shareQuiz() {
    const t = `Jeg ramte ${score}/${D.quiz.length} i Åbn øjnene — gæt Danmarks tal.`;
    if (navigator.share) navigator.share({ title: "Åbn øjnene", text: t, url: location.href }).catch(() => copy(t));
    else copy(t);
  }

  function renderBudget() {
    const root = $("budget");
    const items = D.budget.items;
    root.innerHTML = `
      <h2 class="font-serif text-2xl mb-1">Du har 100 kroner</h2>
      <p class="text-sm text-white/55 mb-5">${esc(D.budget.totalNote)} Fordel dem. Bagefter ser du finanslovens fordeling.</p>
      <p id="left" class="text-moss text-sm mb-3"></p>
      <div id="sliders" class="space-y-4"></div>
      <button id="lockB" class="mt-6 w-full bg-moss text-paper font-medium py-3 rounded-xl">Sammenlign med staten</button>
      <div id="bResult" class="hidden mt-6 space-y-3"></div>
      <p class="mt-4 text-xs text-white/35">${esc(D.budget.source)}</p>`;

    items.forEach((it) => {
      const wrap = document.createElement("div");
      wrap.innerHTML = `
        <div class="flex justify-between text-sm mb-1">
          <label for="s-${it.id}">${esc(it.name)}</label>
          <span id="v-${it.id}">0 kr</span>
        </div>
        <input id="s-${it.id}" type="range" min="0" max="100" value="0" class="w-full accent-moss" />
        <p class="text-xs text-white/35">${esc(it.hint)}</p>`;
      $("sliders").appendChild(wrap);
      wrap.querySelector("input").addEventListener("input", updateLeft);
    });
    updateLeft();
    $("lockB").addEventListener("click", showOfficial);
  }

  function vals() {
    return D.budget.items.map((it) => ({ ...it, you: Number($("s-" + it.id).value) }));
  }

  function updateLeft() {
    const used = vals().reduce((a, x) => a + x.you, 0);
    const left = 100 - used;
    $("left").textContent = left === 0 ? "0 kr tilbage — klar." : left > 0 ? left + " kr tilbage" : Math.abs(left) + " kr over budget";
    D.budget.items.forEach((it) => { $("v-" + it.id).textContent = $("s-" + it.id).value + " kr"; });
  }

  function showOfficial() {
    const rows = vals();
    const used = rows.reduce((a, x) => a + x.you, 0);
    const box = $("bResult");
    box.classList.remove("hidden");
    box.innerHTML = rows.map((r) => {
      const d = r.you - r.official;
      const word = d === 0 ? "ramte" : d > 0 ? "+" + d + " kr ift. staten" : d + " kr ift. staten";
      return `<div>
        <div class="flex justify-between text-xs mb-1"><span>${esc(r.name)}</span><span class="text-white/50">${word}</span></div>
        <div class="h-2 bg-white/10 rounded-full overflow-hidden relative">
          <div class="bar h-full bg-white/25 absolute" style="width:${r.you}%"></div>
          <div class="bar h-full bg-moss absolute opacity-80" style="width:${r.official}%"></div>
        </div>
        <p class="text-[11px] text-white/40 mt-1">Dig ${r.you} · Staten ${r.official}</p>
      </div>`;
    }).join("") + `<p class="text-sm text-white/60 pt-2">Du brugte ${used} af 100 kr. Grøn streg = finansloven (afrundet).</p>
      <p class="text-xs"><a class="underline text-rust" href="${esc(D.budget.sourceUrl)}" target="_blank" rel="noopener">Åbn finansloven</a></p>`;
    box.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function renderDaily() {
    const d = D.daily;
    $("daily").innerHTML = `
      <p class="text-xs uppercase tracking-widest text-moss">${esc(d.date)}</p>
      <p class="text-sm text-white/50 mt-2">${esc(d.label)}</p>
      <p class="font-serif text-6xl leading-none mt-3">${esc(d.value)}</p>
      <p class="text-sm text-white/50 mt-2">${esc(d.unit)}</p>
      <p class="mt-5 text-sm leading-relaxed text-white/75">${esc(d.text)}</p>
      <p class="mt-4 text-xs text-white/40">Kilde: <a class="underline text-rust" href="${esc(d.sourceUrl)}" target="_blank" rel="noopener">${esc(d.source)}</a></p>
      <button id="shareD" class="mt-6 w-full border border-white/20 py-3 rounded-xl">Del dagens tal</button>`;
    $("shareD").addEventListener("click", () => {
      const t = `${d.label}: ${d.value}. ${d.text}`;
      if (navigator.share) navigator.share({ title: "Dagens tal", text: t, url: location.href }).catch(() => copy(t));
      else copy(t);
    });
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function copy(t) {
    navigator.clipboard.writeText(t).then(() => alert("Kopieret")).catch(() => alert(t));
  }

  renderQuiz();
  renderBudget();
  renderDaily();
  const hash = (location.hash || "#quiz").slice(1);
  show(["quiz", "budget", "daily"].includes(hash) ? hash : "quiz");
})();
