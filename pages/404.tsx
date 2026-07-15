import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@mui/material";
import { PageContainer } from "../src/global/PageContainer";
import { ErrorContent } from "../utils/error/ErrorContent";
import { Footer } from "../utils/footer/Footer";

const Custom404: NextPage = () => {
	return (
		<>
			<Head>
				<title>Page Not Found - Franklin Von Moon</title>
				<meta
					name='description'
					content='The page you are looking for could not be found.'
				/>
				<meta name='robots' content='noindex' />
				<link rel='icon' href='/favicon-red.ico' />
			</Head>

			<PageContainer>
				<ErrorContent />
				<Button variant='text' color='inherit' component={Link} href='/'>
					Back To Home
				</Button>
			</PageContainer>
			<Footer />
		</>
	);
};

export default Custom404;
