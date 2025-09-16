import { isClientSide } from "../../utils/isClientSide";
import {
	insecureRestrictionKey,
	travelVideoMetaData,
} from "../datasources/TravelMetaData";
import { Advisory, TravelVideoMetaData } from "./types";

export const enhancedTravelVideoMetaData = () => {
	if (!isClientSide()) return travelVideoMetaData;

	const watchedVideos = JSON.parse(
		localStorage.getItem("watchedVideos") || "[]",
	) as string[];

	const enhancedMetaData = travelVideoMetaData.map((item) => ({
		...item,
		previouslyWatched: watchedVideos.includes(item.link),
	}));

	return enhancedMetaData;
};

export const hasRestrictionBypass = () => {
	if (isClientSide()) {
		return localStorage.getItem("restriction-bypass") === "true";
	}
	return false;
};

export const videoEnabled = (videoMetaData: TravelVideoMetaData) => {
	if (!isClientSide()) {
		return false;
	}

	if (hasRestrictionBypass() || !videoMetaData.restricted) {
		return true;
	} else {
		const prompt = window.prompt(
			"This video is restricted \nEnter the password to unlock all content:",
			"",
		);

		if (prompt === insecureRestrictionKey) {
			localStorage.setItem("restriction-bypass", "true");
			window.location.reload();
		} else {
			window.alert("Password Incorrect");
		}
	}
};

export const addToWatchedVideosStorage = (link: string) => {
	if (!isClientSide()) return false;

	const watchedVideos = JSON.parse(
		localStorage.getItem("watchedVideos") || "[]",
	) as string[];

	if (!watchedVideos.includes(link)) {
		watchedVideos.push(link);
		localStorage.setItem("watchedVideos", JSON.stringify(watchedVideos));
	}

	if (watchedVideos.length >= travelVideoMetaData.length) {
		localStorage.removeItem("watchedVideos");
	}
};

export const getTravelMetaDataIndex = (
	link: string,
	metaData: TravelVideoMetaData[] = travelVideoMetaData,
): number => {
	return metaData.findIndex((item) => item.link === link);
};

export function allCountriesList() {
	const countries: string[] = [];

	enhancedTravelVideoMetaData().forEach((video) => {
		if (video.extras && video.extras.countries) {
			video.extras.countries.forEach((country) => {
				if (!countries.includes(country)) {
					countries.push(country);
				}
			});
		}
	});

	return countries;
}

export const countTotalCountries = () => {
	let totalCountries = 0;

	travelVideoMetaData.forEach((video) => {
		if (video.extras && video.extras.countries) {
			totalCountries += video.extras.countries.length;

			if (video.extras?.deductCountryCount) {
				totalCountries -= video.extras?.deductCountryCount;
			}
		}
	});

	return totalCountries;
};

// ~~~~~~~~~~~~~~~~
// Premixed Filters:
// ~~~~~~~~~~~~~~~~

export const allNewestFirst = () => {
	const groupedVideos: { [year: number]: TravelVideoMetaData[] } = {};

	for (const video of enhancedTravelVideoMetaData()) {
		const year = video.year;

		if (!groupedVideos[year]) {
			groupedVideos[year] = [];
		}
		groupedVideos[year].push(video);
	}

	const result = Object.entries(groupedVideos).map(([year, grouping]) => ({
		heading: year,
		grouping: grouping,
	}));

	return result.reverse();
};

export const allOldestFirst = () => {
	return allNewestFirst().reverse();
};

export const allByBest = () => {
	const tierGroups: { heading: string; grouping: TravelVideoMetaData[] }[] = [];

	const tierRanges: { heading: string; range: number[] }[] = [
		{ heading: "🥇 S Tier", range: [9, 10] },
		{ heading: "🥈 A Tier", range: [7, 8] },
		{ heading: "🥉 B Tier", range: [5, 6] },
		{ heading: "C Tier", range: [3, 4] },
		{ heading: "💩 F Tier", range: [1, 2] },
	];

	for (const tier of tierRanges) {
		const grouping: TravelVideoMetaData[] = [];

		for (const video of enhancedTravelVideoMetaData()) {
			const finalScore = video.extras?.finalScore;

			if (finalScore == null) {
				continue;
			}

			if (tier.range.includes(finalScore)) {
				grouping.push(video);
			}
		}

		if (grouping.length > 0) {
			tierGroups.push({ heading: tier.heading, grouping });
		}
	}

	return tierGroups;
};

export const allByWorst = () => {
	return allByBest().reverse();
};

