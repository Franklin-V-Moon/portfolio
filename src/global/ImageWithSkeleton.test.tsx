import { render, fireEvent, waitFor } from "@testing-library/react";
import { ImageWithSkeleton } from "./ImageWithSkeleton";

describe("ImageWithSkeleton", () => {
	it("renders with the skeleton class before the image loads", () => {
		const { getByAltText } = render(
			<ImageWithSkeleton
				src='/test.jpg'
				alt='Test image'
				width={100}
				height={100}
			/>,
		);

		expect(getByAltText("Test image").className).toMatch(/skeleton/);
	});

	it("applies the loaded class and calls onLoad after the image loads", async () => {
		const onLoad = jest.fn();
		const { getByAltText } = render(
			<ImageWithSkeleton
				src='/test.jpg'
				alt='Test image'
				width={100}
				height={100}
				onLoad={onLoad}
			/>,
		);

		const img = getByAltText("Test image");
		fireEvent.load(img);

		await waitFor(() => expect(onLoad).toHaveBeenCalledTimes(1));
		expect(img.className).toMatch(/loaded/);
	});
});
