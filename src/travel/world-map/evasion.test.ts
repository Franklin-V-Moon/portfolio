import {
	cursorNearSlot,
	evadeCursor,
	initialSlot,
	quadrantOf,
} from "./evasion";

describe("quadrantOf", () => {
	it("maps positions to their quadrant", () => {
		expect(quadrantOf(0.1, 0.1)).toBe("topLeft");
		expect(quadrantOf(0.9, 0.1)).toBe("topRight");
		expect(quadrantOf(0.1, 0.9)).toBe("bottomLeft");
		expect(quadrantOf(0.9, 0.9)).toBe("bottomRight");
	});
});

describe("initialSlot", () => {
	it("docks the video diagonally opposite the selected pin", () => {
		expect(initialSlot(0.85, 0.3)).toBe("bottomLeft");
		expect(initialSlot(0.6, 0.6)).toBe("topLeft");
		expect(initialSlot(0.1, 0.2)).toBe("bottomRight");
	});
});

describe("cursorNearSlot", () => {
	it("detects a cursor inside the padded video area", () => {
		expect(cursorNearSlot(0.1, 0.2, "topLeft")).toBe(true);
	});

	it("ignores a cursor far from the video", () => {
		expect(cursorNearSlot(0.9, 0.9, "topLeft")).toBe(false);
	});
});

describe("evadeCursor", () => {
	it("stays put while the cursor is far away", () => {
		expect(evadeCursor(0.9, 0.9, "topLeft", 0.5, 0.2)).toBe("topLeft");
	});

	it("flees to the farthest slot when the cursor approaches", () => {
		expect(evadeCursor(0.1, 0.15, "topLeft", 0.4, 0.3)).toBe("bottomRight");
	});

	it("never flees into the selected pin's quadrant", () => {
		const next = evadeCursor(0.1, 0.15, "topLeft", 0.85, 0.8);

		expect(next).not.toBe("bottomRight");
		expect(next).toBe("topRight");
	});

	it("never returns the slot the cursor is chasing", () => {
		const next = evadeCursor(0.15, 0.2, "topLeft", 0.9, 0.1);

		expect(next).not.toBe("topLeft");
		expect(next).not.toBe("topRight");
	});
});
