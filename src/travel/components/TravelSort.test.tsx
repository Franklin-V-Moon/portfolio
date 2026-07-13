import { fireEvent, render, screen } from "@testing-library/react";
import { TravelSort } from "./TravelSort";
import { SortBy } from "../types";

describe("TravelSort", () => {
	it("does not show sort options before the Sort By button is clicked", () => {
		render(<TravelSort setSortMetaDataBy={jest.fn()} />);

		expect(screen.queryByRole("menuitem", { name: "Newest" })).toBeNull();
	});

	it("shows sort options after the Sort By button is clicked", async () => {
		render(<TravelSort setSortMetaDataBy={jest.fn()} />);

		fireEvent.click(screen.getByRole("button", { name: "Sort By" }));

		expect(
			await screen.findByRole("menuitem", { name: "Newest" }),
		).toBeDefined();
		expect(screen.getByRole("menuitem", { name: "Oldest" })).toBeDefined();
		expect(screen.getByRole("menuitem", { name: "Best" })).toBeDefined();
		expect(screen.getByRole("menuitem", { name: "Worst" })).toBeDefined();
		expect(screen.getByRole("menuitem", { name: "Food" })).toBeDefined();
		expect(screen.getByRole("menuitem", { name: "Danger" })).toBeDefined();
		expect(screen.getByRole("menuitem", { name: "Funniest" })).toBeDefined();
	});

	it("never renders Searching as a menu item", async () => {
		render(<TravelSort setSortMetaDataBy={jest.fn()} />);

		fireEvent.click(screen.getByRole("button", { name: "Sort By" }));

		await screen.findByRole("menuitem", { name: "Newest" });
		expect(screen.queryByRole("menuitem", { name: "Searching" })).toBeNull();
	});

	it("calls setSortMetaDataBy with Newest when Newest is clicked", async () => {
		const setSortMetaDataBy = jest.fn();
		render(<TravelSort setSortMetaDataBy={setSortMetaDataBy} />);

		fireEvent.click(screen.getByRole("button", { name: "Sort By" }));
		fireEvent.click(await screen.findByRole("menuitem", { name: "Newest" }));

		expect(setSortMetaDataBy).toHaveBeenCalledWith(SortBy.Newest);
	});

	it("calls setSortMetaDataBy with Best when Best is clicked", async () => {
		const setSortMetaDataBy = jest.fn();
		render(<TravelSort setSortMetaDataBy={setSortMetaDataBy} />);

		fireEvent.click(screen.getByRole("button", { name: "Sort By" }));
		fireEvent.click(await screen.findByRole("menuitem", { name: "Best" }));

		expect(setSortMetaDataBy).toHaveBeenCalledWith(SortBy.Best);
	});

	it("calls setSortMetaDataBy with Funniest when Funniest is clicked", async () => {
		const setSortMetaDataBy = jest.fn();
		render(<TravelSort setSortMetaDataBy={setSortMetaDataBy} />);

		fireEvent.click(screen.getByRole("button", { name: "Sort By" }));
		fireEvent.click(
			await screen.findByRole("menuitem", { name: "Funniest" }),
		);

		expect(setSortMetaDataBy).toHaveBeenCalledWith(SortBy.Funniest);
	});
});
