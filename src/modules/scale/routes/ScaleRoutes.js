import { Router } from 'express';

import ScaleResource from '../resource/ScaleResource';

const scaleRouter = new Router();

scaleRouter.get('/api/scale', ScaleResource.findAll);
scaleRouter.get('/api/scale/:id', ScaleResource.findById);
scaleRouter.put('/api/scale/:id', ScaleResource.updateScale);
scaleRouter.delete('/api/scale/:id', ScaleResource.deleteScale);
scaleRouter.post('/api/scale/:groupId/:subgroupId?', ScaleResource.createScale);

export default scaleRouter;
