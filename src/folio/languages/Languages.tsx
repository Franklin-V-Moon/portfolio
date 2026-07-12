import { Button, Card, Grid } from "@mui/material";
import { useState } from "react";
import { languagesMetaData } from "../../datasources/SkillsMetaData";
import { MetaData } from "../types";
import { LanguagesColumn } from "./LanguagesColumn";

import styles from "./Languages.module.scss";

export const Languages = ({
	handleOpenModal,
}: {
	handleOpenModal: (payload: MetaData) => void;
}) => {

	return (
		<div className={styles.container}>
			<h2 className={styles.sectionTitle}>Skillsets</h2>

			<Card>
					<Grid container className={styles.columnContainer}>
						{languagesMetaData.map((columnData, index) => {
							return (
								<Grid key={index}>
									<LanguagesColumn
										columnData={columnData}
										handleOpenModal={handleOpenModal}
									/>
								</Grid>
							);
						})}
					</Grid>
			</Card>
		</div>
	);
};
