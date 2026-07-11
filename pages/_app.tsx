import type { AppProps } from "next/app";
import "prismjs/themes/prism-tomorrow.css";
import { Analytics } from "@vercel/analytics/react";
import "react-notion-x/src/styles.css";
import { Navbar } from "../src/global/navigation/Navbar";
import "../themes/globals.css";
import { GlobalTheme } from "../themes/GlobalTheme";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
	if (typeof window !== "undefined") {
		document.body.style.overflowX = "hidden";
	}

	return (
		<>
			<Head>
				<meta
					name='google-site-verification'
					content='ugeNmMBQZxzx7DdAB7Yiai60hQrDteHxAD_SCugJd94'
				/>
			</Head>
			<GlobalTheme>
				<div style={{ height: "70px" }}></div>
				<Analytics />
				<Component {...pageProps} />
				<Navbar />
			</GlobalTheme>
		</>
	);
}

export default MyApp;
