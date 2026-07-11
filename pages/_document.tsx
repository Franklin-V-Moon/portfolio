import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang='en'>
				<Head>
					<link
						href='https://fonts.cdnfonts.com/css/montserrat'
						rel='stylesheet'
					/>
					<link
						rel='stylesheet'
						href='https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css'></link>
					{/* eslint-disable @next/next/no-sync-scripts */}
					<script src='https://gumroad.com/js/gumroad.js'></script>
					{/* eslint-enable @next/next/no-sync-scripts */}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
