import { render } from "@testing-library/react";
import { Topic } from "../../types";
import { GuideCard } from "./GuideCard";

describe("renders component information", () => {
	const mockCardData = {
		title: "Title",
		link: "link",
		notionPage: "notionPage",
		created: 123,
		thumbnail: "thumbnail.jpg",
		subTitle: "Subtitle",
		topic: Topic.Programming,
	};

	it("renders card data correctly", () => {
		const { getByText } = render(<GuideCard cardData={mockCardData} />);
		expect(getByText(mockCardData.topic)).toBeDefined();
		expect(getByText(mockCardData.title)).toBeDefined();
		expect(getByText(mockCardData.subTitle)).toBeDefined();
	});

	it("lazy-loads the thumbnail by default", () => {
		const { getByRole } = render(<GuideCard cardData={mockCardData} />);
		expect(getByRole("img").getAttribute("loading")).toBe("lazy");
	});

	it("eager-loads the thumbnail with high fetch priority when priority is set", () => {
		const { getByRole } = render(
			<GuideCard cardData={mockCardData} priority />,
		);
		const image = getByRole("img");
		expect(image.getAttribute("loading")).toBe("eager");
		expect(image.getAttribute("fetchpriority")).toBe("high");
	});
});
