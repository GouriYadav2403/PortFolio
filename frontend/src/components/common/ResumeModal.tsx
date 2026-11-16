'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Download,
  ExternalLink,
  FileText,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { personal } = portfolioData;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
        {/* Backdrop blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-ink/65 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl h-[92vh] bg-cream border border-coffee/20 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header Bar */}
          <div className="px-5 py-4 sm:px-6 sm:py-4.5 bg-forest text-cream flex items-center justify-between border-b border-forest-light shrink-0">
            {/* Title & Status */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-forest-light text-cream">
                <FileText className="w-5 h-5 text-sage-light" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-cream">
                    {personal.name} — Curriculum Vitae
                  </h3>
                  <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-forest-darker/60 text-sage-light border border-forest-light">
                    <CheckCircle2 className="w-3 h-3 text-sage-light" /> Official Resume
                  </span>
                </div>
                <p className="text-xs text-sage-light font-sans hidden sm:block">
                  {personal.designation} • {personal.location}
                </p>
              </div>
            </div>

            {/* Action Buttons: Download, Open in Tab & Close */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Direct Download Button */}
              <a
                href={personal.resumeUrl}
                download="Gouri_Yadav_Resume.pdf"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-cream hover:bg-beige text-forest text-xs font-semibold transition-all hover:scale-102 shadow-sm"
              >
                <Download className="w-3.5 h-3.5 text-forest" />
                <span className="hidden xs:inline">Download PDF</span>
              </a>

              {/* Open in New Tab Button */}
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-forest-light hover:bg-forest-light/80 text-cream text-xs font-medium border border-forest-light transition-colors"
                title="Open PDF in new tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Open Tab</span>
              </a>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-forest-light hover:bg-forest-light/80 text-cream transition-transform active:scale-95 ml-1"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Embedded PDF Viewer Body */}
          <div className="flex-1 w-full bg-cream-50 p-2 sm:p-4 overflow-hidden relative flex flex-col">
            <iframe
              src={`${personal.resumeUrl}#toolbar=1&navpanes=0&scrollbar=1`}
              title="Gouri Yadav Resume PDF"
              className="w-full flex-1 rounded-xl border border-coffee/20 shadow-inner bg-white"
            />

            {/* Fallback & Quick Hint Bar */}
            <div className="mt-2.5 pt-2 border-t border-coffee/15 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-coffee-light font-sans shrink-0 px-2">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-forest" />
                If the document does not render in your browser view, use the download button above.
              </span>
              <a
                href={personal.resumeUrl}
                download="Gouri_Yadav_Resume.pdf"
                className="text-forest font-semibold hover:underline"
              >
                Direct Download (96 KB)
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
