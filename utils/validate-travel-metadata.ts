import worldAtlas from "world-atlas/countries-50m.json";
import { travelVideoMetaData } from "../src/datasources/TravelMetaData";

type CountryTopology = {
	objects: {
		countries: {
			geometries: { id: string | number }[];
		};
	};
};

const countryTopology = worldAtlas as unknown as CountryTopology;
const mapCountryIds = new Set(
	countryTopology.objects.countries.geometries.map((country) => Number(country.id)),
);
const errors: string[] = [];

travelVideoMetaData.forEach((video) => {
	const countries = video.extras?.countries ?? [];
	countries.forEach((country) => {
		if (!mapCountryIds.has(country.id)) {
			errors.push(`${video.link}: ${country.name} has no matching map feature for ID ${country.id}`);
		}
	});

	const scorecard = video.extras?.scorecard;
	if (!scorecard) return;
	if (countries.length === 0) {
		errors.push(`${video.link}: scorecard has no countries`);
		return;
	}

	Object.entries(scorecard).forEach(([category, scores]) => {
		if (scores.length !== countries.length) {
			errors.push(
				`${video.link}: ${category} has ${scores.length} scores for ${countries.length} countries`,
			);
		}
	});
});

if (errors.length > 0) {
	console.error("Travel metadata validation failed:");
	errors.forEach((error) => console.error(`- ${error}`));
	process.exitCode = 1;
} else {
	console.log(`Validated country IDs and score ordering in ${travelVideoMetaData.length} travel records.`);
}
