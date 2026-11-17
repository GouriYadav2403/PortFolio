import mongoose from 'mongoose';
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

    const emailHtml = generateEmailHtml({
      name: input.name,
      email: input.email,
      subject: input.subject,
      message: input.message,
      submittedAt,
    });

    // 1. Try Resend REST API first if configured (HTTPS port 443 — never blocked by Render)
    if (ENV.RESEND_API_KEY) {
      try {
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${ENV.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: [ENV.MAIL_TO],
            reply_to: input.email,
            subject: `[Portfolio Contact] ${input.subject}`,
            html: emailHtml,
          }),
        });

        if (resendResponse.ok) {
          isDelivered = true;
          console.log(`✉️ Email dispatched successfully via Resend API to ${ENV.MAIL_TO}`);
        } else {
          const resendErr = await resendResponse.text();
          console.error('❌ Resend API error:', resendErr);
          deliveryError = 'Resend delivery failed';
        }
      } catch (rErr) {
        console.error('❌ Failed to dispatch email via Resend:', rErr);
        deliveryError = rErr instanceof Error ? rErr.message : 'Resend error';
      }
    }

    // 2. Fallback to Nodemailer SMTP
    if (!isDelivered) {
      const transporter = createTransporter();

      if (transporter && ENV.SMTP_USER && ENV.SMTP_PASS) {
        try {
          const mailOptions = {
            from: `"${input.name}" <${ENV.MAIL_FROM}>`,
            to: ENV.MAIL_TO,
            replyTo: input.email,
            subject: `[Portfolio Contact] ${input.subject}`,
            html: emailHtml,
          };

          const info = await transporter.sendMail(mailOptions);
          console.log(`✉️ Email dispatched successfully to ${ENV.MAIL_TO}. MessageId: ${info.messageId}`);
          isDelivered = true;
        } catch (err: unknown) {
          deliveryError = err instanceof Error ? err.message : 'Unknown mailer error';
          console.error('❌ Failed to dispatch email via SMTP:', deliveryError);
        }
      } else if (!ENV.RESEND_API_KEY) {
        deliveryError = 'SMTP credentials not configured in backend/.env. Mail skipped.';
      }
    }

    // Persist in MongoDB if database is actively connected
    try {
      if (mongoose.connection.readyState === 1) {
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
      }
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
