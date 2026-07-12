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
				<div style={{ height: "70px" }}></div>
				<Analytics />
				<ErrorBoundary>
					<Component {...pageProps} />
				</ErrorBoundary>
				<Navbar />
			</GlobalTheme>
			<Script src='https://gumroad.com/js/gumroad.js' strategy='lazyOnload' />
		</AppCacheProvider>
	);
}

export default MyApp;
