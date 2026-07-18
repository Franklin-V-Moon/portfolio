import { Card, Chip } from "@mui/material";
import { languagesMetaData } from "../../datasources/SkillsMetaData";
import { MetaData } from "../types";

import styles from "./Languages.module.scss";

export const Languages = ({
	handleOpenModal,
}: {
	handleOpenModal: (payload: MetaData) => void;
}) => {
	return (
		<div className={styles.container}>
			<h2 className={styles.sectionTitle}>Skillsets</h2>

			<div className={styles.cardGrid}>
				{languagesMetaData.map((group) => {
					const { title, knowledge, proficiency, description, data } = group;

					return (
						<Card key={title} className={styles.card}>
							<button
								className={styles.cardTitle}
								onClick={() =>
									handleOpenModal({
										title,
										knowledge,
										proficiency,
										description,
									})
								}>
								{title}
							</button>
							<div className={styles.chipContainer}>
								{data.map((item) => (
									<Chip
										key={item.title}
										label={item.title}
										className={styles.chip}
										onClick={() => handleOpenModal(item)}
									/>
								))}
							</div>
						</Card>
					);
				})}
			</div>
		</div>
	);
};
