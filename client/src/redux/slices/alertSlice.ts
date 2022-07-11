import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AlertState {
  loading?: boolean;
  success?: string;
  errors?: string;
}

const initialState: AlertState = {};

export const authSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    alert: (state, action: PayloadAction<AlertState>) => {
      state.errors = action.payload.errors || undefined;
      state.success = action.payload.success || undefined;
    },
  }
});

// Action creators are generated for each case reducer function
export const { alert } = authSlice.actions;

// You must export the reducer as follows for it to be able to be read by the store.
export default authSlice.reducer;