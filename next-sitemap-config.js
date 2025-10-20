const travelMetaData = require("./utils/sitemap-meta/TravelMetaData.json");
const guideMetaData = require("./utils/sitemap-meta/GuideMetaData.json");
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
					changefreq: "yearly",
					priority: 0.6,
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

		return paths;
	},
};
