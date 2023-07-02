import { Router } from 'express';

import PersonResource from '../resource/PersonResource';

const personRouter = new Router();

personRouter.get('/api/person', PersonResource.findAll);
personRouter.get('/api/person/:id', PersonResource.findById);
personRouter.post('/api/person', PersonResource.createPerson);
personRouter.put('/api/person/:id', PersonResource.updatePerson);
personRouter.delete('/api/person/:id', PersonResource.deletePerson);

export default personRouter;
