export enum Proficiency {
	Learning = "Learning",
	Capable = "Capable",
	Proficient = "Proficient",
	HighlyProficient = "Highly Proficient",
}

export type MetaData = {
	title: string;
	knowledge: string;
	proficiency: Proficiency;
	description: string;
};

export interface ColumnData extends MetaData {
	data: MetaData[];
}
