import mongoose, { Document, Schema } from 'mongoose';
import { IContactMessage } from '../../types/index.js';

export interface IContactDocument extends IContactMessage, Document {}

const contactMessageSchema = new Schema<IContactDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 150,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },
    ipAddress: {
      type: String,
      default: '',
    },
    userAgent: {
      type: String,
      default: '',
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveryError: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const ContactMessage = mongoose.model<IContactDocument>(
  'ContactMessage',
  contactMessageSchema
);
