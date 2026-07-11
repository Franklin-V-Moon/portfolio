import Document, { Head, Html, Main, NextScript } from "next/document";
import { montserrat } from "../themes/fonts";

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang='en'>
				<Head />
				<body className={montserrat.className}>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
