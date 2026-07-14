import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Dispatch, SetStateAction } from "react";
import { Topic } from "../../../types";
import { addTransparency } from "../filterAnimations";

export const SingleSelectFilterField = ({
	label,
	defaultValue,
	filter,
	setFilter,
	dropDownData,
	highlightColor,
}: {
	filter: Topic | undefined;
	setFilter: Dispatch<SetStateAction<Topic | undefined>>;
	dropDownData: Topic[];
	label: string;
	defaultValue: string;
	highlightColor: string;
}) => {
	const handleChange = (event: SelectChangeEvent<string>) => {
		const {
			target: { value },
		} = event;
		setFilter(value === defaultValue ? undefined : (value as Topic));
	};

	const labelId = `${label}-select-label`;

	const dropDownStylingOverrides = {
		"&:hover": {
			backgroundColor: `${addTransparency(highlightColor, 0.4)} !important`,
		},
		"&.Mui-selected": {
			backgroundColor: addTransparency(highlightColor, 0.2),
		},
	};

	return (
		<Box
			sx={{
				m: 2,
				width: 200,
				paddingTop: "20px",
			}}>
			<FormControl fullWidth>
				<InputLabel
					id={labelId}
					sx={{
						"&.Mui-focused": {
							color: highlightColor,
						},
					}}>
					Topic
				</InputLabel>
				<Select
					labelId={labelId}
					value={filter ? filter : defaultValue}
					label={label}
					onChange={handleChange}
					sx={{
						"&.Mui-focused": {
							"&& fieldset": {
								borderColor: highlightColor,
							},
						},
					}}>
					<MenuItem value={defaultValue} sx={dropDownStylingOverrides}>
						{defaultValue}
					</MenuItem>
					{dropDownData.map((item, index) => {
						return (
							<MenuItem key={index} value={item} sx={dropDownStylingOverrides}>
								{item}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
		</Box>
	);
};
