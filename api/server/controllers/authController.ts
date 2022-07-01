import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import Users, { IUser } from '../models/userModel';
import { generateAccessToken } from "../utils/generateToken";


export const login = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body;

        const user: IUser | null = await Users.findOne({ where: { email } });
        if (!user) return res.status(400).json({ msg: 'This account does not exists.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(500).json({ msg: 'Password is incorrect.' });

        const access_token = generateAccessToken({ id: user.id });

        return res.status(200).json({ access_token });

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

        return res.status(200).json({ access_token });

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};