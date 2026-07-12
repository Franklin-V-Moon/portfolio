import React, { useState } from "react";

// Generated from UIVerse.io

const Input: React.FC = () => {
	return (
		<div style={wrapperStyle}>
			<div style={containerStyle}>
				<input
					type='text'
					name='text'
					style={inputStyle}
					required
					placeholder='Type to search...'
				/>
				<div style={iconStyle}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='ionicon'
						viewBox='0 0 512 512'
						style={svgStyle}>
						<title>Search</title>
						<path
							d='M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z'
							fill='none'
							stroke='currentColor'
							strokeMiterlimit={10}
							strokeWidth={32}
						/>
						<path
							fill='none'
							stroke='currentColor'
							strokeLinecap='round'
							strokeMiterlimit={10}
							strokeWidth={32}
							d='M338.29 338.29L448 448'
						/>
					</svg>
				</div>
			</div>
		</div>
	);
};

const wrapperStyle: React.CSSProperties = {};

const containerStyle: React.CSSProperties = {
	position: "relative",
	"--size-button": "35px",
	color: "white",
} as React.CSSProperties;

const inputStyle: React.CSSProperties = {
	paddingLeft: "var(--size-button)",
	height: "var(--size-button)",
	fontSize: "15px",
	border: "none",
	color: "#f2f2f2",
	outline: "none",
	width: "var(--size-button)",
	transition: "all ease 0.3s",
	backgroundColor: "#2e2e2e",
	borderRadius: "50px",
	cursor: "pointer",
};

const focusedInputStyle: React.CSSProperties = {
	width: "120px",
	cursor: "text",
};

const iconStyle: React.CSSProperties = {
	position: "absolute",
	width: "var(--size-button)",
	height: "var(--size-button)",
	top: "0",
	left: "2px",
	padding: "8px",
	pointerEvents: "none",
};

const focusedIconStyle: React.CSSProperties = {
	pointerEvents: "all",
	cursor: "pointer",
};

const svgStyle: React.CSSProperties = {
	width: "90%",
	height: "90%",
};

Input.displayName = "Input";

export const SearchBar = ({
	searchArray,
	searchingText,
	setSearchingText,
}: {
	searchArray: string[];
	searchingText: string;
	setSearchingText: (value: string) => void;
}) => {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const [isFocused, setIsFocused] = React.useState(false);

	const handleFocus = () => {
		setIsFocused(true);
	};

	const handleBlur = () => {
		if (inputRef.current?.value === "") {
			setIsFocused(false);
		}
	};

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const term = event.target.value;
		setSearchingText(term);
	};

	return (
		<div style={wrapperStyle}>
			<div style={containerStyle}>
				<input
					ref={inputRef}
					type='text'
					name='text'
					style={
						isFocused ? { ...inputStyle, ...focusedInputStyle } : inputStyle
					}
					required
					placeholder='Search...'
					onFocus={handleFocus}
					onBlur={handleBlur}
					onChange={handleSearchChange}
					value={searchingText}
				/>
				<div
					style={isFocused ? { ...iconStyle, ...focusedIconStyle } : iconStyle}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='ionicon'
						viewBox='0 0 512 512'
						style={svgStyle}>
						<title>Search</title>
						<path
							d='M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z'
							fill='none'
							stroke='currentColor'
							strokeMiterlimit={10}
							strokeWidth={32}
						/>
						<path
							fill='none'
							stroke='currentColor'
							strokeLinecap='round'
							strokeMiterlimit={10}
							strokeWidth={32}
							d='M338.29 338.29L448 448'
						/>
					</svg>
				</div>
			</div>
		</div>
	);
};
