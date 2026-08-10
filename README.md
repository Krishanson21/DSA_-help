# DSA Quest

A structured, gamified DSA learning site — beginner → intermediate → advanced, organized by
**pattern** (not by random problem number), with XP/levels, streaks, badges, and a spot for your
own YouTube walkthroughs next to every problem.

No build step. No framework. Open `index.html` in a browser, or drop the whole folder on any
static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages — all free, all drag-and-drop).

## Structure

```
index.html        Home page — hero + full skill-tree roadmap
topic.html         Renders one topic (?t=arrays-hashing) — concept lesson + problem list
problems.html      Master list of every problem — search & filter
progress.html      XP/level dashboard, per-topic bars, badges
about.html         "How to use this course" study guide for learners
css/style.css      All styling (one file, CSS variables at the top for theme colors)
js/data.js         ⭐ THE CURRICULUM — every topic, concept, and problem lives here
js/app.js          Progress tracking (localStorage), XP/level engine, nav, shared UI
js/topic.js        Topic page rendering logic
js/problems.js     All-problems page rendering logic
js/bg3d.js         Three.js particle-graph background on the homepage hero
```

## Adding your YouTube videos

Open `js/data.js`. Every problem is an object like:

```js
{ title: "Two Sum", difficulty: "Easy", url: "https://leetcode.com/problems/two-sum/", video: "", tags: ["hash map"] }
```

Find the problem and set `video` to your YouTube URL:

```js
video: "https://youtu.be/dQw4w9WgXcQ"
```

Save the file — the site picks it up instantly (just refresh the page). Until you add a URL, the
site shows a "▶ Coming soon" badge instead of a dead link, so nothing looks broken while you
upload videos over time.

## Editing / adding content

- **Add a problem to an existing topic**: find the topic in `CURRICULUM` (inside `js/data.js`)
  and add another object to its `problems` array.
- **Add a whole new topic**: copy an existing topic object inside a `world.topics` array and
  edit every field (`id` must be unique — it's used in the URL as `topic.html?t=your-id`).
- **Add a new world/tier**: copy one of the three top-level blocks in `CURRICULUM`.
- **Change colors/fonts/theme**: everything is CSS variables at the top of `css/style.css`.
- **Change XP values or level curve**: `XP_MAP` and `XP_PER_LEVEL` in `js/app.js`.
- **Add/edit badges**: `BADGE_DEFS` in `js/app.js`.

Nothing else needs to change — every page reads from `js/data.js` at load time.

## Deploying (free)

**GitHub Pages** (recommended, and pairs nicely with a YouTube channel + repo):
1. Create a new GitHub repo, push this folder.
2. Repo Settings → Pages → Deploy from branch → `main` / root.
3. Your site is live at `https://<username>.github.io/<repo>/` in a minute or two.

**Netlify / Vercel**: drag the folder onto their dashboard — done, no config needed.

## Notes on data

- All learner progress (solved problems, XP, streaks, badges, notes) is stored in the browser's
  `localStorage` — nothing is sent to a server. This means progress is per-device/per-browser;
  there is no login system in this version.
- Problems marked `premium: true` require LeetCode Premium — the site shows a small 🔒 badge so
  learners aren't confused when they hit a paywall.
