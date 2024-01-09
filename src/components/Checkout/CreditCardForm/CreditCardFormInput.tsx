import { forwardRef, useContext } from "react";
// PLUGINS
import { useFormContext } from "react-hook-form";
// UTILS
import { cn, formatCreditCardNumber, formatCVC, formatExpirationDate } from "@/utils";
// TYPES
import type { Focused } from "react-credit-cards-2";
// COMPONENTS
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
// CONTEXTS
import { CreditCardFormContext } from "./CreditCardForm";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	name: Focused;
}

const CreditCardFormInput = forwardRef<HTMLInputElement, Props>(
	({ className, label, name, disabled, onChange, onFocus, ...restProps }: Props, ref) => {
		const classNames = cn("grid items-center w-full max-w-sm gap-2", className);

		const {
			register,
			formState: { isSubmitting, errors },
		} = useFormContext();

		const { focused, state, updateState, setFocused } = useContext(CreditCardFormContext);

		const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const { target } = e;

			if (target.name === "number") {
				target.value = formatCreditCardNumber(target.value);
			} else if (target.name === "expiry") {
				target.value = formatExpirationDate(target.value);
			} else if (target.name === "cvc") {
				target.value = formatCVC(target.value);
			}

			onChange?.(e);
			updateState({ [target.name]: target.value });
		};

		const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
			const { target } = e;

			onFocus?.(e);
			setFocused(target.name as Focused);
		};

		const preventCopyPaste = (e: React.ClipboardEvent<HTMLInputElement>) => e.preventDefault();

		return (
			<div className={classNames}>
				<TooltipProvider>
					<Tooltip open={Boolean(errors?.[name])}>
						<TooltipTrigger asChild>
							<div className="relative">
								<Input
									className="block w-full px-[14px] py-[22px] text-sm rounded-lg appearance-none bg-zinc-950 border-zinc-800 ring-offset-blue-300 focus-visible:ring-offset-1 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									disabled={isSubmitting || disabled}
									id={name}
									name={name}
									{...restProps}
									ref={ref}
									placeholder=" "
									onFocus={handleInputFocus}
									{...(name && { ...register(name, { value: state[name], onChange: handleInputChange }) })}
									{...(focused === "number" && {
										onCopy: preventCopyPaste,
										onPaste: preventCopyPaste,
										onCut: preventCopyPaste,
									})}
								/>

								{label && (
									<Label
										className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-[.8] top-2 z-10 origin-[0] bg-zinc-950 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-[.8] peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
										htmlFor={name}
									>
										{label}
									</Label>
								)}
							</div>
						</TooltipTrigger>

						{focused === name && errors?.[name]?.message && (
							<TooltipContent align="start" className="bg-zinc-950 border-zinc-800" side="bottom">
								<p className="font-bold text-red-500">⚠ {errors?.[name]?.message as string}</p>
							</TooltipContent>
						)}
					</Tooltip>
				</TooltipProvider>
			</div>
		);
	},
);

CreditCardFormInput.displayName = "CreditCardFormInput";

export default CreditCardFormInput;
