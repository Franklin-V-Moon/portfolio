import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Tooltip,
	Zoom,
} from "@mui/material";

import React from "react";

import styles from "./SalaryInput.module.scss";

export const MoneyInput = ({
	title,
	name,
	value,
	onChange,
	onClear,
	description,
}: {
	title: string;
	name: string;
	value: number;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onClear: (fieldName: string) => void;
	description: string;
}) => {
	return (
		<div className={styles.container}>
			<Tooltip
				TransitionComponent={Zoom}
				title={description}
				enterTouchDelay={0}
				leaveTouchDelay={5000}>
				<div className={styles.helpIcon}>
					<IconButton aria-label='Help'>
						<HelpOutlineIcon />
					</IconButton>
				</div>
			</Tooltip>{" "}
			<div>
				<InputLabel htmlFor={`${name}-input-field`}>{title}</InputLabel>
				<OutlinedInput
					id={`${name}-input-field`}
					name={name}
					value={value}
					onChange={onChange}
					startAdornment={<InputAdornment position='start'>$</InputAdornment>}
					type={"number"}
				/>
			</div>
			<Tooltip TransitionComponent={Zoom} title={"Clear"} enterTouchDelay={0}>
				<div className={styles.deleteIcon}>
					<IconButton
						color='primary'
						component='label'
						onClick={() => onClear(name)}>
						<DeleteOutlineIcon />
					</IconButton>
				</div>
			</Tooltip>
		</div>
	);
};
