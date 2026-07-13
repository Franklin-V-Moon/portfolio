import { render, fireEvent } from "@testing-library/react";
import { AssetCollection } from "./AssetCollection";
import { AssetCollectionMetaData } from "../../types";
import router from "next/router";

jest.mock("next/router", () => ({
	push: jest.fn(),
}));

describe("AssetCollection", () => {
	const collection: AssetCollectionMetaData = {
		title: "Nature",
		thumbnail: "cover.jpg",
		hostedLink: "nature",
		assetItemMetaData: [],
		wallpapers: [],
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders the collection title", () => {
		const { getByText } = render(<AssetCollection collection={collection} />);

		expect(getByText("Nature")).toBeDefined();
	});

	it("navigates to the collection page when clicked", () => {
		const { getByLabelText } = render(<AssetCollection collection={collection} />);

		fireEvent.click(getByLabelText(`View details for ${collection.title}`));

		expect(router.push).toHaveBeenCalledWith("/assets-store/nature");
	});
});
