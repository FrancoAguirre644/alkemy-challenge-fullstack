import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOperation } from "../../models";
import * as operationService from '../../services/operationService';


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
    async (operation: IOperation, { getState }) => {
        const data = await operationService.createOperation(operation, getState().auth.access_token!);
        return data.newOperation;
    }
)

export const deleteOperation = createAsyncThunk(
    "operations/deleteOperation",
    async (id: number, { getState }) => {
        await operationService.deleteOperation(id, getState().auth.access_token!);
        return id;
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
            .addCase(deleteOperation.fulfilled, (state: OperationState, { payload }) => {
                state.data = state.data?.filter(item => item.id !== payload);
                state.loading = false;
            })
            .addCase(createOperation.fulfilled, (state: OperationState, { payload }) => {
                state.data = [payload, ...state.data!];
                state.loading = false;
            })
    },
});

// You must export the reducer as follows for it to be able to be read by the store.
export default authSlice.reducer;
