import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Users, { IUser } from '../models/userModel';
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken";


export const login = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body;

        const user: IUser | null = await Users.findOne({ where: { email } });
        if (!user) return res.status(400).json({ msg: 'This account does not exists.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(500).json({ msg: 'Password is incorrect.' });

        const access_token = generateAccessToken({ id: user.id });

        const refresh_token = generateRefreshToken({ id: user.id });

        res.cookie('refreshtoken', refresh_token, {
            sameSite: 'none',
            secure: true,
            httpOnly: true,
            path: '/auth/refresh-token',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30days
        });

        return res.status(200).json({
            access_token,
            user: {
                fullname: user.fullname,
                email: user.email
            }
        });

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export const register = async (req: Request, res: Response) => {
    try {

        const { fullname, email, password } = req.body;

        const user: IUser | null = await Users.findOne({ where: { email } });
        if (user) return res.status(400).json({ msg: 'Email already exists.' });

        const passwordHash = await bcrypt.hash(password, 12);

        const newUser: IUser = await Users.create({ fullname, email, password: passwordHash });

        const access_token = generateAccessToken({ id: newUser.id });

        const refresh_token = generateRefreshToken({ id: newUser.id });

        res.cookie('refreshtoken', refresh_token, {
            sameSite: 'none',
            secure: true,
            httpOnly: true,
            path: '/auth/refresh-token',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30days
        });

        return res.status(200).json({
            access_token,
            user: {
                fullname: newUser.fullname,
                email: newUser.email
            }
        });

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export const refreshToken = async (req: Request, res: Response) => {
    try {

        const rf_token = req.cookies.refreshtoken;
        if (!rf_token) return res.status(400).json({ msg: "Please login now." });

        jwt.verify(rf_token, `${process.env.REFRESH_TOKEN_SECRET}`, async (err: any, result: any) => {

            if (err) return res.status(400).json({ msg: "Please login now." });

            const user = await Users.findByPk(result.id);

            if (!user) return res.status(400).json({ msg: "This does not exist." })

            const access_token = generateAccessToken({ id: result.id });

            return res.status(200).json({
                access_token,
                user: {
                    fullname: user.fullname,
                    email: user.email
                }
            });
        });

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

export const logout = async (req: Request, res: Response) => {
    try {

        res.clearCookie('refreshtoken', { path: '/auth/refresh-token' });
        return res.json({ msg: "Logged out!" });

    } catch (error: any) {
        return res.status(500).json({ error: error.message })
    }
}