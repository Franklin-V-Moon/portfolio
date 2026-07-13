/** @jest-environment node */
import { addTransparency, closeMenu, keyboardNavigation } from "./filterAnimations";

describe("closeMenu()", () => {
	it("closes the menu when the click is outside the anchor", () => {
		const setOpen = jest.fn();
		const anchorRef = { current: { contains: () => false } };
		closeMenu(
			{ target: {} } as unknown as Event,
			setOpen,
			anchorRef as unknown as React.RefObject<HTMLButtonElement>,
		);
		expect(setOpen).toHaveBeenCalledWith(false);
	});

	it("leaves the menu open when the click is on the anchor itself", () => {
		const setOpen = jest.fn();
		const anchorRef = { current: { contains: () => true } };
		closeMenu(
			{ target: {} } as unknown as Event,
			setOpen,
			anchorRef as unknown as React.RefObject<HTMLButtonElement>,
		);
		expect(setOpen).not.toHaveBeenCalled();
	});
});

describe("keyboardNavigation()", () => {
	it("closes the menu and prevents default on Tab", () => {
		const setOpen = jest.fn();
		const preventDefault = jest.fn();
		keyboardNavigation(
			{ key: "Tab", preventDefault } as unknown as React.KeyboardEvent,
			setOpen,
		);
		expect(preventDefault).toHaveBeenCalled();
		expect(setOpen).toHaveBeenCalledWith(false);
	});

	it("closes the menu on Escape without preventing default", () => {
		const setOpen = jest.fn();
		const preventDefault = jest.fn();
		keyboardNavigation(
			{ key: "Escape", preventDefault } as unknown as React.KeyboardEvent,
			setOpen,
		);
		expect(preventDefault).not.toHaveBeenCalled();
		expect(setOpen).toHaveBeenCalledWith(false);
	});

	it("does nothing on other keys", () => {
		const setOpen = jest.fn();
		keyboardNavigation(
			{ key: "a", preventDefault: jest.fn() } as unknown as React.KeyboardEvent,
			setOpen,
		);
		expect(setOpen).not.toHaveBeenCalled();
	});
});

describe("addTransparency()", () => {
	it("appends a two-digit hex alpha suffix to a color", () => {
		expect(addTransparency("#66bb6a", 1)).toBe("#66bb6aFF");
	});

	it("clamps opacity above 1 down to 1", () => {
		expect(addTransparency("#66bb6a", 2)).toBe("#66bb6aFF");
	});

	it("clamps opacity below 0 up to 0", () => {
		expect(addTransparency("#66bb6a", -1)).toBe("#66bb6a0");
	});
});
