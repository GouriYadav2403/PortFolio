'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import {
  GraduationCap,
  Award,
  Calendar,
  Building2,
  Trophy,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export const EducationSection: React.FC = () => {
  const { education, achievements } = portfolioData;

  const getAchievementIcon = (cat: string) => {
    switch (cat) {
      case 'competition':
        return <Trophy className="w-5 h-5 text-forest" />;
      case 'quiz':
        return <Sparkles className="w-5 h-5 text-coffee" />;
      case 'certification':
      default:
        return <Award className="w-5 h-5 text-forest" />;
    }
  };

  return (
    <section id="education" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-beige/60 border border-coffee/20 text-xs font-semibold uppercase tracking-wider text-coffee">
          <GraduationCap className="w-3.5 h-3.5 text-forest" />
          Academic Background & Activities
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-coffee-darker tracking-tight">
          Education & Achievements
        </h2>
        <p className="text-sm sm:text-base text-coffee-light max-w-2xl font-sans">
          Rigorous academic foundation in Computer Science Engineering paired with competitive problem-solving.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: Education Cards (Col 7) */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="text-xs uppercase tracking-wider font-semibold text-coffee-light flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-forest" /> Academic Qualifications
          </h3>

          <div className="space-y-4">
            {education.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-cream border border-coffee/15 shadow-soft hover:shadow-card hover:border-coffee/30 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-forest/10 text-forest border border-forest/20 mb-1.5">
                      {item.duration}
                    </span>
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-coffee-darker">
                      {item.degree}
                    </h4>
                  </div>

                  {/* Score Badge */}
                  <div className="shrink-0">
                    <div className="px-3.5 py-1.5 rounded-xl bg-beige/70 border border-coffee/20 text-center">
                      <span className="text-xs uppercase tracking-wider text-coffee-light block font-semibold">
                        {item.scoreType}
                      </span>
                      <span className="font-serif text-base sm:text-lg font-bold text-coffee-dark">
                        {item.score}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Institution & Board */}
                <div className="flex items-center gap-2 text-xs sm:text-sm text-coffee-light font-sans mb-3">
                  <Building2 className="w-4 h-4 text-forest shrink-0" />
                  <span>{item.institution}</span>
                  {item.boardOrUniversity && (
                    <span>• {item.boardOrUniversity}</span>
                  )}
                </div>

                {/* Details */}
                {item.details && (
                  <div className="space-y-1.5 pt-2 border-t border-coffee/10">
                    {item.details.map((detail, dIdx) => (
                      <p
                        key={dIdx}
                        className="text-xs text-ink-muted leading-relaxed font-sans flex items-start gap-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-sage shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </p>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT: Achievements & Activities (Col 5) */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-xs uppercase tracking-wider font-semibold text-coffee-light flex items-center gap-2">
            <Trophy className="w-4 h-4 text-forest" /> Co-Curricular & Competitions
          </h3>

          <div className="space-y-4">
            {achievements.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-5 sm:p-6 rounded-2xl bg-cream border border-coffee/15 shadow-soft hover:shadow-card hover:border-coffee/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-beige/60 border border-coffee/15 shrink-0">
                    {getAchievementIcon(item.category)}
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-forest">
                      Verified Activity
                    </span>
                    <h4 className="font-serif text-base font-bold text-coffee-darker">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-ink-muted font-sans leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Note banner on verified credentials */}
            <div className="p-4 rounded-xl bg-forest/5 border border-forest/20 text-xs text-forest leading-relaxed font-sans">
              <strong>Professional Standard:</strong> All educational credentials and activities listed above reflect accurate records from university transcripts and verified resume milestones.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
