# World Map Overhaul

## Decision snapshot

- [x] 1. Use a responsive SVG map with a Miller projection rotated 12° west; keep Russia on the right, with no Siberian fragment on the left and no land clipped at the right edge.
- [x] 2. Store decimal-degree `latitude, longitude` dots in travel metadata; dots mark visits and select their country.
- [x] 3. Use the newest matching country video; changing dots within a country does not restart it.
- [x] 4. Play one trailer layer; keep it sharp over the ocean and apply a translucent frosted blur only inside land shapes. Keep the map and video edges unrounded and free of effects.
- [x] 5. Show no video layer until a trailer has a frame to display; use the page background and normal gray land colors while no trailer is visible.
- [x] 6. Use a larger white country heading, positioned farther left and held still while the map zooms; center the title and Watch Now button on the map's bottom edge on mobile with a fixed height slot below it.
- [x] 7. Zoom and pan the map directly with wheel, pinch, and drag; keep dots the same screen size, keep the video and heading fixed, and show no zoom buttons.
- [x] 8. Keep the active and most recently selected trailer mounted; pause the previous one so revisiting can reuse buffered data.
- [x] 9. Dim the trailer to 50% brightness. Keep its sides and map frame clean, and fade the bottom 40% to transparent.
- [x] 10. Fade trailers out over 250ms and in over 700ms. Thin land and country borders by a further 30% while keeping selected country borders visibly stronger.
- [x] 11. Extend the trailer to both viewport edges and up to the navbar; keep map artwork, dots, and title at their existing size and position.
- [x] 12. Show a yellow outlined Material UI “Watch Now” button with a right-side play icon, one second after the title, when the latest country video has a main video slug and backup link; ignore the restricted flag.
- [x] 13. Select a random dot after five seconds of initial inactivity, then repeat after 20 seconds without dot interaction.
- [x] 14. Lock a clicked/tapped dot against hover changes; unlock on any page click or after 20 seconds and resume hover selection.

## Implementation checklist

### 1. Inspect and prove the map foundation

- [x] Inspect the existing travel page, styles, trailer component, data types, and all `extras.countries` values.
- [x] Identify the country geometry dataset and its country identifiers; define an explicit mapping for travel country names that do not match dataset names.
- [x] Build a small prototype using the real geometry and Miller projection.
- [x] Rotate the projection 12° west to place the map seam in the Bering Strait; keep the source geometry and stored coordinates unchanged.
- [x] Check country detail and map shape at the existing map's approximately 2.05:1 aspect ratio; leave enough margin that land is not clipped at either edge.

### 2. Define shared data and visual tokens

- [x] Define a stable country-ID mapping between travel metadata and map geometry, including alternate names and travel records that cover multiple countries.
- [x] Add an optional `dots` field to the travel metadata type and document its format.
- [x] Store each coordinate as a decimal-degree `latitude, longitude` string, copied in the common map-app order; convert explicitly to longitude/latitude for projection.
- [x] Seed one capital-city test coordinate for every visited country or territory in its latest matching travel record; keep repeat-country dots on the newest video record.
- [x] Keep nearby dots as separate markers; coordinates can be offset slightly offshore when needed to make each dot easier to target.
- [x] Establish one shared travel accent color based on the existing global yellow (`#ffeb3b`) and use it for dots and selected-country styles.
- [x] Keep the current global background and land colors; define separate style controls for background, land, borders, selected fill, and dot appearance.

### 3. Build the static map layer

- [x] Add the SVG map component with responsive viewBox sizing and the verified Miller projection/geometry treatment.
- [x] Draw country fills, thin white country borders, and a slightly thicker white outer land outline.
- [x] Draw dots from the metadata coordinates using the exact same projection as the country paths.
- [x] Match the current map's container size and footprint; allow only minimal cropping on narrow screens.
- [x] Add map-only zoom and pan: mouse wheel and touch pinch zoom inside the map, drag pans when zoomed, dots keep their screen size, and the title/video stay fixed to the map frame. Use `d3-zoom`, with sensible zoom and pan limits and no visible zoom controls.
- [x] Verify wheel zoom transforms the map while the heading and full-frame video stay anchored.
- [ ] Verify touch pinch and drag panning, and confirm scrolling outside the map still scrolls the page.
- [ ] Check that dots remain separate and targetable at expected display sizes, including deliberately offset Hong Kong and Macau coordinates.

### 4. Add country selection and map styling

