import React from "react";
import { render } from "@testing-library/react";
import { ParallaxArt } from "./ParallaxArt";

describe("ParallaxArt", () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	const scheduledScrollLoop = (rafSpy: jest.SpyInstance) =>
		rafSpy.mock.calls.some(
			([callback]) =>
				(callback as { name?: string }).name === "handleScrollAnimation",
		);

	it("starts the scroll parallax loop when reduced motion is not preferred", () => {
		(window.matchMedia as jest.Mock).mockReturnValue({
			matches: false,
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
		});
		const rafSpy = jest.spyOn(window, "requestAnimationFrame");

		render(<ParallaxArt />);

		expect(scheduledScrollLoop(rafSpy)).toBe(true);
	});

	it("does not start the scroll parallax loop when reduced motion is preferred", () => {
		(window.matchMedia as jest.Mock).mockReturnValue({
			matches: true,
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
		});
		const rafSpy = jest.spyOn(window, "requestAnimationFrame");

		render(<ParallaxArt />);

		expect(scheduledScrollLoop(rafSpy)).toBe(false);
	});

	it("does not animate the outer container's load-in fade when reduced motion is preferred", () => {
		(window.matchMedia as jest.Mock).mockReturnValue({
			matches: true,
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
		});

		const { container } = render(<ParallaxArt />);

		expect((container.firstChild as HTMLElement).style.animation).toBe(
			"none",
		);
	});
});
