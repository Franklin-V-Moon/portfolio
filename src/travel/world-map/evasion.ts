export type Slot = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

export const VIDEO_WIDTH_RATIO = 0.28;
export const VIDEO_HEIGHT_RATIO = 0.4;
const EVASION_PADDING = 0.06;

export const slotPositions: Record<Slot, { left: number; top: number }> = {
	topLeft: { left: 0.02, top: 0.05 },
	topRight: { left: 0.7, top: 0.05 },
	bottomLeft: { left: 0.02, top: 0.55 },
	bottomRight: { left: 0.7, top: 0.55 },
};

const slotCenter = (slot: Slot) => ({
	x: slotPositions[slot].left + VIDEO_WIDTH_RATIO / 2,
	y: slotPositions[slot].top + VIDEO_HEIGHT_RATIO / 2,
});

export const quadrantOf = (x: number, y: number): Slot => {
	if (x < 0.5) {
		return y < 0.5 ? "topLeft" : "bottomLeft";
	}
	return y < 0.5 ? "topRight" : "bottomRight";
};

const oppositeSlot: Record<Slot, Slot> = {
	topLeft: "bottomRight",
	topRight: "bottomLeft",
	bottomLeft: "topRight",
	bottomRight: "topLeft",
};

export const initialSlot = (pinX: number, pinY: number): Slot =>
	oppositeSlot[quadrantOf(pinX, pinY)];

export const cursorNearSlot = (
	cursorX: number,
	cursorY: number,
	slot: Slot,
): boolean => {
	const { left, top } = slotPositions[slot];

	return (
		cursorX > left - EVASION_PADDING &&
		cursorX < left + VIDEO_WIDTH_RATIO + EVASION_PADDING &&
		cursorY > top - EVASION_PADDING &&
		cursorY < top + VIDEO_HEIGHT_RATIO + EVASION_PADDING
	);
};

export const evadeCursor = (
	cursorX: number,
	cursorY: number,
	currentSlot: Slot,
	pinX: number,
	pinY: number,
): Slot => {
	if (!cursorNearSlot(cursorX, cursorY, currentSlot)) {
		return currentSlot;
	}

	const pinQuadrant = quadrantOf(pinX, pinY);
	const candidates = (Object.keys(slotPositions) as Slot[]).filter(
		(slot) => slot !== currentSlot && slot !== pinQuadrant,
	);

	return candidates.reduce((farthest, slot) => {
		const center = slotCenter(slot);
		const farthestCenter = slotCenter(farthest);
		const distance = (cx: { x: number; y: number }) =>
			(cx.x - cursorX) ** 2 + (cx.y - cursorY) ** 2;

		return distance(center) > distance(farthestCenter) ? slot : farthest;
	}, candidates[0]);
};
