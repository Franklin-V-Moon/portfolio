import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import {
	volunteeringMetaData,
	workExperienceMetaData
} from "../../datasources/HomepageMetaData";
import { SubHeading } from "../SubHeading";
import { VolunteerListItem } from "./components/VolunteerListItem";
import { WorkExpListItem } from "./components/WorkExpListItem";
import styles from "./Experience.module.scss";

export const Experience = () => {
	const [isMobile, setMobile] = useState(false);
	const [stickyColumnLock, setStickyColumnLock] = useState(0);

	useEffect(() => {
		const getSmallerColumnHeight = (leftCol: string, rightCol: string) => {
			const leftHeightValue = parseFloat(leftCol.replace("px", ""));
			const rightHeightValue = parseFloat(rightCol.replace("px", ""));
			return Math.min(leftHeightValue, rightHeightValue);
		};

		const updateLayout = () => {
			setMobile(window.innerWidth < 600 ? true : false);

			const leftColumn = document.getElementById("right-column");
			const rightColumn = document.getElementById("left-column");

			if (!rightColumn || !leftColumn) {
				return;
			}

			const smallerColumnHeight = getSmallerColumnHeight(
				window.getComputedStyle(leftColumn).getPropertyValue("height"),
				window.getComputedStyle(rightColumn).getPropertyValue("height"),
			);

			setStickyColumnLock(smallerColumnHeight);
		};

		updateLayout();
		window.addEventListener("resize", updateLayout);
		return () => {
			window.removeEventListener("resize", updateLayout);
		};
	}, []);

	const stickyColumn = !isMobile
		? {
				top: `calc(100vh - ${stickyColumnLock}px)`,
		  }
		: {};

	return (
		<>
			<div className={styles.container}>
				<Container
					maxWidth='xs'
					className={styles.column}
					id='left-column'
					style={stickyColumn}>
					<SubHeading text={"Volunteering"} />
					<div className={styles.headingGap} />

					{volunteeringMetaData.map((item, index) => {
						return (
							<VolunteerListItem
								logo={item.logo}
								title={item.title}
								agency={item.agency}
								location={item.location}
								year={item.year}
								key={index}
								index={index}
							/>
						);
					})}
				</Container>
				<Container
					maxWidth='xs'
					className={styles.column}
					id='right-column'
					style={stickyColumn}>
					<SubHeading text={"Employment"} />
					<div className={styles.headingGap} />

					<div>
						{workExperienceMetaData.map((item, index) => {
							return (
								<WorkExpListItem
									companyLogo={item.logo}
									employerName={item.employer}
									periodWithEmployer={item.period}
									employerLocation={item.location}
									employerExperiences={item.experiences}
									key={index}
									index={index}
								/>
							);
						})}
					</div>
				</Container>
			</div>
		</>
	);
};
