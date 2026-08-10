/* ============================================================
   DSA QUEST — Topic page renderer
   ============================================================ */

function qs(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function renderTopicPage() {
  const id = qs("t");
  const topic = getTopicById(id);
  const mount = document.getElementById("topic-mount");
  if (!topic) {
    mount.innerHTML = `<div class="container"><div class="empty-state">
      <h2>Sheet not found</h2><p>That sheet doesn't exist yet. <a href="index.html" style="color:var(--accent)">Back to the index →</a></p>
    </div></div>`;
    return;
  }

  document.title = `${topic.title} — DSA Quest`;

  const all = getAllTopics();
  const order = all.findIndex((t) => t.id === id);
  const prev = order > 0 ? all[order - 1] : null;
  const next = order < all.length - 1 ? all[order + 1] : null;

  mount.innerHTML = `
    <div class="topic-hero container">
      <div class="crumb"><a href="index.html">Index</a> / ${topic.worldTitle} / Sheet ${String(order + 1).padStart(2, "0")}</div>
      <div class="topic-hero-row">
        <div class="topic-hero-icon">${svgIcon(topic.id, 28)}</div>
        <div>
          <h1>${topic.title}</h1>
          <p class="blurb2">${topic.blurb}</p>
        </div>
        <div class="topic-nav-btns">
          ${prev ? `<a href="topic.html?t=${prev.id}">← ${prev.title}</a>` : ""}
          ${next ? `<a href="topic.html?t=${next.id}">${next.title} →</a>` : ""}
        </div>
      </div>
    </div>

    <div class="section container" style="padding-top:26px;">
      <div class="concept-card fade-up">
        <span class="kicker">Field Notes</span>
        <p>${topic.concept}</p>
        <span class="kicker">Recognition Marks</span>
        <ul class="recognize-list">
          ${topic.recognize.map((r) => `<li>${r}</li>`).join("")}
        </ul>
        ${topic.cheatsheet ? `
          <span class="kicker">Reference Sheet</span>
          <div class="cheat-grid">
            ${topic.cheatsheet.map((c) => `<div class="cheat-item"><b>${c.name}</b><span>${c.meaning}</span></div>`).join("")}
          </div>` : ""}
      </div>
    </div>

    ${topic.problems.length ? `
    <div class="section container" style="padding-top:0;">
      <div class="section-head" style="text-align:left; margin-bottom:20px;">
        <span class="index-no mono">§ Practice log</span>
        <h2 style="font-size:1.3rem; margin-top:6px;">${topic.problems.length} problems, easiest → hardest</h2>
        <p>Solve them in order the first time through.</p>
      </div>
      <div class="panel" style="padding:14px;">
        <table class="problem-table" id="problem-table"></table>
      </div>
    </div>` : `
    <div class="section container" style="padding-top:0;">
      <div class="panel empty-state">
        <h3 style="color:var(--ink);">No coding problems on this sheet — it's pure concept.</h3>
        <p>Make sure this clicks before moving on — everything after this builds on it.</p>
        ${next ? `<a href="topic.html?t=${next.id}" class="btn btn-primary" style="margin-top:16px;">Continue to ${next.title} →</a>` : ""}
      </div>
    </div>`}
  `;

  if (topic.problems.length) renderProblemTable(topic.id, topic.problems);
}

function renderProblemTable(topicId, problems) {
  const table = document.getElementById("problem-table");
  table.innerHTML = `
    <thead><tr><th></th><th>Problem</th><th>Difficulty</th><th>Links</th></tr></thead>
    <tbody>
      ${problems.map((p, idx) => {
        const key = `${topicId}__${idx}`;
        const solved = isSolved(key);
        return `
        <tr class="${solved ? "solved" : ""}" data-key="${key}">
          <td><button class="check-btn ${solved ? "done" : ""}" data-key="${key}" data-diff="${p.difficulty}" title="Mark solved">✓</button></td>
          <td>
            <div class="p-title">${p.title} ${p.premium ? `<span class="premium-badge">Premium</span>` : ""}</div>
            <div class="p-tags">${(p.tags || []).map((t) => `<span>${t}</span>`).join("")}</div>
          </td>
          <td><span class="diff ${p.difficulty}">${p.difficulty}</span></td>
          <td>
            <div class="row-actions">
              <a class="solve" href="${p.url}" target="_blank" rel="noopener">Solve →</a>
              ${p.video ? `<a class="video ready" href="${p.video}" target="_blank" rel="noopener">Watch →</a>` : `<span class="video pending">Soon</span>`}
            </div>
          </td>
        </tr>`;
      }).join("")}
    </tbody>
  `;

  table.querySelectorAll(".check-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.key;
      const diff = btn.dataset.diff;
      const nowSolved = toggleSolved(key, diff);
      btn.classList.toggle("done", nowSolved);
      btn.closest("tr").classList.toggle("solved", nowSolved);
      renderNav(null); // refresh XP in nav
      if (nowSolved) {
        toast(`+${XP_MAP[diff]} XP logged`);
        checkNewBadges();
      }
    });
  });
}

function checkNewBadges() {
  const seenKey = "dsaquest_seen_badges";
  let seen = {};
  try { seen = JSON.parse(localStorage.getItem(seenKey) || "{}"); } catch (e) {}
  const badges = getBadges().filter((b) => b.unlocked);
  const fresh = badges.find((b) => !seen[b.id]);
  if (fresh) {
    setTimeout(() => toast(`Stamp earned: ${fresh.name}`), 900);
  }
  badges.forEach((b) => (seen[b.id] = true));
  localStorage.setItem(seenKey, JSON.stringify(seen));
}
