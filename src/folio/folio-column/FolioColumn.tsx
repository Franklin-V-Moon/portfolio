import { FolioGrouping } from "./FolioGrouping";
import { FolioSubHeading } from "../folio-heading/FolioSubHeading";
import { MetaData, FolioData } from "../types";

import styles from "./FolioColumn.module.scss";

export const FolioColumn = ({
	title,
	metaData,
	handleOpenModal,
}: {
	title: string;
	metaData: FolioData[];
	handleOpenModal: (payload: MetaData) => void;
}) => {
	return (
		<div className={styles.container}>
			<FolioSubHeading title={title} />

			<div className={styles.dataContainer}>
				{metaData.map((grouping, index) => {
					return (
						<div key={index} className={styles.folioGroupingContainer}>
							<h2 className={styles.folioHeading}>{grouping.title}</h2>
							<FolioGrouping
								grouping={grouping}
								handleOpenModal={handleOpenModal}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};
