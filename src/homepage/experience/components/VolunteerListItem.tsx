import CommitIcon from "@mui/icons-material/Commit";
import Image from "next/image";

import color from "../../../../themes/_colors.module.scss";
import styles from "../Experience.module.scss";
import volunteerStyles from "./VolunteerListItem.module.scss";

export const VolunteerListItem = ({
	logo,
	title,
	agency,
	location,
	year,
	index,
}: {
	logo: string;
	agency: string;
	title: string;
	location: string;
	year: string;
	index: number;
}) => {
	return (
		<>
			<CommitIcon
				fontSize='large'
				className={`${styles.lineIcon} ${volunteerStyles.lineIcon}`}
			/>
			<div
				className={`${styles.itemContainer} ${volunteerStyles.itemContainer}`}>
				<Image
					src={`/homepage/companies/${logo}.png`}
					alt={`${logo} logo`}
					width={160}
					height={40}
					className={`${styles.logo} ${volunteerStyles.logo}`}
				/>

				<h3 className={`${volunteerStyles.agency}`}>{agency}</h3>
				<div className={`${volunteerStyles.title}`}>{title}</div>

				<div
					className={`${styles.roleLocation} ${volunteerStyles.roleLocation} ${color.brightGrey}`}>
					{location}
				</div>
				<div
					className={`${styles.rolePeriod} ${volunteerStyles.rolePeriod} ${color.brightGrey}`}>
					{year}
				</div>
			</div>
		</>
	);
};
