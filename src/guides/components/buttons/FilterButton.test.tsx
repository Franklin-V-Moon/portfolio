import { fireEvent, render, screen } from "@testing-library/react";
import { FilterButton } from "./FilterButton";

describe("FilterButton", () => {
	it("calls setShowFilterMenu with true when clicked", () => {
		const setShowFilterMenu = jest.fn();
		render(
			<FilterButton
				setShowFilterMenu={setShowFilterMenu}
				showFilterMenu={false}
			/>,
		);

		fireEvent.click(screen.getByRole("button", { name: "Filter" }));

		expect(setShowFilterMenu).toHaveBeenCalledWith(true);
	});

	it("indicates it controls a dialog", () => {
		render(
			<FilterButton setShowFilterMenu={jest.fn()} showFilterMenu={false} />,
		);

		expect(
			screen.getByRole("button", { name: "Filter" }).getAttribute(
				"aria-haspopup",
			),
		).toBe("dialog");
	});

	it("sets aria-expanded to true when the filter menu is open", () => {
		render(
			<FilterButton setShowFilterMenu={jest.fn()} showFilterMenu={true} />,
		);

		expect(
			screen.getByRole("button", { name: "Filter" }).getAttribute(
				"aria-expanded",
			),
		).toBe("true");
	});

	it("omits aria-expanded when the filter menu is closed", () => {
		render(
			<FilterButton setShowFilterMenu={jest.fn()} showFilterMenu={false} />,
		);

		expect(
			screen.getByRole("button", { name: "Filter" }).getAttribute(
				"aria-expanded",
			),
		).toBeNull();
	});
});
