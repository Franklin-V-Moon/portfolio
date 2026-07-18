import fs from "fs";
import path from "path";
import { geoEqualEarth, geoPath } from "d3-geo";
import { feature, mesh } from "topojson-client";
import { presimplify, quantile, simplify } from "topojson-simplify";
import type { FeatureCollection, Geometry } from "geojson";
import type { Topology, GeometryCollection } from "topojson-specification";

const SIMPLIFY_QUANTILE = 0.05;
const VIEWBOX_WIDTH = 1000;

const world = require("world-atlas/countries-50m.json") as Topology<{
	countries: GeometryCollection<{ name: string }>;
}>;

const weighted = presimplify(world);
const simplified = simplify(weighted, quantile(weighted, SIMPLIFY_QUANTILE));
const allCountries = simplified.objects
	.countries as GeometryCollection<{ name: string }>;

const countriesObject = {
	...allCountries,
	geometries: allCountries.geometries.filter(
		(geometry) =>
			(geometry.properties as { name: string }).name !== "Antarctica",
	),
};

const countriesCollection = feature(
	simplified,
	countriesObject,
) as FeatureCollection<Geometry, { name: string }>;

const projection = geoEqualEarth().fitWidth(VIEWBOX_WIDTH, countriesCollection);
const pathGenerator = geoPath(projection);

const roundPath = (d: string | null) =>
	(d ?? "").replace(/\d+\.\d+/g, (value) => {
		const rounded = Number(value).toFixed(1);
		return rounded.endsWith(".0") ? rounded.slice(0, -2) : rounded;
	});

const [, [, maxY]] = pathGenerator.bounds(countriesCollection);

const checkpoints = [
	[0, 0],
	[135.0, 35.0],
	[178.44, -18.14],
	[44.01, 36.19],
	[73.51, 4.18],
	[174.78, -41.29],
].map((lonLat) => ({
	lonLat,
	xy: (projection(lonLat as [number, number]) as [number, number]).map(
		(value) => Number(value.toFixed(4)),
	),
}));

const geometry = {
	viewBox: {
		width: VIEWBOX_WIDTH,
		height: Number(maxY.toFixed(1)),
	},
	projection: {
		scale: Number(projection.scale().toFixed(6)),
		translateX: Number(projection.translate()[0].toFixed(6)),
		translateY: Number(projection.translate()[1].toFixed(6)),
	},
	checkpoints,
	countries: countriesCollection.features.map((countryFeature) => ({
		name: countryFeature.properties.name,
		d: roundPath(pathGenerator(countryFeature)),
	})),
	borders: roundPath(
		pathGenerator(mesh(simplified, countriesObject, (a, b) => a !== b)),
	),
	coastline: roundPath(
		pathGenerator(mesh(simplified, countriesObject, (a, b) => a === b)),
	),
};

const outputPath = path.join(__dirname, "..", "src", "generated");
fs.mkdirSync(outputPath, { recursive: true });
fs.writeFileSync(
	path.join(outputPath, "worldMapGeometry.json"),
	JSON.stringify(geometry),
);

console.log(
	`Wrote worldMapGeometry.json: ${geometry.countries.length} countries, viewBox ${geometry.viewBox.width}x${geometry.viewBox.height}`,
);
