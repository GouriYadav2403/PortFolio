import { HeroSection } from '@/components/sections/HeroSection';
import { MarqueeTicker } from '@/components/common/MarqueeTicker';
import { AboutSection } from '@/components/sections/AboutSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { EducationSection } from '@/components/sections/EducationSection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <div className="relative w-full">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Interactive Infinite Tech Marquee Ticker */}
      <MarqueeTicker />

      {/* 3. About Section */}
      <AboutSection />

      {/* 4. Skills Section */}
      <SkillsSection />

      {/* 5. Projects Section */}
      <ProjectsSection />

      {/* 6. Experience Timeline */}
      <ExperienceSection />

      {/* 7. Education & Achievements */}
      <EducationSection />

      {/* 8. Working Contact Section */}
      <ContactSection />
    </div>
  );
}
