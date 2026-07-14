import { render, screen } from "@testing-library/react";
import { FolioColumn } from "./FolioColumn";
import { Proficiency } from "../types";

describe("FolioColumn component", () => {
	const title = "Folio Column Title";
	const metaData = [
		{
			title: "Group 1",
			data: [
				{
					title: "title",
					knowledge: "knowledge",
					proficiency: Proficiency.Capable,
					description: "description",
				},
				{
					title: "title2",
					knowledge: "knowledge 2",
					proficiency: Proficiency.Proficient,
					description: "description 2",
				},
			],
		},
		{
			title: "Group 2",
			data: [
				{
					title: "title 3",
					knowledge: "knowledge 3",
					proficiency: Proficiency.Capable,
					description: "description 3",
				},
				{
					title: "title 4",
					knowledge: "knowledge 4",
					proficiency: Proficiency.Proficient,
					description: "description 4",
				},
			],
		},
	];
	const handleOpenModal = jest.fn();

	it("should render the component correctly", () => {
		const { getByText } = render(
			<FolioColumn
				title={title}
				metaData={metaData}
				handleOpenModal={handleOpenModal}
			/>,
		);

		expect(getByText(title)).toBeDefined();
		expect(getByText(metaData[0].title)).toBeDefined();
		expect(getByText(metaData[0].data[0].title)).toBeDefined();
		expect(getByText(metaData[1].title)).toBeDefined();
		expect(getByText(metaData[1].data[1].title)).toBeDefined();
		expect(handleOpenModal).toHaveBeenCalledTimes(0);
	});

	it("renders each group title as a level 3 heading", () => {
		render(
			<FolioColumn
				title={title}
				metaData={metaData}
				handleOpenModal={handleOpenModal}
			/>,
		);

		const headings = screen.getAllByRole("heading", { level: 3 });
		expect(headings.map((heading) => heading.textContent)).toEqual([
			metaData[0].title,
			metaData[1].title,
		]);
	});

	it("should call the handleOpenModal function when FolioGrouping component is clicked", () => {
		const { getByText } = render(
			<FolioColumn
				title={title}
				metaData={metaData}
				handleOpenModal={handleOpenModal}
			/>,
		);

		const folio = getByText(metaData[0].data[0].title);
		folio.click();

		expect(handleOpenModal).toHaveBeenCalledWith(metaData[0].data[0]);
		expect(handleOpenModal).toHaveBeenCalledTimes(1);
	});
});
