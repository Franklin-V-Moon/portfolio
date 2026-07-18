import geometry from "../../generated/worldMapGeometry.json";
import { travelVideoMetaData } from "../../datasources/TravelMetaData";
import { projectToMap } from "./projection";
import { allMapPins } from "./mapDataService";

describe("allMapPins", () => {
	const pins = allMapPins();

	it("derives one pin per visited place across all trips", () => {
		const expectedCount = travelVideoMetaData.reduce(
			(sum, trip) => sum + (trip.extras?.countries?.length ?? 0),
			0,
		);

		expect(pins.length).toBe(expectedCount);
	});

	it("gives every trip with countries a matching number of pins", () => {
		for (const trip of travelVideoMetaData) {
			if (!trip.extras?.countries) continue;

			expect({
				trip: trip.title,
				pins: trip.extras.mapLocations?.length,
			}).toEqual({
				trip: trip.title,
				pins: trip.extras.countries.length,
			});
		}
	});

	it("resolves every countryId to a country in the generated geometry", () => {
		const geometryNames = new Set(
			geometry.countries.map((country) => country.name),
		);

		for (const pin of pins) {
			expect({ place: pin.place, found: geometryNames.has(pin.countryId) })
				.toEqual({ place: pin.place, found: true });
		}
	});

	it("projects every pin inside the map viewBox", () => {
		for (const pin of pins) {
			const [x, y] = projectToMap(pin.coordinates[0], pin.coordinates[1]);

			expect(x).toBeGreaterThan(geometry.viewBox.x);
			expect(x).toBeLessThan(geometry.viewBox.x + geometry.viewBox.width);
			expect(y).toBeGreaterThan(0);
			expect(y).toBeLessThan(geometry.viewBox.height);
		}
	});

	it("carries the trip trailer and link on each pin", () => {
		const erbil = pins.find((pin) => pin.place === "Erbil");

		expect(erbil).toMatchObject({
			countryId: "Iraq",
			tripLink: "kuwait-iraqi-kurdistan",
			trailer: "kuwaitiraqikurdistantrailer",
		});
	});

	it("keeps repeat visits as separate pins", () => {
		const chinaPins = pins.filter((pin) => pin.countryId === "China");

		expect(chinaPins.map((pin) => pin.place).sort()).toEqual([
			"Beijing",
			"Guangzhou",
		]);
	});
});
