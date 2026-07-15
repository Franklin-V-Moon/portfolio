# SEO Overhaul Plan

Site-wide SEO audit of the Next.js 14→16 (Pages Router) portfolio, performed
2026-07-14 by reading every route under `pages/`, the shared chrome in
`src/global/`, `next-sitemap-config.js`, `public/robots.txt`, and
`next.config.js`. Every finding below is cited with file:line. Findings are
grouped by priority; each has a concrete, ready-to-implement fix. Nothing in
this plan has been applied yet — it's a to-do list, not a changelog. Items
marked **[Mechanical]** need no design/content judgment call and can be
implemented directly as written. Items marked **[Needs your input]** require
a decision only you can make (branding, infra/Vercel dashboard access, or
product scope) before any code should change.

A 2026-07-15 review pass re-verified every finding against the current
codebase (some had gone stale — other work landed the same day/day after
this plan was written) and resolved several open decisions. Items are now
also marked **[Done]** (code changed, verified), **[Resolved/stale]** (the
finding no longer applies — code moved on before it was actioned), or
**[Confirmed]** (decision made, not yet implemented) where applicable.

This item was already flagged in `.ai/plans/Enhancements.md` ("5. SEO overhaul
and Fix sitemap logic") — this plan supersedes that one-liner with the actual
findings and remediation.

---

## Outstanding items requiring your input (tracked here, updated as resolved)

- [x] **0.4 — Travel `og:image` replacement.** Need a real, permanently-hosted
  image (a still frame or an existing `public/travel/` asset) to replace the
  expired presigned URL. Supply a specific file/path when ready — see 0.4
  for details.
- [ ] **1.6 — `manifest.json` icons.** `public/manifest.json` was created
  2026-07-15 using project context (name/description from `tabsData[0]`,
  `background_color`/`theme_color` from `$darkBackground` in
  `_colors.module.scss`). Its icons (`public/icons/icon-192.png`,
  `icon-512.png`) are a **functional placeholder**, not final assets —
  resized from the existing `public/favicon.ico` crescent-moon mark, whose
  real embedded detail is much lower-fidelity than its 256×256 canvas
  suggests (visibly blocky/pixelated even before upscaling to 512). Confirm
  this is acceptable to ship as-is, or supply a proper high-res source (ideally
  vector) for the moon mark. See 1.6.
- [x] **2.1 — Hidden `<h1>` removed 2026-07-15** (see 2.1 for what changed).
  Real visible `<h1>`s for `/`, `/guides`, `/guides/[link]`, `/travel` are
  still outstanding — those 4 routes now have no `<h1>` at all — and need a
  content/design decision, particularly for the homepage.
- [ ] **2.2 — `<article>` wrapping confirmed, not yet implemented.** Approved
  to wrap guide/travel/asset detail bodies in `<article>` (the `<main>` part
  of the original finding is already done elsewhere — see 2.2). Still needs
  a visual pass before landing.

**Resolved during review (2026-07-15):**
- 0.1 — canonical domain: **apex** (`franklin-v-moon.dev`), confirmed.
- 1.7 — Assets tab was re-enabled in `NavBarMetaData.tsx` by commit `5b041e2`
  (2026-07-15), one day after this plan was written — `/assets-store` is no
  longer orphaned from navigation. This finding is now stale; see updated
  note in 1.7. (0.3's wrong-array-index bug is unaffected by this and still
  live.)
- 2.6 — decided to keep folio/projects as scroll-anchored sections on `/`,
  not split into their own routes. Sitelinks will stay scoped to `/`,
  `/guides`, `/travel`, `/assets-store`.

---

## Priority 0 — Active bugs actively hurting SEO today

### 0.1 Duplicate content served on two hosts with no redirect or canonical **[Resolved: apex domain confirmed — mechanical fix ready]**
- Both `https://franklin-v-moon.dev/` and `https://www.franklin-v-moon.dev/`
  serve the identical page with no redirect between them (confirmed live —
  both fetched directly with no host-redirect). Meanwhile:
  - `public/robots.txt` (`Host: https://franklin-v-moon.dev`) and
    `next-sitemap-config.js:17` (`siteUrl = "https://franklin-v-moon.dev"`)
    both treat the **apex domain** as canonical.
  - Every hardcoded `og:url`/JSON-LD `url` in the actual page code
    (`pages/index.tsx:41`, `pages/guides/index.tsx:94,99,124`,
    `pages/travel/index.tsx:137,142,163`, `pages/assets-store/index.tsx:52,64,68`,
    `pages/guides/[link].tsx:48-49`, `pages/travel/[link].tsx:193,196`,
    `pages/travel/world-map/index.tsx:31`, plus data links in
    `src/datasources/ProjectMetaData.ts:50` and
    `src/datasources/TravelMetaData.ts:1423,3264`) uses **`www.`**.
  - No `next.config.js` redirect and no `vercel.json` exist to unify these at
    the code level — this is either handled in the Vercel dashboard's Domains
    settings, or not handled at all.
- **Why this matters**: Google will index both hosts as separate,
  near-duplicate sites, splitting link equity and (without a canonical tag,
  see 1.1) with no signal for which one it should prefer.
- **Decided (2026-07-15): apex domain.** `robots.txt`/`next-sitemap-config.js`
  already commit to the apex, so this is the least additional change.
- **Fix — still needs you**: in the Vercel project's Domains settings, set
  `franklin-v-moon.dev` as primary and force a 308/301 redirect from `www` to
  it. This step happens in the Vercel dashboard, not in code — nothing here
  can be done from the repo alone.
- **Fix — mechanical, ready to implement**: rewrite every hardcoded
  `www.franklin-v-moon.dev` reference in application code (listed above) to
  the apex `franklin-v-moon.dev`, so the code is internally consistent with
  the sitemap/robots decision already made.

### 0.2 Broken meta descriptions on every dynamic detail page **[Mechanical]**
Three pages set an invalid meta tag shape — `<meta name={var} content={var} />`
instead of `<meta name='description' content={...} />` — which produces a
non-functional, non-standard meta tag. Search engines ignore it, so **none of
these page types have ever had a real meta description**:
- `pages/guides/[link].tsx:56` — currently `<meta name={subTitle} content={topic} />`.
  Fix to `<meta name='description' content={subTitle} />` (matches the
  `description` field already used for this page's own JSON-LD, `:45`).
- `pages/travel/[link].tsx:207` — currently `<meta name={title} content={title} />`.
  Fix to a real description derived from the same `extras?.summary?.[0]`
  fallback chain already used in this page's JSON-LD (`:193`), e.g.
  `` extras?.summary?.[0] ?? `${title} — travel video from ${year}.` ``.
- `pages/assets-store/[link].tsx:25` — currently
  `<meta name={collectionData.title} content={collectionData.title} />`.
  Fix to a synthesized description, since `AssetCollectionMetaData` has no
  dedicated description field (see 2.5) — e.g.
  `` `${collectionData.title} — stock footage and wallpapers available for purchase.` ``.

### 0.3 `/assets-store` shows Travel's meta description, not its own **[Mechanical — still live]**
- `pages/assets-store/index.tsx:41,47,48,63` read `tabsData[2].pageDescription`
  for its own `<meta name="description">`, `og:description`, and JSON-LD
  `description`. `tabsData[2]` is the **Travel** tab
  (`src/datasources/NavBarMetaData.tsx:52-66`) — the real Assets tab entry
  (with its own correct copy, "Assets of digital products, stock footage and
  free wallpaper I've collected available for purchase") is now at
  `tabsData[3]` (re-enabled 2026-07-15, see 1.7), not index 2, so the stale
  array index still silently pulls Travel's copy instead.
- **Root cause**: indexing into a shared array by position instead of by an
  explicit key. Re-enabling the Assets tab (1.7) didn't fix this — it just
  moved the correct entry to a different wrong index.
- **Fix**: read `tabsData[3].pageDescription` directly, or better, pull the
  description into a local constant in `pages/assets-store/index.tsx`
  decoupled from `tabsData` indexing entirely, so this page's own copy can't
  silently break again if the array order changes.

### 0.4 Broken `og:image` on both travel routes **[Still needs you — checkbox above does not mean this is fixed in code]**
- **Correction to the original finding**: the two references aren't
  identical. `pages/travel/world-map/index.tsx:26` has the full presigned
  `private-user-images.githubusercontent.com` URL with the embedded JWT
  (`X-Amz-Expires=300`, issued 2024-09-16) — that token **expired within 5
  minutes of being generated in 2024**. `pages/travel/index.tsx:159` (per
  `git blame`, unchanged since 2025-09-04) has the **same image ID but with
  the JWT query string already stripped off** — `private-user-images`
  URLs are always presigned; without the query string this one almost
  certainly 404s/403s outright rather than merely being expired. Either way,
  both are dead links today.
- **Still needs you**: nothing in the codebase has changed for this item.
  Supply (or point at) a real, permanently-hosted image for the Travel
  section's link-preview card — e.g. a still frame or a `public/travel/`
  asset already in the repo. Don't guess an image or invent a path here; a
  wrong choice is worse than leaving it flagged. Once an image is chosen,
  wiring it into `og:image` and the new `twitter:image` tags (see 1.3) is a
  one-line change per file.

### 0.5 `og:url` on `/travel/world-map` points at the wrong path **[Mechanical]**
- `pages/travel/world-map/index.tsx:30-31` has
  `content='https://www.franklin-v-moon.dev/world-map'` — missing the
  `/travel` path segment (the actual route is `pages/travel/world-map/index.tsx`
  → `/travel/world-map`). Fix to `.../travel/world-map` (fold into the
  apex-domain fix in 0.1 once that's confirmed).
- Also remove the invalid duplicate `<meta name='Travel' content={description} />`
  at `:19` (not a recognized `<meta>` name/content pairing — `description`
  already has a correct, separate tag at `:21`).

### 0.6 `@graph` misused for a single entity in travel video JSON-LD **[Mechanical]**
- `pages/travel/[link].tsx:188` wraps a lone `VideoObject` in
  `"@graph": { ... }` (a bare object). `@graph` is a JSON-LD construct for
  bundling **multiple** top-level entities under one context and is
  conventionally an **array**; wrapping a single entity in a bare `@graph`
  object is non-standard and risks Google's Rich Results parser not
  recognizing the `VideoObject` at all.
- **Fix**: remove the `@graph` wrapper — make the `VideoObject` the direct
  child of the JSON-LD root (`"@context"` + `"@type": "VideoObject"` at the
  top level), matching the pattern already used correctly by every other
  page's JSON-LD (`Person`, `Article`, `CollectionPage`).

---

## Priority 1 — Missing SEO fundamentals

### 1.1 No `<link rel="canonical">` anywhere **[Mechanical]**
- Confirmed zero matches for `canonical` anywhere in `pages/`/`src/`. Add one
  canonical tag per route, always pointing at the clean apex-domain path (no
  query string):
  - `/`, `/guides`, `/travel`, `/travel/world-map`, `/assets-store` — static
    hardcoded canonical per page.
  - `/guides/[link]`, `/travel/[link]`, `/assets-store/[link]` — canonical
    built from the route's own slug variable (`link` / `hostedLink`).
- This matters most for `/travel` and `/guides`, which both carry
  query-string sort/filter/search state
  (`src/travel/urlQuery.ts`'s `buildTravelQuery`,
  `src/guides/filter-sort/urlQuery.ts`'s `buildGuidesQuery`, both written to
  the URL via `history.replaceState` — `pages/travel/index.tsx:96-103`,
  `pages/guides/index.tsx:60-70`) — without a canonical tag, every
  sort/filter/search permutation is a distinct, independently indexable URL
  competing with the bare page for the same content.

### 1.2 No viewport meta tag on any page except one **[Mechanical]**
- Pages Router does **not** auto-inject `<meta name="viewport">` (confirmed:
  no `charSet`/viewport auto-injection exists anywhere in
  `node_modules/next/dist/pages/`). Only
  `pages/travel/world-map/index.tsx:28` sets one; every other route (home,
  guides ×2, travel ×2, assets-store ×2 — 7 of 8 routes) has none, which is
  a real mobile-usability/SEO signal Google evaluates per-page.
- **Fix**: add `<meta name='viewport' content='width=device-width, initial-scale=1' />`
  once, globally, in `pages/_document.tsx`'s `<Head>` (renders on every route
  regardless of page-level `<Head>` content), and remove the now-redundant
  per-page copy on `/travel/world-map`.
- Also add `<meta charSet='utf-8' />` in the same place — also confirmed
  absent everywhere and not auto-injected by Next.js Pages Router.

### 1.3 No Twitter Card meta tags anywhere **[Mechanical]**
- Confirmed zero `twitter:*` meta tags anywhere in `pages/`/`src/`. Without
  these, links shared on Twitter/X fall back to whatever OG tags happen to
  be present (patchy per 1.4) rather than a dedicated, correctly-sized card
  preview — directly relevant to the "shows neatly when shared/previewed"
  goal for this overhaul, alongside the OG tags themselves.
- **Fix**: add `twitter:card` (`summary_large_image` works for all route
  types here), `twitter:title`, `twitter:description`, and `twitter:image`
  (must be an absolute URL, same requirement as `og:image`) alongside the
  OG tags on every route. Cheapest to do in the same pass as 1.4, since both
  reuse the same title/description/image values per page.

### 1.4 Missing Open Graph tags on all three dynamic detail page types **[Mechanical — partially stale, corrected]**
- `pages/guides/[link].tsx` has **no OG tags at all**. Still accurate.
- `pages/assets-store/[link].tsx:28` has only `og:image`, and it's still a
  **relative** path (`` /assets/${collectionData.hostedLink}/${collectionData.thumbnail} ``)
  — not spec-valid, needs converting to absolute. Still accurate.
- `pages/travel/[link].tsx:210` has only `og:image` too, but **this part is
  now stale**: its value is already an absolute URL
  (`https://github.com/user-attachments/assets/...`), not relative as
  originally noted — no fix needed for this specific tag. It's still missing
  `og:title`/`og:description`/`og:url`/`og:type` like the other two.
- **Fix**: add the full remaining set (`og:title`, `og:description`,
  `og:url`, `og:type`) to all three, and convert only
  `assets-store/[link].tsx`'s `og:image` to an absolute URL. Suggested
  `og:type`: `article` for guides, `video.other` for travel videos (the Open
  Graph video namespace's generic type), `website` for asset collections (no
  official OG `product` type without a separate namespace).

### 1.5 No custom 404 page **[Mechanical]**
- No `pages/404.tsx` exists — Next.js's built-in default 404 is unbranded,
  has none of this site's favicon/meta conventions, and doesn't help a
  visitor who followed a stale/broken link get back into the site (relevant
  given 0.1's duplicate-host situation could itself generate more broken
  links during a future migration).
- **Fix**: add `pages/404.tsx` — reuse the existing `ErrorContent` component
  (`utils/error/ErrorContent.tsx`, already used for "not found" states on
  guide/travel/asset detail pages) inside `PageContainer`, with its own
  `<title>`/`<meta name="description">`/favicon/`<meta name="robots"
  content="noindex">` (a 404 page is exactly the one case where `noindex` is
  correct) and a link back to the homepage.

### 1.6 No `manifest.json` / `theme-color` **[Done 2026-07-15 — icons are a placeholder, see below]**
- No `public/manifest.json` and no `<link rel="manifest">`/`<meta
  name="theme-color">` anywhere. This affects "Add to Home Screen"
  presentation and Chrome's mobile UI chrome color — a mild PWA/mobile
  signal, not a hard indexing requirement.
- **Done**: created `public/manifest.json` from existing project context —
  `name`/`short_name`/`description` from the homepage's own copy
  (`tabsData[0].pageDescription` in `NavBarMetaData.tsx`), `background_color`
  and `theme_color` both set to `#13181c` (`$darkBackground` in
  `themes/_colors.module.scss` — the site supports only dark mode, per
  `AGENTS.md`). Wired `<link rel="manifest">` and `<meta name="theme-color">`
  into `pages/_document.tsx`'s global `<Head>`.
- **Icons are a placeholder, not a final asset**: `public/icons/icon-192.png`
  and `icon-512.png` were generated by resizing the existing
  `public/favicon.ico` (the crescent-moon mark used across the site's
  colored per-tab favicons). That `.ico` reports a 256×256 canvas, but its
  actual embedded art is much lower fidelity — visibly blocky even at native
  size, let alone upscaled to 512. No higher-resolution or vector source for
  this mark exists anywhere else in the repo (checked `public/`,
  `src/assets`, and every SVG under `public/homepage/` — the only "moon"
  SVGs there are unrelated large parallax-scene illustrations, not the
  brand mark). These placeholders are good enough to make the manifest
  functional today; a crisp "Add to Home Screen" icon still needs a real
  high-res (ideally vector) version of the moon mark supplied separately.

### 1.7 `/assets-store` orphaned from navigation **[Resolved/stale — tab re-enabled 2026-07-15]**
- **Stale finding.** This was accurate when audited on 2026-07-14 (Assets tab
  commented out at `NavBarMetaData.tsx:67-81`), but commit `5b041e2`
  ("Navbar and a11y sizing fixes", 2026-07-15) re-enabled the Assets tab —
  confirmed by reading the current `NavBarMetaData.tsx`, which now has 4
  active entries (`/`, `/guides`, `/travel`, `/assets-store`) with no
  commented-out block. `/assets-store` is linked from the navbar again, so it
  is no longer an orphaned page — no further action needed here.
- **Does not affect 0.3**: that finding (`/assets-store/index.tsx:41` reading
  `tabsData[2]`, which is Travel, instead of its own entry at `tabsData[3]`)
  is a separate array-indexing bug, unrelated to whether the tab is
  commented out, and is still live. Fix as written in 0.3.

---

## Priority 2 — Structural & content issues

### 2.1 A hidden `<h1>` was injected on every single page **[Done — removed 2026-07-15, real per-page h1s still outstanding]**
- **Stale finding, corrected before removal.** By the time this was actioned,
  commit `93e8817` (2026-07-14, "use standard clip-rect visuallyHidden
  technique for per-route h1") had already replaced the original
  `position: absolute; z-index: -1; font-size: 1px;` hack with the standard
  clip-rect "sr-only" accessibility pattern (`themes/_accessibility.module.scss`).
  That pattern is **not** the kind of hidden text Google's spam policies
  target — it's the industry-standard way to expose content to screen
  readers only, not a manipulative cloaking technique. Removing it was a
  simplification, not risk mitigation.
- **Sitelinks are unaffected either way.** Sitelinks are generated
  algorithmically from site structure, internal linking, and click behavior
  — not from any single page's `<h1>` content — and there's no manual way to
  request them (Search Console's old demotion tool was deprecated years
  ago).
- **Done**: removed the injected `<h1>` from `Navbar.tsx` (was line 40) and
  its dedicated test in `Navbar.test.tsx`; `yarn test Navbar` passes. The
  `.visuallyHidden` class itself was kept — it's still legitimately used for
  the screen-reader-only "PORTFOLIO" label on the icon-only home tab
  (now `Navbar.tsx:92`, shifted up by the removal).
- **Still outstanding (not done)**: `/`, `/guides`, `/guides/[link]`,
  `/travel` now have **zero** `<h1>` (they previously had only the hidden
  one). `pages/travel/[link].tsx`, `pages/assets-store/index.tsx`,
  `pages/assets-store/[link].tsx`, `pages/travel/world-map/index.tsx` already
  had their own visible `<h1>` and now correctly have exactly one. Giving the
  four heading-less routes a real, visible `<h1>` (the homepage
  headshot/bio section is the awkward case — no natural single heading
  today) is a real content/layout decision, deferred for a dedicated visual
  pass rather than done blind alongside this removal.

### 2.2 No semantic `<article>`/`<section>` on detail pages **[Confirmed 2026-07-15 — proceed with corrected recommendation]**
- **Stale part of the original finding**: this plan originally claimed zero
  `<main>` wrapped real page content. That's no longer true — commit
  `9abaa1b` (2026-07-14, "add real `<main>` landmark and skip-to-content
  link") added `<main id='main-content'>` to `pages/_app.tsx:31`, wrapping
  every route's rendered content globally. `src/global/PageContainer.tsx:10`
  is still a plain `<div>` (confirmed by re-reading it), but it must **stay**
  a `<div>` now — converting it to `<main>` too, as originally recommended,
  would create two nested `<main>` landmarks per page, itself an
  accessibility anti-pattern (a document should expose exactly one `<main>`
  landmark).
- **Still accurate**: `grep` for `<article>`/`<section>` across `pages/` and
  `src/` returns zero hits. Guide articles, travel video pages, and asset
  collection pages (all textbook `<article>` candidates) are still built
  entirely from `<div>`s.
- **Confirmed recommendation — approved to implement**: wrap the
  Notion-rendered guide body, travel video detail body, and asset collection
  body each in `<article>`. Do **not** touch `PageContainer`'s own wrapper
  element or `_app.tsx`'s `<main>` — those are already correct. Still worth a
  visual pass before landing, since it touches rendering for the
  guide/travel/asset detail routes.

### 2.3 Heading hierarchy skips a level on travel detail pages **[Documented only]**
- `pages/travel/[link].tsx` uses `<h2>` for its section headers (Summary,
  Scores, Advice, Challenges, Itinerary, Music Used, Links, Instagram, Up
  Next — lines 340, 353, 411, 451, 470, 481, 497, 652, 669, 694, 711, 718),
  then jumps straight to `<h4>`/`<h5>` for sub-labels (e.g. `<h5
  className={styles.skipToText}>Skip to:</h5>` at `:257`), skipping `<h3>`
  entirely. Minor — worth a cleanup pass, low urgency relative to items
  above.

### 2.4 No `BreadcrumbList` / `WebSite` / `Organization` schema **[Documented only]**
- Structured data exists for `Person` (home), `CollectionPage` (guides,
  travel, assets-store indexes), `Article` (guide detail), `VideoObject`
  (travel detail) — a solid base — but nothing declares the site itself as a
  `WebSite`/`Organization` entity (which unlocks Google's sitelinks search
  box eligibility) or provides `BreadcrumbList` markup for the two-level
  detail pages (`/guides/[link]`, `/travel/[link]`, `/assets-store/[link]`),
  which is a cheap way to get breadcrumb rich results in search listings.
  Reasonable follow-up once Priority 0/1 items are settled.

### 2.5 No dedicated alt-text/description fields in content datasources **[Documented only]**
- `src/datasources/AssetMetaData.ts`'s `AssetCollectionMetaData`/
  `AssetItemMetaData` shape (`src/assets/types.ts`) has no `alt` or
  `description` field — alt text for every asset image is derived purely
  from `item.title`/`collection.title` at render time
  (`src/assets/components/AssetItem/AssetItem.tsx:40`,
  `AssetCollection.tsx:29`), which is also why 0.2/1.4's fix for
  `/assets-store/[link]`'s meta description has to synthesize generic copy.
  If asset-store SEO becomes a priority, add optional `description`/`alt`
  fields to the schema so this content can be authored deliberately per
  collection instead of derived from the title.

### 2.6 Homepage sections have no URL, title, or metadata of their own **[Decided (2026-07-15): out of scope]**
- There is no `/folio` or `/projects` route — "folio/skills", "projects",
  "experience/qualifications", "salary calculator", and "contact" are all
  rendered as scroll-anchored sections of the single `/` route
  (`src/homepage/Portfolio.tsx:10-21`, composing `ForYou`, `Experience`,
  `Qualifications`, `Folio`, `Salary`, `Contact`). None of these sections is
  independently indexable, shareable, or has its own title/description —
  someone searching for, e.g., a specific project by name can only ever land
  on the generic homepage.
- **Decided**: keep the single-page scroll experience as-is; not splitting
  Folio/Projects into their own routes for this overhaul. Consequence for
  the sitelinks goal stated at the top of this plan: sitelinks will stay
  scoped to the 4 existing routes (`/`, `/guides`, `/travel`,
  `/assets-store`) — Folio and Projects cannot appear as independent
  sitelinks or independently rank in search under this decision. Revisit as
  a separate initiative if that becomes a priority later.

---

## Priority 3 — Documentation drift (unrelated to SEO itself, found during this audit)

### 3.1 `AGENTS.md` claims about the codebase are stale **[Mechanical]**
- `AGENTS.md:41` says Next/Image optimization "is currently disabled
  (`images: { unoptimized: true }` in `next.config.js`) — this needs to be
  changed to optimized." `next.config.js` (read in full — 6 lines, only
  `reactStrictMode: true`) shows this was already fixed: `git log` shows
  commit `a6f12d2` ("Update image optimizations", 2026-07-12) already
  removed the `unoptimized: true` block. `AGENTS.md` needs this now-incorrect
  callout removed.
- `AGENTS.md`'s overview line calls this "Next.js 14 (Pages Router)", but
  `package.json:28` pins `"next": "^16.2.10"`. Update the version reference
  to Next.js 16.

---

## Priority 4 — Longer-term / architectural follow-ups

- **Centralize tag management.** No `next-seo` (or equivalent) package is
  installed — every page hand-rolls its own `<Head>` block, which is almost
  certainly why the exact same class of bug (0.2's invalid `<meta
  name={var}>` shape) was independently repeated across three different
  files. A small shared `<SeoHead title description image url type>`
  component (or adopting `next-seo`) would make this class of bug
  structurally harder to reintroduce. Deliberately not proposed as a
  Priority 0/1 mechanical fix — introducing a shared abstraction is a bigger
  design decision than the mechanical fixes above, and AGENTS.md's own
  coding standards call for avoiding premature abstraction; worth
  reconsidering if a fourth instance of the same bug shows up.
- **Dynamic OG image generation.** Every `og:image` is either a hardcoded
  external URL or a static file. `@vercel/og`'s `ImageResponse` (or
  `next/og`) could generate on-brand, per-page OG images (title + thumbnail
  composited) at the edge, removing the whole class of dead/expired-URL
  bugs like 0.4.
- **`/travel` uses `getServerSideProps`, not static generation**
  (`pages/travel/index.tsx:259-272` — confirmed via reading the file's
  data-fetching export). Everything else under `pages/` is statically
  generated (`getStaticProps`/`getStaticPaths`). SSR here means no CDN
  caching of the HTML and slower TTFB for what's largely static content
  (only the initial sort/search state genuinely varies per request) — worth
  reassessing whether this needs to be SSR at all, or could be static with
  client-side sort/filter as it already does for the rest of its
  interactivity.
- **Image sitemap misuse.** `next-sitemap-config.js`'s
  `generateWallpaperUrls` (`:46-57`) adds individual static wallpaper PNGs
  as top-level `<url>` sitemap entries (`changefreq: yearly, priority:
  0.4`). Standard practice is the sitemap `<image:image>` extension nested
  under the page that displays the image, not a separate top-level URL
  entry per static asset. Low priority, but worth fixing if the sitemap gets
  a dedicated pass.

---

## Suggested execution order

1. **0.1 and 0.4 decided/tracked** — domain is apex (still needs the Vercel
   dashboard redirect, not code); the replacement travel image is tracked at
   the top of this doc. Several mechanical fixes below (canonical/OG/Twitter
   tags) are cheaper to write once, correctly, now that 0.1 is settled.
2. Priority 0 mechanical fixes (0.2, 0.3, 0.5, 0.6) — independent, low-risk,
   no shared files between them.
3. Priority 1 mechanical fixes (1.1–1.5) — mostly additive `<Head>` content;
   1.2's `_document.tsx` change is global and worth doing once, early.
4. ~~Priority 1 decisions (1.6, 1.7)~~ — both resolved 2026-07-15: 1.6's
   manifest is done (icon quality still flagged), 1.7 was stale (tab already
   re-enabled).
5. Priority 2: 2.1 is done. 2.2 is confirmed but not yet implemented — do it
   with visual verification (via the `run` skill), since it touches
   rendering on the guide/travel/asset detail routes.
6. Priority 3 (AGENTS.md drift) — trivial, do any time.
7. Priority 4 — re-evaluate after the above lands; not urgent.

## Verification checklist (once fixes are implemented)

- [ ] `yarn lint` — clean.
- [ ] `yarn build` — clean, all pages prerender without new warnings.
- [ ] Visual pass (via the `run` skill / Playwright) on `/`, one guide detail
      page, one travel detail page, one asset collection page, and the new
      `/404` — confirm no layout regression from the `<Head>` changes and
      that the 404 page renders correctly.
- [ ] View-source (or `curl`) each route and confirm exactly one real
      `<meta name="description">`, one `<link rel="canonical">`, and a
      `<meta name="viewport">` are present.
- [ ] Once 0.1 (domain) and 0.4 (image) are resolved: run Google's Rich
      Results Test against `/`, a guide detail page, and a travel detail
      page to confirm `Person`/`Article`/`VideoObject` validate after the
      `@graph` fix (0.6) and domain rewrite.
- [ ] After deploying: check Google Search Console for a coverage drop or
      spike once the canonical/domain fixes go live, and (re-)submit
      `sitemap.xml` if the canonical host changes.
