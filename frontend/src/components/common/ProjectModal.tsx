'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectDetail } from '@/types';
import { X, Layers, CheckCircle2, ShieldCheck, Cpu, ArrowUpRight, Github } from 'lucide-react';
import Image from 'next/image';

interface ProjectModalProps {
  project: ProjectDetail | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-ink/60 backdrop-blur-md transition-opacity"
        />

        {/* Modal Content Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl my-8 bg-cream border border-coffee/20 rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="relative h-48 sm:h-64 w-full bg-forest shrink-0 overflow-hidden">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover opacity-60 mix-blend-luminosity hover:opacity-80 transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/40 to-transparent" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-cream/90 hover:bg-cream text-coffee-dark border border-coffee/20 shadow-sm transition-transform active:scale-95"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title Over Header */}
            <div className="absolute bottom-4 left-6 right-6">
              <span className="inline-block px-3 py-1 mb-2 text-xs font-medium rounded-full bg-forest text-cream border border-forest-light">
                {project.type}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-coffee-darker tracking-tight">
                {project.title}
              </h2>
              <p className="text-sm font-sans text-coffee-light mt-0.5">
                {project.subtitle}
              </p>
            </div>
          </div>

          {/* Modal Body (Scrollable) */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            {/* Tech Stack Pills */}
            <div>
              <h3 className="text-xs uppercase tracking-wider font-semibold text-coffee-light mb-2.5 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-forest" /> Technologies & Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-beige text-coffee-dark border border-coffee/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Overview */}
            <div className="bg-beige/40 p-4 sm:p-5 rounded-xl border border-coffee/15">
              <h3 className="text-sm font-semibold text-coffee-darker mb-2">
                Project Overview
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed font-sans">
                {project.summary}
              </p>
            </div>

            {/* Key Features & Engineering Highlights */}
            <div>
              <h3 className="text-xs uppercase tracking-wider font-semibold text-coffee-light mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-forest" /> Core Engineering Features & Contributions
              </h3>
              <div className="space-y-2.5">
                {project.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-lg bg-cream-50 border border-coffee/10 text-xs sm:text-sm text-ink"
                  >
                    <span className="w-5 h-5 rounded-full bg-forest/10 text-forest flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      {idx + 1}
                    </span>
                    <p className="leading-relaxed">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Patterns if present */}
            {project.architecture && (
              <div>
                <h3 className="text-xs uppercase tracking-wider font-semibold text-coffee-light mb-2.5 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-forest" /> Architectural Implementation Patterns
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.architecture.map((arch, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-beige/30 border border-coffee/15 text-xs text-coffee-dark flex items-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-forest shrink-0" />
                      <span>{arch}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Role & Links Status */}
            <div className="pt-4 border-t border-coffee/15 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-coffee-light font-sans">
                <strong>Project Status:</strong> Verified Resume Work
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium bg-coffee text-cream hover:bg-coffee-dark transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" /> Repository
                  </a>
                ) : (
                  <span className="text-xs text-coffee-light italic">
                    Enterprise / Internal Codebase
                  </span>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium bg-forest text-cream hover:bg-forest-light transition-colors"
                  >
                    Live Demo <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
