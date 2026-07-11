import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import { darkTheme } from "./darkMode";

type GlobalTheme = {
	children: React.ReactNode;
};

export const GlobalTheme = (props: GlobalTheme) => {
	const { children } = props;

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
};
