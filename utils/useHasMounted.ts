import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export const useHasMounted = () =>
	useSyncExternalStore(
		emptySubscribe,
		() => true,
		() => false,
	);
