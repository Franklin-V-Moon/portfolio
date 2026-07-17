import dynamic from "next/dynamic";
import type ReactPlayerType from "react-player";
import { publicCDNVideoUrl } from "../../../datasources/TravelMetaData";
import { Extras } from "../../types";
import styles from "./BonusVideos.module.scss";

const ReactPlayer = dynamic(() => import("react-player"), {
	ssr: false,
}) as unknown as typeof ReactPlayerType;

export const BonusVideos = ({
	extraVideos,
}: {
	extraVideos: NonNullable<Extras["extraVideos"]>;
}) => {
	return (
		<div className={styles.extraVideos}>
			<h2>Bonus Videos</h2>
			<div className={styles.videoCardsContainer}>
				{extraVideos.map((linkItem) => (
					<div key={linkItem.title} className={styles.videoCard}>
						<h4 className={styles.videoCardTitle}>{linkItem.title}</h4>
						<ReactPlayer
							url={`${publicCDNVideoUrl}${linkItem.hostedLink}.mp4`}
							controls
							pip
							playing={false}
							volume={0.3}
							height='100%'
							width='100%'
						/>
					</div>
				))}
			</div>
		</div>
	);
};
