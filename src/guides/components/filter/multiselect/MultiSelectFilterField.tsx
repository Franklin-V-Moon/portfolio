import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Dispatch, SetStateAction } from "react";
import { Languages, Tags } from "../../../types";
import { addTransparency } from "../filterAnimations";

type LanguagesFilter = {
	filter: Languages[];
	setFilter: Dispatch<SetStateAction<Languages[]>>;
	dropDownData: Languages[];
};

type TagsFilter = {
	filter: Tags[];
	setFilter: Dispatch<SetStateAction<Tags[]>>;
	dropDownData: Tags[];
};

type MultiSelectFilterProps = (LanguagesFilter | TagsFilter) & {
	label: string;
	highlightColor: string;
};

export const MultiSelectFilterField = (props: MultiSelectFilterProps) => {
	const { label, filter, setFilter, dropDownData, highlightColor } = props;

	const labelId = `${label}-select-label`;

	const handleChange = (event: SelectChangeEvent<Languages[] | Tags[]>) => {
		const {
			target: { value },
		} = event;

		(setFilter as Dispatch<SetStateAction<Languages[] | Tags[]>>)(
			value as Languages[] | Tags[],
		);
	};

	return (
		<div>
			<FormControl sx={{ m: 2, width: 300 }}>
				<InputLabel
					id={labelId}
					sx={{
						"&.Mui-focused": {
							color: highlightColor,
						},
					}}>
					{label}
				</InputLabel>
				<Select
					multiple
					labelId={labelId}
					value={filter}
					onChange={handleChange}
					input={<OutlinedInput label={label} />}
					sx={{
						"&.Mui-focused": {
							"&& fieldset": {
								borderColor: highlightColor,
							},
						},
					}}
					renderValue={(selected) => (
						<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
							{selected.map((value) => (
								<Chip key={value} label={value} />
							))}
						</Box>
					)}
					MenuProps={{
						slotProps: {
							paper: {
								style: {
									maxHeight: 48 * 4.5 + 8,
									width: 300,
								},
							},
						},
					}}>
					{dropDownData.map((item) => (
						<MenuItem
							key={item}
							value={item}
							sx={{
								"&:hover": {
									backgroundColor: `${addTransparency(
										highlightColor,
										0.4,
									)} !important`,
								},
								"&.Mui-selected": {
									backgroundColor: addTransparency(highlightColor, 0.2),
								},
							}}>
							{item}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
};
