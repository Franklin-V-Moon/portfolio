import { render } from "@testing-library/react";
import { BioDescription } from "./BioDescription";

describe("BioDescription", () => {
	it("renders the correct text and elements", () => {
		const { getByText } = render(<BioDescription />);

		expect(getByText("Franklin")).toBeDefined();
		expect(getByText("V Moon")).toBeDefined();
	});
});
