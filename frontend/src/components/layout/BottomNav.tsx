'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useActiveSection, SectionId } from '@/hooks/useActiveSection';
import {
  Home,
  User,
  Wrench,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Mail,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface NavItem {
  id: SectionId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'skills', label: 'Skills', icon: Wrench },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export const BottomNav: React.FC = () => {
  const { activeSection, scrollToSection } = useActiveSection();

  return (
    <aside aria-label="Quick Section Navigation" className="fixed bottom-4 sm:bottom-6 left-0 right-0 z-40 flex justify-center px-3 pointer-events-none">
      <nav
        aria-label="Portfolio Main Navigation"
        className="pointer-events-auto max-w-full overflow-x-auto no-scrollbar rounded-full p-1.5 sm:p-2 glass-dock border border-coffee/20 shadow-dock transition-all duration-300"
      >
        <ul className="flex items-center gap-1 sm:gap-1.5 list-none m-0 p-0">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  aria-label={`Navigate to ${item.label} section`}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'relative flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 select-none outline-hidden focus-visible:ring-2 focus-visible:ring-forest',
                    isActive
                      ? 'text-cream font-semibold'
                      : 'text-coffee-dark hover:text-coffee-darker hover:bg-beige/40'
                  )}
                >
                  {/* Active Animated Pill Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeDockIndicator"
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                      className="absolute inset-0 bg-forest rounded-full shadow-md -z-10"
                    />
                  )}

                  <Icon className={cn('w-4 h-4 shrink-0 transition-transform', isActive && 'scale-110')} />
                  <span className="hidden md:inline whitespace-nowrap">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};
