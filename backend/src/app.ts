import express from 'express';
import cors from 'cors';
import { ENV } from './config/env.js';
import contactRoutes from './modules/contact/contact.routes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Trust proxy for rate limiting behind reverse proxies (like Render, Nginx)
app.set('trust proxy', 1);

// Enable CORS for all portfolio visitors (mobile, desktop, preview domains)
app.use(
  cors({
    origin: true,
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
