import { fireEvent, render, screen } from "@testing-library/react";
import { SortButton } from "./SortButton";
import { SortOptions } from "../../types";

describe("SortButton", () => {
	it("does not show sort options before the Sort button is clicked", () => {
		render(
			<SortButton
				setSortMetaDataBy={jest.fn()}
				sortBy={SortOptions.Newest}
			/>,
		);

		expect(screen.queryByRole("menuitem", { name: /Newest/ })).toBeNull();
	});

	it("shows sort options after the Sort button is clicked", async () => {
		render(
			<SortButton
				setSortMetaDataBy={jest.fn()}
				sortBy={SortOptions.Newest}
			/>,
		);

		fireEvent.click(screen.getByRole("button", { name: "Sort" }));

		expect(
			await screen.findByRole("menuitem", { name: /Newest/ }),
		).toBeDefined();
		expect(screen.getByRole("menuitem", { name: /Oldest/ })).toBeDefined();
		expect(
			screen.getByRole("menuitem", { name: /Alphabetical/ }),
		).toBeDefined();
	});

	it("calls setSortMetaDataBy with Newest when Newest is clicked", async () => {
		const setSortMetaDataBy = jest.fn();
		render(
			<SortButton
				setSortMetaDataBy={setSortMetaDataBy}
				sortBy={SortOptions.Newest}
			/>,
		);

		fireEvent.click(screen.getByRole("button", { name: "Sort" }));
		fireEvent.click(await screen.findByRole("menuitem", { name: /Newest/ }));

		expect(setSortMetaDataBy).toHaveBeenCalledWith(SortOptions.Newest);
	});

	it("calls setSortMetaDataBy with Oldest when Oldest is clicked", async () => {
		const setSortMetaDataBy = jest.fn();
		render(
			<SortButton
				setSortMetaDataBy={setSortMetaDataBy}
				sortBy={SortOptions.Newest}
			/>,
		);

		fireEvent.click(screen.getByRole("button", { name: "Sort" }));
		fireEvent.click(await screen.findByRole("menuitem", { name: /Oldest/ }));

		expect(setSortMetaDataBy).toHaveBeenCalledWith(SortOptions.Oldest);
	});

	it("calls setSortMetaDataBy with Alphabetical when Alphabetical is clicked", async () => {
		const setSortMetaDataBy = jest.fn();
		render(
			<SortButton
				setSortMetaDataBy={setSortMetaDataBy}
				sortBy={SortOptions.Newest}
			/>,
		);

		fireEvent.click(screen.getByRole("button", { name: "Sort" }));
		fireEvent.click(
			await screen.findByRole("menuitem", { name: /Alphabetical/ }),
		);

		expect(setSortMetaDataBy).toHaveBeenCalledWith(SortOptions.Alphabetical);
	});

	it("hides the Alphabetical option when alphabetical is false", async () => {
		render(
			<SortButton
				setSortMetaDataBy={jest.fn()}
				sortBy={SortOptions.Newest}
				alphabetical={false}
			/>,
		);

		fireEvent.click(screen.getByRole("button", { name: "Sort" }));

		await screen.findByRole("menuitem", { name: /Newest/ });
		expect(
			screen.queryByRole("menuitem", { name: /Alphabetical/ }),
		).toBeNull();
	});

	it("ties the menu to the trigger button via aria-controls/aria-labelledby", async () => {
		render(
			<SortButton
				setSortMetaDataBy={jest.fn()}
				sortBy={SortOptions.Newest}
			/>,
		);

		const button = screen.getByRole("button", { name: "Sort" });
		fireEvent.click(button);

		const menu = await screen.findByRole("menu");
		expect(button.getAttribute("id")).toBeTruthy();
		expect(menu.getAttribute("id")).toBe(button.getAttribute("aria-controls"));
		expect(menu.getAttribute("aria-labelledby")).toBe(button.getAttribute("id"));
	});

	it("marks the currently active sort option with aria-current", async () => {
		render(
			<SortButton
				setSortMetaDataBy={jest.fn()}
				sortBy={SortOptions.Oldest}
			/>,
		);

		fireEvent.click(screen.getByRole("button", { name: "Sort" }));

		const oldest = await screen.findByRole("menuitem", { name: /Oldest/ });
		const newest = screen.getByRole("menuitem", { name: /Newest/ });

		expect(oldest.getAttribute("aria-current")).toBe("true");
		expect(newest.getAttribute("aria-current")).toBeNull();
	});
});
