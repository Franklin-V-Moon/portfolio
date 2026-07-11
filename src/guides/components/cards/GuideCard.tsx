import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	LinearProgress,
	Tooltip,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { GuideMetaData } from "../../types";
import { subTitleShortener, titleShortener } from "./textFormatter";
import styles from "./GuideCard.module.scss";

export const GuideCard = ({
	cardData,
}: {
	cardData: GuideMetaData;
}): JSX.Element => {
	const [loading, setLoading] = useState(false);
	const href = `/guides/${cardData.link}`;

	return (
		<div className={styles.container}>
			<Card className={styles.card}>
				<CardActionArea
					component={Link as any}
					href={href}
					onClick={() => setLoading(true)}
					sx={{ textDecoration: "none", color: "inherit", display: "block" }}
					aria-label={`Read guide: ${cardData.title}`}>
					<CardMedia
						component='img'
						height='180'
						alt={`${cardData.title} thumbnail`}
						image={cardData.thumbnail}
						decoding='async'
						loading='lazy'
					/>
					<CardContent>
						<div className={styles.cardContent}>
							<h5 className={styles.topicContainer}>
								<div className={styles.topicText}>{cardData.topic}</div>
							</h5>

							<h6 className={styles.title}>{titleShortener(cardData.title)}</h6>

							<Tooltip title={cardData.subTitle} followCursor>
								<p className={styles.subtitle}>
									{subTitleShortener(cardData.subTitle)}
								</p>
							</Tooltip>
						</div>
					</CardContent>

					<div className={styles.loadingContainer} aria-hidden='true'>
						{loading && <LinearProgress color='success' />}
					</div>
				</CardActionArea>
			</Card>
		</div>
	);
};
