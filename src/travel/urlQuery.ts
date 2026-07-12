import { ParsedUrlQuery } from "querystring";
import { SortBy } from "./types";

const SORT_BY_PARAM = "SortBy";
const SEARCH_PARAM = "q";

const firstValue = (
	value: string | string[] | undefined,
): string | undefined => (Array.isArray(value) ? value[0] : value);

export const parseSortByFromQuery = (query: ParsedUrlQuery): SortBy | null => {
	const sortByValue = firstValue(query[SORT_BY_PARAM]);

	return (
		Object.values(SortBy).find(
			(enumValue) => enumValue.toLowerCase() === sortByValue?.toLowerCase(),
		) ?? null
	);
};

export const parseSearchTextFromQuery = (query: ParsedUrlQuery): string =>
	firstValue(query[SEARCH_PARAM]) ?? "";

export const buildTravelQuery = (
	sortSelection: SortBy,
	searchingText: string,
): Record<string, string> => {
	if (searchingText) {
		return { [SEARCH_PARAM]: searchingText };
	}

	if (sortSelection !== SortBy.Newest) {
		return { [SORT_BY_PARAM]: sortSelection };
	}

	return {};
};
