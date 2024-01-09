import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const creditCardFormSchema = yup.object({
	name: yup.string().required("Field is required"),
	number: yup.string().required("Field is required").min(19, "Enter a valid credit card number"),
	expiry: yup.string().required("Field is required").min(5, "Enter a valid expiry date"),
	cvc: yup.string().required("Field is required").min(3, "Enter a valid cvc"),
});

export type CreditCardFormSchema = yup.InferType<typeof creditCardFormSchema>;

export default yupResolver(creditCardFormSchema);
