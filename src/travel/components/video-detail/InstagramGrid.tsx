import { ComponentType } from "react";
import {
	InstagramEmbed as InstagramEmbedImport,
	InstagramEmbedProps,
} from "react-social-media-embed/dist/components/embeds/InstagramEmbed";
import { useHasMounted } from "../../../../utils/useHasMounted";
import styles from "./InstagramGrid.module.scss";

const InstagramEmbed =
	InstagramEmbedImport as unknown as ComponentType<InstagramEmbedProps>;

export const InstagramGrid = ({ instagramLinks }: { instagramLinks: string[] }) => {
	const hasMounted = useHasMounted();

	return (
		<div className={styles.socialContainer}>
			<h2>Instagram</h2>
			<div className={styles.customGrid}>
				{hasMounted &&
					instagramLinks.map((link) => (
						<div key={link} className={styles.embeddedPost}>
							<InstagramEmbed url={link} width={350} />
						</div>
					))}
			</div>
		</div>
	);
};
