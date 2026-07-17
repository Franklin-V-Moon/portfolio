import Image from "next/image";
import { Itinerary } from "../../types";
import indexStyles from "../../index.module.scss";
import { ItineraryStep } from "./ItineraryStep";
import styles from "./ItineraryList.module.scss";

export const ItineraryList = ({
	itineraries,
	videoTitle,
}: {
	itineraries: Itinerary;
	videoTitle: string;
}) => {
	return (
		<div>
			<h2>{itineraries.length > 1 ? "Itineraries" : "Itinerary"}</h2>
			{itineraries.map((itinerary) => (
				<div className={indexStyles.extrasContainer} key={itinerary.title}>
					<div className={styles.itineraryItemImageContainer}>
						<Image
							src={`/travel/itineraries/${itinerary.mapImage}.png`}
							alt={`Map of ${videoTitle} for ${itinerary.title} itinerary`}
							width={1000}
							height={1000}
							sizes='100vw'
							style={{ width: "100%", height: "auto" }}
						/>
					</div>

					<div className={styles.itineraryItemContainer}>
						<h3 className={styles.itineraryTitles}>{itinerary.title}</h3>
						<h4
							className={styles.itineraryTitles}
							style={{ paddingTop: "19px" }}>
							{itinerary.length}
						</h4>
						<p className={styles.itineraryTitles}>{itinerary.description}</p>
						<div className={styles.accordionContainer}>
							{itinerary.steps.map((step, stepIndex) => (
								<div key={`step item ${stepIndex}`}>
									<ItineraryStep step={step} />
								</div>
							))}
						</div>
					</div>
				</div>
			))}
		</div>
	);
};
