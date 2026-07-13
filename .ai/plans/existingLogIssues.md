# Existing console/log issues

Findings from running `yarn test`, `yarn build`, `next dev`, and `next start`
(production server) and inspecting both the terminal output and the browser
console (via Playwright) on every route. Grouped by severity. File:line
references point at the root cause, not just where the symptom appears.

Each item below now has a **Resolution** noting what was actually done,
following investigation and a decision on each trade-off (see
`.ai/context/dev-server-webpack-tradeoff.md` for item 3's fuller context).

## Real bugs (worth fixing)

### 1. Hydration mismatch on `/` (homepage) — React error #418
- **Where**: `src/homepage/biography/BioDescription.tsx:8-22`
- **Repro**: `yarn build && npx next start`, open `/` in a browser, check console.
- **Cause**: `useState<Duration>(timeWorked())` calls `timeWorked()` at
  render time, which does `end: new Date()`. This runs once during SSR
  (baked into the statically-generated HTML at build time) and again during
  the client's first render before hydration — since `/` is prerendered
  (`○ /` in the build output), any time gap between build and page load
  guarantees the rendered duration text differs, so React throws a
  hydration mismatch (`args[]=text`) and discards/re-renders the tree.
- **Confirmed via**: reproduced identically on two separate loads of `/` in prod.
- **Resolution**: fixed. `periodWorked` now initializes to `undefined` and is
  computed only inside `useEffect` (on mount, then every 30s as before), so
  server and client's first render both produce the same "0 years 0 months…"
  text before the real value populates a beat later. Verified: hydration
  error no longer appears in prod; duration text still renders correctly
  after mount.

### 2. Hydration mismatch on every `/travel/[link]` page — React error #418
- **Where**: `pages/travel/[link].tsx:187` and `:234` (`<ReactPlayer .../>`,
  imported directly at the top of the file, not via `next/dynamic` with
  `{ ssr: false }`).
- **Repro**: `yarn build && npx next start`, open `/travel/china` or
  `/travel/nepal`, check console. Reproduced identically on both (same
  stack trace, `args[]=HTML`), so it's structural to the page, not
  data-specific.
- **Cause (most likely)**: `react-player` needs the browser to pick a
  player implementation and mounts different markup client-side than
  whatever it (or its SSR fallback) renders server-side, producing a DOM
  structure mismatch. The usual fix is a `next/dynamic(..., { ssr: false })`
  wrapper, which isn't used here.
- **Secondary suspect, same page**: `hasRestrictionBypass()` in
  `src/travel/travelDataService.ts:25-30` reads `localStorage` directly in
  the render path (`pages/travel/[link].tsx:232`:
  `hasRestrictionBypass() || !metaData.restricted`). It returns `false`
  during SSR (`isClientSide()` guard) but the real stored value on the
  client, so for a `restricted` video where a visitor previously unlocked
  content (`restriction-bypass-v2` in localStorage, set in
  `travelDataService.ts:46`), the server renders the restricted placeholder
  while the client renders the actual player — a second, independent way to
  hit the same class of mismatch. Not confirmed as the trigger in this
  session (localStorage was empty), but it's a real hazard in the same code
  path and should be looked at together with the ReactPlayer issue.
- **Not affected**: `/`, `/travel`, `/travel/world-map`, `/guides`,
  `/guides/[link]`, `/assets-store`, `/assets-store/[link]` all rendered
  with zero hydration errors in the same session.
- **Resolution**: fixed. `ReactPlayer` is now loaded via
  `dynamic(() => import("react-player"), { ssr: false })`, typed as
  `typeof ReactPlayerType` to preserve the existing `ref`/prop typing at all
  3 usage sites. Verified: hydration error no longer appears on
  `/travel/china` or `/travel/nepal`; the video element still mounts with
  the correct source (confirmed via DOM inspection). The `hasRestrictionBypass()`
  localStorage hazard was left as-is — it wasn't the confirmed trigger and
  is out of scope for this pass.

### 3. `next dev` cannot serve any `[link]` dynamic route (dev-mode only)
- **Where**: `pages/guides/[link].tsx`, `pages/travel/[link].tsx`,
  `pages/assets-store/[link].tsx` — all three use
  `getStaticPaths` + `fallback: "blocking"`.
- **Symptom**: `GET /guides/backstage-idp-guide`, `GET /travel/china`, and
  `GET /assets-store/syria` all return a genuine `404` under `next dev
  --webpack` (this repo's dev command), immediately (<30ms, `page: "/_error"`
  in `__NEXT_DATA__`), with **no compile log at all** for the `[link].tsx`
  page — meaning the dev router never dispatches to it. Confirmed
  reproducible after a full `rm -rf .next` + fresh `next dev --webpack`
  restart, so it isn't stale-cache related.
- **Not a data/Notion/network problem**: the exact same routes build and
  serve fine (`200`, fully rendered) under `next build --webpack` +
  `next start`, so `getStaticProps`/Notion fetch/env vars are not the
  issue — this is purely dev-mode routing.
- **Scope**: this makes it impossible to preview any guide, travel video,
  or asset collection page while running `yarn dev`, which is a real
  developer-experience gap, not just a cosmetic log.
- **Suspected cause (unconfirmed)**: this repo pins `next@^16.2.10` and
  forces the legacy `--webpack` dev compiler (Next 16 defaults to
  Turbopack); `fallback: "blocking"` dynamic pages combined with the
  webpack dev compiler on this Next version is the prime suspect for a
  regression, but this needs a dedicated repro (e.g. a minimal Next 16
  project) to confirm — flagging for follow-up, not diagnosed further here.
- **Follow-up test**: `pages/travel/[link].tsx` and
  `pages/assets-store/[link].tsx` actually use `fallback: false`, not
  `"blocking"` — only `guides/[link].tsx` used `"blocking"` — yet all
  three still 404 identically in dev. This disproves the `fallback`
  strategy as the trigger; the bug is more fundamental to
  `getStaticPaths`-based pages under `next dev --webpack` on this Next
  version. Also tried running dev under Turbopack (no `--webpack`): all
  three routes work correctly there (`200`) and the EMFILE noise (item 5)
  disappears too — but Turbopack dev is exactly what commit `0666c22`
  deliberately moved *away* from, because it breaks MUI/Emotion's SSR
  cache key and floods the console with a hydration error on every single
  page (worse than this). Switching back would trade this bug for that one.
- **Resolution**: do nothing. This is a deliberate, already-made trade-off
  (see `.ai/context/dev-server-webpack-tradeoff.md`), not a regression to
  fix. No cheap silencing option exists — the 404 is real dev-server
  routing behavior, not a suppressible log statement. Preview
  guide/travel/asset detail pages via `yarn build && yarn start` instead.
  Documented in `.ai/context/` so future sessions don't re-investigate
  from scratch.

## Environment/tooling noise (not app bugs, but produce log output)

### 4. `warning package.json: No license field` — the "missing field" warning
- Printed by **yarn** (not Jest) on every `yarn` invocation — `yarn test`,
  `yarn dev`, `yarn build` all show it. This is the "one about a missing
  field" mentioned in the ask. Fix is adding a `"license"` field to
  `package.json`.
- **Resolution**: fixed. Added `"license": "UNLICENSED"` to `package.json`
  (this is a personal, non-open-source portfolio site). Verified: the
  warning no longer appears in `yarn test` output.

### 5. `Watchpack Error (watcher): Error: EMFILE: too many open files, watch`
- Constant stream of these in `next dev` terminal output in this
  environment, even right after a clean restart with a very high shell
  `ulimit -n` (1048576) — the OS-level per-process fd ceiling on this
  machine is being hit by webpack's file watcher on a repo this size.
  Directly correlates with the repeated `⚠ Fast Refresh had to perform a
  full reload` messages also seen in the log. This is a local machine/OS
  file-descriptor limit issue, not something fixable in the codebase
  itself (short of reducing watched files via `webpack.watchOptions.ignored`,
  e.g. ignoring `node_modules`/`.next`).
- **Follow-up test**: didn't reproduce at all under Turbopack dev (see item
  3), and persisted even with a very high shell `ulimit -n` (1048576) —
  coupled to the same `--webpack` dev tooling this repo deliberately keeps
  for the reason in item 3, and may be specific to this sandboxed
  environment rather than the user's own machine.
