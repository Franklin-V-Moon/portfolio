import dynamic from "next/dynamic";
import type ReactPlayerType from "react-player";
import { publicCDNVideoUrl } from "../../../datasources/TravelMetaData";
import styles from "./Trailer.module.scss";

const ReactPlayer = dynamic(() => import("react-player"), {
	ssr: false,
}) as unknown as typeof ReactPlayerType;

export const Trailer = ({
	trailer,
	ctaLabel = "PLAY FULL VIDEO",
	onReady,
}: {
	trailer?: string;
	ctaLabel?: string;
	onReady?: () => void;
}) => {
	return (
		<div className={styles.trailerPlayerWrapper}>
			<div className={styles.trailerLabel}>TRAILER</div>
			<div
				className={styles.trailerCTA}
				style={{
					animation: "fadeIn 1000ms ease-out",
					opacity: 0.7,
				}}>
				{ctaLabel}
			</div>
			<ReactPlayer
				url={`${publicCDNVideoUrl}${trailer}.mp4`}
				playing={true}
				loop={true}
				muted={true}
				controls={false}
				width='100%'
				height='100%'
				onReady={onReady}
			/>
		</div>
	);
};
