import Image, { ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./ImageWithSkeleton.module.scss";

export const ImageWithSkeleton = ({
	alt,
	className,
	onLoad,
	...props
}: ImageProps) => {
	const [loaded, setLoaded] = useState(false);
	const imgRef = useRef<HTMLImageElement>(null);

	useEffect(() => {
		if (imgRef.current?.complete) {
			setLoaded(true);
		}
	}, []);

	return (
		<Image
			{...props}
			ref={imgRef}
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
