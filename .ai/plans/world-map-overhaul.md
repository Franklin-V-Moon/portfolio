# World Map Overhaul

Status: COMPLETE — Phases 0, 1, and 2 implemented on branch worldmap-overhaul
(2026-07-19). Phase 2 adds pin selection, group country highlighting, place
labels linking to trip pages, and the evasive trailer player. Phase 3 remains
future work (see Enhancements.md). Phase 2 decisions made autonomously:

- Open question 2 (path to trip page): yes — the place label is a link;
  clicking it navigates to /travel/[link]. Tooltip reads "Watch {trip}".
- Open question 3 (mobile density): accepted for now; pins get large invisible
  hit circles (18 viewBox units on touch widths, 9 on desktop) so taps work in
  clusters. No zoom/merging built.
- Open question 4 (og image): /travel og:image and twitter:image now point to
  a 1200x630 render of the new map (public/travel/world-map-og.png), replacing
  the long-expired GitHub JWT URLs. Regenerate by screenshotting /travel at
  1200x630 after visual changes.
- Open question 5 (label format): "PLACE YEAR" (e.g. "ERBIL 2023"), uppercase
  letterspaced, dark halo for contrast, yellow on hover.
- Open question 6 (entrance animation): none — map stays static for
  Lighthouse; only the label and trailer fade in on selection (300-400ms),
  disabled under prefers-reduced-motion.
- Evasion implementation: four corner slots (pure logic in evasion.ts); the
  player docks diagonally opposite the selected pin, and on rAF-throttled
  mousemove flees to the farthest slot from the cursor, never entering the
  pin's quadrant. pointer-events: none guarantees clicks always pass through
  even mid-flight. Touch devices get the docked corner with no evasion. Video
  keeps autoplaying under reduced motion (the user explicitly selected it);
  only the movement animations are disabled.
- Selection model: pin click/Enter/Space toggles; background click or Escape
  deselects; selecting any pin in a multi-country trip highlights all its
  countries and marks all its pins.

Original phase 0/1 status: Phases 0 and 1 implemented — SVG map with capital
dots live on /travel, old page/PNG removed. Phase 2 (interactivity) not started.

Implementation notes (deviations from the original plan below):

- Simplification used `topojson-simplify` in the generation script instead of a
  mapshaper pipeline; quantile 0.05 gives 184KB raw / 63KB gzipped with every
  small entity (Singapore, Bahrain, Maldives, Hong Kong, Macao, Palestine)
  surviving. World-atlas spells it "Macao", not "Macau".
- Pins are projected client-side by a closed-form projection function
  (`src/travel/world-map/projection.ts`) verified against d3-geo checkpoints
  emitted by the generation script, so adding a trip never requires
  regenerating geometry and the client still ships zero d3.
- Projection changed after phase 1 review (Franklin, 2026-07-19): Equal Earth
  was replaced with Equirectangular, and eastern-Pacific landmasses (Hawaii,
  French Polynesia, Cook Islands, Samoa/Tonga side of the seam, etc.) are
  shifted 35% closer to the Americas and 21 degrees south as a pseudo-inset to
  reduce the empty left-side ocean. The shift is defined once in the generation
  script (`pacificShift`, applied to the topology arcs) and mirrored at runtime
  from the generated JSON, so future pins in that region stay aligned. The
  shift box starts at longitude -177.5 so Fiji's antimeridian-crossing polygon
  is untouched (verified no tearing).
- Russia's antimeridian overflow (Chukotka's western-hemisphere tip, Wrangel
  Island's far half, Big Diomede) is unwrapped by +360 degrees so the full
  peninsula renders connected past the map's old right edge instead of
  bleeding onto the left side (Franklin, 2026-07-19). To allow longitudes
  beyond 180, the generation script uses a raw linear transform via
  d3's geoTransform rather than geoEquirectangular (identical output for an
  equirectangular map, but no longitude wrapping or antimeridian clipping);
  any ring that crosses the seam (Russia mainland, Wrangel, Fiji) is detected
  generically and unwrapped, ring by ring, so nothing smears across the map.
  The viewBox is now 1027.1x394.5 — the world spans x 0..1000 and the tip
  occupies the overflow. US islands near the seam (St. Lawrence, Little
  Diomede, western Aleutians) are single-side rings and stay on the left as
  before.
- Fixing a self-inflicted wart found during this change: the Pacific shift box
  originally reached latitude -45 and caught New Zealand's Chatham Islands,
  pushing them to 65S and stretching the map. The box now stops at -40.
