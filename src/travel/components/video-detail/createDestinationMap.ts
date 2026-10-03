import type { Feature, FeatureCollection, Geometry, Point } from "geojson";
import { geoBounds, geoCentroid } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import {
	AttributionControl,
	Map,
	setWorkerUrl,
	type FilterSpecification,
} from "maplibre-gl";
import worldAtlas from "world-atlas/countries-50m.json";
import type { TravelCountry } from "../../types";

type CountryProperties = { name: string };
type DestinationProperties = { name: string };
type DotProperties = Record<string, never>;

const topology = worldAtlas as unknown as Topology;
const countryFeatures = feature(topology, topology.objects.countries) as FeatureCollection<
	Geometry,
	CountryProperties
>;
const countryId = (value: number | string) => String(value).padStart(3, "0");
const englishName: [
	"case",
	["has", string],
	["get", string],
	["has", string],
	["get", string],
	["has", string],
	["get", string],
	["get", string],
] = [
	"case",
	["has", "name:en"],
	["get", "name:en"],
	["has", "name_en"],
	["get", "name_en"],
	["has", "name:latin"],
	["get", "name:latin"],
	["get", "name"],
];

export const createDestinationMap = (
	container: HTMLDivElement,
	countries: TravelCountry[],
	dotCoordinates: string[] = [],
) => {
	setWorkerUrl("/travel-map/maplibre-gl-worker.mjs");
	const ids = new Set(countries.map(({ id }) => countryId(id)));
	const countryNames = new globalThis.Map(
		countries.map(({ id, name }) => [countryId(id), name]),
	);
	const selectedNames = countries.map(({ name }) => name);
	const features = countryFeatures.features.filter((entry) =>
		ids.has(countryId(entry.id ?? "")),
	);
	if (!features.length) return;
	const destinations: FeatureCollection<Geometry, DestinationProperties> = {
		type: "FeatureCollection",
		features: features.map((entry) => ({
			type: "Feature",
			id: entry.id,
			geometry: entry.geometry,
			properties: {
				name:
					countryNames.get(countryId(entry.id ?? "")) ??
					entry.properties?.name ??
					"",
			},
		})),
	};
	const labels: Feature<Point, DestinationProperties>[] = features.map((entry) => {
		const [longitude, latitude] = geoCentroid(entry);
		return {
			type: "Feature",
			geometry: { type: "Point", coordinates: [longitude, latitude] },
			properties: {
				name:
					countryNames.get(countryId(entry.id ?? "")) ??
					entry.properties?.name ??
					"",
			},
		};
	});
	const dots: Feature<Point, DotProperties>[] = dotCoordinates.flatMap((coordinate) => {
		const values = coordinate.split(",").map((value) => Number(value.trim()));
		if (
			values.length !== 2 ||
			!Number.isFinite(values[0]) ||
			!Number.isFinite(values[1]) ||
			Math.abs(values[0]) > 90 ||
			Math.abs(values[1]) > 180
		) {
			return [];
		}
		return [
			{
				type: "Feature",
				geometry: { type: "Point", coordinates: [values[1], values[0]] },
				properties: {},
			},
		];
	});
	const bounds = geoBounds(destinations);
	const map = new Map({
		container,
		style: "https://tiles.openfreemap.org/styles/dark",
		attributionControl: false,
		maxZoom: 8,
		minZoom: 1,
		cooperativeGestures: true,
	});
	map.addControl(new AttributionControl({ compact: true }), "bottom-right");

	map.once("style.load", () => {
		for (const layer of map.getStyle().layers) {
			if (layer.id === "background") {
				map.setPaintProperty(layer.id, "background-color", "#212121");
			}
			if (layer.type === "fill" && layer.id !== "water") {
				map.setPaintProperty(layer.id, "fill-color", "#212121");
				if (layer.id === "landcover_wood") {
					map.setPaintProperty(layer.id, "fill-opacity", 0);
				}
			}
			if (layer.type === "fill" && layer.id === "water") {
				map.setPaintProperty(layer.id, "fill-color", "#13181c");
			}
			if (layer.id === "boundary_state") {
				map.setLayoutProperty(layer.id, "visibility", "none");
			}
			if (layer.type === "symbol") {
				if (!layer.id.startsWith("place_country_")) {
					map.setLayoutProperty(layer.id, "visibility", "none");
					continue;
				}
				const countryLabelFilter = [
					"all",
					layer.filter ?? ["==", ["get", "class"], "country"],
					[
						"!",
						[
							"in",
							[
								"coalesce",
								["get", "name:en"],
								["get", "name_en"],
								["get", "name"],
							],
							["literal", selectedNames],
						],
					],
				] as FilterSpecification;
				map.setFilter(layer.id, countryLabelFilter);
				const textField = JSON.stringify(layer.layout?.["text-field"] ?? "");
				if (textField.includes("name:nonlatin")) {
					map.setLayoutProperty(layer.id, "text-field", englishName);
				}
			}
			if (layer.id.startsWith("boundary_country_")) {
				map.setFilter(layer.id, [
					"all",
					["==", ["get", "admin_level"], 2],
					["!=", ["get", "maritime"], 1],
				]);
			}
		}

		map.addSource("travel-destinations", {
			type: "geojson",
			data: destinations,
		});
		map.addLayer({
			id: "travel-destination-fill",
			type: "fill",
			source: "travel-destinations",
			paint: {
				"fill-color": "#ffffff",
				"fill-opacity": 0.12,
			},
		});
		map.addLayer({
			id: "travel-destination-border",
			type: "line",
			source: "travel-destinations",
			paint: {
				"line-color": "#ffffff",
				"line-width": ["interpolate", ["linear"], ["zoom"], 2, 1, 7, 2.5],
				"line-opacity": 0.95,
			},
		});
		if (dots.length) {
			map.addSource("travel-destination-dots", {
				type: "geojson",
				data: { type: "FeatureCollection", features: dots },
			});
			map.addLayer({
				id: "travel-destination-dot-glow",
				type: "circle",
				source: "travel-destination-dots",
				paint: {
					"circle-radius": 8,
					"circle-color": "#ffeb3b",
					"circle-blur": 0.8,
					"circle-opacity": 0.24,
				},
			});
			map.addLayer({
				id: "travel-destination-dots",
				type: "circle",
				source: "travel-destination-dots",
				paint: {
					"circle-radius": 4.32,
					"circle-color": "#ffeb3b",
					"circle-stroke-color": "rgba(0, 0, 0, 0.65)",
					"circle-stroke-width": 0.5,
				},
			});
		}
		map.addSource("travel-destination-labels", {
			type: "geojson",
			data: { type: "FeatureCollection", features: labels },
		});
		map.addLayer({
			id: "travel-destination-labels",
			type: "symbol",
			source: "travel-destination-labels",
			layout: {
				"text-field": ["get", "name"],
				"text-font": ["Noto Sans Bold"],
				"text-size": ["interpolate", ["linear"], ["zoom"], 2, 10, 6, 14],
				"text-letter-spacing": 0.08,
				"text-transform": "uppercase",
				"text-allow-overlap": true,
			},
			paint: {
				"text-color": "#ffffff",
				"text-halo-color": "rgba(0, 0, 0, 0.8)",
				"text-halo-width": 1.5,
			},
		});
		const [[west, south], [east, north]] = bounds;
		const longitudePadding = Math.max((east - west) * 0.075, 0.15);
		const latitudePadding = Math.max((north - south) * 0.075, 0.15);
		map.fitBounds(
			[
				[west - longitudePadding, Math.max(-84, south - latitudePadding)],
				[east + longitudePadding, Math.min(84, north + latitudePadding)],
			],
			{ padding: 24, duration: 0, maxZoom: 7.5 },
		);
	});

	return map;
};
