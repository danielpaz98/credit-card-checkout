import _CreditCardForm from "./CreditCardForm";
import CreditCardFormPreview from "./CreditCardFormPreview";
import CreditCardFormInput from "./CreditCardFormInput";

const CreditCardForm = Object.assign(_CreditCardForm, {
	Preview: CreditCardFormPreview,
	Input: CreditCardFormInput,
});

export * from "./CreditCardForm";

export default CreditCardForm;
