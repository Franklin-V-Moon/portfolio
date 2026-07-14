import { useSyncExternalStore } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const subscribe = (callback: () => void) => {
	const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY);
	mediaQueryList.addEventListener("change", callback);
	return () => mediaQueryList.removeEventListener("change", callback);
};

const getSnapshot = () => window.matchMedia(REDUCED_MOTION_QUERY).matches;

const getServerSnapshot = () => false;

export const usePrefersReducedMotion = () =>
	useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
