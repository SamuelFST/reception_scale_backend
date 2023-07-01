import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

import httpStatus from './src/config/constants/httpStatus';
import connect from './src/config/db/mongoConfig';

const app = express();
const { env } = process;
const CONTAINER_ENV = 'container';

if (env.NODE_ENV === CONTAINER_ENV) {
  setTimeout(() => {
    connect();
  }, 20000);
} else {
  connect();
}

app.get('/api/status', (req, res) => {
  return res.status(200).json({
    service: 'Reception-Scale-API',
    status: 'up',
    httpStatus: httpStatus.SUCCESS,
  });
});

app.use(express.json());

export default app;
