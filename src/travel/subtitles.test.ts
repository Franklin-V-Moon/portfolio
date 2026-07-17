import {
	findAvailableSubtitleLanguages,
	shiftVttTimestamps,
	subtitleSourceUrl,
} from "./subtitles";

describe("shiftVttTimestamps", () => {
	it("shifts cue timestamps back by the default Resolve timeline offset", () => {
		const vtt = [
			"WEBVTT",
			"",
			"1",
			"01:00:15.875 --> 01:00:17.208",
			"Where are we?",
		].join("\n");

		const result = shiftVttTimestamps(vtt);

		expect(result).toContain("00:00:15.875 --> 00:00:17.208");
	});

	it("accepts a custom offset", () => {
		const vtt = "00:01:30.000 --> 00:01:32.000";

		expect(shiftVttTimestamps(vtt, 60)).toBe(
			"00:00:30.000 --> 00:00:32.000",
		);
	});

	it("clamps timestamps at zero instead of going negative", () => {
		const vtt = "00:00:10.000 --> 00:00:12.000";

		expect(shiftVttTimestamps(vtt, 3600)).toBe(
			"00:00:00.000 --> 00:00:00.000",
		);
	});

	it("leaves non-timestamp content untouched", () => {
		const vtt = [
			"WEBVTT",
			"",
			"1",
			"01:00:20.875 --> 01:00:24.583",
			"<b>Hi everyone, we're here in Afghanistan</b>",
		].join("\n");

		const result = shiftVttTimestamps(vtt);

		expect(result).toContain("WEBVTT");
		expect(result).toContain("1");
		expect(result).toContain("<b>Hi everyone, we're here in Afghanistan</b>");
	});
});

describe("subtitleSourceUrl", () => {
	it("builds the CDN url from the hosted link and language code", () => {
		expect(subtitleSourceUrl("afghanistan", "en")).toBe(
			"https://d3atatnx15erez.cloudfront.net/afghanistansubtitles-en.vtt",
		);
	});
});

describe("findAvailableSubtitleLanguages", () => {
	const originalFetch = global.fetch;
	const originalConsoleError = console.error;

	beforeEach(() => {
		console.error = jest.fn();
	});

	afterEach(() => {
		global.fetch = originalFetch;
		console.error = originalConsoleError;
	});

	it("returns an empty array when hostedLink is not provided", async () => {
		expect(await findAvailableSubtitleLanguages(undefined, ["en"])).toEqual([]);
	});

	it("returns an empty array when no languages are declared", async () => {
		expect(await findAvailableSubtitleLanguages("afghanistan", [])).toEqual([]);
	});

	it("includes declared languages whose subtitle file exists", async () => {
		global.fetch = jest.fn().mockResolvedValue({ ok: true });

		const result = await findAvailableSubtitleLanguages("afghanistan", ["en"]);

		expect(result).toEqual([{ code: "en", label: "English" }]);
	});

	it("falls back to the raw code as the label when it has no known translation", async () => {
		global.fetch = jest.fn().mockResolvedValue({ ok: true });

		const result = await findAvailableSubtitleLanguages("afghanistan", ["xx"]);

		expect(result).toEqual([{ code: "xx", label: "xx" }]);
	});

	it("excludes declared languages whose subtitle file is missing and logs why", async () => {
		global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 404 });

		const result = await findAvailableSubtitleLanguages("afghanistan", ["en"]);

		expect(result).toEqual([]);
		expect(console.error).toHaveBeenCalledWith(
			expect.stringContaining("afghanistansubtitles-en.vtt"),
		);
	});

	it("excludes declared languages when the existence check throws and logs why", async () => {
		global.fetch = jest.fn().mockRejectedValue(new Error("network error"));

		const result = await findAvailableSubtitleLanguages("afghanistan", ["en"]);

		expect(result).toEqual([]);
		expect(console.error).toHaveBeenCalledWith(
			expect.stringContaining("network error"),
		);
	});
});