- Left-edge crop (Franklin, 2026-07-19): the viewBox now starts at the
  westernmost kept land (St. Lawrence Island, x 23.7) instead of longitude
  -180, removing the blank ocean strip left of Alaska. To enable it, the
  seam-join unwrap was extended to New Zealand (Chatham Islands) and Wallis
  and Futuna (Futuna), whose seam-hugging islets otherwise pinned the left
  edge, and mid-ocean Aleutian specks fully within longitude -180..-172 above
  latitude 45 are dropped. Final viewBox: 23.7 0 1003.4x394.5. Pins needed no
  change - the crop is only a viewBox origin shift.
- Phase 1 shipped a single `WorldMap.tsx` rather than the
  MapCountries/MapPins split — the split can arrive with phase 2 state if
  needed.
- Pin cities chosen during implementation: China 2017 → Guangzhou (trip was
  the south), China 2 → Beijing, Thailand 2 → Chiang Mai, Indonesia →
  Jakarta, Israel → Jerusalem, Palestine → Ramallah, East India → Darjeeling,
  Myanmar → Naypyidaw, Sri Lanka → Colombo.
- `/travel/world-map` now 308-redirects to `/travel` via `next.config.js`.
- The `.afphoto` design sources were kept in `public/travel/`.
Related: `Enhancements.md` item 2 ("New world map concept") — this plan is the concrete version of that idea.

## Goal

Replace the static `public/travel/WorldDotted.png` (manually painted dots) with a
code-generated SVG world map that has real country borders. Phase 1 ships a small
yellow dot on the capital/hub city for every country listed in
`src/datasources/TravelMetaData.ts`. Later phases make the dots interactive pins:
selecting one highlights the country's borders, tints its fill 10% yellow, shows the
place name, and plays that trip's trailer in an "evasive" video player that dodges the
cursor inside the map container. Multi-country trips (e.g. "Cambodia, Laos and
Vietnam") behave as one group on the map, exactly as they are grouped in
TravelMetaData.

## Current state (what gets replaced)

- `pages/travel/index.tsx` renders `WorldDotted.png` via `next/image` (3840x1878,
  ~2.05:1 aspect) with an `InvisibleImageButton` overlay that routes to
  `/travel/world-map`.
- `pages/travel/world-map/index.tsx` is a standalone page showing the same PNG with
  pinch/swipe hints. It becomes obsolete and will be deleted.
- Map styles live in `src/travel/index.module.scss` (`.worldMap`, `.freeMap`,
  `.mapImage`, `.mapGesture`, `.mapTitle`, `.mapReturnContainer`).
- Trailers already stream from CloudFront: `${publicCDNVideoUrl}${trailer}.mp4`
  (see `src/travel/components/video-detail/Trailer.tsx`).

## Research findings

### Library landscape (July 2026)

| Option | Verdict |
| --- | --- |
| `react-simple-maps` | Dormant since July 2023, peer deps cap at React 18. This repo is on React 19.2 — ruled out. |
| `@vnedyalk0v/react19-simple-maps` (fork, v2.0.9) | React 19 peer deps, TypeScript-first. Viable, but adds an abstraction we would fight for the custom interactions (border highlight, evasive player), and fork longevity is unproven. |
| MapLibre GL | WebGL slippy map. ~250KB+ gzipped, needs tile styles, hard to match the flat dark aesthetic, worst Lighthouse impact. Overkill for a stylized country-level map. |
| Hand-rolled `d3-geo` + `topojson-client` | `d3-geo` 3.1.1 (~227KB unpacked, tree-shakes to ~30KB used) + `topojson-client` 3.1.0 (~68KB unpacked, ~10KB used). Plain React SVG, full control, no React peer-dep coupling. Fits the repo's minimal-deps/Lighthouse philosophy. |

Decision: hand-rolled `d3-geo` SVG (confirmed with Franklin, 2026-07-19).

Sources:
- https://github.com/zcreativelabs/react-simple-maps/issues/367 (React 19 incompatibility)
- https://github.com/vnedyalk0v/react19-simple-maps
- https://www.react-simple-maps.io/

### Geometry data

`world-atlas` npm package (Natural Earth-derived TopoJSON):

- `countries-110m.json` — ~108KB raw. Missing the small entities we need:
  Singapore, Bahrain, Maldives, Hong Kong, Macau, and (likely) Palestine.
- `countries-50m.json` — ~850KB raw. Includes all needed entities but too heavy.

Recommendation: build a custom TopoJSON once with mapshaper — start from Natural
Earth 50m admin-0, keep all units (so HK/Macau/Palestine/Singapore survive), simplify
to roughly 10–15% and quantize. Expected ~150–250KB raw, ~60–90KB gzipped. Check the
generated file into the repo. Antarctica removed. This is a one-off build artifact,
not a runtime dependency.

Spike to run before implementation: verify exactly which entities exist at 110m vs
50m, and measure real gzipped sizes after simplification.

### Serving strategy: precompute vs runtime projection

Two viable architectures; the first is recommended:

1. **Build-time precompute (recommended).** A script (same pattern as
   `utils/export-meta.ts`) runs `d3-geo` + `topojson-client` at build time and emits a
   generated JSON: SVG path `d` strings per country (keyed by a stable id) plus
   projected x/y for every pin. The client bundle ships zero d3 — `d3-geo` and
   `topojson-client` become devDependencies only. SVG paths remain fully interactive
   (hover/click hit-testing is native SVG). Best possible Lighthouse outcome.
   Constraint: the projection is fixed at build time (fine — we do not need runtime
   reprojection; zoom/pan later can be an SVG transform).
2. **Runtime.** Ship TopoJSON in `public/`, fetch after mount, project with `d3-geo`
   in the client. More flexible, but ~40KB extra JS plus a fetch waterfall, and an
   empty map flash or skeleton needed. Keep as fallback if precompute proves awkward.

Either way the map is inline SVG with a fixed `viewBox`, `width: 100%`, so it slots
into the exact container the PNG occupies today with zero layout shift.

## Confirmed decisions (with Franklin, 2026-07-19)

1. **Engine:** hand-rolled `d3-geo` SVG (precompute variant preferred, see above).
2. **Projection:** Equal Earth (`geoEqualEarth`), full world, Antarctica removed.
   Aspect ratio ~2.1:1, close to the current PNG's 2.05:1. (Superseded after
   phase 1: now Equirectangular with a Pacific inset shift — see
   implementation notes above.)
