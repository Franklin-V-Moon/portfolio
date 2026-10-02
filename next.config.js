/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	transpilePackages: [
		"d3-array",
		"d3-color",
		"d3-dispatch",
		"d3-drag",
		"d3-ease",
		"d3-geo",
		"d3-interpolate",
		"d3-selection",
		"d3-timer",
		"d3-transition",
		"d3-zoom",
		"internmap",
	],
};

module.exports = nextConfig;
