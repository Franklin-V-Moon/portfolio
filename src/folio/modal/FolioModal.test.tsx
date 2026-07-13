import { fireEvent, render } from "@testing-library/react";
import { Proficiency } from "../types";
import { FolioModal } from "./FolioModal";

describe("FolioModal", () => {
	const setShowModal = jest.fn();

	const payload = {
		title: "React",
		knowledge: "Building UIs. Managing state.",
		proficiency: Proficiency.Proficient,
		description: "Built many apps. Shipped to production.",
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders the heading, knowledge, description, and proficiency for a complete payload", () => {
		const { getByText } = render(FolioModal(setShowModal, payload));

		expect(getByText("React")).toBeDefined();

		expect(getByText("Building UIs.")).toBeDefined();
		expect(getByText("Managing state.")).toBeDefined();

		expect(getByText("Knowledge:")).toBeDefined();
		expect(getByText(Proficiency.Proficient)).toBeDefined();

		expect(getByText("Built many apps.")).toBeDefined();
		expect(getByText("Shipped to production.")).toBeDefined();
	});

	it("renders nothing when the title is missing from the payload", () => {
		const { container } = render(
			FolioModal(setShowModal, { ...payload, title: "" }),
		);

		expect(container.innerHTML).toBe("");
	});

	it("calls setShowModal with false when the close button is clicked", () => {
		const { getByRole } = render(FolioModal(setShowModal, payload));

		fireEvent.click(getByRole("button", { name: "Close" }));

		expect(setShowModal).toHaveBeenCalledWith(false);
	});
});
