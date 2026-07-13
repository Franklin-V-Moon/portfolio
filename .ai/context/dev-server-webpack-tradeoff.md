# `next dev` is forced to `--webpack`, not Turbopack — known trade-off

`package.json`'s `dev` script runs `next dev --webpack` (Next.js 16 defaults to
Turbopack otherwise). This is deliberate, not an oversight, and trades one bug
for a smaller one:

- **Turbopack dev** breaks `@mui/material-nextjs`'s `AppCacheProvider`
  cache-key propagation, so every MUI component hydrates with mismatched
  css-/mui- prefixed classnames — a hydration error on *every single page
  load* (commit `0666c22`).
- **Webpack dev** (current default) instead cannot serve any `[link]`
  dynamic route (`/guides/[link]`, `/travel/[link]`, `/assets-store/[link]`
  all 404 immediately, regardless of `fallback: "blocking"` vs
  `fallback: false` — confirmed both are affected). No compile log is ever
  emitted for the page, meaning the dev router never dispatches to it. This
  reproduces after a full `rm -rf .next` restart, so it isn't a stale-cache
  artifact.

Both are real Next.js 16.2.10 regressions in dev mode only — `next build` +
`next start` render all routes correctly under either compiler, hydration
issues included, so production is unaffected either way.

**Net effect**: to preview a guide, travel video, or asset collection page
while developing, run `yarn build && yarn start` instead of relying on
`yarn dev` for those specific routes. Revisit this trade-off next time
`next` or `@mui/material-nextjs` gets upgraded — either bug being fixed
upstream would let the other compiler be used again.

Full investigation notes: `.ai/plans/existingLogIssues.md` (items 3 and 5 —
the webpack dev-mode file watcher also throws constant
`EMFILE: too many open files` errors that don't reproduce under Turbopack,
likely coupled to the same tooling).
