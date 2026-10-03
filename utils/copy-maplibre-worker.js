const fs = require("node:fs");
const path = require("node:path");

const outputDirectory = path.join(process.cwd(), "public", "travel-map");
fs.mkdirSync(outputDirectory, { recursive: true });

["maplibre-gl-worker.mjs", "maplibre-gl-shared.mjs"].forEach((file) => {
	fs.copyFileSync(
		path.join(process.cwd(), "node_modules", "maplibre-gl", "dist", file),
		path.join(outputDirectory, file),
	);
});
