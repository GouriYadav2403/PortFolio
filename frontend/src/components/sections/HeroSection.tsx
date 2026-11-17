'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { MagneticButton } from '@/components/common/MagneticButton';
import { TechBadge } from '@/components/common/TechBadge';
import {
  ArrowRight,
  Send,
  Github,
  Linkedin,
  Code,
  Mail,
  Sparkles,
} from 'lucide-react';
import Image from 'next/image';

export const HeroSection: React.FC = () => {
  const { personal, techStackBadges, socials } = portfolioData;

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
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-16 px-4 sm:px-8 overflow-hidden bg-ambient-warm"
    >
      {/* Decorative ambient glowing orbs */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-beige/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-16 right-1/4 w-96 h-96 bg-sage/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* LEFT COLUMN: Editorial Typography & Intro (Col 7) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-6"
        >
          {/* Top Numeric Pill & Role Tag - Inspired by Pinterest reference indicator */}
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center rounded-full bg-cream border border-coffee/20 px-3 py-1 shadow-2xs">
              <span className="text-xs font-bold text-forest">01</span>
              <span className="text-xs text-coffee/40 mx-1.5">/</span>
              <span className="text-xs text-coffee-light">03</span>
            </div>

            <span className="text-xs sm:text-sm font-medium tracking-wide uppercase text-forest font-sans flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-forest" />
              MERN Stack Developer
            </span>
          </div>

          {/* Huge Editorial Display Headline */}
          <div className="space-y-1">
            <p className="font-serif italic text-lg sm:text-2xl text-coffee">
              Hi, I&apos;m
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-coffee-darker leading-[1.08]">
              {personal.name}
            </h1>
          </div>

          {/* Designation & Tech Stack Badges */}
          <div className="space-y-3 pt-1">
            <h2 className="text-lg sm:text-xl font-medium text-coffee-light font-sans">
              MERN Stack Developer & Full-Stack Systems Engineer
            </h2>
            <div className="flex flex-wrap gap-2 pt-1">
              {techStackBadges.map((badge) => (
                <TechBadge key={badge} label={badge} variant="secondary" size="sm" />
              ))}
            </div>
          </div>

          {/* Professional Introduction from Resume */}
          <p className="text-sm sm:text-base text-ink-muted leading-relaxed font-sans max-w-xl">
            Computer Science Engineering student and full-stack developer with experience building responsive, scalable web applications and enterprise content-management systems using React, Next.js, TypeScript, Node.js, and Express.js.
          </p>

          {/* Dual CTAs & Social Links */}
          <div className="pt-2 space-y-5">
            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton
                variant="primary"
                href="#projects"
                className="gap-2 px-7 py-3.5"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>

              <MagneticButton
                variant="outline"
                href="#contact"
                className="gap-2 px-7 py-3.5"
              >
                <span>Contact Me</span>
                <Send className="w-4 h-4" />
              </MagneticButton>
            </div>

            {/* Social Connect Icons */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs uppercase tracking-wider text-coffee-light font-semibold mr-1">
                Connect:
              </span>
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
                    className="w-9 h-9 rounded-full bg-cream hover:bg-beige text-coffee-dark hover:text-coffee-darker flex items-center justify-center border border-coffee/20 shadow-2xs transition-all hover:scale-105"
                    aria-label={social.label}
                    title={isMail ? `Send Email to ${personal.email} (Opens Gmail)` : social.label}
                  >
                    {getSocialIcon(social.iconName)}
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Pure Anime Portrait Without Frame (Col 5) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex justify-center lg:justify-end relative items-center"
        >
          {/* Soft ambient warm glow behind the character */}
          <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-beige/50 blur-3xl pointer-events-none -z-10" />

          {/* Pure Photo Container - No frame, no box border, no badges */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[460px] aspect-[1024/983] flex items-center justify-center select-none"
          >
            <Image
              src={personal.profileImage}
              alt={personal.name}
              fill
              priority
              className="object-contain object-bottom drop-shadow-[0_20px_35px_rgba(112,69,43,0.16)] hover:scale-102 transition-transform duration-500"
              sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 460px"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