- **Resolution**: do nothing, per the trade-off in item 3. Doesn't block
  dev server functionality, just adds terminal noise.

### 6. `Browserslist: caniuse-lite is outdated. Please run: npx update-browserslist-db@latest`
- Printed twice during `yarn build` (once per webpack compiler pass).
  Stale `caniuse-lite` data in `node_modules`; fixed by running the
  suggested update command (updates a lockfile entry, not app code).
- **Resolution**: fixed. Ran `npx update-browserslist-db@latest`, which
  consolidated `caniuse-lite` to `1.0.30001805` in `yarn.lock` (no
  `package.json`/app code changes). Verified: `yarn build` no longer prints
  the warning.

### 7. `[Vercel Web Analytics] Failed to load script from /_vercel/insights/script.js` (+ underlying 404)
- Shows up on every page when running `next start` locally, because
  Vercel Web Analytics' script is only served on actual Vercel
  infrastructure. Expected/benign for local production testing; should
  **not** appear once actually deployed on Vercel with Analytics enabled.
  Worth double-checking on the real deployment, but not a local code bug.
- **Resolution**: no action needed. Nothing to fix in application code;
  flagging that it's worth a one-time check on the actual Vercel deployment
  that Analytics is enabled there.

### 8. Next.js Image aspect-ratio warning, homepage company logos
- **Where**: `src/homepage/experience/Experience.module.scss:39-44` (`.logo`
  class, shared by `WorkExpListItem.tsx` and `VolunteerListItem.tsx`).
