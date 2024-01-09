// STORE HOOKS
import { useAppSelector } from "@/hooks/store";
// COMPONENTS
import { Stepper } from "@/components/ui/stepper";
import CreditCardForm from "../../CreditCardForm";
import OrderSummary from "../../OrderSummary";
import TransactionResult from "../../TransactionResult";
// ICONS
import { ReactComponent as PaymentIcon } from "@/icons/payment.svg";
import { ReactComponent as InfoIcon } from "@/icons/info.svg";
import { ReactComponent as SuccessIcon } from "@/icons/success.svg";

interface Props {
	step: number;
	onActiveStepChange?: (step: number) => void;
}

const StepContent = ({ step }: Pick<Props, "step">) => {
	const { selectedProduct, paymentInfo } = useAppSelector(({ store }) => store);

	switch (step) {
		case 0:
			return (
				<CreditCardForm>
					<CreditCardForm.Preview acceptedCards={["visa", "mastercard"]} locale={{ valid: "EXPIRES" }} />

					<CreditCardForm.Input label="Card holder:" name="name" placeholder="Name" />
					<CreditCardForm.Input label="Card number:" maxLength={19} name="number" placeholder="1234 1234 1234 1234" />
					<div className="flex max-w-sm gap-4">
						<CreditCardForm.Input label="Expiration:" name="expiry" placeholder="MM / YY" />
						<CreditCardForm.Input label="CVC:" name="cvc" placeholder="CVC" />
					</div>
				</CreditCardForm>
			);
		case 1:
			return <OrderSummary total={selectedProduct?.price} />;
		case 2:
			return (
				<TransactionResult
					amount={paymentInfo?.amount}
					date={paymentInfo?.date}
					recipient={paymentInfo?.recipient}
					transactionId={paymentInfo?.transactionId}
				/>
			);
		default:
			return <></>;
	}
};

export default function StepperForm({ step, onActiveStepChange }: Props) {
	return (
		<>
			<Stepper activeLineClassName="bg-slate-900" activeStep={step} lineClassName="bg-gray-700">
				<Stepper.Step
					activeClassName="bg-slate-900"
					className="bg-gray-700"
					completedClassName="bg-slate-900"
					onClick={() => onActiveStepChange?.(0)}
				>
					<PaymentIcon className="text-white" height={24} width={24} />
				</Stepper.Step>

				<Stepper.Step
					activeClassName="bg-slate-900"
					className="bg-gray-700"
					completedClassName="bg-slate-900"
					onClick={() => onActiveStepChange?.(1)}
				>
					<InfoIcon className="text-white" height={24} width={24} />
				</Stepper.Step>

				<Stepper.Step
					activeClassName="bg-slate-900"
					className="bg-gray-700"
					completedClassName="bg-green-600"
					onClick={() => onActiveStepChange?.(2)}
				>
					<SuccessIcon className="text-white" height={24} width={24} />
				</Stepper.Step>
			</Stepper>

			<StepContent step={step} />
		</>
	);
}
