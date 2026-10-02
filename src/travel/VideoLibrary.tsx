import { ImageWithSkeleton } from "../global/ImageWithSkeleton";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { TravelVideoMetaData } from "./types";
import { CardActionArea, Grid, LinearProgress } from "@mui/material";
import styles from "./VideoLibrary.module.scss";
import { useState } from "react";
import router from "next/router";

const PRIORITY_IMAGE_COUNT = 6;

export const VideoLibrary = ({
	videoMetaData,
	startIndex = 0,
	horizontal = false,
}: {
	videoMetaData: TravelVideoMetaData[];
	startIndex?: number;
	horizontal?: boolean;
}) => {
	const [loading, setLoading] = useState({ state: false, index: -1 });

	return (
		<Grid
			container
			spacing={1.25}
			sx={horizontal ? undefined : { justifyContent: { xs: "center", sm: "flex-start" } }}
			style={{
				margin: horizontal ? 0 : "0 auto",
				padding: horizontal ? "0 0 0 20px" : "0 20px",
				width: "100%",
				maxWidth: horizontal ? undefined : 1080,
				boxSizing: "border-box",
				flexWrap: horizontal ? "nowrap" : undefined,
				justifyContent: horizontal ? "flex-start" : undefined,
			}}>
			{[...videoMetaData].reverse().map((dataItem, displayIndex) => {
				const href = `/travel/${dataItem.link}`;
				const globalIndex = startIndex + displayIndex;
				return (
					<Grid
						key={`Video card of ${dataItem.title}`}
						size={horizontal ? false : { xs: 6, sm: 2.4 }}
						style={horizontal
							? { flex: "1 1 0", minWidth: 0, maxWidth: 200 }
							: { display: "flex", justifyContent: "center", maxWidth: 200 }}>
						<div
							style={{
								animation: `fadeIn ${displayIndex + 5}00ms ease-in-out`,
								opacity: 1,
							}}>
							<CardActionArea
								className={`${styles.videoCardContainer} ${horizontal ? styles.horizontalVideoCardContainer : ""}`}
								component='a'
								href={href}
								onClick={(e) => {
									e.preventDefault();
									setLoading({ state: true, index: displayIndex });
									router.push(href);
								}}
								sx={{
									textDecoration: "none",
									color: "inherit",
									display: "block",
								}}
								aria-label={`Watch travel video: ${dataItem.title}`}>
								{dataItem.newestVideo && (
									<h5 className={styles.newestVideo}>LATEST VIDEO</h5>
								)}

								{dataItem.previouslyWatched && dataItem.backupLink && (
									<div className={styles.watched}>
										<DoneRoundedIcon
											style={{ height: "2.5rem", width: "2.5rem" }}
										/>
									</div>
								)}

								<ImageWithSkeleton
									src={`/travel/posters/${dataItem.hostedLink}.png`}
									alt={`${dataItem.title} poster`}
									className={styles.videoCardImage}
									height={300}
									width={200}
									sizes='(max-width: 500px) 50vw, 200px'
									priority={globalIndex < PRIORITY_IMAGE_COUNT}
									style={{
										width: "100%",
										height: "auto",
										display: horizontal ? "block" : undefined,
									}}
								/>

								<div className={`${styles.loadingContainer} ${horizontal ? styles.horizontalLoadingContainer : ""}`}>
									{loading.state && loading.index === displayIndex && (
										<LinearProgress color='inherit' />
									)}
								</div>
							</CardActionArea>
						</div>
					</Grid>
				);
			})}
		</Grid>
	);
};
