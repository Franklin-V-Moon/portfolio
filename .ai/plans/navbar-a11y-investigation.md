# Navbar keyboard tab-order regression — investigation

## Resolution

Went with **Option B**: kept the content-first DOM order (SEO), reinstated a
documented, coordinated `tabIndex` on the skip link (`1`) and each nav tab
(`index + 2`) instead of the old unexplained hack, and added regression tests
(`Navbar.test.tsx`, new `pages/_app.test.tsx`) asserting the tabIndex sequence
so this can't silently regress again. Verified live: `Tab` order is now Skip
to content → PORTFOLIO → GUIDES → TRAVEL → page content, while `<nav>` still
renders after `<main>` in the DOM. Full test suite (185 tests) and lint pass.

## TL;DR

Tabbing through any page no longer reaches Portfolio/Guides/Travel until you've
tabbed through the **entire rest of the page** first. Root cause: `<Navbar />`
has always been the *last* element in `_app.tsx`'s DOM tree (it only *looks*
like it's first because it's `position: fixed` to the top). That was always
true, but it was invisibly papered over by a positive `tabIndex={index + 1}`
hack on every nav tab, which forced the browser to visit those tabs before
anything else regardless of where they sit in the DOM. Yesterday's a11y work
removed that hack (correctly — positive `tabIndex` is itself an anti-pattern)
and added a skip link, and the combination exposed the pre-existing DOM-order
bug for the first time.

**Update, per your input:** the content-before-nav DOM order itself was very
likely deliberate, not an accident — you recalled it was set up specifically
because nav boilerplate ("Portfolio Guides Travel Franklin V Moon") was
showing up in Google search results/snippets in place of actual page content.
That reframes this from "just move Navbar earlier in the DOM" to a genuine
**SEO vs. keyboard-a11y trade-off** that needs a decision, not a pure code
fix. See "Recommended redesign" below — I've laid out options rather than
picking one, since reverting the DOM order could reintroduce whatever SERP
problem it was originally added to solve.

## Evidence

Tested with a real keyboard (Playwright, native `Tab` key events, not
simulated) against the code on `origin/main` / `a11y-overhaul`
(commit `fc52601`, "A11y Overhaul") in an isolated worktree, on `/`:

- 1st `Tab` → the new "Skip to content" link. Correct, expected.
- 2nd `Tab` → lands on `Frontend`, a skill-filter `<button>` inside the
  homepage's `LanguagesColumn` — i.e. straight into page body content.
- Walking every focusable element in DOM order: **110 focusable elements on
  the homepage total**, and the first Navbar tab (`PORTFOLIO`) is **#109 —
  dead last**, after all 108 other page elements.

So a keyboard user must tab through the entire homepage (every skill pill,
every project link, everything) before ever reaching primary navigation.
This reproduces the reported bug exactly and confirms it's site-wide (the
cause lives in `_app.tsx`, shared by every route), not homepage-specific.

## Root cause

### The DOM has always put page content before the Navbar

`pages/_app.tsx`, both before and after yesterday's changes:

```tsx
<GlobalTheme>
  {/* skip link — added yesterday */}
  <div style={{ height: "70px" }}></div>
  <Analytics />
  <main id="main-content">      {/* page content — added yesterday */}
    <Component {...pageProps} />
  </main>
  <Navbar />                     {/* always rendered LAST */}
</GlobalTheme>
```

`Navbar` renders after the page's own content in every version of this file
I could find in history. It only ever *appeared* first because
`NavBar.module.scss`'s `.container` is `position: fixed; top: 0;` — CSS
positioning changes where something is painted, not where it sits in tab
order. Tab order follows DOM order for elements with `tabindex="0"` or no
`tabindex` at all, irrespective of visual position.

### The hack that hid this: positive `tabIndex`

Before yesterday, every `Tab` in `Navbar.tsx` had:

```tsx
tabIndex={index + 1}
```

Positive `tabindex` values are visited by the browser **before** any
`tabindex="0"`/no-`tabindex` element, in ascending numeric order, regardless
of DOM position. So tabs numbered 1, 2, 3... were always visited first, no
matter where `<Navbar>` actually sat in the tree. This is exactly why the old
"hacky" implementation worked despite the underlying DOM order being wrong —
it wasn't fixing the order, it was overriding it globally for the whole page.

