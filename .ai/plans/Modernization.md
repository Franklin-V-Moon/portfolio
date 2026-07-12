# Portfolio Modernization Plan

**Status:** Priority 1 and 2 complete. What remains below is P3 (low/opportunistic) — none of it is urgent or blocking.
**Scope:** Full-codebase audit of `franklinvonmoon` portfolio (originally Next.js 14, Pages Router, TypeScript, MUI v5 — now Next 16, React 19, MUI v9) against current Next.js/React standards.
**Context:** Originally the project was built to learn React; has evolved since without a full architectural pass. This document catalogs what's drifted, what's dead, and what's wrong, then proposes a path back to a modern, simple, coherent baseline.

---

## Executive Summary

All Priority 1 and 2 work is done: SSG/ISR conversion for the Assets Store, travel, and Notion guide pages; `next/font`/`next/script` adoption; the dead dark-mode context system and the deprecated `@mui/styles`/`ServerStyleSheets` pattern removed; the imperative DOM mutation in `_app.tsx` moved to CSS; the Next 16 / React 19 / MUI v9 / Node 24 major-version upgrades (which also pulled the ESLint flat-config migration forward, since `eslint-config-next@16` requires it); the `ParallaxArt.tsx` rAF cleanup bug fix; the `LanguagesColumn.tsx` keyboard-accessibility fix; a top-level error boundary in `_app.tsx`; effect-based derived state converted to `useMemo`/plain computation across `SalaryExpectationsSection.tsx`, `travel/index.tsx`, `BioDescription.tsx`, and `Experience.tsx`; the full `any` type sweep; the Sass `@import`→`@use` migration across all `.module.scss` files plus the `brightGrey` color-drift fix; removal of the dead `@types/material-ui` and `@testing-library/jest-dom` dependencies; and the postbuild pipeline hardening (clear error on missing sitemap JSON, `ts-node` now type-checks `export-meta.ts`). `yarn test`, `yarn lint`, and `yarn build` all pass cleanly, and CI is a real quality gate.

Everything below is opportunistic cleanup — no user-facing bugs, nothing blocking further work.

### Priority rollup

| Priority | Theme | Count |
|---|---|---|
| **P3 — Low / opportunistic** | Filename casing, minor version bumps | ~7 |

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
