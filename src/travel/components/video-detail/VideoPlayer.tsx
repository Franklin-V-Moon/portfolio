import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type ReactPlayerType from "react-player";
import { useRouter } from "next/router";
import { Button, IconButton, Tooltip, Zoom } from "@mui/material";
import FastForwardIcon from "@mui/icons-material/FastForward";
import ShareIcon from "@mui/icons-material/Share";
import DownloadIcon from "@mui/icons-material/Download";
import { publicCDNVideoUrl } from "../../../datasources/TravelMetaData";
import { secondsToISO } from "../../videoJsonLd";
import { TravelVideoMetaData } from "../../types";
import { Trailer } from "./Trailer";
import styles from "./VideoPlayer.module.scss";

const DynamicReactPlayer = dynamic(() => import("./DynamicReactPlayer"), {
	ssr: false,
});

export const VideoPlayer = ({
	metaData,
	onDuration,
}: {
	metaData: TravelVideoMetaData;
	onDuration?: (durationISO: string) => void;
}) => {
	const { hostedLink: slug, backupLink, extras } = metaData;

	const playerRef = useRef<ReactPlayerType | null>(null);
	const router = useRouter();

	const [isPlayerReady, setIsPlayerReady] = useState(false);

	const skipTo = useCallback((timecode: number) => {
		if (playerRef.current) {
			playerRef.current.seekTo(timecode, "seconds");
		}
	}, []);

	const handleTimecodeOnLoad = useCallback(() => {
		const timecodeParam = router.query.timecode;
		if (
			timecodeParam &&
			typeof timecodeParam === "string" &&
			!isNaN(parseInt(timecodeParam))
		) {
			const timeInSeconds = parseInt(timecodeParam);
			skipTo(timeInSeconds);
		}
	}, [router.query.timecode, skipTo]);

	useEffect(() => {
		if (isPlayerReady) {
			handleTimecodeOnLoad();
		}
	}, [isPlayerReady, handleTimecodeOnLoad]);

	const handleCopyToClipboardWithTimecode = async () => {
		if (playerRef.current) {
			const currentTime = await playerRef.current.getCurrentTime();
			const baseUrl = window.location.href.split("?")[0];
			const newUrl = `${baseUrl}?timecode=${Math.floor(currentTime)}`;

			try {
				await navigator.clipboard.writeText(newUrl);
				alert(`${newUrl} \ncopied to clipboard`);
			} catch (err) {
				alert("Failed to copy link to clipboard");
			}
		}
	};

	return (
		<>
			<DynamicReactPlayer
				url={`${publicCDNVideoUrl}${slug}.mp4`}
				controls
				pip
				playerRef={playerRef}
				volume={0.3}
				height='100%'
				width='100%'
				id='player'
				playing={!!extras?.trailer}
				light={extras?.trailer && <Trailer trailer={extras.trailer} />}
				onDuration={(s) => onDuration?.(secondsToISO(s))}
				onReady={() => setIsPlayerReady(true)}
			/>
			<div className={styles.subVideoInteraction}>
				<div className={styles.skipToContainer}>
					{extras?.highlights && (
						<>
							<h5 className={styles.skipToText}>Skip to:</h5>
							<div>
								{extras.highlights.map((item) => (
									<Tooltip
										slots={{ transition: Zoom }}
										title={`Skip to the moment when the ${item.title
											.split("(")[0]
											.trim()} happened`}
										key={`Button to skip to ${item.timecode}`}>
										<Button
											variant='outlined'
											color='inherit'
											startIcon={<FastForwardIcon />}
											className={styles.skipToButton}
											onClick={() => skipTo(item.timecode)}>
											{item.title}
										</Button>
									</Tooltip>
								))}
							</div>
						</>
					)}
				</div>
				<div className={styles.share}>
					<Tooltip
						slots={{ transition: Zoom }}
						title='Copy link to this exact timestamp'>
						<IconButton
							onClick={() => handleCopyToClipboardWithTimecode()}
							color='inherit'>
							<ShareIcon fontSize='small' color='inherit' />
						</IconButton>
					</Tooltip>
				</div>
				<div>
					<Tooltip slots={{ transition: Zoom }} title='Download options'>
						<IconButton
							onClick={() => window.open(backupLink, "_blank")}
							color='inherit'>
							<DownloadIcon fontSize='medium' color='inherit' />
						</IconButton>
					</Tooltip>
				</div>
			</div>
		</>
	);
};
