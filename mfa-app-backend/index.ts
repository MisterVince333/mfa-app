import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import { userRouter } from './routes/user-router';
import { consoleRequest } from './middleware/middleware';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(consoleRequest)
app.use('/api/user', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});


