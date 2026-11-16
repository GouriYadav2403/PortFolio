import { portfolioData } from '@/data/portfolio';
import { Download, ExternalLink, ArrowLeft, FileText, CheckCircle2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume / Curriculum Vitae — Gouri Yadav',
  description:
    'Official resume of Gouri Yadav, MERN Stack Developer. Education at Sushila Devi Bansal College, RGPV University, and work experience at Binjwa IT Solutions and XenParkSolutions.',
};

export default function ResumePage() {
  const { personal } = portfolioData;

  return (
    <div className="py-10 px-4 sm:px-8 max-w-5xl mx-auto">
      {/* Top Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream border border-coffee/20 text-xs font-semibold text-coffee-dark hover:bg-beige transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4 text-forest" />
          <span>Back to Portfolio</span>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <a
            href={personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-cream hover:bg-beige text-coffee-dark border border-coffee/20 text-xs font-semibold transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-forest" />
            <span>Open in New Tab</span>
          </a>

          <a
            href={personal.resumeUrl}
            download="Gouri_Yadav_Resume.pdf"
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-forest text-cream hover:bg-forest-light text-xs font-semibold transition-all shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </a>
        </div>
      </div>

      {/* Document Container */}
      <div className="rounded-3xl bg-cream border border-coffee/20 shadow-card overflow-hidden">
        {/* Document Header */}
        <div className="p-6 sm:p-8 bg-forest text-cream flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-forest-light">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-forest-darker/60 text-sage-light border border-forest-light mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-sage-light" />
              <span>Official Verified Resume</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
              {personal.name} — Curriculum Vitae
            </h1>
            <p className="text-xs sm:text-sm text-sage-light font-sans">
              {personal.designation} • {personal.location}
            </p>
          </div>

          <div className="shrink-0 text-left sm:text-right text-xs text-sage-light font-sans">
            <div>Document: <strong>PDF (96 KB)</strong></div>
            <div>Updated: <strong>November 2026</strong></div>
          </div>
        </div>

        {/* Embedded PDF Viewer */}
        <div className="p-3 sm:p-6 bg-cream-50">
          <iframe
            src={`${personal.resumeUrl}#toolbar=1&navpanes=0&scrollbar=1`}
            title="Gouri Yadav Resume PDF"
            className="w-full h-[800px] rounded-xl border border-coffee/20 shadow-inner bg-white"
          />

          <div className="mt-4 pt-3 border-t border-coffee/15 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-coffee-light font-sans">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-forest" />
              Having trouble viewing? You can download the PDF directly.
            </span>
            <a
              href={personal.resumeUrl}
              download="Gouri_Yadav_Resume.pdf"
              className="text-forest font-semibold hover:underline"
            >
              Download Gouri_Yadav_Resume.pdf
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
