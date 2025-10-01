import { Advisory } from "./../travel/types";
import { TravelVideoMetaData } from "../travel/types";

export const publicCDNVideoUrl = "https://d3atatnx15erez.cloudfront.net/";
export const insecureRestrictionKey = "adventuretime";
export const scorecardColorsPrimary = ["#ffeb3b", "#2781e7", "#cf32eb"];
export const scorecardColorsSecondary = [
	"rgb(255, 232, 59)",
	"rgb(39 129 231)",
	"rgb(206 147 216)",
];

export const travelVideoMetaData: TravelVideoMetaData[] = [
	{
		title: "China",
		year: 2017,
		hostedLink: "china",
		link: "china",
		backupLink:
			"https://drive.google.com/drive/folders/1aeSnxyDpaxbATvXgPq0CGKsVMvzYYCIp?usp=sharing",
		restricted: false,
		extras: {
			countries: ["China"],
			scorecard: {
				beauty: [7],
				affordability: [9],
				food: [1],
				hospitality: [2],
				safety: [10],
				accessibility: [6],
				video: [1],
			},
			finalScore: 4,
			summary: [
				"I spent a semester studying at Shaoguan University, we traveled the south from Guangzhou to Changsha, cultivating my initial love for travel.",
				"China is one of those few countries which are absolutely enormous, you could travel it for years and still barely scratch the surface.",
				"Each province boasts a unique history and culture spanning millennia. However, I found food quality concerning and the Great Firewall significantly hindered basic tasks like travel planning.",
			],
			challenges: [
				"Many hotels refuse to check foreigners in, often based on skin color",
				"Google and Facebook services are blocked by the government which includes Gmail, Play Store, Maps, Instagram and Youtube",
			],
			dos: [
				"Install a VPN on your phone before arriving to access Google & Facebook services",
			],
			donts: [
				"Visit only major (Tier 1) cities",
				"Attempt a 'hookup', Chinese people generally have strong traditional/conservative values",
			],
			advice: {
				travelLength: "1 - 3 Months",
				currency: "CN¥",
				season: "April - October",
				dailyBudget: "¥300 ($40 USD)",
			},
			travelAdvisory: {
				link: "https://www.smartraveller.gov.au/destinations/asia/china",
				advice: Advisory.Level2,
			},
			music: [
				{
					title: "Lay It On Me - Vance Joy",
					link: "https://music.youtube.com/watch?v=pbMWNMB2u7Y&si=ZMJv0TGBG9bXV3Oz",
				},
				{
					title: "La Da Dee - Cody Simpson",
					link: "https://music.youtube.com/watch?v=Qo9YPK4-IEQ&si=lSap8-n8r3vzOAcO",
				},
				{
					title: "I'm Born To Run - American Authors",
					link: "https://music.youtube.com/watch?v=TTvWhWZPrZs&si=o5ayxDdnHZs73ikA",
				},
				{
					title: "Chinatown - Liam Gallagher",
					link: "https://music.youtube.com/watch?v=1yh8sp12U58&si=n1nISGoMYRatztdb",
				},
				{
					title: "Pandora - James Horner AVATAR",
					link: "https://music.youtube.com/watch?v=qGV7o3wiadg&si=QmF5VQxVok9P1_oP",
				},
				{
					title: "Me and Juliet Down By The Schoolyard - Paul Simon",
					link: "https://music.youtube.com/watch?v=1cs6U097kNQ&si=ZMXN6ZM4X83LWb4H",
				},
			],
			extraLinks: [
				{
					title: "38 countries can now visit China visa-free",
					link: "https://www.euronews.com/travel/2024/11/22/china-aims-to-boost-tourism-by-giving-visa-free-entry-to-these-five-european-countries",
				},
			],
			extraVideos: [
				{
					title: "New Colombo Plan Official Presentation",
					hostedLink: "chinancp",
				},
				{
					title: "Bloopers and Funny Moments",
					hostedLink: "chinabloopers",
				},
			],
		},
	},
	{
		title: "Nepal",
		year: 2018,
		hostedLink: "nepal",
		link: "nepal",
		backupLink:
			"https://drive.google.com/drive/folders/1o683sYupSphrD9cv-SHIXUILJ_NJNy1W?usp=sharing",
		restricted: false,
		extras: {
			countries: ["Nepal"],
			scorecard: {
				beauty: [10],
				affordability: [9],
				food: [3],
				hospitality: [7],
				safety: [7],
				accessibility: [7],
				video: [1],
			},
			finalScore: 5,
			summary: [
				"Nepal, a landlocked nation nestled in the Himalayas, offers a breathtaking blend of natural beauty and cultural richness.",
				"From the towering peaks of Everest to the serene temples of Kathmandu, the country provides a diverse experience that captivates every traveler.",
				"While its political landscape has faced challenges and its infrastructure can be demanding, the warmth of the Nepali people and the profound spiritual atmosphere make it a truly unforgettable destination.",
			],
			challenges: [
				"Getting around is difficult, except flying. Dont drive cross country unless you're mentally prepared for it.",
			],
			donts: [
				"I strongly suggest you don't do Everest Basecamp. It's not beautiful or fun compared to other more beautiful and rewarding mountains like Annapurna.",
			],
			dos: [
				"Pack plenty of food poisoning medication.",
				"Try out some of the refreshments in Pokhara and hangout on the lake.",
			],
			advice: {
				travelLength: "1 month",
				currency: "Nepalese Rupee NPR",
				season: "September - May",
				dailyBudget: "$20usd",
			},
			travelAdvisory: {
				link: "https://www.smartraveller.gov.au/destinations/asia/nepal",
				advice: Advisory.Level2,
			},
			music: [
				{
					title: "Zero - Imagine Dragons",
					link: "https://music.youtube.com/watch?v=Du1-glzUBZk&si=QC6z3X38dJzCk8fI",
				},
				{
					title: "Paradise - Ofenbach",
					link: "https://music.youtube.com/watch?v=Rz-pEgjwxwc&si=CXhaMvs5boBXvexZ",
				},
				{
					title: "Lemon To A Knife Fight - The Wombats",
					link: "https://music.youtube.com/watch?v=PSP-K2d-qRU&si=ue4j0sR4AtgPUNDn",
				},
				{
					title: "False Confidence - Noah Kahan",
					link: "https://music.youtube.com/watch?v=ePSEafF0K5k&si=AtP7rvYps5i1HHaV",
				},
			],
		},
	},
	{
		title: "Indonesia",
		year: 2019,
		hostedLink: "indonesia",
		link: "indonesia",
		backupLink:
			"https://drive.google.com/drive/folders/1xwYqAdgA8zi0T_mJ2ulkJ9iHIRlxRz8n?usp=sharing",
		restricted: true,
		extras: {
			countries: ["Indonesia"],
			scorecard: {
				beauty: [7],
				affordability: [8],
				food: [5],
				hospitality: [5],
				safety: [6],
				accessibility: [9],
				video: [4],
			},
			finalScore: 5,
			summary: [
				"Bali, an Indonesian gem, offers a unique blend of serene landscapes and vibrant cultural experiences.",
				"From the tranquil rice terraces of Ubud to the bustling beaches of Seminyak, the island caters to both relaxation and adventure. ",
				"Though tourism has brought significant changes, the island's deep-rooted Hindu traditions and artistic heritage remain palpable, offering a glimpse into a culture that gracefully balances modernity and tradition.",
			],
			challenges: [
				"Taxis are really scammy and scummy. Don't trust them, secure a price in advance and avoid at all costs..",
			],
			donts: [
				"Carry any illicit substances around, they're hyper illegal and tourists are often made examples of.",
			],
			dos: [
				"Carry a sarong wherever you go, many temples require your knees/shoulders to be covered but if you have your own you won't have to rent one.",
			],
			advice: {
				travelLength: "Indonesia 1 - 2 months / Bali 1 weeks",
				currency: "Indonesian Rupiah IDR",
				season: "April - October",
				dailyBudget: "$50usd",
			},
			travelAdvisory: {
				link: "https://www.smartraveller.gov.au/destinations/asia/indonesia",
				advice: Advisory.Level2,
			},
			highlights: [
				{
					title: "White Water Rafting (1m 11s)",
					timecode: 71,
				},
			],
			music: [
				{
					title: "Boom Boom Boom - The Outhere Brothers",
					link: "https://music.youtube.com/watch?v=TnT0-zACewU&si=vMZ76leFunzIn_OX",
				},
				{
					title: "Rainy Zurich - The Fray",
					link: "https://music.youtube.com/watch?v=yp1OfqMGktk&si=9L3Z9FM4UWS4OWV2",
				},
			],
		},
	},
	{
		title: "Malaysia & Singapore",
		year: 2019,
		hostedLink: "malaysiasingapore",
		link: "malaysia-singapore",
		backupLink:
			"https://drive.google.com/drive/folders/1PZPEkze3XtwuziX6-Caz3x5M3C8uxKsU?usp=sharing",
		restricted: false,
		extras: {
			countries: ["Malaysia", "Singapore"],
			scorecard: {
				beauty: [3, 6],
				affordability: [7, 4],
				food: [3, 6],
				hospitality: [5, 5],
				safety: [7, 10],
				accessibility: [7, 10],
				video: [3, 3],
			},
			finalScore: 4,
			summary: [
				"Malaysia is a simple yet multi-cultural destination blending Chinese, Indian and Arabic cultures all into one fairly unassuming package.",
				"Singapore is an impressive hub of commerce and efficiency you don,t see often. It is what Hong Kong wishes it still was and continues to thrive and attracts the best minds from asia into one concentrated pinhead.",
				"We had a very short vacation but we made the most of it by drinking, hanging out and checking out the local attractions from the rainbow steps in Kuala Lumpur to the Gardens By the Bay.",
			],
			challenges: [
				"Malaysia is fairly boring over all, nothing really happens so it's good to travel fast and bring some buddies.",
			],
			donts: ["Chewing gum publically is illegal in Singapore."],
			advice: {
				travelLength: "Malaysia: 1 week / Singapore: 1 week",
				currency: "Malaysia Ringit MYR / Singapore dollar SGD",
				season: "February - April",
				dailyBudget: "Malaysia: $30usd / Singapore $60-100usd",
			},
			travelAdvisory: {
				link: "https://www.smartraveller.gov.au/destinations/Asia",
				advice: Advisory.Level1,
			},
			music: [
				{
					title: "Thrills - Space Primates",
					link: "https://music.youtube.com/watch?v=UuSepF0OT9E&si=gc-Yq-yP-vYJ-mjw",
				},
				{
					title: "Sleeping At Night - Caught a Ghost",
					link: "https://music.youtube.com/watch?v=uH7jG5aI82g&si=Rk59Itgv3KN8Gw4U",
				},
				{
					title: "Sleepless Nights - Ayokay",
					link: "https://music.youtube.com/watch?v=uH7jG5aI82g&si=Cnc7tF2cWqscK9-1",
				},
				{
					title: "Open My Mouth - Kiiara",
					link: "https://music.youtube.com/watch?v=GrioYGaPRUM&si=qzP9xc_2eDUzuJjN",
				},
				{
					title: "High - Sir Sly",
					link: "https://music.youtube.com/watch?v=Zrck6SV6T4M&si=mmf7j7jw7Ei4tk_o",
				},
				{
					title: "Vodka Nation - DJ Blyatman",
					link: "https://music.youtube.com/watch?v=rI_SOnt4KwY&si=ynSECMNdzLVZy9bo",
				},
			],
			extraVideos: [
				{
					title: "Aengus Bowers - Registered Shape Cutter",
					hostedLink: "registeredShapeCutter",
				},
			],
		},
	},
	{
		title: "New Zealand",
		year: 2019,
		hostedLink: "newzealand",
		link: "new-zealand",
		backupLink:
			"https://drive.google.com/drive/folders/1q-5yyEWifu1rdyHtk5leUm_JDaIoEpFO?usp=sharing",
		restricted: false,
		extras: {
			countries: ["New Zealand"],
			scorecard: {
				beauty: [8],
				affordability: [2],
				food: [7],
				hospitality: [2],
				safety: [9],
				accessibility: [4],
				video: [6],
			},
			finalScore: 4,
			summary: [
				"New Zealand offers a breathtaking escape into nature's grandeur, from the soaring peaks of the Southern Alps to the serene shores of its countless lakes and fjords.",
				"This island nation, far removed from the world's geopolitical fray, provides a tranquil and immersive experience, where Maori culture and modern Kiwi life blend seamlessly.",
				"Whether you're seeking adrenaline-pumping adventures or quiet moments of reflection amidst stunning landscapes, New Zealand delivers a unique and unforgettable journey.",
			],
			challenges: [
				"Renting a car when you're under 25 is a headache. Double check you can hire it ahead of time.",
			],
			dos: [
				"Checkout the Antarctic centre and try a ride in the Haagland.",
				"Rent a vehicle, publish transport is a huge hassle",
			],
			donts: [
				"Skip the chance to go Skiing, it's a beautiful country and shredding powder in the southern hemisphere is wonderful.",
			],
			advice: {
				travelLength: "2 weeks",
				currency: "New Zealand Dollar NZD",
				season: "October - February",
				dailyBudget: "$200usd",
			},
			travelAdvisory: {
				link: "https://www.smartraveller.gov.au/destinations/pacific/new-zealand",
				advice: Advisory.Level1,
			},
			highlights: [
				{
					title: "Driving a Haagland (11m 51s)",
					timecode: 711,
				},
			],
			music: [
				{
					title: "If You Wanna - The Vaccines",
					link: "https://music.youtube.com/watch?v=hOkeNOlKfo8&si=8WvhRoNBcdJ819OF",
				},
				{
					title: "The Bridge of Khazad Dum - Howard Shore",
					link: "https://music.youtube.com/watch?v=vbKy6FuACKg&si=D8RUMbOJCBamZ14y",
				},
				{
					title: "Where No One Goes - John Powell",
					link: "https://music.youtube.com/watch?v=BM8gC3Oj0OA&si=Fzx_xXlYuwC0_6z9",
				},
				{
					title: "Time In A Bottle - YUNGBLUD",
					link: "https://music.youtube.com/watch?v=7pRh9JqmMU0&si=GUVh8QRMbJjfdMmH",
				},
			],
		},
	},
	{
		title: "Japan",
		year: 2020,
		hostedLink: "japan",
		link: "japan",
		backupLink:
			"https://drive.google.com/drive/folders/16ekQGT90_76BCrX_mbiN3JDhnKrMG1-2?usp=sharing",
		restricted: false,
		extras: {
			countries: ["Japan"],
			scorecard: {
				beauty: [8],
				affordability: [4],
				food: [7],
				hospitality: [4],
				safety: [10],
				accessibility: [10],
				video: [8],
			},
			finalScore: 9,
			summary: [
				"Japan, a land of captivating contrasts, seamlessly blends ancient traditions with futuristic innovation.",
				"From serene temples nestled amidst cherry blossoms to the neon-lit streets of bustling Tokyo, the island nation offers a unique cultural tapestry.",
				"Whether you're drawn to the tranquility of a traditional tea ceremony, the exhilarating energy of anime culture, or the sublime beauty of its natural landscapes, Japan promises an unforgettable journey into a world where harmony and dynamism coexist.",
			],
			dos: [
				"Make your own custom cup of noodles in Osaka.",
				"Hit up a PokeStore if you're into Pokemon.",
				"Take advantage of the Japan Rail Pass, allowing you access to unlimited high speed trains for as long as you need.",
			],
			donts: [
				"Just do the classic Osaka > Kyoto > Tokyo route. It's extremely touristy and you'll miss much of what makes Japan feel special.",
			],
			advice: {
				travelLength: "1 month",
				currency: "Japanese Yen JPY",
				season: "March - September",
				dailyBudget: "$150usd",
			},
			travelAdvisory: {
				link: "https://www.smartraveller.gov.au/destinations/asia/japan",
				advice: Advisory.Level1,
			},
			highlights: [
				{
					title: "On The News (15m)",
					timecode: 900,
				},
				{
					title: "Flying Home In COVID (28m 54s)",
					timecode: 1734,
				},
			],
			music: [
				{
					title: "Tokyo - Owl City",
					link: "https://music.youtube.com/watch?v=46y8D7b0Fow&si=B0hoNdcAJny-Q5pO",
				},
				{
					title: "Lost In Japan - Shawn Mendes & Zedd",
					link: "https://music.youtube.com/watch?v=3744JiYOeFw&si=MhkJe4o5T-qdnVlG",
				},
				{
					title: "Mr. Blue Sky - Electric Light Orchestra",
					link: "https://music.youtube.com/watch?v=wuJIqmha2Hk&si=k0jGJJ06HDGWZju5",
				},
				{
					title: "PONPONPON - Kyary Pamyu",
					link: "https://music.youtube.com/watch?v=T_Rn8TAIL2w&si=PWuqi2saCs6XUjyb",
				},
				{
					title: "Level Of Concern - Twenty One Pilots",
					link: "https://music.youtube.com/watch?v=lXYZSDled4c&si=Z_W5oB7r18boek_M",
				},
				{
					title: "Tokyo Drift - Teriyaki Boyz",
					link: "https://music.youtube.com/watch?v=_SVxbdQR6Eg&si=TSsRBFisN2NW8dEQ",
				},
				{
					title: "Re:Re: - Asian Kung-Fu Generation",
					link: "https://music.youtube.com/watch?v=_v_Voe5KD1M&si=MMDUOT0chnogCoVe",
				},
				{
					title: "Nintendo Mii Theme",
					link: "https://music.youtube.com/watch?v=SZBV-rEltpk&si=7x-h5LiUur5os2aw",
				},
			],
			extraLinks: [
				{
					title: "Japan Rail Pass",
					link: "https://japanrailpass.net/en/",
				},
			],
		},
	},
	// {
	// 	title: "Australia",
	// 	year: 2021,
	// 	hostedLink: "australia",
	// 	link: "australia",
	// 	restricted: false,
	// 	instagramLinks: [
	// 		"https://www.instagram.com/p/C-ccDuVToNn/?hl=en&img_index=1",
	// 	],
	// },
	{
		title: "Thailand",
		year: 2022,
		hostedLink: "thailand",
		link: "thailand",
		backupLink:
			"https://drive.google.com/drive/folders/1MMl5yLAUNf9t-nBdIVktxjwQbfo385ZV?usp=sharing",
		restricted: false,
		extras: {
			countries: ["Thailand"],
			scorecard: {
				beauty: [7],
				affordability: [8],
				food: [5],
				hospitality: [7],
				safety: [8],
				accessibility: [8],
				video: [5],
			},
			finalScore: 8,
			summary: [
				"Thailand is a land of vibrant contrasts, where ancient temples stand alongside bustling modern cities, and tranquil beaches meet lush jungles.",
				"From the serene northern hills dotted with elephant sanctuaries and traditional villages to the lively southern islands offering world-class diving and nightlife, the country offers a diverse tapestry of experiences.",
				"While known for its warm hospitality and delicious cuisine, Thailand also grapples with complex political dynamics and social issues, making it a fascinating destination that blends cultural richness with contemporary challenges.",
			],
			challenges: [
				"Police corruption is rampant and sometimes unavoidable. Always be ready to pay a bribe or get done for something you didn't do.",
			],
			dos: [
				"Don't miss some of the offbeat 'ancient' places like Ayutthaya, Nan and Sukhothai.",
				"Take a grab/bolt bike places, you order them like any Uber but ride on the back. They're actually quite skilled so don't stress too much about danger.",
				"Got any broken tech? Take it to MBK in Bangkok for a very cheap once-over and enjoy the experience.",
			],
			donts: [
				"Avoid the Full Moon Party, it's really not any different to an average walking street except the drinks are super strong and its a logistical nightmare to get in/out.",
				"Just stick to Phuket island, ensure you leave the island and explore the surrounds like Phi Phi and Krabi - Phuket itself is very underwhelming.",
			],
			advice: {
				travelLength: "1 - 2 months",
				currency: "Thai Baht THB",
				season: "November - April",
				dailyBudget: "$30usd",
			},
			travelAdvisory: {
				link: "https://www.smartraveller.gov.au/destinations/asia/thailand",
				advice: Advisory.Level2,
			},
			music: [
				{
					title: "As It Was - Harry Styles",
					link: "https://music.youtube.com/watch?v=wa5gkHMqbls&si=KriK0ouY6Qm_r3NI",
				},
				{
					title: "What You Do To Me - Blanks",
					link: "https://music.youtube.com/watch?v=kb9fbX2Ahpc&si=fyHA-81HGhEOsPbi",
				},
				{
					title: "Live A Little - Chaz Cardigan",
					link: "https://music.youtube.com/watch?v=kb9fbX2Ahpc&si=axlYM6lCJLlmjJSU",
				},
			],
			tags: ["Phillip Sgardelis"],
		},
	},
	{
		title: "South Korea",
		year: 2022,
		hostedLink: "southkorea",
		link: "south-korea",
		backupLink:
			"https://drive.google.com/drive/folders/1-qXArc3DWxqAKXxQfIAWwwtha53Qcn0O?usp=sharing",
		restricted: true,
		extras: {
			countries: ["South Korea"],
			scorecard: {
				beauty: [5],
				affordability: [6],
				food: [4],
				hospitality: [3],
				safety: [9],
				accessibility: [7],
				video: [7],
			},
			finalScore: 7,
			summary: [
				"South Korea is a nation of rapid transformation, where ancient traditions meet a hyper-modern, tech-driven society, creating a captivating blend of experiences.",
				"From the bustling streets of Seoul, a city that never sleeps, to the serene beauty of its mountainous landscapes and historic temples, South Korea offers a diverse tapestry of culture and adventure.",
				"While it navigates the complexities of its geopolitical position, the warmth and resilience of its people, coupled with its dynamic cultural scene, make it a truly compelling destination.",
			],
			challenges: [
				"Hostels can be a bit hit or miss, make sure to remain flexible if the scene isn't for you.",
				"The night life in Seoul is amazing but getting home late can be a real slog, make sure to plan ahead.",
			],
			dos: [
				"Checkout Yongma land, a completely abandoned theme park built before the 2008 recession which feels like a real horror movie.",
				"Don't miss the DMZ, it's so accessible from Seoul and fascinating.",
			],
			advice: {
				travelLength: "2 weeks",
				currency: "Korean Won KRW",
				season: "April - June & September - October",
				dailyBudget: "$100usd",
			},
			travelAdvisory: {
				link: "https://www.smartraveller.gov.au/destinations/asia/south-korea-republic-korea",
				advice: Advisory.Level1,
			},
			highlights: [
				{
					title: "Abandoned Theme Park (5m 33s)",
					timecode: 333,
				},
				{
					title: "Demilitarized Zone (7m 14s)",
					timecode: 434,
				},
			],
			music: [
				{
					title: "LIKEY - Twice",
					link: "https://music.youtube.com/watch?v=5gZl0PYC2Ho&si=8M9l7X8k08WBUvO6",
				},
				{
					title: "Dolphin - Oh My Girl",
					link: "https://music.youtube.com/watch?v=bac9H_DxQ6g&si=TP6uhr51HxsajVrs",
				},
				{
					title: "Dynamite - BTS",
					link: "https://music.youtube.com/watch?v=DHycmwZxQ0w&si=oe1_CRnsHc3oWxLZ",
				},
				{
					title: "Dirty Little Animals - Bones UK",
					link: "https://music.youtube.com/watch?v=jRU9L45V1Qo&si=YJ-Ye1GX2BCWGiak",
				},
			],
			tags: ["Phillip Sgardelis"],
		},
	},
	{
		title: "United Arab Emirates",
		year: 2022,
		hostedLink: "uae",
		link: "uae",
		backupLink:
			"https://drive.google.com/drive/folders/1u6-BtdvLQ8E-azD-iOX8b7aM1ngCuiMH?usp=sharing",
		restricted: true,
		extras: {
			countries: ["United Arab Emirates"],
			scorecard: {
				beauty: [4],
				affordability: [2],
				food: [2],
				hospitality: [3],
				safety: [9],
				accessibility: [5],
				video: [4],
			},
			finalScore: 4,
			summary: [
				"The United Arab Emirates presents a fascinating blend of futuristic ambition and traditional Arabian heritage, crafting an experience that feels both luxurious and culturally rich.",
				"From the towering skyscrapers of Dubai to the serene deserts of Abu Dhabi, the nation offers a diverse array of experiences, where opulent malls and cutting-edge architecture coexist with ancient forts and Bedouin traditions.",
				"While the rapid development and artificial islands might raise questions about sustainability, the UAE still manages to showcase a unique vision of a modern Arabian nation, offering a glimpse into a region where innovation and tradition intertwine.",
			],
			challenges: [
				"Getting around can be a challenge as the cities are completely built around cars. There is a metro but it's cramped and expensive.",
			],
			dos: [
				"If visiting Dubai, Book tickets for the 'museum of the future' in advance, well worth it.",
				"Try out indoor skiing, it's surprisingly fun and good value compared to regular skiing.",
			],
			advice: {
				travelLength: "1 week",
				currency: "UAE Dirham AED",
				season: "November - April",
				dailyBudget: "$200usd",
			},
			travelAdvisory: {
				link: "https://www.smartraveller.gov.au/destinations/middle-east/united-arab-emirates",
				advice: Advisory.Level2,
			},
			highlights: [
				{
					title: "DevSlam (1m 3s)",
					timecode: 63,
				},
				{
					title: "Sand Surfing (4m 30s)",
					timecode: 270,
				},
				{
					title: "Skiing (5m 12s)",
					timecode: 312,
				},
			],
			music: [
				{
					title: "I Really Want to Stay At Your House - Cyberpunk 2077",
					link: "https://music.youtube.com/watch?v=Rbgw_rduQpM&si=xxR5jsqkmccjxhpA",
				},
				{
					title: "I Ain't Worried - OneRepublic",
					link: "https://music.youtube.com/watch?v=NF7oYY7Lhq4&si=3mJgkypiK4RLD23d",
				},
				{
					title: "Sunshine - OneRepublic",
					link: "https://music.youtube.com/watch?v=THZfYYSReDs&si=8Du2gNMahs-f5VTo",
				},
			],
		},
	},
	{
		title: "Fiji",
		year: 2022,
		hostedLink: "fiji",
		link: "fiji",
		backupLink:
			"https://drive.google.com/drive/folders/1lDzBYAhye2L7cbIM8hsbkKXxNSsyeDEH?usp=sharing",
		restricted: true,
		extras: {
			countries: ["Fiji"],
			scorecard: {
				beauty: [3],
				affordability: [4],
				food: [2],
				hospitality: [4],
				safety: [8],
				accessibility: [6],
				video: [3],
			},
			finalScore: 3,
			summary: [
				"Fiji, a South Pacific paradise, offers a unique blend of vibrant culture and stunning natural beauty. .",
				"From the warm, welcoming smiles of the locals to the breathtaking coral reefs and lush rainforests, Fiji provides an escape into a world of tranquility and adventure. Whether you're seeking relaxation on pristine beaches or thrilling water sports,",
				"Fiji's diverse islands promise an unforgettable experience steeped in rich traditions and breathtaking landscapes.",
			],
			challenges: [
				"It's quite difficult getting around without a guide or tour especially the main island, which is why most people buy a package holiday.",
			],
			dos: [
				"Day trips to various resorts, they often cover your transport fees in the hopes you buy food/alcohol.",
				"Wear strong sunscreen and apply often, it's incredibly easy to get burnt in Fiji",
			],
			donts: ["Visit during rainy season."],
			advice: {
				travelLength: "1 week",
				currency: "Fijian dollar FJD",
				season: "June - September",
				dailyBudget: "$150usd",
			},
			travelAdvisory: {
				link: "https://www.smartraveller.gov.au/destinations/pacific/fiji",
				advice: Advisory.Level1,
			},

			music: [
				{
					title: "Mona Lisa - Mxmtoon",
					link: "https://music.youtube.com/watch?v=sGgKlhi1_6M&si=olJ4Hp7yiLNQGKrK",
				},
				{
					title: "My Mind",
					link: "https://music.youtube.com/watch?v=SfYCVetiL30&si=w9zfpQakvakeaBFl",
				},
			],
		},
	},
	{
		title: "Cambodia, Laos and Vietnam",
		year: 2023,
		hostedLink: "cambodialaosvietnam",
		link: "cambodia-laos-vietnam",
		backupLink:
			"https://drive.google.com/drive/folders/1hSYkYe8KtrLiVZ2CoGtXjDogpRE4gakY?usp=sharing",
		restricted: true,
		reelLinks: ["https://www.instagram.com/reel/Cy-7c3yLFuE/"],
		instagramLinks: [
			"https://www.instagram.com/p/CpfKGORr12k/?img_index=1",
			"https://www.instagram.com/p/Cph3kEdLXFh/?img_index=1",
			"https://www.instagram.com/p/CpolhlDLS87/?img_index=1",
			"https://www.instagram.com/p/CpvKryKr-qx/?img_index=1",
			"https://www.instagram.com/p/Cpxt4mHJiwQ/?img_index=1",
			"https://www.instagram.com/p/Cp23tBbPq61/?img_index=1",
			"https://www.instagram.com/p/CqD9tCMBNH4/?img_index=1",
			"https://www.instagram.com/p/CqJB8WLhyXZ/?img_index=1",
			"https://www.instagram.com/p/DJhWKcdh_ex/?hl=en&img_index=1",
		],
		extras: {
			countries: ["Cambodia", "Laos", "Vietnam"],
			scorecard: {
				beauty: [2, 4, 6],
				affordability: [9, 10, 8],
				food: [2, 3, 3],
				hospitality: [7, 6, 5],
				safety: [7, 8, 7],
				accessibility: [6, 7, 8],
				video: [5, 5, 5],
			},
			finalScore: 6,
			summary: [
				"Cambodia, Laos, and Vietnam, each a jewel of Southeast Asia, bear the marks of tumultuous histories, yet today offer distinct and captivating experiences.",
				"From the serene temples of Angkor Wat in Cambodia to the tranquil Mekong River flowing through Laos, and the bustling streets of Hanoi in Vietnam, these nations present a tapestry of cultural richness and natural beauty.",
				"While each country carries the weight of past conflicts, they now extend warm hospitality, inviting travelers to explore their diverse landscapes, savor their unique cuisines, and witness the resilience of their people.",
			],
			challenges: [
				"Travellers often don't realize you need a visa for Vietnam. Try to get it early, if not you can pay for corrupt officials to expedite your application but its often a few hundred USD.",
				"It can be a headache to get to train street in Hanoi, keep trying. Theirs always a cop looking away if you pick your moment.",
			],
			dos: [
				"Spend a few days in Siem Reap (Angkor Wat) Theirs an insane amount to see so take it slow.",
				"Checkout 'Katze' in Hanoi, no spoilers (Unless you watch the video).",
			],
			donts: [
				"You can probably skip Cat Ba island as they've filled the bay in to be replaced with a mall.",
			],
			advice: {
				travelLength: "Each 2 weeks",
				currency:
					"Cambodian Riel KHR / Laotian Kip LAK (USD preferred) / Vietnamese Dong VND",
				season: "March - November",
				dailyBudget: "Cambodia/Laos $15usd / Vietnam $30usd",
			},
			travelAdvisory: {
				link: "https://www.smartraveller.gov.au/destinations/Asia",
				advice: Advisory.Level1,
			},
			highlights: [
				{
					title: "Train Street (8m 13s)",
					timecode: 493,
				},
				{
					title: "Chu Chi Tunnels (12m 41s)",
					timecode: 761,
				},
			],
			music: [
				{
					title: "Sympathy for the Devil - The Rolling Stones",
					link: "https://music.youtube.com/watch?v=uWepTCBBnLo&si=jIhgH9y8TyrGEoXL",
				},
				{
					title: "Fortunate Son - Creedance Clearwater",
					link: "https://music.youtube.com/watch?v=r5NzAksjfDI&si=Y32ZC_TEuC5SVn_C",
				},
				{
					title: "Paint It, Black - The Rolling Stones",
					link: "https://music.youtube.com/watch?v=170sceOWWXc&si=M1bNjhSe19-jnFdj",
				},
				{
					title: "Khe Sanh - Cold Chisel",
					link: "https://music.youtube.com/watch?v=ckYN_D1W-Pg&si=NdtlWtblWMrwW-rX",
				},
				{
					title: "We Didn't Start the Fire - Billy Joel",
					link: "https://music.youtube.com/watch?v=55q6jrfBDdk&si=YDoG-rDH4I7Olijb",
				},
			],
			tags: ["Phillip Sgardelis"],
		},
	},
	{
		title: "Taiwan, Hong Kong and Macau",
		year: 2023,
		hostedLink: "taiwanhongkongmacau",
		link: "taiwan-hong-kong-macau",
		backupLink:
			"https://drive.google.com/drive/folders/1hLeWb-uJVG9k68lyrJZ1ambmJcBgAFOA?usp=sharing",
		restricted: false,
		reelLinks: ["https://www.instagram.com/reel/CzTjUurL-5y/"],
		instagramLinks: [
			"https://www.instagram.com/p/CqiBx-QLGMf/?img_index=1",
			"https://www.instagram.com/p/CqkX4dSLqCk/?img_index=1",
			"https://www.instagram.com/p/CqqBXJaJep-/?img_index=1",
			"https://www.instagram.com/p/CqyWFoph6Jq/?img_index=1",
			"https://www.instagram.com/p/Cq0pE9FJtcd/?img_index=1",
			"https://www.instagram.com/p/Cq0vJz4v5Tl/?img_index=1",
			"https://www.instagram.com/p/Cq3MLbyJlQd/?img_index=1",
			"https://www.instagram.com/p/Cq8lp99BCD3/?img_index=1",
			"https://www.instagram.com/p/Cq-ILXzrnjp/?img_index=1",
		],
		extras: {
			countries: ["Taiwan", "Hong Kong", "Macau"],
			scorecard: {
				beauty: [6, 5, 2],
				affordability: [7, 3, 3],
				food: [4, 4, 5],
				hospitality: [5, 5, 5],
				safety: [9, 8, 9],
				accessibility: [10, 9, 6],
				video: [6, 6, 6],
			},
			finalScore: 6,
			summary: [
				"These 3 nations makeup not-China, each has had a controversial recent history and could be the flashpoint for future conflict but today they stand still with a unique chinese twist worth experiencing.",
				"Taiwan is a wonderful place worth taking it slow and simply enjoying, from hiking to biking, from drinking to festivals - It has plenty to do and see.",
				"Hong Kong is sadly losing it's identity but still has much to offer, the night life is incredible and it's recent history easy to get lost in.",
			],
			challenges: [
				"Due to the expensive housing, many of the hostels are filled with locals which leads to a hostel culture devoid of friendship and connections",
			],
			dos: [
				"Hong Kong has some remarkably amazing hiking, due to the unique zoning laws which keep true vegetation on the cusp of dense civilization.",
			],
			advice: {
				travelLength: "Taiwan: 2 - 3 weeks / HK/Macau: 3 days - 1 week",
				currency: "Taiwan Dollar TWD / Kong Kong Dollar HKD / Macanese Palaca",
				season: "February to November",
				dailyBudget: "Taiwan: $40usd / HK/Macau $150usd",
			},
			travelAdvisory: {
				link: "https://www.smartraveller.gov.au/destinations/Asia",
				advice: Advisory.Level2,
			},
			music: [
				{
					title: "Xiao Zao Lei (Removed from streaming)",
					link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
				},
				{
					title: "小城夏天 -  小城夏天",
					link: "https://music.youtube.com/watch?v=iWnPpPjxmbw&si=ICMGQ9vBcMNm8pdU",
				},
				{
					title: "Alive - Warbly Jets",
					link: "https://music.youtube.com/watch?v=ESAYXP2YMB0&si=3xiMEOmIxu1dd3OV",
				},
				{
					title: "Kung Fu Fighting - Cee Lo",
					link: "https://music.youtube.com/watch?v=QspjKVTMlL8&si=Nw3Iu4jnKGZ1vQHy",
				},
				{
					title: "Jackie Chan - Tiesto & Dzeko",
					link: "https://music.youtube.com/watch?v=t6vBhvlKxMA&si=wU04dQ9eTMDneJ6C",
				},
			],
		},
	},
	{
		title: "India",
		year: 2023,
		hostedLink: "india",
		link: "india",
		backupLink:
			"https://drive.google.com/drive/folders/19qhQX8VIgFv8KlzSQCSH8FuyI6S9Nj52?usp=sharing",
		restricted: false,
		reelLinks: ["https://www.instagram.com/reel/C2uwpY2LGcS/"],
		instagramLinks: [
			"https://www.instagram.com/p/CrGLo47LBNk/?img_index=1",
			"https://www.instagram.com/p/CrK67cDLP-r/?img_index=1",
			"https://www.instagram.com/p/CrQ5ycepdzf/?img_index=1",
			"https://www.instagram.com/p/CrVxYQFLf6t/?img_index=1",
			"https://www.instagram.com/p/CrbOJJRs4nj/?img_index=1",
			"https://www.instagram.com/p/Crd6nDPvlww/?img_index=1",
			"https://www.instagram.com/p/CrklzD8rMhX/?img_index=1",
			"https://www.instagram.com/p/CroDXezM3-G/?img_index=1",
			"https://www.instagram.com/p/CrwEXR7y_k8/?img_index=1",
			"https://www.instagram.com/p/Cr5hNUxL-V8/?img_index=1",
			"https://www.instagram.com/p/Cr884JABum8/?img_index=1",
			"https://www.instagram.com/p/Cr_1nIPhkw1/?img_index=1",
		],
		extras: {
			countries: ["India"],
			scorecard: {
				beauty: [3],
				affordability: [9],
				food: [3],
				hospitality: [6],
				safety: [3],
				accessibility: [5],
				video: [7],
			},
			finalScore: 7,
			summary: [
				"What a brilliant a diverse nation, no two areas here are the same so it's impossible to speak about any culture or rule for the entire nation as it varies completely.",
				"If you want nature, peace and safety head south to Kerala. If you're after urban sprawl and endless activities, hit up Delhi in the north. Do you like mountains? head east to Darjeerling.",
				"No two india experiences are the same and it's almost endless with places to go and things to see.",
			],
			challenges: [
				"Safety is a concern depending on where you are. For example, in the denser poorer north i would recommend traveling alone as a woman. However in the south you'll find the population is dominantly women and so services and culture revolve more around keeping you safe.",
				"You are guaranteed to get food poisoned at some point, simply allow flexibility in your schedule and pack plenty of medicine.",
			],
			dos: [
				"Take the night trains, they're surprisingly comfy and are a great way to cover long distances without needing to check into a hotel.",
			],
			advice: {
				travelLength: "3 - 6 months",
				currency: "Indian Rupee",
				season: "November - March",
				dailyBudget: "$20usd",
			},
			travelAdvisory: {
				link: "https://www.smartraveller.gov.au/destinations/asia/india",
				advice: Advisory.Level2,
			},
			highlights: [
				{
					title: "Kalaripayattu Martial Arts (4m 31s)",
					timecode: 271,
				},
				{
					title: "Cooking Class (5m 6s)",
					timecode: 306,
				},
				{
					title: "Ant Soldier (14m 50s)",
					timecode: 890,
				},
			],
			music: [
				{
					title: "Shugal Laga le - Raghu Dixit",
					link: "https://music.youtube.com/watch?v=VOaZTJDRTLI&si=QNR2s1CSVj4V482j",
				},
				{
					title: "ILAHI - Arijit Singh",
					link: "https://music.youtube.com/watch?v=fs_nC2NjzqA&si=nt3ZZyg-h9puMyIt",
				},
				{
					title: "MASTA - Vishal Dadlani",
					link: "https://music.youtube.com/watch?v=S6DhdT0NAzI&si=tg89pvT5S56y3rLD",
				},
				{
					title: "The Jawaani Song - Vishal Shekar",
					link: "https://music.youtube.com/watch?v=S6DhdT0NAzI&si=u2H7XRRXh__TcHjM",
				},
				{
					title: "BIBA - Marshmellow",
					link: "https://music.youtube.com/watch?v=PRsDgXrfNxY&si=r9mzQQM4FQ3XuGKA",
				},
				{
					title: "Billi Billi - Sukhbir & Kumaar",
					link: "https://music.youtube.com/watch?v=A-13hzmVN90&si=u_Lt-08LWLR-srj8",
				},
			],
		},
	},
	{
		title: "Oman",
		year: 2023,
		hostedLink: "oman",
		link: "oman",
		backupLink:
			"https://drive.google.com/drive/folders/1mdXFgZrV2yYX82CafSYsISD47124teHg?usp=sharing",
		restricted: true,
		reelLinks: ["https://www.instagram.com/reel/C4DkLuqJ3AR/"],
		instagramLinks: [
			"https://www.instagram.com/p/CsHbTJ8h78G/?img_index=1",
			"https://www.instagram.com/p/CsNvb55M2t8/?img_index=1",
			"https://www.instagram.com/p/CsTFmJHMw5w/?img_index=1",
		],
		extras: {
			countries: ["Oman"],
			scorecard: {
				beauty: [3],
				affordability: [2],
				food: [3],
				hospitality: [2],
				safety: [10],
				accessibility: [6],
				video: [4],
			},
			finalScore: 4,
			summary: [
				"As far as rich petro-states go oman is probably the only great one. Rather than going the glitzy luxury fake route they decided to go for a more modest, comfortable and enriching feeling fo their nation.",
				"Getting around Oman is such a lovely therapeutic experience, it feels almost like meditating to drive along the 4 lane silky smooth highways with not a soul in sight.",
				"If you want a Middle East experience that feels like it came from a disney movie, this is it.",
			],
			challenges: [
				"getting around by public transport is honestly an un-fun miserable experience, I highly recommend hiring a car.",
			],
			dos: [
				"Try hiking in a wadi. It's combines a mix of shallow swimming and walking, just dont forget to bring plenty of drinking water.",
				"Stay in a dome along the desert, its a relatively affordable and peaceful experience.",
			],
			advice: {
				travelLength: "2 weeks",
				currency: "Omani Rial OMR",
				season: "October - April",
				dailyBudget: "$200usd",
			},
			travelAdvisory: {
				link: "https://www.smartraveller.gov.au/destinations/middle-east/oman",
				advice: Advisory.Level1,
			},
			music: [
				{
					title: "Coastline - Hollow Coves",
					link: "https://music.youtube.com/watch?v=f5ydCBPLT4Y&si=sRyqyokBdRQ9fnrO",
				},
				{
					title: "Faster Car - Loving Caliber",
					link: "https://music.youtube.com/watch?v=JI6vIsMu37c&si=Eg4tPw5FygAB4E1w",
				},
				{
					title: "Mess Is Mine - Vance Joy",
					link: "https://music.youtube.com/watch?v=KAh3A_4GVp8&si=cXDFYhva0vu9x3wg",
				},
			],
		},
	},
	{
		title: "Kuwait and Iraqi Kurdistan",
		year: 2023,
		hostedLink: "kuwaitiraq",
		link: "kuwait-iraqi-kurdistan",
		backupLink:
			"https://drive.google.com/drive/folders/13wel5RbzFYBiv4QTA_zgZCtGC07ZrSix?usp=sharing",
		restricted: true,
		reelLinks: ["https://www.instagram.com/reel/C5OA27DJ5Tx/"],
		instagramLinks: [
			"https://www.instagram.com/p/CsW4lzgL_Ec/?img_index=1",
			"https://www.instagram.com/p/CseTQptLmaT/?img_index=1",
			"https://www.instagram.com/p/CshQp_fr_fb/?img_index=1",
			"https://www.instagram.com/p/Csjuc4SrOXF/?img_index=1",
			"https://www.instagram.com/p/CsrDDjhv8s4/?img_index=1",
		],
		extras: {
			countries: ["Kuwait", "Iraqi Kurdistan"],
			scorecard: {
				beauty: [1, 3],
				affordability: [1, 8],
				food: [1, 1],
				hospitality: [4, 8],
				safety: [7, 5],
				accessibility: [8, 5],
				video: [2, 2],
			},
			finalScore: 3,
			summary: [
				"Kuwait is a classic Persian Gulf petro-state with all the things you'd expect from luxury malls to car dependant transport. But at-least the artificial islands they're building don't completely destroy the marine life.",
				"Next door you'll find Iraq and the autonomous region of iraqi Kurdistan which for all intents and purposes is a defacto independent country protected by the Peshmerga.",
				"Recently ravaged by ISIS, the nation is still reeling and trying to find it's footing, the Kurds in the north continue to fight for independence but even so you'll find them warm, inviting and above all relatively safe.",
			],
			challenges: [
				"The Kuwaiti Dinar is the most expensive currency in the world due to their oil exports, don't come poor",
				"The food is some of the worst I've ever experienced, getting a decent feed is hard and the chance of sickness quite high",
			],
			dos: [
				"Speak with the locals in Iraqi Kurdistan. They're incredibly friendly and willing to host. Just make sure to share the love",
			],
			donts: [
				"Don't stay in the Kuwaiti sun too long, it's one of the easiest places in the world to suddenly die of dehydration without ever feeling thirsty",
			],
			advice: {
				travelLength: "Kuwait: 1 day / Iraqi kurdistan: 2 weeks",
				currency: "Kuwaiti Dinar KWD / Iraqi Dinar IQD",
				season: "November - February",
				dailyBudget: "Kuwait: $200usd / Iraqi kurdistan: $40usd",
			},
			travelAdvisory: {
				link: "https://www.smartraveller.gov.au/destinations/Middle%20East",
				advice: Advisory.Level4,
			},
			highlights: [
				{
					title: "Meet the Kurdish Democratic Party (2m 35s)",
					timecode: 155,
				},
			],
			music: [
				{
					title: "Never Ending Song - Conan Gray",
					link: "https://music.youtube.com/watch?v=0KVo9zCPNMY&si=_9CdCeJKb4FYjmlq",
				},
				{
					title: "Mirage - OneRepublic",
					link: "https://music.youtube.com/watch?v=VQYpJc8iq2g&si=FuoUnbgx-MMN-A-g",
				},
				{
					title: "Texas - Magic Man",
					link: "https://music.youtube.com/watch?v=FfG-encCbNA&si=0DwlXQf6Szorxhsq",
				},
			],
			tags: ["Paris Hailwood"],
		},
	},
	{
		title: "Jordan",
		year: 2023,
		hostedLink: "jordan",
		link: "jordan",
		backupLink:
			"https://drive.google.com/drive/folders/1S3pw5ULJD0MWQ_Ro-B9EHt1bdvAGy-S_?usp=sharing",
		restricted: false,
		reelLinks: ["https://www.instagram.com/reel/C750R5uphGc/"],
		instagramLinks: [
			"https://www.instagram.com/p/Csv3RWrszXo/?img_index=1",
			"https://www.instagram.com/p/Cs37edtMV5K/?img_index=1",
			"https://www.instagram.com/p/Cs58X-UpzwX/?img_index=1",
			"https://www.instagram.com/p/Cs5-RJvpXRn/?img_index=1",
			"https://www.instagram.com/p/Cs8X9kSLP7_/?img_index=1",
			"https://www.instagram.com/p/Cs_0-aRPvG5/?img_index=1",
		],
		extras: {
			countries: ["Jordan"],
			scorecard: {
				beauty: [3],
				affordability: [7],
				food: [6],
				hospitality: [8],
				safety: [10],
				accessibility: [7],
				video: [7],
			},
			finalScore: 7,
			summary: [
				"The safest place in the Middle East, with something for literally everyone Jordan is a wonderful country to visit and have a lovely holiday",
				"Sitting between several hostile powers you'd think Jordan to be dangerous but for decades now it's managed to remain a safe haven for refugees and tourists with plenty of warmth and hospitality to go around",
				"It boasts some of the most attractive photogenic sites in the world from Wadi Rum with it's heritage train experience to Petra, the great Nabataean city lost in time",
			],
			challenges: [
				"Getting between major cities can be a struggle and bus time tables dont always align. I'd recommend hiring a car, not a tour guide",
			],
			dos: [
				"Apply for the Jordan Pass, it comes with entry to most attractions, historical sites and includes your visa for the country",
				"Don't miss the north, plenty of quiet castles and forts from history to explore",
				"Ensure you give Wadi Rum and Petra at least 2 full days each - It's easy to underestimate what you can do",
				"Petra has a back entrance, start here at the 'Monastery' and you'll proceed to work down hill and finish at the famous treasury",
			],
			advice: {
				travelLength: "2 weeks",
				currency: "Jordan Jordanian Dinar",
				season: "March - May or September - November",
				dailyBudget: "$60usd",
			},
			travelAdvisory: {
				link: "https://www.smartraveller.gov.au/destinations/middle-east/jordan",
				advice: Advisory.Level2,
			},
			highlights: [
				{
					title: "Wadi Rum (3m 16s)",
					timecode: 196,
				},
				{
					title: "Arab Freedom Fighters Attack Heritage Train (5m 55s)",
					timecode: 355,
				},
				{
					title: "Petra (8m 31s)",
					timecode: 511,
				},
			],
			music: [
				{
					title: "Since You Been Gone - Rainbow",
					link: "https://music.youtube.com/watch?v=EGlZ2OPt_b8&si=ef2N94ssvn_CHB2J",
				},
				{
					title: "Life on Mars? - David Bowie",
					link: "https://music.youtube.com/watch?v=Enzxdvo8NOk&si=GCtRpIWCcnyppvbA",
				},
				{
					title: "Scherzo for motorcycle and orchestra - John Williams",
					link: "https://music.youtube.com/watch?v=1IFmRniWa0U&si=odN7pUpca3Yd8YFW",
				},
				{
					title: "Finale & End Credits - Conan Gray",
					link: "https://music.youtube.com/watch?v=l_VfjEmeUWk&si=wEWAb2jDWNi9hcR6",
				},
			],
			extraLinks: [
				{
					title: "Jordan Pass",
					link: "https://www.jordanpass.jo/",
				},
			],
		},
	},
	{
		title: "Saudi Arabia and Bahrain",
		year: 2023,
		hostedLink: "saudiarabia",
		link: "saudi-arabia-bahrain",
		backupLink:
			"https://drive.google.com/drive/folders/1w-woly9RgbllBBRgjj79PMf2RK-_vKzQ?usp=sharing",
		restricted: true,
		reelLinks: ["https://www.instagram.com/reel/C8L4ml_JkSf/"],
		instagramLinks: [
			"https://www.instagram.com/p/CtB7kMjrehP/?img_index=1",
			"https://www.instagram.com/p/CtMUbqlprRL/?img_index=1",
			"https://www.instagram.com/p/CtRlrampitt/?img_index=1",
		],
		extras: {
			countries: ["Saudi Arabia", "Bahrain"],
			scorecard: {
				beauty: [1, 1],
				affordability: [1, 2],
				food: [1, 2],
				hospitality: [1, 4],
				safety: [4, 6],
				accessibility: [1, 2],
				video: [5, 5],
			},
			finalScore: 1,
			summary: [
				"Saudi Arabia, what a mess. I've never really disliked a country let alone hated one but Arabia somehow managed to be one of the worst weeks of travel in my life.",
				"From the local men who openly beat their wives to having a rock thrown at my head for simply whistling while I walked down the highway (Apparently I was noise polluting the 8 lane freeway). I've never been to a place so hostile and closed off.",
				"I'm still not sure if I liked Bahrain or not, but compared to Saudi it was like paradise. Here at least you're allowed to drink, theirs fun things to do and people actually follow through when they say they'll do something. It's a cute little petro-state where fun can be found, compared to it's neighbors.",
			],
			challenges: ["Everything in Saudi is a challenge"],
			donts: [
				"Book anything, they will just cancel 10 minutes before it's supposed to happen.",
				"Visit any tourist attractions, they'll most likely just be closed even if it's a lone rock in a desert. Most sites aren't really real and haven't been built yet.",
				"Be adventurous, someone will tell you off. You're not even allowed to walk anti-clockwise around a building.",
				"Expect to get around via taxi, they will just drop you wherever they want if they even come to pick you up in the first place.",
				"Rely on your hotels even being real. Most exist just to route you to a much more expensive one that's the only choice in the area, ie Al Ula",
				"Rely on information from Google Maps, most data like opening hours/days or links are just broken or lies.",
				"Eat the food, it's disgusting unflavored slop.",
				"Take the trains, the windows are completely frosted so you're basically in a submarine",
				"Hike in the desert, it's super easy to get lost even if you can read the stars.",
				"Even go. The Visa alone was $250.",
			],
			advice: {
				travelLength: "Saudi Arabia: 0 days / Bahrain: 2 days",
				currency: "Saudi Riyal SAR / Bahraini Dinar BHD",
				season: "November - February",
				dailyBudget: "$200usd",
			},
			travelAdvisory: {
				link: "https://www.smartraveller.gov.au/destinations/Middle%20East",
				advice: Advisory.Level2,
			},
			highlights: [
				{
					title: "Indoor Skydiving (12m 5s)",
					timecode: 725,
				},
			],
			music: [
				{
					title: "People I Don't Like - UPSAHL",
					link: "https://music.youtube.com/watch?v=EGne6NU1rCc&si=VmokutUeeFlEXM2u",
				},
				{
					title: "Don't Stare At the Sun - Bad Lip Reading",
					link: "https://music.youtube.com/watch?v=kJK-KGbAk_Q&si=w24psaLAakyHXCsC",
				},

				{
					title: "The Fox - Ylvis",
					link: "https://music.youtube.com/watch?v=W20gcM6_UtQ&si=sAzxoeEzviVOOjat",
				},
			],
		},
	},
	{
		title: "Iran",
		year: 2023,
		hostedLink: "iran",
		link: "iran",
		backupLink:
			"https://drive.google.com/drive/folders/1qGisn3RuCffmTbKW4LCR46ZgjYhyneo3?usp=sharing",
		restricted: false,
		reelLinks: ["https://www.instagram.com/reel/C89yh6IS-3R/"],
		instagramLinks: [
			"https://www.instagram.com/p/CtUbIIUrCuB/?img_index=1",
			"https://www.instagram.com/p/CtXWowqpCaG/?img_index=1",
			"https://www.instagram.com/p/CtaALBqLgzO/?img_index=1",
			"https://www.instagram.com/p/CtcU9GaJw7D/?img_index=1",
			"https://www.instagram.com/p/CtkDysGpNU1/?img_index=1",
			"https://www.instagram.com/p/CtmgnktJcUn/?img_index=1",
			"https://www.instagram.com/p/CtrhaHNr2J9/?img_index=1",
		],
		extras: {
			countries: ["Iran"],
			scorecard: {
				beauty: [3],
				affordability: [10],
				food: [3],
				hospitality: [9],
				safety: [3],
				accessibility: [5],
				video: [8],
			},
			finalScore: 7,
			summary: [
				"Iran has a reputation for being a regional destabilizing power, known to regularly detain tourists and violently cracking down on protests.",
				"These are all valid concerns, but if you can stomach the fear and overcome these challenges, you'll get to formulate your own opinion and make up your own mind about the realities on the ground.",
				"It's actually a fascinating land of ancient history, vibrant culture, and surprising hospitality, I experienced some incredible moments like being on German national TV, the friendliness of the soldiers and understood the hardships that come from a powerful nation ruled by an oppressive regime under debilitating sanctions.",
			],
			challenges: [
				"Due to Sanctions you cannot use a visa card here, bring crisp USD/EUR and ensure you're getting the black market rate",
				"Americans and brits must have a guide and be under constant supervision while traveling. other nationalities are completely free however",
			],
			dos: [
				"Bring an android phone and install the app 'ShareIt'. In Iran the VPNs are regularly blocked by the government so locals constantly build and share new clients in person to stay ahead and remain connected",
				"Apply for a visa from SurfIran, GetIranVisa & CIBTvisas in advance. The length of stay you can be granted is generally down to your countries relationship with Iran",
			],
			donts: [
				"Even mention Israel. Many people get offended and will report you if overhearing it. Similarly, don't visit Iran if theirs even a trace of you having been to israel",
				"Stick around if theirs a crowd forming, ie protests. They quickly turn dangerous and it's largely accepted that unfortunate individuals caught in a bad situation are hurt or killed, simply to make an example",
			],
			advice: {
				travelLength: "1 - 1.5 months",
				currency:
					"Iranian Rial & Toman (1 Tommen = 10 Rials), United States Dollar $USD & Eu Euro €EUR",
				season: "March - May & September - November",
				dailyBudget: "$2-5USD (I'm not kidding)",
			},
			travelAdvisory: {
				link: "https://www.smartraveller.gov.au/destinations/middle-east/iran",
				advice: Advisory.Level4,
			},
			highlights: [
				{
					title: "Pro-Hijab Protests (1m 51s)",
					timecode: 111,
				},
				{
					title: "6 Cents Per Litre (6m 13s)",
					timecode: 373,
				},
				{
					title: "ZDF Interview (15m 29s)",
					timecode: 929,
				},
			],
			music: [
				{
					title: "Take A Walk - Passion Pit",
					link: "https://music.youtube.com/watch?v=v_5P26wMiAo&si=CAs4sE6Q2sJwNqWt",
				},
				{
					title: "All We Know - The Chainsmokers",
					link: "https://music.youtube.com/watch?v=iObcSzYLQQw&si=Gx8m0Epa36XlkVLc",
				},
				{
					title: "Roam - Ryan Harris",
					link: "https://music.youtube.com/watch?v=zlX0bwZCD0k&si=3cZ0PeEMgeazeqVO",
				},
				{
					title: "The Right Attitude",
					link: "https://music.youtube.com/watch?v=yvZwfRhucSU&si=5PGZbqKVZ83Xlq29",
				},
			],
			extraLinks: [
				{
					title: "My Complete Backpacking Persia Guide",
					link: "https://www.franklin-v-moon.dev/guides/persia-guide",
				},
				{
					title: "Blackmarket USD to Rial Rate",
					link: "https://www.bonbast.com/",
				},
				{
					title: "Travel Insurance",
					link: "https://www.iatitravelinsurance.co.uk/",
				},
				{
					title: "Prior Israel Travel Ban List",
					link: "https://igoogledisrael.com/can-i-visit-arab-countries-with-an-israeli-visa-stamp-in-my-passport/",
				},
			],
			extraVideos: [
				{
					title: "German ZDF Esfahan Interview",
					hostedLink: "iranInterview",
				},
			],
		},
	},
	{
		title: "Armenia, Georgia & Azerbaijan",
		year: 2023,
		hostedLink: "armeniageorgiaazerbaijan",
		link: "armenia-georgia-azerbaijan",
		backupLink:
			"https://drive.google.com/drive/folders/1DogVS8g4liONTD51KvcaVu2XfBrnC_3V?usp=sharing",
		restricted: false,
		reelLinks: ["https://www.instagram.com/reel/C-w6PVhib9V/?hl=en"],
		instagramLinks: [
			"https://www.instagram.com/p/CtupJTxLpN2/?hl=en",
			"https://www.instagram.com/p/CtxSF9Isjco/?hl=en",
			"https://www.instagram.com/p/Ct4xNkmrOpm/?hl=en",
			"https://www.instagram.com/p/Ct7HgwUr25t/?hl=en",
			"https://www.instagram.com/p/Ct-JkPVsuaU/?hl=en",
			"https://www.instagram.com/p/CuDSxN0shnk/?hl=en",
			"https://www.instagram.com/p/CuFqXixr8ES/?hl=en",
			"https://www.instagram.com/p/CuKiuoBLq6p/?hl=en",
			"https://www.instagram.com/p/CuQET6trR_g/?hl=en",
			"https://www.instagram.com/p/CuWSIkQMRzy/?hl=en",
			"https://www.instagram.com/p/CuWWQVoM7FU/?hl=en",
			"https://www.instagram.com/p/CubhrkpMmYm/?hl=en",
		],
		extras: {
			countries: ["Armenia", "Georgia", "Azerbaijan"],
			scorecard: {
				beauty: [5, 6, 2],
				affordability: [8, 8, 4],
				food: [5, 9, 3],
				hospitality: [8, 6, 6],
				safety: [7, 7, 7],
				accessibility: [6, 6, 3],
				video: [6, 8, 7],
			},
			finalScore: 7,
			summary: [
				"I spent a solid month exploring the 3 countries of the South-Caucasus, it was a surprise how good Georgia was  with it's outstanding food and wine.",
				"These 3 nations have a complex history, under Soviet rule they co-existed relatively peacefully. But today Armenia and Azerbaijan regularly clash and Georgia is currently partially occupied by Russia.",
				"Azerbaijan feels like any other gulf petro state and in many ways is proud to be a Turkish puppet. Armenia has a tragic history but some of the most hopeful people you'll ever meet.",
			],
			challenges: [
				"Getting around Azerbaijan can be quite a challenge, similar to Turkey the taxi drivers are very likely to scam and misdirect you at every chance",
			],
			dos: [
				"If you're heading to Kazakhstan you can take a ferry from Baku to Aktau over the Caspian Sea",
				"Make sure you visit as many of the abandoned palaces in Georgia's Tskaltubo before they're all blocked off, renovated or demolished. You can always find a way in if you search hard enough.",
			],
			donts: [
				"If visiting Georgia's Tskaltubo, do not force your way into any locked apartments as they are likely occupied.",
			],
			advice: {
				travelLength: "1 - 1.5 months",
				currency: "Armenian DRAM, Georgian Lati GEL, Azerbaijani Manat AZN",
				season: "July & August",
				dailyBudget: "$30-50 USD",
			},
			travelAdvisory: {
				link: "https://www.smartraveller.gov.au/destinations/Europe",
				advice: Advisory.Level1,
			},
			highlights: [
				{
					title: "Bad Date (2m 31s)",
					timecode: 151,
				},
				{
					title: "Palestine & Australian National Anthems (6m 7s)",
					timecode: 367,
				},
				{
					title: "Stalin's House (10m 27s)",
					timecode: 627,
				},
				{
					title: "Tskaltubo - Abandoned Palaces (15m 27s)",
					timecode: 927,
				},
				{
					title: "Mud Volcanoes (18m 54s)",
					timecode: 1134,
				},
			],
			music: [
				{
					title: "Kaleidoscope - A Great Big World",
					link: "https://music.youtube.com/watch?v=V7JMJPhO5LA&si=eKTTgWDY5QHZh6Q3",
				},
				{
					title: "Enjoy The Ride - Krewella",
					link: "https://music.youtube.com/watch?v=MU8vEVDuR_M&si=6_V6BPI3ub4QYiQK",
				},
				{
					title: "No Stress - Molly Moore",
					link: "https://music.youtube.com/watch?v=9fsaUjUkhqI&si=2B4NLzMOJuJzkTRG",
				},
				{
					title: "Georgia - Vance Joy",
					link: "https://music.youtube.com/watch?v=H8MJ63XScKc&si=0NGNazF6fyFxM2cS",
				},
				{
					title: "Don't Stop Me Now - Queen",
					link: "https://music.youtube.com/watch?v=CczcMarUoVk&si=W_ka2l6DbDU6J_Uy",
				},
			],
			extraVideos: [
				{
					title: "Meeting Aengus Neaves - Cycling Mongolia to Scotland",
					hostedLink: "angusneavesAzerbaijan",
				},
				{
					title: "Endorsing a Random Baku Mobile Store",
					hostedLink: "azerbaijanStoreEndoresment",
				},
			],
			tags: ["Adam Melander"],
		},
	},
	{
		title: "Greece",
		year: 2023,
		hostedLink: "greece",
		link: "greece",
		backupLink:
			"https://drive.google.com/drive/folders/1fESHg-DLWm-QOZhkmBkepQAUaapIG_ku?usp=sharing",
		restricted: false,
		reelLinks: ["https://www.instagram.com/reel/C_PcOfOCX4E/?hl=en"],
		instagramLinks: [
			"https://www.instagram.com/p/CufoGNOsExu/?hl=en",
			"https://www.instagram.com/p/CuklIluLnZE/?hl=en",
			"https://www.instagram.com/p/CuknIYYrTRi/?hl=en",
			"https://www.instagram.com/p/Cup18pisDpr/?hl=en",
			"https://www.instagram.com/p/CutX6yNsmrW/?hl=en",
			"https://www.instagram.com/p/CuxVBypLGrt/?hl=en",
			"https://www.instagram.com/p/CuxaFY_rTD3/?hl=en",
			"https://www.instagram.com/p/Cu1rOL5M2B5/?hl=en",
			"https://www.instagram.com/p/Cu5JTCbrApq/?hl=en",
		],
		extras: {
			countries: ["Greece"],
			scorecard: {
				beauty: [6],
				affordability: [4],
				food: [10],
				hospitality: [6],
				safety: [10],
				accessibility: [9],
				video: [10],
			},
			finalScore: 9,
			summary: [
				"One of the most relaxed and gorgeous regions in the world. From the immense back alleys of Athens to the blue and white cliffs of the many islands, Greece is the perfect place to have fun, kick back and just enjoy life.",
				"While not cheap or easy I managed to squeeze in a wonderful trip where I met some of the loveliest travelers and went on countless little adventures.",
				"Everyone has an idea of what greece will be, somehow it exceeds those expectations and shows you new things you never knew you wanted.",
			],
			dos: [
				"Checkout Crete. Raki here is untaxed and therefore cheaper than water, they literally give it away with every meal.",
			],
			donts: [
				"Spend too much time in Santorini. You can do most of it in a day but it's extremely expensive and theirs better places",
				"Never eat at a restaurant where theirs someone out the front trying to lure you in. If it's good they don't need to do that",
			],
			advice: {
				travelLength: "1 - 3 months",
				currency: "European Euro EUR",
				season: "April - June",
				dailyBudget: "",
			},
			travelAdvisory: {
				link: "https://www.smartraveller.gov.au/destinations/europe/greece",
				advice: Advisory.Level1,
			},
			highlights: [
				{
					title: "Crete Nightlife (4m 39s)",
					timecode: 279,
				},
				{
					title: "Frankie Jr. (6m 17s)",
					timecode: 377,
				},
				{
					title: "Santorini (9m 50s)",
					timecode: 590,
				},
			],
			music: [
				{
					title: "Greased Lightnin' - John Travolta & Jeff Conaway",
					link: "https://music.youtube.com/watch?v=Y1ChbwFlyuE&si=v2IzEFOWG0Dg4JPy",
				},
				{
					title: "Yakety Yak - The Coasters",
					link: "https://music.youtube.com/watch?v=zokNDFo1z7I&si=8BdR2fc6OHwrl2G_",
				},
				{
					title: "Johnny B Goode - Chuck Berry",
					link: "https://music.youtube.com/watch?v=-k2q31pWZzg&si=umA9UzsxnbI_snaK",
				},
				{
					title: "Mamma Mia - ABBA",
					link: "https://music.youtube.com/watch?v=KMViJKmAV4M&si=qN_ll38hcDWR8NK6",
				},
				{
					title: "Crocodile Rock - Elton John",
					link: "https://music.youtube.com/watch?v=75r0nQu-hMs&si=sNEeLlhpJ_K0CQJ3",
				},
			],
			tags: ["Phillip Sgardelis", "Claire Dubouilh Marino"],
		},
	},
	{
		title: "Turkey",
		year: 2023,
		hostedLink: "turkey",
		link: "turkey",
		restricted: false,
		instagramLinks: [
			"https://www.instagram.com/p/Cu9PmFaLhfp/?hl=en",
			"https://www.instagram.com/p/CvFEUc1sqd7/?hl=en",
			"https://www.instagram.com/p/CvQnIUlNDkk/?hl=en",
			"https://www.instagram.com/p/CvRpULzsPWw/?hl=en",
			"https://www.instagram.com/p/CvVZxBmrnNO/?hl=en",
			"https://www.instagram.com/p/CvYKenvMW31/?hl=en",
			"https://www.instagram.com/p/CvcCKJzMUAD/?hl=en",
			"https://www.instagram.com/p/CviNxqQrVSL/?hl=en",
		],
		backupLink:
			"https://drive.google.com/drive/folders/1XCmnocL818puHIMOQHp2jxK0YomOn8Nd?usp=sharing",
		reelLinks: ["https://www.instagram.com/reel/C_cuUwoigGb/?hl=en"],
		extras: {
			countries: ["Turkey"],
			scorecard: {
				beauty: [4],
				affordability: [6],
				food: [4],
				hospitality: [5],
				safety: [6],
				accessibility: [7],
				video: [5],
			},
			finalScore: 5,
			summary: [
				"The bridge between worlds, Türkiye. Meeting and mixing Europe, the Middle East and the Caucuses.",
				"Honestly I didn't spend enough time in Turkey and what I did do and see was a bit 'touristy'. Istanbul is one of those cities you could spend weeks alone, from it's 'Europe side' and it's 'Asia Side' you can experience a great mesh of foods, lifestyles and fun experiences.",
			],
			challenges: [
				"Taxi drivers in Turkey are something else. Never trust the driver, if you know they're going the wrong way don't be afraid to jump out and if they decide to double the agreed-upon price after you've arrived, expect the confrontation to become physical.",
			],
			dos: [
				"Find accommodation on the 'Asia' side of Istanbul, the district of Kadikoy. You can still see all the famous things of the 'Europe' side but save so much on money and the nightlife is best on the Asia anyway.",
				"Negotiate locally for the hot air balloons in Cappadocia. You can secure a half price discount the night before if theirs been a string of good weather days",
			],
			advice: {
				travelLength: "1 month",
				currency: "Turkish Lira TRY",
				season: "March - May",
				dailyBudget: "$50 - 150usd",
			},
			travelAdvisory: {
				link: "https://www.smartraveller.gov.au/destinations/europe/turkiye",
				advice: Advisory.Level2,
			},
			highlights: [
				{
					title: "Taxi Driver Brawl (4m 10s)",
					timecode: 250,
				},
				{
					title: "Gallipoli (6m 42s)",
					timecode: 402,
				},
				{
					title: "Hot Air Balloons (11m 17s)",
					timecode: 677,
				},
			],
			music: [
				{
					title: "Yarina Kalir, Yanina Kalmaz - Ugur Isilak",
					link: "https://music.youtube.com/watch?v=Q9eyUK5uCDs&si=KKal9phcleMA82dj",
				},
				{
					title: "Bangir Bangir - Gulsen",
					link: "https://music.youtube.com/watch?v=hXJGmGZMV84&si=Ho8pm-5xjyAv0jC2",
				},
				{
					title: "It's a Long Way To Tipperary - Nathan Lay",
					link: "https://music.youtube.com/watch?v=gs5IH76mwCM&si=Uak4Azo-CJZMBrYq",
				},
				{
					title: "Won't Let This Moment Pass Us By - Benji Jackson",
					link: "https://music.youtube.com/watch?v=YUdx9FgId0A&si=Od7XrgsOnVP-39Dk",
				},
				{
					title: "Into a Fantasy - Alexander Rybak",
					link: "https://music.youtube.com/watch?v=tU7C8od6eSk&si=Do4KW0VTc57Dcn7P",
				},
			],
			tags: ["Phillip Sgardelis"],
		},
	},
	{
		title: "Lebanon",
		year: 2023,
		hostedLink: "lebanon",
		link: "lebanon",
		restricted: false,
		instagramLinks: [
			"https://www.instagram.com/p/CvspxJLrFVg/?hl=en",
			"https://www.instagram.com/p/CvzNnEssv_r/?hl=en",
			"https://www.instagram.com/p/CvzO2Pxs0os/?hl=en",
			"https://www.instagram.com/p/Cv0gI5yLV3q/?hl=en",
		],
		backupLink:
			"https://drive.google.com/drive/folders/1OToOEBqXkFSJTHRliyt8B2o-LqUKgKqO?usp=sharing",
		reelLinks: ["https://www.instagram.com/reel/C_lNBtKCH0H/?hl=en"],
		extras: {
			countries: ["Lebanon"],
			scorecard: {
				beauty: [3],
				affordability: [8],
				food: [9],
				hospitality: [6],
				safety: [5],
				accessibility: [5],
				video: [2],
			},
			finalScore: 3,
			summary: [
				"Heading through to Syria I had to checkout Lebanon, sometimes nicknamed 'The Switzerland of the Middle East' for it's previous reputation to discreetly store one's wealth.",
				"Sadly at time of filming Lebanon has fallen far. Infested with Hezbollah, an Iran-backed terror organization that sudo-controls the government without any of the benefits a functioning government would provide. They destabilize the whole nation and ensure it's stuck in constant conflict internally and externally.",
				"Even so, the Lebanese press on as some of the kindest and most hospital folks you'll ever meet. Kind, open-minded and fantastic cooks.",
			],
			challenges: [
				"Hezbollah forces are dotted around the country and in Beirut. Generally they'll leave you alone but you'll find that their presence gets in the way of whatever you're trying to do.",
			],
			dos: [
				"Go clubbing. Lebanon has one of the most fun and exciting night life's out there, everyone interacts and has fun together.",
			],
			donts: [
				"Use the ATMs. The official conversion rate of Lebanese pounds is atrocious. Instead bring cash and exchange with stores directly at the black market rate.",
				"Discuss sensitive topics if you're unfamiliar with the person. Lebanon is outrageously diverse in terms of religion and nationality. There are floods of Syrian refugees and struggling folks so you never know who's been affected by what.",
			],
			advice: {
				travelLength: "1 - 2 weeks",
				currency: "Lebanese Pound LPB",
				season: "April - November",
				dailyBudget: "$10 - 15usd",
			},
			travelAdvisory: {
				link: "https://www.smartraveller.gov.au/destinations/middle-east/lebanon",
				advice: Advisory.Level4,
			},
			highlights: [
				{
					title: "Meet Hezbollah (4m 16s)",
					timecode: 256,
				},
			],
			music: [
				{
					title: "New Perspective - Noah Kahan",
					link: "https://music.youtube.com/watch?v=9u3OuJTS4hc&si=oqnbNVCkUC85tH9y",
				},
				{
					title: "Shotgun - George Ezra",
					link: "https://music.youtube.com/watch?v=nS7Yoj8qOwU&si=qG8EhiRjc3NxUjRO",
				},
			],
		},
	},
	{
		title: "Syria",
		year: 2023,
		hostedLink: "syria",
		link: "syria",
		restricted: false,
		instagramLinks: [
			"https://www.instagram.com/p/Cv66XjcLuCI/?hl=en",
			"https://www.instagram.com/p/Cv9eJaMsQ1o/?hl=en",
			"https://www.instagram.com/p/CwCTJLKMRo0/?hl=en",
			"https://www.instagram.com/p/CwF09q0spyl/?hl=en",
			"https://www.instagram.com/p/CwNnPkVMIUc/?hl=en",
		],
		backupLink:
			"https://drive.google.com/drive/folders/1SvQ3x2YGW2ibSM3t-kx_gRMiAYf_cPsi?usp=sharing",
		reelLinks: ["https://www.instagram.com/reel/DAGBpdVCaEJ/?hl=en"],
		extras: {
			countries: ["Syria"],
			scorecard: {
				beauty: [7],
				affordability: [10],
				food: [10],
				hospitality: [8],
				safety: [7],
				accessibility: [7],
				video: [10],
			},
			finalScore: 10,
			summary: [
				"Experiencing Syria during the Assad regime was an actual unforgettable experience, the week I spent in Syria might be the most impactful week of my life.",
				"Each and every aspect of this tragic yet resilient country stands out. The people still have so much pride and hope, everyone is wonderful, the history immense and the food to die for.",
				"Damascus has gone down as my favorite city, its so rich and vibrant. Homs and Hama while devastated from decades of war still have so much to offer. Aleppo and Palmyra with it's recent ISIS occupation could alone could be traveled for weeks without learning everything that's just happened.",
			],
			dos: ["Eat and drink everything."],
			donts: [
				"The Kim Jong-il park while fascinating is literally just a patch of grass.",
			],
			advice: {
				travelLength: "3 - 5 weeks",
				currency: "Syrian pound SYP",
				season: "March - May",
				dailyBudget: "$5 - 10usd",
			},
			travelAdvisory: {
				link: "https://www.smartraveller.gov.au/destinations/middle-east/syria",
				advice: Advisory.Level4,
			},
			highlights: [
				{
					title: "Lost in Damascus (3m 34s)",
					timecode: 214,
				},
				{
					title: "Aramaic - Jesus Native Language (5m 59s)",
					timecode: 359,
				},
				{
					title: "Maramarita Festival (7m 42s)",
					timecode: 462,
				},
				{
					title: "Aleppo (9m 31s)",
					timecode: 571,
				},
				{
					title: "Taylor Swift Concert (12m 10s)",
					timecode: 730,
				},
			],
			music: [
				{
					title: "Viva La Vida - Coldplay",
					link: "https://music.youtube.com/watch?v=3a-q7vPa-UU&si=Hf-IwDnXrKqdy_pv",
				},
				{
					title: "Rasputin - Boney M",
					link: "https://music.youtube.com/watch?v=5Z0dxsFmX7c&si=3jhbv2Jfa5yxyZmo",
				},
				{
					title: "Castle On The Hill - Ed Sheeren",
					link: "https://music.youtube.com/watch?v=wqlTrBCNRiY&si=RYn0NlDrbIZBujp8",
				},
				{
					title: "Hard Sometimes - Ruel",
					link: "https://music.youtube.com/watch?v=OA_Auja3wNQ&si=pcy6uEIeHjJ_pM7c",
				},
				{
					title: "Blank Space - Taylor Swift",
					link: "https://music.youtube.com/watch?v=dC9QIUKviJU&si=Z0Jx7lHOe3mJh0-o",
				},
			],
			tags: ["Paris Hailwood"],
		},
	},
	{
		title: "Cyprus",
		year: 2023,
		hostedLink: "cyprus",
		link: "cyprus",
		restricted: false,
		reelLinks: [
			"https://www.instagram.com/reel/DAIpVj3iUJI/?igsh=MXY5cjUzZHF3bmFvcA==",
		],
		backupLink:
			"https://drive.google.com/drive/folders/1U8dmbaKFVANjIbDswF4bD-JIwKgraJw3?usp=sharing",
		instagramLinks: [
			"https://www.instagram.com/p/CwTBSZ8rP6c/?hl=en",
			"https://www.instagram.com/p/CwVuLVvrgWP/?hl=en",
		],
		extras: {
			countries: ["Cyprus"],
			scorecard: {
				beauty: [4],
				affordability: [5],
				food: [8],
				hospitality: [7],
				safety: [8],
				accessibility: [6],
				video: [3],
			},
			finalScore: 4,
			summary: [
				"An island nation divided, where ancient ruins meet sun-drenched coastlines with everything you love and hate from it's nearest neighbors.",
				"The Greek Cypriot and Turkish Cypriot communities of Cyprus are a living testament to the island's complex recent history where the UN buffer lines creates an incredibly strange atmosphere yet life goes on in paradise.",
				"I explored a few cities and mostly 'lived it up' aboard cruises and wind surfing, the south feels much more like a Greek island and the north more like a forgotten wasteland from Fallout with countless ghost towns covered in bullet holes.",
			],
			challenges: [
				"Each side of Cyprus uses different currencies, the south uses Euros and the north the Turkish Lira.",
			],
			advice: {
				travelLength: "2 weeks",
				currency: "South: European Union Euro EUR / North: Turkish Lira TL",
				season: "May - July",
				dailyBudget: "$80usd",
			},
			travelAdvisory: {
				link: "https://www.smartraveller.gov.au/destinations/europe/cyprus",
				advice: Advisory.Level2,
			},
			highlights: [
				{
					title: "Wind Surfing (36s)",
					timecode: 36,
				},
				{
					title: "Ghost City (1m 52s)",
					timecode: 112,
				},
			],
			music: [
				{
					title: "Gone - Jr Jr",
					link: "https://music.youtube.com/watch?v=uQp8xxBp4Pw&si=iY7EUR_z4qMO4m-I",
				},
			],
		},
	},
	{
		title: "Israel & Palestine",
		year: 2023,
		hostedLink: "israelpalestine",
		link: "israel-and-palestine",
		restricted: true,
		instagramLinks: [
			"https://www.instagram.com/p/CwYWLKNr2nj/?hl=en",
			"https://www.instagram.com/p/CwfOOKisfk6/?hl=en",
			"https://www.instagram.com/p/Cwk0xLwsCd_/?hl=en",
			"https://www.instagram.com/p/CwnqtIaLVUC/?hl=en",
			"https://www.instagram.com/p/CwuCqhUMNAd/?hl=en",
			"https://www.instagram.com/p/Cwzr9nZLCDu/?hl=en",
		],
		backupLink:
			"https://drive.google.com/drive/folders/1_CFYkAQu2S0a26A0V6vibE6-t94rZSOW?usp=sharing",
		reelLinks: ["https://www.instagram.com/reel/DASgqv-CzW-/?hl=en"],
		extras: {
			countries: ["Israel", "Palestine"],
			scorecard: {
				beauty: [4, 3],
				affordability: [5, 5],
				food: [8, 2],
				hospitality: [3, 6],
				safety: [7, 6],
				accessibility: [8, 3],
				video: [9, 9],
			},
			finalScore: 8,
			summary: [
				"We witnessed firsthand the tangible realities of the Israeli-Palestinian conflict, including the separation barrier and its impact on daily life.",
				"Israel & Palestine have diverse religious and political narratives shaping the region's complex recent history. growing up a christian, it was fascinating to see the real locations from the bible and even more so, that they always had a gift shop next door.",
				"It's a surreal experience to travel this region, with so many concerning and surprising facts it can be heart breaking to visit but something I believe everyone should try at-least once.",
			],
			challenges: [
				"Israeli border security is fierce. Many travelers are fine, but if you're solo it's likely you will be searched and questioned for hours. Leave extra time.",
			],
			dos: [
				"Cross into Bethlehem on foot and get a day trip with any taxi drivers. First and foremost they want you to understand their circumstances.",
			],
			donts: [
				"Cross the Jordanian border if you plan to visit a long list of other arab countries. Even though Israel does not stamp your passport, the Jordanian land border stamp will indicate you visited Israel - In Lebanon for example, this would get you arrested.",
				"Rent a car in israel then drive it into Palestine. The Israeli numberplate will get your car targeted.",
			],
			advice: {
				travelLength: "2 - 4 weeks",
				currency: "Israeli Shekel (both)",
				season: "April - November",
				dailyBudget: "$100usd",
			},
			travelAdvisory: {
				link: "https://www.smartraveller.gov.au/destinations/middle-east/israel-and-occupied-palestinian-territories",
				advice: Advisory.Level4,
			},
			highlights: [
				{
					title: "Bethlehem (2m 14s)",
					timecode: 134,
				},
				{
					title: "How The Sun Works (6m 5s)",
					timecode: 365,
				},
				{
					title: "Mount Temptation (8m 15s)",
					timecode: 495,
				},
			],
			music: [
				{
					title: "Bad Liar - Imagine Dragons",
					link: "https://music.youtube.com/watch?v=I203G1sMGDg&si=C9OVxBqSS-ey6T5l",
				},
				{
					title: "5 Foot 9 - Tyler Hubbard",
					link: "https://music.youtube.com/watch?v=K0y8z5jIm3U&si=GmWovi4l1HwiRngf",
				},
				{
					title: "Chemical - Post Malone",
					link: "https://music.youtube.com/watch?v=cEGG77nmrTI&si=O6YFTXRcS8ZwVoux",
				},
				{
					title: "Purple - Hollow Coves",
					link: "https://music.youtube.com/watch?v=KQR03L13SkI&si=RMj3p-kBL51BPmju",
				},
			],
			extraLinks: [
				{
					title: "Countries You Cannot Visit After Israel",
					link: "https://www.quora.com/What-countries-can-you-not-visit-after-going-to-Israel",
				},
			],
		},
	},
	{
		title: "Philippines & Brunei",
		year: 2024,
		hostedLink: "philippinesbrunei",
		link: "philippines-and-brunei",
		restricted: true,
		instagramLinks: [
			"https://www.instagram.com/p/C0qMrfyrRhi/?hl=en",
			"https://www.instagram.com/p/C1EZPPPrN87/?hl=en",
			"https://www.instagram.com/p/C1Q2UQcLqS-/?hl=en",
		],
		reelLinks: ["https://www.instagram.com/reel/DAWBdOpC00S/?hl=en"],
		backupLink:
			"https://drive.google.com/drive/folders/1B2LnxZODyNkqD3TKdZg9PBc0qe0fvXbA?usp=sharing",
		extras: {
			countries: ["Philippines", "Brunei"],
			scorecard: {
				beauty: [3, 3],
				affordability: [7, 4],
				food: [1, 2],
				hospitality: [6, 4],
				safety: [7, 7],
				accessibility: [6, 6],
				video: [6, 6],
			},
			finalScore: 6,
			summary: [
				"The Philippines, an archipelago of over 7,000 islands offering a diverse landscape of beaches, volcanoes, rain forests and infinite diving.",
				"Nearby Brunei is a tiny oil-rich sultanate known for it's mosques, tree canopies and Venetian-style river villages.",
				"Steering clear of Manila due to it's scammy and congested nature, we explored chaotic Cebu by scooter and snorkelled around its gorgeous coast. While the food in both countries is quite bad (philippines voted worst in the world recently) we did enjoy the nightlife and punchy red horse beers.",
			],
			challenges: [
				"Manilla is a hellish city with some truly awful congestion. Many taxi scams exist, particularly the 'airport bus' that you can never rely on.",
			],
			dos: [
				"Give the Philippines a huge amount of time. Each island has so much to offer, think of it like a much bigger Greek archipelago.",
			],
			donts: ["Eat the eggs called 'Balut. Or do, it's your life."],
			advice: {
				travelLength: "Philippines: 1 - 2 months / Brunei 2 - 3 days",
				currency: "Philippine Peso PHP / Brunei Dollar BND",
				season: "December - February",
				dailyBudget: "Philippines: $20usd / Brunei: $40usd",
			},
			travelAdvisory: {
				link: "https://www.smartraveller.gov.au/destinations/Asia",
				advice: Advisory.Level2,
			},
			music: [
				{
					title: "Manila - Ray Dalton",
					link: "https://music.youtube.com/watch?v=qHhQwoDIDTI&si=uT-MgUZBD9bSeo0S",
				},
				{
					title: "Small Talk - Call Security",
					link: "https://music.youtube.com/watch?v=x-97hc4kIlE&si=xRSvnyP26t4ClH6V",
				},
			],
			extraVideos: [
				{
					title: "Original Philippines 2020 Travel Video",
					hostedLink: "philippines",
				},
			],
			tags: ["Adam Melander"],
		},
	},
	{
		title: "Timor-Leste",
		year: 2024,
		hostedLink: "timorleste",
		link: "timor-leste",
		restricted: false,
		instagramLinks: [
			"https://www.instagram.com/p/C-RGiELTbxA/?hl=en",
			"https://www.instagram.com/p/C-U4hPnzsoJ/?hl=en",
			"https://www.instagram.com/p/C-ZpKlvzLk3/?hl=en",
		],
		reelLinks: ["https://www.instagram.com/reel/DAkVgM9i5tf/?hl=en"],
		backupLink:
			"https://drive.google.com/drive/folders/1maUl4djBYlTRbgBo7WrUQYfB8Xdc0mrT?usp=sharing",
		extras: {
			countries: ["Timor-Leste"],
			scorecard: {
				beauty: [3],
				affordability: [6],
				food: [3],
				hospitality: [7],
				safety: [7],
				accessibility: [3],
				video: [9],
			},
			finalScore: 6,
			summary: [
				"One of the world's youngest countries, least traveled and with a truly tragic recent history. Riding through the street you attract a lot of eyeballs followed with a constant stream of 'hello''s, 'hi's and 'where are you from?'.",
				"The infrastructure here is extremely basic with most roads made of only dirt/mud and the 4th slowest cellular network globally.",
				"What it lacks in amenities it makes up for in ecology, by being relatively untouched it has the worlds most bio-diverse coral reefs surrounding the ex-prison island of Atauro.",
			],
			challenges: [
				"There is almost no tourism infrastructure except for dive centers.",
				"The roads are almost nonexistent with potholes regularly swallowing up whole motorbikes. It's fun but ensure ample time and energy",
			],
			dos: [
				"Spend a few days at 'Barry's Place' in Atauro. He's amazing and theirs a lot to do surprisingly",
			],
			advice: {
				travelLength: "1 week",
				currency: "United States Dollar $USD",
				season: "May - November",
				dailyBudget: "$20usd",
			},
			travelAdvisory: {
				link: "https://www.smartraveller.gov.au/destinations/asia/timor-leste",
				advice: Advisory.Level2,
			},
			highlights: [
				{
					title: "Rural Breakdown (5m 18s)",
					timecode: 318,
				},
				{
					title: "Atauro Flight (6m 59s)",
					timecode: 419,
				},
				{
					title: "Crab Rave (8m 15s)",
					timecode: 495,
				},
			],
			music: [
				{
					title: "C'est La Vie - Yung Gravy",
					link: "https://music.youtube.com/watch?v=lHMzHNxkcfE&si=mpjqGMSLjCm4Ie41",
				},
				{
					title: "Married Life - Michael Giacchino",
					link: "https://music.youtube.com/watch?v=S3jmcjyzRI0&si=JLhIzS2EhqnZbeX8",
				},
				{
					title: "The Nosebleed Section - Hilltop Hoods",
					link: "https://music.youtube.com/watch?v=1PgvxPCLQzw&si=vgyrqO9FUsA3sEWN",
				},
				{
					title: "I Don't Wanna Wait - David Ghuetta & One Republic",
					link: "https://music.youtube.com/watch?v=yjNJLr0nX6U&si=_b5mufidUj6lOgtA",
				},
			],
			extraLinks: [
				{
					title: "Days and Ways to Atauro",
					link: "https://ataurotourism.org/plan-your-trip/getting-here/",
				},
			],
		},
	},
	{
		title: "Bangladesh",
		year: 2024,
		hostedLink: "bangladesh",
		link: "bangladesh",
		restricted: false,
		instagramLinks: [
			"https://www.instagram.com/p/DCOMqWmJ4X5/?hl=en&img_index=1",
			"https://www.instagram.com/p/DCUWQ4ohBra/?hl=en&img_index=1",
			"https://www.instagram.com/p/DCWDQIBp3e8/?hl=en&img_index=1",
			"https://www.instagram.com/p/DCYTMYWJ4s6/?hl=en&img_index=1",
			"https://www.instagram.com/p/DCbE7AzJtvw/?hl=en&img_index=1",
		],
		reelLinks: ["https://www.instagram.com/reel/DDwCngSJmuq/?hl=en"],
		backupLink:
			"https://drive.google.com/drive/folders/1_D1GjrhBz6rtuw8-4xNWFXlxmUi5axpZ?usp=sharing",
		extras: {
			countries: ["Bangladesh"],
			scorecard: {
				beauty: [1],
				affordability: [9],
				food: [1],
				hospitality: [8],
				safety: [2],
				accessibility: [1],
				video: [10],
			},
			finalScore: 6,
			summary: [
				"Bangladesh is a very unique country, blending some of the best and worst of experiences into a captivating yet daunting adventure.",
				"Home to the world's largest mangrove forest, the Sundarbans. The worlds longest uninterrupted sea beach, Cox bazaar and a fascinating textiles industry, we had a blast but also, would never go back.",
				"If you're into 'Yes theory' then this is the country for you, it has stunning nature and a type of local you've never met before, Everything here is a challenge but rewarding nonetheless.",
			],
			challenges: [
				"The food is straight-up not fit for animal nor human consumption. Everything, even KFC, gave me food poisoning. Stick to Oreos and potato crisps.",
				"Getting around is very hard, you can't really book anything online and theirs no such thing as a schedule. Just ask around until a solution presents itself but that does mean you can commute in crazy unexpected ways.",
			],
			dos: [
				"Train surf in Dhaka. It's a thrilling experience and nearing it's expected end. Simply try to sneak on the roof when no guards are watching and enjoy the ride.",
			],
			donts: [
				"Solo travel as a woman, even a group of women I would not suggest. Many of the locals have no concept of personal space, they will crowd around you and stare, touch, help themselves to whats in your pocket and even I, a 6-foot man, was sexually harassed multiple times",
			],
			advice: {
				travelLength: "2 weeks",
				currency: "Bangladeshi Taka BDT",
				season: "December - March",
				dailyBudget: "$25usd",
			},
			travelAdvisory: {
				link: "https://www.smartraveller.gov.au/destinations/asia/bangladesh",
				advice: Advisory.Level3,
			},
			highlights: [
				{
					title: "Sexually Harassed (5m 31s)",
					timecode: 331,
				},
				{
					title: "Truck Hitchhiking (6m 13s)",
					timecode: 373,
				},
				{
					title: "Barishal University Presentation (8m 34s)",
					timecode: 514,
				},
				{
					title: "Train Surfing (14m 26s)",
					timecode: 866,
				},
			],
			music: [
				{
					title: "It Is What It Is - Jenna Raine",
					link: "https://music.youtube.com/watch?v=VLObcolZ6jI&si=8ScTUtHWCfNM7Qjn",
				},
				{
					title: "Beautiful Life - Now United",
					link: "https://music.youtube.com/watch?v=CuOJOtbw0vs&si=Sa_cBseJU6RbI3rd",
				},
				{
					title: "Modern Art - Black Lips",
					link: "https://music.youtube.com/watch?v=9Od7tvXYx60&si=HB5Zuoc9NfGqBRUm",
				},
				{
					title: "We Like To Party - Vengaboys",
					link: "https://music.youtube.com/watch?v=KRQPDlKoaWk&si=2TGZKXw_tebJ7ukn",
				},
			],
			extraLinks: [
				{
					title: "Guest Speaking At Barishal University",
					link: "https://www.facebook.com/share/p/18bAX5KRd2/",
				},
			],
			tags: ["Adam Melander"],
		},
	},
	{
		title: "Bhutan & East India",
		year: 2024,
		hostedLink: "bhutan",
		link: "bhutan-and-east-india",
		restricted: false,
		instagramLinks: [
			"https://www.instagram.com/p/DCdj2OeJbW9/?hl=en&img_index=1",
			"https://www.instagram.com/p/DCmM-vNh-Dt/?hl=en&img_index=1",
			"https://www.instagram.com/p/DCnqTo-pa5L/?hl=en&img_index=1",
			"https://www.instagram.com/p/DCqHnMPBcUE/?hl=en&img_index=1",
			"https://www.instagram.com/p/DCxxx0aBJBv/?hl=en&img_index=1",
		],
		reelLinks: ["https://www.instagram.com/reel/DEAUDrrJPIk/?hl=en"],
		backupLink:
			"https://drive.google.com/drive/folders/1p724j3uqLAlkelWtiekMf1LUhbpzw-Jb?usp=sharing",
		extras: {
			countries: ["East India", "Bhutan"],
			deductCountryCount: 1,
			scorecard: {
				beauty: [10, 3],
				affordability: [9, 1],
				food: [3, 3],
				hospitality: [6, 4],
				safety: [5, 10],
				accessibility: [6, 1],
				video: [7, 7],
			},
			finalScore: 5,
			summary: [
				"We hiked and rode our way through a less-traveled section of the Himalayas, everywhere you look is stunning architecture and color.",
				"There are few countries like Bhutan. Nestled 2500m in the mountains it's a bastion of peace and long term thinking. They impose an expensive daily Sustainable Development Fee (SDF) on tourists which is what makes it one of the least visited countries on earth.",
				"We also got to enjoy the celebrations of Diwali in the East-Indian region of Darjeerling, surprisingly it felt more like new years with endless screaming fireworks and fire crackers.",
			],
			challenges: [
				"Bhutan essentially forces tourists to hire a guide and driver. Technically you can explore Paro and Thimphu without one but you MUST fly in to the airport, don't try to get there via car.",
			],
			dos: [
				"Travel Bhutan in the off or shoulder season when the SDF is $100 per day instead of $250.",
				"Rent a Himalayan motorbike and enjoy the pure peace that is the twisting yet safe and clean roads of Dochula Pass.",
			],
			donts: [
				"Try to avoid hiring a guide. They kind of suck and make the experience worse but without one many things become locked off and locals still won't engage with you.",
			],
			advice: {
				travelLength: "5 days or 2 weeks if hiking",
				currency: "Bhutanese Ngultrum BTN & Indian Rupee (Accepted in Bhutan)",
				season: "March - May",
				dailyBudget: "$20USD + $100/250USD Daily SDF",
			},
			travelAdvisory: {
				link: "https://www.smartraveller.gov.au/destinations/asia/bhutan",
				advice: Advisory.Level1,
			},
			highlights: [
				{
					title: "Diwali Festival (3m 39s)",
					timecode: 219,
				},
				{
					title: "National Archery Competition (8m 31s)",
					timecode: 511,
				},
				{
					title: "First Tattoo (12m 53s)",
					timecode: 773,
				},
			],
			music: [
				{
					title: "Jag Changa - Raghu Dixit",
					link: "https://music.youtube.com/watch?v=8LIk4sHswiM&si=PZrhB6F95D7F6hgg",
				},
				{
					title: "Send Me On My Way - Rusted Root",
					link: "https://music.youtube.com/watch?v=ZS4m67ElJzU&si=6H-gtf5tsV7Jc9yt",
				},
				{
					title: "A Little Bit Happy - TALK",
					link: "https://music.youtube.com/watch?v=Dr74mEbAtL4&si=ImwQlgw7gKKEzNDF",
				},
				{
					title: "Just A Simple Monk - Jeremy Zuckerman",
					link: "https://music.youtube.com/watch?v=qPw89MgOBvw&si=AHZ0qrVz-ZcFfNLT",
				},
				{
					title: "Avatar The Last Airbender Theme - Samuem Kim",
					link: "https://music.youtube.com/watch?v=BToxRk8X3n8&si=lyKeDvD2I5AUoluq",
				},
			],
			tags: ["Adam Melander"],
		},
	},
	{
		title: "Maldives & Sri Lanka",
		year: 2024,
		hostedLink: "maldivessrilanka",
		link: "maldives-and-sri-lanka",
		restricted: false,
		instagramLinks: [
			"https://www.instagram.com/p/DEyptuVJGbk/?hl=en&img_index=1",
			"https://www.instagram.com/p/DE6s6JFpJ6L/?hl=en&img_index=1",
			"https://www.instagram.com/p/DFE9V62J79b/?hl=en&img_index=1",
		],
		backupLink:
			"https://drive.google.com/drive/folders/1z5GgatabgWeQEKrbZkZZDSOCS_xuEV6r?usp=sharing",
		extras: {
			countries: ["Maldives", "Sri Lanka"],
			scorecard: {
				beauty: [5, 3],
				affordability: [4, 8],
				food: [1, 4],
				hospitality: [5, 6],
				safety: [7, 7],
				accessibility: [2, 8],
				video: [5, 5],
			},
			finalScore: 3,
			summary: [
				"We joined a friend for 2025 New Years, enroute had a stopover in The Maldives for a bit sun and aquatic fun.",
				"The Maldives was once an expensive and exclusive destination but since 2022 they allow tourists to lodge on the normal non-resort islands which dramatically cuts costs. Multiple budget friendly tour companies have emerged since but the food remains deplorable.",
				"After their credit default, Sri Lanka has focused intensely on its tourism industry which has made it a fantastic attractive destination to backpack. It's affordable and beautiful. Safety is top notch making it the ideal first taste of South Asia.",
			],
			challenges: [
				"The Maldives is exceptionally hard to travel freely, there are many 'gotchas' like ferries needing pre-booking or not running on certain days.",
			],
			dos: [
				"Leave an extra day or two in The Maldives free as weather and unforeseen circumstances can make it impossible to see certain ocean life, e.g the whale sharks and manta rays.",
			],
			donts: [
				"Never trust your host/hotel in The Maldives. Whenever they say 'no problem', you're going to have a big problem. Ensure you make your own plans with receipts or guarantees.",
			],
			advice: {
				travelLength: "Maldives: 1 week / Sri Lanka: 3 weeks",
				currency: "Maldivian Rufiyaa MVR & Sri Lankan Rupee LKR",
				season: "December - March",
				dailyBudget: "Maldives: $150USD / Sri Lanka: $30USD",
			},
			travelAdvisory: {
				link: "https://www.smartraveller.gov.au/destinations/Asia",
				advice: Advisory.Level2,
			},
			highlights: [
				{
					title: "Swimming with Sharks (3m 9s)",
					timecode: 189,
				},
				{
					title: "Eating a Fly (9m 28s)",
					timecode: 568,
				},
				{
					title: "Excessive Fireworks (12m 6s)",
					timecode: 726,
				},
			],
			music: [
				{
					title: "Sharks - Imagine Dragons",
					link: "https://music.youtube.com/watch?v=jvwDooKFMLk&si=P1RAIQ4WdxL_ydzP",
				},
				{
					title: "I'm With You - Matthew Mole",
					link: "https://music.youtube.com/watch?v=mjX1Ywh0p-E&si=2u4fnZHto1HzVI5Z",
				},
				{
					title: "Good Grief - Bastille",
					link: "https://music.youtube.com/watch?v=LDY4Bf8Zwn8&si=deEik0xGNb1S3WIQ",
				},
			],
		},
	},
	// {
	// 	title: "Thailand 2",
	// 	year: 2024,
	// 	hostedLink: "thailand2",
	// 	link: "thailand-2",
	// 	restricted: false,
	// 	instagramLinks: [
	// 		"https://www.instagram.com/p/CyasF5_rtLn/?hl=en",
	// 		"https://www.instagram.com/p/C1eWSFRL36K/?hl=en",
	// 		"https://www.instagram.com/p/C4U0p9jr5WA/?hl=en",
	// 		"https://www.instagram.com/p/C4s0esMJkUU/?hl=en",
	// 		"https://www.instagram.com/p/C5ESnw0S7F4/?hl=en",
	// 		"https://www.instagram.com/p/C5oEtdJp60R/?hl=en",
	// 		"https://www.instagram.com/p/C5qQMkhJXJY/?hl=en",
	// 		"https://www.instagram.com/p/C52q31MJEuK/?hl=en",
	// 		"https://www.instagram.com/p/C55IykNJlLO/?hl=en",
	// 		"https://www.instagram.com/p/C5_B99MJq5h/?hl=en",
	// 		"https://www.instagram.com/p/C6BpSSMJ7zT/?hl=en",
	// 		"https://www.instagram.com/p/C6BwrTnJNvM/?hl=en",
	// 		"https://www.instagram.com/p/C6ioC21LNqh/?hl=en",
	// 		"https://www.instagram.com/p/C6rcbsuyXP_/?hl=en",
	// 		"https://www.instagram.com/p/C6x3PapLWaB/?hl=en",
	// 		"https://www.instagram.com/p/C68-j4Up45C/?hl=en",
	// 		"https://www.instagram.com/p/C7AwcDPpTKa/?hl=en",
	// 		"https://www.instagram.com/p/C7I7WJzLR-H/?hl=en",
	// 		"https://www.instagram.com/p/C7TXuGQL4iI/?hl=en",
	// 		"https://www.instagram.com/p/C7hO0S9Jaca/?hl=en",
	// 		"https://www.instagram.com/p/C7j1aAcvwrb/?hl=en",
	// 		"https://www.instagram.com/p/C7n9BygJuDh/?hl=en",
	// 		"https://www.instagram.com/p/C8r1bCISBje/?hl=en",
	// 		"https://www.instagram.com/p/C9w2JPtzGcm/?hl=en",
	// 		"https://www.instagram.com/p/C-mRiXHzW4i/?hl=en",
	// 	],
	// },
	{
		title: "Pakistan",
		year: 2025,
		hostedLink: "pakistan",
		link: "pakistan",
		instagramLinks: [
			"https://www.instagram.com/p/DGM3M_mpdbC/?hl=en&img_index=1",
			"https://www.instagram.com/p/DGV1iWvopgL/?hl=en&img_index=1",
			"https://www.instagram.com/p/DGzkwBRJ0Fh/?hl=en&img_index=1",
			"https://www.instagram.com/p/DG44LWuJOgv/?hl=en&img_index=1",
		],
		restricted: false,
		backupLink:
			"https://drive.google.com/drive/folders/14vEAX2n-dlTqZ59ywDNLbIte6FeClEV4?usp=sharing",
		extras: {
			countries: ["pakistan"],
			trailer: "pakistantrailer",
			scorecard: {
				beauty: [3],
				affordability: [10],
				food: [5],
				hospitality: [10],
				safety: [4],
				accessibility: [4],
				video: [8],
			},
			finalScore: 7,
			summary: [
				"Pakistan is a culturally rich, predominantly Muslim nation with a complex history, currently navigating extremely challenging economic and political headwinds, but somehow manages to break the scale on what hospitality can be",
				"We visited the 4 major cities to discover an alarming amount of diversity from the Punjabs to the Pashtuns with endless languages in-between",
				"This country is not for new travellers but if you're seeking one of the most rewarding and enriching experiences, you'll probably never find a better option",
			],
			challenges: [
				"Due to security concerns it's common local police forces will try to 'escort' you around. In reality they will nag you to just go back to your hotel so they can play on their phones. It's free but a highly annoying 'service' that you cant opt out of once they start following you",
				"Getting cash is hard, the only bank tat reliably worke dfor me was Standard Charter",
				"Islamabad airport has no SIM services and a virtually non existant ATM, so bring cash if arriving here",
			],
			dos: [
				"Accept people offering you food and services, if you engage them long enough you'll usually find a way to repay them, its okay to say yes",
				"Make sure to visit in the warmer months, Skardu and Gilget close in the winter and they're arguably the best places to be as a tourist",
			],
			donts: [
				"Cross into Afghanistan at the Torkham border. it frequently closes without notice and is hell to navigate, taking hours",
			],
			advice: {
				travelLength: "2 - 6 weeks",
				currency: "Pakistani Rupee Rs",
				season: "May - October",
				dailyBudget: "$10 USD",
			},
			travelAdvisory: {
				link: "https://www.smartraveller.gov.au/destinations/asia/pakistan",
				advice: Advisory.Level3,
			},
			highlights: [
				{
					title: "Car Crash (7m 13s)",
					timecode: 433,
				},
				{
					title: "Wagah Border Ceremony (14m 49s)",
					timecode: 889,
				},
			],
			music: [
				{
					title: "Growing Pains - Layup",
					link: "https://music.youtube.com/watch?v=VTLGsOvWrrM&si=nWpTSrvTMPPTpPsI",
				},
				{
					title: "Weight Of Living, Pt. 1 - Bastille",
					link: "https://music.youtube.com/watch?v=kU8UxfpQvO0&si=XIBNbOi_bNIKl1q-",
				},
				{
					title: "An End Once And For All - ME3",
					link: "https://music.youtube.com/watch?v=fcuzMLMZNYc&si=cQ9qBDByK4O9BEqA",
				},
				{
					title: "Fireflies - Owl City",
					link: "https://music.youtube.com/watch?v=KWLGyeg74es&si=y4XWZb9AEodHQGxB",
				},
				{
					title: "Fire and the Flood - Vance Joy",
					link: "https://music.youtube.com/watch?v=IPfQpRV4KIk&si=hK5CidFvOKps58uX",
				},
				{
					title: "Northern Attitude - Noah Kahan & Hozier",
					link: "https://music.youtube.com/watch?v=0dw-rBTQ_P8&si=0djItroTBHIOM75-",
				},
			],
			extraLinks: [
				{
					title: "Car Crash Posted By A Local",
					link: "https://www.facebook.com/share/r/1BeUrNrML8/",
				},
				{
					title: "Calebs Short - Crossing the Wagga Border",
					link: "https://www.youtube.com/shorts/x7EUNTHItsY",
				},
				{
					title: "Calebs Short - Rohtas Fort",
					link: "https://www.youtube.com/shorts/8GL_pRbgnsg",
				},
				{
					title: "Calebs Short - Islamabad",
					link: "https://www.youtube.com/shorts/8GL_pRbgnsg",
				},
			],

			tags: ["Caleb Eli Price"],
		},
	},
	{
		title: "Afghanistan",
		year: 2025,
		hostedLink: "afghanistan",
		link: "afghanistan",
		restricted: false,
		instagramLinks: [
			"https://www.instagram.com/p/DHBuxixB_pJ/?hl=en&img_index=1",
			"https://www.instagram.com/p/DHQBf6uprQO/?hl=en&img_index=1",
			"https://www.instagram.com/p/DHVYFMXpOR1/?hl=en&img_index=1",
			"https://www.instagram.com/p/DHf5eCJJYSs/?hl=en&img_index=1",
		],
		backupLink:
			"https://drive.google.com/drive/folders/13u7UC_NTr1cXDKtclfhxyl-nokepTDjW?usp=sharing",
		extras: {
			countries: ["afghanistan"],
			trailer: "afghanistantrailer",
			scorecard: {
				beauty: [4],
				affordability: [8],
				food: [2],
				hospitality: [9],
				safety: [5],
				accessibility: [4],
				video: [7],
			},
			finalScore: 6,
			summary: [
				"Afghanistan is a country caught between worlds. On the one hand, you have the overbearing Taliban with strict sharia law and frankly nonsense rulings.",
				"On the other, you have the wonderful people, each have a story that will squeeze your heart but also a personality that will put a smile on your face.",
				"Beyond the government, Afghanistan has an incredible amount of history and unique traditions to experience, it's somewhere every seasoned traveller should attempt to visit.",
			],
			challenges: [
				"The Visa for Afghanistan is a huge headache with ever changes requirements. The easiest way currently is at the Peshawar consulate or on arrival at the Tajik border.",
				"It's illegal for foreigners to take a bus or enter a locals home, the loophole is to hitchike where you can still get close with locals and also where you need to be.",
				"Due to sanctions you cannot use any ATM. Bring crisp USD with you, it can be exchanged in almost every town centre easily.",
			],
			dos: [
				"Wear local clothing. You can easily buy what you need on arrival in Kabul.",
				"If you're a woman, cover your hair at all times.",
			],
			donts: [
				"Bring a drone, they are exteremely illegal to even have on you.",
				"If you're a man, take photos of or approach women, especially in the conservative centres like Mazar-i-Sharif and Kandahar. If they approach you it's fine.",
			],
			advice: {
				travelLength: "2 - 3 weeks",
				currency: "Afghan Afghani AFN",
				season: "March - November",
				dailyBudget: "$20 USD",
			},
			travelAdvisory: {
				link: "https://www.smartraveller.gov.au/destinations/asia/afghanistan",
				advice: Advisory.Level4,
			},
			highlights: [
				{
					title: "Taliban Interview (4m 42s)",
					timecode: 282,
				},
				{
					title: "Trying Mascara (8m 54s)",
					timecode: 534,
				},
				{
					title: "Failing Ramadan (12m 9s)",
					timecode: 729,
				},
			],
			music: [
				{
					title: "Back In Black - AC/DC",
					link: "https://music.youtube.com/watch?v=9vWNauaZAgg&si=PrM-rN2ClGrZyjGH",
				},
				{
					title: "Kiss The Sky - Maren Morris",
					link: "https://music.youtube.com/watch?v=yDeG2SI5R_8&si=YUSja0aFx8vbjGgg",
				},
				{
					title: "Sweet Disaster - DREAMERS",
					link: "https://music.youtube.com/watch?v=2k5W-j9eHcY&si=3r7wRLmAa2WuVtUZ",
				},
				{
					title: "That's So True - Gracie Abrams",
					link: "https://music.youtube.com/watch?v=W_YOJWZIjxo&si=8PtrcNBQiYgZqgVf",
				},
			],
			extraLinks: [
				{
					title: "Paris Hailwood - Afghanistan Beyond the Headlines",
					link: "https://www.instagram.com/reel/DHCCI8-tDIo/?hl=en",
				},
			],
			itineraries: [
				{
					title: "Complete Afghanistan",
					length: "3 weeks",
					description:
						"Complete trip that goes to all major cities and wonders, recomend utilizing internal flight as commutes are often 8-12 hours a-piece",
					mapImage: "afghanhighlights",
					steps: [
						{
							stepTitle: "Kabul",
							days: "Day 1 - 2",
							details: [
								{
									sentence:
										"Fly into Kabul, lightly explore the city while purchasing local clothes & cash",
								},
								{
									sentence:
										"Book your Herat > Kabul (And optional Mazar-i-Sharif > Kabul and/or Herat > Kabul) internal flight(s) at a local agency",
									isRecommendation: true,
								},
							],
						},
						{
							stepTitle: "Bamyan",
							days: "Day 3 - 7",
							details: [
								{
									sentence: "Long commute to Bamyan (6+ hours)",
								},
								{
									sentence:
										"You should be able to get a bus ticket at the Kabul depo in advance",
									isInfo: true,
								},
								{
									sentence:
										"Explore Bamyans Buddhas, screaming city and Band-e-Amir Lake",
									image: "bamyanbuddhas",
								},
							],
						},
						{
							stepTitle: "Mazar-i-Sharif",
							days: "Day 8 - 10",
							details: [
								{
									sentence: "Long commute to Mazar-i-Sharif (9+ hours)",
								},
								{
									sentence: "Explore Mazar and Balkh",
									image: "balkh",
								},
							],
						},
						{
							stepTitle: "Quazni",
							days: "Day 11 - 12",
							details: [
								{
									sentence: "Flight or 12+ hour drive back to Kabul",
								},
								{
									sentence: "Commute to and explore Quazni",
								},
							],
						},
						{
							stepTitle: "Kandahar",
							days: "Day 13 - 14",
							details: [
								{
									sentence:
										"Commute to and explore Kandahar, the seat of power for the Taliban",
								},
							],
						},
						{
							stepTitle: "Herat",
							days: "Day 14 - 16",
							details: [
								{
									sentence: "Commute to and explore Herat",
									image: "herat",
								},
							],
						},
						{
							stepTitle: "Optional: Minaret of Jam",
							days: "Day 17",
							details: [
								{
									sentence:
										"Very long commute to the Minaret of Jam, a famous lone menaret tower in the middle of a hidden oasis",
								},
								{
									sentence:
										"It's located far from any settlements, halfway back to Kabul",
									image: "jam",
								},
							],
						},
						{
							stepTitle: "Kabul",
							days: "Day 17 - 18",
							details: [
								{
									sentence:
										"Final return to Kabul via flight or 20+ hour drive from Minaret",
								},
								{
									sentence: "Spend an additional day in Kabul and fly out",
									image: "kabul",
								},
							],
						},
					],
				},
				{
					title: "Old Hippie Trail",
					length: "7 days",
					description:
						"Pass through Afghanistan on an epic journey covering the must see along the old 1970's hippie trail",
					mapImage: "afghanhippie",
					steps: [
						{
							stepTitle: "Uzbekistan Border",
							days: "Day 1",
							details: [
								{
									sentence: "Cross the Uzbek border",
								},
								{
									sentence:
										"Get your Afghan visa on arrival and for cheaper than anywhere else",
									isInfo: true,
								},
							],
						},
						{
							stepTitle: "Mazar-i-Sharif",
							days: "Day 2",
							details: [
								{
									sentence: "Explore Mazar and Balkh",
									image: "balkh",
								},
							],
						},
						{
							stepTitle: "Bamyan",
							days: "Day 3 - 4",
							details: [
								{ sentence: "Long commute to Bamyan (9+ hours)" },
								{
									sentence:
										"Explore Bamyans Buddhas, screaming city and Band-e-Amir Lake",
									image: "bamyanbuddhas",
								},
							],
						},
						{
							stepTitle: "Kabul",
							days: "Day 5",
							details: [
								{
									sentence: "Explore Kabul city",
									image: "kabul",
								},
							],
						},
						{
							stepTitle: "Jalalabad",
							days: "Day 6",
							details: [
								{
									sentence: "Short commute to and explore Jalalabad",
								},
							],
						},
						{
							stepTitle: "Pakistan Border",
							days: "Day 7",
							details: [
								{
									sentence:
										"Commute via the famous Khyber Pass and cross at the Torkham Border",
								},
								{
									sentence:
										"Arrive extremely early for one of the most conjested small and dangerous border crossing of your life",
									isWarning: true,
								},
							],
						},
					],
				},
			],
			tags: ["Paris Hailwood"],
		},
	},
	{
		title: "Myanmar",
		year: 2025,
		hostedLink: "myanmar",
		link: "myanmar",
		restricted: false,
		instagramLinks: [
			"https://www.instagram.com/p/DIn7QDapHiw/?hl=en&img_index=1",
			"https://www.instagram.com/p/DIx6-MlpXIM/?hl=en&img_index=1",
			"https://www.instagram.com/p/DI2seBsJ4fU/?hl=en&img_index=1",
		],
		backupLink:
			"https://drive.google.com/drive/folders/1jS1RladwBgOPzbq58GO8oHMkTeNdjtUY?usp=sharing",
		extras: {
			countries: ["myanmar"],
			trailer: "myanmartrailer",
			scorecard: {
				beauty: [4],
				affordability: [8],
				food: [2],
				hospitality: [6],
				safety: [5],
				accessibility: [2],
				video: [8],
			},
			finalScore: 8,
			summary: [
				"Myanmar, a land of ancient Buddhist traditions and breathtaking landscapes, finds itself gripped by a tragic military junta that has brutally suppressed democratic aspirations and plunged the nation into turmoil.",
				"Yet, amidst this darkness, the resilient spirit of the Burmese people shines through, their warmth and cultural richness a stark contrast to the oppressive regime.",
				"For the intrepid traveler, Myanmar still offers glimpses of remarkable temples and vibrant cultures, though a visit comes with a heavy awareness of the ongoing struggle for freedom.",
			],
			challenges: [
				"Getting around is quite painful as only a few select busses will allow a small amount of foreigners aboard, getting tickets last minute is a gamble. Trains completely ban foreigners.",
				"Double the time estimates for getting places.",
			],
			dos: [
				"Bring the most unbelievably crisp $100usd to exchange of you're life, even a fold or crease invalidates it here.",
				"Visit during Thingyan, Myanmars version of Songkran.",
			],
			donts: [
				"Rely on local ATMs, they regularly run out of cash or give a terrible conversion rate.",
			],
			advice: {
				travelLength: "2 - 3 weeks",
				currency: "Myanmar Kyat MMK",
				season: "November - April",
				dailyBudget: "$20 USD",
			},
			travelAdvisory: {
				link: "https://www.smartraveller.gov.au/destinations/asia/myanmar",
				advice: Advisory.Level4,
			},
			highlights: [
				{
					title: "Thingyan Water Festival (3m 38s)",
					timecode: 218,
				},
				{
					title: "Kalaw Earthquake (7m 11s)",
					timecode: 431,
				},
			],
			itineraries: [
				{
					title: "Junta-Only Highlights",
					length: "14 days",
					description:
						"Simple itinerary focusing on 'easy to access' popular regions of Myanmar far from any frontlines and accessible solo",
					mapImage: "myanmarjuntaonly",
					steps: [
						{
							stepTitle: "Yangon",
							days: "Day 1 - 3",
							details: [
								{
									sentence: "Fly into Yangon, explore the city",
								},
								{
									sentence:
										"Must see: Shwedagon Pagoda & 19th Street for Nightlife",
									image: "yangonpagoda",
								},
							],
						},
						{
							stepTitle: "Commute Day",
							days: "Day 4",
							details: [
								{
									sentence: "Long commute to Kalaw (10+ hours)",
								},
								{
									sentence:
										"You can try to book a bus locally but they often have strict foreigner limits, at worst you can hire a local driver to drive you",
									isInfo: true,
								},
								{
									sentence:
										"Due to checkpoints and damage from the war, double your time estimate for this route",
									isWarning: true,
								},
								{
									sentence:
										"If you'd like to visit Naypidaw, ensure you try to arrive around 12 noon as they have special security checks and curfews in place",
									isRecommendation: true,
								},
							],
						},
						{
							stepTitle: "Kalaw & Inle Lake",
							days: "Day 5 - 8",
							details: [
								{
									sentence: "Checkout Kalaw and surrounding areas",
								},
								{
									sentence:
										"Try a hike and stay in local villages, my recomendation for a local guide:",
									link: "https://www.instagram.com/eversmiletrekking/?hl=en",
								},
							],
						},
						{
							stepTitle: "Bagan",
							days: "Day 9 - 12",
							details: [
								{
									sentence: "Explore Bagan",
									image: "bagan",
								},
							],
						},
						{
							stepTitle: "Mandalay",
							days: "Day 13 - 14",
							details: [
								{
									sentence:
										"Head back to Mandalay and flyout from their international airport",
								},
							],
						},
					],
				},
			],
			music: [
				{
					title: "Wake Me Up - Avicii",
					link: "https://music.youtube.com/watch?v=2NiyrtYegso&si=feOo5YwVkB6tHNXv",
				},
				{
					title: "Hope - Tom Rosenthal",
					link: "https://music.youtube.com/watch?v=hNMbx6bcSp0&si=OTjLJb4WFKNL3GnD",
				},
				{
					title: "Old Town Road - Lil Nas X",
					link: "https://music.youtube.com/watch?v=9YpvNgCSaCU&si=PYNKMk0-wQiY_BTg",
				},
			],
			extraLinks: [
				{
					title: "Caleb Price - Only Tourists in Myanmar",
					link: "https://www.youtube.com/shorts/du1PMeH3At8",
				},
				{
					title: "Caleb Price - Shan State",
					link: "https://www.youtube.com/shorts/ct8C4JyNJZs",
				},
			],
			tags: ["Caleb Eli Price", "Phillip Sgardelis"],
		},
	},

	{
		title: "Mongolia",
		year: 2025,
		hostedLink: "mongolia",
		link: "mongolia",
		restricted: false,
		backupLink:
			"https://drive.google.com/drive/folders/1hNaxeVixcPGEcBaKT2fJZqMnaqm9lwb-?usp=sharing",
		instagramLinks: [
			"https://www.instagram.com/p/DNbKfiah_sX/?hl=en&img_index=1",
			"https://www.instagram.com/p/DNjBVcvzM6-/?hl=en&img_index=1",
		],
		extras: {
			countries: ["mongolia"],
			trailer: "mongoliatrailer",
			scorecard: {
				beauty: [8],
				affordability: [3],
				food: [1],
				hospitality: [4],
				safety: [4],
				accessibility: [2],
				video: [8],
			},
			finalScore: 4,
			summary: [
				"Mongolia is a vast, sparsely populated country known for its nomadic culture and endless steppes.",
				"We visited during Naadam festival, a traditional celebration featuring the three manly sports of horse racing, wrestling, and archery.",
				"Surviving with no modern amenities and a fun Mongolian diet requires an incredible amount of grit but wow is this place worth it for the view.",
			],
			challenges: ["Roads and English do not really exist"],
			dos: [
				"Prepare various entertainments for the many long drives, you will spend most of your days driving",
				"Try to be a part of the Naadam festival with it's perfect weather and bright outfits",
			],
			donts: [
				"Buy Naadam tickets in advance, they're only required for the stadium and it's not exactly hard to get in without them",
				"Underestimate the wild climate, it'll be scorching hot in the day and freezing at night",
				"Be vegan",
			],
			advice: {
				travelLength: "2 weeks",
				currency: "Mongolian Tugrik MNT",
				season: "June - August",
				dailyBudget: "$100-200usd",
			},
			travelAdvisory: {
				link: "https://www.smartraveller.gov.au/destinations/asia/mongolia",
				advice: Advisory.Level1,
			},
			music: [
				{
					title: "Minii Mongol Naadam",
					link: "https://music.youtube.com/watch?v=Ai3AgZe7Zno&si=8ozF8yIrXCbX8TFT",
				},
				{
					title: "Chinggis Kahn - Khusugtun",
					link: "https://music.youtube.com/watch?v=tcd59zMIadk&si=1qSvMi0aWWhR7Zlh",
				},
				{
					title: "Lil Boo Thing - Paul Russel",
					link: "https://music.youtube.com/watch?v=ER8z-iLK91Y&si=iNA0qgaEc08zAUpG",
				},
				{
					title: "Shoot to Thrill - AC/DC",
					link: "https://music.youtube.com/watch?v=wLoWd2KyUro&si=_MxRpnc0o_G8UaQO",
				},
				{
					title: "Halo",
					link: "https://music.youtube.com/watch?v=DOZLSho2o-M&si=8jP_Ic8szsfxfQZe",
				},
				{
					title: "MW3 End Credits - Bryan Tyler",
					link: "https://music.youtube.com/watch?v=qeZtmPQZluU&si=mnb2eOP9_0XBInHP",
				},
			],
			extraVideos: [
				{
					title: "Mongolia Video with French Subtitles",
					hostedLink: "frenchmongolia",
				},
			],
			highlights: [
				{
					title: "Climbing a 100m Sand Dune (9m 57s)",
					timecode: 597,
				},
				{
					title: "Sandstorm (12m 41s)",
					timecode: 761,
				},
				{
					title: "Gobi Desert Breakdown (16m 43s)",
					timecode: 1003,
				},
			],
			tags: ["Adam Melander", "Claire Dubouilh Marino"],
		},
	},
	{
		title: "China 2",
		year: 2025,
		hostedLink: "china2",
		link: "china-2",
		restricted: false,
		instagramLinks: [
			"https://www.instagram.com/p/DOGUooLiXaC/?hl=en&img_index=1",
			"https://www.instagram.com/p/DOVwtzhCZHZ/?hl=en&img_index=1",
		],
		backupLink:
			"https://drive.google.com/drive/folders/1go-otWd7v6xXLtbt0UFKk5_ZtEZRgjEH?usp=sharing",
		extras: {
			countries: ["china"],
			trailer: "china2trailer",
			scorecard: {
				beauty: [7],
				affordability: [9],
				food: [1],
				hospitality: [2],
				safety: [10],
				accessibility: [6],
				video: [7],
			},
			finalScore: 6,
			summary: [
				"From the Great Wall snaking across wind-scoured ridges to the Terracotta Warriors staring through two millennia, China pairs grand history with serene peaks, delicious tea breaks, and smooth satisfying high speed rail.",
				"But you’ll also find shoulder-to-shoulder crowds and “ancient” streets polished into theme parks, where the the experience is curated and even the night market feels algorithmically optimized.",
				"The whole country runs like it’s already the year 3025. Brilliantly frictionless or mildly dystopian, depending on your mood.",
			],
			challenges: [
				"English is very rare with middle-aged and above, google translate is a bit of a joke so get ready to play charades",
				"The QR codes are no joke, setup the apps like WeChat or AliPay early and enjoy the sometimes streamlined but frustrating experience of doing everything through a broken app",
			],
			dos: [
				"High speed trains are a delightful and fairly affordable way to travel around",
			],
			donts: [
				"Have any non-conventional opinions",
				"Be careful helping anyone as they could be police testing you. Citizens will report 'non patriotic' events like it's 1984",
			],
			advice: {
				travelLength: "2 - 3 Months",
				currency: "Chinese Yuan RMB",
				season: "April - September",
				dailyBudget: "$25usd",
			},
			travelAdvisory: {
				link: "https://www.smartraveller.gov.au/destinations/asia/china",
				advice: Advisory.Level2,
			},
			music: [
				{
					title: "Kung Fu Fighting - Carl Douglas",
					link: "https://music.youtube.com/watch?v=it3E6vtExSE&si=1A_JUz1C1DxHmhtk",
				},
				{
					title: "Lemon Tree - Fools Garden",
					link: "https://music.youtube.com/watch?v=enPg09IpUjU&si=o71kwzw_1wm-WLDb",
				},
				{
					title: "Year 3000 - Jonas Brothers",
					link: "https://music.youtube.com/watch?v=ASTzu6oKKCk&si=6qlCP3-k6gSYAtEO",
				},
				{
					title: "Rex Incognito - Atharva Mohite",
					link: "https://music.youtube.com/watch?v=58aRka616dE&si=KUBA6RLv4d-fwvRf",
				},
				{
					title: "You, Me & Steve - Garfunkel and Oates",
					link: "https://music.youtube.com/watch?v=7NcKGm3puTs&si=qO-ENaGn2rkvbhwi",
				},
				{
					title: "Red Sun in the Sky - Mao Ze Dong",
					link: "https://music.youtube.com/watch?v=xGxj2iHAtzE&si=6eh3BOSDrYDblpKK",
				},
				{
					title: "黑桃A (合唱版) - 王大毛",
					link: "https://music.youtube.com/watch?v=CPmNL9w6NL0&si=YIkC-m4f3xBrc-eX",
				},
			],
			extraVideos: [
				{
					title: "China 2 Video with French Subtitles",
					hostedLink: "china2french",
				},
				{
					title: "China - My First Country",
					hostedLink: "china",
				},
			],
			extraLinks: [
				{
					title: "China - My First Country",
					link: "https://www.franklin-v-moon.dev/travel/china",
				},
			],
			highlights: [
				{
					title: "Tianman Square (3m 12s)",
					timecode: 197,
				},
				{
					title: "Terracotta Warriors (15m 39s)",
					timecode: 939,
				},
				{
					title: "Rock, Paper Scissors (20m 59s)",
					timecode: 1259,
				},
			],
			tags: ["Adam Melander", "Claire Dubouilh Marino"],
		},
	},
	// {
	// 	title: "",
	// 	year: ,
	// 	hostedLink: "",
	// 	link: "",
	// 	restricted: false,
	// 	instagramLinks: [
	// 		"",
	//      "",
	// 		"",
	//      "",
	// 	],
	// 	reelLinks: [""],
	// 	backupLink: "",
	// 	newestVideo: true,
	// 	extras: {
	// 		countries: [ ""],
	//		trailer: "",
	// 		scorecard: {
	// 			affordability: [],
	// 			food: [],
	//			hospitality: [],
	// 			safety: [],
	// 			accessibility: [],
	// 			video: [],
	// 		},
	// 		finalScore: 7,
	// 		summary: [ "" ],
	// 		challenges: [ "" ],
	// 		dos: [ "" ],
	// 		donts: [ "" ],
	// 		advice: {
	// 			travelLength: "",
	// 			currency: "",
	// 			season: "",
	// 			dailyBudget: "",
	// 		},
	// 		travelAdvisory: {
	// 			link: "",
	// 			advice: Advisory.Level1,
	// 		},
	// 		music: [
	// 			{
	// 				title: "",
	// 				link: "",
	// 			},
	// 			{
	// 				title: "",
	// 				link: "",
	// 			},
	// 		],
	// 		extraLinks: [
	// 			{
	// 				title: "",
	// 				link: "",
	// 			},
	// 			{
	// 				title: "",
	// 				link: "",
	// 			},
	// 		],
	// 		extraVideos: [
	// 			{
	// 				title: "",
	// 				hostedLink: "",
	// 			},
	// 		],
	// highlights: [
	// 	{
	// 		title: " (0m 0s)",
	// 		timecode: 123,
	// 	},
	// 	{
	// 		title: " (0m 0s)",
	// 		timecode: 123,
	// 	},
	// ],
	// tags: [""],
	// 	},
	// },
];
