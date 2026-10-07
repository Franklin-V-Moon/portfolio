import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import styles from "./WorldMap.module.scss";

type MapProps = {
	onDotClick?: (countryId: number) => void;
	onCountrySelectionChange?: (countryId: number | null) => void;
	onRandomDotSelection?: () => void;
};

const WorldMap = (props: MapProps) => {
	const [Background, setBackground] = useState<ComponentType | null>(null);
	const [InteractiveMap, setInteractiveMap] =
		useState<ComponentType<MapProps> | null>(null);

	useEffect(() => {
		const frame = requestAnimationFrame(() => {
			import("./WorldMapBackground").then((module) =>
				setBackground(() => module.default),
			);
		});
		return () => cancelAnimationFrame(frame);
	}, []);

	useEffect(() => {
		if (!Background) return;
		const frame = requestAnimationFrame(() => {
			import("./WorldMapInteractive").then((module) =>
				setInteractiveMap(() => module.default),
			);
		});
		return () => cancelAnimationFrame(frame);
	}, [Background]);

	if (InteractiveMap) return <InteractiveMap {...props} />;

	return (
		<div className={styles.worldMapContainer}>
			<div
				className={`${styles.worldMap} ${styles.worldMapLoading}`}
				role='img'
				aria-label='Map of countries visited loading'>
				{Background && <Background />}
			</div>
			<div className={styles.countryInfo} />
		</div>
	);
};

export default WorldMap;
