import axios from "axios";
import { IUserLogin, IUserRegister } from "../models";

export const login = async (user: IUserLogin) => {
    const res = await axios.post(`/auth/login`, user);
    return res.data;
}

export const register = async (user: IUserRegister) => {
    const res = await axios.post(`/auth/register`, user);
    return res.data;
}

export const refreshToken = async () => {
    const res = await axios.post(`/auth/refresh-token`);
    return res.data;
}

export const logout = async () => {
    const res = await axios.post(`/auth/logout`);
    return res.data;
}
