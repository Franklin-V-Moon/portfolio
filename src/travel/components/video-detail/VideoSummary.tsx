import styles from "./VideoSummary.module.scss";

export const VideoSummary = ({ summary }: { summary: string[] }) => {
	return (
		<div className={styles.summaryContainer}>
			<h2>Summary</h2>
			{summary.map((sentence, index) => (
				<p key={`Paragraph ${index + 1}`} className={styles.summaryParagraph}>
					{sentence}
				</p>
			))}
		</div>
	);
};
