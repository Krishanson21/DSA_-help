/* ============================================================
   DSA QUEST — All Problems page: search + filter across everything
   ============================================================ */

let PROBLEMS_STATE = { q: "", topic: "all", diff: "all", status: "all" };

function initProblemsPage() {
  const topics = getAllTopics();
  const topicSelect = document.getElementById("f-topic");
  topicSelect.innerHTML = `<option value="all">All Topics</option>` +
    topics.filter((t) => t.problems.length).map((t) => `<option value="${t.id}">${t.title}</option>`).join("");

  document.getElementById("f-search").addEventListener("input", (e) => {
    PROBLEMS_STATE.q = e.target.value.toLowerCase();
    renderProblemsList();
  });
  topicSelect.addEventListener("change", (e) => {
    PROBLEMS_STATE.topic = e.target.value;
    renderProblemsList();
  });
  document.querySelectorAll("[data-diff]").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll("[data-diff]").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      PROBLEMS_STATE.diff = chip.dataset.diff;
      renderProblemsList();
    });
  });
  document.querySelectorAll("[data-status]").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll("[data-status]").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      PROBLEMS_STATE.status = chip.dataset.status;
      renderProblemsList();
    });
  });

  renderProblemsList();
}

function renderProblemsList() {
  const all = getAllProblems();
  const filtered = all.filter((p) => {
    if (PROBLEMS_STATE.q && !p.title.toLowerCase().includes(PROBLEMS_STATE.q) && !(p.tags || []).some(t => t.toLowerCase().includes(PROBLEMS_STATE.q))) return false;
    if (PROBLEMS_STATE.topic !== "all" && p.topicId !== PROBLEMS_STATE.topic) return false;
    if (PROBLEMS_STATE.diff !== "all" && p.difficulty !== PROBLEMS_STATE.diff) return false;
    const solved = isSolved(p.key);
    if (PROBLEMS_STATE.status === "solved" && !solved) return false;
    if (PROBLEMS_STATE.status === "unsolved" && solved) return false;
    return true;
  });

  const countEl = document.getElementById("result-count");
  if (countEl) countEl.textContent = `${filtered.length} of ${all.length} problems`;

  const table = document.getElementById("problem-table");
  if (!filtered.length) {
    table.innerHTML = `<tr><td class="empty-state">No problems match your filters.</td></tr>`;
    return;
  }

  table.innerHTML = `
    <thead><tr><th></th><th>Problem</th><th>Topic</th><th>Difficulty</th><th>Links</th></tr></thead>
    <tbody>
      ${filtered.map((p) => {
        const solved = isSolved(p.key);
        return `
        <tr class="${solved ? "solved" : ""}" data-key="${p.key}">
          <td><button class="check-btn ${solved ? "done" : ""}" data-key="${p.key}" data-diff="${p.difficulty}">✓</button></td>
          <td>
            <div class="p-title">${p.title} ${p.premium ? `<span class="premium-badge">Premium</span>` : ""}</div>
            <div class="p-tags">${(p.tags || []).map((t) => `<span>${t}</span>`).join("")}</div>
          </td>
          <td><a href="topic.html?t=${p.topicId}" class="mono" style="color:var(--ink-dim); font-size:.78rem;">${p.topicTitle}</a></td>
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
      const nowSolved = toggleSolved(btn.dataset.key, btn.dataset.diff);
      renderNav(null);
      if (nowSolved) toast(`+${XP_MAP[btn.dataset.diff]} XP logged`);
      renderProblemsList();
    });
  });
}
