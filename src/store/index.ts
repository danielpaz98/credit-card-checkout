import { combineReducers, configureStore, type Middleware } from "@reduxjs/toolkit";
// SLICES
import storeSlice from "./slice";
// TYPES
import type { State } from "./slice";

const persistanceLocalStorageMiddleware: Middleware<State> = (store) => (next) => (action) => {
	next(action);

	const {
		store: { paymentInfo },
	} = store.getState();

	window.localStorage.setItem("paymentInfo", JSON.stringify(paymentInfo));
};

const rootReducer = combineReducers({ store: storeSlice });

export function store(preloadedState?: Partial<RootState>) {
	return configureStore({
		reducer: rootReducer,
		preloadedState,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistanceLocalStorageMiddleware),
	});
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore["dispatch"];
