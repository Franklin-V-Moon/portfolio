export enum Advisory {
	Level1 = "Exercise normal safety precautions",
	Level2 = "Exercise a high degree of caution",
	Level3 = "Reconsider your need to travel",
	Level4 = "Do not travel",
}

export enum SortBy {
	Searching = "Searching",
	Newest = "Newest",
	Oldest = "Oldest",
	Best = "Best",
	Worst = "Worst",
	Food = "Food",
	Danger = "Danger",
	Funniest = "Funniest",
}

export type TravelVideoMetaData = {
	title: string;
	year: number;
	hostedLink?: string;
	link: string;
	backupLink?: string;
	restricted: boolean;
	reelLinks?: string[];
	instagramLinks?: string[];
	newestVideo?: boolean;
	previouslyWatched?: boolean;
	extras?: Extras;
};

export type Extras = {
	countries?: string[];
	trailer?: string;
	deductCountryCount?: number;
	scorecard?: {
		beauty: number[];
		affordability: number[];
		food: number[];
		hospitality: number[];
		safety: number[];
		accessibility: number[];
		video: number[];
	};
	finalScore?: number;
	summary?: string[];
	challenges?: string[];
	dos?: string[];
	donts?: string[];
	advice?: {
		travelLength: string;
		currency: string;
		season: string;
		dailyBudget: string;
	};
	travelAdvisory?: {
		link: string;
		advice: Advisory;
	};
	highlights?: {
		title: string;
		timecode: number;
	}[];
	itineraries?: Itinerary;
	music?: {
		title: string;
		link: string;
	}[];
	extraLinks?: {
		title: string;
		link: string;
	}[];
	extraVideos?: { title: string; hostedLink: string }[];
	tags?: string[];
};

export type Itinerary = {
	title: string;
	length: string;
	description: string;
	mapImage: string;
	steps: {
		stepTitle: string;
		days: string;
		details: {
			sentence: string;
			image?: string;
			isWarning?: boolean;
			isRecommendation?: boolean;
			isInfo?: boolean;
			link?: string;
		}[];
	}[];
}[];
