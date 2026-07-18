import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import geometry from "../../generated/worldMapGeometry.json";
import { projectToMap } from "./projection";
import { allMapPins, MapPin } from "./mapDataService";
import { EvasiveTrailer } from "./EvasiveTrailer";
import styles from "./WorldMap.module.scss";

const pinKey = (pin: MapPin) => `${pin.tripLink}-${pin.place}`;

export const WorldMap = () => {
	const { viewBox } = geometry;
	const router = useRouter();
	const frameRef = useRef<HTMLDivElement>(null);
	const pins = useMemo(() => allMapPins(), []);
	const [selected, setSelected] = useState<MapPin | null>(null);

	useEffect(() => {
		if (!selected) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setSelected(null);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [selected]);

	const highlightedCountries = useMemo(
		() =>
			new Set(
				selected
					? pins
							.filter((pin) => pin.tripLink === selected.tripLink)
							.map((pin) => pin.countryId)
					: [],
			),
		[selected, pins],
	);

	const togglePin = (pin: MapPin) => {
		setSelected((current) =>
			current && pinKey(current) === pinKey(pin) ? null : pin,
		);
	};

	const openTrip = (pin: MapPin) => {
		router.push(`/travel/${pin.tripLink}`);
	};

	const selectedPosition = selected
		? projectToMap(selected.coordinates[0], selected.coordinates[1])
		: null;
	const labelAbove = selectedPosition ? selectedPosition[1] > 45 : false;
	const labelLeftward = selectedPosition
		? (selectedPosition[0] - viewBox.x) / viewBox.width > 0.72
		: false;

	return (
		<div
			ref={frameRef}
			className={styles.frame}
			onClick={() => setSelected(null)}>
			<svg
				className={styles.map}
				viewBox={`${viewBox.x} 0 ${viewBox.width} ${viewBox.height}`}
				role='img'
				aria-label='A world map with a yellow dot on every place Franklin Von Moon has traveled'>
				<g>
					{geometry.countries.map((country) => (
						<path
							key={country.name}
							className={
								highlightedCountries.has(country.name)
									? `${styles.country} ${styles.countryHighlighted}`
									: styles.country
							}
							d={country.d}
						/>
					))}
				</g>
				<path
					className={styles.borders}
					d={geometry.borders}
					vectorEffect='non-scaling-stroke'
				/>
				<path
					className={styles.coastline}
					d={geometry.coastline}
					vectorEffect='non-scaling-stroke'
				/>
				<g>
					{pins.map((pin) => {
						const [x, y] = projectToMap(pin.coordinates[0], pin.coordinates[1]);
						const inSelectedTrip = selected?.tripLink === pin.tripLink;

						return (
							<g key={pinKey(pin)} className={styles.pinGroup}>
								<circle
									className={styles.pinHit}
									cx={x}
									cy={y}
									role='button'
									tabIndex={0}
									aria-label={`${pin.place}, ${pin.tripTitle} ${pin.year}`}
									onClick={(event) => {
										event.stopPropagation();
										togglePin(pin);
									}}
									onKeyDown={(event) => {
										if (event.key === "Enter" || event.key === " ") {
											event.preventDefault();
											togglePin(pin);
										}
									}}>
									<title>{`${pin.place} - ${pin.tripTitle} (${pin.year})`}</title>
								</circle>
								<circle
									className={
										inSelectedTrip
											? `${styles.pin} ${styles.pinSelected}`
											: styles.pin
									}
									cx={x}
									cy={y}
								/>
							</g>
						);
					})}
				</g>
				{selected && selectedPosition && (
					<text
						className={styles.label}
						x={selectedPosition[0] + (labelLeftward ? -12 : 12)}
						y={selectedPosition[1] + (labelAbove ? -12 : 22)}
						textAnchor={labelLeftward ? "end" : "start"}
						role='link'
						tabIndex={0}
						onClick={(event) => {
							event.stopPropagation();
							openTrip(selected);
						}}
						onKeyDown={(event) => {
							if (event.key === "Enter") {
								openTrip(selected);
							}
						}}>
						<title>{`Watch ${selected.tripTitle}`}</title>
						{`${selected.place} ${selected.year}`}
					</text>
				)}
			</svg>
			{selected?.trailer && selectedPosition && (
				<EvasiveTrailer
					key={pinKey(selected)}
					trailer={selected.trailer}
					pinX={(selectedPosition[0] - viewBox.x) / viewBox.width}
					pinY={selectedPosition[1] / viewBox.height}
					frameRef={frameRef}
				/>
			)}
		</div>
	);
};
