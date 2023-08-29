/* eslint-disable import/no-extraneous-dependencies */
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import esg from 'express-swagger-generator';

dotenv.config();

import httpStatus from './src/config/constants/httpStatus';
import connect from './src/config/db/mongoConfig';
import defaultOptions from './swagger.json';
import groupRouter from './src/modules/group/routes/GroupRoutes';
import personRouter from './src/modules/person/routes/PersonRoutes';
import scaleRouter from './src/modules/scale/routes/ScaleRoutes';
import subgroupRouter from './src/modules/subgroup/routes/SubgroupRoutes';
import worshipRouter from './src/modules/worship/routes/WorshipRoutes';

const app = express();
app.use(cors());

const options = Object.assign(defaultOptions, { basedir: __dirname });
const swagger = esg(app);
swagger(options);

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
app.use(personRouter);
app.use(worshipRouter);
app.use(groupRouter);
app.use(subgroupRouter);
app.use(scaleRouter);

export default app;
