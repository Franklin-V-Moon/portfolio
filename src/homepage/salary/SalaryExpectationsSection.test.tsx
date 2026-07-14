import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { SalaryExpectationsSection } from "./SalaryExpectationsSection";

describe("SalaryExpectationsSection", () => {
	it("renders initial elements correctly", () => {
		const { getByText } = render(<SalaryExpectationsSection />);

		expect(getByText("$83,000")).toBeDefined();
		expect(getByText("Proposed Annual Salary")).toBeDefined();
		expect(getByText("Fully Remote")).toBeDefined();
		expect(getByText("Hybrid Remote")).toBeDefined();
		expect(getByText("Clear All")).toBeDefined();
	});

	it("updates the proposed salary when a input value is changed", () => {
		const { getByLabelText, getByText } = render(<SalaryExpectationsSection />);

		const trainingInput = getByLabelText("Training Allowance");

		fireEvent.change(trainingInput, { target: { value: "5000" } });

		expect(getByText("$80,300")).toBeDefined();
	});

	it("sets all toggles as undefined when clear all button pressed", () => {
		const { getByText } = render(<SalaryExpectationsSection />);

		const fullyRemoteCheckbox = getByText("Fully Remote")
			.previousSibling as HTMLInputElement;
		fireEvent.click(fullyRemoteCheckbox);

		const clearAllButton = getByText("Clear All");
		fireEvent.click(clearAllButton);

		expect(fullyRemoteCheckbox.checked).toBe(undefined);
	});

	it("renders the country scale name as a level 3 heading", () => {
		render(<SalaryExpectationsSection />);

		expect(screen.getByRole("heading", { level: 3 }).textContent).toBe(
			"Australia",
		);
	});
});
