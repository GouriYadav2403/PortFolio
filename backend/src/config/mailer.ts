import nodemailer from 'nodemailer';
import { ENV } from './env.js';

export const createTransporter = () => {
  if (!ENV.SMTP_USER || !ENV.SMTP_PASS) {
    return null;
  }

  const isSecure = ENV.SMTP_PORT === 465;

  return nodemailer.createTransport({
    host: ENV.SMTP_HOST,
    port: ENV.SMTP_PORT,
    secure: isSecure,
    auth: {
      user: ENV.SMTP_USER,
      pass: ENV.SMTP_PASS.replace(/\s+/g, ''),
    },
    tls: {
      rejectUnauthorized: ENV.NODE_ENV === 'production',
    },
  });
};

export const generateEmailHtml = (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
}) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>New Portfolio Message - Gouri Yadav</title>
  </head>
  <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #2A1810; background-color: #F8EFE3; margin: 0; padding: 24px;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #EAD8C4; overflow: hidden; box-shadow: 0 4px 20px rgba(112, 69, 43, 0.08);">
      <div style="background-color: #263B2D; padding: 24px 32px; color: #F8EFE3;">
        <h2 style="margin: 0; font-size: 22px; font-weight: 600; letter-spacing: -0.5px;">Gouri Yadav — Developer Portfolio</h2>
        <p style="margin: 4px 0 0 0; color: #A3A58A; font-size: 13px;">New Contact Inquiry Received</p>
      </div>
      
      <div style="padding: 32px;">
        <div style="background: #FDFBF7; border-left: 4px solid #70452B; padding: 16px; border-radius: 0 8px 8px 0; margin-bottom: 24px;">
          <h3 style="margin: 0 0 8px 0; color: #70452B; font-size: 16px;">Inquiry Details</h3>
          <p style="margin: 4px 0; font-size: 14px;"><strong>From:</strong> ${data.name}</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #263B2D; text-decoration: none;">${data.email}</a></p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Subject:</strong> ${data.subject}</p>
          <p style="margin: 4px 0; font-size: 13px; color: #7A7C64;"><strong>Received:</strong> ${data.submittedAt}</p>
        </div>

        <div style="margin-bottom: 24px;">
          <h4 style="margin: 0 0 8px 0; color: #263B2D; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Message Content:</h4>
          <div style="background: #FAF5EE; padding: 18px; border-radius: 8px; border: 1px solid #EAD8C4; font-size: 15px; line-height: 1.7; color: #2A1810; white-space: pre-wrap;">${data.message}</div>
        </div>

        <div style="text-align: center; margin-top: 32px; padding-top: 20px; border-top: 1px solid #EAD8C4;">
          <a href="mailto:${data.email}?subject=Re: ${encodeURIComponent(data.subject)}" style="display: inline-block; background-color: #263B2D; color: #F8EFE3; padding: 12px 28px; border-radius: 9999px; text-decoration: none; font-weight: 500; font-size: 14px;">
            Reply to ${data.name}
          </a>
        </div>
      </div>

      <div style="background-color: #FAF5EE; padding: 16px; text-align: center; font-size: 12px; color: #70452B; border-top: 1px solid #EAD8C4;">
        Sent via Gouri Yadav Developer Portfolio Contact Service • Indore, India
      </div>
    </div>
  </body>
  </html>
  `;
};
