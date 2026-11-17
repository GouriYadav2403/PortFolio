'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { portfolioApi } from '@/services/api';
import { ContactFormData } from '@/types';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  Github,
  Linkedin,
  Code,
  Sparkles,
  Copy,
  Check,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { personal, socials } = portfolioData;

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    // Basic frontend validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setErrorMessage('Please enter your full name (at least 2 characters).');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      setErrorMessage('Please enter a subject (at least 3 characters).');
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setErrorMessage('Please enter a detailed message (at least 10 characters).');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await portfolioApi.submitContact(formData);
      setSuccessMessage(
        response.message || 'Your message has been sent successfully to Gouri Yadav!'
      );
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: unknown) {
      const errText =
        err instanceof Error
          ? err.message
          : 'Unable to deliver message right now. Please try again or email directly.';
      setErrorMessage(errText);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-beige/60 border border-coffee/20 text-xs font-semibold uppercase tracking-wider text-coffee">
          <Mail className="w-3.5 h-3.5 text-forest" />
          Get In Touch
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-coffee-darker tracking-tight">
          Let&apos;s Build Together
        </h2>
        <p className="text-sm sm:text-base text-coffee-light max-w-2xl font-sans">
          Interested in discussing a role, technical collaboration, or full-stack opportunity? Send a message directly to my inbox.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* LEFT COLUMN: Contact Cards & Coordinates (Col 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-7 rounded-2xl bg-cream border border-coffee/15 shadow-soft space-y-6">
            <h3 className="font-serif text-xl font-bold text-coffee-darker">
              Contact Coordinates
            </h3>

            {/* Email Card with Direct Gmail Compose & One-Click Copy */}
            <div className="flex items-start justify-between gap-3 p-4 rounded-xl bg-beige/40 border border-coffee/15">
              <div className="flex items-start gap-4 min-w-0">
                <div className="p-3 rounded-lg bg-forest text-cream shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <span className="text-xs uppercase tracking-wider font-semibold text-coffee-light">
                    Email Address
                  </span>
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personal.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm sm:text-base font-bold text-coffee-dark hover:text-forest transition-colors break-all"
                    title="Click to compose message in Gmail"
                  >
                    {personal.email}
                  </a>
                  <span className="text-[11px] text-sage-dark block">
                    Click to open Gmail • Or copy directly
                  </span>
                </div>
              </div>

              {/* Copy Email Button */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className="p-2 sm:px-3 sm:py-2 rounded-lg bg-cream hover:bg-beige border border-coffee/20 text-coffee-dark hover:text-forest transition-all shrink-0 cursor-pointer shadow-2xs text-xs flex items-center gap-1.5"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-forest" />
                    <span className="text-[11px] font-semibold text-forest">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-medium hidden sm:inline">Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Phone Card */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-beige/40 border border-coffee/15">
              <div className="p-3 rounded-lg bg-forest text-cream shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs uppercase tracking-wider font-semibold text-coffee-light">
                  Direct Phone
                </span>
                <a
                  href={`tel:${personal.phone.replace(/[^0-9+]/g, '')}`}
                  className="block text-sm sm:text-base font-bold text-coffee-dark hover:text-forest transition-colors"
                >
                  {personal.phone}
                </a>
                <span className="text-[11px] text-sage-dark block">
                  Available Mon - Sat (IST)
                </span>
              </div>
            </div>

            {/* Location Card */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-beige/40 border border-coffee/15">
              <div className="p-3 rounded-lg bg-forest text-cream shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs uppercase tracking-wider font-semibold text-coffee-light">
                  Primary Location
                </span>
                <p className="text-sm sm:text-base font-bold text-coffee-dark">
                  {personal.location}
                </p>
                <span className="text-[11px] text-sage-dark block">
                  Open to On-Site, Hybrid & Remote Roles
                </span>
              </div>
            </div>

            {/* Social Channels */}
            <div className="pt-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-coffee-light block mb-3">
                Professional Networks
              </span>
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
                      className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cream hover:bg-beige text-coffee-dark border border-coffee/20 text-xs font-medium transition-all hover:scale-102 shadow-2xs"
                      title={isMail ? `Email: ${personal.email} (Opens Gmail)` : social.label}
                    >
                      {getSocialIcon(social.iconName)}
                      <span>{social.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Working REST API Contact Form (Col 7) */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 sm:p-8 rounded-2xl bg-cream border border-coffee/20 shadow-soft space-y-6"
          >
            <div className="space-y-1">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-coffee-darker">
                Send a Direct Message
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted font-sans">
                Integrated directly with the Express backend service delivering to{' '}
                <span className="font-semibold text-forest">
                  {personal.email}
                </span>.
              </p>
            </div>

            {/* Success Alert */}
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-forest/10 border border-forest/30 text-forest text-xs sm:text-sm flex items-start gap-3"
              >
                <CheckCircle className="w-5 h-5 shrink-0 mt-0.5 text-forest" />
                <div>
                  <p className="font-semibold">{successMessage}</p>
                  {/* <p className="text-[11px] text-forest/80 mt-1 font-sans">
                    A copy has been recorded in the database and dispatched via secure mailer.
                  </p> */}
                </div>
              </motion.div>
            )}

            {/* Error Alert */}
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
                <div>
                  <p className="font-semibold">Unable to Send Message</p>
                  <p className="text-xs mt-0.5 text-red-700">{errorMessage}</p>
                </div>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold uppercase tracking-wider text-coffee-dark"
                  >
                    Your Name <span className="text-forest">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl bg-cream-50 border border-coffee/20 text-coffee-dark placeholder:text-coffee-light/50 text-sm focus:outline-none focus:ring-2 focus:ring-forest focus:border-forest transition-all"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold uppercase tracking-wider text-coffee-dark"
                  >
                    Your Email <span className="text-forest">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl bg-cream-50 border border-coffee/20 text-coffee-dark placeholder:text-coffee-light/50 text-sm focus:outline-none focus:ring-2 focus:ring-forest focus:border-forest transition-all"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-semibold uppercase tracking-wider text-coffee-dark"
                >
                  Subject <span className="text-forest">*</span>
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Full-Stack Developer Opportunity"
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-xl bg-cream-50 border border-coffee/20 text-coffee-dark placeholder:text-coffee-light/50 text-sm focus:outline-none focus:ring-2 focus:ring-forest focus:border-forest transition-all"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-semibold uppercase tracking-wider text-coffee-dark"
                >
                  Message <span className="text-forest">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hello Gouri, I came across your portfolio and would love to discuss..."
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-xl bg-cream-50 border border-coffee/20 text-coffee-dark placeholder:text-coffee-light/50 text-sm focus:outline-none focus:ring-2 focus:ring-forest focus:border-forest transition-all resize-y"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-forest text-cream hover:bg-forest-light active:bg-forest-dark border border-forest-light font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
                {isSubmitting && (
                  <p className="text-[11px] text-coffee-light mt-2 font-sans animate-pulse">
                    Connecting to live backend (Render free server wakes up in 20-30s on first request)...
                  </p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
