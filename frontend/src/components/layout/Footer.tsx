'use client';

import React from 'react';
import { portfolioData } from '@/data/portfolio';
import { ArrowUp, Github, Linkedin, Mail, Code, MapPin, Eye, Download, FileText } from 'lucide-react';
import { useResumeModal } from '@/context/ResumeModalContext';

export const Footer: React.FC = () => {
  const { personal, socials } = portfolioData;
  const { openResumeModal } = useResumeModal();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'github':
        return <Github className="w-4 h-4" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'leetcode':
        return <Code className="w-4 h-4" />;
      case 'mail':
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  return (
    <footer className="w-full bg-forest text-cream pt-16 pb-32 px-4 sm:px-8 border-t border-forest-light relative select-none">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-forest-light/40">
          {/* Col 1: Identity & Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cream text-forest flex items-center justify-center font-serif font-bold text-lg shadow-md">
                GY
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold tracking-tight text-cream">
                  {personal.name}
                </h3>
                <p className="text-sage text-sm font-sans">
                  {personal.designation}
                </p>
              </div>
            </div>

            <p className="text-sage-light text-sm max-w-md leading-relaxed font-sans">
              Computer Science Engineering student crafting robust, scalable full-stack web applications and enterprise workflows with the MERN stack and Next.js.
            </p>

            <div className="flex items-center gap-2 text-xs text-sage pt-2">
              <MapPin className="w-4 h-4 text-sage-light" />
              <span>Based in {personal.location} • Open for Opportunities</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-serif text-base font-semibold text-cream mb-4 tracking-wide">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-sage-light font-sans">
              <li>
                <a href="#home" className="hover:text-cream transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-cream transition-colors">
                  About Me
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-cream transition-colors">
                  Technical Skills
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-cream transition-colors">
                  Projects & Architecture
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-cream transition-colors">
                  Experience & Timeline
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-cream transition-colors">
                  Contact Me
                </a>
              </li>
              <li className="pt-1.5 border-t border-forest-light/30">
                <button
                  type="button"
                  onClick={openResumeModal}
                  className="hover:text-cream text-sage-light transition-colors text-left flex items-center gap-1.5 cursor-pointer text-xs"
                >
                  <Eye className="w-3.5 h-3.5 text-sage" />
                  <span>View Official Resume</span>
                </button>
              </li>
              <li>
                <a
                  href={personal.resumeUrl}
                  download="Gouri_Yadav_Resume.pdf"
                  className="hover:text-cream text-sage-light transition-colors flex items-center gap-1.5 text-xs"
                >
                  <Download className="w-3.5 h-3.5 text-sage" />
                  <span>Download PDF (96 KB)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Connect & Actions */}
          <div className="space-y-4">
            <h4 className="font-serif text-base font-semibold text-cream mb-4 tracking-wide">
              Connect
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {socials.map((social) => {
                const isMail = social.iconName === 'mail' || social.url.startsWith('mailto:');
                const href = isMail
                  ? `https://mail.google.com/mail/?view=cm&fs=1&to=${personal.email}`
                  : social.url;

                return (
                  <a
                    key={social.name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-forest-light/60 hover:bg-forest-light text-cream flex items-center justify-center border border-forest-light transition-all hover:scale-105"
                    aria-label={social.label}
                    title={isMail ? `Send Email to ${personal.email} (Opens Gmail)` : social.label}
                  >
                    {getSocialIcon(social.iconName)}
                  </a>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream text-forest hover:bg-beige text-xs font-semibold transition-all hover:shadow-md"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                Back to Top
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Credits Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-sage gap-4">
          <p>
            © {new Date().getFullYear()} {personal.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 font-sans">
            Designed & Engineered with Next.js, Express & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};
