import { ParsedUrlQuery } from "querystring";
import { Languages, SortOptions, Tags, Topic } from "../types";

const SORT_PARAM = "sort";
const TOPIC_PARAM = "topic";
const LANGUAGES_PARAM = "languages";
const TAGS_PARAM = "tags";

const toArray = (value: string | string[] | undefined): string[] => {
	if (value === undefined) {
		return [];
	}

	return Array.isArray(value) ? value : [value];
};

export type GuidesQueryState = {
	sortBy: SortOptions;
	topicFilter: Topic | undefined;
	languagesFilter: Languages[];
	tagsFilter: Tags[];
};

export const parseGuidesQuery = (query: ParsedUrlQuery): GuidesQueryState => {
	const sortParam = toArray(query[SORT_PARAM])[0];
	const sortBy =
		Object.values(SortOptions).find((value) => value === sortParam) ??
		SortOptions.Newest;

	const topicParam = toArray(query[TOPIC_PARAM])[0];
	const topicFilter = Object.values(Topic).find(
		(value) => value === topicParam,
	);

	const languagesFilter = toArray(query[LANGUAGES_PARAM]).filter(
		(value): value is Languages =>
			(Object.values(Languages) as string[]).includes(value),
	);

	const tagsFilter = toArray(query[TAGS_PARAM]).filter(
		(value): value is Tags => (Object.values(Tags) as string[]).includes(value),
	);

	return { sortBy, topicFilter, languagesFilter, tagsFilter };
};

export const buildGuidesQuery = (
	sortBy: SortOptions,
	topicFilter: Topic | undefined,
	languagesFilter: Languages[],
	tagsFilter: Tags[],
): Record<string, string | string[]> => {
	const query: Record<string, string | string[]> = {};

	if (sortBy !== SortOptions.Newest) {
		query[SORT_PARAM] = sortBy;
	}

	if (topicFilter) {
		query[TOPIC_PARAM] = topicFilter;
	}

	if (languagesFilter.length) {
		query[LANGUAGES_PARAM] = languagesFilter;
	}

	if (tagsFilter.length) {
		query[TAGS_PARAM] = tagsFilter;
	}

	return query;
};
