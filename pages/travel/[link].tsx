import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import Head from "next/head";
import { ErrorContent } from "../../utils/error/ErrorContent";
import { Footer } from "../../utils/footer/Footer";
import { TravelVideoMetaData } from "../../src/travel/types";
import {
	getTravelMetaDataIndex,
	addToWatchedVideosStorage,
	hasRestrictionBypass,
} from "../../src/travel/travelDataService";
import styles from "../../src/travel/index.module.scss";
import { travelVideoMetaData } from "../../src/datasources/TravelMetaData";
import { buildVideoJsonLd } from "../../src/travel/videoJsonLd";
import { PageContainer } from "../../src/global/PageContainer";
import { VideoLibrary } from "../../src/travel/VideoLibrary";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { VideoPlayer } from "../../src/travel/components/video-detail/VideoPlayer";
import { LockedVideo } from "../../src/travel/components/video-detail/LockedVideo";
import { VideoSummary } from "../../src/travel/components/video-detail/VideoSummary";
import { VideoScorecard } from "../../src/travel/components/video-detail/VideoScorecard";
import { TravelAdvice } from "../../src/travel/components/video-detail/TravelAdvice";
import { ChallengesDosDonts } from "../../src/travel/components/video-detail/ChallengesDosDonts";
import { ItineraryList } from "../../src/travel/components/video-detail/ItineraryList";
import { BonusVideos } from "../../src/travel/components/video-detail/BonusVideos";
import { MusicAndLinks } from "../../src/travel/components/video-detail/MusicAndLinks";
import { InstagramGrid } from "../../src/travel/components/video-detail/InstagramGrid";

const VideoContent = ({
	metaData,
	upNext,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	const { title, year, instagramLinks, extras } = metaData as TravelVideoMetaData;

	const router = useRouter();

	const [durationISO, setDurationISO] = useState<string>();

	const upNextMetaData = upNext as TravelVideoMetaData[];

	if (!metaData) {
		return <ErrorContent />;
	}

	if (metaData.backupLink) {
		addToWatchedVideosStorage(metaData.link);
	}

	const isUnlocked = hasRestrictionBypass() || !metaData.restricted;

	const { description, pageUrl, ogImage, jsonLd } = buildVideoJsonLd({
		metaData,
		durationISO,
	});

	return (
		<>
			<Head>
				<title>{`${title} - ${year} - Franklin Von Moon`}</title>
				<meta name='description' content={description} />
				<link rel='canonical' href={pageUrl} />
				<link rel='icon' href='/favicon-yellow.ico' />
				<meta property='og:title' content={title} />
				<meta property='og:description' content={description} />
				<meta property='og:url' content={pageUrl} />
				<meta property='og:type' content='video.other' />
				<meta property='og:image' content={ogImage} />
				<meta name='twitter:card' content='summary_large_image' />
				<meta name='twitter:title' content={title} />
				<meta name='twitter:description' content={description} />
				<meta name='twitter:image' content={ogImage} />
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
					}}
				/>
			</Head>

			<PageContainer>
				<div className={styles.returnContainer}>
					<Button
						variant='text'
						color='inherit'
						startIcon={<KeyboardBackspaceOutlinedIcon />}
						onClick={() => router.replace("/travel")}>
						Video Library
					</Button>
				</div>

				<article>
					<h1 className={styles.title}>{title}</h1>
					<h2 className={styles.year}>{year}</h2>

					{isUnlocked ? (
						<VideoPlayer metaData={metaData} onDuration={setDurationISO} />
					) : (
						<LockedVideo metaData={metaData} />
					)}

					{extras && (
						<>
							<div className={styles.extrasContainer}>
								{extras.summary && <VideoSummary summary={extras.summary} />}

								{extras.scorecard && typeof extras.finalScore === "number" && (
									<VideoScorecard
										scorecard={extras.scorecard}
										finalScore={extras.finalScore}
										countries={extras.countries}
									/>
								)}
							</div>

							<div className={styles.extrasContainer}>
								<TravelAdvice
									advice={extras.advice}
									travelAdvisory={extras.travelAdvisory}
								/>
								<ChallengesDosDonts
									challenges={extras.challenges}
									dos={extras.dos}
									donts={extras.donts}
								/>
							</div>

							{extras.itineraries && (
								<ItineraryList
									itineraries={extras.itineraries}
									videoTitle={title}
								/>
							)}

							{extras.extraVideos && isUnlocked && (
								<BonusVideos extraVideos={extras.extraVideos} />
							)}

							<MusicAndLinks
								music={extras.music}
								extraLinks={extras.extraLinks}
							/>
						</>
					)}

					{instagramLinks && (
						<InstagramGrid instagramLinks={instagramLinks} />
					)}
				</article>

				<div className={styles.upNextContainer}>
					{upNextMetaData.length >= 1 ? (
						<>
							<h2>Up Next...</h2>
							<VideoLibrary
								videoMetaData={[...upNextMetaData].slice(0, 5).reverse()}
							/>
						</>
					) : (
						<>
							<h2>From The Start...</h2>
							<VideoLibrary
								videoMetaData={[...travelVideoMetaData].slice(0, 5).reverse()}
							/>
						</>
					)}
				</div>
			</PageContainer>
			<Footer />
		</>
	);
};

type Params = {
	link: string;
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
	const paths = travelVideoMetaData.map((video) => ({
		params: { link: video.link },
	}));

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps<
	{
		metaData: TravelVideoMetaData;
		upNext: TravelVideoMetaData[];
	},
	Params
> = async ({ params }) => {
	const { link } = params as Params;

	const metaDataIndex = getTravelMetaDataIndex(link);

	return {
		props: {
			metaData: travelVideoMetaData[metaDataIndex],
			upNext: travelVideoMetaData.slice(metaDataIndex + 1),
		},
	};
};

export default VideoContent;
