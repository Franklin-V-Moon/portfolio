# Portfolio Modernization Plan

**Status:** Draft for review — no code changes made yet.
**Scope:** Full-codebase audit of `franklinvonmoon` portfolio (Next.js 14, Pages Router, TypeScript, MUI v5) against current Next.js/React standards.
**Context:** Originally the project was built to learn React; has evolved since without a full architectural pass. This document catalogs what's drifted, what's dead, and what's wrong, then proposes a phased path back to a modern, simple, coherent baseline.

---

## Executive Summary

The project is **functionally sound but architecturally frozen at its Next 14 / React 18 / MUI 5 starting point**, with several artifacts from earlier project phases (a removed light-mode toggle, MUI v4-era SSR plumbing) never cleaned up as the code around them changed. The broken/blocking issues that once undermined trust in the toolchain (test infra, CI gate, `next.config.js` self-overwrite, dead `tsconfig.json` paths, and all failing unit tests) have been fully resolved — `yarn test`, `yarn lint`, and `yarn build` all pass cleanly, and CI is a real quality gate again. The standout remaining finding:

**223 MB of images are served fully unoptimized** (`images.unoptimized: true` in `next.config.js`) despite `next/image` being used in 13 files — this is the single biggest available Lighthouse/performance win, and the project's own README names Lighthouse score as a stated priority.

Everything else is either dead code (safe, mechanical deletions) or a well-understood Next.js modernization (SSG/ISR conversion, `next/font`, `next/script`) that can be done incrementally without a framework-major-version jump.

### Priority rollup

| Priority | Theme | Count |
|---|---|---|
| **P1 — High-value modernization** | Image optimization, SSG/ISR conversion, `next/font`+`next/script`, dead dark-mode system removal, `@mui/styles` removal, Next/React/MUI major upgrades | ~10 |
| **P2 — Medium cleanup** | Sass `@import`→`@use`, card-component duplication, a11y fixes, `any` sweep, config drift | ~10 |
| **P3 — Low / opportunistic** | Filename casing, ESLint flat-config, minor version bumps | ~8 |

---

## P1 — High-Value Modernization

### Routing, SSR & Data Fetching

#### P1.1 — Static datasource pages use `getServerSideProps` instead of SSG
**Files:** `pages/assets-store/[link].tsx:90`, `pages/travel/[link].tsx:719`
Both fetch from purely static, hand-authored, in-memory TS arrays (`AssetMetaData.ts`, `TravelMetaData.ts`) — no external I/O — yet re-run a serverless function on every single request via `getServerSideProps`. This data only changes on a code push.
**Action:** Convert both to `getStaticProps` + `getStaticPaths` (`fallback: false` is fine since all links are known at build time). Lets Vercel serve these from the CDN/edge instead of invoking a function per request — pure win, no behavior change.

#### P1.2 — Notion guide content fetched live, per-request, with zero caching
**File:** `pages/guides/[link].tsx:93-131`
`new NotionAPI()` is instantiated fresh inside `getServerSideProps` on every request, and `notion.getPage(...)` is called with no caching, no revalidation, and no timeout — every guide view is a live call to Notion's *unofficial* API (`notion-client`, a reverse-engineered client, not Notion's official SDK). If Notion's API hangs, the request hangs.
**Action:** Convert to `getStaticProps` + `getStaticPaths` (`fallback: 'blocking'`) with `revalidate: 3600` (or similar) — this is the textbook ISR use case: content changes rarely, is edited out-of-band in Notion, and per-request live-fetching buys nothing but latency and Notion API load. Also replace the literal string sentinel `"undefined"` used for the error-fallback case (line ~127) with a proper boolean/`null` — it currently works only because it round-trips through JSON serialization, not because it's a sound pattern.

#### P1.3 — Client-only URL-param read causes flash-of-unsorted-content
**File:** `pages/travel/index.tsx:55-70`
Reads `?SortBy=` from `window.location.search` inside a `useEffect` (post-hydration), so the initial server-rendered HTML doesn't reflect the sort order — a hydration-visible content shift, and not deep-link/SEO friendly.
**Action:** Read the sort param via Next's router (`useRouter().query`) so it's available during SSR, or move sorting server-side.

### Images, Fonts & Static Assets

