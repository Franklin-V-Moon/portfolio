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
