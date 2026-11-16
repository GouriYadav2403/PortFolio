export interface SocialLink {
  name: string;
  url: string;
  iconName: 'github' | 'linkedin' | 'leetcode' | 'mail' | 'phone' | 'mapPin';
  label: string;
}

export interface SkillItem {
  name: string;
  category: 'languages' | 'frontend' | 'backend' | 'databases' | 'tools';
  highlight?: boolean;
}

export interface SkillCategory {
  title: string;
  categoryKey: 'languages' | 'frontend' | 'backend' | 'databases' | 'tools';
  description: string;
  skills: SkillItem[];
}

export interface ProjectDetail {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  thumbnail: string;
  technologies: string[];
  summary: string;
  highlights: string[];
  architecture?: string[];
  roleContribution?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  period: 'present' | 'past';
  location: string;
  points: string[];
  skillsUsed: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  boardOrUniversity: string;
  duration: string;
  score: string;
  scoreType: 'CGPA' | 'Percentage';
  details?: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  category: 'competition' | 'quiz' | 'certification';
}

export interface PortfolioData {
  personal: {
    name: string;
    designation: string;
    headline: string;
    summary: string;
    location: string;
    email: string;
    phone: string;
    availability: string;
    resumeUrl: string;
    profileImage: string;
  };
  stats: {
    label: string;
    value: string;
    description: string;
  }[];
  socials: SocialLink[];
  techStackBadges: string[];
  skillCategories: SkillCategory[];
  projects: ProjectDetail[];
  experience: ExperienceItem[];
  education: EducationItem[];
  achievements: AchievementItem[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactApiResponse {
  success: boolean;
  message: string;
  error?: string;
}
