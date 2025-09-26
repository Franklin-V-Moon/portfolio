import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { PageContainer } from "../src/global/PageContainer";
import { HomeFooterImage } from "../src/homepage/homeFooter/HomeFooterImage";
import { ParallaxArt } from "../src/homepage/parallax-art/ParallaxArt";
import { Footer } from "../utils/footer/Footer";
import styles from "../src/homepage/homepage.module.scss";
import { BioDescription } from "../src/homepage/biography/BioDescription";
import Portfolio from "../src/homepage/Portfolio";
import { tabsData } from "../src/datasources/NavBarMetaData";

const Home: NextPage = () => {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: "Franklin Von Moon",
		url: "https://www.franklin-v-moon.dev",
		jobTitle: "Software Engineer & Traveler",
		description: tabsData[0].pageDescription,
		sameAs: [
			"https://www.instagram.com/franklin.v.moon",
			"https://github.com/Franklin-v-moon",
			"https://www.linkedin.com/in/franklin-von-moon-23572518a/",
			"https://www.facebook.com/frank.moon.731/",
		],
	};

	return (
		<>
			<Head>
				<title>Franklin Von Moon</title>
				<link rel='icon' href='/favicon-blue.ico' />
				<meta name='description' content={tabsData[0].pageDescription} />
				<meta property='og:title' content='Franklin Von Moon' />
				<meta property='og:description' content={tabsData[0].pageDescription} />
				<meta
					property='og:image'
					content='https://github.com/user-attachments/assets/63411a74-1521-4cd9-b9f8-a77124ecdfc5'
				/>
				<meta property='og:url' content='https://www.franklin-v-moon.dev/' />
				<meta property='og:type' content='website' />

				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</Head>

			<ParallaxArt />
			<PageContainer>
				<>
					<div className={styles.headshotContainer}>
						<Image
							src={"/homepage/headshot.png"}
							alt='Franklin Von Moon Personal Professional Headshot Photo'
							width={115}
							height={115}
							className={styles.headshot}
						/>
					</div>
					<BioDescription />

					<Portfolio />
				</>
			</PageContainer>
			<HomeFooterImage />
			<Footer isHomepage />
		</>
	);
};

export default Home;
