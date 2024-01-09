// COMPONENTS
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// ICONS
import { ReactComponent as InfoIcon } from "@/icons/info.svg";

interface Props {
	shipping?: number;
	total?: number;
}

export default function OrderSummary({ shipping = 0, total = 0 }: Props) {
	const shippingText = shipping === 0 ? "Free" : `$${shipping}`;

	return (
		<Card className="bg-zinc-950 border-zinc-800">
			<CardHeader className="px-4 py-2">
				<CardTitle className="text-lg text-white">Order Summary</CardTitle>
			</CardHeader>

			<CardContent className="grid grid-cols-2 gap-1 px-4 py-2 text-sm text-white">
				<span>Shipping</span>
				<span className="text-right">{shippingText}</span>

				<span className="flex items-center gap-1">
					Sales Tax <InfoIcon className="text-white" height={16} width={16} />
				</span>
				<span className="text-right">Calculated checkout</span>

				<span className="mt-5 text-xl font-bold">Total:</span>
				<span className="mt-5 text-xl font-bold text-right">${total}</span>
			</CardContent>
		</Card>
	);
}
