import { Router } from 'express';
import { ContactController } from './contact.controller.js';
import { contactRateLimiter } from '../../middleware/rateLimiter.js';

const router = Router();

// POST /api/contact - Validates, rate-limits, persists & dispatches email
router.post('/', contactRateLimiter, ContactController.handleSubmission);

export default router;
