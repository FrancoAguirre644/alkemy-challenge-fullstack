import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.get('/', (req: Request, res: Response) => {
    res.json({ msg: 'Hello World!' });
});

app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});