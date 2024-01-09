export interface TransactionServiceParams {
	amount: number;
	cardNumber?: string;
	cardExpiry?: string;
	cardCvv?: string;
	recipient: string;
}

export async function transaction(payload: TransactionServiceParams) {
	return new Promise((resolve) => setTimeout(resolve, 1000)).then(async () => {
		const transactionInfo = {
			transactionId: Math.floor(Math.random() * 1000000000),
			recipient: payload.recipient,
			date: new Date().toLocaleDateString(),
			amount: payload?.amount as number,
			currency: "USD",
		};

		return transactionInfo;
	});
}
