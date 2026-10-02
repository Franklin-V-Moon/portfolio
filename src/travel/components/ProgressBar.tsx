import { useEffect, useState } from "react";
import { LinearProgress, Tooltip, Zoom } from "@mui/material";
import indexStyles from "../index.module.scss";
import scorecardStyles from "./Scorecard.module.scss";
import type { ScorecardVariant } from "../types";
import {
	scorecardColorsPrimary,
	scorecardColorsSecondary,
} from "../../datasources/TravelMetaData";

export const ProgressBar = ({
	title,
	scores,
	animateBars = false,
	startBarAnimation = false,
	variant = "default",
}: {
	title: string;
	scores: number[];
	animateBars?: boolean;
	startBarAnimation?: boolean;
	variant?: ScorecardVariant;
}) => {
	const countryRow = variant === "country-row";
	const [barsStarted, setBarsStarted] = useState(false);
	useEffect(() => {
		if (!animateBars || !startBarAnimation || barsStarted) return;
		const frame = requestAnimationFrame(() => setBarsStarted(true));
		return () => cancelAnimationFrame(frame);
	}, [animateBars, barsStarted, startBarAnimation]);

	const scoreKeyData: Record<string, { title: string; tooltip: string }> = {
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
				"How easy is it to get around and operate independently without a guide. Higher means it's easy to get around and book hotels",
		},
		video: {
			title: "Video",
			tooltip:
				"How well the final edited video turned out (See above). Low means I don't like it. Each country gets its own rating within one video",
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
				<div className={`${indexStyles.scoreItemContainer} ${countryRow ? scorecardStyles.countryRowScoreItem : ""}`}>
					<h4 className={`${indexStyles.scoreTitle} ${countryRow ? scorecardStyles.countryRowScoreTitle : ""}`}>
						{scoreKeyData[title].title}
					</h4>

					<div className={`${indexStyles.scoreBarsWrapper} ${countryRow ? scorecardStyles.countryRowScoreBars : ""}`}>
						{scores.map((countryScore, countryIndex) => (
							<LinearProgress
								variant='determinate'
								value={animateBars && !barsStarted ? 0 : countryScore === 1 ? 10 : countryScore * 10}
								className={`${indexStyles.scoreBar} ${countryRow ? scorecardStyles.countryRowScoreBar : ""}`}
								sx={{
									height: `${24 / scores.length}px`,
									minHeight: 0,
									...(countryRow
										? { "@media (max-width: 599px)": { height: `${12 / scores.length}px` } }
										: {}),
									"& .MuiLinearProgress-bar": {
										background: `linear-gradient(to right, ${scorecardColorsPrimary[countryIndex]}, ${scorecardColorsSecondary[countryIndex]})`,
										borderRadius: "20px",
										borderTop: "0.5px solid white",
										transition: animateBars ? "transform 900ms cubic-bezier(0.16, 1, 0.3, 1)" : undefined,
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
