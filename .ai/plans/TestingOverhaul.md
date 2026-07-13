# Testing Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close the highest-value unit test gaps in the portfolio codebase and fix the tests that no longer reflect reality, without regressing the suite's current near-instant run time.

**Architecture:** No test framework changes. Keep Jest 29 + `next/jest` + `@testing-library/react`, keep mocking to native Jest primitives (`jest.fn`, `jest.mock("next/router")`, `jest.spyOn`, `jest.useFakeTimers`) — no new mocking libraries. Split test execution environment per-file (`node` for pure-logic tests, `jsdom` only where DOM/React rendering is actually needed) to keep the suite fast as it grows.

**Tech Stack:** Jest 29.7, jest-environment-jsdom 30.4, @testing-library/react 16, @testing-library/dom 10. No new dependencies are introduced by this plan.

## Global Constraints

- Do not add `@testing-library/jest-dom` or any other new dependency — see "Rejected ideas" below for why.
- Every new pure-logic test file (no JSX render, no DOM APIs) must carry a `/** @jest-environment node */` docblock as its first line.
- Mock only at the true boundary (`next/router`, `window.prompt`/`alert`, `localStorage`, system time). Never mock a function to test the module that defines it.
- No snapshot tests. Assert on rendered text/roles/attributes or on return values, matching the existing house style.
- After every task, run `yarn test` and confirm total suite time stays in the same order of magnitude as the current baseline (23 suites / 72 tests / ~3.4s on this machine — see Current State below). If a single new suite measurably slows the run, it's a sign DOM rendering was used where a plain function call would do.
- No comments in test code except the rare case the repo's own convention already allows: a non-obvious workaround for a specific gotcha (e.g. Task 3.3 documents why a naive "just take the first item" version throws). Follow existing formatting (tabs, `it("does x", ...)` phrasing, `describe` per function/component).

---

## Current State (investigation findings)

