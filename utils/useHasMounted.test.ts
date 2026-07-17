import { renderHook } from "@testing-library/react";
import { useHasMounted } from "./useHasMounted";

describe("useHasMounted()", () => {
	it("returns true once rendered in a browser environment", () => {
		const { result } = renderHook(() => useHasMounted());

		expect(result.current).toBe(true);
	});
});
