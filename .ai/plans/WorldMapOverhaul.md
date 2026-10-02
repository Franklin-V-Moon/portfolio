# Interactive Travel Map Plan

## TL;DR — current decisions

1. Use the responsive Miller SVG map and decimal-degree `latitude, longitude` dots; keep Russia and Siberia together on the right.
2. Hover previews a country. Clicking or tapping a dot locks it against hover changes until another dot is clicked, the page is clicked, or 20 seconds pass. Dots stay out of keyboard navigation.
3. Use the newest matching country record for the trailer. Keep the current trailer muted and looping, with the video masked to the viewport width, 50% brightness, a bottom fade, and frosted land shapes.
4. Keep dots, country title, and map artwork at their established sizes and positions. On mobile, reserve a fixed title slot aligned to the map’s bottom edge.
5. Show the yellow outlined “Watch Now” button only when the newest matching video has a hosted video slug and backup link; ignore its restricted flag.
6. Select a random dot after five seconds on initial inactivity and after 20 seconds of inactivity.
7. A dot click shows country posters beside the newest matching video’s title-free scorecard, left-aligned with blank space after the content; two posters stay side by side on all screen sizes. Give the scorecard parent 5px top, 10px left, and 5px bottom padding, except no left padding for multiple posters on mobile. On mobile, shrink score text to about half size and halve bar height; with multiple posters, reserve 195px for the scorecard so posters can grow. Keep the stacked country bars touching, add space between score categories, fit full scores to the divider width on desktop, hide in-bar ratings below 3, label the final bar “Score,” and leave reduced space below the divider on mobile. The row lifts 25px on medium screens, has 30px bottom margin on mobile, expands/fades in over 500ms each, animates score bars, reverses on unload, changes posters instantly between countries, and clears on 20-second automatic random selection.

## Remaining work

### 1. Complete manual map review

- [ ] Verify touch pinch zoom, drag panning, and normal page scrolling outside the map.
- [ ] Check dot spacing and targetability, including the deliberately offset Hong Kong and Macau coordinates.
- [ ] Review trailer brightness, land frost while zooming, bottom fade, border thickness, and trailer transitions on desktop and mobile.
- [ ] Confirm countries without trailers, empty-map deselection, click lock, page-click unlock, timed unlock, and idle random selection.

### 2. Add a country video row for clicked dots

- [x] Track explicit dot click/tap activation separately from hover-only country previews.
- [x] For an activated country, find every travel record whose `extras.countries` contains the selected numeric `id`.
- [x] Show every matching record in ascending year order visually (older first, newer last). Shared-country records appear for each tagged country, such as Thailand then Thailand 2 for Thailand.
- [x] Render a poster-only `VideoLibrary` row above the directory controls and every existing sorted or filtered video group.
- [x] Keep country posters side by side on all screen sizes and place the scorecard directly after them; size the scorecard to stay no taller than the posters.
- [x] Show the newest matching record’s scorecard after all country posters, matching the travel detail page’s style.
- [x] Fade the scorecard with the posters and animate its yellow bars filling from left to right.
- [x] Keep the current sort and search results below the new row unchanged.
- [ ] Manually verify mobile and desktop poster alignment and scorecard height, Ukraine’s poster and scorecard, Thailand then Thailand 2 side by side followed by the Thailand 2 scorecard, and row transitions on selection changes and clear.

The row appears only after a dot is clicked or tapped. It then follows subsequent selected-country changes, including hover after the click lock expires, and clears when the map selection is cleared. Clicking elsewhere on the page only unlocks the dot and leaves the current row visible.

## Current implementation notes

- The map is rendered by `src/travel/components/world-map/WorldMap.tsx`; travel records and coordinate dots are in `src/datasources/TravelMetaData.ts`.
- `pages/travel/index.tsx` renders the map before the existing directory controls and grouped `VideoLibrary` sections.
- `VideoLibrary` reverses its input before rendering; country posters display oldest first and newest last, while the scorecard uses the newest record.
- `VideoScorecard` is shared with the travel detail page; the country row uses only the newest matching record’s scorecard and animates its bars.
- `VideoLibrary` has an opt-in horizontal layout for the country row; other libraries keep their existing grid layout.
- The country-row scorecard parent has 5px top and bottom and 10px left padding; multiple-poster mobile rows use no left padding and reserve 195px for the scorecard, while single-poster mobile rows cap poster width at 145px. The two-poster desktop column does not grow and push the scorecard right. Below 600px, labels, legend text, and final-score text use about half-size type and bar stacks use half height without overflowing their track. Country bars stay touching within each score category; category rows have vertical gaps, desktop bars end at the divider width, and ratings below 3 hide their in-bar text.
- Each `extras.countries` entry stores its display name and numeric map ID in `src/datasources/TravelMetaData.ts`; map dots and clicked-country video matching use those IDs directly.
