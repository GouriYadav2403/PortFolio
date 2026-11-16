import { ContactFormData, ContactApiResponse } from '@/types';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const portfolioApi = {
  /**
   * Submit contact form to the Express backend
   */
  async submitContact(data: ContactFormData): Promise<ContactApiResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData: ContactApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.message || responseData.error || 'Failed to send message.'
        );
      }

      return responseData;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected network error occurred. Please try again.');
    }
  },

  /**
   * Check backend health status
   */
  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return response.ok;
    } catch {
      return false;
    }
  },
};
