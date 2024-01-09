import { useState } from "react";
// SERVICES
import { transaction as transactionService } from "@/services/transaction";
// TYPES
import type { TransactionServiceParams } from "@/services/transaction";
// STORE HOOKS
import { useStoreActions } from "@/hooks/store";

export default function useTransaction() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const { setPaymentInfo } = useStoreActions();

	const transaction = async (payload: TransactionServiceParams) => {
		try {
			setIsLoading(true);

			const data = await transactionService(payload);

			setPaymentInfo(data);
		} catch (err) {
			const error = err as Error;
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return { transaction, isLoading, error };
}
