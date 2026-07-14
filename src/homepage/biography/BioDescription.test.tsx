import { render, screen } from "@testing-library/react";
import { BioDescription } from "./BioDescription";

describe("BioDescription", () => {
	it("renders the correct text and elements", () => {
		const { getByText } = render(<BioDescription />);

		expect(getByText("Franklin")).toBeDefined();
		expect(getByText("V Moon")).toBeDefined();
	});

	it("does not render a main landmark", () => {
		const { queryByRole } = render(<BioDescription />);

		expect(queryByRole("main")).toBeNull();
	});

	it("renders a visually hidden h1 with the person's name and role", () => {
		render(<BioDescription />);

		const heading = screen.getByRole("heading", { level: 1 });
		expect(heading.textContent).toBe(
			"Franklin Von Moon — Software Engineer & Traveler",
		);
		expect(heading.className).toContain("visuallyHidden");
	});
});
