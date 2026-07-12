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
		(useRouter as jest.Mock).mockReturnValue({
			isReady: true,
			pathname: "/guides",
			query: { topic: Topic.Agile },
			replace: mockReplace,
		});
	});

	it("clears filter params from the URL when Clear All is clicked", async () => {
		render(<Guides />);

		await waitFor(() => {
			expect(mockReplace).toHaveBeenCalledWith(
				expect.objectContaining({ query: { topic: Topic.Agile } }),
				undefined,
				{ shallow: true },
			);
		});

		fireEvent.click(screen.getByRole("button", { name: "Filter" }));

		const clearAllButton = await screen.findByRole("button", {
			name: "Clear All",
		});
		fireEvent.click(clearAllButton);

		await waitFor(() => {
			const lastCall = mockReplace.mock.calls.at(-1);
			expect(lastCall?.[0].query).toEqual({});
		});
	});

	it("selecting a topic via the UI then clearing removes it from the URL", async () => {
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
			const lastCall = mockReplace.mock.calls.at(-1);
			expect(lastCall?.[0].query).toEqual({});
		});
	});
});
