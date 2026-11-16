import { ContactInput } from '../../types/index.js';
import { ContactMessage } from './contact.model.js';
import { createTransporter, generateEmailHtml } from '../../config/mailer.js';
import { ENV } from '../../config/env.js';

export class ContactService {
  public static async processContactSubmission(
    input: ContactInput,
    clientMeta?: { ipAddress?: string; userAgent?: string }
  ) {
    const submittedAt = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    let isDelivered = false;
    let deliveryError: string | null = null;

    const transporter = createTransporter();

    if (transporter && ENV.SMTP_USER && ENV.SMTP_PASS) {
      try {
        const mailOptions = {
          from: `"${input.name}" <${ENV.MAIL_FROM}>`,
          to: ENV.MAIL_TO,
          replyTo: input.email,
          subject: `[Portfolio Contact] ${input.subject}`,
          html: generateEmailHtml({
            name: input.name,
            email: input.email,
            subject: input.subject,
            message: input.message,
            submittedAt,
          }),
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`✉️ Email dispatched successfully to ${ENV.MAIL_TO}. MessageId: ${info.messageId}`);
        isDelivered = true;
      } catch (err: unknown) {
        deliveryError = err instanceof Error ? err.message : 'Unknown mailer error';
        console.error('❌ Failed to dispatch email via SMTP:', deliveryError);
      }
    } else {
      deliveryError = 'SMTP credentials not configured in backend/.env. Mail skipped.';
      console.warn('⚠️  SMTP credentials not set. Email not sent. Please set SMTP_USER and SMTP_PASS in backend/.env.');
    }

    // Persist in MongoDB if available
    try {
      await ContactMessage.create({
        name: input.name,
        email: input.email,
        subject: input.subject,
        message: input.message,
        ipAddress: clientMeta?.ipAddress || '',
        userAgent: clientMeta?.userAgent || '',
        isDelivered,
        deliveryError,
      });
    } catch (dbErr) {
      // In case MongoDB isn't connected, we don't throw an unhandled crash
      console.warn('ℹ️  MongoDB save skipped (DB not connected or unavailable).');
    }

    return {
      delivered: isDelivered,
      warning: isDelivered ? undefined : deliveryError,
      recipient: ENV.MAIL_TO,
    };
  }
}
