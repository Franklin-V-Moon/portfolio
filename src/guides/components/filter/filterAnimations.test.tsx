import React from "react";
import { render } from "@testing-library/react";
import {
	addTransparency,
	closeMenu,
	keyboardNavigation,
	slideTransition,
} from "./filterAnimations";

jest.mock("@mui/material", () => ({
	Slide: jest.fn(() => null),
}));

import { Slide } from "@mui/material";

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
	it("closes the menu on Tab without preventing default", () => {
		const setOpen = jest.fn();
		const preventDefault = jest.fn();
		keyboardNavigation(
			{ key: "Tab", preventDefault } as unknown as React.KeyboardEvent,
			setOpen,
		);
		expect(preventDefault).not.toHaveBeenCalled();
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

describe("slideTransition()", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("uses the normal 550ms timeout when reduced motion is not preferred", () => {
		(window.matchMedia as jest.Mock).mockReturnValue({
			matches: false,
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
		});

		const Transition = slideTransition("right");
		render(
			<Transition in>
				<div>content</div>
			</Transition>,
		);

		expect((Slide as jest.Mock).mock.calls[0][0]).toMatchObject({
			direction: "right",
			timeout: 550,
		});
	});

	it("uses an instant timeout when reduced motion is preferred", () => {
		(window.matchMedia as jest.Mock).mockReturnValue({
			matches: true,
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
		});

		const Transition = slideTransition("left");
		render(
			<Transition in>
				<div>content</div>
			</Transition>,
		);

		expect((Slide as jest.Mock).mock.calls[0][0]).toMatchObject({
			direction: "left",
			timeout: 0,
		});
	});
});
