/* ============================================================
   DSA QUEST — Shared app logic
   Progress storage, XP/level engine, nav, footer, tilt effects.
   ============================================================ */

const STORAGE_KEY = "dsaquest_progress_v3";
const XP_MAP = { Easy: 10, Medium: 20, Hard: 30 };
const XP_PER_LEVEL = 120;
const LEVEL_TITLES = [
  "Novice Coder", "Pattern Seeker", "Array Adept", "Loop Breaker", "Window Warrior",
  "Stack Sage", "Search Specialist", "List Slinger", "Tree Tactician", "Trie Trailblazer",
  "Heap Hero", "Backtrack Baron", "Interval Illusionist", "Greedy Grandmaster",
  "Graph Guru", "DP Deity", "Bit Bender", "Algorithm Architect", "DSA Legend",
];

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { solved: {}, notes: {}, activity: {}, badges: {} };
    const parsed = JSON.parse(raw);
    return {
      solved: parsed.solved || {},
      notes: parsed.notes || {},
      activity: parsed.activity || {},
      badges: parsed.badges || {},
    };
  } catch (e) {
    return { solved: {}, notes: {}, activity: {}, badges: {} };
  }
}

function saveProgress(p) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function isSolved(key) {
  return !!loadProgress().solved[key];
}

function toggleSolved(key, difficulty) {
  const p = loadProgress();
  const wasSolved = !!p.solved[key];
  if (wasSolved) {
    delete p.solved[key];
  } else {
    p.solved[key] = { difficulty, at: Date.now() };
    p.activity[todayStr()] = true;
  }
  saveProgress(p);
  return !wasSolved;
}

function saveNote(key, text) {
  const p = loadProgress();
  if (text && text.trim()) p.notes[key] = text;
  else delete p.notes[key];
  saveProgress(p);
}

function getNote(key) {
  return loadProgress().notes[key] || "";
}

/* ---------------- XP / Level engine ---------------- */
function computeStats() {
  const p = loadProgress();
  const all = getAllProblems();
  const totalProblems = all.length;
  let xp = 0;
  let solvedCount = 0;
  for (const key in p.solved) {
    const diff = p.solved[key].difficulty;
    xp += XP_MAP[diff] || 10;
    solvedCount++;
  }
  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const xpIntoLevel = xp % XP_PER_LEVEL;
  const title = LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)];
  const streak = computeStreak(p.activity);
  return {
    xp, level, xpIntoLevel, xpForNext: XP_PER_LEVEL, title,
    solvedCount, totalProblems,
    pct: totalProblems ? Math.round((solvedCount / totalProblems) * 100) : 0,
    streak,
  };
}

