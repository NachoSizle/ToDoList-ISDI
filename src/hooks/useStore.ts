import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { useSelector, useDispatch, type TypedUseSelectorHook } from "react-redux"

export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();