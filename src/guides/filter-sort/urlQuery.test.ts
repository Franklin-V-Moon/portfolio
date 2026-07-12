import { Languages, SortOptions, Tags, Topic } from "../types";
import {
	buildGuidesQuery,
	buildGuidesSearchString,
	parseGuidesQuery,
} from "./urlQuery";

describe("parseGuidesQuery()", () => {
	it("defaults to Newest sort and no filters when the query is empty", () => {
		expect(parseGuidesQuery({})).toEqual({
			sortBy: SortOptions.Newest,
			topicFilter: undefined,
			languagesFilter: [],
			tagsFilter: [],
		});
	});

	it("parses a valid sort param", () => {
		expect(parseGuidesQuery({ sort: SortOptions.Alphabetical })).toMatchObject(
			{ sortBy: SortOptions.Alphabetical },
		);
	});

	it("falls back to Newest for an invalid sort param", () => {
		expect(parseGuidesQuery({ sort: "not-a-sort" })).toMatchObject({
			sortBy: SortOptions.Newest,
		});
	});

	it("parses a valid topic param", () => {
		expect(parseGuidesQuery({ topic: Topic.Agile })).toMatchObject({
			topicFilter: Topic.Agile,
		});
	});

	it("ignores an invalid topic param", () => {
		expect(parseGuidesQuery({ topic: "not-a-topic" })).toMatchObject({
			topicFilter: undefined,
		});
	});

	it("parses multiple languages params into an array", () => {
		expect(
			parseGuidesQuery({
				languages: [Languages.Typescript, Languages.Docker],
			}),
		).toMatchObject({
			languagesFilter: [Languages.Typescript, Languages.Docker],
		});
	});

	it("parses a single languages param into a one-item array", () => {
		expect(parseGuidesQuery({ languages: Languages.CSharp })).toMatchObject({
			languagesFilter: [Languages.CSharp],
		});
	});

	it("drops unrecognized language values", () => {
		expect(
			parseGuidesQuery({ languages: [Languages.Docker, "not-a-language"] }),
		).toMatchObject({
			languagesFilter: [Languages.Docker],
		});
	});

	it("parses multiple tags params into an array", () => {
		expect(
			parseGuidesQuery({ tags: [Tags.Essay, Tags.StepByStep] }),
		).toMatchObject({
			tagsFilter: [Tags.Essay, Tags.StepByStep],
		});
	});
});

describe("buildGuidesQuery()", () => {
	it("returns an empty query for all-default state", () => {
		expect(
			buildGuidesQuery(SortOptions.Newest, undefined, [], []),
		).toEqual({});
	});

	it("includes sort when not the default", () => {
		expect(buildGuidesQuery(SortOptions.Oldest, undefined, [], [])).toEqual({
			sort: SortOptions.Oldest,
		});
	});

	it("includes topic when set", () => {
		expect(
			buildGuidesQuery(SortOptions.Newest, Topic.Programming, [], []),
		).toEqual({ topic: Topic.Programming });
	});

	it("includes languages when set", () => {
		expect(
			buildGuidesQuery(
				SortOptions.Newest,
				undefined,
				[Languages.Javascript, Languages.HTML],
				[],
			),
		).toEqual({ languages: [Languages.Javascript, Languages.HTML] });
	});

	it("includes tags when set", () => {
		expect(
			buildGuidesQuery(SortOptions.Newest, undefined, [], [Tags.Story]),
		).toEqual({ tags: [Tags.Story] });
	});

	it("combines all four params when all are set", () => {
		expect(
			buildGuidesQuery(
				SortOptions.Alphabetical,
				Topic.Article,
				[Languages.CSS],
				[Tags.Essay],
			),
		).toEqual({
			sort: SortOptions.Alphabetical,
			topic: Topic.Article,
			languages: [Languages.CSS],
			tags: [Tags.Essay],
		});
	});
});

describe("buildGuidesSearchString()", () => {
	it("returns an empty string for an empty query", () => {
		expect(buildGuidesSearchString({})).toBe("");
	});

	it("serializes single-value params", () => {
		expect(buildGuidesSearchString({ topic: Topic.Agile })).toBe(
			`topic=${Topic.Agile}`,
		);
	});

	it("repeats the key for each item in an array-value param", () => {
		expect(
			buildGuidesSearchString({
				languages: [Languages.Docker, Languages.Terraform],
			}),
		).toBe(
			`languages=${encodeURIComponent(
				Languages.Docker,
			)}&languages=${encodeURIComponent(Languages.Terraform)}`,
		);
	});
});
