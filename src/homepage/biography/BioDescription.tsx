import { Duration, intervalToDuration } from "date-fns";
import { useEffect, useState } from "react";

import styles from "./BioDescription.module.scss";
import { tabsData } from "../../datasources/NavBarMetaData";

export const BioDescription = () => {
	const timeWorked = () => {
		return intervalToDuration({
			start: new Date("August 2, 2021 09:00:00"),
			end: new Date(),
		});
	};

	const pluralTime = (timeUnit: string, value: number | undefined) => {
		if (value === undefined) {
			return `0 ${timeUnit}s`;
		}
		return value === 1 ? `${value} ${timeUnit}` : `${value} ${timeUnit}s`;
	};

	const [periodWorked, setPeriodWorked] = useState<Duration>();

	useEffect(() => {
		setPeriodWorked(timeWorked());
		const thirtySecondInterval = setInterval(() => {
			setPeriodWorked(timeWorked());
		}, 30 * 1000);
		return () => clearInterval(thirtySecondInterval);
	}, []);

	return (
		<div className={styles.outerContainer}>
			<div className={styles.container}>
				<span className={styles.titleFont}>Franklin</span>
				<span className={`${styles.titleFont} ${styles.gradient}`}>
					{" V Moon "}
				</span>

				<br />
				{/* <ReactTypingEffect
					text={["Developer", "Volunteer", "Designer", "Backpacker"]}
					cursorRenderer={(cursor: string) => (
						<span className={`${styles.autoType} ${color.defaultDarkBlue}`}>
							{cursor}
						</span>
					)}
					displayTextRenderer={(text: string) => {
						return <span className={styles.autoType}>{text}</span>;
					}}
					typingDelay='1500ms'
				/> */}

				{/* <span className={styles.backupAutoType}>Developer</span> */}

				<main className={styles.blurb}>
					{tabsData[0].pageDescription}
					<br />
					<br />
					Practicing professional for {pluralTime(
						"year",
						periodWorked?.years,
					)}{" "}
					{pluralTime("month", periodWorked?.months)}{" "}
					{pluralTime("day", periodWorked?.days)}{" "}
					{pluralTime("hour", periodWorked?.hours)}
					{" and "}
					{pluralTime("minute", periodWorked?.minutes)}{" "}
				</main>
			</div>
		</div>
	);
};
