import { useState } from "react";
// PLUGINS
import { FormProvider, useForm } from "react-hook-form";
// STORE HOOKS
import { useAppSelector } from "@/hooks/store";
// HOOKS
import { useTransaction } from "@/hooks";
// SCHEMAS
import creditCardFormSchema, { CreditCardFormSchema } from "../CreditCardForm/schemas";
// COMPONENTS
import StepperForm from "./Form";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
// ICONS
import { ReactComponent as LoaderIcon } from "@/icons/loader.svg";

interface Props {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export default function StepperModal({ open, onOpenChange }: Props) {
	const [activeStep, setActiveStep] = useState(0);
	const { selectedProduct } = useAppSelector(({ store }) => store);
	const { transaction, isLoading: transactionIsLoading } = useTransaction();

	const formContext = useForm({ mode: "onChange", resolver: creditCardFormSchema });

	const handleBack = () => setActiveStep((cur) => cur - 1);

	const handleOnOpenChange = (open: boolean) => {
		formContext.clearErrors();
		formContext.reset();
		onOpenChange?.(open);
		setActiveStep(0);
	};

	const handleSubmit = (data: CreditCardFormSchema) => {
		const currentActiveStep = activeStep + 1;

		if (currentActiveStep === 2) {
			const transactionPayload = {
				amount: selectedProduct?.price as number,
				cardNumber: data.number,
				cardExpiry: data.expiry,
				cardCvv: data.cvc,
				recipient: data.name,
			};

			transaction(transactionPayload).then(() => {
				window.localStorage.removeItem("credit-card-form");
				setActiveStep(currentActiveStep);
			});
		} else {
			setActiveStep(currentActiveStep);
		}
	};

	return (
		<Dialog open={open} onOpenChange={handleOnOpenChange}>
			<DialogContent
				className="max-w-[95%] max-h-[95%] p-4 w-[420px] h-[600px] bg-zinc-950 border-zinc-800 flex flex-col overflow-auto"
				onPointerDownOutside={(e) => e.preventDefault()}
			>
				<DialogHeader>
					<DialogTitle className="text-2xl">Payment information</DialogTitle>
					<DialogDescription>Add your payment information</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col justify-between flex-1">
					<FormProvider {...formContext}>
						<StepperForm step={activeStep} />
					</FormProvider>

					<DialogFooter className="flex flex-row mt-4">
						{activeStep !== 2 ? (
							<>
								<Button className="mr-auto" disabled={activeStep === 0} onClick={handleBack}>
									Back
								</Button>

								<Button disabled={transactionIsLoading} onClick={formContext.handleSubmit(handleSubmit)}>
									{transactionIsLoading ? <LoaderIcon height={32} width={32} /> : activeStep === 1 ? "Pay" : "Next"}
								</Button>
							</>
						) : (
							<Button className="ml-auto" onClick={() => handleOnOpenChange(false)}>
								Accept
							</Button>
						)}
					</DialogFooter>
				</div>
			</DialogContent>
		</Dialog>
	);
}
