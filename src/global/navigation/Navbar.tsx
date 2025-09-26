import { Tab, Tabs } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { tabsData } from "../../datasources/NavBarMetaData";
import styles from "./NavBar.module.scss";

export const Navbar = () => {
	const router = useRouter();

	const [isSmallScreen, setIsSmallScreen] = useState(false);

	useEffect(() => {
		const checkScreenSize = () => {
			setIsSmallScreen(window.innerWidth < 900);
		};

		checkScreenSize();
		window.addEventListener("resize", checkScreenSize);

		return () => window.removeEventListener("resize", checkScreenSize);
	}, []);

	const initialTab = () => {
		const currentBrowserRoute = router.pathname;

		if (currentBrowserRoute === tabsData[0].route) {
			return 0;
		}

		for (let tab = 1; tab < tabsData.length; tab++) {
			if (currentBrowserRoute.startsWith(tabsData[tab].route)) {
				return tab;
			}
		}

		return 0;
	};

	const [tabIndex, setTabIndex] = useState(initialTab());

	const handleTabClick = (route: string, tab: number) => {
		setTabIndex(tab);
		router.replace(route);
	};

	useEffect(() => {
		setTabIndex(initialTab());
	}, [router, initialTab]);

	const ensureTabsFit = (index: number) => {
		const largeScreenTab = index === 0 ? "9.475rem" : "7.7rem";
		return { minWidth: isSmallScreen ? "5rem" : largeScreenTab };
	};

	return (
		<>
			<h1 className={styles.behindNav}>{tabsData[tabIndex].pageDescription}</h1>

			<nav role='navigation' aria-label='Main navigation'>
				<div className={styles.logotypeDesktopContainer}>
					<span
						className={`${styles.logotypeText} ${styles.logotypeAlignDesktop} ${styles.logoFirst}`}>
						Franklin
					</span>
					<span
						className={`${styles.logotypeText} ${styles.logotypeAlignDesktop} ${
							styles.logoSecond
						} ${styles[tabsData[tabIndex].gradient]} ${
							styles.logotypeGradientSize
						}`}>
						V Moon
					</span>
				</div>

				<div className={styles.logotypeMobileContainer}>
					<span className={styles.logotypeText}>F</span>
					<span
						className={`${styles.logotypeText} ${
							styles[tabsData[tabIndex].gradient]
						}`}>
						V
					</span>
					<span className={styles.logotypeText}>M</span>
				</div>

				<Tabs
					value={tabIndex}
					scrollButtons={true}
					TabIndicatorProps={{
						style: { background: tabsData[tabIndex].color },
					}}
					textColor='inherit'
					variant='standard'
					className={styles.container}
					sx={{
						"& .MuiTabs-flexContainer": {
							justifyContent: "flex-end",
						},
					}}>
					{tabsData.map((item, index) => {
						const tabStyles = ensureTabsFit(index);

						if (item.disabled) {
							return;
						}

						return (
							<Tab
								label={
									item.label || (
										<span className={styles.visuallyHidden}>PORTFOLIO</span>
									)
								}
								icon={item.icon(tabIndex)}
								className={`${styles.tab} ${styles.hover}`}
								style={{
									order: item.order,
									fontSize: isSmallScreen ? "0.7rem" : "0.9rem",
									padding: "0.4375rem",
									...tabStyles,
								}}
								key={index}
								tabIndex={index + 1}
								onClick={() => {
									handleTabClick(item.route, index);
								}}
								href={item.route}
							/>
						);
					})}
				</Tabs>
			</nav>
		</>
	);
};
