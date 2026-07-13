import { render, fireEvent } from "@testing-library/react";
import { Languages, Tags, Topic } from "../../types";
import { FilterModal } from "./FilterModal";

describe("FilterModal", () => {
	const topicFilter = Topic.Programming;
	const languagesFilter = [Languages.Typescript];
	const tagsFilter = [Tags.CodeBlock];

	const setTopicFilter = jest.fn();
	const setFilteredLanguages = jest.fn();
	const setTagsFilter = jest.fn();
	const setShowFilterMenu = jest.fn();
	const handleClearAll = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("Renders the filter dialog window with pre-filled values", () => {
		const { getByText, getAllByText } = render(
			FilterModal(
				topicFilter,
				setTopicFilter,
				languagesFilter,
				setFilteredLanguages,
				tagsFilter,
				setTagsFilter,
				setShowFilterMenu,
				false,
				handleClearAll,
			),
		);

		expect(getByText("Filter")).toBeDefined();

		expect(getAllByText("Topic")).toBeDefined();
		expect(getByText("Programming")).toBeDefined();

		expect(getAllByText("Languages")).toBeDefined();
		expect(getByText("Typescript")).toBeDefined();

		expect(getAllByText("Tags")).toBeDefined();
		expect(getByText("Snippet")).toBeDefined();
	});

	it("disables Clear All when disableClearAll is true", () => {
		const { getByRole } = render(
			FilterModal(
				topicFilter,
				setTopicFilter,
				languagesFilter,
				setFilteredLanguages,
				tagsFilter,
				setTagsFilter,
				setShowFilterMenu,
				true,
				handleClearAll,
			),
		);

		expect(getByRole("button", { name: "Clear All" })).toHaveProperty(
			"disabled",
			true,
		);
	});

	it("calls handleClearAll when Clear All is clicked", () => {
		const { getByRole } = render(
			FilterModal(
				topicFilter,
				setTopicFilter,
				languagesFilter,
				setFilteredLanguages,
				tagsFilter,
				setTagsFilter,
				setShowFilterMenu,
				false,
				handleClearAll,
			),
		);

		fireEvent.click(getByRole("button", { name: "Clear All" }));

		expect(handleClearAll).toHaveBeenCalledTimes(1);
	});
});
