import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { PageContainer } from "../../src/global/PageContainer";
import { Footer } from "../../utils/footer/Footer";
import styles from "../../src/travel/index.module.scss";
import {
	allByBest,
	allByDanger,
	allByFood,
	allByWorst,
	allCountriesList,
	allNewestFirst,
	allOldestFirst,
	countTotalCountries,
	funniestOnly,
	searchResult,
} from "../../src/travel/travelDataService";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { VideoLibrary } from "../../src/travel/VideoLibrary";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useHasMounted } from "../../utils/useHasMounted";
import { SortBy } from "../../src/travel/types";
import { TravelSort } from "../../src/travel/components/TravelSort";
import { SearchBar } from "../../src/travel/components/SearchBar";
import { travelVideoMetaData } from "../../src/datasources/TravelMetaData";
import { tabsData } from "../../src/datasources/NavBarMetaData";
import {
	buildTravelQuery,
	parseSearchTextFromQuery,
	parseSortByFromQuery,
} from "../../src/travel/urlQuery";

const sortFunctions = {
	[SortBy.Newest]: allNewestFirst,
	[SortBy.Oldest]: allOldestFirst,
	[SortBy.Best]: allByBest,
	[SortBy.Worst]: allByWorst,
	[SortBy.Food]: allByFood,
	[SortBy.Danger]: allByDanger,
	[SortBy.Funniest]: funniestOnly,
};

const WorldMap = dynamic(
	() =>
		import("../../src/travel/world-map/WorldMap").then(
			(module) => module.WorldMap,
		),
	{
		ssr: false,
		loading: () => <div className={styles.mapPlaceholder} />,
	},
);

const Travel = ({
	initialSortBy,
	initialSearchingText,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const router = useRouter();
	const [searchingText, setSearchingText] = useState<string>(
		initialSearchingText,
	);

	const initialSortSelection = initialSearchingText
		? SortBy.Searching
		: initialSortBy ?? SortBy.Newest;

	const [sortSelection, setSortSelection] = useState(initialSortSelection);

	const hasMounted = useHasMounted();

	useEffect(() => {
		const search = new URLSearchParams(
			buildTravelQuery(sortSelection, searchingText),
		).toString();
		const url = `${router.pathname}${search ? `?${search}` : ""}`;

		window.history.replaceState(window.history.state, "", url);
	}, [router, sortSelection, searchingText]);

	const sortedMetaData = useMemo(
		() =>
			sortSelection === SortBy.Searching
				? searchResult(searchingText)
				: sortFunctions[sortSelection](hasMounted ? undefined : false),
		[sortSelection, searchingText, hasMounted],
	);

	const groupsWithStartIndex = useMemo(
		() =>
			sortedMetaData.map((metaData, index) => ({
				...metaData,
				startIndex: sortedMetaData
					.slice(0, index)
					.reduce((sum, group) => sum + group.grouping.length, 0),
			})),
		[sortedMetaData],
	);

	const handleSearchingTextChange = (value: string) => {
		setSearchingText(value);
		setSortSelection(value ? SortBy.Searching : SortBy.Newest);
	};

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		name: "Travel Video Gallery",
		url: "https://franklin-v-moon.dev/travel",
		description: tabsData[2].pageDescription,
		creator: {
			"@type": "Person",
			name: "Franklin Von Moon",
			url: "https://franklin-v-moon.dev",
		},
	};

	return (
		<div>
			<Head>
				<title>Travel Videos – Franklin Von Moon</title>
				<link rel='canonical' href='https://franklin-v-moon.dev/travel' />
				<link rel='icon' href='/favicon-yellow.ico' />
				<meta name='description' content={tabsData[2].pageDescription} />
				<meta
					property='og:title'
					content='Travel Videos & World Map – Franklin Von Moon'
				/>
				<meta property='og:description' content={tabsData[2].pageDescription} />
				<meta
					property='og:image'
					content='https://private-user-images.githubusercontent.com/42459707/367673150-764558d9-5f59-4574-9268-728ad7498b2f.png'
				/>
				<meta
					property='og:url'
					content='https://franklin-v-moon.dev/travel'
				/>
				<meta property='og:type' content='website' />
				<meta name='twitter:card' content='summary_large_image' />
				<meta
					name='twitter:title'
					content='Travel Videos & World Map – Franklin Von Moon'
				/>
				<meta
					name='twitter:description'
					content={tabsData[2].pageDescription}
				/>
				<meta
					name='twitter:image'
					content='https://private-user-images.githubusercontent.com/42459707/367673150-764558d9-5f59-4574-9268-728ad7498b2f.png'
				/>

				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</Head>

			<PageContainer>
				<div className={styles.worldMap}>
					<WorldMap />
				</div>

				<div className={styles.directoryContainer}>
					<div className={styles.countriesBeenContainer}>
						{!searchingText && (
							<>
								<p className={styles.directorySubText}>
									{travelVideoMetaData.length} Videos
								</p>
								<div className={styles.directorySubtextDivider}>|</div>
								<p className={styles.directorySubText}>
									{countTotalCountries()} Countries
								</p>
							</>
						)}
					</div>

					<div className={styles.sortToggleContainer}>
						<div className={styles.searchContainer}>
							<SearchBar
								searchArray={allCountriesList()}
								searchingText={searchingText}
								setSearchingText={handleSearchingTextChange}
							/>
						</div>
						<TravelSort setSortMetaDataBy={setSortSelection} />
					</div>
				</div>

				{groupsWithStartIndex.map((metaData, index) => (
					<div
						key={`Videos from ${metaData.heading}`}
						className={styles.libraryContainer}
						style={{
							animation: `fadeIn ${index}00ms ease-in-out`,
							opacity: 1,
						}}>
						<div className={styles.yearHeadingContainer}>
							<div className={styles.yearHeading}>
								<NavigateNextRoundedIcon
									style={{
										color: "yellow",
										height: "2.5rem",
										width: "2.5rem",
									}}
								/>
								<h2 className={styles.yearHeadingText}>
									{metaData.heading === "Tags" ? (
										<span>
											Travel with: &quot;<em>{searchingText}</em>&quot;
										</span>
									) : (
										metaData.heading
									)}
								</h2>
							</div>
						</div>
						<VideoLibrary
							videoMetaData={metaData.grouping}
							startIndex={metaData.startIndex}
						/>
					</div>
				))}
			</PageContainer>
			<Footer />
		</div>
	);
};

export const getServerSideProps: GetServerSideProps<{
	initialSortBy: SortBy | null;
	initialSearchingText: string;
}> = async (context) => {
	const initialSortBy = parseSortByFromQuery(context.query);
	const initialSearchingText = parseSearchTextFromQuery(context.query);

	return {
		props: {
			initialSortBy,
			initialSearchingText,
		},
	};
};

export default Travel;