- **Message**: `Image with src "..." has either width or height modified,
  but not the other. If you use CSS to change the size of your image, also
  include the styles 'width: "auto"' or 'height: "auto"' to maintain the
  aspect ratio.`
- Only 3 of the company logos triggered it on the initial homepage load,
  but that's just a viewport/lazy-render artifact — after scrolling the
  full Experience section into view, **all 11** company logos triggered it
  (only the on-screen ones fire the warning at any given moment).
- **Root cause, found in two layers**:
  1. `.logo { height: 40; width: auto; }` — `height: 40` has no unit, so
     it's invalid CSS and gets silently dropped, leaving only `width: auto`
     in effect.
  2. Fixing the unit (`height: 40px`) did **not** actually clear the
     warning — Next's Image dev-warning fires on *any* single-axis CSS
     override (one side `auto`, the other a fixed px value), regardless of
     whether the numbers happen to match the `width`/`height` props. The
     deeper issue: the `width={160} height={40}` props passed to every
     logo don't reflect each PNG's real dimensions at all — confirmed via
     `file`: `thoughtworks.png` is 4000×650 (6.15:1), `melbourne-amep.png`
     is 509×173 (2.94:1), `ibm.png` is 2560×1027 (2.49:1). `width: auto`
     was added specifically so each logo displays at its own true aspect
     ratio inside a fixed-height row, which is correct *intent* — Next's
     warning just doesn't have a supported way to express "fixed height,
     CSS-computed width preserving true intrinsic ratio" via the
     width/height-prop + CSS-override pattern.
- **Resolution**: fixed, properly this time. Restructured
  `WorkExpListItem.tsx` and `VolunteerListItem.tsx` to Next's blessed
  pattern for this case: each `<Image>` is now `fill` + `sizes="160px"`
  inside a new `.logoContainer` (`position: relative; width: 160px;
  height: 40px;`), with `.logo` set to `object-fit: contain;
  object-position: left center;`. This sidesteps the width/height-prop
  vs. CSS-override check entirely (`fill` doesn't take width/height props)
  while preserving each logo's true aspect ratio without distortion or
  cropping, inside a uniform 160×40 box for row alignment. The float-right
  layout rule for the volunteering column moved from `VolunteerListItem
  .module.scss`'s `.logo` to the new `.logoContainer` (floating has no
  effect on `fill`'s `position: absolute` image element). Verified:
  warning gone entirely (checked both `/` and after scrolling the full
  Experience section); logo bounding boxes confirmed uniform 160×40 via
  DOM inspection; existing `WorkExpListItem.test.tsx` /
  `VolunteerListItem.test.tsx` still pass.

### 9. `/favicon.ico` 404 on pages without an explicit `<link rel="icon">`
- **Where**: `pages/_document.tsx` has no default favicon link, and there
  is no `public/favicon.ico` — only `favicon-{blue,green,purple,red,yellow}.ico`
  exist, each wired up per-page via an explicit `<Head>` tag in `pages/index.tsx`,
  `pages/guides/index.tsx`, `pages/guides/[link].tsx`, `pages/travel/index.tsx`,
  `pages/travel/[link].tsx`, `pages/travel/world-map/index.tsx`,
  `pages/assets-store/index.tsx`, `pages/assets-store/[link].tsx`.
- Any page that doesn't set one of these explicitly — the built-in 404 page,
  the built-in `_error`/500 page, and any future page that forgets the tag —
  gets the browser's automatic `GET /favicon.ico` request, which 404s.
  Confirmed on a fresh session hitting a 404 page first.
- **Resolution**: fixed. Added `public/favicon.ico` (copy of
  `favicon-green.ico`, matching the homepage's own default) as a fallback
  for any page without an explicit `<link rel="icon">`. Verified: fresh
  session hitting a 404 page no longer shows the `/favicon.ico` 404.

## Clean (checked, nothing found)

- `yarn test` (all 150 tests, 35 suites): zero console output beyond the
  yarn/jest banner and the license warning above (item 4). The one
  intentional `console.error` call (`utils/error/ErrorBoundary.tsx:23`) is
  mocked in its test via `jest.spyOn(console, "error").mockImplementation()`
  (`utils/error/ErrorBoundary.test.tsx:12`), so it doesn't print.
- `next build --webpack` (excluding items 4 and 6 above): compiles and
  prerenders all 75 pages with no warnings/errors from application code.
- Browser console on `/`, `/guides`, `/guides/[link]`, `/travel`,
  `/travel/world-map`, `/assets-store`, `/assets-store/[link]` in
  production (`next start`): clean apart from items 7 and 9 above.
- Only two `console.*` calls exist anywhere in application/build source:
  `utils/export-meta.ts:23` (an intentional success log for the postbuild
  script, not part of the running app) and `utils/error/ErrorBoundary.tsx:23`
  (intentional, and mocked in tests as noted above).
