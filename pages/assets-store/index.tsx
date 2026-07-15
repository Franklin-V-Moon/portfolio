import { NextPage } from "next";
import styles from "../../src/assets/index.module.scss";
import Head from "next/head";
import { PageContainer } from "../../src/global/PageContainer";
import { Footer } from "../../utils/footer/Footer";
import AssetSearchBar from "../../src/assets/components/Searchbar/Searchbar";
import { stockFootageMetaData } from "../../src/datasources/AssetMetaData";
import { Box } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import AssetItem from "../../src/assets/components/AssetItem/AssetItem";
import AssetCollection from "../../src/assets/components/AssetCollection/AssetCollection";
import { getFeaturedItems } from "../../src/assets/components/getFeaturedItems";

const pageDescription =
	"Assets of digital products, stock footage and free wallpaper I've collected available for purchase";
const pageUrl = "https://franklin-v-moon.dev/assets-store";
const ogImage = `https://franklin-v-moon.dev/assets/${stockFootageMetaData[0].hostedLink}/${stockFootageMetaData[0].thumbnail}`;

const AssetsStore: NextPage = () => {
	const responsiveFeatured = {
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 3,
			partialVisibilityGutter: 50,
		},
		tablet: {
			breakpoint: { max: 1024, min: 600 },
			items: 2,
			partialVisibilityGutter: 80,
		},
		mobile: {
			breakpoint: { max: 600, min: 0 },
			items: 1,
			partialVisibilityGutter: 150,
		},
	};

	return (
		<>
			<div className={styles.pageContainer}>
				<Head>
					<title>Assets Store - Franklin Von Moon</title>
					<link rel='canonical' href={pageUrl} />
					<link rel='icon' href='/favicon-purple.ico' />
					<meta name='description' content={pageDescription} />
					<meta
						property='og:title'
						content='Assets & Stock Footage Store – Franklin Von Moon'
					/>
					<meta property='og:description' content={pageDescription} />
					<meta property='og:url' content={pageUrl} />
					<meta property='og:type' content='website' />
					<meta property='og:image' content={ogImage} />
					<meta name='twitter:card' content='summary_large_image' />
					<meta
						name='twitter:title'
						content='Assets & Stock Footage Store – Franklin Von Moon'
					/>
					<meta name='twitter:description' content={pageDescription} />
					<meta name='twitter:image' content={ogImage} />

					<script
						type='application/ld+json'
						dangerouslySetInnerHTML={{
							__html: JSON.stringify({
								"@context": "https://schema.org",
								"@type": "CollectionPage",
								name: "Assets and Stock Footage Store",
								description: pageDescription,
								url: pageUrl,
								creator: {
									"@type": "Person",
									name: "Franklin Von Moon",
									url: "https://franklin-v-moon.dev",
								},
							}),
						}}
					/>
				</Head>

				<PageContainer>
					<div className={styles.featuredContainer}>
						<h2>Featured Today</h2>
						<Box sx={{ position: "relative" }}>
							<Carousel
								responsive={responsiveFeatured}
								partialVisible
								ssr
								keyBoardControl
								removeArrowOnDeviceType={["tablet", "mobile"]}>
								{getFeaturedItems(stockFootageMetaData).map((item, key) => (
									<AssetItem item={item} key={`Featured item ${key + 1}`} />
								))}
							</Carousel>
						</Box>
					</div>
					{/* <AssetSearchBar /> */}
					<h1>Stock Footage</h1>
					<div className={styles.assetCollectionsContainer}>
						<div className={styles.assetCollectionsGrid}>
							{stockFootageMetaData.map((item) => (
								<AssetCollection
									collection={item}
									key={`Asset collection of ${item.title}`}
								/>
							))}
						</div>
					</div>
				</PageContainer>
			</div>
			<Footer />
		</>
	);
};

export default AssetsStore;
