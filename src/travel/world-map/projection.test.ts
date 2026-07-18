import geometry from "../../generated/worldMapGeometry.json";
import { projectToMap } from "./projection";

describe("projectToMap", () => {
	it.each(geometry.checkpoints)(
		"matches the d3-geo projection used at generation time for $lonLat",
		({ lonLat, xy }) => {
			const [x, y] = projectToMap(lonLat[0], lonLat[1]);

			expect(x).toBeCloseTo(xy[0], 2);
			expect(y).toBeCloseTo(xy[1], 2);
		},
	);

	it("projects all checkpoints inside the viewBox", () => {
		for (const { lonLat } of geometry.checkpoints) {
			const [x, y] = projectToMap(lonLat[0], lonLat[1]);

			expect(x).toBeGreaterThanOrEqual(0);
			expect(x).toBeLessThanOrEqual(geometry.viewBox.width);
			expect(y).toBeGreaterThanOrEqual(0);
			expect(y).toBeLessThanOrEqual(geometry.viewBox.height);
		}
	});
});
