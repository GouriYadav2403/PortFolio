import { Request, Response, NextFunction } from 'express';
import { contactSchema } from './contact.validator.js';
import { ContactService } from './contact.service.js';
import { ApiResponse } from '../../types/index.js';

export class ContactController {
  public static async handleSubmission(
    req: Request,
    res: Response<ApiResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      // 1. Zod validation
      const parseResult = contactSchema.safeParse(req.body);
      if (!parseResult.success) {
        const errorMessages = parseResult.error.errors
          .map((err) => err.message)
          .join(', ');
        res.status(400).json({
          success: false,
          message: 'Invalid contact form submission.',
          error: errorMessages,
        });
        return;
      }

      const input = parseResult.data;
      const clientMeta = {
        ipAddress: req.ip || req.socket.remoteAddress || '',
        userAgent: req.get('user-agent') || '',
      };

      // 2. Process submission via service (dispatch email & persist to Mongo)
      const result = await ContactService.processContactSubmission(input, clientMeta);

      if (result.delivered) {
        res.status(200).json({
          success: true,
          message: 'Thank you! Your message has been sent to Gouri Yadav.',
          data: { recipient: result.recipient },
        });
      } else {
        // Form was accepted and processed, but SMTP is awaiting user credentials
        res.status(200).json({
          success: true,
          message: 'Your message was received! (SMTP configuration is pending in backend/.env)',
          data: { warning: result.warning },
        });
      }
    } catch (error) {
      next(error);
    }
  }
}
