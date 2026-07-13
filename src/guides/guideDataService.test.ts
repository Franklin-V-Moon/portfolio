/** @jest-environment node */
import { testGuideMetaDataArrayMetaData } from "./test-helpers/guideMetaDataArray";
import { testGuideMetaDataItem } from "./test-helpers/guideMetaDataItem";
import { getGuideMetaDataByLink } from "./guideDataService";

describe("guideDataService", () => {
	describe("getGuideMetaDataByLink()", () => {
		it("Returns single metadata item from object using parsed link string", () => {
			const result = getGuideMetaDataByLink(
				"/programming/quickly-setup-next-js-with-typescript",
				testGuideMetaDataArrayMetaData,
			);

			expect(result).toEqual(testGuideMetaDataItem);
		});
	});
});
