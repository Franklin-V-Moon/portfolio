import { publicCDNVideoUrl } from "../datasources/TravelMetaData";

export const subtitleSourceUrl = (hostedLink: string, language: string) =>
	`${publicCDNVideoUrl}${hostedLink}subtitles-${encodeURIComponent(language)}.vtt`;

export const logMissingSubtitle = (
	hostedLink: string,
	language: string,
	reason: string,
) => {
	console.error(
		`[subtitles] ${hostedLink}subtitles-${language}.vtt not available: ${reason}`,
	);
};

export const findAvailableSubtitleLanguages = async (
	hostedLink?: string,
	languages: string[] = [],
): Promise<string[]> => {
	if (!hostedLink || languages.length === 0) return [];

	const results = await Promise.all(
		languages.map(async (language) => {
			try {
				const response = await fetch(subtitleSourceUrl(hostedLink, language), {
					method: "HEAD",
				});

				if (!response.ok) {
					logMissingSubtitle(hostedLink, language, `responded with ${response.status}`);
					return null;
				}

				return language;
			} catch (error) {
				logMissingSubtitle(
					hostedLink,
					language,
					error instanceof Error ? error.message : String(error),
				);
				return null;
			}
		}),
	);

	return results.filter((language): language is string => language !== null);
};

// DaVinci Resolve timelines default to a 01:00:00:00 start timecode, and its
// subtitle export uses that timeline timecode rather than zero-based media
// time. Exported cues are shifted this many seconds later than the actual
// video, since we standardise on leaving that Resolve setting untouched.
export const RESOLVE_TIMELINE_START_OFFSET_SECONDS = 3600;

const VTT_TIMESTAMP_PATTERN = /(\d{2}):(\d{2}):(\d{2})\.(\d{3})/g;

export const shiftVttTimestamps = (
	vtt: string,
	offsetSeconds: number = RESOLVE_TIMELINE_START_OFFSET_SECONDS,
): string =>
	vtt.replace(VTT_TIMESTAMP_PATTERN, (_match, h, m, s, ms) => {
		const totalMs = Math.max(
			(Number(h) * 3600 + Number(m) * 60 + Number(s)) * 1000 +
				Number(ms) -
				offsetSeconds * 1000,
			0,
		);

		const hours = Math.floor(totalMs / 3600000);
		const minutes = Math.floor((totalMs % 3600000) / 60000);
		const seconds = Math.floor((totalMs % 60000) / 1000);
		const millis = totalMs % 1000;

		return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(millis, 3)}`;
	});

const pad = (value: number, length = 2) => String(value).padStart(length, "0");
