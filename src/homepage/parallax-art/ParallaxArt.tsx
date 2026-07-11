import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./ParallaxArt.module.scss";

export const ParallaxArt = () => {
	const [offSetY, setOffSetY] = useState(0);

	const theme = "dark";

	const handleScroll = () => {
		// Stop rendering once parallax is off screen
		if (window.pageYOffset < 2000) {
			setOffSetY(window.pageYOffset);
		}
	};

	const pageTop = offSetY === 0;

	useEffect(() => {
		const handleScrollAnimation = () => {
			handleScroll();
			window.requestAnimationFrame(handleScrollAnimation);
		};
		handleScrollAnimation();
		return () => {
			window.cancelAnimationFrame(handleScrollAnimation as any);
		};
	}, []);

	const [initialLoad, setInitialLoad] = useState(true);

	const [sunRising, setSunRising] = useState(false);
	const [sunAnchored, setSunAnchored] = useState(false);
	const [sunSetting, setSunSetting] = useState(false);
	const [sunInvisible, setSunInvisible] = useState(true);

	const [moonRising, setMoonRising] = useState(false);
	const [moonAnchored, setMoonAnchored] = useState(false);
	const [moonSetting, setMoonSetting] = useState(false);
	const [moonInvisible, setMoonInvisible] = useState(false);

	const transitionMoonUp = () => {
		setMoonInvisible(false);
		setMoonRising(true);

		setSunAnchored(false);
		setSunSetting(true);

		setTimeout(() => {
			setMoonRising(false);
			setMoonAnchored(true);

			setSunSetting(false);
			setSunInvisible(true);
		}, 3000);
	};

	useEffect(() => {
		if (initialLoad) {
			setInitialLoad(false);
			return;
		}

		transitionMoonUp();
	}, [initialLoad]);

	return (
		<>
			<div
				className={styles.outerContainer}
				style={{
					animation: "fadeIn 1000ms ease-in-out",
					opacity: 1,
				}}>
				<div className={styles.innerContainer}>
					<div className={styles.background} />

					<Image
						src={"/homepage/parallax/light/15_moon_sun-01.svg"}
						alt=''
						width={0}
						height={0}
						unoptimized
						className={`${styles.layer} ${sunRising && styles.sunUp} ${
							sunSetting && styles.sunDown
						}`}
						style={{
							zIndex: -8,
							display: sunInvisible ? "none" : "inherit",
							transform: sunAnchored ? `translateY(${offSetY * 0.6}px)` : "",
						}}
					/>
					<Image
						src={"/homepage/parallax/dark/15_moon_sun-01.svg"}
						alt=''
						width={0}
						height={0}
						unoptimized
						className={`${styles.layer} ${moonRising && styles.moonUp} ${
							moonSetting && styles.moonDown
						}`}
						style={{
							zIndex: -8,
							display: moonInvisible ? "none" : "inherit",
							transform: moonAnchored ? `translateY(${offSetY * 0.6}px)` : "",
						}}
					/>
					<Image
						src={`/homepage/parallax/${theme}/14_stars-01.svg`}
						alt=''
						width={0}
						height={0}
						unoptimized
						className={`${styles.layer} ${pageTop && styles.fadeInOutFast}`}
						style={{
							zIndex: -7,
							transform: `translateY(${offSetY * 0.8 - 50}px)`,
						}}
					/>
					<Image
						src={`/homepage/parallax/${theme}/13_stars-01.svg`}
						alt=''
						width={0}
						height={0}
						unoptimized
						className={styles.layer}
						style={{
							zIndex: -7,
							transform: `translateY(${offSetY * 0.84 - 50}px)`,
						}}
					/>
					<Image
						src={`/homepage/parallax/${theme}/12_stars-01.svg`}
						alt=''
						width={0}
						height={0}
						unoptimized
						className={`${styles.layer} ${pageTop && styles.fadeInOutSlow}`}
						style={{
							zIndex: -7,
							transform: `translateY(${offSetY * 0.88 - 20}px)`,
						}}
					/>
					<Image
						src={`/homepage/parallax/${theme}/11_shooting_star-01.svg`}
						alt=''
						width={0}
						height={0}
						unoptimized
						className={`${styles.layer} ${styles.shootingStar}`}
						style={{
							zIndex: -6,
						}}
					/>
					<Image
						src={`/homepage/parallax/${theme}/10_far_mountain-01.svg`}
						alt=''
						width={0}
						height={0}
						unoptimized
						className={styles.layer}
						style={{
							zIndex: -6,
							transform: `translateY(${offSetY * 0.5}px)`,
						}}
					/>
					<Image
						src={`/homepage/parallax/${theme}/9_train-01.svg`}
						alt=''
						width={0}
						height={0}
						unoptimized
						className={`${styles.layer} ${pageTop && styles.trainLeftRight}`}
						style={{
							zIndex: -5,
							transform: `translateY(${offSetY * 0.4}px)`,
						}}
					/>
					<Image
						src={`/homepage/parallax/${theme}/8_clouds_far-01.svg`}
						alt=''
						width={0}
						height={0}
						unoptimized
						className={`${styles.layer} ${
							pageTop && styles.cloudLeftRightSlow
						}`}
						style={{
							zIndex: -6,
							transform: `translateY(${offSetY * 0.45}px)`,
						}}
					/>
					<Image
						src={`/homepage/parallax/${theme}/7_middle_mountain-01.svg`}
						alt=''
						width={0}
						height={0}
						unoptimized
						className={styles.layer}
						style={{
							zIndex: -5,
							transform: `translateY(${offSetY * 0.4}px)`,
						}}
					/>
					<Image
						src={`/homepage/parallax/${theme}/6_close_mountain-01.svg`}
						alt=''
						width={0}
						height={0}
						unoptimized
						className={styles.layer}
						style={{
							zIndex: -4,
							transform: `translateY(${offSetY * 0.35}px)`,
						}}
					/>
					<Image
						src={`/homepage/parallax/${theme}/5_clouds_near-01.svg`}
						alt=''
						width={0}
						height={0}
						unoptimized
						className={`${styles.layer} ${
							pageTop && styles.cloudLeftRightFast
						}`}
						style={{
							zIndex: -3,
							transform: `translateY(${offSetY * 0.25}px)`,
						}}
					/>
					<Image
						src={`/homepage/parallax/${theme}/4_city-01.svg`}
						alt=''
						width={0}
						height={0}
						unoptimized
						priority
						className={styles.layer}
						style={{
							zIndex: -3,
							transform: `translateY(${offSetY * 0.2}px)`,
						}}
					/>
					<Image
						src={`/homepage/parallax/${theme}/3_plane-01.svg`}
						alt=''
						width={0}
						height={0}
						unoptimized
						priority
						className={styles.layer}
						style={{
							zIndex: -2,
							transform: `translateY(${offSetY * 0.005}px)`,
						}}
					/>
					<Image
						src={`/homepage/parallax/${theme}/2_towns-01.svg`}
						alt=''
						width={0}
						height={0}
						unoptimized
						priority
						className={styles.layer}
						style={{
							zIndex: -2,
							transform: `translateY(${offSetY * 0.1}px)`,
						}}
					/>

					<Image
						src={`/homepage/parallax/${theme}/1_motherboard-01.svg`}
						alt=''
						width={0}
						height={0}
						unoptimized
						priority
						className={styles.layer}
						style={{
							zIndex: -1,
						}}
					/>
				</div>
			</div>
		</>
	);
};
