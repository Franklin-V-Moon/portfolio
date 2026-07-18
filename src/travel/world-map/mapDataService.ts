import { travelVideoMetaData } from "../../datasources/TravelMetaData";
import { MapLocation } from "../types";

export type MapPin = MapLocation & {
	tripLink: string;
	tripTitle: string;
	year: number;
	trailer?: string;
};

export const allMapPins = (): MapPin[] =>
	travelVideoMetaData.flatMap((trip) =>
		(trip.extras?.mapLocations ?? []).map((location) => ({
			...location,
			tripLink: trip.link,
			tripTitle: trip.title,
			year: trip.year,
			trailer: trip.extras?.trailer,
		})),
	);
