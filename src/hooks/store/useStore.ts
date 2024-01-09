// PLUGINS
import { useDispatch, useSelector } from "react-redux";
// TYPES
import type { AppDispatch, RootState } from "@/store";
import type { TypedUseSelectorHook } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
