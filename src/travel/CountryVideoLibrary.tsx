import { useEffect, useState } from "react";
import type { TravelVideoMetaData } from "./types";
import { VideoLibrary } from "./VideoLibrary";
import { VideoScorecard } from "./components/video-detail/VideoScorecard";
import { usePrefersReducedMotion } from "../../utils/usePrefersReducedMotion";
import styles from "./index.module.scss";

type Phase = "closed" | "expanding" | "revealing" | "open" | "hiding" | "collapsing";

export const CountryVideoLibrary = ({
	active,
	videoMetaData,
}: {
	active: boolean;
	videoMetaData: TravelVideoMetaData[];
}) => {
	const prefersReducedMotion = usePrefersReducedMotion();
	const [phase, setPhase] = useState<Phase>("closed");
	const [retainedVideos, setRetainedVideos] = useState<TravelVideoMetaData[]>([]);
	const duration = prefersReducedMotion ? 0 : 500;
	const expanded = ["expanding", "revealing", "open", "hiding"].includes(phase);
	const displayedVideos = active ? videoMetaData : retainedVideos;
	const mostRecentVideo = [...displayedVideos].sort((first, second) => second.year - first.year)[0];

	useEffect(() => {
		if (active) setRetainedVideos(videoMetaData);
	}, [active, videoMetaData]);

	useEffect(() => {
		setPhase((current) => {
			if (active) {
				if (current === "closed") return "expanding";
				if (current === "hiding" || current === "collapsing") return "open";
				return current;
			}
			if (current === "closed" || current === "collapsing") return current;
			if (current === "expanding") return "collapsing";
			return "hiding";
		});
	}, [active]);

	useEffect(() => {
		if (phase === "expanding") {
			const timer = setTimeout(() => setPhase("revealing"), duration);
			return () => clearTimeout(timer);
		}
		if (phase === "revealing") {
			const timer = setTimeout(() => setPhase("open"), duration);
			return () => clearTimeout(timer);
		}
		if (phase === "hiding") {
			const timer = setTimeout(() => setPhase("collapsing"), duration);
			return () => clearTimeout(timer);
		}
		if (phase === "collapsing") {
			const timer = setTimeout(() => setPhase("closed"), duration);
			return () => clearTimeout(timer);
		}
	}, [duration, phase]);

	if (phase === "closed") {
		return <div className={styles.countryLibraryAnimation} />;
	}

	return (
		<div
			className={`${styles.countryLibraryAnimation} ${expanded ? styles.countryLibraryExpanded : ""}`}
			style={{ transitionDuration: `${duration}ms` }}>
			<div
				className={`${styles.countryLibraryContent} ${phase === "revealing" || phase === "open" ? styles.countryLibraryVisible : ""} ${phase === "revealing" || phase === "hiding" ? styles.countryLibraryFade : ""}`}
				style={{ transitionDuration: `${duration}ms` }}>
				<div className={`${styles.libraryContainer} ${styles.countryLibraryContainer}`}>
					<div className={`${styles.countryLibraryLayout} ${displayedVideos.length > 1 ? styles.countryLibraryLayoutMultiple : styles.countryLibraryLayoutSingle}`}>
						<div
							className={styles.countryLibraryPosters}>
							<VideoLibrary videoMetaData={displayedVideos} horizontal />
						</div>
						{mostRecentVideo?.extras?.scorecard &&
							typeof mostRecentVideo.extras.finalScore === "number" && (
								<div className={styles.countryLibraryScorecard}>
									<VideoScorecard
										scorecard={mostRecentVideo.extras.scorecard}
										finalScore={mostRecentVideo.extras.finalScore}
										countries={mostRecentVideo.extras.countries}
										variant='country-row'
										animateBars
										startBarAnimation={phase !== "expanding"}
									/>
								</div>
							)}
					</div>
				</div>
			</div>
		</div>
	);
};
