import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { WorldMap } from "./WorldMap";

jest.mock("next/router", () => ({
	useRouter: jest.fn(),
}));

describe("WorldMap", () => {
	const push = jest.fn();

	beforeEach(() => {
		push.mockClear();
		(useRouter as jest.Mock).mockReturnValue({ push });
	});

	it("renders a pin for every visited place", () => {
		render(<WorldMap />);

		expect(screen.getAllByRole("button")).toHaveLength(49);
	});

	it("shows the place label and trailer when a pin is selected", () => {
		render(<WorldMap />);

		fireEvent.click(
			screen.getByRole("button", { name: "Erbil, Kuwait and Iraqi Kurdistan 2023" }),
		);

		expect(screen.getByText("Erbil 2023")).toBeTruthy();
		const trailer = screen.getByTestId("evasive-trailer");
		expect(trailer.querySelector("video")?.src).toContain(
			"kuwaitiraqikurdistantrailer.mp4",
		);
	});

	it("highlights every country in the selected trip's group", () => {
		const { container } = render(<WorldMap />);

		fireEvent.click(
			screen.getByRole("button", { name: "Erbil, Kuwait and Iraqi Kurdistan 2023" }),
		);

		const highlighted = container.querySelectorAll(
			"path[class*='countryHighlighted']",
		);
		expect(highlighted).toHaveLength(2);
	});

	it("deselects when the same pin is clicked again", () => {
		render(<WorldMap />);
		const pin = screen.getByRole("button", {
			name: "Erbil, Kuwait and Iraqi Kurdistan 2023",
		});

		fireEvent.click(pin);
		fireEvent.click(pin);

		expect(screen.queryByText("Erbil 2023")).toBeNull();
		expect(screen.queryByTestId("evasive-trailer")).toBeNull();
	});

	it("deselects on a background click", () => {
		const { container } = render(<WorldMap />);

		fireEvent.click(
			screen.getByRole("button", { name: "Kathmandu, Nepal 2018" }),
		);
		fireEvent.click(container.firstChild as Element);

		expect(screen.queryByText("Kathmandu 2018")).toBeNull();
	});

	it("deselects on Escape", () => {
		render(<WorldMap />);

		fireEvent.click(
			screen.getByRole("button", { name: "Kathmandu, Nepal 2018" }),
		);
		fireEvent.keyDown(window, { key: "Escape" });

		expect(screen.queryByText("Kathmandu 2018")).toBeNull();
	});

	it("selects a pin with the keyboard", () => {
		render(<WorldMap />);

		fireEvent.keyDown(
			screen.getByRole("button", { name: "Kathmandu, Nepal 2018" }),
			{ key: "Enter" },
		);

		expect(screen.getByText("Kathmandu 2018")).toBeTruthy();
	});

	it("navigates to the trip page when the label is clicked", () => {
		render(<WorldMap />);

		fireEvent.click(
			screen.getByRole("button", { name: "Erbil, Kuwait and Iraqi Kurdistan 2023" }),
		);
		fireEvent.click(screen.getByRole("link"));

		expect(push).toHaveBeenCalledWith("/travel/kuwait-iraqi-kurdistan");
	});
});
