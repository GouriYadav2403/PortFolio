import { EducationSection } from '@/components/sections/EducationSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Education & Achievements — Gouri Yadav',
  description:
    'Academic qualifications (B.Tech in CSE, RGPV University) and competitive achievements of Gouri Yadav.',
};

export default function EducationPage() {
  return (
    <div className="pt-6">
      <EducationSection />
    </div>
  );
}
