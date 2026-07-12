import { render, screen } from "@testing-library/react";
import { ErrorBoundary } from "./ErrorBoundary";

const ThrowingChild = () => {
	throw new Error("boom");
};

describe("ErrorBoundary", () => {
	let consoleErrorSpy: jest.SpyInstance;

	beforeEach(() => {
		consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
	});

	afterEach(() => {
		consoleErrorSpy.mockRestore();
	});

	it("renders children when there is no error", () => {
		render(
			<ErrorBoundary>
				<div>safe content</div>
			</ErrorBoundary>,
		);

		expect(screen.getByText("safe content")).toBeDefined();
	});

	it("renders fallback content when a child throws", () => {
		render(
			<ErrorBoundary>
				<ThrowingChild />
			</ErrorBoundary>,
		);

		expect(screen.getByText("Something went wrong")).toBeDefined();
	});
});
