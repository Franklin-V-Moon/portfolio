import { Button, Container } from "@mui/material";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import dynamic from "next/dynamic";
import Head from "next/head";
import { NotionAPI } from "notion-client";
import { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";
import type { Code as CodeComponent } from "react-notion-x/build/third-party/code";
import type { ComponentProps } from "react";
import {
	getGuideMetaData,
	getGuideMetaDataByLink,
} from "../../src/guides/guideDataService";
import { GuideMetaData } from "../../src/guides/types";
import { ErrorContent } from "../../utils/error/ErrorContent";

import styles from "../../src/guides/index.module.scss";
import { Footer } from "../../utils/footer/Footer";
import router from "next/router";

const Code = dynamic<ComponentProps<typeof CodeComponent>>(() =>
	import("react-notion-x/build/third-party/code").then((m) => m.Code),
);

type Params = {
	link: string;
};

const PageContent = ({
	notionPage,
	metaData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	if (!notionPage || !metaData) {
		return <ErrorContent />;
	}

	const { title, subTitle, topic, created, link, thumbnail } =
		metaData as GuideMetaData;

	const guideJsonLd = {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: title,
		description: subTitle,
		author: { "@type": "Person", name: "Franklin Von Moon" },
		datePublished: new Date(created * 1000).toISOString(),
		mainEntityOfPage: `https://www.franklin-v-moon.dev/guides/${link}`,
		image: [`https://www.franklin-v-moon.dev${thumbnail}`],
	};

	return (
		<>
			<Head>
				<title>{title} - Franklin Von Moon</title>
				<meta name={subTitle} content={topic} />
				<link rel='icon' href='/favicon-green.ico' />

				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(guideJsonLd).replace(/</g, "\\u003c"),
					}}
				/>
			</Head>

			<Container maxWidth={"md"}>
				<div className={styles.returnContainer}>
					<Button
						variant='text'
						color='inherit'
						startIcon={<KeyboardBackspaceOutlinedIcon />}
						onClick={() => router.replace("/guides")}>
						Guides Library
					</Button>
				</div>
			</Container>

			<Container maxWidth={"md"} className={styles.contentPageContainer}>
				<div className={styles.contentPage}>
					<NotionRenderer
						recordMap={notionPage}
						fullPage={true}
						darkMode={true}
						components={{ Code }}
					/>
				</div>
			</Container>
			<Footer />
		</>
	);
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
	const paths = getGuideMetaData().map((guide) => ({
		params: { link: guide.link },
	}));

	return {
		paths,
		fallback: "blocking",
	};
};

export const getStaticProps: GetStaticProps<
	{
		notionPage: ExtendedRecordMap | null;
		metaData: GuideMetaData | null;
	},
	Params
> = async ({ params }) => {
	const { link } = params as Params;

	const metaData = getGuideMetaDataByLink(link);
	if (!metaData) {
		return {
			notFound: true,
		};
	}

	try {
		const notion = new NotionAPI();
		const notionPage: ExtendedRecordMap = await notion.getPage(
			metaData.notionPage,
		);
		if (!notionPage) {
			throw new Error(
				`Could not find Notion Page with metaData notionPage value of: ${metaData.notionPage}`,
			);
		}

		return {
			props: {
				notionPage,
				metaData,
			},
			revalidate: 3600,
		};
	} catch (error) {
		return {
			props: {
				notionPage: null,
				metaData: null,
			},
			revalidate: 3600,
		};
	}
};

export default PageContent;
