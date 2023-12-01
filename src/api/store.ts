import {AnyAction, configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {applicationApi} from "api/apiSlice";

export const store = configureStore({
    reducer: {
        [applicationApi.reducerPath]: applicationApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(applicationApi.middleware)
});

export type RootStateType = ReturnType<typeof store.getState>;
export type ThunkAppDispatchType = ThunkDispatch<RootStateType, any, AnyAction>;

export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>();
