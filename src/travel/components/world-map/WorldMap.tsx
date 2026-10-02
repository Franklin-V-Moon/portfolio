import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { geoContains, geoPath, geoProjection } from "d3-geo";
import { select } from "d3-selection";
import { zoom, zoomTransform } from "d3-zoom";
import type { ZoomBehavior } from "d3-zoom";
import { feature, mesh } from "topojson-client";
import type { Feature, FeatureCollection, MultiPolygon, Polygon } from "geojson";
import type {
	GeometryCollection as TopologyGeometryCollection,
	GeometryObject as TopologyGeometryObject,
	Topology,
} from "topojson-specification";
import worldAtlas from "world-atlas/countries-50m.json";
import worldLandAtlas from "world-atlas/land-110m.json";
import { publicCDNVideoUrl, travelVideoMetaData } from "../../../datasources/TravelMetaData";
import { usePrefersReducedMotion } from "../../../../utils/usePrefersReducedMotion";
import styles from "./WorldMap.module.scss";

type CountryProperties = { name: string };
type CountryFeature = Feature<Polygon | MultiPolygon, CountryProperties>;
type CountryId = number;
type WorldDot = {
	id: string;
	latitude: number;
	longitude: number;
	countryId: CountryId;
	country: string;
	trailer?: string;
	travelLink?: string;
};

const getFeatureId = (country: CountryFeature) => String(country.id).padStart(3, "0");
const millerRaw = (longitude: number, latitude: number): [number, number] => [
	longitude,
	1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * latitude)),
];

const parseCoordinate = (coordinate: string) => {
	const values = coordinate.split(",").map((value) => value.trim());
	if (values.length !== 2 || !values[0] || !values[1]) return undefined;
	const [latitude, longitude] = values.map(Number);
	if (
		!Number.isFinite(latitude) ||
		!Number.isFinite(longitude) ||
		Math.abs(latitude) > 90 ||
		Math.abs(longitude) > 180
	) {
		return undefined;
	}
	return { latitude, longitude };
};

const findLatestVideo = (countryId: CountryId) =>
	travelVideoMetaData
		.filter((video) =>
			video.extras?.countries?.some((country) => country.id === countryId),
		)
		.sort((first, second) => second.year - first.year)[0];

const countryTopology = worldAtlas as unknown as Topology;
const sourceCountries = countryTopology.objects.countries as TopologyGeometryCollection;
const landTopology = {
	...countryTopology,
	objects: {
		...countryTopology.objects,
		countries: {
			...sourceCountries,
			geometries: sourceCountries.geometries.filter(
				(country) => String(country.id).padStart(3, "0") !== "010",
			),
		},
	},
} as Topology;
const countriesObject = landTopology.objects.countries;
const countries = feature(landTopology, countriesObject) as FeatureCollection<
	Polygon | MultiPolygon,
	CountryProperties
>;
const meshCountries = countriesObject as unknown as TopologyGeometryObject;
const countryBorders = mesh(landTopology, meshCountries, (first, second) => first !== second);
const landOutline = mesh(landTopology, meshCountries, (first, second) => first === second);
const coarseLandTopology = worldLandAtlas as unknown as Topology;
const coarseLand = feature(
	coarseLandTopology,
	coarseLandTopology.objects.land as TopologyGeometryObject,
) as Feature<Polygon | MultiPolygon>;

const buildDots = (): WorldDot[] => {
	const mapDots: WorldDot[] = [];
	travelVideoMetaData.forEach((video) => {
		const sourceCountries = video.extras?.countries ?? [];
		const coordinates = video.extras?.dots ?? [];
		if (!coordinates.length || !sourceCountries.length) return;

		const candidates = sourceCountries;

		coordinates.forEach((coordinate, index) => {
			const parsed = parseCoordinate(coordinate);
			if (!parsed) return;
			const containingCountry = candidates.find((candidate) => {
				const countryFeature = countries.features.find(
					(entry) => getFeatureId(entry) === String(candidate.id).padStart(3, "0"),
				);
				return countryFeature && geoContains(countryFeature, [parsed.longitude, parsed.latitude]);
			});
			const assignedCountry = containingCountry ?? candidates[0];
			if (!assignedCountry) return;
			const latestVideo = findLatestVideo(assignedCountry.id);
			mapDots.push({
				id: `${video.link}-${index}`,
				...parsed,
				countryId: assignedCountry.id,
				country: assignedCountry.name,
				trailer: latestVideo?.extras?.trailer,
				travelLink:
					latestVideo?.hostedLink && latestVideo.backupLink
						? latestVideo.link
						: undefined,
			});
		});
	});
	return mapDots;
};

const dots = buildDots();

