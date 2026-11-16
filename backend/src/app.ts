import express from 'express';
import cors from 'cors';
import { ENV } from './config/env.js';
import contactRoutes from './modules/contact/contact.routes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Trust proxy for rate limiting behind reverse proxies (like Render, Nginx)
app.set('trust proxy', 1);

// Enable CORS with configured frontend origins
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, postman)
      if (!origin) return callback(null, true);

      const allowedOrigins = [
        ENV.FRONTEND_URL,
        'http://localhost:3000',
        'http://127.0.0.1:3000',
      ];

      // In development or if origin matches
      if (
        ENV.NODE_ENV !== 'production' ||
        allowedOrigins.includes(origin) ||
        origin.endsWith('.vercel.app')
      ) {
        return callback(null, true);
      }

      callback(new Error('Blocked by CORS policy'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Standard JSON body parser
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Gouri Yadav Portfolio API',
  });
});

// Modular Routes
app.use('/api/contact', contactRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;
