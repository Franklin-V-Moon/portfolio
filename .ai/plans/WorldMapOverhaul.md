# Interactive Travel Map — Remaining Plan

## TL;DR

1. The map, clicked-country video row, scorecard variant refactor, and travel metadata validation are implemented.
2. Travel country entries store `{ name, id }`; IDs come from `world-atlas/countries-50m.json` and are documented in `TravelMetaData.ts`.

## Remaining work

### Manual review

- [ ] Verify touch pinch zoom, drag panning, and page scrolling outside the map.
- [ ] Check dot placement and targetability, including the offset Hong Kong and Macau coordinates.
- [ ] Review trailer brightness, land frost, bottom fade, border styling, and video transitions on desktop and mobile.
- [ ] Confirm selection behavior for countries without trailers, empty-map deselection, click lock, page-click unlock, timed unlock, and idle random selection.
- [ ] Check the clicked-country poster row at desktop and mobile widths: poster alignment and order, scorecard fit, and show/hide transitions.

### Completed refactors

- [x] Show the Material UI loading indicator in “Watch Now” after an ordinary click while navigation begins.
- [x] Added a scorecard variant API for the country-row presentation and moved its layout styles into a dedicated stylesheet.
- [x] Added a prebuild metadata check for map country IDs and score arrays matching country order.
