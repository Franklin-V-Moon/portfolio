import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Button, Tooltip } from "@mui/material";
import Zoom from "@mui/material/Zoom";
import Image from "next/image";
import Carousel from "nuka-carousel";
import { ExternalLinkButtons } from "./ExternalLinkButtons";
import { ProjectMetaData } from "./types";

import styles from "./ProjectItem.module.scss";
import { splitStringAtFullStop } from "../../utils/split-string/splitStringAtFullStop";

export const ProjectItem = ({
	metaData,
}: {
	metaData: ProjectMetaData;
}) => {
	const subTitleArray = splitStringAtFullStop(metaData.subTitle);

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>{metaData.title}</h2>
			<ExternalLinkButtons metaData={metaData} />
			<Carousel
				wrapAround={true}
				renderBottomCenterControls={null}
				renderCenterLeftControls={({ previousSlide }) => (
					<Tooltip slots={{ transition: Zoom }} title='Previous Slide'>
						<Button onClick={previousSlide} color='brightGrey'>
							<KeyboardArrowLeftIcon />
						</Button>
					</Tooltip>
				)}
				renderCenterRightControls={({ nextSlide }) => (
					<Tooltip slots={{ transition: Zoom }} title='Next Slide'>
						<Button onClick={nextSlide} color='brightGrey'>
							<KeyboardArrowRightIcon />
						</Button>
					</Tooltip>
				)}>
				{metaData.images.map((item, index) => (
					<div className={styles.image} key={index}>
						<Image
							src={item}
							width={1280}
							height={720}
							alt={`Image of my ${metaData.title} project`}
							style={{
								maxWidth: "100%",
								height: "auto",
							}}
						/>
					</div>
				))}
			</Carousel>

			<div className={styles.subTitleContainer}>
				{subTitleArray.map((sentence, index) => {
					return (
						<div className={styles.subTitle} key={index}>
							{sentence}
						</div>
					);
				})}
			</div>
		</div>
	);
};
