import { useEffect, useRef } from "react";
import type { TravelCountry } from "../../types";
import styles from "./DestinationMap.module.scss";

export const DestinationMap = ({
	countries,
	dots = [],
}: {
	countries: TravelCountry[];
	dots?: string[];
}) => {
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;
		let map: import("maplibre-gl").Map | undefined;
		let disposed = false;
		const initialize = async () => {
			const { createDestinationMap } = await import("./createDestinationMap");
			if (!disposed) map = createDestinationMap(container, countries, dots);
		};
		if (typeof IntersectionObserver === "undefined") {
			void initialize();
		} else {
			const observer = new IntersectionObserver(
				([entry]) => {
					if (!entry.isIntersecting) return;
					observer.disconnect();
					void initialize();
				},
				{ rootMargin: "300px 0px" },
			);
			observer.observe(container);
			return () => {
				disposed = true;
				observer.disconnect();
				map?.remove();
			};
		}
		return () => {
			disposed = true;
			map?.remove();
		};
	}, [countries, dots]);

	return (
		<section className={styles.destinationSection} aria-label='Destination map'>
			<div
				ref={containerRef}
				className={styles.map}
				role='region'
				aria-label={`Map highlighting ${countries.map(({ name }) => name).join(", ")}`}
			/>
		</section>
	);
};
