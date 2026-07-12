import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/router";
import Guides from "../../pages/guides/index";
import { Topic } from "./types";

jest.mock("next/router", () => ({
	useRouter: jest.fn(),
}));

describe("Guides page", () => {
	const mockReplace = jest.fn();

	beforeEach(() => {
		mockReplace.mockClear();
		window.history.replaceState(null, "", "/guides");
	});

	it("clears filter params from the browser URL when Clear All is clicked", async () => {
		(useRouter as jest.Mock).mockReturnValue({
			isReady: true,
			pathname: "/guides",
			query: { topic: Topic.Agile },
			replace: mockReplace,
		});
		window.history.replaceState(null, "", "/guides?topic=Agile");

		render(<Guides />);

		fireEvent.click(screen.getByRole("button", { name: "Filter" }));

		const clearAllButton = await screen.findByRole("button", {
			name: "Clear All",
		});
		fireEvent.click(clearAllButton);

		await waitFor(() => {
			expect(window.location.pathname + window.location.search).toBe(
				"/guides",
			);
		});
	});

	it("selecting a topic via the UI then clearing removes it from the browser URL", async () => {
		(useRouter as jest.Mock).mockReturnValue({
			isReady: true,
			pathname: "/guides",
			query: {},
			replace: mockReplace,
		});

		render(<Guides />);

		fireEvent.click(screen.getByRole("button", { name: "Filter" }));
		fireEvent.mouseDown(screen.getByText("All"));
		fireEvent.click(await screen.findByRole("option", { name: "Agile" }));

		await waitFor(() => {
			const lastCall = mockReplace.mock.calls.at(-1);
			expect(lastCall?.[0].query).toEqual({ topic: Topic.Agile });
		});

		fireEvent.click(screen.getByRole("button", { name: "Clear All" }));

		await waitFor(() => {
			expect(window.location.pathname + window.location.search).toBe(
				"/guides",
			);
		});
	});

	it("keeps a non-default sort param in the browser URL when Clear All is clicked", async () => {
		(useRouter as jest.Mock).mockReturnValue({
			isReady: true,
			pathname: "/guides",
			query: { topic: Topic.Agile, sort: "oldest" },
			replace: mockReplace,
		});
		window.history.replaceState(null, "", "/guides?topic=Agile&sort=oldest");

		render(<Guides />);

		fireEvent.click(screen.getByRole("button", { name: "Filter" }));
		fireEvent.click(await screen.findByRole("button", { name: "Clear All" }));

		await waitFor(() => {
			expect(window.location.pathname + window.location.search).toBe(
				"/guides?sort=oldest",
			);
		});
	});
});
