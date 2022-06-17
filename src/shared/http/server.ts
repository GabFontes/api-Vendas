import 'reflect-metadata';
import express, { NextFunction, Request, response, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';

import routes from './routes';
import AppError from '@shared/errors/AppError';

// importa a função createConnection() fazendo-a procurar por todo o projeto o arquivo ormconfig.json e lê-lo
import '@shared/typeorm';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log(`Server Running on port 3333 🏆`);
});