import { geoPath, geoProjection } from "d3-geo";
import { feature } from "topojson-client";
import type { FeatureCollection, MultiPolygon, Polygon } from "geojson";
import type { GeometryCollection, Topology } from "topojson-specification";
import worldAtlas from "world-atlas/countries-110m.json";
import styles from "./WorldMap.module.scss";

const millerRaw = (longitude: number, latitude: number): [number, number] => [
	longitude,
	1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * latitude)),
];

const topology = worldAtlas as unknown as Topology;
const countriesObject = topology.objects.countries as GeometryCollection;
const countries = feature(topology, {
	...countriesObject,
	geometries: countriesObject.geometries.filter(
		(country) => String(country.id).padStart(3, "0") !== "010",
	),
}) as FeatureCollection<Polygon | MultiPolygon>;

const WorldMapBackground = () => {
	const projection = geoProjection(millerRaw)
		.rotate([-12, 0])
		.fitExtent([[12, 12], [1188, 578]], countries);
	const path = geoPath(projection);

	return (
		<svg className={styles.backgroundMap} viewBox='0 0 1200 590' aria-hidden='true'>
			<path d={countries.features.map((country) => path(country) ?? "").join("")} />
		</svg>
	);
};

export default WorldMapBackground;
