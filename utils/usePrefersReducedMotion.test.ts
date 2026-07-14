import { renderHook } from "@testing-library/react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

describe("usePrefersReducedMotion()", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("returns false when the OS has no reduced-motion preference", () => {
		(window.matchMedia as jest.Mock).mockReturnValue({
			matches: false,
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
		});

		const { result } = renderHook(() => usePrefersReducedMotion());

		expect(result.current).toBe(false);
	});

	it("returns true when the OS prefers reduced motion", () => {
		(window.matchMedia as jest.Mock).mockReturnValue({
			matches: true,
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
		});

		const { result } = renderHook(() => usePrefersReducedMotion());

		expect(result.current).toBe(true);
	});
});
