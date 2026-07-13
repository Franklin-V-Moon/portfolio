/** @jest-environment node */
import { splitStringAtFullStop } from "./splitStringAtFullStop";

describe("splitStringAtFullStop", () => {
	it("should split the string into an array of substrings at full stop", () => {
		const str = "Hello. How are you. I hope you are doing well.";
		const expectedResult = [
			"Hello.",
			" How are you.",
			" I hope you are doing well.",
			"",
		];

		expect(splitStringAtFullStop(str)).toEqual(expectedResult);
	});
});
