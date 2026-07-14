import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { Button } from "@mui/material";
import { Dispatch } from "react";

type FilterButtonProps = {
	setShowFilterMenu: Dispatch<React.SetStateAction<boolean>>;
	showFilterMenu: boolean;
};
export const FilterButton = (props: FilterButtonProps) => {
	const { setShowFilterMenu, showFilterMenu } = props;

	const handleOpenFilterMenu = () => {
		setShowFilterMenu(true);
	};

	return (
		<Button
			onClick={handleOpenFilterMenu}
			color='brightGrey'
			aria-haspopup='dialog'
			aria-expanded={showFilterMenu ? "true" : undefined}
			endIcon={<FilterAltOutlinedIcon />}>
			Filter
		</Button>
	);
};
