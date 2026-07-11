import Image, { ImageProps } from "next/image";
import { useState } from "react";
import styles from "./ImageWithSkeleton.module.scss";

export const ImageWithSkeleton = ({
	alt,
	className,
	onLoad,
	...props
}: ImageProps) => {
	const [loaded, setLoaded] = useState(false);

	return (
		<Image
			{...props}
			alt={alt}
			className={`${className ?? ""} ${styles.image} ${
				loaded ? styles.loaded : styles.skeleton
			}`}
			onLoad={(event) => {
				setLoaded(true);
				onLoad?.(event);
			}}
		/>
	);
};

export default ImageWithSkeleton;
