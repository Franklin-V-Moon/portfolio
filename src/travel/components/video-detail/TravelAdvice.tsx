import { Advisory, Extras } from "../../types";
import indexStyles from "../../index.module.scss";
import styles from "./TravelAdvice.module.scss";

const adviceKeyData: Record<string, string> = {
	travelLength: "Trip Duration",
	currency: "Currencies Used",
	season: "Best Months",
	dailyBudget: "Daily Budget",
};

const adviceColors = {
	[Advisory.Level1]: "#5cbc60",
	[Advisory.Level2]: "#f9d34e",
	[Advisory.Level3]: "#f6902d",
	[Advisory.Level4]: "#f44041",
};

export const TravelAdvice = ({
	advice,
	travelAdvisory,
}: {
	advice?: Extras["advice"];
	travelAdvisory?: Extras["travelAdvisory"];
}) => {
	const adviceArray = advice ? Object.entries(advice) : [];

	return (
		<div className={indexStyles.extraInfoContainer}>
			{advice && (
				<>
					<h2 style={{ margin: "0 0 -10px 0" }}>Advice</h2>
					{adviceArray.map(([adviceTitle, adviceValue]) => (
						<div key={adviceTitle} className={styles.adviceWrapper}>
							<h4 className={styles.adviceHeader}>
								{adviceKeyData[adviceTitle]}
							</h4>
							<p className={styles.adviceParagraph}>{adviceValue}</p>
						</div>
					))}
				</>
			)}
			{travelAdvisory && (
				<div className={styles.adviceWrapper}>
					<h4 className={styles.adviceHeader}>Official Travel Advice</h4>
					<a
						href={travelAdvisory.link}
						className={styles.dfatSubtext}
						target='_blank'>
						From the Australian DFAT Smartraveller
					</a>
					<div
						className={styles.advisoryContainer}
						style={{
							backgroundColor: adviceColors[travelAdvisory.advice],
						}}>
						<h4>{travelAdvisory.advice}</h4>
					</div>
				</div>
			)}
		</div>
	);
};