- [x] Select a country on desktop hover and touch tap; moving between dots in the same country must not change the active country.
- [x] Lock click/tap selection until another dot is clicked, the page is clicked elsewhere, or 20 seconds pass; resume selection from the currently hovered dot after timed unlock.
- [x] Clear selection when the user clicks/taps empty map space.
- [x] Apply the selected-country yellow fill at 10% opacity and a slightly thicker yellow border.
- [x] Add a semantic heading one type size larger than the current title, in white, positioned farther left; animate outgoing text left and incoming text from the right. Keep it outside the zoomed map group.
- [x] Reserve a fixed mobile title slot below the map and center the title/button group on the map's bottom edge so downstream content does not shift; retain the lower-left overlay at wider sizes.
- [x] Add a yellow outlined “Watch Now” button beneath the title, delayed one second, when the newest matching travel record has both a hosted video slug and backup link; do not gate it on the restricted flag.
- [x] Keep the selected dot enlarged and glowing after hover, tap, or automatic random selection; keep its country's yellow outline active. Exclude dots from keyboard navigation and the accessibility tree.
- [x] Auto-select a random travel dot after five seconds on initial load and 20 seconds after the most recent dot interaction.
- [x] Keep selection and title usable by pointer and touch, exclude dot markers from keyboard navigation, and respect reduced-motion preferences.

### 5. Add country trailer behavior

- [x] For each country, find records whose `extras.countries` includes it and choose the record with the greatest numeric `year`.
- [x] If the selected country has no matching trailer, show its title and selected styling without playing video.
- [x] On selection of a different country, load that country's trailer from the beginning, muted, looping, and without controls. Keep it sharp over ocean and fade it in over 700ms once its first frame is ready.
- [x] Do not reload or restart the trailer when moving among dots in the same country.
- [x] Fade out the old trailer over 250ms during country changes, then fade in the new trailer over 700ms when ready; prevent stale video loads from overriding a newer selection.
- [x] Keep one sharp video visible across ocean, fading its lower 40% to transparent. Apply the frosted-glass blur as a masked HTML backdrop layer over country shapes; keep dots and borders above it and move the mask with map zoom. With no trailer or no ready frame, show no video layer or placeholder and retain the page background and normal map colors.
- [x] Keep only the active trailer and the most recently selected trailer mounted; pause the inactive one with metadata-only preload to reuse buffered data without preloading the full library.

### 6. Integrate, review, and remove the old map

- [x] Replace the static dotted map on the travel page with the new map in the same footprint.
- [x] Remove the obsolete `/travel/world-map` page, `WorldDotted.png`, and styles/assets used only by the old map.
- [x] Review desktop and mobile layout, the rotated Russia seam, and wheel-zoom anchoring.
- [ ] Manually review trailer brightness, the land frost while zooming, the bottom video fade, thinner border widths, and trailer transitions.
- [x] Hide zoom controls and counter-scale dots so their visible size remains constant as the map zooms.
- [ ] Confirm no-trailer selection and empty-map deselection behavior.

## Goal

Replace `public/travel/WorldDotted.png` and the separate static map page with an interactive, code-generated map that supports geographic travel dots and trailer previews.

Capital-city test coordinates are seeded in `src/datasources/TravelMetaData.ts`. Replace them with personal visit coordinates as they are collected.

## Current implementation to replace

- `pages/travel/index.tsx` renders `WorldDotted.png` (3840×1878, about 2.05:1) and an `InvisibleImageButton` that routes to `/travel/world-map`.
- `pages/travel/world-map/index.tsx` shows the PNG with pinch/swipe hints.
- Related styles are in `src/travel/index.module.scss` (`.worldMap`, `.freeMap`, `.mapImage`, `.mapGesture`, `.mapTitle`, `.mapReturnContainer`).
- Travel trailers stream from CloudFront as `${publicCDNVideoUrl}${trailer}.mp4`; see `src/travel/components/video-detail/Trailer.tsx`.
- Country and travel-video metadata lives in `src/datasources/TravelMetaData.ts`.
- An MVP exists on another Git branch but was rejected for its look/vibe; treat it as out of scope and make a fresh visual implementation.

## Proposed implementation

### Map rendering

- Build a responsive SVG map using `d3-geo` projection and path generation, converting `world-atlas` 50m TopoJSON country geometry to GeoJSON. This resolution includes small countries and territories such as Singapore, Hong Kong, and Macau that the 110m dataset omits.
- Use Miller cylindrical projection. Adjust projection rotation/longitude center and process country geometry so the antimeridian seam falls in water when possible. Russia crosses the antimeridian, so maintaining all of it on the right may require deliberate geometry wrapping. Verify against the actual dataset; no land may appear on the left edge.
- Render country fills and borders as SVG paths. Keep background, land fill, selected-country fill, country borders, and outer land outline independently styleable.
- Join travel metadata to map geometry through stable country identifiers (prefer ISO 3166-1 numeric IDs or a small explicit ID mapping), not display-name string equality alone. Travel entries can cover multiple countries and display labels may differ from the geometry dataset's names.
- Render dots as SVG circles projected from coordinates through the same projection. Keep map and dots in one coordinate system so alignment survives resizing.
- Keep rendering client-side and static. Avoid a full GIS/tile stack unless profiling shows a need.

