import { SkillsSection } from '@/components/sections/SkillsSection';
import { MarqueeTicker } from '@/components/common/MarqueeTicker';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Technical Skills — Gouri Yadav',
  description:
    'Languages, frontend frameworks, backend systems, databases, and DevOps tools verified by production experience.',
};

export default function SkillsPage() {
  return (
    <div className="pt-6">
      <SkillsSection />
      <MarqueeTicker />
    </div>
  );
}
