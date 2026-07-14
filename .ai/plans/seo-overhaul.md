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

This item was already flagged in `.ai/plans/Enhancements.md` ("5. SEO overhaul
and Fix sitemap logic") — this plan supersedes that one-liner with the actual
findings and remediation.

---

## Priority 0 — Active bugs actively hurting SEO today

### 0.1 Duplicate content served on two hosts with no redirect or canonical **[Needs your input]**
- Both `https://franklin-v-moon.dev/` and `https://www.franklin-v-moon.dev/`
  serve the identical page with no redirect between them (confirmed live —
  both fetched directly with no host-redirect). Meanwhile:
  - `public/robots.txt` (`Host: https://franklin-v-moon.dev`) and
    `next-sitemap-config.js:17` (`siteUrl = "https://franklin-v-moon.dev"`)
    both treat the **apex domain** as canonical.
  - Every hardcoded `og:url`/JSON-LD `url` in the actual page code
    (`pages/index.tsx:41`, `pages/guides/index.tsx:94,99,124`,
    `pages/travel/index.tsx:137,142,163`, `pages/assets-store/index.tsx:52,64,68`,
    `pages/guides/[link].tsx:48-49`, `pages/travel/[link].tsx:195,198`,
    `pages/travel/world-map/index.tsx:31`, plus data links in
    `src/datasources/ProjectMetaData.ts:50` and
    `src/datasources/TravelMetaData.ts:1423,3264`) uses **`www.`**.
  - No `next.config.js` redirect and no `vercel.json` exist to unify these at
    the code level — this is either handled in the Vercel dashboard's Domains
    settings, or not handled at all.
- **Why this matters**: Google will index both hosts as separate,
  near-duplicate sites, splitting link equity and (without a canonical tag,
  see 1.1) with no signal for which one it should prefer.
- **Fix — needs you**: in the Vercel project's Domains settings, set one
  domain as primary and force a 308/301 redirect from the other to it. Given
  `robots.txt`/`next-sitemap-config.js` already commit to the apex domain in
  code, redirecting `www` → apex is the path of least additional change.
- **Fix — mechanical, once the domain is confirmed**: rewrite every
  hardcoded `www.franklin-v-moon.dev` reference in application code (listed
  above) to the apex `franklin-v-moon.dev`, so the code is internally
  consistent with the sitemap/robots decision already made.

### 0.2 Broken meta descriptions on every dynamic detail page **[Mechanical]**
Three pages set an invalid meta tag shape — `<meta name={var} content={var} />`
instead of `<meta name='description' content={...} />` — which produces a
non-functional, non-standard meta tag. Search engines ignore it, so **none of
these page types have ever had a real meta description**:
- `pages/guides/[link].tsx:56` — currently `<meta name={subTitle} content={topic} />`.
  Fix to `<meta name='description' content={subTitle} />` (matches the
  `description` field already used for this page's own JSON-LD, `:45`).
- `pages/travel/[link].tsx:209` — currently `<meta name={title} content={title} />`.
  Fix to a real description derived from the same `extras?.summary?.[0]`
  fallback chain already used in this page's JSON-LD (`:193`), e.g.
  `` extras?.summary?.[0] ?? `${title} — travel video from ${year}.` ``.
- `pages/assets-store/[link].tsx:25` — currently
  `<meta name={collectionData.title} content={collectionData.title} />`.
  Fix to a synthesized description, since `AssetCollectionMetaData` has no
  dedicated description field (see 2.5) — e.g.
  `` `${collectionData.title} — stock footage and wallpapers available for purchase.` ``.

### 0.3 `/assets-store` shows Travel's meta description, not its own **[Mechanical]**
- `pages/assets-store/index.tsx:41,47,48,63` read `tabsData[2].pageDescription`
  for its own `<meta name="description">`, `og:description`, and JSON-LD
  `description`. `tabsData[2]` is the **Travel** tab
  (`src/datasources/NavBarMetaData.tsx:52-66`) — the real Assets tab entry
  (which had its own correct copy, "Assets of digital products, stock
  footage and free wallpaper I've collected available for purchase") is
  commented out at `NavBarMetaData.tsx:67-81`, so the stale array index
  silently falls through to whatever tab happens to sit at index 2.
- **Root cause**: indexing into a shared array by position instead of by an
  explicit key, combined with commenting out (rather than removing) the
  Assets entry.
- **Fix**: pull the same, already-authored description text out of the
  comment and into a local constant directly in
  `pages/assets-store/index.tsx`, decoupled from `tabsData` indexing
  entirely, so `/assets-store` no longer depends on the (currently-disabled)
  nav tab array for its own copy.

### 0.4 Expired presigned image URL used as `og:image` **[Needs your input]**
- `pages/travel/index.tsx:159` and `pages/travel/world-map/index.tsx:26` both
  hardcode the same `private-user-images.githubusercontent.com` URL with an
  embedded JWT (`X-Amz-Expires=300`, issued 2024-09-16) — this presigned URL
  **expired within 5 minutes of being generated in 2024** and has been a
  dead link/broken preview image for both pages ever since.
- **Fix — needs you**: supply (or point at) a real, permanently-hosted image
  for the Travel section's link-preview card — e.g. a still frame or a
  `public/travel/` asset already in the repo. Don't guess an image or invent
  a path here; a wrong choice is worse than leaving it flagged. Once an
  image is chosen, wiring it into `og:image` and the new `twitter:image`
  tags (see 1.3) is a one-line change per file.

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
- `pages/travel/[link].tsx:190` wraps a lone `VideoObject` in
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

### 1.3 No `twitter:card` tags anywhere **[Mechanical]**
- Zero `twitter:*` meta tags exist anywhere in the repo. Link previews on
  X/Twitter fall back to whatever Open Graph tags exist (which, per 1.4
  below, are incomplete or missing on several routes), and other platforms
  that do check Twitter Card tags specifically (some Slack/Discord
  configurations) have nothing to read.
- **Fix**: add a `summary_large_image` Twitter Card block (`twitter:card`,
  `twitter:title`, `twitter:description`, `twitter:image`) to every page
  that already has an Open Graph block, reusing the same
  title/description/image values so the two stay in sync by construction.
  `/travel` and `/travel/world-map`'s `twitter:image` can't be finished
  until 0.4 is resolved (currently would point at the same broken URL as
  `og:image`).

### 1.4 Missing Open Graph tags on all three dynamic detail page types **[Mechanical]**
- `pages/guides/[link].tsx` has **no OG tags at all**.
- `pages/travel/[link].tsx` has only `og:image` (relative path, not
  spec-valid as an absolute URL).
- `pages/assets-store/[link].tsx` has only `og:image` (also relative).
- **Fix**: add the full set (`og:title`, `og:description`, `og:url`,
  `og:type`) to all three, and convert every `og:image` to an absolute URL
  (spec requires absolute URLs for `og:image`/`twitter:image`). Suggested
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

### 1.6 No `manifest.json` / `theme-color` **[Needs your input]**
- No `public/manifest.json` and no `<link rel="manifest">`/`<meta
  name="theme-color">` anywhere. This affects "Add to Home Screen"
  presentation and Chrome's mobile UI chrome color — a mild PWA/mobile
  signal, not a hard indexing requirement.
- **Needs you**: a manifest needs real icon assets (typically 192×192 and
  512×512 PNGs) and a deliberate `theme-color`/`background_color` choice
  that matches the site's brand — a design decision, not a mechanical fix.
  Either supply icons/colors, or confirm this is low-enough priority to skip.

### 1.7 `/assets-store` is orphaned from navigation but still fully indexed **[Needs your input]**
- `src/datasources/NavBarMetaData.tsx:67-81` has the Assets tab commented
  out, so `/assets-store` has **zero internal links** pointing to it
  anywhere in the site's own navigation — yet it's still fully crawlable
  (`public/robots.txt` has no disallow), still has no `noindex`, and is
  still explicitly listed in `next-sitemap-config.js`'s per-path priority
  table (`:64-79`, priority `0.8`) and appears in the generated
  `public/sitemap-0.xml`.
- This is an internal-linking anti-pattern: pages with no internal links
  pointing at them get less crawl priority and no link equity, regardless of
  what the sitemap claims.
- **Fix — needs you**: this is a product decision, not a bug — either (a)
  re-enable the Assets tab in the navbar (uncomment
  `NavBarMetaData.tsx:67-81`) if the store should be publicly promoted, or
  (b) if it's intentionally soft-launched/unlisted, explicitly exclude it
  from `next-sitemap-config.js` and add `noindex` to its `<Head>` until it's
  ready.

---

## Priority 2 — Structural & content issues

### 2.1 A hidden `<h1>` is injected on every single page **[Needs your input]**
- `src/global/navigation/Navbar.tsx:42` renders
  `<h1 className={styles.behindNav}>{tabsData[selectedTab].pageDescription}</h1>`
  on **every route** (`Navbar` is mounted globally in `pages/_app.tsx:30`).
  Its CSS (`src/global/navigation/NavBar.module.scss:16-21`) sets
  `position: absolute; z-index: -1; font-size: 1px;` — i.e. it's rendered
  but never visible to a human visitor.
- **Why this is worth fixing, not just noting**: Google's own webmaster
  guidelines explicitly call out hidden text as a technique that can trigger
  a manual action if judged deceptive, independent of whether it was
  "well-intentioned." Even setting that aside, several pages also render a
  **second, visible** `<h1>` on top of this hidden one —
  `pages/travel/[link].tsx:234`, `pages/assets-store/index.tsx:92`,
  `pages/assets-store/[link].tsx:44-46`, `pages/travel/world-map/index.tsx:36-43`
  — giving those routes **two `<h1>` elements**, a heading-hierarchy defect
  independent of the hidden-text question.
- Meanwhile `/`, `/guides`, `/guides/[link]`, `/travel` have **only** the
  hidden nav `<h1>` and no visible top-level heading of their own — a human
  visitor (and a screen reader) lands on these pages with no real `<h1>` at
  all.
- **Recommended fix — needs your review**: give every page a real, visible
  `<h1>` with real content (the homepage headshot/bio section is the most
  awkward case — it currently has no natural single heading), then either
  delete the global hidden `<h1>` from `Navbar.tsx` entirely, or demote it
  to a non-heading, visually-hidden element (e.g. a `<span
  className="visually-hidden">` — the same `.visuallyHidden` class already
  exists at `NavBar.module.scss` per `Navbar.tsx:96`) so it stops competing
  with page content for the one-`<h1>`-per-page signal. This touches shared
  chrome plus layout on 4+ routes, so it needs a visual pass before landing,
  not a blind mechanical edit.

### 2.2 No semantic `<main>`, `<article>`, or `<section>` anywhere **[Needs your input]**
- `grep` for these four tags across all of `pages/` and `src/` returns
  exactly two hits: `Navbar.tsx:44`'s `<nav>` (correctly used, has
  `aria-label`) and `src/homepage/biography/BioDescription.tsx:35`'s
  `<main>` (wraps only the bio-text blurb, not the page's actual primary
  content region). **Zero** `<article>` or `<section>` elements exist
  anywhere — guide articles, travel video pages, and asset collection pages
  (all textbook `<article>` candidates) are built entirely from `<div>`s,
  including the shared `src/global/PageContainer.tsx` wrapper (a plain
  `<div>` around an MUI `<Container>`, confirmed by reading it in full).
- **Recommended fix — needs your review**: change `PageContainer`'s outer
  `<div>` to `<main>`, and wrap the Notion-rendered guide body / travel
  video detail body / asset collection body in `<article>`. Touches the
  shared `PageContainer` used by nearly every route — needs a visual pass to
  confirm no CSS targets `div` selectors that would break under an
  element-tag change.

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

### 2.6 Homepage sections have no URL, title, or metadata of their own **[Documented only — scope decision]**
- There is no `/folio` or `/projects` route — "folio/skills", "projects",
  "experience/qualifications", "salary calculator", and "contact" are all
  rendered as scroll-anchored sections of the single `/` route
  (`src/homepage/Portfolio.tsx:10-21`, composing `ForYou`, `Experience`,
  `Qualifications`, `Folio`, `Salary`, `Contact`). None of these sections is
  independently indexable, shareable, or has its own title/description —
  someone searching for, e.g., a specific project by name can only ever land
  on the generic homepage. This is a legitimate architectural question
  (would giving Folio/Projects their own routes serve SEO better, at the
  cost of the current single-page scroll experience?) rather than a bug —
  worth a decision on whether it's in scope for this overhaul or a separate
  initiative.

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
  `generateWallpaperUrls` (`:51-62`) adds individual static wallpaper PNGs
  as top-level `<url>` sitemap entries (`changefreq: yearly, priority:
  0.4`). Standard practice is the sitemap `<image:image>` extension nested
  under the page that displays the image, not a separate top-level URL
  entry per static asset. Low priority, but worth fixing if the sitemap gets
  a dedicated pass.

---

## Suggested execution order

1. **Decide 0.1 and 0.4 first** (domain + replacement image) — several
   mechanical fixes below (canonical/OG/Twitter tags) are cheaper to write
   once, correctly, after these are settled, rather than writing them twice.
2. Priority 0 mechanical fixes (0.2, 0.3, 0.5, 0.6) — independent, low-risk,
   no shared files between them.
3. Priority 1 mechanical fixes (1.1–1.5) — mostly additive `<Head>` content;
   1.2's `_document.tsx` change is global and worth doing once, early.
4. Priority 1 decisions (1.6, 1.7) — whenever you're ready to weigh in.
5. Priority 2 items — hold for a dedicated pass with visual verification
   (via the `run` skill), since 2.1/2.2 touch shared chrome used by every
   route.
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
