import { useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";
import { scorecardColorsPrimary } from "../../../datasources/TravelMetaData";
import { ProgressBar } from "../ProgressBar";
import { Extras, TravelCountry } from "../../types";
import indexStyles from "../../index.module.scss";
import styles from "./VideoScorecard.module.scss";

export const VideoScorecard = ({
	scorecard,
	finalScore,
	countries,
	animateBars = false,
	startBarAnimation = false,
	compact = false,
	denseOnMobile = false,
	halfBarsOnMobile = false,
	finalScoreLabel = "Final Score",
	hideLowFinalScoreText = false,
}: {
	scorecard: NonNullable<Extras["scorecard"]>;
	finalScore: number;
	countries?: TravelCountry[];
	animateBars?: boolean;
	startBarAnimation?: boolean;
	compact?: boolean;
	denseOnMobile?: boolean;
	halfBarsOnMobile?: boolean;
	finalScoreLabel?: string;
	hideLowFinalScoreText?: boolean;
}) => {
	const [barsStarted, setBarsStarted] = useState(false);
	useEffect(() => {
		if (!animateBars || !startBarAnimation || barsStarted) return;
		const frame = requestAnimationFrame(() => setBarsStarted(true));
		return () => cancelAnimationFrame(frame);
	}, [animateBars, barsStarted, startBarAnimation]);

	const scoreCardArray = Object.entries(scorecard);
	const finalScoreFillPercent = Math.max(finalScore * 10, 16);

	return (
		<div className={`${styles.scorecardContainer} ${compact ? styles.compactScorecard : ""} ${denseOnMobile ? styles.denseMobileScorecard : ""}`}>
			<h2>Scores</h2>
			{countries && countries.length > 1 && (
				<div className={styles.scorecardLegend}>
						{countries.map((country, index) => (
						<div className={styles.legendItem} key={country.id}>
							<h5
								className={denseOnMobile ? styles.denseMobileLegendText : ""}
								style={{
									color: `${scorecardColorsPrimary[index]}`,
									padding: "0 20px 12px 0",
									margin: 0,
								}}>
								{country.name}
							</h5>
						</div>
					))}
				</div>
			)}
			{scoreCardArray.map(([title, scores]) => (
				<ProgressBar
					title={title}
					scores={scores}
					animateBars={animateBars}
					startBarAnimation={startBarAnimation}
					compact={compact}
					denseOnMobile={denseOnMobile}
					halfBarsOnMobile={halfBarsOnMobile}
					key={title}
				/>
			))}
			<div className={styles.finalScoreDiv} />
			<div className={styles.finalScoreContainer}>
				<h4 className={`${indexStyles.scoreTitle} ${styles.finalScoreTitle}`}>
					{finalScoreLabel}
				</h4>

				<div className={`${styles.finalScoreBarWrapper} ${halfBarsOnMobile ? styles.halfBarsOnMobile : ""}`}>
					<LinearProgress
						variant='determinate'
						value={animateBars && !barsStarted ? 0 : finalScoreFillPercent}
						className={`${indexStyles.scoreBar} ${compact ? indexStyles.compactFinalScoreBar : ""} ${denseOnMobile ? indexStyles.denseMobileFinalScoreBar : ""} ${styles.finalScore}`}
						sx={{
							"& .MuiLinearProgress-bar": {
								background:
									"linear-gradient(to right,  #f7df07,rgb(254, 222, 93))",
								borderRadius: "20px",
								borderTop: "1.9px solid white",
								transition: animateBars ? "transform 900ms cubic-bezier(0.16, 1, 0.3, 1)" : undefined,
							},
						}}
					/>

					{!(hideLowFinalScoreText && finalScore < 3) && (
						<h4
							className={styles.finalScoreDigit}
							style={{ width: `${finalScoreFillPercent}%` }}>
							{finalScore} / 10
						</h4>
					)}
				</div>
			</div>
		</div>
	);
};
