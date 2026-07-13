/** @jest-environment node */
import { getFeaturedItems } from "./getFeaturedItems";
import { AssetCollectionMetaData } from "../types";

const collections: AssetCollectionMetaData[] = [
	{
		title: "Nature",
		hostedLink: "nature",
		thumbnail: "thumb.jpg",
		assetItemMetaData: [
			{ title: "Clip A", price: 5, thumbnail: "a.jpg", link: "a", tags: [] },
			{ title: "Clip B", price: 10, thumbnail: "b.jpg", link: "b", tags: [] },
		],
		wallpapers: ["wall1.jpg", "wall2.jpg"],
	},
] as AssetCollectionMetaData[];

describe("getFeaturedItems()", () => {
	beforeEach(() => {
		jest.useFakeTimers().setSystemTime(new Date("2026-01-15"));
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it("returns up to 3 asset clips and up to 3 wallpapers", () => {
		const result = getFeaturedItems(collections);
		const clips = result.filter((item) => item.price !== null);
		const wallpapers = result.filter((item) => item.price === null);

		expect(clips.length).toBeLessThanOrEqual(3);
		expect(wallpapers.length).toBeLessThanOrEqual(3);
		expect(result.length).toBe(clips.length + wallpapers.length);
	});

	it("is deterministic for the same day", () => {
		const first = getFeaturedItems(collections);
		const second = getFeaturedItems(collections);
		expect(first).toEqual(second);
	});

	it("prefixes clip titles with the collection title", () => {
		const result = getFeaturedItems(collections);
		const clip = result.find((item) => item.price !== null);
		expect(clip?.title.startsWith("Nature Clip")).toBe(true);
	});

	it("builds wallpaper thumbnails from the collection's hosted link", () => {
		const result = getFeaturedItems(collections);
		const wallpaper = result.find((item) => item.price === null);
		expect(wallpaper?.thumbnail).toMatch(/^nature\//);
	});

	it("returns an empty array when there are no collections", () => {
		expect(getFeaturedItems([])).toEqual([]);
	});
});
