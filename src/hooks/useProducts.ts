// PLUGINS
import useSWR from "swr";
// LIBRARIES
import { fetcher } from "@/lib";
// MODELS
import type { Product } from "@/models";

interface HookParams {
	sort?: "asc" | "desc";
	limit?: number;
}

export default function useProducts(params: HookParams = {}) {
	const usp = new URLSearchParams(params as Record<string, string>);
	const qs = usp.toString();
	const key = qs ? `/products?${qs}` : "/products";

	const { data, error, isLoading } = useSWR<Product[]>(key, fetcher);

	return { data, error, isLoading };
}
