import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import db from './database/config';

const app: Express = express();
const port = process.env.PORT || 5000;

app.get('/', (req: Request, res: Response) => {
    res.json({ msg: 'Hello World!' });
});

(async () => {

    try {
        await db.authenticate();
        await db.sync({ alter: true });
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

})();

app.listen(port, () => console.log(`[server]: Server is running at https://localhost:${port}`));