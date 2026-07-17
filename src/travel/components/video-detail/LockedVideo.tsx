import Image from "next/image";
import { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import { videoEnabled } from "../../travelDataService";
import { TravelVideoMetaData } from "../../types";
import { Trailer } from "./Trailer";
import { VideoFrame } from "./VideoFrame";
import styles from "./LockedVideo.module.scss";

export const LockedVideo = ({ metaData }: { metaData: TravelVideoMetaData }) => {
	const { extras } = metaData;
	const [isTrailerReady, setIsTrailerReady] = useState(false);

	return (
		<div className={styles.comingSoon}>
			{extras?.trailer ? (
				<VideoFrame isReady={isTrailerReady}>
					<div className={styles.lockedTrailer}>
						<LockIcon style={{ fontSize: "60px" }} />
					</div>
					<Trailer
						trailer={extras.trailer}
						onReady={() => setIsTrailerReady(true)}
					/>
				</VideoFrame>
			) : (
				<Image
					src={"/travel/editingAstronaut.png"}
					alt={"No video placeholder image"}
					height={300}
					width={640}
					sizes='100vw'
					className={styles.noVideoImage}
					style={{ width: "100%", height: "auto", objectFit: "cover" }}
				/>
			)}
			<div className={styles.protectedVideoContainer}>
				<h5 className={styles.restrictedVideo}>
					Full Video Locked, Know The Password?
				</h5>
				<h5
					onClick={() => videoEnabled(metaData)}
					className={styles.loginButton}>
					Click Here
				</h5>
			</div>
		</div>
	);
};
