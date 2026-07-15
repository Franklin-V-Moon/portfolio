import { createEvent, fireEvent, render, screen } from "@testing-library/react";
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

	it("prevents the native anchor navigation on a plain click, so the router handles it client-side", () => {
		(useRouter as jest.Mock).mockReturnValue({
			pathname: "/",
			replace: jest.fn(),
		});

		render(<Navbar />);

		const clickEvent = createEvent.click(
			screen.getByRole("tab", { name: "GUIDES" }),
		);
		fireEvent(screen.getByRole("tab", { name: "GUIDES" }), clickEvent);

		expect(clickEvent.defaultPrevented).toBe(true);
	});

	it("leaves modifier-key clicks alone so ctrl/cmd/shift/middle-click can still open a new tab", () => {
		const replace = jest.fn();
		(useRouter as jest.Mock).mockReturnValue({
			pathname: "/",
			replace,
		});

		render(<Navbar />);

		const guidesTab = screen.getByRole("tab", { name: "GUIDES" });
		fireEvent.click(guidesTab, { metaKey: true });
		fireEvent.click(guidesTab, { ctrlKey: true });
		fireEvent.click(guidesTab, { shiftKey: true });
		fireEvent.click(guidesTab, { altKey: true });
		fireEvent.click(guidesTab, { button: 1 });

		expect(replace).not.toHaveBeenCalled();
	});

	it("sets aria-current='page' on the active tab", () => {
		(useRouter as jest.Mock).mockReturnValue({
			pathname: "/guides",
			replace: jest.fn(),
		});

		render(<Navbar />);

		const guidesTab = screen.getByRole("tab", { name: "GUIDES" });
		expect(guidesTab.getAttribute("aria-current")).toBe("page");
	});

	it("does not set aria-current on inactive tabs", () => {
		(useRouter as jest.Mock).mockReturnValue({
			pathname: "/",
			replace: jest.fn(),
		});

		render(<Navbar />);

		const guidesTab = screen.getByRole("tab", { name: "GUIDES" });
		expect(guidesTab.getAttribute("aria-current")).toBeNull();
	});

	it("gives each nav tab an ascending positive tabIndex, reserving 1 for the skip link", () => {
		(useRouter as jest.Mock).mockReturnValue({
			pathname: "/",
			replace: jest.fn(),
		});

		render(<Navbar />);

		expect(
			screen.getByRole("tab", { name: "PORTFOLIO" }).getAttribute("tabindex"),
		).toBe("2");
		expect(
			screen.getByRole("tab", { name: "GUIDES" }).getAttribute("tabindex"),
		).toBe("3");
		expect(
			screen.getByRole("tab", { name: "TRAVEL" }).getAttribute("tabindex"),
		).toBe("4");
	});
});
