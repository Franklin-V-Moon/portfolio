import {
	DocumentContext,
	DocumentProps,
	Head,
	Html,
	Main,
	NextScript,
} from "next/document";
import {
	DocumentHeadTags,
	DocumentHeadTagsProps,
	documentGetInitialProps,
} from "@mui/material-nextjs/v16-pagesRouter";
import { montserrat } from "../themes/fonts";

export default function MyDocument(
	props: DocumentProps & DocumentHeadTagsProps,
) {
	return (
		<Html lang='en'>
			<Head>
				<DocumentHeadTags {...props} />
			</Head>
			<body className={montserrat.className}>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
	return documentGetInitialProps(ctx);
};
