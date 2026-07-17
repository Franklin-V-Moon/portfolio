import { buildVideoJsonLd, secondsToISO } from "./videoJsonLd";
import { TravelVideoMetaData } from "./types";

describe("secondsToISO", () => {
	it("formats hours, minutes, and seconds", () => {
		expect(secondsToISO(3725)).toBe("PT1H2M5S");
	});

	it("omits zero-value hour and minute segments", () => {
		expect(secondsToISO(45)).toBe("PT45S");
	});

	it("falls back to 0S when the duration rounds down to zero", () => {
		expect(secondsToISO(0)).toBe("PT0S");
	});
});

describe("buildVideoJsonLd", () => {
	const metaData: TravelVideoMetaData = {
		title: "Japan",
		year: 2023,
		hostedLink: "japan-2023",
		link: "japan-2023",
		restricted: false,
	};

	it("falls back to a generated description when no summary is present", () => {
		const { description } = buildVideoJsonLd({ metaData });

		expect(description).toBe("Japan — travel video from 2023.");
	});

	it("uses the first summary sentence as the description when present", () => {
		const { description } = buildVideoJsonLd({
			metaData: {
				...metaData,
				extras: { summary: ["A trip through Tokyo and Kyoto."] },
			},
		});

		expect(description).toBe("A trip through Tokyo and Kyoto.");
	});

	it("omits duration from the jsonLd when durationISO is not provided", () => {
		const { jsonLd } = buildVideoJsonLd({ metaData });

		expect(jsonLd).not.toHaveProperty("duration");
	});

	it("includes duration in the jsonLd when durationISO is provided", () => {
		const { jsonLd } = buildVideoJsonLd({
			metaData,
			durationISO: "PT10M30S",
		});

		expect(jsonLd.duration).toBe("PT10M30S");
	});

	it("builds the page url and content url from the video link and hosted link", () => {
		const { pageUrl, jsonLd } = buildVideoJsonLd({ metaData });

		expect(pageUrl).toBe("https://franklin-v-moon.dev/travel/japan-2023");
		expect(jsonLd.embedUrl).toBe(
			"https://franklin-v-moon.dev/travel/japan-2023#player",
		);
		expect(jsonLd.contentUrl).toContain("japan-2023.mp4");
	});
});
