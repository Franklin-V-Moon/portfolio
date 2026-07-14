import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/router";
import Guides from "../../pages/guides/index";
import { Languages, Topic } from "./types";

jest.mock("next/router", () => ({
	useRouter: jest.fn(),
}));

describe("Guides page", () => {
	beforeEach(() => {
		window.history.replaceState(null, "", "/guides");
	});

	it("renders a visually hidden h1 titled Guides", () => {
		(useRouter as jest.Mock).mockReturnValue({
			isReady: true,
			pathname: "/guides",
			query: {},
			replace: jest.fn(),
		});

		render(<Guides />);

		const heading = screen.getByRole("heading", { level: 1 });
		expect(heading.textContent).toBe("Guides");
		expect(heading.className).toContain("visuallyHidden");
	});

	it("clears filter params from the browser URL when Clear All is clicked", async () => {
		(useRouter as jest.Mock).mockReturnValue({
			isReady: true,
			pathname: "/guides",
			query: { topic: Topic.Agile },
			replace: jest.fn(),
		});
		window.history.replaceState(null, "", "/guides?topic=Agile");

		render(<Guides />);

		fireEvent.click(screen.getByRole("button", { name: "Filter" }));

		const clearAllButton = await screen.findByRole("button", {
			name: "Clear All",
		});
		fireEvent.click(clearAllButton);

		await waitFor(() => {
			expect(window.location.pathname + window.location.search).toBe(
				"/guides",
			);
		});
	});

	it("selecting a topic via the UI then clearing removes it from the browser URL", async () => {
		(useRouter as jest.Mock).mockReturnValue({
			isReady: true,
			pathname: "/guides",
			query: {},
			replace: jest.fn(),
		});

		render(<Guides />);

		fireEvent.click(screen.getByRole("button", { name: "Filter" }));
		fireEvent.mouseDown(screen.getByText("All"));
		fireEvent.click(await screen.findByRole("option", { name: "Agile" }));

		await waitFor(() => {
			expect(window.location.pathname + window.location.search).toBe(
				"/guides?topic=Agile",
			);
		});

		fireEvent.click(screen.getByRole("button", { name: "Clear All" }));

		await waitFor(() => {
			expect(window.location.pathname + window.location.search).toBe(
				"/guides",
			);
		});
	});

	it("keeps a non-default sort param in the browser URL when Clear All is clicked", async () => {
		(useRouter as jest.Mock).mockReturnValue({
			isReady: true,
			pathname: "/guides",
			query: { topic: Topic.Agile, sort: "oldest" },
			replace: jest.fn(),
		});
		window.history.replaceState(null, "", "/guides?topic=Agile&sort=oldest");

		render(<Guides />);

		fireEvent.click(screen.getByRole("button", { name: "Filter" }));
		fireEvent.click(await screen.findByRole("button", { name: "Clear All" }));

		await waitFor(() => {
			expect(window.location.pathname + window.location.search).toBe(
				"/guides?sort=oldest",
			);
		});
	});

	it("removes the topic param from the URL when reset back to All", async () => {
		(useRouter as jest.Mock).mockReturnValue({
			isReady: true,
			pathname: "/guides",
			query: { topic: Topic.Agile },
			replace: jest.fn(),
		});
		window.history.replaceState(null, "", "/guides?topic=Agile");

		render(<Guides />);

		await waitFor(() => {
			expect(window.location.search).toBe("?topic=Agile");
		});

		fireEvent.click(screen.getByRole("button", { name: "Filter" }));
		fireEvent.mouseDown(screen.getAllByRole("combobox")[0]);
		fireEvent.click(await screen.findByRole("option", { name: "All" }));

		await waitFor(() => {
			expect(window.location.pathname + window.location.search).toBe(
				"/guides",
			);
		});
	});

	it("removes a language param from the URL when deselected", async () => {
		(useRouter as jest.Mock).mockReturnValue({
			isReady: true,
			pathname: "/guides",
			query: { languages: [Languages.Docker, Languages.Terraform] },
			replace: jest.fn(),
		});
		window.history.replaceState(
			null,
			"",
			"/guides?languages=Docker&languages=Terraform",
		);

		render(<Guides />);

		await waitFor(() => {
			expect(window.location.search).toBe(
				"?languages=Docker&languages=Terraform",
			);
		});

		fireEvent.click(screen.getByRole("button", { name: "Filter" }));
		fireEvent.mouseDown(screen.getByText(Languages.Docker));
		fireEvent.click(
			await screen.findByRole("option", { name: Languages.Docker }),
		);

		await waitFor(() => {
			expect(window.location.pathname + window.location.search).toBe(
				"/guides?languages=Terraform",
			);
		});
	});
});
