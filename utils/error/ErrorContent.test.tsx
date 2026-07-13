import { render, screen } from "@testing-library/react";
import { ErrorContent } from "./ErrorContent";

describe("ErrorContent", () => {
	it("renders the not found message", () => {
		render(<ErrorContent />);

		expect(screen.getByText("Not Found")).toBeDefined();
	});
});
