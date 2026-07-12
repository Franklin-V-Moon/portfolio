import { Dialog } from "@mui/material";
import type { NextPage } from "next";
import { useState } from "react";
import {
	cloudMetaData,
	toolsMetaData,
} from "../datasources/SkillsMetaData";
import { FolioModal } from "./modal/FolioModal";
import { Languages } from "./languages/Languages";
import { FolioColumn } from "./folio-column/FolioColumn";
import { MetaData } from "./types";
import { slideTransition } from "../guides/components/filter/filterAnimations";

import styles from "../../src/folio/index.module.scss";

const Transition = slideTransition("right");

export const Folio: NextPage = () => {
	const [showModal, setShowModal] = useState(false);
	const [modalPayload, setModalPayload] = useState<MetaData>();

	const handleOpenModal = (payload: MetaData) => {
		setModalPayload(payload);
		setShowModal(true);
	};

	return (
		<div>
			<div className={styles.modalContainer}>
				<Dialog
					open={showModal}
					slots={{ transition: Transition }}
					onClose={() => setShowModal(false)}>
					{FolioModal(setShowModal, modalPayload)}
				</Dialog>
			</div>

			<Languages handleOpenModal={handleOpenModal} />
			<div className={styles.columnsContainer}>
				<FolioColumn
					title='Tools'
					metaData={toolsMetaData}
					handleOpenModal={handleOpenModal}
				/>
				<FolioColumn
					title='Cloud'
					metaData={cloudMetaData}
					handleOpenModal={handleOpenModal}
				/>
			</div>
		</div>
	);
};

export default Folio;
