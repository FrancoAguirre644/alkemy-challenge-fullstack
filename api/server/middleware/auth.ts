import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Users from '../models/userModel';
import { IDecodedToken, IReqAuth } from '../utils/types';

const auth = async (req: IReqAuth, res: Response, next: NextFunction) => {
    try {

        const token = req.header("Authorization");
        if (!token) return res.status(400).json({ msg: "Invalid Authentication." });

        const decoded = <IDecodedToken>jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
        if (!decoded) return res.status(400).json({ msg: "Invalid Authentication." });

        const user = await Users.findOne({ where: { id: decoded.id } });
        if (!user) return res.status(400).json({ msg: "User does not exist." });

        req.user = user;

        next();
    } catch (error: any) {
        return res.status(500).json({ msg: error.message });
    }
}

export default auth;