import CommitIcon from "@mui/icons-material/Commit";
import Image from "next/image";

import color from "../../../../themes/_colors.module.scss";
import styles from "../Experience.module.scss";

export const WorkExpListItem = ({
	companyLogo,
	employerName,
	periodWithEmployer,
	employerLocation,
	employerExperiences,
	index,
}: {
	companyLogo: string;
	employerName: string;
	periodWithEmployer: string;
	employerLocation?: string;
	employerExperiences: {
		title: string;
		subRole?: string;
		location?: string;
		period: string;
	}[];
	index: number;
}) => {
	return (
		<>
			<CommitIcon
				fontSize='large'
				className={`${styles.lineIcon} ${styles.workExpLineIcon}`}
			/>
			<div className={styles.itemContainer}>
				<div className={styles.logoContainer}>
					<Image
						src={`/homepage/companies/${companyLogo}.png`}
						alt={`${companyLogo} logo`}
						fill
						sizes='160px'
						className={styles.logo}
					/>
				</div>

				<h3 className={styles.employerTitle}>{employerName}</h3>
				{employerLocation && (
					<div className={styles.location}>{employerLocation}</div>
				)}
				<div
					className={`${!employerLocation ? styles.haSubLocations : ""} ${
						color.brightGrey
					}`}>
					{periodWithEmployer}
				</div>

				{employerExperiences.map((experienceItem, index) => {
					return (
						<div key={index} className={styles.roles}>
							{experienceItem.location && (
								<div className={styles.subLocation}>
									{experienceItem.location}
								</div>
							)}
							<div className={styles.roleTitle}>{experienceItem.title}</div>
							{experienceItem.subRole && (
								<div className={styles.subRole}>{experienceItem.subRole}</div>
							)}
							<div className={`${styles.rolePeriod}  ${color.brightGrey}`}>
								{experienceItem.period}
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};
