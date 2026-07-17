import { fireEvent, render, screen } from "@testing-library/react";
import { SubtitlesButton } from "./SubtitlesButton";

describe("SubtitlesButton", () => {
	it("renders nothing when there are no subtitle languages", () => {
		const { container } = render(
			<SubtitlesButton
				subtitleLanguages={[]}
				activeCode={null}
				onChange={jest.fn()}
			/>,
		);

		expect(container.innerHTML).toBe("");
	});

	it("calls onChange with the selected language code", () => {
		const onChange = jest.fn();

		render(
			<SubtitlesButton
				subtitleLanguages={[
					{ code: "en", label: "English" },
					{ code: "fr", label: "Français" },
				]}
				activeCode={null}
				onChange={onChange}
			/>,
		);

		fireEvent.click(screen.getByRole("button", { name: "Subtitles" }));
		fireEvent.click(screen.getByRole("menuitem", { name: "Français" }));

		expect(onChange).toHaveBeenCalledWith("fr");
	});

	it("calls onChange with null when 'Off' is selected", () => {
		const onChange = jest.fn();

		render(
			<SubtitlesButton
				subtitleLanguages={[{ code: "en", label: "English" }]}
				activeCode='en'
				onChange={onChange}
			/>,
		);

		fireEvent.click(screen.getByRole("button", { name: "Subtitles" }));
		fireEvent.click(screen.getByRole("menuitem", { name: "Off" }));

		expect(onChange).toHaveBeenCalledWith(null);
	});
});
