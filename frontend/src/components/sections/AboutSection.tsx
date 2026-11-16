'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import {
  Quote,
  GraduationCap,
  Briefcase,
  MapPin,
  Sparkles,
  Code2,
  Cpu,
  Layers,
  CheckCircle2,
  FileText,
  Eye,
  Download,
} from 'lucide-react';
import { useResumeModal } from '@/context/ResumeModalContext';

export const AboutSection: React.FC = () => {
  const { personal, stats } = portfolioData;
  const { openResumeModal } = useResumeModal();

  const highlights = [
    {
      title: 'Current Designation',
      value: 'MERN Stack Developer Intern',
      subtext: 'Binjwa IT Solutions',
      icon: <Briefcase className="w-5 h-5 text-forest" />,
    },
    {
      title: 'Education Highlight',
      value: 'B.Tech — CSE (2022–2026)',
      subtext: 'Sushila Devi Bansal College of Technology, Indore (CGPA: 7.30)',
      icon: <GraduationCap className="w-5 h-5 text-coffee" />,
    },
    {
      title: 'Location & Availability',
      value: 'Indore, India',
      subtext: personal.availability,
      icon: <MapPin className="w-5 h-5 text-forest" />,
    },
    {
      title: 'Engineering Focus',
      value: 'Scalable Full-Stack & ECM',
      subtext: 'REST APIs, RBAC Security, Real-Time WebSockets',
      icon: <Cpu className="w-5 h-5 text-coffee" />,
    },
  ];

  const interests = [
    {
      title: 'Role-Based Architectures (RBAC)',
      desc: 'Designing modular Model-Service-Controller pipelines with Zod input validation and token-based protection.',
    },
    {
      title: 'Enterprise Content Management (ECM)',
      desc: 'Engineering cross-product document ingestion, automated workflows, and high-performance search indexing.',
    },
    {
      title: 'Real-Time Collaboration Systems',
      desc: 'Integrating Socket.io event buses for instantaneous UI synchronization and multi-tenant live updates.',
    },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-beige/60 border border-coffee/20 text-xs font-semibold uppercase tracking-wider text-coffee">
          <Sparkles className="w-3.5 h-3.5 text-forest" />
          About Me
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-coffee-darker tracking-tight">
          Engineering Scalable Full-Stack Systems
        </h2>
        <p className="text-sm sm:text-base text-coffee-light max-w-2xl font-sans">
          A grounded overview of my technical journey, core competencies, and professional background.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: Resume Summary Quote Callout (Col 7) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-6"
        >
          {/* Editorial Quote Card */}
          <div className="relative p-6 sm:p-8 rounded-2xl bg-cream-50 border border-coffee/20 shadow-soft">
            <Quote className="w-10 h-10 text-sage/40 mb-3" />
            <blockquote className="font-serif text-lg sm:text-xl text-coffee-dark leading-relaxed italic">
              &ldquo;{personal.summary}&rdquo;
            </blockquote>
            <div className="mt-4 pt-4 border-t border-coffee/15 flex items-center justify-between text-xs text-coffee-light">
              <span className="font-semibold text-forest">Gouri Yadav</span>
              <span>Verified Resume Statement</span>
            </div>
          </div>

          {/* Core Technical Interests Grid */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-coffee-light flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-forest" /> Areas of Development Interest
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {interests.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-beige/30 border border-coffee/15 hover:border-coffee/30 transition-all hover:bg-beige/50"
                >
                  <h4 className="font-serif text-sm font-bold text-coffee-dark mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-ink-muted leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* RIGHT: Key Highlights & Stat Cards (Col 5) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-5 space-y-4"
        >
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-cream border border-coffee/15 shadow-2xs hover:shadow-soft transition-all"
            >
              <div className="p-3 rounded-xl bg-beige/60 border border-coffee/15 shrink-0">
                {item.icon}
              </div>
              <div className="space-y-0.5">
                <span className="text-xs uppercase tracking-wider font-semibold text-coffee-light">
                  {item.title}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-coffee-darker font-sans">
                  {item.value}
                </h4>
                <p className="text-xs text-ink-muted font-sans leading-normal">
                  {item.subtext}
                </p>
              </div>
            </div>
          ))}

          {/* Production Metric Badges */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-forest text-cream text-center border border-forest-light shadow-xs"
              >
                <div className="font-serif text-xl sm:text-2xl font-bold text-cream">
                  {stat.value}
                </div>
                <div className="text-[11px] font-sans text-sage-light mt-0.5 leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Dedicated Curriculum Vitae Document Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-cream-50 border border-coffee/20 shadow-soft space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-forest text-cream">
                  <FileText className="w-5 h-5 text-sage-light" />
                </div>
                <div>
                  <h4 className="font-serif text-sm sm:text-base font-bold text-coffee-darker">
                    Official Curriculum Vitae
                  </h4>
                  <p className="text-[11px] text-coffee-light font-sans">
                    Complete academic credentials & technical experience (PDF)
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={openResumeModal}
                className="flex-1 py-2 px-3 rounded-xl bg-forest hover:bg-forest-light text-cream text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Full CV</span>
              </button>

              <a
                href={personal.resumeUrl}
                download="Gouri_Yadav_Resume.pdf"
                className="flex-1 py-2 px-3 rounded-xl bg-cream hover:bg-beige text-coffee-dark border border-coffee/20 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                title="Download Official PDF"
              >
                <Download className="w-3.5 h-3.5 text-forest" />
                <span>Download PDF</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
