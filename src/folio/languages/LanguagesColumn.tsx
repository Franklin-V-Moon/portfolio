import { ColumnData, MetaData } from "../types";
import { LanguagesRow } from "./LanguagesRow";

import styles from "./LanguagesColumn.module.scss";

type LanguagesColumnProps = {
	columnData: ColumnData;
	handleOpenModal: (payload: MetaData) => void;
};

export const LanguagesColumn = (props: LanguagesColumnProps) => {
	const { columnData, handleOpenModal } = props;
	const { title, data, knowledge, proficiency, description } = columnData;

	const modalPayload: MetaData = {
		title,
		knowledge,
		proficiency,
		description,
	};

	return (
		<div className={styles.container}>
			<div>
				<div className={styles.columnWrapper}>
					<h2
						className={styles.title}
						onClick={() => handleOpenModal(modalPayload)}>
						{title}
					</h2>
					<div className={styles.columnContainer}>
						<div className={styles.column}>
							{data.map((item, index) => {
								return (
									<LanguagesRow
										item={item}
										handleOpenModal={handleOpenModal}
										key={index}
									/>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
