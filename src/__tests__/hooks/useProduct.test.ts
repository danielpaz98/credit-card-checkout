// HOOKS
import { useProducts } from "@/hooks";
import { renderHook, waitFor } from "@testing-library/react";

describe("useProducts", () => {
	it("should return the initial values for data, error and loading", async () => {
		const { result } = renderHook(() => useProducts());
		const { data, error, isLoading } = result.current;

		expect(data).toBe(undefined);
		expect(error).toBe(undefined);
		expect(isLoading).toBe(true);
	});
});

describe("the loading property", () => {
	it("should initially return true and then false", async () => {
		const { result } = renderHook(() => useProducts());
		const { isLoading } = result.current;

		// asserting that the initial value of loading is true
		// before the re-render
		expect(isLoading).toBe(true);

		await waitFor(() => {
			const { isLoading } = result.current;

			expect(isLoading).toBe(false);
		});
	});
});
