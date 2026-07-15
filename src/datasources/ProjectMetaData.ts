import { ProjectMetaData } from "../projects/types";

export const projectMetaData: ProjectMetaData[] = [
	{
		title: "Watch 💧 Drop",
		created: 8,
		images: [
			"/projects/watch-drop/desktop1.png",
			"/projects/watch-drop/desktop2.png",
			"/projects/watch-drop/desktop3.png",
			"/projects/watch-drop/desktop4.png",
			"/projects/watch-drop/desktop6.png",
			"/projects/watch-drop/desktop7.png",
		],

		subTitle:
			"Watch Drop is your personalized, serverless email notification service that keeps you updated on new TV show episodes the moment they're available to stream. No App, No Ads, No Account.",
		deployedURL: "mailto:subscribe@watchdrop.com",
		repoURL: "https://github.com/OperationFman/Watch-Drop",
	},
	{
		title: "Budget 🎒 Sherpa",
		created: 7,
		images: [
			"/projects/budget-sherpa/desktop1.png",
			"/projects/budget-sherpa/desktop2.png",
			"/projects/budget-sherpa/desktop3.png",
		],

		subTitle:
			"Plan your next trip with confidence with this innovative travel budgeting app. The app combines data about countries' cost of living (food, activities, accommodation, etc) with your preferences and travel style to give you a personalized overview of your 'financial runway'. This means you can avoid any surprises from expensive countries in your itinerary and travel with peace of mind. Currently a simple proof of concept built using a React frontend and dotNET REST API on an SQLite database sourcing data from various external APIs.",
		deployedURL: "https://budget-sherpa-ui.onrender.com/",
		repoURL: "https://github.com/OperationFman/budget-sherpa",
		uxURL:
			"https://www.figma.com/file/ApCULyiuQ1bLE5zNWAyJ6Y/Budget-Sherpa?type=design&node-id=0%3A1&mode=design&t=qT0PRFnojn70pu8m-1",
	},
	{
		title: "Portfolio",
		created: 6,
		images: [
			"/projects/portfolio/desktop1.png",
			"/projects/portfolio/desktop2.png",
			"/projects/portfolio/desktop3.png",
			"/projects/portfolio/desktop4.png",
			"/projects/portfolio/desktop5.png",
		],

		subTitle:
			"The website you are currently viewing was designed with the objective of serving as a professional portfolio as well as a resource center for the dissemination of my knowledge to the public. The development of the website was carried out using Typescript and the NEXT JS library, incorporating a Test-Driven Development approach and deployed on Vercel via a continuous integration and continuous deployment pipeline facilitated by GitHub Actions. In addition, the website is optimized for search engines, and its content management system is based on Notion pages.",
		deployedURL: "https://franklin-v-moon.dev/",
		repoURL: "https://github.com/OperationFman/portfolio",
	},
	{
		title: "Stock Tracker",
		created: 5,
		images: [
			"/projects/stock-tracker/desktop1.png",
			"/projects/stock-tracker/desktop2.png",
			"/projects/stock-tracker/desktop3.png",
		],

		subTitle:
			"A visually streamlined single-page application designed for tracking a single stock and displaying the value of one's holdings in both USD and AUD. This application is particularly suitable for individuals working in a workplace that offers equity. The application is built using Typescript with the React library, and is deployed using Terraform on an AWS EC2 instance. The deployment process utilizes Docker fed into AWS ECR to ensure a thoroughly tested and automatically provisioned application.",
		repoURL: "https://github.com/OperationFman/Stock-Ticker-Overview",
	},
	{
		title: "Mass Effect Crewed",
		created: 4,
		images: [
			"/projects/mass-effect-crewed/desktop1.png",
			"/projects/mass-effect-crewed/desktop3.png",
			"/projects/mass-effect-crewed/desktop4.png",
			"/projects/mass-effect-crewed/desktop5.png",
			"/projects/mass-effect-crewed/desktop6.png",
			"/projects/mass-effect-crewed/desktop7.png",
		],

		subTitle:
			"A professional management application designed to assist players in selecting crew members for missions within the Mass Effect game series. The application enables players to add and remove crew members across various games, while providing insight into crew members who have not been utilized recently. The application also includes a feature that randomly recommends crew members for mission selection. Utilizing OAuth, players can access their account from multiple devices with ease, as the account is saved across devices. The application has been developed using Javascript and the React Library, and is hosted on Heroku, utilizing Docker, and maintained with a full CI/CD pipeline in CircleCI, using a 'deploy-to-prod-on-green' approach.",
		repoURL: "https://github.com/OperationFman/Mass-Effect-Crewed",
		uxURL:
			"https://www.figma.com/proto/XL7Gz06sz0iLn4hyVpGnRz/Mass-Effect-Crewed?node-id=0%3A3&scaling=scale-down&page-id=0%3A1&starting-point-node-id=0%3A3",
	},
	{
		title: "Glance",
		created: 3,
		images: [
			"/projects/glance/desktop1.png",
			"/projects/glance/desktop2.png",
			"/projects/glance/desktop3.png",
			"/projects/glance/desktop4.png",
			"/projects/glance/desktop5.png",
			"/projects/glance/desktop6.png",
			"/projects/glance/desktop7.png",
		],

		subTitle:
			"Investment tracking tools often struggle with one of three challenges: they are overly complicated, exorbitant in cost, or insufficient in functionality to warrant consistent utilization. Glance aims to provide a solution by offering a user-friendly platform for monitoring investments, dividends, and performance across various services, designed specifically for the average user. The aim is to create a seamless experience that combines the ease of use of Microsoft Excel with a sleek, modern web design. The minimum viable product (MVP) user experience has been completed and the development process will utilize React/NEXTjs as the primary framework, with a separate back-end service utilizing C#.",
		uxURL:
			"https://www.figma.com/proto/yfATxB2h0pjKwe1rdItWCC/Glance-Draft?node-id=0%3A3&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=0%3A3",
	},
	{
		title: "Travel Blog",
		created: 2,
		images: [
			"/projects/travel-blog/desktop1.png",
			"/projects/travel-blog/desktop2.png",
			"/projects/travel-blog/desktop3.png",
			"/projects/travel-blog/desktop4.png",
			"/projects/travel-blog/desktop5.png",
		],

		subTitle:
			"One of my paramount objectives is to traverse the globe, as I am of the belief that exposure to diverse cultures through living, working, and volunteering can foster greater open-mindedness and receptiveness to novel concepts. To achieve this, I developed this website utilizing Python with the Flask framework and Javascript with jquery for dynamic animations and adaptive scaling. The emphasis has been placed on the design and visual presentation of the site, utilizing external resources such as Google Drive for video hosting and Mapbox for an immersive 3D map with embedded images.",
		// deployedURL: "https://frankstravelblog.pythonanywhere.com/",
		repoURL: "https://github.com/OperationFman/FranksTravelBlog",
	},
	{
		title: "Krank",
		created: 1,
		images: [
			"/projects/krank/desktop1.png",
			"/projects/krank/desktop2.png",
			"/projects/krank/desktop3.png",
			"/projects/krank/desktop4.png",
		],
		// deployedURL: "https://opfman.pythonanywhere.com/",
		subTitle:
			"As a novice programmer, I embarked on my first programming project, which aimed to provide assistance to us during the COVID-19 pandemic in Japan. The web application, designed primarily for mobile devices, features a 'food roulette' mode, which allows us to store a list of our preferred meals and generates a random suggestion upon tapping the 'generate' button. Additionally, the app includes a straightforward currency conversion tool, which provides an instant comparison of purchasing power in different currencies relative to the Australian dollar. The application was constructed using Python and the Flask framework, and was hosted on PythonAnywhere.",
		repoURL: "https://github.com/OperationFman/Krank",
	},
];
