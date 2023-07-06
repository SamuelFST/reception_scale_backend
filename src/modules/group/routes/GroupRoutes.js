import { Router } from 'express';

import GroupResource from '../resource/GroupResource';

const groupRouter = new Router();

groupRouter.get('/api/group', GroupResource.findAll);
groupRouter.get('/api/group/:id', GroupResource.findById);
groupRouter.post('/api/group', GroupResource.createGroup);
groupRouter.put('/api/group/:id', GroupResource.updateGroup);
groupRouter.delete('/api/group/:id', GroupResource.deleteGroup);

export default groupRouter;
