import fs from "fs";
import path from "path";
import { geoPath, geoTransform } from "d3-geo";
import { feature, mesh } from "topojson-client";
import { presimplify, quantile, simplify } from "topojson-simplify";
import type { FeatureCollection, Geometry } from "geojson";
import type { Topology, GeometryCollection } from "topojson-specification";

const SIMPLIFY_QUANTILE = 0.05;
const WORLD_WIDTH = 1000;
const UNITS_PER_DEGREE = WORLD_WIDTH / 360;

const pacificShift = {
	lonMin: -177.5,
	lonMax: -125,
	latMin: -40,
	latMax: 45,
	targetLon: -100,
	closerFactor: 0.35,
	lowerDegrees: 21,
};

const shiftLonLat = (lon: number, lat: number): [number, number] => {
	const {
		lonMin,
		lonMax,
		latMin,
		latMax,
		targetLon,
		closerFactor,
		lowerDegrees,
	} = pacificShift;
	if (lon < lonMin || lon > lonMax || lat < latMin || lat > latMax) {
		return [lon, lat];
	}
	return [lon + closerFactor * (targetLon - lon), lat - lowerDegrees];
};

const world = require("world-atlas/countries-50m.json") as Topology<{
	countries: GeometryCollection<{ name: string }>;
}>;

const weighted = presimplify(world);
const simplified = simplify(weighted, quantile(weighted, SIMPLIFY_QUANTILE));

for (const arc of simplified.arcs) {
	for (const point of arc) {
		const [lon, lat] = shiftLonLat(point[0], point[1]);
		point[0] = lon;
		point[1] = lat;
	}
}

const allCountries = simplified.objects
	.countries as GeometryCollection<{ name: string }>;

const countriesObject = {
	...allCountries,
	geometries: allCountries.geometries.filter(
		(geometry) =>
			(geometry.properties as { name: string }).name !== "Antarctica",
	),
};

const ringsOfGeometry = (geometry: (typeof countriesObject.geometries)[0]) => {
	if (geometry.type === "Polygon") {
		return geometry.arcs;
	}
	if (geometry.type === "MultiPolygon") {
		return geometry.arcs.flat(1);
	}
	return [];
};

const arcIndex = (ringArc: number) => (ringArc < 0 ? ~ringArc : ringArc);

const ringPoints = (ring: number[]) =>
	ring.flatMap((ringArc) => simplified.arcs[arcIndex(ringArc)]);

const unwrappedArcs = new Set<number>();
const unwrapRing = (ring: number[]) => {
	for (const ringArc of ring) {
		const index = arcIndex(ringArc);
		if (unwrappedArcs.has(index)) continue;
		unwrappedArcs.add(index);
		for (const point of simplified.arcs[index]) {
			if (point[0] < -30) {
				point[0] += 360;
			}
		}
	}
};

const seamJoinCountries = new Set([
	"Russia",
	"Fiji",
	"New Zealand",
	"Wallis and Futuna Is.",
]);

for (const geometry of countriesObject.geometries) {
	const joinsSeam = seamJoinCountries.has(
		(geometry.properties as { name: string }).name,
	);
	for (const ring of ringsOfGeometry(geometry)) {
		const lons = ringPoints(ring).map((point) => point[0]);
		const crossesSeam =
			lons.some((lon) => lon > 170) && lons.some((lon) => lon < -170);
		const westFragment = joinsSeam && lons.every((lon) => lon < -168);
		if (crossesSeam || westFragment) {
			unwrapRing(ring);
		}
	}
}

const isFarWestSpeck = (ring: number[]) =>
	ringPoints(ring).every(
		([lon, lat]) => lon >= -180 && lon <= -172 && lat > 45,
	);

for (const geometry of countriesObject.geometries) {
	if (geometry.type === "MultiPolygon") {
		geometry.arcs = geometry.arcs.filter(
			(polygon) => !isFarWestSpeck(polygon[0]),
		);
	}
}

let latMax = -Infinity;
let latMin = Infinity;
const usedArcs = new Set<number>();
for (const geometry of countriesObject.geometries) {
	for (const ring of ringsOfGeometry(geometry)) {
		for (const ringArc of ring) {
			usedArcs.add(arcIndex(ringArc));
		}
	}
}
for (const index of usedArcs) {
	for (const point of simplified.arcs[index]) {
		latMax = Math.max(latMax, point[1]);
		latMin = Math.min(latMin, point[1]);
	}
}

const projectPoint = (lon: number, lat: number): [number, number] => [
	(lon + 180) * UNITS_PER_DEGREE,
	(latMax - lat) * UNITS_PER_DEGREE,
];

const projection = geoTransform({
	point(lon, lat) {
		const [x, y] = projectPoint(lon, lat);
		this.stream.point(x, y);
	},
});
const pathGenerator = geoPath(projection);

const countriesCollection = feature(
	simplified,
	countriesObject,
) as FeatureCollection<Geometry, { name: string }>;

const roundPath = (d: string | null) =>
	(d ?? "").replace(/\d+\.\d+/g, (value) => {
		const rounded = Number(value).toFixed(1);
		return rounded.endsWith(".0") ? rounded.slice(0, -2) : rounded;
	});

const [[minX], [maxX, maxY]] = pathGenerator.bounds(countriesCollection);

const checkpoints = [
	[0, 0],
	[135.0, 35.0],
	[178.44, -18.14],
	[44.01, 36.19],
	[73.51, 4.18],
	[174.78, -41.29],
	[-157.86, 21.31],
	[-149.57, -17.54],
].map((lonLat) => ({
	lonLat,
	xy: projectPoint(...shiftLonLat(lonLat[0], lonLat[1])).map((value) =>
		Number(value.toFixed(4)),
	),
}));

const geometry = {
	viewBox: {
		x: Number(minX.toFixed(1)),
		width: Number((maxX - minX).toFixed(1)),
		height: Number(maxY.toFixed(1)),
	},
	projection: {
		scale: UNITS_PER_DEGREE,
		translateX: 180 * UNITS_PER_DEGREE,
		translateY: Number((latMax * UNITS_PER_DEGREE).toFixed(6)),
	},
	pacificShift,
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
	`Wrote worldMapGeometry.json: ${geometry.countries.length} countries, viewBox ${geometry.viewBox.x} 0 ${geometry.viewBox.width}x${geometry.viewBox.height}`,
);
