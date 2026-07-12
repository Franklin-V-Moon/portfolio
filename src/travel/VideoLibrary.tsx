import { ImageWithSkeleton } from "../global/ImageWithSkeleton";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { TravelVideoMetaData } from "./types";
import { CardActionArea, Grid, LinearProgress } from "@mui/material";
import styles from "./videolibrary.module.scss";
import { useEffect, useState } from "react";
import router from "next/router";

export const VideoLibrary = ({
	videoMetaData,
}: {
	videoMetaData: TravelVideoMetaData[];
}) => {
	const [isSmallScreen, setIsSmallScreen] = useState(false);
	const [loading, setLoading] = useState({ state: false, index: -1 });

	useEffect(() => {
		const checkScreenSize = () => setIsSmallScreen(window.innerWidth < 500);
		checkScreenSize();
		window.addEventListener("resize", checkScreenSize);
		return () => window.removeEventListener("resize", checkScreenSize);
	}, []);

	return (
		<Grid
			container
			spacing={1.25}
			style={{
				margin: 0,
				padding: "0 40px 0 20px",
				justifyContent: isSmallScreen ? "space-between" : "",
			}}>
			{videoMetaData
				.map((dataItem, videoIndex) => {
					const href = `/travel/${dataItem.link}`;
					return (
						<Grid
							key={`Video card of ${dataItem.title}`}
							size={{ xs: isSmallScreen ? 6 : false }}>
							<div
								style={{
									animation: `fadeIn ${videoIndex + 5}00ms ease-in-out`,
									opacity: 1,
								}}>
								<CardActionArea
									className={styles.videoCardContainer}
									component='a'
									href={href}
									onClick={(e) => {
										e.preventDefault();
										setLoading({ state: true, index: videoIndex });
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
										priority={videoIndex < 2}
										style={{ width: "100%", height: "auto" }}
									/>

									<div className={styles.loadingContainer}>
										{loading.state && loading.index === videoIndex && (
											<LinearProgress color='inherit' />
										)}
									</div>
								</CardActionArea>
							</div>
						</Grid>
					);
				})
				.reverse()}
		</Grid>
	);
};
