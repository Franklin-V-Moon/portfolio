import { useRef, useState } from "react";
import {
	ClickAwayListener,
	Grow,
	IconButton,
	MenuItem,
	MenuList,
	Paper,
	Popper,
	Tooltip,
	Zoom,
} from "@mui/material";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import SubtitlesOffIcon from "@mui/icons-material/SubtitlesOff";
import {
	closeMenu,
	keyboardNavigation,
} from "../../../guides/components/filter/filterAnimations";
import { SubtitleLanguage } from "../../subtitles";

export const SubtitlesButton = ({
	subtitleLanguages,
	activeCode,
	onChange,
}: {
	subtitleLanguages: SubtitleLanguage[];
	activeCode: string | null;
	onChange: (code: string | null) => void;
}) => {
	const [open, setOpen] = useState(false);
	const anchorRef = useRef<HTMLButtonElement>(null);
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

	if (subtitleLanguages.length === 0) return null;

	const handleClose = (event: Event | React.SyntheticEvent) => {
		closeMenu(event, setOpen, anchorRef);
	};

	return (
		<div>
			<Tooltip slots={{ transition: Zoom }} title='Subtitles'>
				<IconButton
					ref={(node) => {
						anchorRef.current = node;
						setAnchorEl(node);
					}}
					aria-haspopup='true'
					aria-expanded={open ? "true" : undefined}
					onClick={() => setOpen((prevOpen) => !prevOpen)}
					color='inherit'>
					{activeCode ? (
						<SubtitlesIcon fontSize='medium' color='inherit' />
					) : (
						<SubtitlesOffIcon fontSize='medium' color='inherit' />
					)}
				</IconButton>
			</Tooltip>
			<Popper
				open={open}
				anchorEl={anchorEl}
				role={undefined}
				placement='top-end'
				transition>
				{({ TransitionProps }) => (
					<Grow {...TransitionProps}>
						<Paper>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList
									autoFocusItem={open}
									onKeyDown={(event) => keyboardNavigation(event, setOpen)}>
									<MenuItem
										aria-current={activeCode === null ? "true" : undefined}
										onClick={() => {
											onChange(null);
											setOpen(false);
										}}>
										Off
									</MenuItem>
									{subtitleLanguages.map((language) => (
										<MenuItem
											key={language.code}
											aria-current={activeCode === language.code ? "true" : undefined}
											onClick={() => {
												onChange(language.code);
												setOpen(false);
											}}>
											{language.label}
										</MenuItem>
									))}
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</div>
	);
};
