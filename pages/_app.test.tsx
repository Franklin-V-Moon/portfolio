import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import MyApp from "./_app";

jest.mock("next/router", () => ({
	useRouter: jest.fn(),
}));

jest.mock("@vercel/analytics/react", () => ({
	Analytics: () => null,
}));

const DummyPage = () => <button>Page content button</button>;

describe("MyApp focus order", () => {
	beforeEach(() => {
		(useRouter as jest.Mock).mockReturnValue({
			pathname: "/",
			replace: jest.fn(),
		});
	});

	it("puts the skip link and primary nav ahead of page content in tab order", () => {
		render(<MyApp Component={DummyPage} pageProps={{}} />);

		const focusable = Array.from(
			document.querySelectorAll<HTMLElement>("a[href], button, [tabindex]"),
		).filter((el) => el.getAttribute("tabindex") !== "-1");

		const positiveTabbed = focusable
			.filter((el) => Number(el.getAttribute("tabindex")) > 0)
			.sort(
				(a, b) => Number(a.getAttribute("tabindex")) - Number(b.getAttribute("tabindex")),
			);

		const labels = positiveTabbed.map((el) => el.textContent?.trim());

		expect(labels).toEqual(["Skip to content", "PORTFOLIO", "GUIDES", "TRAVEL"]);

		const pageContentButton = screen.getByText("Page content button");
		expect(pageContentButton.getAttribute("tabindex")).toBeNull();
	});
});
