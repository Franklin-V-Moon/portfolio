import { render } from "@testing-library/react";
import { ForYouCard } from "./ForYouCard";

describe("ForYouCard component", () => {
	it("renders correctly with given props", () => {
		const logo = "testLogo";
		const title = "Test Title";
		const paragraph = "This is a test sentence. This is another test sentence.";

		const { getByText } = render(
			<ForYouCard logo={logo} title={title} paragraph={paragraph} />,
		);

		expect(getByText(title)).toBeDefined();
		expect(getByText("This is a test sentence.")).toBeDefined();
		expect(getByText("This is another test sentence.")).toBeDefined();
	});
});
