import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Work Experience — Gouri Yadav',
  description:
    'Professional experience and internship timeline of Gouri Yadav, MERN Stack Developer at Binjwa IT Solutions and XenParkSolutions.',
};

export default function ExperiencePage() {
  return (
    <div className="pt-6">
      <ExperienceSection />
    </div>
  );
}
