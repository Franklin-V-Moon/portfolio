import { MetaData, FolioData } from "../types";

import styles from "./FolioGrouping.module.scss";

export const FolioGrouping = ({
	grouping,
	handleOpenModal,
}: {
	grouping: FolioData;
	handleOpenModal: (payload: MetaData) => void;
}) => {
	return (
		<div className={styles.container}>
			{grouping.data.map((item, index) => {
				const { title, knowledge, proficiency, description } = item;

				const modalPayload: MetaData = {
					title,
					knowledge,
					proficiency,
					description,
				};
				return (
					<button
						className={styles.folioItem}
						onClick={() => handleOpenModal(modalPayload)}
						key={index}>
						{item.title}
					</button>
				);
			})}
		</div>
	);
};
