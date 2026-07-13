---
name: run
description: Launch this portfolio site's dev server and drive it in a browser to verify visual/UI changes. Use whenever a change needs to be seen rendered (CSS, layout, component markup) rather than just typechecked or unit tested.
---

## Starting the dev server

```bash
yarn dev
```

Port 3000. The macOS sandbox blocks `next dev`'s webpack file-watcher
(`EMFILE: too many open files, watch`) even after allowing local port
binding — this is an OS-level watcher/fd limit inside `sandbox-exec`,
not something fixable via `.claude/settings.json`. Run the dev server
with `dangerouslyDisableSandbox: true`; it's a safe, local, reversible
action (just `next dev`).

```bash
nohup yarn dev > /tmp/dev-server.log 2>&1 &
disown
```

Poll instead of guessing a sleep duration:

```bash
until curl -sf http://localhost:3000 >/dev/null 2>&1; do sleep 1; done
```

Stop it with `pkill -f "next dev"` before relaunching, or the next run
hits `EADDRINUSE`.

## Driving it — use the Playwright MCP server

This repo has `@playwright/mcp` wired into `.ai/mcp.json` (shared
across Claude Code / Cursor / Gemini). Prefer its `browser_navigate`,
`browser_snapshot`, and `browser_take_screenshot` tools over writing
one-off Playwright scripts — no need to hunt for a cached browser
binary or reimplement a driver each session.

If the MCP server isn't available for some reason, a cached Chromium
build usually exists under `~/Library/Caches/ms-playwright/`, and a
`playwright` package is often already resolvable from an old `npx`
cache under `~/.npm/_npx/*/node_modules/playwright` — check there
before running a fresh `npx playwright install`.

## Gotchas specific to this project

- **Next.js dev-mode error overlay covers the page.** If a hydration
  warning or console error fires, the `<nextjs-portal>` overlay blocks
  screenshots of the underlying content. Remove it before capturing:
  ```js
  await page.evaluate(() => {
    document.querySelectorAll("nextjs-portal").forEach((n) => n.remove());
  });
  ```
- **CSS Modules hash class names** (e.g. `finalScoreContainer_a1b2c3`).
  Select with a substring match, not an exact class:
  `page.locator('[class*="finalScoreContainer"]')`.
- **`waitUntil: "networkidle"` hangs** on pages with `ReactPlayer`
  (`/travel/*`) since the video keeps network activity alive. Use
  `waitUntil: "load"` plus an explicit `waitForSelector` on the
  element you actually need instead.

## Useful test routes

- `/travel/<slug>` — score bar / scorecard UI. Good spread of
  `finalScore` values to check edge cases against:
  `saudi-arabia-bahrain` (1, near-minimum fill), `turkey` (5, mid),
  `syria` (10, full bar). See `src/datasources/TravelMetaData.ts` for
  the full list.
- `/guides`, `/travel`, `/folio` — index pages with filter/sort UI.
