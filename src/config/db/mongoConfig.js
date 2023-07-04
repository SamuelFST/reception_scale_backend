import mongoose from 'mongoose';

import models from './models';
import secrets from '../constants/secrets';

export default function connect() {
  mongoose.connect(secrets.MONGO_URL, {
    useNewUrlParser: true,
    serverSelectionTimeoutMS: 180000,
  }).catch((err) => {
    console.error('Error on connection with mongoDB');
  });

  mongoose.connection.on('connected', async () => {
    console.info('Connected to mongoDB');
    const appModels = models();
    const mongooseModels = mongoose.modelNames();

    appModels.map(async (model) => {
      if (!mongooseModels.includes(model)) {
        await mongoose.connection.db.createCollection(model);
        return console.info(`Model ${model} created successfully!`);
      }

      return console.info(`Model ${model} already created`);
    });
  });

  mongoose.connection.on('error', () => {
    console.error('Error on connection with mongoDB');
  });
}
