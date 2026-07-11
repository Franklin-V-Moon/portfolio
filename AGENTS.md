# AGENTS.md

Instructions for AI coding agents (Claude Code, Cursor, Gemini CLI, or any other Agent Skills / AGENTS.md-compatible tool) working in this repository.

## Overview

Franklin Von Moon's personal portfolio site — Next.js 14 (Pages Router) + TypeScript, deployed on Vercel. Content is a mix of hardcoded TypeScript data files and a Notion CMS integration for long-form guide content.

## Commands

```bash
yarn dev              # installs deps and starts the dev server (http://localhost:3000)
yarn build            # production build (runs `postbuild` -> export-meta + sitemap generation, see below)
yarn start            # serve a production build
yarn lint             # next lint (eslint-config-next + .eslintrc.json rules)
yarn test             # run all Jest tests
yarn test <pattern>   # run tests matching a file/name pattern, e.g. `yarn test GuideCard`
yarn test --watch     # watch mode
```

There is no separate typecheck script; `tsc` is only invoked implicitly via `next build`/`next dev`.

Tests are colocated with source as `*.test.ts`/`*.test.tsx` next to the file under test (e.g. `src/guides/guideDataService.ts` + `src/guides/guideDataService.test.ts`), using Jest + `jest-environment-jsdom` + `@testing-library/react`. `jest.config.js` uses `next/jest` for automatic Next.js/SWC config, so no separate Babel config is needed.

## Architecture

**Routing**: `pages/` is the Next.js Pages Router entry point. Each route is thin — it wires `getServerSideProps`/`getStaticProps` to a data source and renders components from the matching `src/<feature>` directory. Dynamic routes (`[link].tsx`) look up a single item by its `link` slug from a metadata array.

**Feature-based source layout**: `src/` is organized by page/feature (`homepage`, `folio`, `guides`, `projects`, `travel`, `assets`, `global`), not by technical layer. Each feature directory contains its own components, styles (`*.module.scss`), and (for guides/folio) data-shaping logic. `src/global` holds cross-page chrome (`Navbar`, `PageContainer`).

**Content model — two sources of truth**:
1. **`src/datasources/*.ts`** — hand-authored TypeScript arrays/objects that back most pages (`HomepageMetaData.ts`, `SkillsMetaData.ts` for `/folio`, `ProjectMetaData.ts`, `TravelMetaData.ts`, `SalaryExpectationMetaData.ts`, `NavBarMetaData.tsx` for the navbar, `AssetMetaData.ts`, `GuideMetaData.ts`). Editing content on most pages means editing one of these files and pushing — see README.md's "How To Update Content" section (or the `update-content` skill in `.agents/skills/`) for the exact shape each metadata type expects.
2. **Notion CMS** — full guide article bodies live in Notion pages, referenced by ID from `GuideMetaData.ts` and fetched server-side per-request via `notion-client`'s `NotionAPI` in `pages/guides/[link].tsx`, then rendered with `react-notion-x`'s `NotionRenderer`. If the Notion fetch fails, the page falls back to `ErrorContent` rather than throwing.

**Build-time metadata export**: `postbuild` runs `utils/export-meta.ts` (via `ts-node`), which serializes `AssetMetaData`, `TravelMetaData`, and `GuideMetaData` to JSON under `utils/sitemap-meta/`, then `next-sitemap` (configured in `next-sitemap-config.js`) uses those JSON files to generate sitemap entries for dynamic routes. If you add a new datasource that needs sitemap entries, wire it into `export-meta.ts` and `next-sitemap-config.js` together.

**Theming**: Dark mode is the only supported theme (light mode was intentionally removed — see README). `themes/GlobalTheme.tsx` wraps the app in MUI's `ThemeProvider` + a `DarkMode` React context (currently always `true`, wired through `pages/_app.tsx`'s `darkMode` state). `themes/darkMode.ts`/`lightMode.ts` define MUI theme objects; `themes/_colors.module.scss` / `_breakpoints.scss` are shared Sass tokens imported by component-level `.module.scss` files. `utils/configureCss/configureCss.ts` (`setDark`) is a helper used inside components to conditionally append a `*Dark` CSS-module class based on the `DarkMode` context.

**Styling**: Sass CSS Modules per-component (`Component.module.scss` next to `Component.tsx`), plus MUI for interactive primitives (`Tab`, `Button`, `Container`, etc.). No CSS-in-JS beyond MUI's own `sx`/theme usage. The README explicitly favors minimal npm deps and raw CSS for performance (Lighthouse score is a stated priority).

**Images**: Next/Image optimization is currently disabled (`images: { unoptimized: true }` in `next.config.js`) — this needs to be changed to optimized. SVGs are referenced as plain URL strings, not imported as React components.

## Content editing workflows

For step-by-step instructions on adding guides, or updating qualifications/experience, folio/skills, projects, or salary expectations, see the "How To Update Content" section of `README.md`, or invoke the `update-content` skill (`.agents/skills/update-content/SKILL.md`) — it documents the exact fields and file paths for each `src/datasources/*.ts` file.

## AI assistant configuration in this repo

This project supports Claude Code, Cursor, and Gemini CLI without vendor lock-in:

- **This file (`AGENTS.md`)** is the single canonical source of instructions. `CLAUDE.md` and `GEMINI.md` are thin files that import it (`@AGENTS.md`) plus any tool-specific notes — edit this file, not those.
- **Skills** live in `.agents/skills/`, following the open [Agent Skills](https://agentskills.io) standard. Cursor and Gemini CLI discover this directory natively; `.claude/skills` is a symlink to it so Claude Code sees the same skills.
- **MCP servers** are configured once in `.ai/mcp.json` and symlinked into each tool's expected location (`.mcp.json`, `.cursor/mcp.json`, `.gemini/settings.json`).
- **`.ai/context/`** holds durable project knowledge worth persisting across sessions and tools (architecture decisions, conventions not obvious from code). Read it at the start of nontrivial work; add to it when you learn something a future session/tool would need re-explained.
- **`.ai/research/`** holds dated, disposable investigation/spike notes — log findings here rather than losing them at the end of a session.

See `.ai/README.md` for the full rationale.

## Coding standards

1. Use latest versions of libraries and idiomatic approaches as of today
2. Keep it simple - NEVER over-engineer, ALWAYS simplify, NO unnecessary defensive programming. No extra features - focus on simplicity.
3. Be concise. Keep README minimal. IMPORTANT: no emojis ever
4. Do not add comments to the code
5. IMPORTANT: When hitting issues, always identify root cause before trying a fix. Do not guess. Prove with evidence, then fix the root cause.
6. Don't write or create commits unless instructed to do so

## Command Explainer

When calling the Bash tool, treat these as safe/obvious and use a short label as the `description` (no need to spell out effects): `cd`, `ls`, `pwd`, `echo`, `cat`, `mv`, `cp`, `mkdir`, `touch`, and simple git commands (`git status`, `git add`, `git diff`, `git log`, `git branch`, `git show`).

For anything else — package installs/removals, piped or chained commands, destructive or state-changing commands, unfamiliar flags, version pins — write the `description` as a plain-English explanation of what the command will concretely do, in 20 words or fewer. Name the specific thing being changed (package, file, version) rather than just restating the command verb. E.g. "Adds jest-environment-jsdom pinned to 29.7.x as a dev dependency" rather than "Install jest-environment-jsdom".
