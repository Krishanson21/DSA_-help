/* ============================================================
   DSA QUEST — Hero schematic (Canvas2D, no external libs)
   A small graph diagram that "drafts" itself: edges trace in
   like a pen plotting a circuit, nodes settle in, on loop.
   Colors are read from CSS variables so it follows theme.
   ============================================================ */

(function initBlueprintHero() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let w, h, dpr;
  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = rect.width; h = rect.height;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);

  // fixed node layout (relative 0-1 coords) so it reads as one deliberate diagram, not random noise
  const NODES = [
    [0.12, 0.22], [0.32, 0.14], [0.55, 0.24], [0.78, 0.15], [0.9, 0.35],
    [0.2, 0.5], [0.45, 0.48], [0.68, 0.52], [0.85, 0.62],
    [0.14, 0.78], [0.38, 0.82], [0.6, 0.78], [0.82, 0.86],
  ];
  const EDGES = [
    [0,1],[1,2],[2,3],[3,4],[1,5],[2,6],[6,7],[7,8],[3,7],
    [5,6],[5,9],[6,10],[9,10],[10,11],[7,11],[11,12],[8,12],
  ];

  function cssVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  let t0 = null;
  const DRAW_DURATION = 3200; // ms for the full trace-in
  const HOLD = 2200; // ms fully drawn before looping
  const CYCLE = DRAW_DURATION + HOLD + 900;

  function ease(x) { return 1 - Math.pow(1 - x, 3); }

  function frame(ts, forceFull) {
    if (t0 === null) t0 = ts;
    const elapsed = forceFull ? DRAW_DURATION : (ts - t0) % CYCLE;
    const lineCol = cssVar("--ink-faint") || "#56728f";
    const nodeCol = cssVar("--ink-dim") || "#8aa3bd";
    const accent = cssVar("--accent") || "#d9924a";
    const gridCol = cssVar("--grid-line") || "rgba(255,255,255,.05)";

    ctx.clearRect(0, 0, w, h);

    // faint measurement ticks along the top/left edge (title-block feel)
    ctx.strokeStyle = gridCol;
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 24) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 6); ctx.stroke(); }

    const drawProgress = Math.min(elapsed / DRAW_DURATION, 1);
    const edgeCount = EDGES.length;

    EDGES.forEach(([a, b], i) => {
      const start = i / edgeCount;
      const local = Math.max(0, Math.min(1, (drawProgress - start * 0.7) / 0.3));
      if (local <= 0) return;
      const p1 = NODES[a], p2 = NODES[b];
      const x1 = p1[0] * w, y1 = p1[1] * h, x2 = p2[0] * w, y2 = p2[1] * h;
      const ex = x1 + (x2 - x1) * ease(local);
      const ey = y1 + (y2 - y1) * ease(local);
      ctx.strokeStyle = lineCol;
      ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(ex, ey); ctx.stroke();
    });

    NODES.forEach((p, i) => {
      const start = (i / NODES.length) * 0.6;
      const local = Math.max(0, Math.min(1, (drawProgress - start) / 0.25));
      if (local <= 0) return;
      const x = p[0] * w, y = p[1] * h;
      const r = 3.2 * ease(local);
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = i % 4 === 0 ? accent : nodeCol;
      ctx.fill();
      if (i % 4 === 0) {
        ctx.strokeStyle = accent; ctx.lineWidth = 1; ctx.beginPath();
        ctx.arc(x, y, r + 4, 0, Math.PI * 2); ctx.stroke();
      }
    });

    if (!reduceMotion) requestAnimationFrame(frame);
  }

  if (reduceMotion) {
    frame(0, true); // draw the fully-settled diagram once, no animation loop
  } else {
    requestAnimationFrame(frame);
  }

  document.addEventListener("dsaquest:theme-changed", () => { /* colors re-read each frame automatically */ });
})();
