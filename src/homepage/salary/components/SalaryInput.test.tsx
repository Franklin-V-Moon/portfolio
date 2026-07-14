import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { MoneyInput as SalaryInput } from "./SalaryInput";

describe("SalaryInput", () => {
	const setup = () => {
		const onChange = jest.fn();
		const onClear = jest.fn();

		render(
			<SalaryInput
				name='stock'
				title='Stock Options & Shares'
				value={1000}
				onChange={onChange}
				onClear={onClear}
				description='description'
			/>,
		);

		return { onClear };
	};

	it("exposes the clear control as a button with an accessible name", () => {
		setup();

		const clearButton = screen.getByRole("button", { name: "Clear" });

		expect(clearButton.tagName).toBe("BUTTON");
	});

	it("calls onClear when the clear button is pressed", () => {
		const { onClear } = setup();

		fireEvent.click(screen.getByRole("button", { name: "Clear" }));

		expect(onClear).toHaveBeenCalledWith("stock");
	});
});
