import { LinearProgress, Tooltip, Zoom } from "@mui/material";
import styles from "../index.module.scss";
import {
	scorecardColorsPrimary,
	scorecardColorsSecondary,
} from "../../datasources/TravelMetaData";

export const ProgressBar = ({
	title,
	scores,
}: {
	title: string;
	scores: number[];
}) => {
	const scoreKeyData: any = {
		beauty: {
			title: "Beauty",
			tooltip: "How attractive, clean and unique the country is on average",
		},
		affordability: {
			title: "Affordability",
			tooltip:
				"How far does each dollar go, higher affordability means the country is cheaper",
		},
		food: {
			title: "Food",
			tooltip: "How good is the cuisine. Higher means better",
		},
		hospitality: {
			title: "Hospitality",
			tooltip:
				"How kind and engaging the locals are and how easy it is to meet them. Low means locals often scam, manipulate or abuse, high score means they're welcoming and helpful",
		},
		safety: {
			title: "Safety",
			tooltip:
				"How safe as a solo traveler, from crime, nature and the government",
		},
		accessibility: {
			title: "Accessibility",
			tooltip:
				"How easy is it to get around and operate independently without a guide. Higher means its easy to get around and book hotels",
		},
		video: {
			title: "Video",
			tooltip:
				"How well the final edited video turned out (See above). Low means I don't like it. Each country gets it's own rating within one video",
		},
		finalScore: {
			title: "Final Score",
			tooltip:
				"Final result with all other scores considered plus my personal luck, friends made & unique experiences",
		},
	};

	return (
		<>
			<Tooltip
				slots={{ transition: Zoom }}
				title={scoreKeyData[title].tooltip}
				followCursor
				key={`score item ${title}`}>
				<div className={styles.scoreItemContainer}>
					<h4 className={styles.scoreTitle}> {scoreKeyData[title].title}</h4>

					<div className={styles.scoreBarsWrapper}>
						{scores.map((countryScore, countryIndex) => (
							<LinearProgress
								variant='determinate'
								value={countryScore === 1 ? 10 : countryScore * 10}
								className={styles.scoreBar}
								sx={{
									height: `${24 / scores.length}px`,
									"& .MuiLinearProgress-bar": {
										background: `linear-gradient(to right, ${scorecardColorsPrimary[countryIndex]}, ${scorecardColorsSecondary[countryIndex]})`,
										borderRadius: "20px",
										borderTop: "0.5px solid white",
									},
								}}
								key={`country score index ${countryIndex}`}
							/>
						))}
					</div>
				</div>
			</Tooltip>
		</>
	);
};
