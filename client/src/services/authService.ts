import axios from "axios";
import { IUserLogin } from "../models";

export const login = async (user: IUserLogin) => {
    const res = await axios.post(`/auth/login`, user);
    return res.data;
}
