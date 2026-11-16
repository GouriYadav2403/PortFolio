import { AboutSection } from '@/components/sections/AboutSection';
import { MarqueeTicker } from '@/components/common/MarqueeTicker';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Gouri Yadav — MERN Stack Developer',
  description:
    'Engineering summary, background, and development philosophy of Gouri Yadav, full-stack developer based in Indore, India.',
};

export default function AboutPage() {
  return (
    <div className="pt-6">
      <AboutSection />
      <MarqueeTicker />
    </div>
  );
}
