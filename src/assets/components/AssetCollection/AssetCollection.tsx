import {
	Box,
	Card,
	CardActionArea,
	CardMedia,
	Typography,
} from "@mui/material";

import styles from "./assetcollection.module.scss";
import { AssetCollectionMetaData } from "../../types";
import router from "next/router";



export const AssetCollection = ({
	collection,
}: {
	collection: AssetCollectionMetaData;
}) => {
	return (
		<Card key={collection.title} className={styles.assetCard}>
			<CardActionArea
				onClick={() => router.push(`/assets-store/${collection.hostedLink}`)}
				aria-label={`View details for ${collection.title}`}>
				<CardMedia
					component='img'
					height='160'
					image={`/assets/${collection.hostedLink}/${collection.thumbnail}`}
					alt={collection.title}
				/>
				<Box className={styles.assetCardTitleOverlay}>
					<Typography variant='h6' className={styles.assetCardTitle}>
						{collection.title}
					</Typography>
				</Box>
			</CardActionArea>
		</Card>
	);
};

export default AssetCollection;
