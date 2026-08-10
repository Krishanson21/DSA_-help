/* ============================================================
   DSA QUEST — Line-icon system
   Hand-drawn 24x24 schematic glyphs, one per topic/world.
   No emoji, no icon font, no external assets — just geometry
   that echoes each pattern's actual shape (a window for
   Sliding Window, a halving bracket for Binary Search, etc).
   ============================================================ */

const ICONS = {
  // ---- worlds ----
  foundations: `<line x1="4" y1="18" x2="20" y2="18"/><line x1="7" y1="18" x2="7" y2="13"/><line x1="12" y1="18" x2="12" y2="10"/><line x1="17" y1="18" x2="17" y2="13"/>`,
  "core-patterns": `<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2.4"/>`,
  mastery: `<path d="M4 17 L10 8 L14 13 L20 5" fill="none"/><path d="M15 5 L20 5 L20 10" fill="none"/>`,

  // ---- topics ----
  "big-o": `<circle cx="12" cy="12" r="8"/><line x1="12" y1="12" x2="12" y2="6.5"/><line x1="12" y1="12" x2="16" y2="12"/>`,
  "arrays-hashing": `<rect x="2.5" y="9" width="4" height="6"/><rect x="8" y="9" width="4" height="6"/><rect x="13.5" y="9" width="4" height="6"/><rect x="19" y="9" width="2.5" height="6"/>`,
  "two-pointers": `<line x1="3" y1="12" x2="21" y2="12"/><path d="M8 8 L4 12 L8 16"/><path d="M16 8 L20 12 L16 16"/>`,
  "sliding-window": `<circle cx="4" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="8.5" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="13" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="17.5" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="21" cy="12" r="1.3" fill="currentColor" stroke="none"/><rect x="6" y="6.5" width="9" height="11" />`,
  stack: `<rect x="4" y="5.5" width="16" height="4"/><rect x="4" y="10.5" width="16" height="4"/><rect x="4" y="15.5" width="16" height="4"/>`,
  "binary-search": `<line x1="3" y1="12" x2="21" y2="12"/><line x1="12" y1="7" x2="12" y2="17"/><line x1="6.5" y1="9.5" x2="6.5" y2="14.5" opacity="0.4"/><line x1="17.5" y1="9.5" x2="17.5" y2="14.5" opacity="0.4"/>`,
  "linked-list": `<circle cx="4.5" cy="12" r="2.3"/><circle cx="12" cy="12" r="2.3"/><circle cx="19.5" cy="12" r="2.3"/><line x1="6.8" y1="12" x2="9.7" y2="12"/><line x1="14.3" y1="12" x2="17.2" y2="12"/>`,
  trees: `<circle cx="12" cy="5.5" r="2.1"/><circle cx="6" cy="17" r="2.1"/><circle cx="18" cy="17" r="2.1"/><line x1="10.7" y1="7.1" x2="7.2" y2="15.3"/><line x1="13.3" y1="7.1" x2="16.8" y2="15.3"/>`,
  tries: `<circle cx="12" cy="4.5" r="1.8"/><circle cx="6" cy="12" r="1.8"/><circle cx="18" cy="12" r="1.8"/><circle cx="6" cy="19.5" r="1.8"/><line x1="10.8" y1="5.8" x2="7.4" y2="10.6"/><line x1="13.2" y1="5.8" x2="16.6" y2="10.6"/><line x1="6" y1="13.8" x2="6" y2="17.6"/>`,
  heap: `<path d="M12 5 L20 18 H4 Z"/><circle cx="12" cy="5" r="1.6" fill="currentColor" stroke="none"/>`,
  backtracking: `<path d="M6 19 V12 L16 12 V6"/><path d="M6 12 L16 19"/><line x1="14.3" y1="17.3" x2="17.7" y2="20.7"/><line x1="17.7" y1="17.3" x2="14.3" y2="20.7"/>`,
  intervals: `<line x1="3" y1="12" x2="21" y2="12"/><line x1="5" y1="9" x2="5" y2="15" opacity="0.5"/><line x1="19" y1="9" x2="19" y2="15" opacity="0.5"/><line x1="5" y1="8.5" x2="13" y2="8.5"/><line x1="10" y1="15.5" x2="19" y2="15.5"/>`,
  greedy: `<rect x="3.5" y="14" width="3.4" height="6"/><rect x="9" y="10" width="3.4" height="10"/><rect x="14.5" y="6" width="3.4" height="14"/><path d="M15 3.5 L20 3.5 L20 8.5"/>`,
  graphs: `<circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="16" cy="15" r="2"/><line x1="6.8" y1="6.9" x2="17.2" y2="6.9"/><line x1="5" y1="8" x2="5" y2="16"/><line x1="6.6" y1="17.1" x2="14.4" y2="15.6"/>`,
  "advanced-graphs": `<circle cx="5" cy="6" r="2"/><circle cx="19" cy="8" r="2"/><circle cx="6" cy="18" r="2"/><line x1="6.9" y1="6.5" x2="17.1" y2="7.7"/><line x1="5.4" y1="8" x2="6" y2="16"/><text x="10" y="5" font-size="6" fill="currentColor" stroke="none" font-family="monospace">7</text>`,
  "dp-1d": `<rect x="2.5" y="10" width="3.6" height="5"/><rect x="7" y="10" width="3.6" height="5" fill="currentColor"/><rect x="11.4" y="10" width="3.6" height="5"/><rect x="15.8" y="10" width="3.6" height="5" fill="currentColor"/><rect x="20.2" y="10" width="1.3" height="5"/>`,
  "dp-2d": `<rect x="3.5" y="3.5" width="17" height="17"/><line x1="3.5" y1="9.2" x2="20.5" y2="9.2"/><line x1="3.5" y1="14.9" x2="20.5" y2="14.9"/><line x1="9.2" y1="3.5" x2="9.2" y2="20.5"/><line x1="14.9" y1="3.5" x2="14.9" y2="20.5"/>`,
  "bit-manipulation": `<rect x="2.5" y="10" width="3" height="4" fill="currentColor" stroke="none"/><rect x="6.5" y="10" width="3" height="4"/><rect x="10.5" y="10" width="3" height="4"/><rect x="14.5" y="10" width="3" height="4" fill="currentColor" stroke="none"/><rect x="18.5" y="10" width="3" height="4" fill="currentColor" stroke="none"/>`,
  "math-geometry": `<path d="M4 19 L12 4 L20 19 Z"/><line x1="8" y1="19" x2="12" y2="11.5"/>`,
};

function svgIcon(key, size = 22, strokeWidth = 1.6) {
  const inner = ICONS[key] || ICONS["big-o"];
  return `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
}

window.svgIcon = svgIcon;
