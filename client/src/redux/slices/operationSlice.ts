import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IOperation } from "../../models";
import * as operationService from '../../services/operationService';
import { alert } from "./alertSlice";

interface OperationState {
    data?: IOperation[];
    loading: boolean;
}

const initialState: OperationState = {
    data: [],
    loading: false
};

export const getOperations = createAsyncThunk(
    "operations/getOperations",
    async (token: string) => {
        const data = await operationService.getOperations(token);
        return data.operations;
    }
)

export const createOperation = createAsyncThunk(
    "operations/createOperation",
    async (operation: IOperation, { getState, dispatch }) => {
        try {
            const data = await operationService.createOperation(operation, getState().auth.access_token!);

            dispatch(alert({ success: data.msg }));

            return data.newOperation;
        } catch (error: any) {
            dispatch(alert({ errors: error.response.data.msg }));
        }
    }
)

export const updateOperation = createAsyncThunk(
    "operations/updateOperation",
    async (operation: IOperation, { getState, dispatch }) => {
        try {
            const data = await operationService.updateOperation(operation, getState().auth.access_token!);

            dispatch(alert({ success: data.msg }));

            return data.operationUpdated;
        } catch (error: any) {
            dispatch(alert({ errors: error.response.data.msg }));
        }
    }
)

export const deleteOperation = createAsyncThunk(
    "operations/deleteOperation",
    async (id: number, { getState, dispatch }) => {
        try {
            const data = await operationService.deleteOperation(id, getState().auth.access_token!);

            dispatch(alert({ success: data.msg }));

            return id;
        } catch (error: any) {
            dispatch(alert({ errors: error.response.data.msg }));
        }
    }
)

export const authSlice = createSlice({
    name: 'operations',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(getOperations.fulfilled, (state: OperationState, { payload }) => {
                state.data = payload;
                state.loading = false;
            })
            .addCase(getOperations.pending, (state: OperationState) => {
                state.loading = true;
            })
            .addCase(createOperation.fulfilled, (state: OperationState, { payload }) => {
                state.data = [payload, ...state.data!];
                state.loading = false;
            })
            .addCase(updateOperation.fulfilled, (state: OperationState, { payload }) => {
                console.log(payload)
                state.data = state.data?.map(item =>
                    item.id === payload.id ? payload : item
                );
                state.loading = false;
            })
            .addCase(deleteOperation.fulfilled, (state: OperationState, { payload }) => {
                state.data = state.data?.filter(item => item.id !== payload);
                state.loading = false;
            })
    },
});

// You must export the reducer as follows for it to be able to be read by the store.
export default authSlice.reducer;
