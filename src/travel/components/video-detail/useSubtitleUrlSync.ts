import { RefObject, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import type ReactPlayerType from "react-player";

const SUBTITLES_QUERY_PARAM = "Subtitles";
const NONE_PARAM_VALUE = "None";

const getTextTracks = (playerRef: RefObject<ReactPlayerType | null>) => {
	const internalPlayer = playerRef.current?.getInternalPlayer() as
		| HTMLVideoElement
		| undefined;
	return internalPlayer?.textTracks;
};

const getShowingLanguage = (textTracks: TextTrackList): string | null => {
	const showingTrack = Array.from(textTracks).find(
		(track) => track.mode === "showing",
	);
	return showingTrack?.language ?? null;
};

const setActiveTrack = (textTracks: TextTrackList, language: string | null) => {
	Array.from(textTracks).forEach((track) => {
		track.mode = track.language === language ? "showing" : "disabled";
	});
};

export const useSubtitleUrlSync = (
	playerRef: RefObject<ReactPlayerType | null>,
	isPlayerReady: boolean,
	subtitleLanguages: string[],
) => {
	const router = useRouter();
	const hasAppliedInitialQueryRef = useRef(false);

	useEffect(() => {
		if (!isPlayerReady || subtitleLanguages.length === 0) return;
		if (hasAppliedInitialQueryRef.current) return;
		hasAppliedInitialQueryRef.current = true;

		const textTracks = getTextTracks(playerRef);
		if (!textTracks) return;

		const requested = router.query[SUBTITLES_QUERY_PARAM];
		const requestedLanguage = typeof requested === "string" ? requested : undefined;
		if (!requestedLanguage) return;

		if (requestedLanguage.toLowerCase() === NONE_PARAM_VALUE.toLowerCase()) {
			setActiveTrack(textTracks, null);
			return;
		}

		const match = subtitleLanguages.find(
			(language) => language.toLowerCase() === requestedLanguage.toLowerCase(),
		);

		if (match) {
			setActiveTrack(textTracks, match);
		}
	}, [isPlayerReady, subtitleLanguages, router.query, playerRef]);

	useEffect(() => {
		if (!isPlayerReady || subtitleLanguages.length === 0) return;

		const textTracks = getTextTracks(playerRef);
		if (!textTracks) return;

		const handleChange = () => {
			const activeLanguage = getShowingLanguage(textTracks);
			const isDefault = activeLanguage === subtitleLanguages[0];

			const nextQuery = { ...router.query };
			if (isDefault) {
				delete nextQuery[SUBTITLES_QUERY_PARAM];
			} else {
				nextQuery[SUBTITLES_QUERY_PARAM] = activeLanguage ?? NONE_PARAM_VALUE;
			}

			router.replace(
				{ pathname: router.pathname, query: nextQuery },
				undefined,
				{ shallow: true },
			);
		};

		textTracks.addEventListener("change", handleChange);
		return () => textTracks.removeEventListener("change", handleChange);
	}, [isPlayerReady, subtitleLanguages, router, playerRef]);
};
