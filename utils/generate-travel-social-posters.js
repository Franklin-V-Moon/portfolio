const fs = require("node:fs/promises");
const path = require("node:path");
const sharp = require("sharp");

const posterDirectory = path.join(process.cwd(), "public/travel/posters");
const socialPosterDirectory = path.join(posterDirectory, "social");
const cropTop = 73;
const cropAspectRatio = 1200 / 630;

const generatePosters = async () => {
	await fs.mkdir(socialPosterDirectory, { recursive: true });

	const files = await fs.readdir(posterDirectory);
	const posters = files.filter(
		(file) => file.endsWith(".png") && file !== "placeholder.png",
	);

	for (const poster of posters) {
		const input = path.join(posterDirectory, poster);
		const output = path.join(
			socialPosterDirectory,
			`${path.basename(poster, ".png")}.jpg`,
		);
		const { width, height } = await sharp(input).metadata();

		if (!width || !height) {
			throw new Error(`Could not read dimensions for ${input}`);
		}

		const cropHeight = Math.round(width / cropAspectRatio);

		if (height < cropTop + cropHeight) {
			throw new Error(`Poster is too short for the social crop: ${input}`);
		}

		await sharp(input)
			.extract({ left: 0, top: cropTop, width, height: cropHeight })
			.resize(1200, 630)
			.jpeg({ quality: 85 })
			.toFile(output);
	}
};

generatePosters().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