export const allByFood = () => {
	const foodScoreGroups: {
		heading: string;
		grouping: TravelVideoMetaData[];
	}[] = [];

	const foodScoreRanges: { heading: string; range: number[] }[] = [
		{ heading: "Delicious", range: [9, 10] },
		{ heading: "Tasty", range: [5, 6, 7, 8] },
		{ heading: "Edible", range: [3, 4] },
		{ heading: "Disgusting", range: [1, 2] },
	];

	for (const scoreRange of foodScoreRanges) {
		const grouping: TravelVideoMetaData[] = [];

		for (const video of enhancedTravelVideoMetaData()) {
			const foodScores = video.extras?.scorecard?.food;

			if (!foodScores || foodScores.length === 0) {
				continue;
			}

			const averageFoodScore =
				foodScores.reduce((sum, score) => sum + score, 0) / foodScores.length;

			if (scoreRange.range.includes(Math.round(averageFoodScore))) {
				grouping.push(video);
			}
		}

		if (grouping.length > 0) {
			foodScoreGroups.push({ heading: scoreRange.heading, grouping });
		}
	}

	return foodScoreGroups;
};

export const allByDanger = () => {
	const advisoryGroups: { heading: string; grouping: TravelVideoMetaData[] }[] =
		[];

	const advisoryLevels: { heading: string; level: Advisory }[] = [
		{ heading: "Super Safe", level: Advisory.Level1 },
		{ heading: "Safe", level: Advisory.Level2 },
		{ heading: "Be Alert", level: Advisory.Level3 },
		{ heading: "Dangerous", level: Advisory.Level4 },
	];

	for (const advisory of advisoryLevels) {
		const grouping: TravelVideoMetaData[] = [];

		for (const video of enhancedTravelVideoMetaData()) {
			const advice = video.extras?.travelAdvisory?.advice;

			if (advice === advisory.level) {
				grouping.push(video);
			}
		}

		if (grouping.length > 0) {
			advisoryGroups.push({ heading: advisory.heading, grouping });
		}
	}

	return advisoryGroups;
};

export const funniestOnly = () => {
	const videoScoreGroups: {
		heading: string;
		grouping: TravelVideoMetaData[];
	}[] = [];

	const topHitsRange = { heading: "Bangers", range: [9, 10] };

	const grouping: TravelVideoMetaData[] = [];

	for (const video of enhancedTravelVideoMetaData()) {
		const videoScores = video.extras?.scorecard?.video;

		if (!videoScores || videoScores.length === 0) {
			continue;
		}

		const averageVideoScore =
			videoScores.reduce((sum, score) => sum + score, 0) / videoScores.length;
		const roundedAverageVideoScore = Math.round(averageVideoScore);

		if (topHitsRange.range.includes(roundedAverageVideoScore)) {
			grouping.push(video);
		}
	}

	if (grouping.length > 0) {
		videoScoreGroups.push({ heading: topHitsRange.heading, grouping });
	}

	return videoScoreGroups;
};

export const searchResult = (searchTerm: string) => {
	const results: { heading: string; grouping: TravelVideoMetaData[] }[] = [
		{ heading: "Countries", grouping: [] },
		{ heading: "Music", grouping: [] },
		{ heading: "Tags", grouping: [] },
		{ heading: "Misc.", grouping: [] },
	];

	if (!searchTerm) {
		return results.filter((result) => result.grouping.length > 0);
	}

	const lowerSearchTerm = searchTerm.toLowerCase();

	enhancedTravelVideoMetaData().forEach((video) => {
		let matched = false;

		if (video.extras?.countries) {
			for (const country of video.extras.countries) {
				if (country.toLowerCase().includes(lowerSearchTerm)) {
					results[0].grouping.push(video);
					matched = true;
					break;
				}
			}
		}

		if (!matched && video.extras?.music) {
			for (const music of video.extras.music) {
				if (
					music.title.toLowerCase().includes(lowerSearchTerm) ||
					music.link.toLowerCase().includes(lowerSearchTerm)
				) {
					results[1].grouping.push(video);
					matched = true;
					break;
				}
			}
		}

		if (!matched && video.extras?.tags) {
			for (const tag of video.extras.tags) {
				if (tag.toLowerCase().includes(lowerSearchTerm)) {
					results[2].grouping.push(video);
					matched = true;
					break;
				}
			}
		}

		if (
			!matched &&
			JSON.stringify(video).toLowerCase().includes(lowerSearchTerm)
		) {
			results[3].grouping.push(video);
		}
	});

	return results.filter((result) => result.grouping.length > 0);
};
