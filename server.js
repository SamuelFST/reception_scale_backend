import app from './app';

import secrets from './src/config/constants/secrets';

app.listen(secrets.API_PORT, () => {
  console.log(`Server running on http://localhost:${secrets.API_PORT}`);
  console.log(`Docs on http://localhost:${secrets.API_PORT}/api-docs`);
});
