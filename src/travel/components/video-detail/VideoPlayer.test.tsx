import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/router";
import { VideoPlayer } from "./VideoPlayer";
import { TravelVideoMetaData } from "../../types";

jest.mock("next/router", () => ({
	useRouter: jest.fn(),
}));

jest.mock("next/dynamic", () => ({
	__esModule: true,
	default: (loader: () => Promise<{ default: unknown }>) => {
		const React = require("react");
		const MockDynamicComponent = (props: object) => {
			const [Component, setComponent] = React.useState(null);
			React.useEffect(() => {
				loader().then((mod) => setComponent(() => mod.default ?? mod));
			}, []);
			if (!Component) return null;
			return React.createElement(Component, props);
		};
		MockDynamicComponent.displayName = "MockDynamicComponent";
		return MockDynamicComponent;
	},
}));

const mockSeekTo = jest.fn();
const mockGetCurrentTime = jest.fn().mockResolvedValue(125);

jest.mock("react-player", () => {
	const React = require("react");
	const MockReactPlayer = React.forwardRef(
		(
			{ onReady, light }: { onReady?: () => void; light?: React.ReactNode },
			ref: unknown,
		) => {
			React.useImperativeHandle(ref, () => ({
				seekTo: mockSeekTo,
				getCurrentTime: mockGetCurrentTime,
			}));
			// Mirrors react-player: onReady only fires for the active player,
			// never while a `light` preview is being shown.
			React.useEffect(() => {
				if (!light) onReady?.();
			}, [light, onReady]);
			if (light) {
				return <div data-testid='mock-trailer-preview'>{light}</div>;
			}
			return <div data-testid='mock-react-player' />;
		},
	);
	MockReactPlayer.displayName = "MockReactPlayer";
	return { __esModule: true, default: MockReactPlayer };
});

const buildMetaData = (
	extrasOverrides: Partial<NonNullable<TravelVideoMetaData["extras"]>> = {},
): TravelVideoMetaData => ({
	title: "Japan",
	year: 2023,
	hostedLink: "japan",
	link: "japan",
	restricted: false,
	backupLink: "https://example.com/download",
	extras: {
		highlights: [{ title: "Mount Fuji (sunrise)", timecode: 90 }],
		...extrasOverrides,
	},
});

describe("VideoPlayer", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		(useRouter as jest.Mock).mockReturnValue({ query: {} });
	});

	it("seeks to a highlight's timecode when its skip-to button is clicked", async () => {
		render(<VideoPlayer metaData={buildMetaData()} />);

		await screen.findByTestId("mock-react-player");

		fireEvent.click(
			screen.getByRole("button", {
				name: "Skip to the moment when the Mount Fuji happened",
			}),
		);

		expect(mockSeekTo).toHaveBeenCalledWith(90, "seconds");
	});

	it("seeks to the timecode from the URL once the player is ready", async () => {
		(useRouter as jest.Mock).mockReturnValue({ query: { timecode: "42" } });

		render(<VideoPlayer metaData={buildMetaData()} />);

		await waitFor(() => {
			expect(mockSeekTo).toHaveBeenCalledWith(42, "seconds");
		});
	});

	it("dismisses the trailer preview and starts the player when a skip-to button is clicked", async () => {
		render(
			<VideoPlayer metaData={buildMetaData({ trailer: "japan-trailer" })} />,
		);

		await screen.findByTestId("mock-trailer-preview");
		expect(mockSeekTo).not.toHaveBeenCalled();

		fireEvent.click(
			screen.getByRole("button", {
				name: "Skip to the moment when the Mount Fuji happened",
			}),
		);

		await screen.findByTestId("mock-react-player");
		expect(mockSeekTo).toHaveBeenCalledWith(90, "seconds");
	});

	it("leaves the trailer preview alone until a skip-to button is clicked", async () => {
		render(
			<VideoPlayer metaData={buildMetaData({ trailer: "japan-trailer" })} />,
		);

		await screen.findByTestId("mock-trailer-preview");

		expect(screen.queryByTestId("mock-react-player")).toBeNull();
		expect(mockSeekTo).not.toHaveBeenCalled();
	});

	it("shows a loading skeleton until the trailer preview becomes ready", async () => {
		render(
			<VideoPlayer metaData={buildMetaData({ trailer: "japan-trailer" })} />,
		);

		expect(screen.getByTestId("video-skeleton")).toBeDefined();

		await waitFor(() => {
			expect(screen.queryByTestId("video-skeleton")).toBeNull();
		});
	});

	it("shows a loading skeleton until the player is ready when there is no trailer", async () => {
		render(<VideoPlayer metaData={buildMetaData()} />);

		expect(screen.getByTestId("video-skeleton")).toBeDefined();

		await screen.findByTestId("mock-react-player");

		await waitFor(() => {
			expect(screen.queryByTestId("video-skeleton")).toBeNull();
		});
	});
});
