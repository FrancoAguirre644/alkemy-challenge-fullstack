import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import alertSlice from "./slices/alertSlice";
import operationSlice from "./slices/operationSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        alert: alertSlice,
        operations: operationSlice
    },
});

export default store;

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

