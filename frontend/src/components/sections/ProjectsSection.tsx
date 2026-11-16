'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { ProjectDetail } from '@/types';
import { ProjectModal } from '@/components/common/ProjectModal';
import { Card3D } from '@/components/common/Card3D';
import {
  FolderGit2,
  ExternalLink,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const ProjectsSection: React.FC = () => {
  const { projects } = portfolioData;
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);

  return (
    <section id="projects" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-beige/60 border border-coffee/20 text-xs font-semibold uppercase tracking-wider text-coffee">
          <FolderGit2 className="w-3.5 h-3.5 text-forest" />
          Featured Work & Systems
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-coffee-darker tracking-tight">
          Full-Stack & Enterprise Projects
        </h2>
        <p className="text-sm sm:text-base text-coffee-light max-w-2xl font-sans">
          Deep-dive into production CRMs, enterprise content systems, real-time modules, and developer tooling.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="flex"
          >
            <Card3D intensity={6} className="h-full">
              <div className="h-full flex flex-col justify-between rounded-2xl bg-cream border border-coffee/15 shadow-soft hover:shadow-card hover:border-coffee/30 transition-all duration-300 overflow-hidden group">
                {/* Thumbnail Image Header */}
                <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-beige/50 shrink-0">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-transparent opacity-90" />

                  {/* Top Type Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-forest text-cream border border-forest-light shadow-2xs">
                      {project.type}
                    </span>
                  </div>

                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-beige text-coffee-dark border border-coffee/30">
                        ⭐ Highlight
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-coffee-darker group-hover:text-forest transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs font-sans text-coffee-light font-medium mt-0.5">
                        {project.subtitle}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-sans line-clamp-3">
                      {project.summary}
                    </p>

                    {/* Highlights bullet previews */}
                    <div className="space-y-1.5 pt-1">
                      {project.highlights.slice(0, 2).map((h, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-xs text-coffee-dark font-sans"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-forest shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    {/* Technologies Chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-beige/50 text-coffee-dark border border-coffee/15"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 5 && (
                        <span className="px-2 py-1 rounded-md text-[11px] font-medium bg-cream text-coffee-light border border-coffee/15">
                          +{project.technologies.length - 5} more
                        </span>
                      )}
                    </div>

                    {/* Actions: View Details Trigger + Deep Link */}
                    <div className="pt-3 border-t border-coffee/10 flex items-center justify-between gap-3">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest hover:text-forest-light transition-colors group/btn"
                      >
                        <span>View Architecture & Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </button>

                      <Link
                        href={`/projects/${project.id}`}
                        className="text-xs text-coffee-light hover:text-coffee-dark font-sans underline underline-offset-4"
                      >
                        Deep Link Page
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Card3D>
          </motion.div>
        ))}
      </div>

      {/* Interactive Modal for Selected Project */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
