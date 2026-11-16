'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { ParallaxWatermark } from '@/components/common/ParallaxWatermark';
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const { experience } = portfolioData;
  const timelineRef = useRef<HTMLDivElement>(null);

  // Scroll tracking specifically for the experience timeline
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 60%'],
  });

  // Spring physics for buttery-smooth draw and retract motion
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  // Dynamic animated glowing head indicator running along the line
  const dotTop = useTransform(scaleY, [0, 1], ['0%', '100%']);
  const dotOpacity = useTransform(scaleY, [0, 0.03, 0.98, 1], [0, 1, 1, 0.5]);

  return (
    <section
      id="experience"
      className="relative py-20 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background Parallax Scroll Watermark */}
      <ParallaxWatermark text="EXPERIENCE" speed={80} className="text-[14vw]" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-beige/60 border border-coffee/20 text-xs font-semibold uppercase tracking-wider text-coffee">
          <Briefcase className="w-3.5 h-3.5 text-forest" />
          Work Experience
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-coffee-darker tracking-tight">
          Professional Developer Journey
        </h2>
        <p className="text-sm sm:text-base text-coffee-light max-w-2xl font-sans">
          Production contributions across full-stack MERN workflows, enterprise frontend engineering, and REST integrations.
        </p>
      </div>

      {/* Experience Timeline Container */}
      <div ref={timelineRef} className="relative max-w-4xl mx-auto">
        {/* Background Inactive Line Track */}
        <div className="absolute top-4 bottom-4 left-4 sm:left-1/2 -translate-x-1/2 w-1 bg-coffee/15 rounded-full" />

        {/* Dynamic Scroll-Driven Animated Line (draws down on scroll down, retracts on scroll up) */}
        <motion.div
          style={{ scaleY }}
          className="absolute top-4 bottom-4 left-4 sm:left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-forest via-forest to-sage origin-top rounded-full z-0 shadow-[0_0_10px_rgba(38,59,45,0.35)]"
        />

        {/* Glowing Tip/Runner Dot at the edge of the expanding line */}
        <motion.div
          style={{
            top: dotTop,
            opacity: dotOpacity,
          }}
          className="absolute left-4 sm:left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-forest border-2 border-cream shadow-[0_0_12px_rgba(38,59,45,0.8)] z-10 pointer-events-none"
        >
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forest opacity-75" />
        </motion.div>

        <div className="space-y-12">
          {experience.map((item, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative flex flex-col sm:flex-row items-start ${isEven ? 'sm:flex-row-reverse' : ''
                  } gap-6 sm:gap-12`}
              >
                {/* Timeline Center Node Circle */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-cream border-2 border-forest text-forest flex items-center justify-center z-10 shadow-md">
                  {item.period === 'present' ? (
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forest opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-forest" />
                    </span>
                  ) : (
                    <Briefcase className="w-4 h-4 text-forest" />
                  )}
                </div>

                {/* Experience Card */}
                <div
                  className={`w-full sm:w-[calc(50%-2rem)] ml-12 sm:ml-0 p-6 sm:p-7 rounded-2xl bg-cream border border-coffee/15 shadow-soft hover:shadow-card hover:border-coffee/30 transition-all duration-300 ${isEven ? 'sm:text-left' : 'sm:text-left'
                    }`}
                >
                  {/* Top Status & Duration */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${item.period === 'present'
                        ? 'bg-forest/10 text-forest border border-forest/20'
                        : 'bg-beige/60 text-coffee-dark border border-coffee/15'
                        }`}
                    >
                      {item.period === 'present' ? (
                        <>
                          <Sparkles className="w-3 h-3 text-forest" /> Current Role
                        </>
                      ) : (
                        'Completed Internship'
                      )}
                    </span>

                    <span className="inline-flex items-center gap-1 text-xs text-coffee-light font-sans">
                      <Calendar className="w-3.5 h-3.5 text-forest" />
                      {item.duration}
                    </span>
                  </div>

                  {/* Role & Company */}
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-coffee-darker">
                    {item.role}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-semibold text-forest mb-4 font-sans">
                    <span>{item.company}</span>
                    <span>•</span>
                    <span className="text-coffee-light font-normal flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </span>
                  </div>

                  {/* Bullet Responsibilities */}
                  <div className="space-y-2 mb-5">
                    {item.points.map((point, pIdx) => (
                      <div
                        key={pIdx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-ink leading-relaxed font-sans"
                      >
                        <CheckCircle2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  {/* Skills Used Chips */}
                  <div className="pt-3 border-t border-coffee/10 flex flex-wrap gap-1.5">
                    {item.skillsUsed.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-beige/50 text-coffee-dark border border-coffee/15"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
