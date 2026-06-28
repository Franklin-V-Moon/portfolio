import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import HikingOutlinedIcon from "@mui/icons-material/HikingOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import colors from "../../themes/_colors.module.scss";

const setColor = (tab: number, id: number, color: string) => {
	return tab === id ? color : colors.brightGrey;
};

export const tabsData: {
	label?: string;
	color: string;
	gradient: string;
	route: string;
	icon: (tab: number) => JSX.Element;
	order: number;
	disabled?: boolean;
	pageDescription: string;
}[] = [
	{
		label: "",
		color: "#90caf9",
		gradient: "defaultDarkBlueGradient",
		route: "/",
		icon: (tab: number) => (
			<AccountCircleOutlinedIcon
				className={setColor(tab, 0, colors.defaultLightBlue)}
				style={{ height: "20px", width: "20px" }}
			/>
		),
		order: 1,
		pageDescription:
			"Franklin Von Moon is a versatile full-stack developer, blending expertise in UX, frontend, mobile, backend and cloud devops to engineer digital products whilst having a positive global impact",
	},
	{
		label: "GUIDES",
		color: "#66bb6a",
		gradient: "defaultGreenGradient",
		route: "/guides",
		icon: (tab: number) => (
			<SchoolOutlinedIcon
				className={setColor(tab, 1, colors.defaultGreen)}
				style={{ height: "20px", width: "20px" }}
			/>
		),
		order: 2,
		pageDescription:
			"Guides and practical notes, training references, and code snippets shared freely for learning and career growth.",
	},
	{
		label: "TRAVEL",
		color: "#ffeb3b",
		gradient: "defaultYellowGradient",
		route: "/travel",
		icon: (tab: number) => (
			<HikingOutlinedIcon
				className={setColor(tab, 2, colors.defaultYellow)}
				style={{ height: "20px", width: "20px" }}
			/>
		),
		order: 3,
		pageDescription:
			"Videos from dozens of countries, world map of visited places, and stories of culture, risks, and adventure.",
	},
	// {
	// 	label: "ASSETS",
	// 	color: "#ce93d8",
	// 	gradient: "defaultPurpleGradient",
	// 	route: "/assets-store",
	// 	icon: (tab: number) => (
	// 		<ShoppingCartOutlinedIcon
	// 			className={setColor(tab, 3, colors.defaultPurple)}
	// 			style={{ height: "20px", width: "20px" }}
	// 		/>
	// 	),
	// 	order: 4,
	// 	pageDescription:
	// 		"Assets of digital products, stock footage and free wallpaper I've collected available for purchase",
	// },
];
