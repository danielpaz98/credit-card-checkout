import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// TYPES
import type { Product, PaymentInfo } from "@/models";

export interface State {
	selectedProduct: Product | null;
	paymentInfo: PaymentInfo | null;
}

const presistedPaymentInfo = window.localStorage.getItem("paymentInfo");

const initialState: State = {
	selectedProduct: null,
	paymentInfo: presistedPaymentInfo ? JSON.parse(presistedPaymentInfo) : null,
};

export const storeSlice = createSlice({
	name: "store",
	initialState,
	reducers: {
		setSelectedProduct: (state, action: PayloadAction<Product>) => {
			state.selectedProduct = action.payload;
		},
		setPaymentInfo: (state, action: PayloadAction<PaymentInfo>) => {
			state.paymentInfo = action.payload;
		},
	},
});

export default storeSlice.reducer;

export const actions = storeSlice.actions;
