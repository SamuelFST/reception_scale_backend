const { env } = process;

const secrets = {
  API_PORT: env.API_PORT ? env.API_PORT : 4002,
  MONGO_URL: env.MONGO_URL ? env.MONGO_URL : 'mongodb://mongoadmin:mongoadmin@localhost:27030/reception_scale_db?authSource=admin',
};

export default secrets;
