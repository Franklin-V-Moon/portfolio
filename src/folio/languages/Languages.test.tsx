import { fireEvent, render, screen } from "@testing-library/react";
import { languagesMetaData } from "../../datasources/SkillsMetaData";
import { Languages } from "./Languages";

describe("Languages component", () => {
	it("renders a card heading for every skill grouping", () => {
		render(<Languages handleOpenModal={jest.fn()} />);

		languagesMetaData.forEach((group) => {
			expect(
				screen.getByRole("button", { name: group.title }),
			).toBeDefined();
		});
	});

	it("renders a bubble for every language in a grouping", () => {
		render(<Languages handleOpenModal={jest.fn()} />);

		languagesMetaData[0].data.forEach((item) => {
			expect(screen.getByRole("button", { name: item.title })).toBeDefined();
		});
	});

	it("opens the modal with the grouping details when a heading is clicked", () => {
		const handleOpenModal = jest.fn();
		render(<Languages handleOpenModal={handleOpenModal} />);

		const { title, knowledge, proficiency, description } =
			languagesMetaData[0];
		fireEvent.click(screen.getByRole("button", { name: title }));

		expect(handleOpenModal).toHaveBeenCalledWith({
			title,
			knowledge,
			proficiency,
			description,
		});
	});

	it("opens the modal with the language details when a bubble is clicked", () => {
		const handleOpenModal = jest.fn();
		render(<Languages handleOpenModal={handleOpenModal} />);

		const item = languagesMetaData[0].data[0];
		fireEvent.click(screen.getByRole("button", { name: item.title }));

		expect(handleOpenModal).toHaveBeenCalledWith(item);
	});
});
