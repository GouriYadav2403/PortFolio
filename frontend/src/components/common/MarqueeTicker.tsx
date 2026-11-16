'use client';

import React from 'react';
import { portfolioData } from '@/data/portfolio';
import { Sparkles, Code2, Database, Globe, Layers, Cpu } from 'lucide-react';

export const MarqueeTicker: React.FC = () => {
  const items = [
    { text: 'MERN Stack Developer', icon: <Code2 className="w-4 h-4 text-forest" /> },
    { text: 'Next.js 16 (App Router)', icon: <Globe className="w-4 h-4 text-coffee" /> },
    { text: 'Enterprise CRM Architecture', icon: <Layers className="w-4 h-4 text-sage-dark" /> },
    { text: 'REST API & Microservices', icon: <Cpu className="w-4 h-4 text-forest" /> },
    { text: 'TypeScript & Strong Typing', icon: <Sparkles className="w-4 h-4 text-coffee" /> },
    { text: 'MongoDB & Scoped RBAC', icon: <Database className="w-4 h-4 text-forest" /> },
    { text: 'Real-Time WebSockets', icon: <Code2 className="w-4 h-4 text-sage-dark" /> },
  ];

  // Repeat items for seamless loop
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className="relative w-full py-4 overflow-hidden border-y border-coffee/15 bg-beige/40 backdrop-blur-sm select-none">
      {/* Soft gradient masks on sides */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee space-x-8 items-center">
        {repeated.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 shrink-0 text-sm md:text-base font-serif italic text-coffee-dark tracking-wide"
          >
            <span className="p-1 rounded-full bg-cream shadow-xs border border-coffee/10">
              {item.icon}
            </span>
            <span>{item.text}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-sage mx-3" />
          </div>
        ))}
      </div>
    </div>
  );
};
