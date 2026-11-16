'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import {
  Wrench,
  Code2,
  Layout,
  Server,
  Database,
  Terminal,
  Sparkles,
  CheckCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const SkillsSection: React.FC = () => {
  const { skillCategories } = portfolioData;
  const [activeTab, setActiveTab] = useState<string>('all');

  const getCategoryIcon = (key: string) => {
    switch (key) {
      case 'languages':
        return <Code2 className="w-5 h-5 text-forest" />;
      case 'frontend':
        return <Layout className="w-5 h-5 text-coffee" />;
      case 'backend':
        return <Server className="w-5 h-5 text-forest" />;
      case 'databases':
        return <Database className="w-5 h-5 text-coffee" />;
      case 'tools':
      default:
        return <Terminal className="w-5 h-5 text-forest" />;
    }
  };

  const filteredCategories =
    activeTab === 'all'
      ? skillCategories
      : skillCategories.filter((cat) => cat.categoryKey === activeTab);

  return (
    <section id="skills" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-beige/60 border border-coffee/20 text-xs font-semibold uppercase tracking-wider text-coffee">
          <Wrench className="w-3.5 h-3.5 text-forest" />
          Technical Capabilities
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-coffee-darker tracking-tight">
          Tools, Frameworks & Languages
        </h2>
        <p className="text-sm sm:text-base text-coffee-light max-w-2xl font-sans">
          Curated directly from verified production and project experience on my resume.
        </p>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          <button
            onClick={() => setActiveTab('all')}
            className={cn(
              'px-4 py-1.5 rounded-full text-xs font-medium transition-all select-none',
              activeTab === 'all'
                ? 'bg-forest text-cream shadow-sm'
                : 'bg-cream text-coffee-dark hover:bg-beige border border-coffee/20'
            )}
          >
            All Categories
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.categoryKey}
              onClick={() => setActiveTab(cat.categoryKey)}
              className={cn(
                'px-4 py-1.5 rounded-full text-xs font-medium transition-all select-none',
                activeTab === cat.categoryKey
                  ? 'bg-forest text-cream shadow-sm'
                  : 'bg-cream text-coffee-dark hover:bg-beige border border-coffee/20'
              )}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* Categorized Skills Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredCategories.map((category) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              key={category.categoryKey}
              className="p-6 rounded-2xl bg-cream border border-coffee/15 shadow-soft hover:shadow-card hover:border-coffee/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Category Top Title */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-beige/60 border border-coffee/15">
                      {getCategoryIcon(category.categoryKey)}
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-coffee-darker">
                        {category.title}
                      </h3>
                      <span className="text-[11px] uppercase tracking-wider text-sage-dark font-sans font-semibold">
                        {category.skills.length} competencies
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-ink-muted mb-5 font-sans leading-relaxed">
                  {category.description}
                </p>

                {/* Skill Chips */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className={cn(
                        'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium font-sans border transition-all duration-200 select-none hover:-translate-y-0.5',
                        skill.highlight
                          ? 'bg-forest/10 border-forest/30 text-forest font-semibold hover:bg-forest/20'
                          : 'bg-beige/40 border-coffee/15 text-coffee-dark hover:bg-beige/80'
                      )}
                    >
                      {skill.highlight ? (
                        <Sparkles className="w-3 h-3 text-forest" />
                      ) : (
                        <CheckCircle className="w-3 h-3 text-sage" />
                      )}
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Subtle Indicator */}
              <div className="mt-6 pt-3 border-t border-coffee/10 flex items-center justify-between text-[11px] text-coffee-light font-sans">
                <span>Verified in Resume</span>
                <span className="text-forest font-medium">Production Ready</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
