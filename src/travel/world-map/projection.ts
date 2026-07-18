import geometry from "../../generated/worldMapGeometry.json";

const shiftLonLat = (lon: number, lat: number): [number, number] => {
	const {
		lonMin,
		lonMax,
		latMin,
		latMax,
		targetLon,
		closerFactor,
		lowerDegrees,
	} = geometry.pacificShift;
	if (lon < lonMin || lon > lonMax || lat < latMin || lat > latMax) {
		return [lon, lat];
	}
	return [lon + closerFactor * (targetLon - lon), lat - lowerDegrees];
};

export const projectToMap = (
	longitude: number,
	latitude: number,
): [number, number] => {
	const [lon, lat] = shiftLonLat(longitude, latitude);
	const { scale, translateX, translateY } = geometry.projection;

	return [translateX + scale * lon, translateY - scale * lat];
};
