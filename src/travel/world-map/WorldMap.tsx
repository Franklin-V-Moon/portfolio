import geometry from "../../generated/worldMapGeometry.json";
import { projectToMap } from "./projection";
import { allMapPins } from "./mapDataService";
import styles from "./WorldMap.module.scss";

export const WorldMap = () => {
	const { viewBox } = geometry;

	return (
		<svg
			className={styles.map}
			viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
			role='img'
			aria-label='A world map with a yellow dot on every place Franklin Von Moon has traveled'>
			<g>
				{geometry.countries.map((country) => (
					<path key={country.name} className={styles.country} d={country.d} />
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
				{allMapPins().map((pin) => {
					const [x, y] = projectToMap(pin.coordinates[0], pin.coordinates[1]);

					return (
						<circle
							key={`${pin.tripLink}-${pin.place}`}
							className={styles.pin}
							cx={x}
							cy={y}>
							<title>{`${pin.place} - ${pin.tripTitle} (${pin.year})`}</title>
						</circle>
					);
				})}
			</g>
		</svg>
	);
};
