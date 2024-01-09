import { useContext } from "react";
// PLUGINS
import Card, { type ReactCreditCardsProps } from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
// CONTEXTS
import { CreditCardFormContext } from "./CreditCardForm";

type Props = Pick<ReactCreditCardsProps, "locale" | "placeholders" | "preview" | "issuer" | "acceptedCards">;

export default function CreditCardFormPreview(props: Props) {
	const { state, focused } = useContext(CreditCardFormContext);

	return (
		<Card cvc={state.cvc} expiry={state.expiry} focused={focused} name={state.name} number={state.number} {...props} />
	);
}