- 22 test files, 72 tests, all passing, ~3.4s total run time. The suite is small and fast — the job here is targeted addition, not a rewrite.
- `jest.config.js` forces `testEnvironment: "jest-environment-jsdom"` globally, including for 8 existing test files that touch no DOM at all (`metaDataFilters.test.ts`, `metaDataSorts.test.ts`, both `urlQuery.test.ts` files, `textFormatter.test.ts`, `splitStringAtFullStop.test.tsx`, `guideDataService.test.ts`). jsdom setup is pure overhead for these.
- **`src/travel/travelDataService.ts`** (14 exported functions: grouping, tiering, search, localStorage-backed "watched" and "restriction bypass" state) has **zero test coverage**. It's the single largest untested piece of real logic in the repo, and its guide-side equivalent (`guideDataService.ts` / `filterAndSortMetaData.ts` family) is already well tested.
- `pages/travel/index.tsx` has the same shape of URL-sync/sort/search logic as `pages/guides/index.tsx`, which is already covered by `GuidesPage.test.tsx` — but the travel page has no equivalent integration test.
- `src/assets/**` (AssetItem, AssetCollection, getFeaturedItems, Searchbar) is a fully untested feature area. `getFeaturedItems.tsx` in particular is a non-trivial seeded-random selection algorithm.
- `src/guides/components/filter/filterAnimations.ts` (shared by both `SortButton` and `TravelSort`) and both of those components themselves are untested, despite containing real open/close/keyboard-navigation logic.
- **Three confirmed-broken tests, found by running `npx tsc --noEmit` (Jest itself doesn't type-check — SWC only transpiles — so all three silently pass today while testing interfaces that no longer exist):**
  1. `src/guides/components/filter/FilterModal.test.ts` calls `FilterModal(...)` with 7 positional arguments, but the component's signature now takes 9 (`error TS2554: Expected 9 arguments, but got 7`) — it grew `disableClearAll` and `handleClearAll` at some point and the test was never updated.
  2. `src/homepage/experience/components/VolunteerListItem.test.tsx` doesn't pass the now-required `agency` and `index` props (`error TS2739`).
  3. `src/homepage/experience/components/WorkExpItems.test.tsx` doesn't pass the now-required `index` prop (`error TS2741`), and its component's `employerLocation` has since become optional and `employerExperiences` items gained optional `subRole`/`location` fields — none of that is exercised.
- **Misnamed test file:** `src/homepage/experience/components/WorkExpItems.test.tsx` tests the component `WorkExpListItem` (there is no `WorkExpItems` component). It also asserts `getByText(employerName)` twice — a copy-paste leftover.
- `src/projects/*` (`ProjectItem`, `ExternalLinkButtons`) and `src/datasources/ProjectMetaData.ts` are not referenced by any page (`grep` across `pages/` found nothing). This looks like an orphaned/unshipped feature, not a coverage gap — flagged for a decision, not for tests (see "Explicitly out of scope").

---

## Phase 1 — Fix what's broken (do first; cheap, unblocks trust in the suite)

### Task 1.1: Fix `FilterModal.test.ts` to match the real component signature

**Files:**
- Modify: `src/guides/components/filter/FilterModal.test.ts`

The component (`src/guides/components/filter/FilterModal.tsx:15-24`) takes 9 positional args ending in `disableClearAll: boolean` and `handleClearAll: () => void`. The test only supplies 7. Fix the call and add coverage for the two missing params (disabled state and the click handler), which is currently untested entirely.

- [x] Replace the test body with:

```ts
import { render, fireEvent } from "@testing-library/react";
import { Languages, Tags, Topic } from "../../types";
import { FilterModal } from "./FilterModal";

describe("FilterModal", () => {
	const topicFilter = Topic.Programming;
	const languagesFilter = [Languages.Typescript];
	const tagsFilter = [Tags.CodeBlock];

	const setTopicFilter = jest.fn();
	const setFilteredLanguages = jest.fn();
	const setTagsFilter = jest.fn();
	const setShowFilterMenu = jest.fn();
	const handleClearAll = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("Renders the filter dialog window with pre-filled values", () => {
		const { getByText, getAllByText } = render(
			FilterModal(
				topicFilter,
				setTopicFilter,
				languagesFilter,
				setFilteredLanguages,
				tagsFilter,
				setTagsFilter,
				setShowFilterMenu,
				false,
				handleClearAll,
			),
		);

		expect(getByText("Filter")).toBeDefined();

		expect(getAllByText("Topic")).toBeDefined();
		expect(getByText("Programming")).toBeDefined();

		expect(getAllByText("Languages")).toBeDefined();
		expect(getByText("Typescript")).toBeDefined();

		expect(getAllByText("Tags")).toBeDefined();
		expect(getByText("Snippet")).toBeDefined();
	});

	it("disables Clear All when disableClearAll is true", () => {
		const { getByRole } = render(
			FilterModal(
				topicFilter,
				setTopicFilter,
				languagesFilter,
				setFilteredLanguages,
				tagsFilter,
				setTagsFilter,
				setShowFilterMenu,
				true,
				handleClearAll,
			),
		);

		expect(getByRole("button", { name: "Clear All" })).toHaveProperty(
			"disabled",
			true,
		);
	});

	it("calls handleClearAll when Clear All is clicked", () => {
		const { getByRole } = render(
			FilterModal(
				topicFilter,
				setTopicFilter,
				languagesFilter,
				setFilteredLanguages,
				tagsFilter,
				setTagsFilter,
				setShowFilterMenu,
				false,
				handleClearAll,
			),
		);

		fireEvent.click(getByRole("button", { name: "Clear All" }));

		expect(handleClearAll).toHaveBeenCalledTimes(1);
	});
});
```

- [x] Run `yarn test FilterModal` — expect 3 passed.
- [x] Run `npx tsc --noEmit` — confirm the `TS2554` error on this file is gone.
- [x] Commit: `git add src/guides/components/filter/FilterModal.test.ts && git commit -m "test: fix FilterModal test to match its real 9-arg signature"`

### Task 1.2: Rename `WorkExpItems.test.tsx`, add its missing required `index` prop, and cover the optional-location branch

**Files:**
- Delete (via `git mv`): `src/homepage/experience/components/WorkExpItems.test.tsx`
- Create: `src/homepage/experience/components/WorkExpListItem.test.tsx`

`WorkExpListItem`'s props (`src/homepage/experience/components/WorkExpListItem.tsx:7-26`) now require `index: number` and make `employerLocation` optional. The existing test supplies neither correctly — `npx tsc --noEmit` flags it (`TS2741: Property 'index' is missing`). Fix the props and add a case for the optional-location branch, which was never covered.

- [x] `git mv src/homepage/experience/components/WorkExpItems.test.tsx src/homepage/experience/components/WorkExpListItem.test.tsx`
- [x] Replace its content with:

```tsx
import { render } from "@testing-library/react";
import { WorkExpListItem } from "./WorkExpListItem";

describe("WorkExpListItem", () => {
	it("renders all parsed values", () => {
		const companyLogo = "company-logo";
		const employerName = "Employer Name";
		const periodWithEmployer = "January 2020 - Present";
		const employerLocation = "New York, NY";
		const employerExperiences = [
			{
				title: "Developer",
				subRole: "Frontend",
				period: "January 2020 - Present",
			},
		];

		const { getByText } = render(
			<WorkExpListItem
				companyLogo={companyLogo}
				employerName={employerName}
				periodWithEmployer={periodWithEmployer}
				employerLocation={employerLocation}
				employerExperiences={employerExperiences}
				index={0}
			/>,
		);

		expect(getByText(employerName)).toBeDefined();
		expect(getByText(employerLocation)).toBeDefined();
		expect(getByText(periodWithEmployer)).toBeDefined();
		expect(getByText(employerExperiences[0].title)).toBeDefined();
		expect(getByText(employerExperiences[0].subRole)).toBeDefined();
	});

	it("omits the employer location line when none is given", () => {
		const { queryByText, getByText } = render(
			<WorkExpListItem
				companyLogo='company-logo'
				employerName='Employer Name'
				periodWithEmployer='2020 - Present'
				employerExperiences={[{ title: "Developer", period: "2020 - Present" }]}
				index={0}
			/>,
		);

		expect(queryByText("New York, NY")).toBeNull();
		expect(getByText("2020 - Present")).toBeDefined();
	});
});
```

- [x] Run `yarn test WorkExpListItem` — expect 2 passed.
- [x] Run `npx tsc --noEmit` — confirm the `TS2741` error on this file is gone.
- [x] Commit: `git add -A src/homepage/experience/components/ && git commit -m "test: fix WorkExpListItem test props and cover the optional-location branch"`

### Task 1.3: Fix `VolunteerListItem.test.tsx`'s missing required props

**Files:**
- Modify: `src/homepage/experience/components/VolunteerListItem.test.tsx`

`VolunteerListItem`'s props (`src/homepage/experience/components/VolunteerListItem.tsx:8-22`) now require `agency: string` and `index: number`. The test supplies neither — `npx tsc --noEmit` flags it (`TS2739`).

- [x] Replace its content with:

```tsx
import { render } from "@testing-library/react";
import { VolunteerListItem } from "./VolunteerListItem";

describe("VolunteerListItem", () => {
	it("renders all parsed values", () => {
		const companyLogo = "company-logo";
		const agency = "Example Charity";
		const title = "Teacher";
		const volunteerLocation = "New York, NY";
		const periodVolunteering = "January 2020 - Present";

		const { getByText } = render(
			<VolunteerListItem
				logo={companyLogo}
				agency={agency}
				title={title}
				location={volunteerLocation}
				year={periodVolunteering}
				index={0}
			/>,
		);

		expect(getByText(agency)).toBeDefined();
		expect(getByText(title)).toBeDefined();
		expect(getByText(volunteerLocation)).toBeDefined();
		expect(getByText(periodVolunteering)).toBeDefined();
	});
});
```

- [x] Run `yarn test VolunteerListItem` — expect 1 passed.
- [x] Run `npx tsc --noEmit` — confirm the `TS2739` error on this file is gone.
- [x] Commit: `git add src/homepage/experience/components/VolunteerListItem.test.tsx && git commit -m "test: fix VolunteerListItem test to pass its required agency and index props"`

---

## Phase 2 — Performance: stop paying for jsdom on pure-logic tests

### Task 2.1: Pin existing pure-logic suites to the `node` test environment

**Files (add `/** @jest-environment node */` as line 1 of each):**
- `src/guides/filter-sort/metaDataFilters.test.ts`
- `src/guides/filter-sort/metaDataSorts.test.ts`
- `src/guides/filter-sort/urlQuery.test.ts`
- `src/travel/urlQuery.test.ts`
- `src/guides/components/cards/textFormatter.test.ts`
- `src/guides/guideDataService.test.ts`
- `utils/split-string/splitStringAtFullStop.test.tsx`

None of these files render a component or touch `window`/`document`. Jest supports a per-file environment override via a docblock at the very top of the file — this needs no `jest.config.js` change and carries zero risk to the jsdom-dependent suites.

- [x] For each file above, add this as the first line (above the existing `import`s):

```ts
/** @jest-environment node */
```

- [x] Run `yarn test` — expect the same 23 suites / 72 tests to pass.
- [x] Commit: `git add src/guides/filter-sort/*.test.ts src/travel/urlQuery.test.ts src/guides/components/cards/textFormatter.test.ts src/guides/guideDataService.test.ts utils/split-string/splitStringAtFullStop.test.tsx && git commit -m "perf: run pure-logic tests in the node environment instead of jsdom"`

**Note:** every new pure-logic test file added in Phase 3 below already includes this docblock in its example code — don't add it a second time.

---

## Phase 3 — Close the pure-logic coverage gaps

### Task 3.1: `src/travel/travelDataService.ts` — the biggest gap in the repo

**Files:**
- Create: `src/travel/travelDataService.test.ts`

This file backs the entire `/travel` page (grouping, tiering, search) plus a localStorage-backed "watched videos" / "restriction bypass" mechanism. It currently has 0 tests.

**Why this uses the real datasource instead of a local fixture (unlike every other test in this plan):** most of these functions (`allNewestFirst`, `allByBest`, `allByFood`, `allByDanger`, `funniestOnly`, `allCountriesList`, `countTotalCountries`, `searchResult`) read the module-level `travelVideoMetaData` import directly — there is no metadata parameter to inject (unlike `getTravelMetaDataIndex`, `videoEnabled`, and `addToWatchedVideosStorage`, which already take their data as direct arguments). Adding injectable parameters was considered and rejected: `pages/travel/index.tsx:44-53` dispatches all of these through one shared call site (`sortFunctions[sortSelection](hasMounted ? undefined : false)`), which already passes a stray boolean into whatever a new first parameter would be — turning that boolean into a real `metaData` parameter would silently break at runtime the first time a user picks "Best"/"Worst"/"Food"/"Danger"/"Funniest" sort before the page finishes mounting. That's a production behavior change to chase a testing convenience, so instead: assert content-agnostic invariants (ordering, uniqueness, reverse-relationships, known-heading membership) against the real data. These invariants hold regardless of how many travel videos exist or get added later, so they won't churn like the guide-content-derived tests would if they hardcoded exact groupings.

Note on `countTotalCountries()` below: it is **not** asserted to be `>= allCountriesList().length`. `countTotalCountries` sums each video's raw country count and then subtracts that video's `deductCountryCount` adjustment (a real field in the data, used to correct for a video that lists a country it doesn't really count as a new visit) — so the total can legitimately land *below* the deduplicated country count. Verified against the real data while writing this plan: `countTotalCountries()` is 47, `allCountriesList().length` is 48. Only assert non-negativity.

- [x] Write:

```ts
import {
	insecureRestrictionKey,
	travelVideoMetaData,
} from "../datasources/TravelMetaData";
import { TravelVideoMetaData as TravelVideoMetaDataType } from "./types";
import {
	addToWatchedVideosStorage,
	allByBest,
	allByDanger,
	allByFood,
	allByWorst,
	allCountriesList,
	allNewestFirst,
	allOldestFirst,
	countTotalCountries,
	enhancedTravelVideoMetaData,
	funniestOnly,
	getTravelMetaDataIndex,
	hasRestrictionBypass,
	searchResult,
	videoEnabled,
} from "./travelDataService";

describe("getTravelMetaDataIndex()", () => {
	const fixture: TravelVideoMetaDataType[] = [
		{ ...travelVideoMetaData[0], link: "fixture-a" },
		{ ...travelVideoMetaData[0], link: "fixture-b" },
	];

	it("returns the index of the matching link", () => {
		expect(getTravelMetaDataIndex("fixture-b", fixture)).toBe(1);
	});

	it("returns -1 when no video matches", () => {
		expect(getTravelMetaDataIndex("not-a-link", fixture)).toBe(-1);
	});
});

describe("allNewestFirst() / allOldestFirst()", () => {
	it("orders groups from the newest year to the oldest", () => {
		const years = allNewestFirst(false).map((group) => Number(group.heading));
		expect(years).toEqual([...years].sort((a, b) => b - a));
	});

	it("is the exact reverse of allOldestFirst", () => {
		expect(allOldestFirst(false)).toEqual([...allNewestFirst(false)].reverse());
	});
});

describe("allByBest() / allByWorst()", () => {
	const tierOrder = ["🥇 S Tier", "🥈 A Tier", "🥉 B Tier", "C Tier", "💩 F Tier"];

	it("only uses the five known tier headings, in tier order", () => {
		const headings = allByBest().map((tier) => tier.heading);
		expect(headings.every((heading) => tierOrder.includes(heading))).toBe(true);
		const indices = headings.map((heading) => tierOrder.indexOf(heading));
		expect(indices).toEqual([...indices].sort((a, b) => a - b));
	});

	it("is the exact reverse of allByWorst", () => {
		expect(allByWorst()).toEqual([...allByBest()].reverse());
	});
});

describe("allByFood()", () => {
	it("only uses the four known food-tier headings", () => {
		const knownHeadings = ["Delicious", "Tasty", "Edible", "Disgusting"];
		const headings = allByFood().map((tier) => tier.heading);
		expect(headings.every((heading) => knownHeadings.includes(heading))).toBe(
			true,
		);
	});
});

describe("allByDanger()", () => {
	it("only uses the four known advisory headings", () => {
		const knownHeadings = ["Super Safe", "Safe", "Be Alert", "Dangerous"];
		const headings = allByDanger().map((tier) => tier.heading);
		expect(headings.every((heading) => knownHeadings.includes(heading))).toBe(
			true,
		);
	});
});

describe("funniestOnly()", () => {
	it("returns at most a single 'Bangers' group", () => {
		const result = funniestOnly();
		expect(result.length).toBeLessThanOrEqual(1);
		result.forEach((group) => expect(group.heading).toBe("Bangers"));
	});
});

describe("allCountriesList() / countTotalCountries()", () => {
	it("never lists the same country twice", () => {
		const countries = allCountriesList();
		expect(new Set(countries).size).toBe(countries.length);
	});

	it("returns a non-negative count", () => {
		expect(countTotalCountries()).toBeGreaterThanOrEqual(0);
	});
});

describe("searchResult()", () => {
	it("returns no groups for an empty search term", () => {
		expect(searchResult("")).toEqual([]);
	});

	it("returns no groups when nothing matches", () => {
		expect(searchResult("zzz-definitely-not-a-real-search-term-zzz")).toEqual(
			[],
		);
	});

	it("matches a real country name from the data, case-insensitively", () => {
		const [knownCountry] = allCountriesList();
		const result = searchResult(knownCountry.toUpperCase());
		const countriesGroup = result.find((group) => group.heading === "Countries");
		expect(countriesGroup?.grouping.length).toBeGreaterThan(0);
	});
});

describe("enhancedTravelVideoMetaData()", () => {
	beforeEach(() => localStorage.clear());

	it("leaves previouslyWatched unset when applyWatchedStatus is false", () => {
		const result = enhancedTravelVideoMetaData(false);
		expect(result.every((video) => video.previouslyWatched === undefined)).toBe(
			true,
		);
	});

	it("marks a video as previously watched when its link is in storage", () => {
		localStorage.setItem(
			"watchedVideos",
			JSON.stringify([travelVideoMetaData[0].link]),
		);
		const result = enhancedTravelVideoMetaData(true);
		expect(result[0].previouslyWatched).toBe(true);
	});
});

describe("localStorage-backed helpers", () => {
	beforeEach(() => {
		localStorage.clear();
		jest.restoreAllMocks();
	});

	describe("addToWatchedVideosStorage()", () => {
		it("adds the link to watchedVideos in localStorage", () => {
			addToWatchedVideosStorage("some-link");
			expect(JSON.parse(localStorage.getItem("watchedVideos") || "[]")).toEqual([
				"some-link",
			]);
		});

		it("does not add the same link twice", () => {
			addToWatchedVideosStorage("some-link");
			addToWatchedVideosStorage("some-link");
			expect(
				JSON.parse(localStorage.getItem("watchedVideos") || "[]"),
			).toHaveLength(1);
		});

		it("clears the watched list once every video has been watched", () => {
			const almostAllWatched = Array.from(
				{ length: travelVideoMetaData.length - 1 },
				(_, i) => `placeholder-${i}`,
			);
			localStorage.setItem("watchedVideos", JSON.stringify(almostAllWatched));

			addToWatchedVideosStorage("the-last-one");

			expect(localStorage.getItem("watchedVideos")).toBeNull();
		});
	});

	describe("hasRestrictionBypass()", () => {
		it("returns false when no bypass flag is stored", () => {
			expect(hasRestrictionBypass()).toBe(false);
		});

		it("returns true when the bypass flag is set", () => {
			localStorage.setItem("restriction-bypass-v2", "true");
			expect(hasRestrictionBypass()).toBe(true);
		});
	});

	describe("videoEnabled()", () => {
		const restrictedVideo = { restricted: true } as TravelVideoMetaDataType;

		it("returns true immediately for an unrestricted video", () => {
			expect(
				videoEnabled({ restricted: false } as TravelVideoMetaDataType),
			).toBe(true);
		});

		it("returns true without prompting when bypass is already set", () => {
			localStorage.setItem("restriction-bypass-v2", "true");
			const promptSpy = jest.spyOn(window, "prompt");
			expect(videoEnabled(restrictedVideo)).toBe(true);
			expect(promptSpy).not.toHaveBeenCalled();
		});

		it("alerts on an incorrect password", () => {
			jest.spyOn(window, "prompt").mockReturnValue("definitely-wrong");
			const alertSpy = jest.spyOn(window, "alert").mockImplementation();
			videoEnabled(restrictedVideo);
			expect(alertSpy).toHaveBeenCalledWith("Password Incorrect");
		});

		it("stores the bypass flag on the correct password", () => {
			jest.spyOn(window, "prompt").mockReturnValue(insecureRestrictionKey);
			jest.spyOn(console, "error").mockImplementation(() => undefined);
			videoEnabled(restrictedVideo);
			expect(localStorage.getItem("restriction-bypass-v2")).toBe("true");
		});
	});
});
```

`window.location.reload` is non-configurable in this jsdom version (`jest.spyOn(window.location, "reload")` and `Object.defineProperty(window.location, "reload", ...)` both throw `Cannot redefine property`, confirmed by actually running this test) — so the last case above doesn't assert `reload` was called, only the `localStorage` side effect that happens right before it. jsdom's real `reload()` still fires and logs a "Not implemented: navigation" console error; the `console.error` spy (same pattern as `ErrorBoundary.test.tsx`) silences that expected noise without hiding a real failure.

- [x] Run `yarn test travelDataService` and verify all pass.
- [x] Commit: `git add src/travel/travelDataService.test.ts && git commit -m "test: add coverage for travelDataService grouping, tiering, search and localStorage helpers"`

### Task 3.2: `getFeaturedItems.tsx` — deterministic seeded-random selection

**Files:**
- Create: `src/assets/components/getFeaturedItems.test.ts`

The seed is derived from `new Date()` (`src/assets/components/getFeaturedItems.tsx:9-13`), so the test must pin system time with Jest's built-in fake timers (no mocking library needed) to get a deterministic result.

- [x] Write:

```ts
/** @jest-environment node */
import { getFeaturedItems } from "./getFeaturedItems";
import { AssetCollectionMetaData } from "../types";

const collections: AssetCollectionMetaData[] = [
	{
		title: "Nature",
		hostedLink: "nature",
		thumbnail: "thumb.jpg",
		assetItemMetaData: [
			{ title: "Clip A", price: 5, thumbnail: "a.jpg", link: "a", tags: [] },
			{ title: "Clip B", price: 10, thumbnail: "b.jpg", link: "b", tags: [] },
		],
		wallpapers: ["wall1.jpg", "wall2.jpg"],
	},
] as AssetCollectionMetaData[];

describe("getFeaturedItems()", () => {
	beforeEach(() => {
		jest.useFakeTimers().setSystemTime(new Date("2026-01-15"));
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it("returns up to 3 asset clips and up to 3 wallpapers", () => {
		const result = getFeaturedItems(collections);
		const clips = result.filter((item) => item.price !== null);
		const wallpapers = result.filter((item) => item.price === null);

		expect(clips.length).toBeLessThanOrEqual(3);
		expect(wallpapers.length).toBeLessThanOrEqual(3);
		expect(result.length).toBe(clips.length + wallpapers.length);
	});

	it("is deterministic for the same day", () => {
		const first = getFeaturedItems(collections);
		const second = getFeaturedItems(collections);
		expect(first).toEqual(second);
	});

	it("prefixes clip titles with the collection title", () => {
		const result = getFeaturedItems(collections);
		const clip = result.find((item) => item.price !== null);
		expect(clip?.title.startsWith("Nature Clip")).toBe(true);
	});

	it("builds wallpaper thumbnails from the collection's hosted link", () => {
		const result = getFeaturedItems(collections);
		const wallpaper = result.find((item) => item.price === null);
		expect(wallpaper?.thumbnail).toMatch(/^nature\//);
	});

	it("returns an empty array when there are no collections", () => {
		expect(getFeaturedItems([])).toEqual([]);
	});
});
```

- [x] Run `yarn test getFeaturedItems` — expect 5 passed (verified while writing this plan: `getFeaturedItems` copies items into its own local arrays before `splice`-ing them, so the shared module-level `collections` fixture above is safe to reuse across all five `it`s without depletion).
- [x] Commit: `git add src/assets/components/getFeaturedItems.test.ts && git commit -m "test: add coverage for getFeaturedItems seeded selection"`

### Task 3.3: `filterAndSortMetaData.ts` — the untested composition point

**Files:**
- Create: `src/guides/filter-sort/filterAndSortMetaData.test.ts`

Sub-functions (`filterForTopic`, `sortByNewest`, etc.) are already well tested individually; the orchestrator that combines them (`src/guides/filter-sort/filterAndSortMetaData.ts:15-48`) is not. This reads real data via `getGuideMetaData()` (no injection point exists), so assert on shape/order invariants rather than exact object equality — that keeps the test robust to guide content edits.

- [x] Write:

```ts
/** @jest-environment node */
import { SortOptions } from "../types";
import { filterAndSortMetaData } from "./filterAndSortMetaData";
import { getGuideMetaData } from "../guideDataService";

describe("filterAndSortMetaData()", () => {
	it("returns everything, newest first, when no filters are set", () => {
		const result = filterAndSortMetaData(SortOptions.Newest, undefined, [], []);
		expect(result).toHaveLength(getGuideMetaData().length);
		expect(result).toEqual([...result].sort((a, b) => b.created - a.created));
	});

	it("applies topic, language and tag filters together", () => {
		// `languages`/`tags` are optional on GuideMetaData, and item 0 in the
		// real data doesn't have any set — pick an entry that does, rather
		// than assuming the first item works (confirmed by running this: the
		// naive `const [sample] = getGuideMetaData()` version throws
		// "Cannot read properties of undefined (reading 'length')").
		const sample = getGuideMetaData().find(
			(item) => item.languages && item.languages.length > 0,
		);
		if (!sample) throw new Error("expected a guide with languages set");

		const result = filterAndSortMetaData(
			SortOptions.Newest,
			sample.topic,
			sample.languages ?? [],
			sample.tags ?? [],
		);
		expect(result.every((item) => item.topic === sample.topic)).toBe(true);
		expect(result.map((item) => item.link)).toContain(sample.link);
	});

	it("sorts alphabetically when requested", () => {
		const result = filterAndSortMetaData(
			SortOptions.Alphabetical,
			undefined,
			[],
			[],
		);
		const titles = result.map((item) => item.title);
		expect(titles).toEqual([...titles].sort((a, b) => a.localeCompare(b)));
	});
});
```

- [x] Run `yarn test filterAndSortMetaData` — expect 3 passed.
- [x] Commit: `git add src/guides/filter-sort/filterAndSortMetaData.test.ts && git commit -m "test: add coverage for the filterAndSortMetaData orchestrator"`

### Task 3.4: `filterAnimations.ts` — shared menu-interaction logic

**Files:**
- Create: `src/guides/components/filter/filterAnimations.test.ts`

`closeMenu` and `keyboardNavigation` back both `SortButton` and `TravelSort` (Phase 4). Testing them directly, with plain object stand-ins for the DOM event and ref, is simpler and faster than exercising them only through a rendered menu.

- [x] Write:

```ts
/** @jest-environment node */
import { addTransparency, closeMenu, keyboardNavigation } from "./filterAnimations";

describe("closeMenu()", () => {
	it("closes the menu when the click is outside the anchor", () => {
		const setOpen = jest.fn();
		const anchorRef = { current: { contains: () => false } };
		closeMenu(
			{ target: {} } as unknown as Event,
			setOpen,
			anchorRef as React.RefObject<HTMLButtonElement>,
		);
		expect(setOpen).toHaveBeenCalledWith(false);
	});

	it("leaves the menu open when the click is on the anchor itself", () => {
		const setOpen = jest.fn();
		const anchorRef = { current: { contains: () => true } };
		closeMenu(
			{ target: {} } as unknown as Event,
			setOpen,
			anchorRef as React.RefObject<HTMLButtonElement>,
		);
		expect(setOpen).not.toHaveBeenCalled();
	});
});

describe("keyboardNavigation()", () => {
	it("closes the menu and prevents default on Tab", () => {
		const setOpen = jest.fn();
		const preventDefault = jest.fn();
		keyboardNavigation(
			{ key: "Tab", preventDefault } as unknown as React.KeyboardEvent,
			setOpen,
		);
		expect(preventDefault).toHaveBeenCalled();
		expect(setOpen).toHaveBeenCalledWith(false);
	});

	it("closes the menu on Escape without preventing default", () => {
		const setOpen = jest.fn();
		const preventDefault = jest.fn();
		keyboardNavigation(
			{ key: "Escape", preventDefault } as unknown as React.KeyboardEvent,
			setOpen,
		);
		expect(preventDefault).not.toHaveBeenCalled();
		expect(setOpen).toHaveBeenCalledWith(false);
	});

	it("does nothing on other keys", () => {
		const setOpen = jest.fn();
		keyboardNavigation(
			{ key: "a", preventDefault: jest.fn() } as unknown as React.KeyboardEvent,
			setOpen,
		);
		expect(setOpen).not.toHaveBeenCalled();
	});
});

describe("addTransparency()", () => {
	it("appends a two-digit hex alpha suffix to a color", () => {
		expect(addTransparency("#66bb6a", 1)).toBe("#66bb6aFF");
	});

	it("clamps opacity above 1 down to 1", () => {
		expect(addTransparency("#66bb6a", 2)).toBe("#66bb6aFF");
	});

	it("clamps opacity below 0 up to 0", () => {
		expect(addTransparency("#66bb6a", -1)).toBe("#66bb6a0");
	});
});
```

- [x] Run `yarn test filterAnimations` and adjust the exact `addTransparency` expectations if the hex math differs from the above (read `src/guides/components/filter/filterAnimations.tsx:45-48` and compute by hand — `Math.round(0 * 255).toString(16)` is `"0"`, not `"00"`, which is why the negative case above has one fewer digit).
- [x] Commit: `git add src/guides/components/filter/filterAnimations.test.ts && git commit -m "test: add coverage for closeMenu, keyboardNavigation and addTransparency"`

---

## Phase 4 — Close the interactive-component gaps

Each task below follows the existing house pattern: `render` + `fireEvent` + `getByText`/`getByRole`, `next/router` mocked exactly as `src/global/navigation/Navbar.test.tsx` and `src/guides/GuidesPage.test.tsx` already do. Use those two files as the concrete style reference — same mock shape, same assertion style (`toBeDefined()` on the `getBy*` result, `toHaveBeenCalledWith` on handlers).

### Task 4.1: Expand `Navbar.test.tsx` to cover its actual logic

**Files:**
- Modify: `src/global/navigation/Navbar.test.tsx`

Current test only asserts static text renders. The component's real logic — `initialTab()` (`src/global/navigation/Navbar.tsx:10-24`) matching `router.pathname` to a tab by prefix, and `handleTabClick` calling `router.replace` — is untested.

- [x] Add cases to the existing `next/router` mock (make `useRouter` a `jest.fn()` so `pathname` can vary per test, same technique as `GuidesPage.test.tsx`):
  - Given `pathname: "/guides"`, the "GUIDES" tab renders with `aria-selected="true"`.
  - Given `pathname: "/guides/some-post"` (a sub-route), the "GUIDES" tab is still selected (prefix match).
  - Given an unrecognized `pathname`, the first tab ("PORTFOLIO") is selected.
  - Clicking a tab calls `router.replace` with that tab's route.
- [x] Run `yarn test Navbar` and commit: `git commit -m "test: cover Navbar's tab-selection and click-to-navigate logic"`

### Task 4.2: `SortButton.test.tsx` (new)

**Files:**
- Create: `src/guides/components/buttons/SortButton.test.tsx`

Cover: menu opens on click; clicking "Newest"/"Oldest"/"Alphabetical" calls `setSortMetaDataBy` with the matching `SortOptions` value; the "Alphabetical" option is absent when `alphabetical={false}` is passed.

- [x] Implement, run `yarn test SortButton`, commit: `git commit -m "test: add coverage for SortButton menu and selection"`

### Task 4.3: `TravelSort.test.tsx` (new)

**Files:**
- Create: `src/travel/components/TravelSort.test.tsx`

Cover: menu opens on click; clicking each rendered `SortBy` option calls `setSortMetaDataBy` with that value; the first `SortBy` enum value (sliced off via `.slice(1)` in the component) is never rendered as a menu item.

- [x] Implement, run `yarn test TravelSort`, commit: `git commit -m "test: add coverage for TravelSort menu and selection"`

### Task 4.4: `FolioModal.test.tsx` (new)

**Files:**
- Create: `src/folio/modal/FolioModal.test.tsx`

`FolioModal` is a plain function (like `FilterModal`) invoked as `FolioModal(setShowModal, payload)`, not as JSX — mirror the calling convention from `FilterModal.test.ts`. Cover: renders heading/knowledge/description/proficiency for a complete payload; returns `undefined` (renders nothing) when any required field is missing (`src/folio/modal/FolioModal.tsx:13-21`); close button calls `setShowModal(false)`.

- [x] Implement, run `yarn test FolioModal`, commit: `git commit -m "test: add coverage for FolioModal including its guard-clause branch"`

### Task 4.5: `AssetItem.test.tsx` (new)

**Files:**
- Create: `src/assets/components/AssetItem/AssetItem.test.tsx`

Cover: shows "Free" when `price === null`, `"$5"` when `price: 5`; shows the length badge only when `item.length` is set; shows the pack icon only when `item.isPack` is true; clicking the card delegates a click to the hidden Gumroad anchor (`src/assets/components/AssetItem/AssetItem.tsx:22-26` — assert via a `jest.spyOn` on the anchor's `click` method, or simpler: assert `document.querySelector("a.gumroad-button")` received focus/was clicked by checking a `click` listener fired).

- [x] Implement, run `yarn test AssetItem`, commit: `git commit -m "test: add coverage for AssetItem pricing, badges and click delegation"`

### Task 4.6: `AssetCollection.test.tsx` (new)

**Files:**
- Create: `src/assets/components/AssetCollection/AssetCollection.test.tsx`

This component imports the `next/router` default export directly (`import router from "next/router"`), not the `useRouter()` hook — mock it accordingly:

```tsx
jest.mock("next/router", () => ({
	push: jest.fn(),
}));
```

Cover: renders the collection title; clicking the card calls `router.push` with `/assets-store/${collection.hostedLink}`.

- [x] Implement, run `yarn test AssetCollection`, commit: `git commit -m "test: add coverage for AssetCollection navigation on click"`

### Task 4.7: `ImageWithSkeleton.test.tsx` (new)

**Files:**
- Create: `src/global/ImageWithSkeleton.test.tsx`

Cover: renders with the skeleton class before load; after firing a `load` event on the `<img>`, the loaded class is applied and any `onLoad` prop passed in is still called.

- [x] Implement, run `yarn test ImageWithSkeleton`, commit: `git commit -m "test: add coverage for ImageWithSkeleton load state transition"`

### Task 4.8: `ErrorContent.test.tsx` (new)

**Files:**
- Create: `utils/error/ErrorContent.test.tsx`

One-line render test, matching the sibling `ErrorBoundary.test.tsx` style: asserts `"Not Found"` renders.

- [x] Implement, run `yarn test ErrorContent`, commit: `git commit -m "test: add coverage for ErrorContent"`

---

## Phase 5 — Page-level integration test

### Task 5.1: `TravelPage.test.tsx` (new) — mirror `GuidesPage.test.tsx`

**Files:**
- Create: `src/travel/TravelPage.test.tsx` (imports `pages/travel/index.tsx`, exactly as `GuidesPage.test.tsx` imports `pages/guides/index.tsx`)

`pages/travel/index.tsx` has the same URL-sync-via-history-API pattern as the guides page (already covered), but nothing exercises it today. Mock `next/router`'s `useRouter` the same way `GuidesPage.test.tsx` does. Cover:

- Selecting a sort option via `TravelSort` updates the URL's `SortBy` query param via `window.history.replaceState` (assert on `window.location.search`, same technique as the existing guides tests).
- Typing in the search bar switches the active sort to `Searching` and puts the search text in the `q` param.
- Clearing the search text falls back to the default (`Newest`) URL state.

- [x] Implement, run `yarn test TravelPage`, commit: `git commit -m "test: add TravelPage integration coverage for sort/search URL sync"`

---

## Phase 6 — Final verification

### Task 6.1: Full suite pass and timing check

- [x] Run `npx tsc --noEmit -p tsconfig.json` — confirm zero errors (this is what would have caught the `FilterModal` breakage originally; treat any new error the same way).
- [x] Run `time yarn test` — confirm all suites pass and total time remains in the low single-digit seconds. Expected new count: ~34 suites, roughly 115-130 tests.
- [x] Run `yarn lint` — confirm no new lint errors from the added test files.
- [x] Commit any final fixups.

---

## Explicitly out of scope (with rationale)

Skipping these is a deliberate choice, not an oversight — re-raise only if the underlying code changes:

- **`src/projects/*` (`ProjectItem`, `ExternalLinkButtons`) and `ProjectMetaData.ts`** — not imported by any page (`grep -r "ProjectItem" pages/` is empty). This looks like an orphaned feature. Writing tests for unreachable code isn't useful — worth a separate conversation with the user about whether to wire it up or delete it, not a testing task.
- **Pure composition/wrapper components with no branching logic**: `Contact`, `Salary`, `Qualifications`, `ForYou`, `Experience`, `Skills`, `Portfolio`, `SubHeading`, `LanguagesColumn`, `LanguagesRow`, `FilterButton` (already exercised indirectly via `GuidesPage.test.tsx`'s "Filter" button clicks). These just map static data into JSX with no conditionals worth asserting on beyond what a snapshot would show, and this repo doesn't use snapshots.
- **`utils/isClientSide.ts`** — a one-line `typeof window !== "undefined"` check. A test would only ever assert `true` inside jsdom; it can't meaningfully regress.
- **`utils/export-meta.ts`** — a build-time Node script, exercised by `yarn build`/`postbuild`, not by the Jest suite.
- **`src/datasources/*.ts`** — static content arrays, not logic.
- **`pages/travel/world-map/index.tsx`, `pages/assets-store/[link].tsx`** — thin static pages with a trivial `.find()` lookup in `getStaticProps` and no client-side branching. Low value relative to the gaps above.
- **`pages/_app.tsx`, `pages/_document.tsx`, `pages/index.tsx`, theming files (`GlobalTheme.tsx`, `darkMode.ts`, `fonts.ts`)** — framework boilerplate/config, standard to leave untested in this kind of app.
- **`pages/guides/[link].tsx`, `pages/travel/[link].tsx`** — real logic here (`getStaticProps` try/catch → `ErrorContent` fallback, JSON-LD construction) but requires mocking `notion-client`'s `NotionAPI` and a `ReactPlayer`/`react-notion-x` render tree; the payoff is real but the setup cost is high relative to everything above. Worth a follow-up plan once this one lands, not bundled in here to keep this plan's scope achievable.

## Rejected ideas (considered, not worth doing)

- **Adding `@testing-library/jest-dom`** for `toBeInTheDocument()`/`toBeDisabled()` matchers instead of `toBeDefined()`. Confirmed while writing this plan: it isn't installed, and `toBeDisabled()` genuinely fails with `TypeError: expect(...).toBeDisabled is not a function` (see Task 1.1, which uses `toHaveProperty("disabled", true)` instead — a plain Jest matcher against the real DOM property, no new dependency needed). The existing `toBeDefined()` pattern elsewhere works correctly too — `getByText`/`getByRole` already throw if the element isn't found, so the assertion isn't a false positive, just less descriptive on failure. Adding a dependency for marginally better failure messages isn't worth it per this repo's minimal-deps convention.
- **Splitting `jest.config.js` into multiple projects** (one per environment) instead of per-file docblocks. Docblocks are simpler, need no config restructuring, and Jest resolves them per-file identically to a projects setup — not worth the added config complexity for ~10 files.
- **Rewriting `metaDataFilters.test.ts`/`metaDataSorts.test.ts` to assert on `.map(g => g.link)` instead of full object equality.** Initially flagged as possibly brittle since they hardcode full expected objects, but they compare against a dedicated stable fixture (`src/guides/test-helpers/guideMetaDataArray.ts`), not live production content — so they're verbose but not fragile. Not worth the churn.
- **Removing `PageContainer.test.tsx`** as low-value (it's a one-line wrapper around MUI's `Container`). Flagged as a candidate but left in place: it's one assertion, costs near-zero run time, and every page-level test that renders through `PageContainer` would fail first anyway if it broke — so it's redundant-but-harmless rather than actively wrong. Remove it only if you want the tidiest possible suite; not required.
