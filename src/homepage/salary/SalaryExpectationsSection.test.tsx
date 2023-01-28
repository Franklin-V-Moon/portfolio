import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { SalaryExpectationsSection } from "./SalaryExpectationsSection";

describe("SalaryExpectationsSection", () => {
	it("renders initial elements correctly", () => {
		const { getByText } = render(<SalaryExpectationsSection />);

		expect(getByText("$65,000")).toBeDefined();
		expect(getByText("Proposed Annual Salary")).toBeDefined();
		expect(getByText("Fully Remote")).toBeDefined();
		expect(getByText("Hybrid Remote")).toBeDefined();
		expect(getByText("Clear All")).toBeDefined();
	});

	it("updates the proposed salary when a input value is changed", () => {
		const { getByLabelText, getByText } = render(<SalaryExpectationsSection />);

		const trainingInput = getByLabelText("Training Allowance");

		fireEvent.change(trainingInput, { target: { value: "5000" } });

		expect(getByText("$62,500")).toBeDefined();
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
});
