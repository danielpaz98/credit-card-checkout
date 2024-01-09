// COMPONENTS
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
// ICONS
import { ReactComponent as SuccessIcon } from "@/icons/success.svg";

interface Props {
	amount?: number;
	recipient?: string;
	transactionId?: number;
	date?: string;
}

export default function TransactionResult({ amount = 0, recipient, transactionId, date }: Props) {
	return (
		<Card className="grid bg-zinc-950 border-zinc-800">
			<CardHeader className="flex items-center px-3 py-2 mx-auto space-y-0">
				<div className="grid w-16 h-16 bg-green-500 border-4 border-green-600 rounded-full place-items-center">
					<SuccessIcon className="text-white" height={32} width={32} />
				</div>

				{amount && <CardTitle className="!mt-2 text-3xl text-white">${amount}</CardTitle>}

				<CardDescription className="text-xl text-zinc-500">Payment sent successfully!</CardDescription>
			</CardHeader>

			<CardContent className="px-4 py-0 text-white">
				<div className="grid gap-3 p-3 rounded-xl bg-zinc-900">
					<div>
						<span className="text-zinc-500">Recipient</span>
						<p>{recipient}</p>
					</div>

					<div>
						<span className="text-zinc-500">Transaction ID</span>
						<p>{transactionId}</p>
					</div>

					<div>
						<span className="text-zinc-500">Date</span>
						<p>{date}</p>
					</div>
				</div>
			</CardContent>

			<CardFooter className="py-2">
				<p className="text-sm text-zinc-500">You will receive a confirmation email shortly.</p>
			</CardFooter>
		</Card>
	);
}
