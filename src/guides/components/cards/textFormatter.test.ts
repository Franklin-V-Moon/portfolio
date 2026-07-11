import { subTitleShortener, titleShortener } from "./textFormatter";

describe("textFormatter", () => {
  describe("subTitleShortener", () => {
    it("returns unshortened string if length less than 75", () => {
      const expected = "Lizards are a widespread group of squadmate reptiles";
      const result = subTitleShortener(expected);

      expect(result).toEqual(expected);
    });

    it("returns string shortened to 75 characters with three trailing periods", () => {
      const initialData =
        "Lizards are a widespread group of squadmate reptiles, with over 6000 new species ranging across all continents except Antarctica";
      const expected =
        "Lizards are a widespread group of squadmate reptiles, with over 6000 new...";

      const result = subTitleShortener(initialData);

      expect(result).toEqual(expected);
    });
  });

  describe("titleFormatter", () => {
    it("returns unchanged string if the length is less than 50", () => {
      const expected = "Lizards are squadmate reptiles";
      const result = titleShortener(expected);

      expect(result).toEqual(expected);
    });
    it("returns string shortened to 30 characters with three trailing periods", () => {
      const initialData =
        "Lizards are a widespread group of squadmate reptiles, with over 6000 new species ranging across all continents except Antarctica";
      const expected = "Lizards are a widespread group of squadmate rep...";

      const result = titleShortener(initialData);

      expect(result).toEqual(expected);
      expect(result.length).toEqual(50);
    });
  });
});
