import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();

import db from './database/config';
import './database/assocations';

import authRouter from './routes/authRouter';
import operationRouter from './routes/operationRouter';

const app: Express = express();

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors({
    origin: true,
    credentials: true, //access-control-allow-credentials:true
}));

// Routes

app.use('/auth', authRouter);
app.use('/operations', operationRouter);

// Database connection

(async () => {

    try {
        await db.authenticate();
        await db.sync({ alter: true });
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

})();

// Server listening

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running at https://localhost:${port}`));