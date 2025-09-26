import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../../../src/travel/index.module.scss";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import { Footer } from "../../../utils/footer/Footer";
import { Button } from "@mui/material";
import router from "next/router";
import PinchIcon from "@mui/icons-material/Pinch";
import SwipeIcon from "@mui/icons-material/Swipe";

const WorldMapPage: NextPage = () => {
	const description = "Every location I've properly traveled.";

	return (
		<div className={styles.freeMap}>
			<Head>
				<title>Travel - Franklin Von Moon</title>
				<meta name='Travel' content={description} />
				<link rel='icon' href='/favicon-yellow.ico' />
				<meta name='description' content={description} />
				<meta property='og:title' content='Franklin Von Moon Travel' />
				<meta property='og:description' content={description} />
				<meta
					property='og:image'
					content='https://private-user-images.githubusercontent.com/42459707/367673150-764558d9-5f59-4574-9268-728ad7498b2f.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjY0NzE5OTYsIm5iZiI6MTcyNjQ3MTY5NiwicGF0aCI6Ii80MjQ1OTcwNy8zNjc2NzMxNTAtNzY0NTU4ZDktNWY1OS00NTc0LTkyNjgtNzI4YWQ3NDk4YjJmLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA5MTYlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwOTE2VDA3MjgxNlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWNiMGU4YTc5OTkwMGZhZTZjYzkwY2YxNTBkZTI0ZTBiOTEzODUwMTBmMWRlNmIzOWJjOGNiOTJlODhiNmE1NmQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.VCNSD5LCx1ES3Cko_u28azndr9Jps0Z7ATg0hwsIVXQ'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<meta
					property='og:url'
					content='https://www.franklin-v-moon.dev/world-map'
				/>
				<meta property='og:type' content='website' />
			</Head>

			<h1
				className={styles.mapTitle}
				style={{
					animation: "fadeIn 2000ms ease-in-out",
					opacity: 1,
				}}>
				Where did I go...
			</h1>

			<div className={styles.mapReturnContainer}>
				<Button
					variant='text'
					color='inherit'
					startIcon={<KeyboardBackspaceOutlinedIcon />}
					onClick={() => router.replace("/travel")}>
					Return To Travel Page
				</Button>
			</div>

			<div
				className={styles.mapImage}
				style={{
					animation: "fadeIn 1000ms ease-in-out",
					opacity: 1,
				}}>
				<Image
					src='/travel/WorldDotted.png'
					alt='A full map of the world with everywhere I have been marked'
					width={3840}
					height={1878}
					layout='responsive'
				/>
			</div>
			<div className={styles.mapGesture}>
				<PinchIcon fontSize='large' color='inherit' />
				<SwipeIcon fontSize='large' color='inherit' />
			</div>
			<Footer hideToTop />
		</div>
	);
};

export default WorldMapPage;
