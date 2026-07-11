import Head from "next/head";
import { PageContainer } from "../../src/global/PageContainer";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import styles from "../../src/assets/index.module.scss";
import { Button } from "@mui/material";
import router from "next/router";
import { stockFootageMetaData } from "../../src/datasources/AssetMetaData";
import { InferGetServerSidePropsType } from "next";
import { ErrorContent } from "../../utils/error/ErrorContent";
import AssetItem from "../../src/assets/components/AssetItem/AssetItem";
import { Footer } from "../../utils/footer/Footer";
import Image from "next/image";

type ServerSideContext = {
	params: { link: string | string[] | undefined };
};

const AssetCollection = ({
	collectionData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	if (!collectionData) {
		return <ErrorContent />;
	}

	return (
		<>
			<Head>
				<title>
					{collectionData.title} Asset Collection - Franklin Von Moon
				</title>
				<meta name={collectionData.title} content={collectionData.title} />
				<link rel='icon' href='/favicon-purple.ico' />
				<meta
					property='og:image'
					content={`/assets/${collectionData.hostedLink}/${collectionData.thumbnail}`}
				/>
			</Head>

			<PageContainer>
				<div className={styles.returnContainer}>
					<Button
						variant='text'
						color='inherit'
						startIcon={<KeyboardBackspaceOutlinedIcon />}
						onClick={() => router.replace("/assets-store")}>
						Assets Collection
					</Button>
				</div>

				<h1 style={{ fontWeight: "bold", textAlign: "center" }}>
					{collectionData.title}
				</h1>
				{collectionData.assetItemMetaData.length > 0 && (
					<>
						<h2>Stock Footage</h2>
						<div className={styles.assetCollectionsContainer}>
							<div className={styles.assetCollectionsGrid}>
								{collectionData.assetItemMetaData.map((item, key) => (
									<AssetItem item={item} key={`Featured item ${key + 1}`} />
								))}
							</div>
						</div>
					</>
				)}

				{collectionData.wallpapers.length > 0 && (
					<>
						<h2 className={styles.subSection}>Free Wallpapers</h2>
						{collectionData.wallpapers.map((wallpaper) => (
							<div
								className={styles.freeWallpaper}
								key={`Wallpaper: ${wallpaper}`}>
								<Image
									src={`/assets/${collectionData.hostedLink}/${wallpaper}`}
									alt={`Wallpaper: ${wallpaper}`}
									width={3840}
									height={2160}
									sizes='100vw'
									style={{ width: "100%", height: "auto" }}
								/>
							</div>
						))}
					</>
				)}
			</PageContainer>
			<Footer />
		</>
	);
};

export const getServerSideProps = async (context: ServerSideContext) => {
	const { link } = context.params;

	if (typeof link !== "string") {
		throw new Error("Link param is invalid");
	}

	const collectionData = stockFootageMetaData.find(
		(collection) => collection.hostedLink === link,
	);

	return {
		props: {
			collectionData,
		},
	};
};

export default AssetCollection;
