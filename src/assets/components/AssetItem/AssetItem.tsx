import {
	Box,
	Card,
	CardActionArea,
	CardMedia,
	Typography,
} from "@mui/material";
import PermMediaIcon from "@mui/icons-material/PermMedia";

import styles from "./AssetItem.module.scss";
import { AssetItemMetaData } from "../../types";
import { useRef } from "react";

export const AssetItem = ({
	item,
}: {
	item: AssetItemMetaData;
}) => {
	const priceDisplay = item.price === null ? "Free" : `$${item.price}`;
	const gumroadButtonRef = useRef<HTMLAnchorElement>(null);

	const handleCardClick = () => {
		if (gumroadButtonRef.current) {
			gumroadButtonRef.current.click();
		}
	};

	return (
		<Card key={item.title} className={styles.assetCard}>
			<CardActionArea
				onClick={handleCardClick}
				aria-label={`View details for ${item.title}`}>
				<CardMedia
					component='img'
					height='160'
					image={`/assets/${item.thumbnail}`}
					style={{
						borderRadius: "5px",
					}}
					alt={item.title}
				/>
				<Box className={styles.assetCardTitleOverlay}>
					<Typography variant='h6' className={styles.assetCardTitle}>
						{item.title}
					</Typography>
				</Box>
				<Box className={styles.priceTag}>
					<Typography variant='body2' sx={{ fontWeight: "bold" }}>
						{priceDisplay}
					</Typography>
				</Box>
				{item.length && (
					<Box className={styles.videoLengthTag}>
						<Typography
							variant='body2'
							sx={{ fontWeight: "bold", fontSize: "70%" }}>
							{item.length}s
						</Typography>
					</Box>
				)}
				{item.isPack && (
					<Box className={styles.videoLengthTag}>
						<PermMediaIcon sx={{ fontSize: 12 }} />
					</Box>
				)}
			</CardActionArea>

			<a
				ref={gumroadButtonRef}
				className='gumroad-button'
				href={item.link}
				style={{ display: "none" }}></a>
		</Card>
	);
};

export default AssetItem;
