import { Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { usePrefersReducedMotion } from "../../../../utils/usePrefersReducedMotion";

export const closeMenu = (
	event: Event | React.SyntheticEvent,
	setOpen: React.Dispatch<React.SetStateAction<boolean>>,
	anchorRef: React.RefObject<HTMLButtonElement | null>,
): void => {
	if (
		anchorRef.current &&
		anchorRef.current.contains(event.target as HTMLElement)
	) {
		return;
	}

	setOpen(false);
};

export const keyboardNavigation = (
	event: React.KeyboardEvent,
	setOpen: React.Dispatch<React.SetStateAction<boolean>>,
) => {
	if (event.key === "Tab") {
		event.preventDefault();
		setOpen(false);
	} else if (event.key === "Escape") {
		setOpen(false);
	}
};

export const slideTransition = (
	direction: "left" | "right" | "up" | "down" | undefined,
) => {
	return React.forwardRef(function Transition(
		props: TransitionProps & {
			children: React.ReactElement<any, any>;
		},
		ref: React.Ref<unknown>,
	) {
		const prefersReducedMotion = usePrefersReducedMotion();

		return (
			<Slide
				direction={direction}
				ref={ref}
				{...props}
				timeout={prefersReducedMotion ? 0 : 550}
			/>
		);
	});
};

export const addTransparency = (color: string, opacity: number): string => {
	const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
	return color + _opacity.toString(16).toUpperCase();
};
