/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	async redirects() {
		return [
			{
				source: "/travel/world-map",
				destination: "/travel",
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
