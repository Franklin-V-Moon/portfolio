/** @jest-environment node */
import { SortBy } from "./types";
import {
	buildTravelQuery,
	parseSearchTextFromQuery,
	parseSortByFromQuery,
} from "./urlQuery";

describe("parseSortByFromQuery()", () => {
	it("returns the matching SortBy value case-insensitively", () => {
		expect(parseSortByFromQuery({ SortBy: "best" })).toBe(SortBy.Best);
	});

	it("returns the first value when the param is repeated", () => {
		expect(parseSortByFromQuery({ SortBy: ["worst", "best"] })).toBe(
			SortBy.Worst,
		);
	});

	it("returns null when the param is missing", () => {
		expect(parseSortByFromQuery({})).toBeNull();
	});

	it("returns null when the param doesn't match a known SortBy", () => {
		expect(parseSortByFromQuery({ SortBy: "not-a-real-sort" })).toBeNull();
	});
});

describe("parseSearchTextFromQuery()", () => {
	it("returns the search text when present", () => {
		expect(parseSearchTextFromQuery({ q: "japan" })).toBe("japan");
	});

	it("returns the first value when the param is repeated", () => {
		expect(parseSearchTextFromQuery({ q: ["japan", "korea"] })).toBe("japan");
	});

	it("returns an empty string when the param is missing", () => {
		expect(parseSearchTextFromQuery({})).toBe("");
	});
});

describe("buildTravelQuery()", () => {
	it("returns an empty query for the default sort with no search", () => {
		expect(buildTravelQuery(SortBy.Newest, "")).toEqual({});
	});

	it("includes SortBy when sort is not the default", () => {
		expect(buildTravelQuery(SortBy.Best, "")).toEqual({ SortBy: SortBy.Best });
	});

	it("includes q instead of SortBy when actively searching", () => {
		expect(buildTravelQuery(SortBy.Searching, "japan")).toEqual({
			q: "japan",
		});
	});
});
