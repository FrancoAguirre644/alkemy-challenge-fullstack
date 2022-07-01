import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import db from './database/config';

import authRouter from './routes/authRouter';

const app: Express = express();

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes

app.use('/auth', authRouter);

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