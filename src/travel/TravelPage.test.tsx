import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/router";
import Travel from "../../pages/travel/index";

jest.mock("next/router", () => ({
	useRouter: jest.fn(),
}));

describe("Travel page", () => {
	beforeEach(() => {
		window.history.replaceState(null, "", "/travel");
		(useRouter as jest.Mock).mockReturnValue({
			pathname: "/travel",
			push: jest.fn(),
		});
	});

	it("selecting a sort option via TravelSort updates the URL's SortBy param", async () => {
		render(<Travel initialSortBy={null} initialSearchingText='' />);

		fireEvent.click(screen.getByRole("button", { name: "Sort By" }));
		fireEvent.click(await screen.findByRole("menuitem", { name: "Best" }));

		await waitFor(() => {
			expect(window.location.pathname + window.location.search).toBe(
				"/travel?SortBy=Best",
			);
		});
	});

	it("typing in the search bar switches the active sort to Searching and puts the search text in the q param", async () => {
		render(<Travel initialSortBy={null} initialSearchingText='' />);

		fireEvent.change(screen.getByPlaceholderText("Search..."), {
			target: { value: "japan" },
		});

		await waitFor(() => {
			expect(window.location.pathname + window.location.search).toBe(
				"/travel?q=japan",
			);
		});
	});

	it("clearing the search text falls back to the default Newest URL state", async () => {
		render(<Travel initialSortBy={null} initialSearchingText='japan' />);

		await waitFor(() => {
			expect(window.location.search).toBe("?q=japan");
		});

		fireEvent.change(screen.getByPlaceholderText("Search..."), {
			target: { value: "" },
		});

		await waitFor(() => {
			expect(window.location.pathname + window.location.search).toBe(
				"/travel",
			);
		});
	});
});
