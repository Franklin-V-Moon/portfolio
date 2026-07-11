import React from "react";
import { render } from "@testing-library/react";
import { ContactCard } from "./ContactCard";

describe("ContactCard", () => {
	it("renders the contact method and value", () => {
		const { getByText } = render(
			<ContactCard
				contactMethod='Email'
				value='example@example.com'
				link='https://example.com'>
				<></>
			</ContactCard>,
		);
		expect(getByText("Email")).toBeDefined();
		expect(getByText("example@example.com")).toBeDefined();
	});

	it("links to the provided address in a new tab", () => {
		const { getByText } = render(
			<ContactCard
				contactMethod='Email'
				value='example@example.com'
				link='https://example.com'>
				<></>
			</ContactCard>,
		);
		const link = getByText("Email").closest("a");
		expect(link?.getAttribute("href")).toBe("https://example.com");
		expect(link?.getAttribute("target")).toBe("_blank");
		expect(link?.getAttribute("rel")).toBe("noopener noreferrer");
	});
});
