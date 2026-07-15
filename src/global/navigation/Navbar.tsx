import { Tab, Tabs } from "@mui/material";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { tabsData } from "../../datasources/NavBarMetaData";
import styles from "./NavBar.module.scss";

export const Navbar = () => {
	const router = useRouter();

	const initialTab = useCallback(() => {
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
	}, [router.pathname]);

	const [selectedTab, setSelectedTab] = useState(initialTab());

	const handleTabClick = (route: string, tab: number) => {
		setSelectedTab(tab);
		router.replace(route);
	};

	// Resyncs the optimistically-set tab with the actual route, needed for
	// browser back/forward navigation which doesn't go through handleTabClick.
	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setSelectedTab(initialTab());
	}, [router, initialTab]);

	return (
		<>
			<h1 className={styles.visuallyHidden}>{tabsData[selectedTab].pageDescription}</h1>

			<nav role='navigation' aria-label='Main navigation'>
				<div className={styles.logotypeDesktopContainer}>
					<span
						className={`${styles.logotypeText} ${styles.logotypeAlignDesktop} ${styles.logoFirst}`}>
						Franklin
					</span>
					<span
						className={`${styles.logotypeText} ${styles.logotypeAlignDesktop} ${
							styles.logoSecond
						} ${styles[tabsData[selectedTab].gradient]} ${
							styles.logotypeGradientSize
						}`}>
						V Moon
					</span>
				</div>

				<div className={styles.logotypeMobileContainer}>
					<span className={styles.logotypeText}>F</span>
					<span
						className={`${styles.logotypeText} ${
							styles[tabsData[selectedTab].gradient]
						}`}>
						V
					</span>
					<span className={styles.logotypeText}>M</span>
				</div>

				<Tabs
					value={selectedTab}
					scrollButtons={true}
					slotProps={{
						indicator: {
							style: { background: tabsData[selectedTab].color },
						},
					}}
					textColor='inherit'
					variant='standard'
					className={styles.container}
					sx={{
						"& .MuiTabs-list": {
							justifyContent: "flex-end",
						},
					}}>
					{tabsData.map((item, index) => {
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
								icon={item.icon(selectedTab)}
								className={`${styles.tab} ${styles.hover} ${
									styles.baseTabSize
								} ${
									index === 0 ? styles.firstTabDesktop : styles.otherTabsDesktop
								}`}
								style={{
									order: item.order,
									padding: "0.4375rem",
								}}
								key={index}
								aria-current={index === selectedTab ? "page" : undefined}
								// Navbar renders after page content in the DOM (kept content-first
								// for SEO), so positive tabIndex restores nav-first keyboard order.
								// Reserves 1 for the skip link in pages/_app.tsx — keep in sync.
								tabIndex={index + 2}
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
