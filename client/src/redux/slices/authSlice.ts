import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUserLogin, IUserRegister, User } from "../../models";
import * as authService from '../../services/authService'
import { alert } from "./alertSlice";

interface AuthState {
  user?: User;
  access_token?: string;
}

const initialState: AuthState = {};

export const login = createAsyncThunk(
  "auth/login",
  async (payload: IUserLogin, ThunkAPI) => {
    try {

      const data = await authService.login(payload);
      localStorage.setItem('logged', 'true');

      ThunkAPI.dispatch(alert({ success: 'Login successfully.' }));

      return data;
    } catch (error: any) {
      ThunkAPI.dispatch(alert({ errors: error.response.data.msg }));
    }
  }
)

export const register = createAsyncThunk(
  "auth/register",
  async (payload: IUserRegister, ThunkAPI) => {
    try {
      const data = await authService.register(payload);
      localStorage.setItem('logged', 'true');

      ThunkAPI.dispatch(alert({ success: 'Register successfully.' }));

      return data;
    } catch (error: any) {
      ThunkAPI.dispatch(alert({ errors: error.response.data.msg }));
    }
  }
)

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, ThunkAPI) => {
    localStorage.removeItem('logged');
    ThunkAPI.dispatch(alert({ success: 'Logout successfully.' }));
    return {};
  }
)

export const refreshToken = createAsyncThunk(
  "auth/refresh-token",
  async () => {
    const loggedIn = localStorage.getItem("logged");

    if (loggedIn) {
      const res = await authService.refreshToken();
      return res;
    }

    return {};
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
      .addCase(refreshToken.fulfilled, (state: AuthState, { payload }) => {
        state.user = payload.user || undefined;
        state.access_token = payload.access_token || undefined;
      })
  },
});

// You must export the reducer as follows for it to be able to be read by the store.
export default authSlice.reducer;