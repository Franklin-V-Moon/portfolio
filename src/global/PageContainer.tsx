import { Container } from "@mui/material";
import React from "react";
import { usePrefersReducedMotion } from "../../utils/usePrefersReducedMotion";
import styles from "./PageContainer.module.scss";

export const PageContainer = ({ children }: { children: React.ReactNode }) => {
	const prefersReducedMotion = usePrefersReducedMotion();

	return (
		<div
			style={{
				animation: prefersReducedMotion
					? "none"
					: "fadeIn 1000ms ease-in-out",
				opacity: 1,
			}}>
			<Container maxWidth='lg' className={styles.container}>
				{children}
			</Container>
		</div>
	);
};
