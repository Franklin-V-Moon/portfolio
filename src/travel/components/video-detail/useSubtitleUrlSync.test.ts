import { renderHook } from "@testing-library/react";
import { useRouter } from "next/router";
import type ReactPlayerType from "react-player";
import { useSubtitleUrlSync } from "./useSubtitleUrlSync";

jest.mock("next/router", () => ({
	useRouter: jest.fn(),
}));

class FakeTextTrackList extends EventTarget {
	tracks: { language: string; mode: string }[];

	constructor(tracks: { language: string; mode: string }[]) {
		super();
		this.tracks = tracks;
	}

	[Symbol.iterator]() {
		return this.tracks[Symbol.iterator]();
	}

	fireChange() {
		this.dispatchEvent(new Event("change"));
	}
}

const buildPlayerRef = (textTracks: FakeTextTrackList) =>
	({
		current: {
			getInternalPlayer: () => ({ textTracks }),
		},
	}) as unknown as React.RefObject<ReactPlayerType | null>;

const mockRouter = (query: Record<string, string>) => {
	const replace = jest.fn();
	(useRouter as jest.Mock).mockReturnValue({
		query,
		pathname: "/travel/[link]",
		replace,
	});
	return replace;
};

describe("useSubtitleUrlSync", () => {
	it("does nothing when the player is not ready", () => {
		const textTracks = new FakeTextTrackList([
			{ language: "English", mode: "showing" },
		]);
		mockRouter({ link: "afghanistan" });

		renderHook(() =>
			useSubtitleUrlSync(buildPlayerRef(textTracks), false, ["English"]),
		);

		expect(textTracks.tracks[0].mode).toBe("showing");
	});

	it("selects the matching track for a case-insensitive Subtitles query param", () => {
		const textTracks = new FakeTextTrackList([
			{ language: "English", mode: "showing" },
			{ language: "French", mode: "disabled" },
		]);
		mockRouter({ link: "afghanistan", Subtitles: "french" });

		renderHook(() =>
			useSubtitleUrlSync(buildPlayerRef(textTracks), true, [
				"English",
				"French",
			]),
		);

		expect(textTracks.tracks[0].mode).toBe("disabled");
		expect(textTracks.tracks[1].mode).toBe("showing");
	});

	it("turns every track off when the Subtitles query param is None", () => {
		const textTracks = new FakeTextTrackList([
			{ language: "English", mode: "showing" },
		]);
		mockRouter({ link: "afghanistan", Subtitles: "None" });

		renderHook(() =>
			useSubtitleUrlSync(buildPlayerRef(textTracks), true, ["English"]),
		);

		expect(textTracks.tracks[0].mode).toBe("disabled");
	});

	it("leaves tracks untouched when the Subtitles query param does not match any language", () => {
		const textTracks = new FakeTextTrackList([
			{ language: "English", mode: "showing" },
		]);
		mockRouter({ link: "afghanistan", Subtitles: "Spanish" });

		renderHook(() =>
			useSubtitleUrlSync(buildPlayerRef(textTracks), true, ["English"]),
		);

		expect(textTracks.tracks[0].mode).toBe("showing");
	});

	it("adds the Subtitles param when a non-default language starts showing", () => {
		const textTracks = new FakeTextTrackList([
			{ language: "English", mode: "disabled" },
			{ language: "French", mode: "showing" },
		]);
		const replace = mockRouter({ link: "afghanistan" });

		renderHook(() =>
			useSubtitleUrlSync(buildPlayerRef(textTracks), true, [
				"English",
				"French",
			]),
		);

		textTracks.fireChange();

		expect(replace).toHaveBeenCalledWith(
			{
				pathname: "/travel/[link]",
				query: { link: "afghanistan", Subtitles: "French" },
			},
			undefined,
			{ shallow: true },
		);
	});

	it("sets the Subtitles param to None when every track is turned off", () => {
		const textTracks = new FakeTextTrackList([
			{ language: "English", mode: "disabled" },
		]);
		const replace = mockRouter({ link: "afghanistan" });

		renderHook(() =>
			useSubtitleUrlSync(buildPlayerRef(textTracks), true, ["English"]),
		);

		textTracks.fireChange();

		expect(replace).toHaveBeenCalledWith(
			{
				pathname: "/travel/[link]",
				query: { link: "afghanistan", Subtitles: "None" },
			},
			undefined,
			{ shallow: true },
		);
	});

	it("writes the default language explicitly when a change event lands back on it", () => {
		const textTracks = new FakeTextTrackList([
			{ language: "English", mode: "showing" },
			{ language: "French", mode: "disabled" },
		]);
		const replace = mockRouter({ link: "afghanistan" });

		renderHook(() =>
			useSubtitleUrlSync(buildPlayerRef(textTracks), true, [
				"English",
				"French",
			]),
		);

		textTracks.fireChange();

		expect(replace).toHaveBeenCalledWith(
			{
				pathname: "/travel/[link]",
				query: { link: "afghanistan", Subtitles: "English" },
			},
			undefined,
			{ shallow: true },
		);
	});
});
