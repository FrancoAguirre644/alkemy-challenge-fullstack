import { Request } from "express";
import { IUser } from "../models/userModel";

export interface IDecodedToken {
    id?: string;
    iat: number;
    exp: number;
}

export interface IReqAuth extends Request {
    user?: IUser;
}