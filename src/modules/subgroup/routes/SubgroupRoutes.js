import { Router } from 'express';

import SubgroupResource from '../resource/SubgroupResource';

const subgroupRouter = new Router();

subgroupRouter.put('/api/group/subgroup/:id', SubgroupResource.updateSubgroup);
subgroupRouter.delete('/api/group/subgroup/:id', SubgroupResource.deleteSubgroup);
subgroupRouter.get('/api/group/subgroup/:id', SubgroupResource.findById);
subgroupRouter.get('/api/group/:groupId/subgroup', SubgroupResource.findAll);
subgroupRouter.post('/api/group/:groupId/subgroup', SubgroupResource.createSubgroup);

export default subgroupRouter;
