import { actions } from "@/store/slice";
// HOOKS
import { useAppDispatch } from "@/hooks/store";
// TYPES
import type { Product, PaymentInfo } from "@/models";

export function useStoreActions() {
	const dispatch = useAppDispatch();

	const setSelectedProduct = (payload: Product) => {
		dispatch(actions.setSelectedProduct(payload));
	};

	const setPaymentInfo = (payload: PaymentInfo) => {
		dispatch(actions.setPaymentInfo(payload));
	};

	return { setSelectedProduct, setPaymentInfo };
}
