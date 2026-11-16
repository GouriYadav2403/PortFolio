'use client';

import React from 'react';
import { portfolioData } from '@/data/portfolio';
import { Sparkles, MapPin, Download, Eye, FileText } from 'lucide-react';
import { useResumeModal } from '@/context/ResumeModalContext';

export const HeaderBanner: React.FC = () => {
  const { personal } = portfolioData;
  const { openResumeModal } = useResumeModal();

  return (
    <header className="w-full pt-4 pb-2 px-4 sm:px-8 border-b border-coffee/10 bg-cream/70 backdrop-blur-xs select-none">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
        {/* Left: Brand Identity Monogram & Name */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-forest text-cream flex items-center justify-center font-serif font-bold text-sm shadow-sm border border-forest-light">
            GY
          </div>
          <div>
            <span className="font-serif font-bold text-coffee-darker text-sm sm:text-base tracking-tight">
              {personal.name}
            </span>
            <span className="text-coffee-light ml-2 hidden md:inline text-xs">
              • {personal.designation}
            </span>
          </div>
        </div>

        {/* Center: Live Status Badge */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-beige/60 border border-coffee/15 text-coffee-dark">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forest opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-forest" />
          </span>
          <span className="text-xs font-medium tracking-wide">
            {personal.availability}
          </span>
        </div>

        {/* Right: Quick Location & Resume Dual Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3 text-coffee-dark">
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-coffee-light">
            <MapPin className="w-3.5 h-3.5 text-forest" />
            <span>{personal.location}</span>
          </div>

          <div className="inline-flex items-center p-0.5 rounded-full bg-cream border border-coffee/20 shadow-2xs">
            {/* View Resume Button */}
            <button
              onClick={openResumeModal}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-coffee-dark hover:text-forest hover:bg-beige/60 transition-all cursor-pointer"
              title="Preview Gouri's Resume in Viewer"
            >
              <Eye className="w-3.5 h-3.5 text-forest" />
              <span>View CV</span>
            </button>

            <span className="w-px h-3.5 bg-coffee/20 mx-0.5" />

            {/* Direct Download Button */}
            <a
              href={personal.resumeUrl}
              download="Gouri_Yadav_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest text-cream hover:bg-forest-light text-xs font-medium transition-colors shadow-xs"
              title="Download Gouri's Resume (PDF)"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
