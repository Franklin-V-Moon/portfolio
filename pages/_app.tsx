import type { AppProps } from "next/app";
import "prismjs/themes/prism-tomorrow.css";
import { Analytics } from "@vercel/analytics/react";
import "react-notion-x/src/styles.css";
import { Navbar } from "../src/global/navigation/Navbar";
import "../themes/globals.css";
import { GlobalTheme } from "../themes/GlobalTheme";
import Head from "next/head";
import Script from "next/script";
import { AppCacheProvider } from "@mui/material-nextjs/v16-pagesRouter";
import { ErrorBoundary } from "../utils/error/ErrorBoundary";
import styles from "./_app.module.scss";

function MyApp(props: AppProps) {
	const { Component, pageProps } = props;

	return (
		<AppCacheProvider {...props}>
			<Head>
				<meta
					name='google-site-verification'
					content='ugeNmMBQZxzx7DdAB7Yiai60hQrDteHxAD_SCugJd94'
				/>
			</Head>
			<GlobalTheme>
				{/* tabIndex=1: must stay lower than Navbar's tab tabIndex (Navbar.tsx) so this reaches focus first */}
				<a href='#main-content' className={styles.skipLink} tabIndex={1}>
					Skip to content
				</a>
				<div style={{ height: "70px" }}></div>
				<Analytics />
				<main id='main-content' tabIndex={-1}>
					<ErrorBoundary>
						<Component {...pageProps} />
					</ErrorBoundary>
				</main>
				<Navbar />
			</GlobalTheme>
			<Script src='https://gumroad.com/js/gumroad.js' strategy='lazyOnload' />
		</AppCacheProvider>
	);
}

export default MyApp;
