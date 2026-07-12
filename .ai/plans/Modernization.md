# Portfolio Modernization Plan

**Status:** Complete. All Priority 1, 2, and 3 items are done; no further items remain in this plan.
**Scope:** Full-codebase audit of `franklinvonmoon` portfolio (originally Next.js 14, Pages Router, TypeScript, MUI v5 — now Next 16, React 19, MUI v9) against current Next.js/React standards.
**Context:** Originally the project was built to learn React; has evolved since without a full architectural pass. This document catalogs what's drifted, what's dead, and what's wrong, then proposes a path back to a modern, simple, coherent baseline.

---

## Executive Summary

All planned work is done:

- **Priority 1:** SSG/ISR conversion for the Assets Store, travel, and Notion guide pages; `next/font`/`next/script` adoption; the dead dark-mode context system and the deprecated `@mui/styles`/`ServerStyleSheets` pattern removed; the imperative DOM mutation in `_app.tsx` moved to CSS; and the Next 16 / React 19 / MUI v9 / Node 24 major-version upgrades (which also pulled the ESLint flat-config migration forward, since `eslint-config-next@16` requires it).
- **Priority 2:** the `ParallaxArt.tsx` rAF cleanup bug fix; the `LanguagesColumn.tsx` keyboard-accessibility fix; a top-level error boundary in `_app.tsx`; effect-based derived state converted to `useMemo`/plain computation across `SalaryExpectationsSection.tsx`, `travel/index.tsx`, `BioDescription.tsx`, and `Experience.tsx`; the full `any` type sweep; the Sass `@import`→`@use` migration across all `.module.scss` files plus the `brightGrey` color-drift fix; removal of the dead `@types/material-ui` and `@testing-library/jest-dom` dependencies; and the postbuild pipeline hardening.
- **Priority 3:** the four lowercase `.module.scss` filenames renamed to match their PascalCase components (`Searchbar`, `VideoLibrary`, `AssetItem`, `AssetCollection`); `tsconfig.json`'s `target` bumped from `es5` to `ES2017` (matching Next 16's own suggested default); the local `AssetCollection` page component in `pages/assets-store/[link].tsx` renamed to `AssetCollectionPage` to remove the shadowing collision with `src/assets/components/AssetCollection/AssetCollection.tsx`; `Navbar.tsx`'s `tabIndex` state renamed to `selectedTab` to stop colliding with the real HTML `tabIndex` attribute used later in the same file; and `.gitignore` now lists `.env` patterns preemptively.

`yarn test`, `yarn lint`, and `yarn build` all pass cleanly, and CI is a real quality gate.

---

## Explicitly Out of Scope

- **App Router migration.** The project is 100% Pages Router with zero partial migration (no `app/`, no `middleware.ts`, no App Router convention files anywhere). This would be a full route-by-route rewrite, not incremental. Given the SSG/ISR work already captures most of the benefit *within* Pages Router, a full App Router migration is a distinct, much larger initiative — worth a dedicated future plan if it's ever pursued, not bundled into this one.
