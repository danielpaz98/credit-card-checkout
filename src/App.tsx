// HOOKS
import { useProducts } from "@/hooks";
// COMPONENTS
import { ProductGrid } from "@/components";

function App() {
	const { data: products } = useProducts({ limit: 10 });

	return (
		<main className="min-h-screen">
			<div className="px-10 sm:px-10">
				<h1 className="text-4xl antialiased font-semibold my-7">Shop</h1>
				<h3 className="mb-5 text-xl">All products</h3>

				{products && <ProductGrid products={products} />}
			</div>
		</main>
	);
}

export default App;
