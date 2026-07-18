import geometry from "../../generated/worldMapGeometry.json";

const A1 = 1.340264;
const A2 = -0.081106;
const A3 = 0.000893;
const A4 = 0.003796;
const M = Math.sqrt(3) / 2;
const RADIANS = Math.PI / 180;

export const projectToMap = (
	longitude: number,
	latitude: number,
): [number, number] => {
	const lambda = longitude * RADIANS;
	const phi = latitude * RADIANS;
	const theta = Math.asin(M * Math.sin(phi));
	const theta2 = theta * theta;
	const theta6 = theta2 * theta2 * theta2;
	const x =
		(lambda * Math.cos(theta)) /
		(M * (A1 + 3 * A2 * theta2 + theta6 * (7 * A3 + 9 * A4 * theta2)));
	const y = theta * (A1 + A2 * theta2 + theta6 * (A3 + A4 * theta2));
	const { scale, translateX, translateY } = geometry.projection;

	return [translateX + scale * x, translateY - scale * y];
};