3. **Non-country entries:** pin the visited hub city with explicit coordinates —
   Iraqi Kurdistan → Erbil, East India → Darjeeling or Kolkata (TBC), Hong Kong →
   Hong Kong, Macau → Macau, Palestine → Ramallah or Bethlehem (TBC). Border
   highlight later uses the best matching polygon (Iraq for Kurdistan, India for East
   India).
4. **Repeat visits:** one pin per trip (China and China 2 each get their own pin at
   that trip's hub; each plays its own trailer).
5. **Pin data location:** inside `TravelMetaData.ts` — new optional
   `extras.mapLocations` array per trip (place name + lat/lng, optional country id
   for highlight). One file per trip edit, as today.
6. **Dot style:** static in phase 1, pulse/enlarge on hover only.

## Visual design

- Ocean: transparent (page background `$darkBackground` #13181c shows through).
- Land fill: a very subtle lift off the background, e.g. #1a2026-ish, so landmasses
  read as shapes without competing with content. Tune in browser.
- Country borders: almost-white at low opacity, e.g. `rgba(242, 242, 242, 0.3)`
  (`$dimmerWhite`), thin stroke (~0.5 viewBox units).
- Coastline/landmass outline: slightly whiter/brighter than internal borders, e.g.
  `rgba(255, 255, 255, 0.55)`, so continents pop over country subdivisions.
- Dots: `$defaultYellow` #ffeb3b, small radius scaled via viewBox so they track
  responsively; faint glow (SVG blur or drop-shadow); hover = smooth scale-up.
- Selected country (phase 2): fill `rgba(255, 235, 59, 0.1)` (the requested 10%
  yellow), border stroke brightened toward `$defaultYellow`.
- Keep the existing `.worldMap` drop-shadow treatment and padding so the swap is
  visually seamless; dark mode is the only theme.
- No graticule, no labels at rest — clean and minimal.

## Data model changes

In `src/travel/types.ts`:

```ts
export type MapLocation = {
  place: string;        // label shown when selected, e.g. "Kathmandu", "Erbil"
  coordinates: [number, number]; // [longitude, latitude]
  countryId?: string;   // Natural Earth id/name for border highlight (e.g. "Iraq" for Erbil)
};
```

`extras.mapLocations?: MapLocation[]` on each trip. All pins in one trip form a
group: selecting any of them (phase 2) highlights all the group's countries and plays
the trip's trailer.

Name normalization: `countries` strings are display/search values ("afghanistan",
"East India", "Malaysia & Singapore" grouping etc.) and feed `SearchBar` /
`countTotalCountries` — do not rewrite them. `mapLocations` carries its own explicit
`countryId`, so no fuzzy name-to-polygon matching is needed anywhere.

### Proposed phase 1 pins (capitals/hubs, coordinates to verify during implementation)

| Trip | Pins |
| --- | --- |
| China (2017) | Beijing 39.90, 116.41 (or Guangzhou — trip was the south; TBC) |
| Nepal | Kathmandu 27.72, 85.32 |
| Indonesia | Jakarta -6.20, 106.82 (or Denpasar — trip was Bali; TBC) |
| Malaysia & Singapore | Kuala Lumpur 3.14, 101.69; Singapore 1.35, 103.82 |
| New Zealand | Wellington -41.29, 174.78 |
| Japan | Tokyo 35.68, 139.65 |
| Thailand (2022) | Bangkok 13.76, 100.50 |
| South Korea | Seoul 37.57, 126.98 |
| UAE | Abu Dhabi 24.45, 54.38 |
| Fiji | Suva -18.14, 178.44 |
| Cambodia, Laos, Vietnam | Phnom Penh 11.56, 104.93; Vientiane 17.98, 102.63; Hanoi 21.03, 105.85 |
| Taiwan, Hong Kong, Macau | Taipei 25.03, 121.57; Hong Kong 22.32, 114.17; Macau 22.20, 113.54 |
| India | New Delhi 28.61, 77.21 |
| Oman | Muscat 23.59, 58.38 |
| Kuwait & Iraqi Kurdistan | Kuwait City 29.38, 47.98; Erbil 36.19, 44.01 |
| Jordan | Amman 31.95, 35.93 |
| Saudi Arabia & Bahrain | Riyadh 24.71, 46.68; Manama 26.23, 50.59 |
| Iran | Tehran 35.69, 51.39 |
| Armenia, Georgia, Azerbaijan | Yerevan 40.18, 44.50; Tbilisi 41.72, 44.83; Baku 40.41, 49.87 |
| Greece | Athens 37.98, 23.73 |
| Turkey | Ankara 39.93, 32.86 |
| Lebanon | Beirut 33.89, 35.50 |
| Syria | Damascus 33.51, 36.28 |
| Cyprus | Nicosia 35.19, 33.38 |
| Israel & Palestine | Israel pin city TBC (Jerusalem vs Tel Aviv); Ramallah 31.90, 35.20 |
| Philippines & Brunei | Manila 14.60, 120.98; Bandar Seri Begawan 4.90, 114.94 |
| Timor-Leste | Dili -8.56, 125.56 |
| Bangladesh | Dhaka 23.81, 90.41 |
| Bhutan & East India | Thimphu 27.47, 89.64; East India pin TBC (Darjeeling 27.04, 88.27 vs Kolkata) |
| Maldives & Sri Lanka | Male 4.18, 73.51; Colombo 6.93, 79.86 (formal capital is Kotte, adjacent — use Colombo) |
| Pakistan | Islamabad 33.68, 73.05 |
| Afghanistan | Kabul 34.56, 69.21 |
| Myanmar | Naypyidaw 19.76, 96.08 (or Yangon — TBC which was visited) |
| Mongolia | Ulaanbaatar 47.89, 106.91 |
| China 2 (2024) | Pin city TBC |
| Thailand 2 | Pin city TBC |

Fiji note: Suva is fine, but Fiji's polygon crosses the antimeridian — verify the
simplified TopoJSON renders it without a smear across the map (mapshaper/Natural
Earth handle this, but confirm visually).

## Component architecture

```
src/travel/world-map/
  WorldMap.tsx            # container: sizing, selection state, composition
  WorldMap.module.scss
  MapCountries.tsx        # renders precomputed <path> elements
  MapPins.tsx             # dots/pins layer, hover + select handlers
  EvasiveTrailer.tsx      # phase 2: cursor-avoiding <video> player
  mapDataService.ts       # derives pins/groups from travelVideoMetaData (+ tests)
src/generated/worldMapGeometry.json   # build artifact: path d-strings + projected pins
utils/generate-map-geometry.ts        # build script (d3-geo, topojson-client, dev-only)
```

`pages/travel/index.tsx` swaps the `next/image` + `InvisibleImageButton` block for
`<WorldMap />` in the same wrapper div, preserving container size/padding across
desktop/tablet/mobile.

## Phase 2 design: interactivity

- **Selection model:** click/tap a pin to select; click elsewhere on the map (or the
  same pin) to deselect. Hover only affects dot scale, never selection, so touch and
  mouse behave consistently.
- **Country highlight:** selected group's countries get the 10% yellow fill +
  brightened border. Grouped trips highlight all member countries at once.
- **Place label:** small, unobtrusive text near the pin (city name, maybe trip year).
  Style idea: 11–12px uppercase letterspaced label in `$dimmerWhite` with the yellow
  gradient reserved for the selected state; fades in/out, never blocks other pins.
- **Evasive trailer player:**
  - Plain `<video muted autoPlay loop playsInline>` streaming
    `${publicCDNVideoUrl}${trailer}.mp4` — no react-player needed since there is no
    UI. Mounted only while a selection is active; unmounted on deselect (stops
    download).
  - Absolutely positioned inside the map container, small (~25–30% of map width),
    rounded corners + existing shadow language.
  - Evasion: `pointer-events: none` so clicks always pass through to the map
    (guarantees markers are clickable even mid-animation), plus movement so it never
    visually blocks what the user is aiming at. Simplest robust scheme: four corner
    anchor slots; on `mousemove` (throttled), if the cursor enters the player's
    padded bounding box, relocate to the farthest corner slot with a CSS transform
    transition (~400ms ease). Avoid slots that would cover the selected pin.
  - Touch devices have no cursor: dock the player in a fixed corner (farthest from
    the selected pin) and skip evasion.
  - Respect `prefers-reduced-motion`: no evasion animation (jump cut instead), and
    consider not autoplaying video.

## Cleanup plan

- Delete `pages/travel/world-map/` and add a 301 redirect `/travel/world-map` →
  `/travel` in `next.config.js` (the URL is in the sitemap/search indexes today).
- Remove `InvisibleImageButton`, `handleOpenBlankPage`, and the `next/image` map
  block from `pages/travel/index.tsx`.
- Remove now-dead styles from `src/travel/index.module.scss`: `.freeMap`,
  `.mapImage`, `.mapGesture`, `.mapTitle`, `.mapReturnContainer` (keep/adapt
  `.worldMap` for the new component's shadow/padding).
- Delete `public/travel/WorldDotted.png` once the new map ships.
  `public/travel/World.afphoto` / `ItineraryMap.afphoto` are design sources — confirm
  before deleting.
- `og:image`/`twitter:image` on both travel pages point at an expired
  `private-user-images.githubusercontent.com` JWT URL — broken today regardless.
  Replace with a fresh static social image (could be a rendered snapshot of the new
  map) hosted in `public/`.
- Sitemap: `/travel/world-map` disappears automatically once the page is deleted
  (static routes come from the pages crawl, not `export-meta`). No export-meta
  changes needed.
- Update README "How To Update Content" + `.agents/skills/update-content` with the
  new `mapLocations` field.
- Tests: `mapDataService` unit tests (pin derivation, grouping, repeat trips,
  `countryId` fallback); update `TravelPage.test.tsx` for the removed image button;
  geometry script gets a smoke test that every `countryId` in TravelMetaData resolves
  to a polygon (fails the build if a name drifts).

## Implementation phases

- **Phase 0 — data spikes (no product code):** mapshaper pipeline for the custom
  TopoJSON; confirm entity coverage (Singapore, Bahrain, Maldives, HK, Macau,
  Palestine, Taiwan, Timor-Leste); measure gzipped size; visual check of Fiji/
  antimeridian; settle Equal Earth viewBox + Antarctica crop.
- **Phase 1 — static map + capital dots:** geometry build script, `mapLocations`
  data for all 36 trips, `WorldMap` with countries + dots + hover pulse, swap into
  `/travel`, full cleanup of the old page/PNG/styles/redirect.
- **Phase 2 — interactivity:** selection state, country highlight (10% yellow),
  place labels, `EvasiveTrailer`.
- **Phase 3 — future (from Enhancements.md):** film-location dots per video,
  hover-to-scrub video moments, auto-playing overlay pointing at countries, "skip
  to" location focus.

## Open questions for Franklin (remaining after phase 1)

1. Any pin cities to swap? Defaults used: Jerusalem, Ramallah, Jakarta,
   Guangzhou (China 2017), Beijing (China 2), Chiang Mai (Thailand 2),
   Darjeeling, Naypyidaw. Changing one is a single edit in TravelMetaData.
2. Should clicking a pin (phase 2) also offer a path to the trip page — e.g. the
   place label doubles as a link to `/travel/[link]`, or a second click navigates?
   The trailer alone plays a video but gives no route to the full experience.
3. Mobile density: the Gulf cluster and HK/Macau/Taipei nearly overlap at phone
   widths (confirmed in phase 1 screenshots). Acceptable, or plan dot
   merging/slight zoom-on-tap for phase 2?
4. New social/og image: render one from the new map, or keep it out of scope?
   (The old og:image URLs on /travel are expired GitHub JWT links.)
5. Phase 2 labels: city name only, or "City — Trip Title (Year)"?
6. Any desire for a subtle entrance animation (countries fade/draw in on first
   load), or keep the map completely static for Lighthouse?
