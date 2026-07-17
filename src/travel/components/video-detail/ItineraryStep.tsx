import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import Image from "next/image";
import { Itinerary } from "../../types";
import styles from "./ItineraryStep.module.scss";

const detailBackgroundColor = (detail: {
	isWarning?: boolean;
	isRecommendation?: boolean;
	isInfo?: boolean;
}) => {
	if (detail.isWarning) return "rgba(255, 0, 0, 0.1)";
	if (detail.isRecommendation) return "rgba(255, 247, 0, 0.1)";
	if (detail.isInfo) return "rgba(0, 221, 255, 0.1)";
	return "transparent";
};

export const ItineraryStep = ({
	step,
}: {
	step: Itinerary[number]["steps"][number];
}) => {
	return (
		<Accordion>
			<AccordionSummary
				expandIcon={<ArrowDropDownIcon />}
				aria-controls='panel1-content'
				id='panel1-header'
				style={{ margin: "10px", paddingTop: "10px" }}>
				<h4 className={styles.accordionTitle}>{step.stepTitle}</h4>
				<h4 className={styles.accordionDays}>{step.days}</h4>
			</AccordionSummary>
			<AccordionDetails>
				{step.details.map((detail, detailIndex) => (
					<div key={`detail item ${detailIndex}`}>
						<p
							className={styles.accordionParagraph}
							style={{
								backgroundColor: detailBackgroundColor(detail),
								marginBottom: detail.link ? "-5px" : undefined,
							}}>
							{detail.isInfo && (
								<InfoIcon
									style={{ marginRight: "6px", padding: "8px 0 0 0" }}
								/>
							)}

							{detail.isWarning && (
								<WarningIcon
									style={{ marginRight: "6px", padding: "8px 0 0 0" }}
								/>
							)}

							{detail.isRecommendation && (
								<PsychologyAltIcon
									style={{ marginRight: "6px", padding: "8px 0 0 0" }}
								/>
							)}

							{detail.sentence}
						</p>

						{detail.link && (
							<a
								className={styles.accordionLink}
								href={detail.link}
								target='_blank'>
								{detail.link}
							</a>
						)}

						{detail.image && (
							<Image
								src={`/travel/itineraries/${detail.image}.png`}
								alt={`Picture of ${detail.image}`}
								width={1000}
								height={1000}
								sizes='100vw'
								style={{ width: "100%", height: "auto" }}
							/>
						)}
					</div>
				))}
			</AccordionDetails>
		</Accordion>
	);
};