function computeStreak(activity) {
  let streak = 0;
  const d = new Date();
  for (let i = 0; i < 400; i++) {
    const key = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    if (activity[key]) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else if (i === 0) {
      // today not done yet — don't break streak, just don't count it
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

function topicStats(topicId) {
  const topic = getTopicById(topicId);
  if (!topic) return { solved: 0, total: 0, pct: 0 };
  const p = loadProgress();
  let solved = 0;
  topic.problems.forEach((_, idx) => {
    if (p.solved[`${topicId}__${idx}`]) solved++;
  });
  const total = topic.problems.length;
  return { solved, total, pct: total ? Math.round((solved / total) * 100) : 0 };
}

/* ---------------- Badges (rendered as inspection stamps) ---------------- */
const BADGE_DEFS = [
  { id: "first-blood", code: "1ST", name: "First Blood", desc: "Solve your first problem", test: (s) => s.solvedCount >= 1 },
  { id: "ten", code: "10", name: "Warming Up", desc: "Solve 10 problems", test: (s) => s.solvedCount >= 10 },
  { id: "fifty", code: "50", name: "Half Century", desc: "Solve 50 problems", test: (s) => s.solvedCount >= 50 },
  { id: "hundred", code: "100", name: "Centurion", desc: "Solve 100 problems", test: (s) => s.solvedCount >= 100 },
  { id: "all", code: "ALL", name: "Grandmaster", desc: "Complete every problem", test: (s) => s.totalProblems > 0 && s.solvedCount >= s.totalProblems },
  { id: "streak3", code: "3-D", name: "Consistent", desc: "3-day solving streak", test: (s) => s.streak >= 3 },
  { id: "streak7", code: "7-D", name: "Unstoppable", desc: "7-day solving streak", test: (s) => s.streak >= 7 },
  { id: "lvl5", code: "LV5", name: "Rising Star", desc: "Reach Level 5", test: (s) => s.level >= 5 },
  { id: "lvl10", code: "LV10", name: "Elite", desc: "Reach Level 10", test: (s) => s.level >= 10 },
  { id: "foundations", code: "I", name: "Solid Foundations", desc: "Finish all of Volume I", test: () => tierComplete("beginner") },
  { id: "core", code: "II", name: "Pattern Master", desc: "Finish all of Volume II", test: () => tierComplete("intermediate") },
  { id: "mastery", code: "III", name: "True Mastery", desc: "Finish all of Volume III", test: () => tierComplete("advanced") },
];

function tierComplete(tier) {
  const world = CURRICULUM.find((w) => w.tier === tier);
  if (!world) return false;
  const p = loadProgress();
  for (const topic of world.topics) {
    if (topic.problems.length === 0) continue;
    for (let i = 0; i < topic.problems.length; i++) {
      if (!p.solved[`${topic.id}__${i}`]) return false;
    }
  }
  return true;
}

function getBadges() {
  const s = computeStats();
  return BADGE_DEFS.map((b) => ({ ...b, unlocked: b.test(s) }));
}

/* ---------------- Theme toggle ---------------- */
function getStoredTheme() {
  try { return localStorage.getItem("dsaquest_theme") || ""; } catch (e) { return ""; }
}
function applyTheme(theme) {
  if (theme === "dark" || theme === "light") document.documentElement.setAttribute("data-theme", theme);
  else document.documentElement.removeAttribute("data-theme");
}
function toggleTheme() {
  const current = getStoredTheme() || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const next = current === "dark" ? "light" : "dark";
  localStorage.setItem("dsaquest_theme", next);
  applyTheme(next);
}
applyTheme(getStoredTheme());

/* ---------------- Nav / Footer ---------------- */
function renderNav(active) {
  const mount = document.getElementById("nav-mount");
  if (!mount) return;
  const stats = computeStats();
  const links = [
    { href: "index.html", label: "Roadmap" },
    { href: "problems.html", label: "Index" },
    { href: "progress.html", label: "Progress" },
    { href: "about.html", label: "Guide" },
  ];
  mount.innerHTML = `
    <nav class="nav">
      <div class="nav-inner">
        <a href="index.html" class="brand"><span class="brand-mark">DQ</span> DSA&nbsp;Quest</a>
        <ul class="nav-links" id="nav-links">
          ${links.map((l) => `<li><a href="${l.href}" class="${active === l.href ? "active" : ""}">${l.label}</a></li>`).join("")}
        </ul>
        <div class="nav-right">
          <span class="nav-xp">LV <b>${stats.level}</b> &middot; ${stats.xp} XP</span>
          <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme" title="Toggle light/dark">◐</button>
          <button class="nav-toggle" id="nav-toggle" aria-label="Menu">≡</button>
        </div>
      </div>
    </nav>`;
  const toggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");
  if (toggle) toggle.addEventListener("click", () => navLinks.classList.toggle("open"));
  const themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
}

function renderFooter() {
  const mount = document.getElementById("footer-mount");
  if (!mount) return;
  mount.innerHTML = `
    <footer>
      <div class="footer-inner">
        <div><b>DSA QUEST</b> — a field manual for algorithmic patterns, one sheet at a time.</div>
        <div style="display:flex; gap:18px; flex-wrap:wrap;">
          <a href="index.html">Roadmap</a>
          <a href="problems.html">Index</a>
          <a href="progress.html">Progress</a>
          <a href="about.html">Guide</a>
        </div>
      </div>
    </footer>`;
}

/* ---------------- Toast ---------------- */
function toast(msg) {
  let el = document.getElementById("app-toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "app-toast";
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove("show"), 2200);
}

/* ---------------- Roadmap: sheet index (index page) ---------------- */
const VOL_NUMERAL = { beginner: "VOL. I", intermediate: "VOL. II", advanced: "VOL. III" };

function renderSkillTree(mountId) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  let sheetNo = 0;
  mount.innerHTML = CURRICULUM.map((world, wi) => `
    <div class="volume-block fade-up" style="animation-delay:${wi * 0.05}s">
      <div class="volume-head">
        <span class="vol-no">${VOL_NUMERAL[world.tier] || world.world}</span>
        <h3>${world.worldTitle}</h3>
        <p>${world.worldBlurb}</p>
      </div>
      ${world.topics.map((t) => {
        sheetNo++;
        const st = topicStats(t.id);
        const done = st.total > 0 && st.pct >= 100;
        return `
        <a class="sheet-row" href="topic.html?t=${t.id}">
          <span class="sheet-no mono">${String(sheetNo).padStart(2, "0")}</span>
          <span class="sheet-icon">${svgIcon(t.id, 22)}</span>
          <span class="sheet-main">
            <h4>${t.title}</h4>
            <p>${t.blurb}</p>
          </span>
          ${done ? `<span class="sheet-stamp">Closed</span>` : `<span></span>`}
          <span class="sheet-progress">
            ${st.total > 0 ? `${st.solved}/${st.total}` : "Concept"}
            ${st.total > 0 ? `<span class="sheet-progress-bar"><span class="sheet-progress-fill" style="width:${st.pct}%"></span></span>` : ""}
          </span>
        </a>`;
      }).join("")}
    </div>
  `).join("");
}

/* ---------------- Title-block readout (index hero) ---------------- */
function renderStatStrip(mountId) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  const s = computeStats();
  mount.innerHTML = `
    <div class="readout-cell"><b>${s.solvedCount}/${s.totalProblems}</b><span>Solved</span></div>
    <div class="readout-cell"><b>${s.level}</b><span>Level</span></div>
    <div class="readout-cell"><b>${s.xp}</b><span>Total XP</span></div>
    <div class="readout-cell"><b>${s.streak}</b><span>Day streak</span></div>
  `;
}
