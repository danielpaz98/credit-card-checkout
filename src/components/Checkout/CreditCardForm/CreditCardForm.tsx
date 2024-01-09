import { createContext, useEffect, useState } from "react";
// UTILS
import { cn } from "@/utils";
// TYPES
import type { Focused } from "react-credit-cards-2";
import type { CreditCardFormSchema } from "./schemas";

const getFormValues = () => {
	const initialState = { name: "", number: "", expiry: "", cvc: "" };
	const persistedState = window.localStorage.getItem("credit-card-form");

	if (persistedState) return JSON.parse(persistedState);

	return initialState;
};

const useValue = () => {
	const [state, setState] = useState<CreditCardFormSchema>(getFormValues);
	const [focused, setFocused] = useState<Focused>("");

	const updateState = (value: Partial<Record<keyof CreditCardFormSchema, string>>): void => {
		setState((curr) => ({ ...curr, ...value }));
	};

	useEffect(() => {
		window.localStorage.setItem("credit-card-form", JSON.stringify(state));
	}, [state]);

	return { state, focused, updateState, setFocused };
};

export const CreditCardFormContext = createContext({} as ReturnType<typeof useValue>);

type Props = React.ComponentProps<"form">;

export default function CreditCardForm({ className, children, ...restProps }: Props) {
	const classNames = cn("grid justify-center gap-3 text-white", className);
	const value = useValue();

	return (
		<CreditCardFormContext.Provider value={value}>
			<form autoComplete="off" className={classNames} {...restProps}>
				{children}
			</form>
		</CreditCardFormContext.Provider>
	);
}
