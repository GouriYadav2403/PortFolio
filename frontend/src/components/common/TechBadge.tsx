'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TechBadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'forest' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
}

export const TechBadge: React.FC<TechBadgeProps> = ({
  label,
  variant = 'secondary',
  size = 'md',
  className,
  icon,
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1 gap-1.5',
    md: 'text-xs sm:text-sm px-3.5 py-1.5 gap-2',
    lg: 'text-sm sm:text-base px-4 py-2 gap-2.5',
  };

  const variantClasses = {
    primary:
      'bg-forest text-cream font-medium shadow-sm border border-forest-light hover:bg-forest-light',
    secondary:
      'bg-beige/60 text-coffee-dark border border-coffee/20 hover:border-coffee/40 hover:bg-beige transition-colors',
    forest:
      'bg-forest/10 text-forest border border-forest/20 hover:bg-forest/20',
    outline:
      'bg-cream/80 text-coffee-dark border border-coffee/30 hover:border-coffee',
  };

  return (
    <motion.span
      whileHover={{ y: -2, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={cn(
        'inline-flex items-center rounded-full font-sans transition-all duration-200 select-none cursor-default',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {icon && <span className="text-current shrink-0">{icon}</span>}
      <span>{label}</span>
    </motion.span>
  );
};
