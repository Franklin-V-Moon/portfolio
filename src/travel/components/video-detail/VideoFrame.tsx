import { Skeleton } from "@mui/material";
import { ReactNode } from "react";
import styles from "./VideoFrame.module.scss";

export const VideoFrame = ({
	isReady,
	children,
}: {
	isReady: boolean;
	children: ReactNode;
}) => (
	<div className={styles.frame}>
		{!isReady && (
			<Skeleton
				variant='rectangular'
				animation='wave'
				width='100%'
				height='100%'
				className={styles.skeleton}
				data-testid='video-skeleton'
			/>
		)}
		{children}
	</div>
);