### Visual treatment

- Retain the existing page background and gray land colors. Keep one video layer sharp over the ocean and apply the frosted-glass treatment with a translucent backdrop blur masked to land shapes.
- Keep the video edge and map container free of feathering, rounded corners, and ambient glow.
- Extend the video behind the map to the viewport sides and navbar while keeping all map artwork at its existing dimensions.
- Thin white borders between countries and a slightly thicker white outer land outline.
- Yellow travel dots sized for visibility and interaction.
- On selection, tint the country yellow at approximately 10% opacity and make its border yellow and slightly thicker than neighboring borders.
- While a trailer plays, keep the video sharp through the ocean. Over land, blur the visible video through a clipped backdrop filter and translucent gray surface; keep borders and dots above the frosted land.
- Place a white semantic country heading at lower left in the site's existing font without covering major landmasses. Make it one type size larger than the current title, move it farther left, and slide the outgoing name left and incoming name from the right with a short ease-in-out transition.
- Keep the heading anchored in the map frame while only the map artwork and dots zoom and pan.
- Use the shared travel accent color for dots, selected-country fill/border, and related map accents. Current candidates are `$defaultYellow: #ffeb3b` in `themes/_colors.module.scss` and travel scorecard colors in `TravelMetaData.ts`; consolidate or expose a shared travel accent so the map does not introduce a separate hardcoded yellow.

### Interaction and video behavior

- Hovering a dot selects its country on desktop. Tapping selects on touch. Selection stays active until another country or empty map is chosen.
- Moving between dots within the same country has no content or title change and must not reload or restart its trailer. Selecting a different country fades out the current trailer, loads the new country's latest trailer from the beginning, then fades it in.
- A country with dots but no matching trailer still selects and shows its country title; leave the background video empty.
- Keep trailer playback muted, looping, and without audio controls; it functions as ambient moving imagery.
- Avoid stale asynchronous video loads replacing a newer selection.
- Keep the video layer transparent until the selected trailer has a displayable frame; fade the first ready frame in over about two seconds. Fade out over about 0.7 seconds before switching trailers. With no trailer, show no video layer or placeholder and preserve the map's normal colors.
- Keep the active and most recently selected trailer mounted; pause the inactive video and use metadata-only preload. Do not eagerly download the full set of travel trailers.
- Clicking/tapping empty map space clears selection: fade out the trailer and title and restore the normal map treatment.
- Respect reduced-motion preferences; keep essential content accessible without hover.

### Travel metadata and trailer choice

- Add optional `dots` under a country's `extras`, containing decimal-degree coordinate strings.
- Recommended format is `"latitude, longitude"`, matching the common order shown when copying coordinates from map apps. Example: Sydney `"-33.8688, 151.2093"`. Document the order near the data type and convert to the projection's longitude/latitude order when parsing.
- Keep nearby dots as separate markers, with each coordinate independently represented and targetable. Coordinates may be deliberately offset slightly offshore to improve selectability where locations are close together.
- Dots are presence markers only; a dot does not identify a location or a specific video.
- For each country, choose the metadata record whose `extras.countries` includes that country and has the greatest numeric `year`. This covers shared-country records such as Malaysia & Singapore and does not depend on title suffixes or array order.
- Countries without dots do not have markers.

## Implemented interaction details

- Map zoom uses `d3-zoom` for wheel, drag, and touch pinch. The SVG map and dots transform together; the video and title remain fixed in the map frame. Zoom is limited to the map, with no visible zoom controls.
- Only the active trailer and the most recently selected trailer remain mounted. The inactive trailer is paused and retained with metadata-only preload, allowing its existing buffered data to be reused without preloading every video.

## Visual review findings

- The initial projection placed part of Siberia at the left beside Alaska. Rotating the Miller projection 12° west moves the seam into the Bering Strait; the rendered map now keeps Russian land on the right with visible margin at the edge.
- The base map data and stored decimal-degree latitude/longitude values remain unchanged. Map paths and dots use the same rotated projection, so existing coordinates still align.
- A selected-country browser preview confirmed the trailer becomes ready, its video remains visible over the ocean, and the land-only backdrop blur is active.
- A mobile viewport review confirmed the map fits within the available width.
