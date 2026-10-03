# Travel video destination map plan

## TL;DR

Replace the summary card on each `/travel/[link]` page with a destination map rendered by MapLibre GL JS. Use the video’s existing `extras.countries` IDs to highlight and frame its destinations automatically. The implementation uses OpenFreeMap’s dark vector style and visible-only tile loading, with no API key. MapLibre is route-scoped and delays map initialization until it approaches the viewport. A self-hosted PMTiles archive remains an option if third-party tile requests become unacceptable; its size and update cost should be measured first.

## Goal

Show a map in the current Summary section of each travel video page. The countries listed in that video’s `extras.countries` should be the focus; neighboring countries should provide context. Keep the presentation consistent with the site’s dark palette, with white destination-country fills/borders and legible labels. Frame the destination group with approximately 15% visual padding, subject to projection and small-country readability.

## Project facts

- `pages/travel/[link].tsx` uses `extras.countries` to render the destination map in place of the summary display.
- The page receives the complete `metaData` object from `travelVideoMetaData` through `getStaticProps`.
- `TravelMetaData.ts` already lists destination countries as `{ name, id }` in `extras.countries`.
- The existing `WorldMap` uses `world-atlas/countries-50m.json`; this data supplies country geometry and borders, not detailed streets, rivers, or city labels.
- The repository is a Next.js Pages Router application. MapLibre initializes in the browser after the map nears the viewport.

## Implementation

1. **Use OpenFreeMap’s dark vector style.** The map retains visible OpenFreeMap, OpenMapTiles, and OpenStreetMap attribution. It fetches style resources and visible vector tiles from OpenFreeMap; it does not require a service key.
2. **Defer the map near the viewport.** The travel detail page renders a stable map container and dynamically imports MapLibre only when the map is within 300 pixels of view. It does not load on unrelated routes.
3. **Drive focus from metadata.** Country IDs select destination shapes from `world-atlas/countries-110m.json`. `countries-omitted-at-110m.json` supplies the seven destination countries missing from that low-size atlas, using geometry extracted from the package’s 50m atlas. Combined bounds are framed with 7.5% padding on each side, plus a small pixel inset. The map draws a restrained white fill, prominent white borders, and white country labels.
4. **Serve MapLibre’s worker files locally.** `utils/copy-maplibre-worker.js` copies MapLibre’s worker modules to ignored `public/travel-map/` during dev and production builds. The worker code loads from the site origin.
5. **Keep the layout responsive.** The map sits beside the scorecard on wide screens and above it on narrow screens. It has no section heading, edge border, or zoom buttons, and its height stays below the scorecard. The ocean matches the page background, land matches the navbar grey, and state-level borders are hidden. Basemap labels prefer English names and Latin transliterations. Scoped styles avoid importing MapLibre’s full CSS globally.
6. **Verify the production build and rendered route.** The build validates all 45 travel records. A desktop render of the Armenia, Georgia, and Azerbaijan route shows all three countries framed and labeled. A mobile capture rendered the map; headless Chrome used a 500 CSS-pixel layout viewport for its 390-pixel screenshot, so it does not confirm exact physical-device wrapping.

## Performance expectations and limits

- In the production build, MapLibre’s dynamically loaded JavaScript is about 141 KB gzip. Its locally served worker modules add about 153 KB gzip. These assets load when someone reaches the map; other site routes do not load them. WebGL startup and tile rendering still cost CPU/GPU work.
- Vector tiles transfer the visible map area and nearby tiles rather than the full world dataset. Actual transfer depends on viewport, zoom, style assets, and cache; a full cold-cache transfer measurement remains outstanding.
- OpenFreeMap is a public hosted dependency. Its availability, update cadence, and use terms are separate from the npm library; the map will be blank if the service cannot be reached.
- A regional PMTiles archive could remove the runtime dependency on a third-party tile host, but would still need hosting, bandwidth, updates, and an OSM-compatible attribution/licensing review.
- More geographic detail increases archive size and can clutter a compact map. Labels and feature density must be tuned by zoom; all feature types should not be forced to display simultaneously.
- Bundling the entire archive into application assets would avoid separate tile fetches but could make every first-time visitor download far more data than needed. Prefer hosting the archive separately as a static CDN asset.
- OSM-derived data requires attribution and carries ODbL obligations. Verify the selected dataset’s specific terms before packaging or distributing it.
- Country geometry and labels may not align perfectly across data sources. Confirm country identifiers and feature properties map reliably to metadata IDs before relying on country-specific styling.

## Acceptance criteria

- Each eligible travel detail page automatically highlights all countries from its own `extras.countries` metadata.
- The map frames the relevant destinations with modest padding and retains enough neighboring geography for context.
- Destination countries, neighbors, borders, water, and geographic labels have a legible dark-theme style.
- The map is responsive, does not block the video page from rendering, and does not initialize on unrelated routes.
- Attribution is visible, the chosen data source’s terms are followed, and cold-cache transfer/initial render measurements are documented.
- The implementation adds no map service API key requirement.

## References

- [MapLibre GL JS documentation](https://maplibre.org/maplibre-gl-js/docs/)
- [Protomaps PMTiles documentation](https://docs.protomaps.com/pmtiles/)
- [Protomaps basemap build and extraction documentation](https://docs.protomaps.com/basemaps/build)
- [OpenStreetMap tile usage policy](https://operations.osmfoundation.org/policies/tiles/)
