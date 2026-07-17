import { Extras } from "../../types";
import indexStyles from "../../index.module.scss";
import styles from "./MusicAndLinks.module.scss";

export const MusicAndLinks = ({
	music,
	extraLinks,
}: {
	music?: Extras["music"];
	extraLinks?: Extras["extraLinks"];
}) => {
	return (
		<div className={indexStyles.extrasContainer}>
			{music && (
				<div className={indexStyles.extraInfoContainer}>
					<div className={styles.songsContainer}>
						<h2 className={styles.extraInfoHeading}>Music Used</h2>
						{music.map((song) => (
							<div key={song.title} className={styles.songItem}>
								<a
									className={styles.musicItem}
									href={song.link}
									target='_blank'>
									♫ ‎ {song.title}
								</a>
							</div>
						))}
					</div>
				</div>
			)}
			{extraLinks && (
				<div className={indexStyles.extraInfoContainer}>
					<h2 className={styles.extraInfoHeading}>Links</h2>
					{extraLinks.map((linkItem) => (
						<div key={linkItem.title} className={styles.extraLinksWrapper}>
							<h4 className={styles.extraLinkItem}>{linkItem.title}</h4>
							<a
								className={styles.extraLinkItemLink}
								href={linkItem.link}
								target='_blank'>
								{linkItem.link}
							</a>
						</div>
					))}
				</div>
			)}
		</div>
	);
};
