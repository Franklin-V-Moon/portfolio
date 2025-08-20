import Image from "next/image";
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
}): JSX.Element => {
	const [isSmallScreen, setIsSmallScreen] = useState(false);
	const [loading, setLoading] = useState({ state: false, index: -1 });

	useEffect(() => {
		const checkScreenSize = () => {
			setIsSmallScreen(window.innerWidth < 500);
		};

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
				.map((dataItem, videoIndex) => (
					<Grid
						item
						key={`Video card of ${dataItem.title}`}
						xs={isSmallScreen && 6}>
						<div
							style={{
								animation: `fadeIn ${videoIndex + 5}00ms ease-in-out`,
								opacity: 1,
							}}>
							<CardActionArea
								className={styles.videoCardContainer}
								onClick={() => {
									setLoading({ state: true, index: videoIndex });
									router.push(`/travel/${dataItem.link}`);
								}}>
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
								<Image
									src={`/travel/posters/${dataItem.hostedLink}.png`}
									alt={`${dataItem.title} poster`}
									className={styles.videoCardImage}
									height={300}
									width={200}
									layout='responsive'
								/>
								<div className={styles.loadingContainer}>
									{loading.state && loading.index === videoIndex && (
										<LinearProgress color='inherit' />
									)}
								</div>
							</CardActionArea>
						</div>
					</Grid>
				))
				.reverse()}
		</Grid>
	);
};
