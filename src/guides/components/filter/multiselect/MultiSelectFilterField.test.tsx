import { render } from "@testing-library/react";
import { Languages } from "../../../types";
import { MultiSelectFilterField } from "./MultiSelectFilterField";

describe("MultiSelectFilter", () => {
	const dropDownData = [
		Languages.Javascript,
		Languages.Typescript,
		Languages.Java,
	];
	const filter = [Languages.Typescript];
	const setFilter = jest.fn();
	const label = "Filter";
	const highlightColor = "blue";

	it("renders filter field", () => {
		const { getAllByText } = render(
			<MultiSelectFilterField
				label={label}
				filter={filter}
				setFilter={setFilter}
				dropDownData={dropDownData}
				highlightColor={highlightColor}
			/>,
		);
		expect(getAllByText(label)).toBeDefined();
	});

	it("renders the selected options as chips", () => {
		const { getByText } = render(
			<MultiSelectFilterField
				label={label}
				filter={filter}
				setFilter={setFilter}
				dropDownData={dropDownData}
				highlightColor={highlightColor}
			/>,
		);
		filter.forEach((item) => {
			expect(getByText(item)).toBeDefined();
		});
	});

	it("ties the label to the select via matching id/labelId", () => {
		const { container, getByRole } = render(
			<MultiSelectFilterField
				label={label}
				filter={filter}
				setFilter={setFilter}
				dropDownData={dropDownData}
				highlightColor={highlightColor}
			/>,
		);

		const labelEl = container.querySelector("label");
		const select = getByRole("combobox");

		expect(labelEl?.getAttribute("id")).toBeTruthy();
		expect(select.getAttribute("aria-labelledby")).toBe(
			labelEl?.getAttribute("id"),
		);
	});
});
