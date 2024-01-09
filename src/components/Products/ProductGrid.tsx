import { useState } from "react";
// TYPES
import type { Product } from "@/models";
// COMPONENTS
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import StepperModal from "@/components/Checkout/StepperModal";
// HOOKS
import { useStoreActions } from "@/hooks/store";

interface Props {
	products: Product[];
}

export default function ProductGrid({ products }: Props) {
	const [showModal, setShowModal] = useState(false);
	const { setSelectedProduct } = useStoreActions();

	return (
		<>
			<div className="grid justify-center mb-10 sm:justify-normal sm:grid-cols-2 md:grid-cols-3 gap-14 lg:grid-cols-4">
				{products?.map((product) => (
					<ProductCard key={product.id}>
						<ProductCard.Image alt={product.title} src={product.image} />

						<div className="grid mt-2 h-28">
							<ProductCard.Title className="line-clamp-2" data-testid="product-card-title">
								{product.title}
							</ProductCard.Title>

							<div className="flex items-center gap-2 font-bold">
								<ProductCard.Text className="text-xl">${product.price}</ProductCard.Text>
								<ProductCard.Text className="text-sm text-green-600">5% OFF</ProductCard.Text>
							</div>

							<Button
								className="mt-auto text-white bg-blue-600 hover:bg-blue-700"
								type="button"
								onClick={() => {
									setShowModal(true);
									setSelectedProduct(product);
								}}
							>
								Pay with credit card
							</Button>
						</div>
					</ProductCard>
				))}
			</div>

			<StepperModal open={showModal} onOpenChange={setShowModal} />
		</>
	);
}
