import { LinearProgress } from "@mui/material";
import { scorecardColorsPrimary } from "../../../datasources/TravelMetaData";
import { ProgressBar } from "../ProgressBar";
import { Extras } from "../../types";
import indexStyles from "../../index.module.scss";
import styles from "./VideoScorecard.module.scss";

export const VideoScorecard = ({
	scorecard,
	finalScore,
	countries,
}: {
	scorecard: NonNullable<Extras["scorecard"]>;
	finalScore: number;
	countries?: string[];
}) => {
	const scoreCardArray = Object.entries(scorecard);
	const finalScoreFillPercent = Math.max(finalScore * 10, 16);

	return (
		<div className={styles.scorecardContainer}>
			<h2>Scores</h2>
			{countries && countries.length > 1 && (
				<div className={styles.scorecardLegend}>
					{countries.map((country, index) => (
						<div className={styles.legendItem} key={country}>
							<h5
								style={{
									color: `${scorecardColorsPrimary[index]}`,
									padding: "0 20px 12px 0",
									margin: 0,
								}}>
								{country}
							</h5>
						</div>
					))}
				</div>
			)}
			{scoreCardArray.map(([title, scores]) => (
				<ProgressBar title={title} scores={scores} key={title} />
			))}
			<div className={styles.finalScoreDiv} />
			<div className={styles.finalScoreContainer}>
				<h4 className={`${indexStyles.scoreTitle} ${styles.finalScoreTitle}`}>
					Final Score
				</h4>

				<div className={styles.finalScoreBarWrapper}>
					<LinearProgress
						variant='determinate'
						value={finalScoreFillPercent}
						className={`${indexStyles.scoreBar} ${styles.finalScore}`}
						sx={{
							"& .MuiLinearProgress-bar": {
								background:
									"linear-gradient(to right,  #f7df07,rgb(254, 222, 93))",
								borderRadius: "20px",
								borderTop: "1.9px solid white",
							},
						}}
					/>

					<h4
						className={styles.finalScoreDigit}
						style={{ width: `${finalScoreFillPercent}%` }}>
						{finalScore} / 10
					</h4>
				</div>
			</div>
		</div>
	);
};
