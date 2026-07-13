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
