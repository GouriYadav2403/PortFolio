import { portfolioData } from '@/data/portfolio';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  Cpu,
  Layers,
  CheckCircle2,
  ShieldCheck,
  Github,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { Metadata } from 'next';

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  return portfolioData.projects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = portfolioData.projects.find((p) => p.id === params.id);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} — Architecture & Details | Gouri Yadav`,
    description: project.summary,
  };
}

export default function ProjectDetailPage({ params }: Props) {
  const project = portfolioData.projects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  return (
    <article className="py-12 px-4 sm:px-8 max-w-5xl mx-auto">
      {/* Back Button */}
      <div className="mb-8">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream border border-coffee/20 text-xs font-semibold text-coffee-dark hover:bg-beige transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-forest" />
          <span>Back to All Projects</span>
        </Link>
      </div>

      {/* Main Project Card Header */}
      <div className="relative rounded-3xl overflow-hidden bg-cream border border-coffee/20 shadow-card mb-10">
        <div className="relative h-64 sm:h-80 w-full bg-beige/40">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            priority
            className="object-cover filter contrast-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/60 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6">
            <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold rounded-full bg-forest text-cream border border-forest-light shadow-sm">
              {project.type}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-coffee-darker tracking-tight">
              {project.title}
            </h1>
            <p className="text-sm sm:text-base font-sans text-coffee-light mt-1">
              {project.subtitle}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-10 space-y-8">
          {/* Tech Stack */}
          <div>
            <h2 className="text-xs uppercase tracking-wider font-semibold text-coffee-light mb-3 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-forest" /> Technology Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-beige text-coffee-dark border border-coffee/20 shadow-2xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Project Summary */}
          <div className="p-6 rounded-2xl bg-cream-50 border border-coffee/15 shadow-2xs">
            <h3 className="text-sm font-bold text-coffee-darker mb-2">
              Overview & Scope
            </h3>
            <p className="text-sm sm:text-base text-ink-muted leading-relaxed font-sans">
              {project.summary}
            </p>
          </div>

          {/* Detailed Features & Contributions */}
          <div>
            <h2 className="text-xs uppercase tracking-wider font-semibold text-coffee-light mb-4 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-forest" /> Key Features & Contributions
            </h2>
            <div className="space-y-3">
              {project.highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 p-4 rounded-xl bg-beige/30 border border-coffee/15 text-xs sm:text-sm text-ink leading-relaxed"
                >
                  <span className="w-6 h-6 rounded-full bg-forest text-cream flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs shadow-2xs">
                    {idx + 1}
                  </span>
                  <p>{highlight}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture Patterns */}
          {project.architecture && (
            <div>
              <h2 className="text-xs uppercase tracking-wider font-semibold text-coffee-light mb-3 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-forest" /> Technical Architecture
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.architecture.map((arch, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-cream border border-coffee/15 text-xs text-coffee-dark flex items-center gap-3 shadow-2xs"
                  >
                    <ShieldCheck className="w-5 h-5 text-forest shrink-0" />
                    <span>{arch}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Role & Links Status */}
          <div className="pt-6 border-t border-coffee/15 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-coffee-light">
              <strong>Verified Profile Work:</strong> Direct contribution from Gouri Yadav&apos;s professional resume.
            </div>

            <div className="flex items-center gap-3">
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-coffee text-cream hover:bg-coffee-dark transition-colors"
                >
                  <Github className="w-4 h-4" /> View Repository
                </a>
              ) : (
                <span className="text-xs text-coffee-light italic">
                  Private Enterprise Repository
                </span>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-forest text-cream hover:bg-forest-light transition-colors"
                >
                  Live Demo <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