const WorldMap = ({
	onDotClick,
	onCountrySelectionChange,
	onRandomDotSelection,
}: {
	onDotClick?: (countryId: CountryId) => void;
	onCountrySelectionChange?: (countryId: CountryId | null) => void;
	onRandomDotSelection?: () => void;
}) => {
	const prefersReducedMotion = usePrefersReducedMotion();
	const [selectedCountry, setSelectedCountry] = useState<WorldDot | null>(null);
	const [selectedDotId, setSelectedDotId] = useState<string | null>(null);
	const [activeVideoSource, setActiveVideoSource] = useState<string | null>(null);
	const [warmVideoSources, setWarmVideoSources] = useState<string[]>([]);
	const [videoReady, setVideoReady] = useState(false);
	const [videoFadingOut, setVideoFadingOut] = useState(false);
	const [countryTitle, setCountryTitle] = useState("");
	const [outgoingTitle, setOutgoingTitle] = useState("");
	const idleSelectionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const selectDotRef = useRef<(dot: WorldDot) => void>(() => {});
	const lockedDotIdRef = useRef<string | null>(null);
	const hoveredDotRef = useRef<WorldDot | null>(null);
	const mapSvgRef = useRef<SVGSVGElement | null>(null);
	const mapContentRef = useRef<SVGGElement | null>(null);
	const frostedLandRef = useRef<HTMLDivElement | null>(null);
	const dotLayerRef = useRef<SVGGElement | null>(null);
	const videoRefs = useRef(new Map<string, HTMLVideoElement>());
	const activeVideoSourceRef = useRef<string | null>(null);
	const pendingVideoSourceRef = useRef<string | null>(null);
	const zoomBehaviorRef = useRef<ZoomBehavior<SVGSVGElement, unknown> | null>(null);
	const videoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const titleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const projection = useMemo(
		() => geoProjection(millerRaw).rotate([-12, 0]).fitExtent([[12, 12], [1188, 578]], countries),
		[],
	);
	const path = useMemo(() => geoPath(projection), [projection]);
	const landMaskImage = useMemo(() => {
		const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 590"><path fill="white" d="${path(coarseLand) ?? ""}"/></svg>`;
		return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
	}, [path]);
	const selectedCountryFeature = countries.features.find(
		(country) => getFeatureId(country) === String(selectedCountry?.countryId).padStart(3, "0"),
	);
	useEffect(() => {
		onCountrySelectionChange?.(selectedCountry?.countryId ?? null);
	}, [onCountrySelectionChange, selectedCountry?.countryId]);

	const nextVideo = selectedCountry?.trailer
		? `${publicCDNVideoUrl}${selectedCountry.trailer}.mp4`
		: null;
	activeVideoSourceRef.current = activeVideoSource;

	useEffect(() => {
		if (videoTimer.current) clearTimeout(videoTimer.current);
		pendingVideoSourceRef.current = nextVideo;
		if (nextVideo === activeVideoSource) {
			setVideoFadingOut(false);
			return;
		}
		if (!activeVideoSource) {
			setVideoReady(false);
			setVideoFadingOut(false);
		}
		const delay = activeVideoSource ? 250 : 0;
		if (activeVideoSource) setVideoFadingOut(true);
		videoTimer.current = setTimeout(() => {
			setVideoReady(false);
			setVideoFadingOut(false);
			setWarmVideoSources((current) =>
				Array.from(new Set([nextVideo, activeVideoSource, ...current].filter(Boolean) as string[])).slice(0, 2),
			);
			setActiveVideoSource(nextVideo);
		}, delay);
		return () => {
			if (videoTimer.current) clearTimeout(videoTimer.current);
		};
	}, [nextVideo, activeVideoSource]);

	useEffect(
		() => () => {
			if (videoTimer.current) clearTimeout(videoTimer.current);
		},
		[],
	);

	useEffect(() => {
		videoRefs.current.forEach((video, source) => {
			if (source !== activeVideoSource) {
				video.pause();
				return;
			}
			if (video.readyState > HTMLMediaElement.HAVE_NOTHING) video.currentTime = 0;
			if (
				video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
				pendingVideoSourceRef.current === source
			) {
				setVideoReady(true);
			}
			video.play().catch(() => {
				if (pendingVideoSourceRef.current === source) setVideoReady(false);
			});
		});
	}, [activeVideoSource, warmVideoSources]);

	useEffect(() => {
		if (!mapSvgRef.current || !mapContentRef.current) return;
		const behavior = zoom<SVGSVGElement, unknown>()
			.scaleExtent([1, 8])
			.translateExtent([[0, 0], [1200, 590]])
			.filter(function (event) {
				return event.type === "wheel" || (!event.button && (event.type !== "mousedown" || zoomTransform(this).k > 1));
			})
			.on("zoom", (event) => {
				mapContentRef.current?.setAttribute("transform", event.transform.toString());
				const rect = mapSvgRef.current?.getBoundingClientRect();
				if (rect) {
					frostedLandRef.current?.style.setProperty(
						"transform",
						`translate(${event.transform.x * rect.width / 1200}px, ${event.transform.y * rect.height / 590}px) scale(${event.transform.k})`,
					);
				}
				dotLayerRef.current?.querySelectorAll<SVGGElement>(`.${styles.dotTarget}`).forEach((dot) => {
					const x = dot.dataset.x;
					const y = dot.dataset.y;
					if (x && y) dot.setAttribute("transform", `translate(${x}, ${y}) scale(${1 / event.transform.k})`);
				});
			});
		zoomBehaviorRef.current = behavior;
		const selection = select(mapSvgRef.current);
		selection.call(behavior).on("dblclick.zoom", null);
		return () => {
			selection.on(".zoom", null);
		};
	}, []);

	useEffect(() => {
		if (!videoReady || !mapSvgRef.current) return;
		const svg = mapSvgRef.current;
		const updateTransform = () => {
			if (!frostedLandRef.current) return;
			const transform = zoomTransform(svg);
			const rect = svg.getBoundingClientRect();
			frostedLandRef.current.style.transform = `translate(${transform.x * rect.width / 1200}px, ${transform.y * rect.height / 590}px) scale(${transform.k})`;
		};
		updateTransform();
		const observer = new ResizeObserver(updateTransform);
		observer.observe(svg);
		return () => observer.disconnect();
	}, [videoReady]);

	useEffect(() => {
		if (titleTimer.current) clearTimeout(titleTimer.current);
		const nextTitle = selectedCountry?.country ?? "";
		if (nextTitle === countryTitle) return;
		setOutgoingTitle(countryTitle);
		setCountryTitle(nextTitle);
		titleTimer.current = setTimeout(() => setOutgoingTitle(""), 340);
		return () => {
			if (titleTimer.current) clearTimeout(titleTimer.current);
		};
	}, [selectedCountry, countryTitle]);

	const selectDot = (dot: WorldDot, lock = false) => {
		if (lockedDotIdRef.current && !lock) {
			hoveredDotRef.current = dot;
			return;
		}
		if (lock) lockedDotIdRef.current = dot.id;
		setSelectedDotId(dot.id);
		setSelectedCountry((current) =>
			current?.countryId === dot.countryId ? current : dot,
		);
		if (idleSelectionTimer.current) clearTimeout(idleSelectionTimer.current);
		idleSelectionTimer.current = setTimeout(() => {
			if (lockedDotIdRef.current) {
				lockedDotIdRef.current = null;
				const hoveredDot = hoveredDotRef.current;
				if (hoveredDot) {
					selectDotRef.current(hoveredDot);
					return;
				}
				const randomDot = dots[Math.floor(Math.random() * dots.length)];
				if (randomDot) {
					onRandomDotSelection?.();
					selectDotRef.current(randomDot);
				}
				return;
			}
			const randomDot = dots[Math.floor(Math.random() * dots.length)];
			if (randomDot) {
				onRandomDotSelection?.();
				selectDotRef.current(randomDot);
			}
		}, 20000);
	};
	selectDotRef.current = selectDot;

	useEffect(() => {
		idleSelectionTimer.current = setTimeout(() => {
			const randomDot = dots[Math.floor(Math.random() * dots.length)];
			if (randomDot) selectDotRef.current(randomDot);
		}, 5000);
		return () => {
			if (idleSelectionTimer.current) clearTimeout(idleSelectionTimer.current);
		};
	}, []);

	useEffect(() => {
		const unlockDot = () => {
			lockedDotIdRef.current = null;
		};
		document.addEventListener("click", unlockDot, true);
		return () => document.removeEventListener("click", unlockDot, true);
	}, []);

	const clearSelection = () => {
		lockedDotIdRef.current = null;
		setSelectedCountry(null);
		setSelectedDotId(null);
	};
	const motionDuration = prefersReducedMotion ? "0ms" : "500ms";
	return (
		<div className={styles.worldMapContainer}>
			<div
				className={styles.worldMap}
				role='group'
				aria-label='Interactive map of countries visited'
				onClick={clearSelection}>
			{warmVideoSources.map((source) => {
				const isActive = source === activeVideoSource;
				return (
					<video
						key={source}
						ref={(video) => {
							if (video) videoRefs.current.set(source, video);
							else videoRefs.current.delete(source);
						}}
						className={`${styles.video} ${isActive ? styles.videoActive : styles.videoCached} ${isActive && videoReady ? styles.videoReady : ""} ${isActive && videoFadingOut ? styles.videoFadingOut : ""}`}
						src={source}
						muted
						loop
						playsInline
						controls={false}
						preload={isActive ? "auto" : "metadata"}
						data-active={isActive}
						onCanPlay={() => {
			if (activeVideoSourceRef.current === source && pendingVideoSourceRef.current === source) {
				setVideoReady(true);
			}
		}}
			onError={() => {
				if (activeVideoSourceRef.current === source && pendingVideoSourceRef.current === source) {
					setVideoReady(false);
				}
						}}
						aria-hidden='true'
					/>
				);
			})}
			{videoReady && (
				<div
					ref={frostedLandRef}
					className={styles.frostedLand}
					style={{
						maskImage: landMaskImage,
						WebkitMaskImage: landMaskImage,
						maskSize: "100% 100%",
						WebkitMaskSize: "100% 100%",
					}}
					aria-hidden='true'
				/>
			)}
			<svg
				ref={mapSvgRef}
				className={styles.mapSvg}
				viewBox='0 0 1200 590'
				role='group'
				aria-label='Travel map. Scroll or pinch to zoom; drag to pan.'>
					<g ref={mapContentRef}>
					<rect
						className={`${styles.ocean} ${videoReady ? styles.oceanVideoReady : ""}`}
						x='0'
						y='0'
						width='1200'
						height='590'
					/>
					<g className={`${styles.landLayer} ${videoReady ? styles.landVideoReady : ""}`}>
						{countries.features.map((country, index) => (
							<path
								key={`${String(country.id ?? country.properties?.name ?? "country")}-${index}`}
								d={path(country) ?? undefined}
								className={styles.land}
								data-country-id={country.id}
							/>
						))}
						<path d={path(countryBorders) ?? undefined} className={styles.borders} />
						<path d={path(landOutline) ?? undefined} className={styles.landOutline} />
						{selectedCountryFeature && (
							<path
								d={path(selectedCountryFeature) ?? undefined}
								className={styles.selectedCountry}
								style={{ transitionDuration: motionDuration }}
							/>
						)}
					</g>
					<g ref={dotLayerRef} className={styles.dotLayer}>
						{dots.map((dot) => {
							const position = projection([dot.longitude, dot.latitude]);
							if (!position) return null;
							return (
								<g
									key={dot.id}
									className={`${styles.dotTarget} ${selectedDotId === dot.id ? styles.dotSelected : ""}`}
									data-x={position[0].toFixed(3)}
									data-y={position[1].toFixed(3)}
									aria-hidden='true'
									focusable='false'
									transform={`translate(${position[0].toFixed(3)}, ${position[1].toFixed(3)})`}
									onPointerEnter={(event) => {
										hoveredDotRef.current = dot;
										if (event.pointerType === "mouse") selectDot(dot);
									}}
									onPointerLeave={() => {
										if (hoveredDotRef.current?.id === dot.id) hoveredDotRef.current = null;
									}}
									onClick={(event) => {
										event.stopPropagation();
										selectDot(dot, true);
										onDotClick?.(dot.countryId);
									}}>
									<circle className={styles.dotHitArea} r='15' />
									<circle className={styles.dot} r='4.5' />
								</g>
							);
						})}
					</g>
				</g>
			</svg>
			</div>
			<div className={styles.countryInfo}>
				<div className={styles.countryInfoContent}>
					<h2 className={styles.countryTitle} aria-live='polite'>
						{outgoingTitle && <span className={`${styles.titleText} ${styles.titleOutgoing}`}>{outgoingTitle}</span>}
						{countryTitle && <span key={countryTitle} className={`${styles.titleText} ${styles.titleIncoming}`}>{countryTitle}</span>}
					</h2>
					<div className={styles.watchNowSlot}>
						{selectedCountry?.travelLink && (
							<Button
								component={Link}
								href={`/travel/${selectedCountry.travelLink}`}
								variant='outlined'
								endIcon={<PlayArrowRoundedIcon />}
								className={styles.watchNow}
								sx={{
									marginLeft: "2px",
									marginTop: "10px",
									minWidth: "44.8px",
									padding: "3.5px 10.5px",
									fontSize: "0.67375rem",
									borderColor: "var(--travel-map-accent)",
									color: "var(--travel-map-accent)",
									textTransform: "none",
									"&:hover": {
										borderColor: "var(--travel-map-accent)",
										backgroundColor: "color-mix(in srgb, var(--travel-map-accent) 12%, transparent)",
									},
									"& .MuiButton-endIcon": {
										marginLeft: "5.6px",
									},
									"& .MuiButton-endIcon > *:nth-of-type(1)": {
										fontSize: "0.9rem",
									},
								}}>
								Watch Now
							</Button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default WorldMap;
