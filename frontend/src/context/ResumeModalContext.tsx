'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ResumeModal } from '@/components/common/ResumeModal';

interface ResumeModalContextType {
  isOpen: boolean;
  openResumeModal: () => void;
  closeResumeModal: () => void;
}

const ResumeModalContext = createContext<ResumeModalContextType | undefined>(undefined);

export const ResumeModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openResumeModal = () => setIsOpen(true);
  const closeResumeModal = () => setIsOpen(false);

  return (
    <ResumeModalContext.Provider value={{ isOpen, openResumeModal, closeResumeModal }}>
      {children}
      <ResumeModal isOpen={isOpen} onClose={closeResumeModal} />
    </ResumeModalContext.Provider>
  );
};

export const useResumeModal = () => {
  const context = useContext(ResumeModalContext);
  if (!context) {
    throw new Error('useResumeModal must be used within a ResumeModalProvider');
  }
  return context;
};