This was already flagged as a latent risk in `.ai/plans/accessibility.md`
(task M12, written before yesterday's work):

> Explicit positive `tabIndex={index + 1}` on every nav item overrides
> natural DOM tab order — **fragile if any other tabbable element is ever
> added earlier in the DOM.**

That prediction is exactly what happened.

### Why Navbar was DOM-last in the first place (per your recollection)

You mentioned the content-before-Navbar DOM order was deliberate: nav
boilerplate ("Portfolio Guides Travel Franklin V Moon") was showing up in
Google search results in place of real page content, and putting `<Navbar>`
last in the DOM (while keeping it visually pinned to the top via
`position: fixed`) fixed that, with the old positive-`tabIndex` hack
preserving normal keyboard/user behavior on top.

I couldn't find a single commit that states this outright, but the history is
consistent with it:

- `e2fd8ef` — "Add more tags to make it clearer SEO should ignore the Navbar"
  (added `role='navigation' aria-label='Main navigation'` to the `<nav>`).
- `8fedb13` — "Remove H tags from navbar for SEO" (the logo was `<h5>`
  elements; demoted to plain `<span>`s so the nav's logotype stopped
  competing for heading-level SEO weight).
- `4611738` — "Refactor SSO for better appearance on google search" (typo for
  SEO) — introduced the `.behindNav` pattern: every page gets its own
  visually-hidden real `<h1>`/description specifically so real page content,
  not chrome, carries the heading/description signal.

So there's a clear, repeated pattern of deliberately keeping Navbar's text out
of what search engines treat as "the page's content" — DOM-order placement is
a very plausible extension of that same effort, even without a commit that
says so verbatim.

**One thing worth checking before assuming this constraint still fully
applies today:** every page now already sets explicit `<meta
name="description">`, `og:description`, and `application/ld+json`
(`pages/index.tsx`, `pages/guides/index.tsx`, etc. — added in `4611738` and
after). Google's snippet/description text is pulled from those explicit tags
first, not raw DOM order, whenever they're present. If the original problem
was specifically "Google shows nav text as the meta description/snippet,"
that failure mode may already be closed off by these tags regardless of
Navbar's DOM position — but I can't confirm that without Search Console data
or a live re-test, and DOM order can still be a soft relevance/content-weight
signal independent of snippet selection. Treat this as something to verify
before relying on it, not as settled.

### What changed yesterday — two individually-correct commits that combined badly

1. **`9abaa1b` — "add real `<main>` landmark and skip-to-content link (C4)"**
   Added the skip link and wrapped page content in `<main>`. Good, standard
   pattern in isolation.

2. **`255bb28` — "Add `aria-current` to active nav tab and remove tabIndex
   override (M12/M13)"**
   Removed `tabIndex={index + 1}` because, per the commit message, "MUI Tabs
   handles keyboard navigation automatically." True on its own — but that
   claim was only safe *because* nothing else in the DOM preceded the Navbar
   with real focusable content at the time M12 was scoped. C4 (commit 1) had
   already changed that.

Neither commit is wrong by itself, and each has its own passing verification
in `accessibility.md` (C4's checklist only verifies the skip link is
reachable and jumps to `#main-content`; it doesn't verify what focus order
looks like *after* that). The interaction between the two — skip link +
`<main>` now precede Navbar in the DOM, and nothing forces Navbar earlier
anymore — is what broke tab order. This is a gap in the plan's verification
step, not a coding mistake in either commit.

## Old vs. new tab order

| Step | Before yesterday (hacky) | After yesterday (broken) |
|---|---|---|
| 1 | Portfolio tab (`tabIndex=1`) | Skip to content |
| 2 | Guides tab (`tabIndex=2`) | 1st focusable page element |
| 3 | Travel tab (`tabIndex=3`) | 2nd focusable page element |
| 4 | 1st focusable page element | ... (all page content) ... |
| ... | ... down the page ... | Portfolio tab (last) |
| — | *(no skip link existed)* | Guides tab |
| — | | Travel tab |

## Recommended redesign (not yet implemented — needs a decision, see options)

Because the DOM order is (probably) load-bearing for SEO, "just move
`<Navbar>` earlier in the DOM" is no longer a clean fix — it's one option with
a real trade-off. Three options, roughly in order of how much they preserve
the original SEO intent:

### Option A — Reorder the DOM, drop the SEO-motivated ordering

```tsx
<GlobalTheme>
  <a href="#main-content" className={styles.skipLink}>Skip to content</a>
  <Navbar />
  <div style={{ height: "70px" }}></div>
  <Analytics />
  <main id="main-content" tabIndex={-1}>
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  </main>
</GlobalTheme>
```

Tab order becomes: Skip to content → Portfolio → Guides → Travel → page
content, matching WCAG 1.3.2 (Meaningful Sequence) / 2.4.3 (Focus Order)
cleanly, no tabindex tricks anywhere. Moving `<Navbar>` is visually inert (CSS
`position: fixed` doesn't care about DOM position; its existing `z-index`
already sits above page content), but this is the option that most directly
risks reintroducing whatever SERP problem the original ordering solved —
worth doing only if you're confident the explicit meta/JSON-LD tags added
later already cover that (see caveat above), or you're willing to re-test and
watch Search Console after.

### Option B — Keep content-first DOM order, reinstate scoped `tabIndex` deliberately (documented, not a silent hack)

Put `tabIndex={index + 1}` back on the nav tabs, but this time treat it as an
intentional, documented technique for this specific constraint rather than an
unexplained hack: a one-line comment explaining *why* (SEO needs Navbar last
in the DOM; this restores keyboard-first-use without moving it), plus a
Playwright keyboard-order regression test so removing it again trips a test
instead of shipping silently. This keeps the current SEO posture untouched
and fully restores the pre-yesterday keyboard experience. Downside: it's
still the pattern MDN/WCAG caution against in general (positive `tabindex` is
easy to get wrong as the page grows, e.g. a future modal/popover's internal
tab order could interact oddly with it) — mitigated here by it being scoped
to exactly 3-4 top-level items that never change.

### Option C — Re-verify whether the SEO constraint still holds, then decide

Given every page now carries explicit `<meta name="description">`,
`og:description`, and JSON-LD (added after the original nav-ordering fix),
check Search Console / do a live `site:franklin-v-moon.dev` search to see if
Navbar text still surfaces in snippets today. If it doesn't, Option A is
safe and is the cleaner long-term fix. If it does, Option B is the pragmatic
answer. This just sequences A/B rather than being a third code path.

**My leaning:** B is the lower-risk choice if you're not sure the SEO issue
is fully resolved — it changes nothing about what Google sees, only restores
keyboard behavior, and turns the previously-silent hack into a documented,
tested one. A is cleaner code but carries SEO risk you can't fully rule out
from a code read alone. Your call.

### Process fix, not just a code fix

Since this slipped through because C4 and M12 were each verified in
isolation, worth adding to `accessibility.md`'s verification steps (or as a
standing regression check) something like: *"Tab from page load and confirm
the sequence is: skip link → primary nav → page content, on at least one
route with substantial body content (e.g. `/`)."* A quick Playwright keyboard
smoke test asserting the Navbar's tabs are reached within the first handful
of `Tab` presses would catch this class of regression automatically going
forward, rather than relying on a fixed-order manual QA pass.

## Open questions for you

1. **Which option (A/B/C) above** — this is the main decision: is the SEO
   constraint still live, and how much risk are you willing to take reverting
   it vs. keeping a documented `tabIndex` override?
2. **Skip link position.** The user-facing spec says "first select Portfolio,
   then Guides, then Travel." The skip link is new as of yesterday and wasn't
   part of the old experience. Standard WCAG practice (and the plan's own C4
   task) puts the skip link first, before nav, precisely so keyboard users
   can bypass repeated nav blocks on every page. Both options above keep the
   skip link first, then nav (Portfolio right after that), which satisfies
   the letter of your requested order and the standard pattern — flagging in
   case you'd rather drop the skip link's leading position instead.
