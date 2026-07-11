import { render } from "@testing-library/react";
import { Navbar } from "./Navbar";

jest.mock("next/router", () => {
	return {
		useRouter: jest.fn().mockImplementation(() => {
			return {
				pathname: "/",
				replace: jest.fn(),
			};
		}),
	};
});

describe("Navbar component", () => {
	it("renders the navbar correctly", () => {
		const { getByText } = render(<Navbar />);
		expect(getByText("PORTFOLIO")).toBeDefined();
		expect(getByText("GUIDES")).toBeDefined();
		expect(getByText("TRAVEL")).toBeDefined();
	});
});
