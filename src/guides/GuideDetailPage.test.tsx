import { render, screen } from "@testing-library/react";
import PageContent from "../../pages/guides/[link]";
import { Topic } from "./types";

jest.mock("notion-client", () => ({
	NotionAPI: jest.fn(),
}));

jest.mock("react-notion-x", () => ({
	NotionRenderer: () => null,
}));

jest.mock("next/dynamic", () => () => () => null);

jest.mock("next/router", () => ({
	replace: jest.fn(),
	useRouter: () => ({ pathname: "/guides/how-to-do-a-thing" }),
}));

describe("Guide detail page", () => {
	const metaData = {
		title: "How To Do A Thing",
		link: "how-to-do-a-thing",
		notionPage: "abc123",
		created: 1700000000,
		thumbnail: "/guides/thumbnail.png",
		subTitle: "A subtitle",
		topic: Topic.Programming,
	};

	it("renders a visually hidden h1 with the guide's title", () => {
		render(<PageContent notionPage={{} as any} metaData={metaData} />);

		const heading = screen.getByRole("heading", { level: 1 });
		expect(heading.textContent).toBe(metaData.title);
		expect(heading.className).toContain("visuallyHidden");
	});
});
