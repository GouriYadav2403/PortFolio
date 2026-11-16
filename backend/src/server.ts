import app from './app.js';
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';

const startServer = async () => {
  // Connect to MongoDB if URI is configured
  await connectDB();

  const server = app.listen(ENV.PORT, () => {
    console.log(`
  🌿 ==========================================
  🌿  Gouri Yadav Developer Portfolio Backend
  🌿  Environment: ${ENV.NODE_ENV}
  🌿  Port:        ${ENV.PORT}
  🌿  API URL:     http://localhost:${ENV.PORT}/api
  🌿  Mail Target: ${ENV.MAIL_TO}
  🌿 ==========================================
    `);
  });

  const shutdown = () => {
    console.log('Shutting down backend server gracefully...');
    server.close(() => {
      console.log('Backend server stopped.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
};

startServer();
