const fs = require("fs");
const path = require("path");

const requireSitemapMeta = (filename) => {
	const filePath = path.join(__dirname, "utils", "sitemap-meta", filename);
	if (!fs.existsSync(filePath)) {
		throw new Error(
			`Missing ${filePath}. Run "yarn export-meta" before generating the sitemap.`,
		);
	}
	return require(filePath);
};

const travelMetaData = requireSitemapMeta("TravelMetaData.json");
const guideMetaData = requireSitemapMeta("GuideMetaData.json");
const assetMetaData = requireSitemapMeta("AssetMetaData.json");
const siteUrl = "https://franklin-v-moon.dev";

const normalizeTravelSlug = (slug) => {
	if (!slug) return null;
	const cleaned = String(slug)
		.trim()
		.replace(/^\/+|\/+$/g, "")
		.toLowerCase();
	return `/travel/${cleaned}`;
};

const normalizeGuideSlug = (slug) => {
	if (!slug) return null;
	const cleaned = String(slug)
		.trim()
		.replace(/^\/+|\/+$/g, "")
		.toLowerCase();
	return `/guides/${cleaned}`;
};

const normalizeAssetPageSlug = (slug) => {
	if (!slug) return null;
	const cleaned = String(slug)
		.trim()
		.replace(/^\/+|\/+$/g, "")
		.toLowerCase();
	return `/assets-store/${cleaned}`;
};

const generateWallpaperUrls = (hostedLink, wallpapers) => {
	if (!hostedLink || !Array.isArray(wallpapers) || wallpapers.length === 0)
		return [];
	const baseDir = hostedLink
		.trim()
		.replace(/^\/+|\/+$/g, "")
		.toLowerCase();
	return wallpapers.map((wallpaper) => ({
		loc: `${siteUrl}/assets/${baseDir}/${wallpaper}`,
		changefreq: "yearly",
		priority: 0.4,
	}));
};

module.exports = {
	siteUrl,
	generateRobotsTxt: true,
	changefreq: "weekly",
	robotsTxtOptions: {
		policies: [{ userAgent: "*", allow: "/" }],
	},

	transform: async (config, path) => {
		let priority = 0.6;

		if (path === "/") {
			priority = 1.0;
		} else if (path.startsWith("/travel")) {
			priority = 0.9;
		} else if (path.startsWith("/assets-store")) {
			priority = 0.8;
		} else if (path.startsWith("/guides")) {
			priority = 0.7;
		}

		return {
			loc: path,
			changefreq: config.changefreq,
			priority,
		};
	},

	additionalPaths: async () => {
		const paths = [];
		const seen = new Set();

		if (Array.isArray(travelMetaData)) {
			for (const item of travelMetaData) {
				const loc = normalizeTravelSlug(item.link || item.hostedLink);
				if (!loc || seen.has(loc)) continue;
				seen.add(loc);

				paths.push({
					loc,
					changefreq: "yearly",
					priority: 0.5,
				});
			}
		}

		if (Array.isArray(guideMetaData)) {
			for (const guide of guideMetaData) {
				const loc = normalizeGuideSlug(guide.link);
				if (!loc || seen.has(loc)) continue;
				seen.add(loc);

				paths.push({
					loc,
					changefreq: "yearly",
					priority: 0.5,
				});
			}
		}

		if (Array.isArray(assetMetaData)) {
			for (const asset of assetMetaData) {
				const loc = normalizeAssetPageSlug(asset.hostedLink);
				if (loc && !seen.has(loc)) {
					seen.add(loc);
					paths.push({
						loc,
						changefreq: "monthly",
						priority: 0.5,
					});
				}

				const wallpaperUrls = generateWallpaperUrls(
					asset.hostedLink,
					asset.wallpapers,
				);
				for (const wallpaperPath of wallpaperUrls) {
					if (!seen.has(wallpaperPath.loc)) {
						seen.add(wallpaperPath.loc);
						paths.push(wallpaperPath);
					}
				}
			}
		}

		return paths;
	},
};
