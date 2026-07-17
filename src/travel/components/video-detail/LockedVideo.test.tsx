import { render, screen, waitFor } from "@testing-library/react";
import { LockedVideo } from "./LockedVideo";
import { TravelVideoMetaData } from "../../types";

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

jest.mock("react-player", () => {
	const React = require("react");
	const MockReactPlayer = React.forwardRef(
		({ onReady }: { onReady?: () => void }, ref: unknown) => {
			React.useImperativeHandle(ref, () => ({}));
			React.useEffect(() => {
				onReady?.();
			}, [onReady]);
			return <div data-testid='mock-react-player' />;
		},
	);
	MockReactPlayer.displayName = "MockReactPlayer";
	return { __esModule: true, default: MockReactPlayer };
});

const buildMetaData = (
	extrasOverrides: Partial<NonNullable<TravelVideoMetaData["extras"]>> = {},
): TravelVideoMetaData => ({
	title: "South Korea",
	year: 2022,
	hostedLink: "south-korea",
	link: "south-korea",
	restricted: true,
	extras: extrasOverrides,
});

describe("LockedVideo", () => {
	it("shows a loading skeleton until the locked trailer becomes ready", async () => {
		render(<LockedVideo metaData={buildMetaData({ trailer: "sk-trailer" })} />);

		expect(screen.getByTestId("video-skeleton")).toBeDefined();

		await waitFor(() => {
			expect(screen.queryByTestId("video-skeleton")).toBeNull();
		});
	});

	it("shows the placeholder image instead of a skeleton when there is no trailer", () => {
		render(<LockedVideo metaData={buildMetaData()} />);

		expect(screen.queryByTestId("video-skeleton")).toBeNull();
		expect(
			screen.getByAltText("No video placeholder image"),
		).toBeDefined();
	});

	it("always shows the password prompt", () => {
		render(<LockedVideo metaData={buildMetaData()} />);

		expect(
			screen.getByText("Full Video Locked, Know The Password?"),
		).toBeDefined();
	});
});
