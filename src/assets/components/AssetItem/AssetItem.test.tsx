import { render, fireEvent } from "@testing-library/react";
import { AssetItem } from "./AssetItem";
import { AssetItemMetaData } from "../../types";

describe("AssetItem", () => {
	const baseItem: AssetItemMetaData = {
		title: "Sunset Clip",
		price: 5,
		thumbnail: "sunset.jpg",
		link: "https://gumroad.com/l/sunset",
		tags: [],
	};

	it("shows \"Free\" when price is null", () => {
		const { getByText } = render(
			<AssetItem item={{ ...baseItem, price: null }} />,
		);

		expect(getByText("Free")).toBeDefined();
	});

	it("shows the dollar price when price is set", () => {
		const { getByText } = render(<AssetItem item={{ ...baseItem, price: 5 }} />);

		expect(getByText("$5")).toBeDefined();
	});

	it("shows the length badge when item.length is set", () => {
		const { getByText } = render(<AssetItem item={{ ...baseItem, length: 12 }} />);

		expect(getByText("12s")).toBeDefined();
	});

	it("omits the length badge when item.length is not set", () => {
		const { queryByText } = render(<AssetItem item={baseItem} />);

		expect(queryByText(/^\d+s$/)).toBeNull();
	});

	it("shows the pack icon when item.isPack is true", () => {
		const { queryByTestId } = render(
			<AssetItem item={{ ...baseItem, isPack: true }} />,
		);

		expect(queryByTestId("PermMediaIcon")).not.toBeNull();
	});

	it("omits the pack icon when item.isPack is not set", () => {
		const { queryByTestId } = render(<AssetItem item={baseItem} />);

		expect(queryByTestId("PermMediaIcon")).toBeNull();
	});

	it("delegates a click on the card to the hidden Gumroad anchor", () => {
		const { getByLabelText, container } = render(<AssetItem item={baseItem} />);

		const anchor = container.querySelector("a.gumroad-button") as HTMLAnchorElement;
		const clickSpy = jest.spyOn(anchor, "click");

		fireEvent.click(getByLabelText(`View details for ${baseItem.title}`));

		expect(clickSpy).toHaveBeenCalledTimes(1);
	});
});
