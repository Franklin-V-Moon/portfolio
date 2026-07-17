import type { NextApiRequest, NextApiResponse } from "next";
import {
	logMissingSubtitle,
	shiftVttTimestamps,
	subtitleSourceUrl,
} from "../../../../../src/travel/subtitles";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { hostedLink, lang } = req.query as { hostedLink: string; lang: string };

	const upstream = await fetch(subtitleSourceUrl(hostedLink, lang));

	if (!upstream.ok) {
		logMissingSubtitle(hostedLink, lang, `responded with ${upstream.status}`);
		res.status(404).end();
		return;
	}

	const vtt = await upstream.text();

	res.setHeader("Content-Type", "text/vtt; charset=utf-8");
	res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=86400");
	res.status(200).send(shiftVttTimestamps(vtt));
}
