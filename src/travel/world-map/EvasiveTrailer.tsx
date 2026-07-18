import { RefObject, useEffect, useState } from "react";
import { publicCDNVideoUrl } from "../../datasources/TravelMetaData";
import { evadeCursor, initialSlot, Slot, slotPositions } from "./evasion";
import styles from "./EvasiveTrailer.module.scss";

export const EvasiveTrailer = ({
	trailer,
	pinX,
	pinY,
	frameRef,
}: {
	trailer: string;
	pinX: number;
	pinY: number;
	frameRef: RefObject<HTMLDivElement | null>;
}) => {
	const [slot, setSlot] = useState<Slot>(() => initialSlot(pinX, pinY));

	useEffect(() => {
		const frame = frameRef.current;
		if (!frame) return;

		let ticking = false;
		const handleMouseMove = (event: MouseEvent) => {
			if (ticking) return;
			ticking = true;
			requestAnimationFrame(() => {
				ticking = false;
				const bounds = frame.getBoundingClientRect();
				const cursorX = (event.clientX - bounds.left) / bounds.width;
				const cursorY = (event.clientY - bounds.top) / bounds.height;
				setSlot((current) =>
					evadeCursor(cursorX, cursorY, current, pinX, pinY),
				);
			});
		};

		frame.addEventListener("mousemove", handleMouseMove);
		return () => frame.removeEventListener("mousemove", handleMouseMove);
	}, [frameRef, pinX, pinY]);

	const { left, top } = slotPositions[slot];

	return (
		<div
			className={styles.trailerBox}
			data-testid='evasive-trailer'
			style={{ left: `${left * 100}%`, top: `${top * 100}%` }}>
			<video
				className={styles.trailerVideo}
				src={`${publicCDNVideoUrl}${trailer}.mp4`}
				autoPlay
				muted
				loop
				playsInline
				preload='auto'
			/>
		</div>
	);
};
