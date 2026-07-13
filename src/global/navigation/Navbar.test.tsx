import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { Navbar } from "./Navbar";

jest.mock("next/router", () => ({
	useRouter: jest.fn(),
}));

describe("Navbar component", () => {
	it("renders the navbar correctly", () => {
		(useRouter as jest.Mock).mockReturnValue({
			pathname: "/",
			replace: jest.fn(),
		});

		const { getByText } = render(<Navbar />);
		expect(getByText("PORTFOLIO")).toBeDefined();
		expect(getByText("GUIDES")).toBeDefined();
		expect(getByText("TRAVEL")).toBeDefined();
	});

	it("selects the GUIDES tab when the pathname is /guides", () => {
		(useRouter as jest.Mock).mockReturnValue({
			pathname: "/guides",
			replace: jest.fn(),
		});

		render(<Navbar />);

		expect(
			screen.getByRole("tab", { name: "GUIDES" }).getAttribute("aria-selected"),
		).toBe("true");
	});

	it("selects the GUIDES tab when the pathname is a guides sub-route", () => {
		(useRouter as jest.Mock).mockReturnValue({
			pathname: "/guides/some-post",
			replace: jest.fn(),
		});

		render(<Navbar />);

		expect(
			screen.getByRole("tab", { name: "GUIDES" }).getAttribute("aria-selected"),
		).toBe("true");
	});

	it("selects the PORTFOLIO tab when the pathname is unrecognized", () => {
		(useRouter as jest.Mock).mockReturnValue({
			pathname: "/some-random-page",
			replace: jest.fn(),
		});

		render(<Navbar />);

		expect(
			screen
				.getByRole("tab", { name: "PORTFOLIO" })
				.getAttribute("aria-selected"),
		).toBe("true");
	});

	it("calls router.replace with the tab's route when clicked", () => {
		const replace = jest.fn();
		(useRouter as jest.Mock).mockReturnValue({
			pathname: "/",
			replace,
		});

		render(<Navbar />);

		fireEvent.click(screen.getByRole("tab", { name: "GUIDES" }));

		expect(replace).toHaveBeenCalledWith("/guides");
	});
});
