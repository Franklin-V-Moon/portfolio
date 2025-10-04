import type { NextPage, GetServerSideProps } from "next";
import Image from "next/image";
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
import { ButtonBase, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { SortBy, TravelVideoMetaData } from "../../src/travel/types";
import { TravelSort } from "../../src/travel/components/TravelSort";
import { SearchBar } from "../../src/travel/components/SearchBar";
import { travelVideoMetaData } from "../../src/datasources/TravelMetaData";
import router from "next/router";
import { tabsData } from "../../src/datasources/NavBarMetaData";

type GroupedVideos = {
	heading: string;
	grouping: TravelVideoMetaData[];
};

type ServerSideContext = {
	query: {
		SortBy?: string;
	};
};

type Props = {
	sortedMetaData: GroupedVideos[];
	initialSortBy: SortBy;
};

const Travel: NextPage<Props> = ({ sortedMetaData, initialSortBy }) => {
	const [sortSelection, setSortSelection] = useState(initialSortBy);
	const [searchingText, setSearchingText] = useState("");
	const [videos, setVideos] = useState(sortedMetaData);

	const sortFunctions: Record<
		Exclude<SortBy, SortBy.Searching>,
		() => GroupedVideos[]
	> = {
		[SortBy.Newest]: allNewestFirst,
		[SortBy.Oldest]: allOldestFirst,
		[SortBy.Best]: allByBest,
		[SortBy.Worst]: allByWorst,
		[SortBy.Food]: allByFood,
		[SortBy.Danger]: allByDanger,
		[SortBy.Funniest]: funniestOnly,
	};

	useEffect(() => {
		if (searchingText) {
			const results = searchResult(searchingText);
			setVideos(results);
		} else {
			const sortedData =
				sortFunctions[sortSelection as keyof typeof sortFunctions]();
			setVideos(sortedData);
		}
	}, [sortSelection, searchingText, sortFunctions]);

	const InvisibleImageButton = styled(ButtonBase)(({ theme }) => ({
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "transparent",
		padding: 0,
		border: "none",
		"&:hover, &.Mui-focusVisible": {
			zIndex: 1,
			"& .MuiImage-root": {
				transform: "scale(1.01)",
				transition: theme.transitions.create("transform", {
					duration: theme.transitions.duration.shortest,
				}),
			},
			"& .MuiTouchRipple-root": {
				opacity: 0.15,
			},
		},
		"& .MuiTouchRipple-root": {
			color: "rgba(255, 255, 255, 0.3)",
		},
	}));

	const handleOpenBlankPage = () => {
		router.push("/travel/world-map");
	};

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		name: "Travel Video Gallery",
		url: "https://www.franklin-v-moon.dev/travel",
		description: tabsData[2].pageDescription,
		creator: {
			"@type": "Person",
			name: "Franklin Von Moon",
			url: "https://www.franklin-v-moon.dev",
		},
	};

	return (
		<div>
			<Head>
				<title>Travel Videos – Franklin Von Moon</title>
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
					content='https://www.franklin-v-moon.dev/travel'
				/>
				<meta property='og:type' content='website' />

				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</Head>

			<PageContainer>
				<div style={{ position: "relative", width: "100%", height: "auto" }}>
					<Image
						src='/travel/WorldDotted.png'
						alt='A dotted world map marking all countries visited by Franklin Von Moon'
						width={3840}
						height={1878}
						layout='responsive'
						className={styles.worldMap}
					/>
					<InvisibleImageButton
						focusRipple
						onClick={handleOpenBlankPage}
						aria-label='Open interactive world map'
					/>
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
								setSearchingText={setSearchingText}
							/>
						</div>
						<TravelSort setSortMetaDataBy={setSortSelection} />
					</div>
				</div>

				{videos.map((metaData, index) => (
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
						<VideoLibrary videoMetaData={metaData.grouping} />
					</div>
				))}
			</PageContainer>
			<Footer />
		</div>
	);
};

export const getServerSideProps: GetServerSideProps<Props> = async (
	context,
) => {
	const sortParam = context.query.SortBy;
	let initialSortBy: SortBy = SortBy.Newest;

	if (sortParam && typeof sortParam === "string") {
		const sortEnum = Object.values(SortBy).find(
			(enumValue) => enumValue.toLowerCase() === sortParam.toLowerCase(),
		);

		if (sortEnum) {
			initialSortBy = sortEnum;
		}
	}

	const sortFunctions = {
		[SortBy.Newest]: allNewestFirst,
		[SortBy.Oldest]: allOldestFirst,
		[SortBy.Best]: allByBest,
		[SortBy.Worst]: allByWorst,
		[SortBy.Food]: allByFood,
		[SortBy.Danger]: allByDanger,
		[SortBy.Funniest]: funniestOnly,
	};

	const sortedData =
		sortFunctions[initialSortBy as keyof typeof sortFunctions]();

	return {
		props: {
			sortedMetaData: sortedData,
			initialSortBy: initialSortBy,
		},
	};
};

export default Travel;
