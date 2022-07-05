import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserLogin, User } from "../../models";
import * as authService from '../../services/authService';

interface AuthState {
  user?: User;
  access_token?: string;
}

const initialState: AuthState = {};

export const login = createAsyncThunk(
  "auth/login",
  async (payload: IUserLogin) => {
    const data = await authService.login(payload);
    localStorage.setItem('logged', 'true');

    return data;
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(login.fulfilled, (state: AuthState, { payload }) => {
      state.user = payload.user;
      state.access_token = payload.access_token;
    })
  },
});

/*

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, setCounter } =
  counterSlice.actions;

*/

// You must export the reducer as follows for it to be able to be read by the store.
export default authSlice.reducer;