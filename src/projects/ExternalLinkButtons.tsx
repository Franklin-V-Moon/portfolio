import FormatPaintIcon from "@mui/icons-material/FormatPaint";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Button, Tooltip } from "@mui/material";
import Zoom from "@mui/material/Zoom";
import { ProjectMetaData } from "./types";

import styles from "./ExternalLinkButtons.module.scss";

export const ExternalLinkButtons = ({
	metaData,
}: {
	metaData: ProjectMetaData;
}) => {
	return (
		<div className={styles.container}>
			{metaData.deployedURL ? (
				<Tooltip slots={{ transition: Zoom }} title='Deployed Website'>
					<Button
						startIcon={<OpenInNewIcon />}
						color='brightGrey'
						target='_blank'
						href={metaData.deployedURL}>
						SITE
					</Button>
				</Tooltip>
			) : null}
			{metaData.repoURL ? (
				<Tooltip slots={{ transition: Zoom }} title='Github Repository'>
					<Button
						startIcon={<GitHubIcon />}
						color='brightGrey'
						target='_blank'
						href={metaData.repoURL}>
						REPO
					</Button>
				</Tooltip>
			) : null}
			{metaData.uxURL ? (
				<Tooltip slots={{ transition: Zoom }} title='Early Design Documents'>
					<Button
						startIcon={<FormatPaintIcon />}
						color='brightGrey'
						target='_blank'
						href={metaData.uxURL}>
						UX
					</Button>
				</Tooltip>
			) : null}
		</div>
	);
};
