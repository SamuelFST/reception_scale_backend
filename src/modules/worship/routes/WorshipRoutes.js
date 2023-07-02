import { Router } from 'express';

import WorshipResource from '../resource/WorshipResource';

const worshipRouter = new Router();

worshipRouter.get('/api/worship', WorshipResource.findAll);
worshipRouter.get('/api/worship/:id', WorshipResource.findById);
worshipRouter.post('/api/worship', WorshipResource.createWorship);
worshipRouter.put('/api/worship/:id', WorshipResource.updateWorship);
worshipRouter.delete('/api/worship/:id', WorshipResource.deleteWorship);

export default worshipRouter;
