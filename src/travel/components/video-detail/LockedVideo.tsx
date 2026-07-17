import Image from "next/image";
import { useState } from "react";
import { IconButton, Tooltip, Zoom } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { videoEnabled } from "../../travelDataService";
import { TravelVideoMetaData } from "../../types";
import { Trailer } from "./Trailer";
import { VideoFrame } from "./VideoFrame";
import styles from "./LockedVideo.module.scss";

const UNLOCK_LABEL = "Enter password to unlock this video";

export const LockedVideo = ({ metaData }: { metaData: TravelVideoMetaData }) => {
	const { extras } = metaData;
	const [isTrailerReady, setIsTrailerReady] = useState(false);

	const unlockButton = (
		<Tooltip slots={{ transition: Zoom }} title={UNLOCK_LABEL}>
			<IconButton
				onClick={() => videoEnabled(metaData)}
				aria-label={UNLOCK_LABEL}
				className={styles.unlockButton}>
				<LockIcon style={{ fontSize: "40px" }} />
			</IconButton>
		</Tooltip>
	);

	return (
		<div className={styles.comingSoon}>
			{extras?.trailer ? (
				<VideoFrame isReady={isTrailerReady}>
					{unlockButton}
					<Trailer
						trailer={extras.trailer}
						ctaLabel='CLICK/TAP TO UNLOCK'
						onReady={() => setIsTrailerReady(true)}
					/>
				</VideoFrame>
			) : (
				<div className={styles.noVideoContainer}>
					<Image
						src={"/travel/editingAstronaut.png"}
						alt={"No video placeholder image"}
						height={300}
						width={640}
						sizes='100vw'
						className={styles.noVideoImage}
						style={{ width: "100%", height: "auto", objectFit: "cover" }}
					/>
					{unlockButton}
					<div className={styles.noVideoCta}>TAP TO UNLOCK</div>
				</div>
			)}
		</div>
	);
};
