import React from "react";
import { render } from "@testing-library/react";
import { PageContainer } from "./PageContainer";

describe("PageContainer", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders children components", () => {
		const { getByText } = render(
			<PageContainer>
				<div>Child content</div>
			</PageContainer>,
		);
		expect(getByText("Child content")).toBeDefined();
	});

	it("fades in on load when reduced motion is not preferred", () => {
		(window.matchMedia as jest.Mock).mockReturnValue({
			matches: false,
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
		});
		const { getByText } = render(
			<PageContainer>
				<div>Child content</div>
			</PageContainer>,
		);
		expect(
			getByText("Child content").parentElement?.parentElement?.style
				.animation,
		).toBe("fadeIn 1000ms ease-in-out");
	});

	it("does not animate when reduced motion is preferred", () => {
		(window.matchMedia as jest.Mock).mockReturnValue({
			matches: true,
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
		});
		const { getByText } = render(
			<PageContainer>
				<div>Child content</div>
			</PageContainer>,
		);
		expect(
			getByText("Child content").parentElement?.parentElement?.style
				.animation,
		).toBe("none");
	});
});
