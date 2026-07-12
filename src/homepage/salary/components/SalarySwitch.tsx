import HelpOutlineIcon from "@mui/icons-material/HelpOutlined";
import { FormControl, IconButton, Switch, Tooltip } from "@mui/material";
import Zoom from "@mui/material/Zoom";

import styles from "./SalarySwitch.module.scss";

export const SalarySwitch = ({
	text,
	checked = false,
	onChange,
	description,
}: {
	text: string;
	checked?: boolean;
	onChange: () => void;
	description: string;
}) => {
	const label = {
		slotProps: { input: { "aria-label": `Toggle ${text} switch` } },
	};

	return (
		<div className={styles.container}>
			<Tooltip
				slots={{ transition: Zoom }}
				title={description}
				enterTouchDelay={0}
				leaveTouchDelay={5000}>
				<IconButton aria-label='Help'>
					<HelpOutlineIcon id={`${text} help icon`} />
				</IconButton>
			</Tooltip>{" "}
			<FormControl>
				<Switch
					id={text}
					checked={checked}
					onChange={onChange}
					size='medium'
					className={styles.switch}
					{...label}
				/>
			</FormControl>
			<div className={styles.text}>{text}</div>
		</div>
	);
};
