import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects & Architecture — Gouri Yadav',
  description:
    'Full-stack CRM platforms, enterprise content management solutions, and AI debugging applications built by Gouri Yadav.',
};

export default function ProjectsPage() {
  return (
    <div className="pt-6">
      <ProjectsSection />
    </div>
  );
}
