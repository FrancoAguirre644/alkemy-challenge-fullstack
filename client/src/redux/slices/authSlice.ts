import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models";

interface InitialState {
  user?: User;
  access_token?: string;
}

const initialState: InitialState = {};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

/*

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, setCounter } =
  counterSlice.actions;

*/

// You must export the reducer as follows for it to be able to be read by the store.
export default authSlice.reducer;