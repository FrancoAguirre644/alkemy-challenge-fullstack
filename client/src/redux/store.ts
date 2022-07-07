import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import operationSlice from "./slices/operationSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        operations: operationSlice
    },
});

export default store;

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

