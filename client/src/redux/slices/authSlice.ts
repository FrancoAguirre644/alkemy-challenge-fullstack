import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserLogin, IUserRegister, User } from "../../models";
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

export const register = createAsyncThunk(
  "auth/register",
  async (payload: IUserRegister) => {
    const data = await authService.register(payload);
    localStorage.setItem('logged', 'true');

    return data;
  }
)

export const logout = createAsyncThunk(
  "auth/logout",
  async () => {
    localStorage.removeItem('logged');
    return;
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(login.fulfilled, (state: AuthState, { payload }) => {
        state.user = payload.user;
        state.access_token = payload.access_token;
      })
      .addCase(register.fulfilled, (state: AuthState, { payload }) => {
        state.user = payload.user;
        state.access_token = payload.access_token;
      })
      .addCase(logout.fulfilled, (state: AuthState) => {
        state.access_token = undefined;
        state.user = undefined;
      })
  },
});

// You must export the reducer as follows for it to be able to be read by the store.
export default authSlice.reducer;