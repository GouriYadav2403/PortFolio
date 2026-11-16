import { ContactSection } from '@/components/sections/ContactSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Gouri Yadav — MERN Stack Developer',
  description:
    'Send a direct message to Gouri Yadav. Connected to a dedicated Express & Nodemailer backend service.',
};

export default function ContactPage() {
  return (
    <div className="pt-6">
      <ContactSection />
    </div>
  );
}
