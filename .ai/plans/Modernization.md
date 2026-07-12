# Portfolio Modernization Plan

**Status:** Priority 1 complete. What remains below is P2 (medium cleanup) and P3 (low/opportunistic) — none of it is urgent or blocking.
**Scope:** Full-codebase audit of `franklinvonmoon` portfolio (originally Next.js 14, Pages Router, TypeScript, MUI v5 — now Next 16, React 19, MUI v9) against current Next.js/React standards.
**Context:** Originally the project was built to learn React; has evolved since without a full architectural pass. This document catalogs what's drifted, what's dead, and what's wrong, then proposes a path back to a modern, simple, coherent baseline.

---

## Executive Summary

All Priority 1 work is done: SSG/ISR conversion for the Assets Store, travel, and Notion guide pages; `next/font`/`next/script` adoption; the dead dark-mode context system and the deprecated `@mui/styles`/`ServerStyleSheets` pattern removed; the imperative DOM mutation in `_app.tsx` moved to CSS; and the Next 16 / React 19 / MUI v9 / Node 24 major-version upgrades (which also pulled the ESLint flat-config migration forward, since `eslint-config-next@16` requires it). `yarn test`, `yarn lint`, and `yarn build` all pass cleanly, and CI is a real quality gate.

Everything below is either dead code (safe, mechanical deletions) or opportunistic cleanup — no user-facing bugs, nothing blocking further work.

### Priority rollup

| Priority | Theme | Count |
|---|---|---|
| **P2 — Medium cleanup** | Sass `@import`→`@use`, card-component duplication, a11y fixes, `any` sweep, config drift | ~9 |
| **P3 — Low / opportunistic** | Filename casing, minor version bumps | ~7 |

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

#### P2.4 — No error boundary anywhere in the app
No `ErrorBoundary`/`componentDidCatch`/`getDerivedStateFromError` exists in the repo. The project relies entirely on the `ErrorContent` fallback pattern, which only covers Notion-fetch failures — a render-time exception anywhere else (e.g. a malformed datasource entry) currently takes down the whole page to Next's default error screen.
**Action:** Add a top-level error boundary in `pages/_app.tsx` wrapping `<Component {...pageProps} />`.

#### P2.5 — Effect-based derived state that should be plain computation
**Files:** `src/homepage/salary/SalaryExpectationsSection.tsx:31-40,100-163`, `pages/travel/index.tsx:47-70`, `src/homepage/biography/BioDescription.tsx:25-30` (missing dependency array), `src/homepage/experience/Experience.tsx:16-46` (resize handling doesn't update all derived layout state)
Several places use effect chains to derive state from other state (`sortedMetaData` in `travel/index.tsx`, `expectedSalary` from 9 dependencies in `SalaryExpectationsSection.tsx`) where a `useMemo` or plain in-render calculation would be simpler and avoid extra render passes. `BioDescription.tsx`'s effect has no dependency array at all, re-running a `setInterval` teardown/rebuild on every render. (The Next 16 lint upgrade now flags these directly as `react-hooks/set-state-in-effect` warnings — currently downgraded to `warn` in `eslint.config.js` pending this fix.)
**Action:** Convert derived-state effects to `useMemo`; add the missing dependency array to `BioDescription.tsx`; move `SalaryExpectationsSection.tsx`'s toggle logic into the relevant `onChange` handlers instead of cross-effect `setState` cascades.

#### P2.6 — `any` type sweep
8 occurrences across `src/`/`pages/`: `ParallaxArt.tsx:26` (masks the P2.1 bug), `GuideCard.tsx:27` (`component={Link as any}`), `SingleSelectFilterField.tsx:25`, `MultiSelectFilterField.tsx:32` (both `(event: any)`, typeable as MUI's `SelectChangeEvent`), `Skills.tsx:16`, `ProgressBar.tsx:15`, `pages/guides/[link].tsx:20` (`dynamic<any>`), `pages/travel/[link].tsx:85`.
**Action:** Type each properly; most are straightforward MUI event types or typed lookup objects, not requiring a redesign.

### Styling

#### P2.7 — Legacy Sass `@import` boilerplate, no design tokens
**Files:** 23 of 34 `.module.scss` files under `src/` each repeat `@import "../../../themes/colors.module"; @import "../../../themes/breakpoints";`
Dart Sass (`sass@^1.77.8`, already installed) deprecated the legacy `@import` rule in favor of `@use`/`@forward`, and it's on a removal clock upstream. Additionally there are **no CSS custom properties** anywhere (`themes/globals.css` is a handful of lines) — theming is entirely compile-time Sass variables, and the MUI theme (`themes/darkMode.ts`) and Sass color tokens (`themes/_colors.module.scss`) are two independently maintained sources of the same colors that have already drifted (`$brightGrey: #9c9c9c` in Sass vs. `brightGrey.main: "#949494"` in the MUI theme).
**Action:** Migrate to `@use`/`@forward` (mechanical, touches all 34 files) and reconcile the color drift; consider CSS custom properties as a longer-term follow-up if theming flexibility is ever needed again. Medium-High effort, no user-facing bug today — schedule opportunistically alongside other styling touches rather than as a dedicated sprint.

### Tooling

#### P2.9 — Dead/vestigial dependencies
`@types/material-ui@^0.21.17` (legacy MUI v0.x community types) has zero imports from `material-ui` anywhere. `@testing-library/jest-dom` is installed but never imported by any test file and isn't wired into `jest.config.js`.
**Action:** Confirm each is genuinely unused (`yarn why <pkg>`), then remove `@types/material-ui`; either start using `@testing-library/jest-dom` (wire it into a `setupFilesAfterEach`) or remove it too.

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
- **`.gitignore` doesn't list `.env` patterns** — no `.env` file exists today, but add the pattern preemptively before one is ever created.
- **`Skills.tsx`/`Portfolio.tsx`** — thin orchestrator components with no colocated styles/tests; acceptable as-is, just noting the convention gap.

---

## Explicitly Out of Scope

- **App Router migration.** The project is 100% Pages Router with zero partial migration (no `app/`, no `middleware.ts`, no App Router convention files anywhere). This would be a full route-by-route rewrite, not incremental. Given the SSG/ISR work already captures most of the benefit *within* Pages Router, a full App Router migration is a distinct, much larger initiative — worth a dedicated future plan if it's ever pursued, not bundled into this one.
