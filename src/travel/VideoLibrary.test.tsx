import { render } from "@testing-library/react";
import { VideoLibrary } from "./VideoLibrary";
import { TravelVideoMetaData } from "./types";

jest.mock("next/router", () => ({ push: jest.fn() }));

const buildVideo = (title: string): TravelVideoMetaData => ({
	title,
	year: 2024,
	hostedLink: title,
	link: title,
	restricted: false,
});

describe("VideoLibrary image priority", () => {
	it("gives priority to the first images in display order, not input order", () => {
		const videos = ["a", "b", "c", "d", "e", "f", "g", "h"].map(buildVideo);

		const { getAllByRole } = render(<VideoLibrary videoMetaData={videos} />);

		const images = getAllByRole("img");
		const altTexts = images.map((image) => image.getAttribute("alt"));

		expect(altTexts).toEqual([
			"h poster",
			"g poster",
			"f poster",
			"e poster",
			"d poster",
			"c poster",
			"b poster",
			"a poster",
		]);

		const priorityFlags = images.map(
			(image) => image.getAttribute("loading") !== "lazy",
		);

		expect(priorityFlags).toEqual([
			true,
			true,
			true,
			true,
			true,
			true,
			false,
			false,
		]);
	});

	it("offsets priority by startIndex so later groups on the page don't all claim priority", () => {
		const videos = ["a", "b", "c"].map(buildVideo);

		const { getAllByRole } = render(
			<VideoLibrary videoMetaData={videos} startIndex={5} />,
		);

		const images = getAllByRole("img");
		const priorityFlags = images.map(
			(image) => image.getAttribute("loading") !== "lazy",
		);

		expect(priorityFlags).toEqual([true, false, false]);
	});
});