#### P1.4 — Image optimization disabled entirely
**File:** `next.config.js:4-6` (`images: { unoptimized: true }`)
`public/` totals **223 MB** (153 PNG, 82 JPG, 35 SVG, 8 JPEG). Concrete examples: homepage headshot is a 1.1 MB PNG displayed at 115×115px (`pages/index.tsx:54`); `public/assets/` alone is 121 MB, served via un-lazy `CardMedia component='img'` in `AssetItem.tsx`/`AssetCollection.tsx` with no `loading="lazy"`. With optimization off, none of the 13 files already using `next/image` get any benefit — no resizing, no AVIF/WebP conversion, no responsive srcset.
**Action:** Remove `unoptimized: true`. This is the single largest Lighthouse lever in the codebase (confirmed as a stated priority in the project's own README). Do this together with P1.6 (deprecated `layout` prop cleanup) since Next's optimizer errors are more visible once real optimization is enabled. If Vercel's included optimization quota is a cost concern, note that before flipping the flag — otherwise there's no technical reason to keep it off.

#### P1.5 — Missing `priority` on above-the-fold images
**Files:** `pages/index.tsx:54` (headshot), `src/homepage/parallax-art/ParallaxArt.tsx` (16-layer hero)
`priority` is used exactly once in the entire codebase (`src/travel/VideoLibrary.tsx:80`) — meanwhile the likely largest-contentful-paint elements (homepage headshot, parallax hero) are lazy-loaded by default.
**Action:** Add `priority` to the headshot and the top parallax layers; audit for other LCP candidates once P1.4 lands.

#### P1.6 — Deprecated `next/image` props firing runtime warnings
**Files:** `pages/assets-store/[link].tsx:78`, `pages/travel/[link].tsx:306-307,501,595`, `pages/travel/index.tsx:149`, `pages/travel/world-map/index.tsx:66`, `src/travel/VideoLibrary.tsx:79`
All use the removed `layout`/`objectFit` API (kept only for backward-compat, fires a "did you forget to run the codemod?" console warning on every render). Also: string-literal numeric props (`width='0' height='0'` ×16 in `ParallaxArt.tsx`, similar in `WorkExpListItem.tsx`/`VolunteerListItem.tsx`/`pages/travel/[link].tsx`) should be real numbers per the typed API.
**Action:** Run/hand-apply Next's `next-image-experimental`/`built-in-next-font` codemods where applicable, or manually migrate each to `fill` + `sizes` or explicit numeric `width`/`height`.

#### P1.7 — Double render-blocking font fetch + sync 3rd-party script, no `next/font`
**Files:** `pages/_document.tsx:10-19`, `themes/globals.css:5`
Montserrat is fetched from `fonts.cdnfonts.com` **twice** — once via a render-blocking `<link>` in `_document.tsx:10-13`, again via `@import` in `themes/globals.css:5` — plus `animate.css` from a third-party CDN, plus a **synchronous** `<script src='gumroad.js'>` (line 17-19, with a deliberate `eslint-disable @next/next/no-sync-scripts` — the "correct" fix was known and explicitly bypassed).
**Action:** Replace both Montserrat fetches with `next/font/google` (self-hosted, zero extra request, no FOUC). Replace the sync Gumroad script with `next/script` (`strategy="lazyOnload"` or `"afterInteractive"`). Evaluate whether `animate.css` (a whole third-party animation library) is pulling its weight vs. a handful of hand-written CSS animations.

#### P1.8 — Assets Store gallery uses un-optimized, un-lazy `<img>` against the largest media directory
**Files:** `src/assets/components/AssetItem/AssetItem.tsx:33-41`, `src/assets/components/AssetCollection/AssetCollection.tsx:25-30`
Both use MUI `CardMedia component='img'` (a real `<img>` under the hood) with no `loading="lazy"`, no explicit dimensions (CLS risk), against `public/assets/` — the single largest media directory in the repo (121 MB). Contrast with `GuideCard.tsx:33-40`, which already does this correctly (`loading='lazy'`, `decoding='async'`).
**Action:** Migrate both to `next/image` (once P1.4 lands) or at minimum add `loading="lazy"` + explicit dimensions matching `GuideCard.tsx`'s existing pattern.

### Theming & Styling (dead dark-mode system)

This is one root cause with five symptoms across routing, theming, and testing — group as a single cleanup effort.

#### P1.9 — Remove the entire vestigial `DarkMode` context system
**Files:** `pages/_app.tsx:12`, `themes/GlobalTheme.tsx:12,17-22,25-26`, `utils/configureCss/configureCss.ts` (whole file), `themes/lightMode.ts` (whole file), consumers: `pages/guides/[link].tsx:15,31`, `src/homepage/parallax-art/ParallaxArt.tsx:3,8`, plus 12 `setDark(...)` call sites (`WorkExpListItem.tsx`, `VolunteerListItem.tsx`, `BioDescription.tsx`, `ContactCard.tsx`, `SalaryExpectationsSection.tsx`, `ForYouCard.tsx`, `ParallaxArt.tsx`, `QualificationCard.tsx`, `ProjectItem.tsx`, `GuideCard.tsx`, `LanguagesRow.tsx`, `FolioGrouping.tsx`) and their `.module.scss` `*Dark` class pairs.

Since light mode was intentionally removed, the `DarkMode` React context (`createContext(true)`) is permanently `true` — `setDarkMode` (`pages/_app.tsx:12`) is never called anywhere. Every consumer's dark/light branch is dead code that always resolves one way. Specifically:
- `themes/lightMode.ts` is imported once (`GlobalTheme.tsx:4`) and never used — `GlobalTheme.tsx:25` hardcodes `darkTheme`. 100% dead file, plus it duplicates a Sass-color module-augmentation block verbatim from `darkMode.ts`.
- `themes/GlobalTheme.tsx:17-22` has a `useEffect` cleaning up a `#jss-server-side` DOM node — leftover MUI v4/JSS SSR boilerplate; a no-op under the current emotion-based styling (see P1.10).
- `utils/configureCss/configureCss.ts`'s `setDark(styles, selector)` helper always resolves to `styles[selector] + " " + styles[selector + "Dark"]` now, at 12 call sites — mechanically replaceable with the plain class name once the corresponding `*Dark` SCSS classes are merged into their base classes.
- `NavBar.module.scss:134-174` still defines `.darkModeToggle`/`.iconDim`/`.iconBright`/`.colorDefault` for a toggle button that no longer exists in `Navbar.tsx`.

**Action (sequenced):**
1. Merge each `XDark` SCSS class into its base class across the ~12 affected `.module.scss` files (verify no visual diff since dark was already the only rendered state).
2. Replace `setDark(styles, "x")` call sites with plain `styles.x`.
3. Delete `utils/configureCss/configureCss.ts` and its test.
4. Delete `themes/lightMode.ts`, the `DarkMode` context, the `useState`/`setDarkMode` in `pages/_app.tsx`, the `useContext(DarkMode)` reads in `ParallaxArt.tsx`/`pages/guides/[link].tsx`, and the dead JSS cleanup effect.
5. Delete the dead `.darkModeToggle`/`.iconDim`/`.iconBright` CSS (`Navbar.test.tsx` no longer references it).

Net effect: smaller bundle, one less context provider in the render tree, and removal of the most repetitive dead pattern in the codebase — no behavior change since the app has been unconditionally dark for a while.

#### P1.10 — Remove deprecated `@mui/styles`/`ServerStyleSheets` SSR pattern
**Files:** `pages/_document.tsx:1,30-48`, `package.json` (`@mui/styles` dependency)
`_document.tsx` imports `ServerStyleSheets` from `@mui/styles` — MUI's legacy, JSS-based v4 styling API, explicitly documented by MUI as deprecated/maintenance-only and not carried forward past v6. It's used purely for SSR style collection (`sheets.collect(...)`, `sheets.getStyleElement()`) via a custom `getInitialProps`, even though the rest of the app already uses the modern emotion-based `sx`/`styled` API (`@emotion/react`/`@emotion/styled` are separately installed and used correctly elsewhere). This is a **two-styling-engines-at-once** situation, and it's the reason the dead `#jss-server-side` cleanup exists (P1.9).
**Action:** Delete the `ServerStyleSheets` import and the custom `getInitialProps` override in `_document.tsx`, drop the `@mui/styles` dependency. This is also a **hard blocker for any MUI v6+ upgrade** (P1.14) — `@mui/styles` only ever reached v6 upstream and isn't maintained further, so it must go before or alongside that bump.

#### P1.11 — Imperative DOM mutation during render in `_app.tsx`
**File:** `pages/_app.tsx:14-16`
```tsx
if (typeof window !== "undefined") { document.body.style.overflowX = "hidden"; }
```
Runs on every render of `MyApp` (not gated by `useEffect`), guarded only by a `typeof window` check — the kind of pattern that breaks or warns under React Server Components / concurrent rendering, and is unnecessary when `overflow-x: hidden` on `html`/`body` in global CSS achieves the same effect declaratively.
**Action:** Move to `themes/globals.css` as a plain CSS rule.

### Dependencies & Framework Versions

#### P1.12 — Next 14 → Next 16, React 18 → React 19
**File:** `package.json:25,30-31`
Currently `next: "14"` (resolves to 14.2.5) and `react`/`react-dom: ^18.3.1` — roughly two Next majors and one React major behind current. Upgrading unlocks native ISR/caching primitives directly relevant to P1.1/P1.2, plus `next/font`/`next/script` are already usable today without this bump (do those first, independently).
**Action:** Batch this with `@types/react`/`@types/react-dom` → 19.x. Do this **after** P1.9/P1.10 (dead-code and `@mui/styles` removal) so the upgrade diff isn't tangled with unrelated cleanup. Expect ESLint config changes are needed in the same window (P2.6) since `eslint-config-next` version is coupled to the `next` version.

#### P1.13 — Node version reconciliation
**Files:** `.github/workflows/main.yml` (Node 16.14.0, EOL), `package.json` (no `engines` field), no `.nvmrc`
Three different Node baselines are in play with nothing reconciling them: CI pins an EOL Node 16, local dev observed at Node 24, `@types/node` targets `^22.4.1`, and Vercel's runtime is unpinned (no `vercel.json`). This is a correctness risk, not just staleness — CI testing against Node 16 while shipping on a materially different Node major can mask real incompatibilities.
**Action:** Add an `engines` field to `package.json` and an `.nvmrc` pinning a current Node LTS to match; CI is already pinned to Node 24.

#### P1.14 — MUI v5 → current major (blocked on P1.10)
**File:** `package.json:16,18-19`
`@mui/material`/`@mui/icons-material` are four majors behind current. Not urgent on its own (v5 usage elsewhere is idiomatic — `sx`/`styled()` used correctly, no `makeStyles`/`withStyles` found), but blocked until `@mui/styles` is removed (P1.10).
**Action:** Schedule after P1.10, as its own isolated upgrade PR.

---

## P2 — Medium Priority Cleanup

### Component Architecture

#### P2.1 — `ParallaxArt.tsx` requestAnimationFrame cleanup bug
**File:** `src/homepage/parallax-art/ParallaxArt.tsx:22-31`
A perpetual `requestAnimationFrame` self-recursion loop calls `setState` every frame while mounted. Cleanup does `window.cancelAnimationFrame(handleScrollAnimation as any)` — but `cancelAnimationFrame` expects the **numeric handle** returned by `requestAnimationFrame`, not the callback reference. The `as any` masks a real bug: cleanup silently does nothing, and the rAF loop keeps running after unmount.
**Action:** Store the rAF handle in a ref (`const rafId = useRef<number>()`), call `rafId.current = requestAnimationFrame(...)`, and cancel with `cancelAnimationFrame(rafId.current)` in the cleanup — removing the `as any` in the process.

#### P2.2 — Keyboard-inaccessible interactive heading
**File:** `src/folio/languages/LanguagesColumn.tsx:26-30`
A plain `<h2 onClick={...}>` with no `role="button"`, `tabIndex`, or `onKeyDown` — mouse-only, not reachable via keyboard. The sibling component in the same feature (`LanguagesRow.tsx:23-27`) does this correctly with a real `<button>`.
**Action:** Swap to `<button>` (or add `role="button"` + `tabIndex={0}` + `onKeyDown` if a heading element is load-bearing for styling) to match `LanguagesRow.tsx`'s existing pattern.

#### P2.3 — Four divergent "clickable card" implementations
**Files:** `GuideCard.tsx:27-29`, `AssetCollection.tsx:22-23`, `AssetItem.tsx:20-26,68-72`, `VideoLibrary.tsx:46-54`
Five near-identical card components each reimplement MUI `Card`/`CardActionArea` + image + title with no shared abstraction, and each **navigates differently**: `GuideCard` uses `component={Link as any}`; `AssetCollection` uses `router.push` in `onClick`; `VideoLibrary` uses `component='a'` + `preventDefault` + `router.push`; and `AssetItem` is the most convoluted — it renders a **hidden `<a style={{display:"none"}}>` and a `useRef` to programmatically `.click()` it**, which is also inaccessible (no keyboard path, no text/label, no `rel="noreferrer"` for what look like external links).
**Action:** Extract a shared `NavigableCardActionArea`/`LinkCard` primitive (real anchor via `component={Link}`, properly typed, no `as any`) and migrate all five card components onto it. Fixes the duplication and the `AssetItem` accessibility issue in one pass.

#### P2.4 — No error boundary anywhere in the app
No `ErrorBoundary`/`componentDidCatch`/`getDerivedStateFromError` exists in the repo. The project relies entirely on the `ErrorContent` fallback pattern, which only covers Notion-fetch failures in the three `getServerSideProps` routes — a render-time exception anywhere else (e.g. a malformed datasource entry) currently takes down the whole page to Next's default error screen.
**Action:** Add a top-level error boundary in `pages/_app.tsx` wrapping `<Component {...pageProps} />`.

#### P2.5 — Effect-based derived state that should be plain computation
**Files:** `src/homepage/salary/SalaryExpectationsSection.tsx:31-40,100-163`, `pages/travel/index.tsx:47-70`, `src/homepage/biography/BioDescription.tsx:25-30` (missing dependency array), `src/homepage/experience/Experience.tsx:16-46` (resize handling doesn't update all derived layout state)
Several places use effect chains to derive state from other state (`sortedMetaData` in `travel/index.tsx`, `expectedSalary` from 9 dependencies in `SalaryExpectationsSection.tsx`) where a `useMemo` or plain in-render calculation would be simpler and avoid extra render passes. `BioDescription.tsx`'s effect has no dependency array at all, re-running a `setInterval` teardown/rebuild on every render.
**Action:** Convert derived-state effects to `useMemo`; add the missing dependency array to `BioDescription.tsx`; move `SalaryExpectationsSection.tsx`'s toggle logic into the relevant `onChange` handlers instead of cross-effect `setState` cascades.

#### P2.6 — `any` type sweep
8 occurrences across `src/`/`pages/`: `ParallaxArt.tsx:29` (masks the P2.1 bug), `GuideCard.tsx:28` (`component={Link as any}`, fixed by P2.3), `SingleSelectFilterField.tsx:25`, `MultiSelectFilterField.tsx:32` (both `(event: any)`, typeable as MUI's `SelectChangeEvent`), `Skills.tsx:16`, `ProgressBar.tsx:15`, `pages/guides/[link].tsx:19` (`dynamic<any>`), `pages/travel/[link].tsx:80`.
**Action:** Type each properly; most are straightforward MUI event types or typed lookup objects, not requiring a redesign.

### Styling

#### P2.7 — Legacy Sass `@import` boilerplate, no design tokens
**Files:** 23 of 34 `.module.scss` files under `src/` each repeat `@import "../../../themes/colors.module"; @import "../../../themes/breakpoints";`
Dart Sass (`sass@^1.77.8`, already installed) deprecated the legacy `@import` rule in favor of `@use`/`@forward`, and it's on a removal clock upstream. Additionally there are **no CSS custom properties** anywhere (`themes/globals.css` is 6 lines, just font-family) — theming is entirely compile-time Sass variables, and the MUI theme (`themes/darkMode.ts`) and Sass color tokens (`themes/_colors.module.scss`) are two independently maintained sources of the same colors that have already drifted (`$brightGrey: #9c9c9c` in Sass vs. `brightGrey.main: "#949494"` in the MUI theme).
**Action:** Migrate to `@use`/`@forward` (mechanical, touches all 34 files) and reconcile the color drift; consider CSS custom properties as a longer-term follow-up if theming flexibility is ever needed again. Medium-High effort, no user-facing bug today — schedule opportunistically alongside other styling touches rather than as a dedicated sprint.

### Tooling

#### P2.8 — ESLint 8 → flat config, coupled to Next 16 upgrade
**File:** `.eslintrc.json` (legacy format, `next/core-web-vitals` + two style rules)
ESLint 9+ deprecated `.eslintrc.*` in favor of `eslint.config.js` flat config, and `eslint-config-next@16` targets flat config as the primary path. Currently fine under `eslint@8` + `eslint-config-next@14`, but blocks the ESLint/Next major bumps (P1.12) until migrated.
**Action:** Migrate `.eslintrc.json` → `eslint.config.js` in the same PR window as P1.12.

#### P2.9 — Dead/vestigial dependencies
`@react-native-community/eslint-config` (`package.json` dependencies, not devDependencies) isn't referenced in `.eslintrc.json`'s `extends` chain or anywhere else — looks like a stray dependency in a web project. `@types/material-ui@^0.21.17` (legacy MUI v0.x community types) has zero imports from `material-ui` anywhere. `@testing-library/jest-dom` is installed but never imported by any of the 18 test files and isn't wired into `jest.config.js`.
**Action:** Confirm each is genuinely unused (`yarn why <pkg>`), then remove `@react-native-community/eslint-config` and `@types/material-ui`; either start using `@testing-library/jest-dom` (wire it into a `setupFilesAfterEach`) or remove it too.

#### P2.10 — Postbuild pipeline fragility
**Files:** `next-sitemap-config.js:1-3`, `utils/export-meta.ts`
`next-sitemap-config.js` does a top-level `require("./utils/sitemap-meta/*.json")` — if `export-meta` hasn't run first, this throws an opaque `MODULE_NOT_FOUND` rather than a descriptive error. `export-meta.ts` runs via `ts-node --transpile-only` (type errors in it or the datasources it imports are silently skipped).
**Action:** Low urgency — add a clearer error/guard if the JSON files are missing; consider dropping `--transpile-only` now that a build step runs in CI so type errors surface. Note: if this project ever migrates to the App Router, this entire pipeline (`export-meta.ts` → JSON → `next-sitemap`) could be replaced by a single native `app/sitemap.ts` — out of scope for now, flagged only.

---

## P3 — Low Priority / Opportunistic

- **`.module.scss` filename casing inconsistency** — `assetcollection.module.scss`, `assetitem.module.scss`, `searchbar.module.scss`, `videolibrary.module.scss` are lowercase while their paired components are PascalCase (`AssetCollection.tsx`, etc.); everywhere else the filenames match exactly. Risky on case-sensitive filesystems (Linux CI vs. macOS dev). Rename to match.
- **`tsconfig.json` `target: "es5"`** — legacy; Next's SWC compiler does the actual browser down-leveling regardless, but current Next-generated tsconfigs favor `es2017`+. Cosmetic, not urgent.
- **Naming collision** — `pages/assets-store/[link].tsx:18` defines a local component literally named `AssetCollection`, unrelated to and shadowing `src/assets/components/AssetCollection/AssetCollection.tsx`. Rename one.
- **`Navbar.tsx`** — local state variable `tabIndex` shares its name with the unrelated HTML `tabIndex` attribute used later in the same file; easy to misread, not a bug.
- **Test coverage ~28%** (13/47 components) — `src/assets/`, `src/projects/`, most of `src/travel/`, and all `pages/` route files are entirely untested. Not urgent to backfill wholesale, but worth requiring tests on any file touched during this modernization pass (natural byproduct of P1/P2 work).
- **`@mui/styles`→v6 only, confirms semi-abandoned status** — informational, folded into P1.10's urgency already.
- **`.gitignore` doesn't list `.env` patterns** — no `.env` file exists today, but add the pattern preemptively before one is ever created.
- **`Skills.tsx`/`Portfolio.tsx`** — thin orchestrator components with no colocated styles/tests; acceptable as-is, just noting the convention gap.

---

## Suggested Phasing

This is sequenced to avoid tangling unrelated diffs and to unblock later phases:

1. **Phase 1 (dead code removal):** P1.9 (dark-mode system) + P1.10 (`@mui/styles`) + P1.11 (DOM mutation). Zero behavior change, shrinks the diff surface for everything after.
2. **Phase 2 (performance):** P1.4–P1.8 (images, fonts, scripts) + P2.1 (rAF bug). Highest user-visible payoff, independent of the dependency upgrades below.
3. **Phase 3 (routing):** P1.1–P1.3 (SSG/ISR conversions). Independent of Phase 2, can run in parallel.
4. **Phase 4 (dependency majors):** P1.12 (Next/React) + P1.14 (MUI, after P1.10) + P2.8 (ESLint flat config) + P1.13 (Node version) — batch these together since they're mutually coupled, and do them *after* Phases 1–3 so the upgrade PR is clean.
5. **Phase 5 (polish):** P2.2–P2.7, P2.9–P2.10, P3.* — opportunistic, can be picked up incrementally alongside feature work.

---

## Explicitly Out of Scope

- **App Router migration.** The project is 100% Pages Router with zero partial migration (no `app/`, no `middleware.ts`, no App Router convention files anywhere). This would be a full route-by-route rewrite, not incremental, and is separately blocked by `@mui/styles`'s SSR pattern (P1.10) not having a first-class App Router equivalent. Given Phase 3 above captures most of the SSG/ISR benefit *within* Pages Router, a full App Router migration is a distinct, much larger initiative — worth a dedicated future plan once Phases 0–4 land, not bundled into this one.
