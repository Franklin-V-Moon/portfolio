import { MetaData } from "../types";

import styles from "./LanguagesRow.module.scss";

export const LanguagesRow = ({
	item,
	handleOpenModal,
}: {
	item: MetaData;
	handleOpenModal: (payload: MetaData) => void;
}) => {
	const { title, knowledge, proficiency, description } = item;

	const modalPayload: MetaData = {
		title: title,
		knowledge,
		proficiency,
		description,
	};

	return (
		<button
			className={styles.rowItem}
			onClick={() => handleOpenModal(modalPayload)}>
			{item.title}
		</button>
	);
};
