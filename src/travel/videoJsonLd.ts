import { publicCDNVideoUrl } from "../datasources/TravelMetaData";
import { TravelVideoMetaData } from "./types";

const OG_IMAGE =
	"https://github.com/user-attachments/assets/be5c8009-bc6a-489d-bc42-b680c541656f";

export const secondsToISO = (seconds: number) => {
	const h = Math.floor(seconds / 3600);
	const m = Math.floor((seconds % 3600) / 60);
	const s = Math.round(seconds % 60);
	return `PT${h ? `${h}H` : ""}${m ? `${m}M` : ""}${s ? `${s}S` : "0S"}`;
};

export const buildVideoJsonLd = ({
	metaData,
	durationISO,
}: {
	metaData: TravelVideoMetaData;
	durationISO?: string;
}) => {
	const { title, year, hostedLink, link, extras } = metaData;

	const description =
		extras?.summary?.[0] ?? `${title} — travel video from ${year}.`;
	const pageUrl = `https://franklin-v-moon.dev/travel/${link}`;

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "VideoObject",
		name: `${title} — Travel Video`,
		description,
		thumbnailUrl: [
			`https://franklin-v-moon.dev/travel/posters/${hostedLink}.png`,
		],
		contentUrl: `${publicCDNVideoUrl}${hostedLink}.mp4`,
		embedUrl: `${pageUrl}#player`,
		uploadDate: new Date(Number(year), 0, 1).toISOString(),
		...(durationISO ? { duration: durationISO } : {}),
		publisher: { "@type": "Person", name: "Franklin Von Moon" },
	};

	return { description, pageUrl, ogImage: OG_IMAGE, jsonLd };
};
