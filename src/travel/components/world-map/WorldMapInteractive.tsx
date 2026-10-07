import { memo, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { geoContains, geoPath, geoProjection } from "d3-geo";
import { select } from "d3-selection";
import { zoom, zoomIdentity, zoomTransform } from "d3-zoom";
import type { ZoomBehavior, ZoomTransform } from "d3-zoom";
import { feature, merge, mesh } from "topojson-client";
import type { Feature, FeatureCollection, MultiPolygon, Polygon } from "geojson";
import type {
	GeometryCollection as TopologyGeometryCollection,
	GeometryObject as TopologyGeometryObject,
	MultiPolygon as TopologyMultiPolygon,
	Polygon as TopologyPolygon,
	Topology,
} from "topojson-specification";
import worldAtlas from "world-atlas/countries-50m.json";
import {
	publicCDNVideoUrl,
	travelVideoMetaData,
	worldMapOnlyDots,
} from "../../../datasources/TravelMetaData";
import { Advisory } from "../../types";
import { usePrefersReducedMotion } from "../../../../utils/usePrefersReducedMotion";
import styles from "./WorldMap.module.scss";

type CountryProperties = { name: string };
type CountryFeature = Feature<Polygon | MultiPolygon, CountryProperties>;
type CountryId = number;
type WorldDot = {
	id: string;
	sourceVideoLink?: string;
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
const getFrostedLandTransform = (transform: ZoomTransform, rect: DOMRect) => {
	const scale = Math.min(rect.width / 1200, rect.height / 590);
	const offsetX = (rect.width - 1200 * scale) / 2;
	const offsetY = (rect.height - 590 * scale) / 2;
	return `translate(${offsetX + transform.x * scale - offsetX * transform.k}px, ${offsetY + transform.y * scale - offsetY * transform.k}px) scale(${transform.k})`;
};

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

const videoYears = new Map(
	travelVideoMetaData.map(({ link, year }) => [link, year] as const),
);

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
const countryGeometryCollection = countriesObject as TopologyGeometryCollection;
const meshCountries = countryGeometryCollection as unknown as TopologyGeometryObject;
const countryBorders = mesh(landTopology, meshCountries, (first, second) => first !== second);
const landOutline = mesh(landTopology, meshCountries, (first, second) => first === second);
const landMass = merge(
	landTopology,
	countryGeometryCollection.geometries as Array<TopologyPolygon | TopologyMultiPolygon>,
);

const buildDots = (): WorldDot[] => {
	const mapDots: WorldDot[] = [];
	const sources = [
		...travelVideoMetaData.map((video) => ({
			link: video.link,
			countries: video.extras?.countries ?? [],
			coordinates: video.extras?.dots ?? [],
		})),
		...worldMapOnlyDots.map(({ country, dots }) => ({
			link: undefined,
			countries: [country],
			coordinates: dots,
		})),
	];
	sources.forEach((video) => {
		const sourceCountries = video.countries;
		const coordinates = video.coordinates;
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
			const assignedCountry =
				containingCountry ??
				(candidates.length === coordinates.length
					? candidates[index]
					: candidates.length === 1
						? candidates[0]
						: undefined);
			if (!assignedCountry) return;
			const latestVideo = findLatestVideo(assignedCountry.id);
			mapDots.push({
				id: `${video.link ?? `map-${assignedCountry.id}`}-${index}`,
				sourceVideoLink: video.link,
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
	return mapDots.sort((first, second) => {
		const firstGroup = !first.sourceVideoLink && first.country === "Australia"
			? 0
			: first.sourceVideoLink
				? 1
				: 2;
		const secondGroup = !second.sourceVideoLink && second.country === "Australia"
			? 0
			: second.sourceVideoLink
				? 1
				: 2;

		if (firstGroup !== secondGroup) return firstGroup - secondGroup;
		if (firstGroup !== 1) return 0;

		return (
			(videoYears.get(first.sourceVideoLink ?? "") ?? Infinity) -
			(videoYears.get(second.sourceVideoLink ?? "") ?? Infinity)
		);
	});
};

const dots = buildDots();
const randomVideoDots = travelVideoMetaData
	.filter((video) => video.extras?.dots?.length && video.extras.trailer)
	.map((video) => ({
		dots: dots.filter(
			(dot) => dot.sourceVideoLink === video.link && Boolean(dot.trailer),
		),
	}))
	.filter(({ dots: videoDots }) => videoDots.length > 0);
const getRandomDot = () => {
	const video = randomVideoDots[Math.floor(Math.random() * randomVideoDots.length)];
	return video?.dots[Math.floor(Math.random() * video.dots.length)];
};
const level4CountryIds = new Set(
	travelVideoMetaData
		.filter((video) => video.extras?.travelAdvisory?.advice === Advisory.Level4)
		.flatMap((video) => video.extras?.countries?.map(({ id }) => id) ?? []),
);
const getInitialRandomDot = () => {
	const eligibleCountryIds = [...new Set(
		dots
			.filter((dot) => level4CountryIds.has(dot.countryId) && dot.trailer)
			.map((dot) => dot.countryId),
	)];
	const countryId = eligibleCountryIds[Math.floor(Math.random() * eligibleCountryIds.length)];
	const countryDots = dots.filter((dot) => dot.countryId === countryId && dot.trailer);
	return countryDots[Math.floor(Math.random() * countryDots.length)];
};

const LandLayer = memo(({
	path,
	selectedCountryFeature,
	mapStage,
	motionDuration,
	videoReady,
}: {
	path: ReturnType<typeof geoPath>;
	selectedCountryFeature?: CountryFeature;
	mapStage: number;
	motionDuration: string;
	videoReady: boolean;
}) => (
	<g className={`${styles.landLayer} ${videoReady ? styles.landVideoReady : ""}`}>
		{countries.features.map((country, index) => (
			<path
				key={`${String(country.id ?? country.properties?.name ?? "country")}-${index}`}
				d={path(country) ?? undefined}
				className={styles.land}
				data-country-id={country.id}
			/>
		))}
		{mapStage >= 1 && (
			<>
				<path d={path(countryBorders) ?? undefined} className={styles.borders} />
				<path d={path(landOutline) ?? undefined} className={styles.landOutline} />
			</>
		)}
		{selectedCountryFeature && (
			<path
				d={path(selectedCountryFeature) ?? undefined}
				className={styles.selectedCountry}
				style={{ transitionDuration: motionDuration }}
			/>
		)}
	</g>
));

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
	const [autoSelectedDotId, setAutoSelectedDotId] = useState<string | null>(null);
	const [dimOtherDots, setDimOtherDots] = useState(false);
	const [showZoomOut, setShowZoomOut] = useState(false);
	const [activeVideoSource, setActiveVideoSource] = useState<string | null>(null);
	const [warmVideoSources, setWarmVideoSources] = useState<string[]>([]);
	const [videoReady, setVideoReady] = useState(false);
	const [videoFadingOut, setVideoFadingOut] = useState(false);
	const [watchNowLoading, setWatchNowLoading] = useState(false);
	const [mapStage, setMapStage] = useState(0);
	const [visibleDotCount, setVisibleDotCount] = useState(0);
	const [countryTitle, setCountryTitle] = useState("");
	const [outgoingTitle, setOutgoingTitle] = useState("");
	const idleSelectionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const selectDotRef = useRef<(dot: WorldDot, lock?: boolean, dimOthers?: boolean) => void>(() => {});
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
		const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 590"><path fill="white" d="${path(landMass) ?? ""}"/></svg>`;
		return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
	}, [path]);
	const selectedCountryFeature = selectedCountry
		? countries.features.find(
				(country) => getFeatureId(country) === String(selectedCountry.countryId).padStart(3, "0"),
			)
		: undefined;
	const orderedDots = useMemo(
		() =>
			[...dots].sort(
				(first, second) =>
					Number(first.id === selectedDotId) - Number(second.id === selectedDotId),
			),
		[selectedDotId],
	);
	const visibleDotIds = useMemo(
		() => new Set(dots.slice(0, visibleDotCount).map((dot) => dot.id)),
		[visibleDotCount],
	);
	useEffect(() => {
		const bordersFrame = requestAnimationFrame(() => {
			setMapStage(1);
			requestAnimationFrame(() => setMapStage(2));
		});
		return () => cancelAnimationFrame(bordersFrame);
	}, []);
	useEffect(() => {
		if (mapStage < 2) return;
		const startedAt = performance.now();
		let frame = 0;
		const revealDots = (now: number) => {
			const progress = Math.min((now - startedAt) / 900, 1);
			setVisibleDotCount(Math.ceil(dots.length * progress));
			if (progress < 1) frame = requestAnimationFrame(revealDots);
		};
		frame = requestAnimationFrame(revealDots);
		return () => cancelAnimationFrame(frame);
	}, [mapStage]);
	useEffect(() => {
		onCountrySelectionChange?.(selectedCountry?.countryId ?? null);
	}, [onCountrySelectionChange, selectedCountry?.countryId]);

	useEffect(() => {
		setWatchNowLoading(false);
	}, [selectedCountry?.countryId]);

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
		const svg = mapSvgRef.current;
		const behavior = zoom<SVGSVGElement, unknown>()
			.scaleExtent([1, 20])
			.translateExtent([[0, 0], [1200, 590]])
			.filter(function (event) {
				if (event.type === "wheel") {
					return event.deltaY <= 0 || zoomTransform(this).k > 1;
				}
				if (event.type === "touchstart") {
					return event.touches.length > 1 || zoomTransform(this).k > 1;
				}
				return !event.button && (event.type !== "mousedown" || zoomTransform(this).k > 1);
			})
			.on("zoom", (event) => {
				setShowZoomOut(event.transform.k >= 2);
				svg.style.touchAction = event.transform.k > 1 ? "none" : "pan-y";
				mapContentRef.current?.setAttribute("transform", event.transform.toString());
				const dotSizeScale = Math.max(1, event.transform.k / 4) / event.transform.k;
				dotLayerRef.current?.style.setProperty("--dot-size-scale", String(dotSizeScale));
				const rect = mapSvgRef.current?.getBoundingClientRect();
				if (rect) {
					frostedLandRef.current?.style.setProperty("transform", getFrostedLandTransform(event.transform, rect));
				}
			});
		zoomBehaviorRef.current = behavior;
		const selection = select(svg);
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
			frostedLandRef.current.style.transform = getFrostedLandTransform(transform, rect);
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

	const restartIdleSelectionTimer = () => {
		if (idleSelectionTimer.current) clearTimeout(idleSelectionTimer.current);
		idleSelectionTimer.current = setTimeout(() => {
			if (lockedDotIdRef.current) {
				lockedDotIdRef.current = null;
				setDimOtherDots(false);
				const hoveredDot = hoveredDotRef.current;
				if (hoveredDot) {
					selectDotRef.current(hoveredDot);
					return;
				}
				const randomDot = getRandomDot();
				if (randomDot) {
					onRandomDotSelection?.();
					selectDotRef.current(randomDot, false, true);
				}
				return;
			}
			const randomDot = getRandomDot();
			if (randomDot) {
				onRandomDotSelection?.();
				selectDotRef.current(randomDot, false, true);
			}
		}, 20000);
	};
	const selectDot = (dot: WorldDot, lock = false, dimOthers = lock) => {
		if (lockedDotIdRef.current && !lock) {
			hoveredDotRef.current = dot;
			return;
		}
		if (lock) {
			lockedDotIdRef.current = dot.id;
		}
		setAutoSelectedDotId(dimOthers && !lock ? dot.id : null);
		setDimOtherDots(dimOthers);
		setSelectedDotId(dot.id);
		setSelectedCountry((current) =>
			current?.countryId === dot.countryId ? current : dot,
		);
		restartIdleSelectionTimer();
	};
	selectDotRef.current = selectDot;

	useEffect(() => {
		idleSelectionTimer.current = setTimeout(() => {
			const randomDot = getInitialRandomDot();
			if (randomDot) selectDotRef.current(randomDot, false, true);
		}, 5000);
		return () => {
			if (idleSelectionTimer.current) clearTimeout(idleSelectionTimer.current);
		};
	}, []);

	useEffect(() => {
		const unlockDot = () => {
			lockedDotIdRef.current = null;
			setAutoSelectedDotId(null);
			setDimOtherDots(false);
		};
		document.addEventListener("click", unlockDot, true);
		return () => document.removeEventListener("click", unlockDot, true);
	}, []);

	const clearSelection = () => {
		lockedDotIdRef.current = null;
		setAutoSelectedDotId(null);
		setDimOtherDots(false);
		hoveredDotRef.current = null;
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
				onPointerDownCapture={restartIdleSelectionTimer}
				onPointerMoveCapture={restartIdleSelectionTimer}
				onWheelCapture={restartIdleSelectionTimer}
				onClickCapture={(event) => {
					restartIdleSelectionTimer();
					if (
						event.target instanceof Element &&
						!event.target.closest(`.${styles.dotTarget}`) &&
						!event.target.closest(`.${styles.zoomOutButton}`)
					) {
						clearSelection();
					}
				}}>
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
					<LandLayer
						path={path}
						selectedCountryFeature={selectedCountryFeature}
						mapStage={mapStage}
						motionDuration={motionDuration}
						videoReady={videoReady}
					/>
					{mapStage >= 2 && <g
						ref={dotLayerRef}
						className={`${styles.dotLayer} ${dimOtherDots ? styles.dotLayerDimmed : ""}`}>
						{orderedDots.filter((dot) => visibleDotIds.has(dot.id)).map((dot) => {
							const position = projection([dot.longitude, dot.latitude]);
							if (!position) return null;
							return (
								<g
								key={dot.id}
									className={`${styles.dotTarget} ${styles.dotRevealing} ${selectedDotId === dot.id ? styles.dotSelected : ""} ${autoSelectedDotId === dot.id ? styles.dotPulsing : ""}`}
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
									<circle className={styles.dotHitArea} r='3.6' />
									<circle className={styles.dot} r='3.6' />
								</g>
							);
						})}
					</g>}
				</g>
			</svg>
			</div>
			{showZoomOut && (
				<Button
					className={styles.zoomOutButton}
					variant='outlined'
					onClick={() => {
						restartIdleSelectionTimer();
						if (mapSvgRef.current && zoomBehaviorRef.current) {
							select(mapSvgRef.current).call(zoomBehaviorRef.current.transform, zoomIdentity);
						}
					}}
					sx={{
						borderColor: "rgba(255, 255, 255, 0.45)",
						color: "rgba(255, 255, 255, 0.75)",
						textTransform: "none",
						backgroundColor: "transparent",
						"&:hover": {
							borderColor: "rgba(255, 255, 255, 0.75)",
							color: "#fff",
							backgroundColor: "transparent",
						},
					}}
				>
					Zoom Out
				</Button>
			)}
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
								endIcon={watchNowLoading ? undefined : <PlayArrowRoundedIcon />}
								loading={watchNowLoading}
								loadingPosition='end'
								loadingIndicator={<CircularProgress size={14} sx={{ color: "var(--travel-map-accent)" }} />}
								onClick={(event) => {
									if (
										event.button === 0 &&
										!event.metaKey &&
										!event.ctrlKey &&
										!event.shiftKey &&
										!event.altKey
									) {
										setWatchNowLoading(true);
									}
								}}
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
									"&.Mui-disabled": {
										borderColor: "var(--travel-map-accent)",
										color: "var(--travel-map-accent)",
									},
									"&:hover": {
										borderColor: "var(--travel-map-accent)",
										backgroundColor: "color-mix(in srgb, var(--travel-map-accent) 12%, transparent)",
									},
									"& .MuiButton-endIcon": {
										marginLeft: "5.6px",
									},
									"& .MuiButton-loadingIndicator": {
										right: "6.5px",
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
