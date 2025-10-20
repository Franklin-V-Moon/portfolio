import { AssetCollectionMetaData, AssetItemMetaData } from "../types";

export const getFeaturedItems = (
	collections: AssetCollectionMetaData[],
): AssetItemMetaData[] => {
	const selectedAssetItems: AssetItemMetaData[] = [];
	const selectedWallpaperItems: AssetItemMetaData[] = [];

	const today = new Date();
	const daySeed =
		today.getFullYear() * 10000 +
		(today.getMonth() + 1) * 100 +
		today.getDate();

	const mulberry32 = (a: number) => {
		return () => {
			let t = (a += 0x6d2b79f5);
			t = Math.imul(t ^ (t >>> 15), t | 1);
			t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
			return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
		};
	};

	const assetRand = mulberry32(daySeed);
	const wallpaperRand = mulberry32(daySeed + 1);
	const sortRand = mulberry32(daySeed + 2);

	const allAssetItems: {
		item: AssetItemMetaData;
		collection: AssetCollectionMetaData;
	}[] = [];
	collections.forEach((collection) => {
		collection.assetItemMetaData.forEach((item) => {
			allAssetItems.push({
				item: { ...item },
				collection: collection,
			});
		});
	});

	const allWallpapers: {
		wallpaper: string;
		collection: AssetCollectionMetaData;
	}[] = [];
	collections.forEach((collection) => {
		collection.wallpapers.forEach((wallpaper) => {
			allWallpapers.push({ wallpaper, collection });
		});
	});

	for (let i = 0; i < 3; i++) {
		if (allAssetItems.length === 0) break;
		const randomIndex = Math.floor(assetRand() * allAssetItems.length);
		const { item, collection } = allAssetItems.splice(randomIndex, 1)[0];
		selectedAssetItems.push({
			...item,
			title: collection.title,
		});
	}

	for (let i = 0; i < 3; i++) {
		if (allWallpapers.length === 0) break;
		const randomIndex = Math.floor(wallpaperRand() * allWallpapers.length);
		const { wallpaper, collection } = allWallpapers.splice(randomIndex, 1)[0];
		selectedWallpaperItems.push({
			title: collection.title,
			price: null,
			thumbnail: `${collection.hostedLink}/${wallpaper}`,
			link: `assets-store/${collection.hostedLink}`,
			tags: [],
		});
	}

	return [...selectedAssetItems, ...selectedWallpaperItems].sort(
		() => sortRand() - 0.5,
	);
};
