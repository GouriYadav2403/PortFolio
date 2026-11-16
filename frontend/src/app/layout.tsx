import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { HeaderBanner } from '@/components/layout/HeaderBanner';
import { BottomNav } from '@/components/layout/BottomNav';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgressBar } from '@/components/common/ScrollProgressBar';
import { ResumeModalProvider } from '@/context/ResumeModalContext';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#263B2D',
};

export const metadata: Metadata = {
  title: 'Gouri Yadav — MERN Stack Developer | Full-Stack Systems Engineer',
  description:
    'Personal developer portfolio of Gouri Yadav, MERN Stack Developer with experience building scalable web applications and enterprise content-management systems using Next.js, React, TypeScript, Node.js, and Express.js.',
  keywords: [
    'Gouri Yadav',
    'MERN Stack Developer',
    'Full-Stack Developer',
    'Next.js 16',
    'React Developer',
    'Node.js Developer',
    'Indore Developer',
    'Tyler Content Manager',
    'Media Octus CRM',
  ],
  authors: [{ name: 'Gouri Yadav' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-cream text-ink font-sans antialiased selection:bg-forest selection:text-cream">
        <ResumeModalProvider>
          {/* Top Reading Scroll Progress Indicator */}
          <ScrollProgressBar />

          {/* Top Minimal Brand Identity Banner */}
          <HeaderBanner />

          {/* Main Content Area with safe bottom spacing for floating dock */}
          <main className="flex-1 pb-24 md:pb-28">{children}</main>

          {/* Forest Green Footer */}
          <Footer />

          {/* Floating Bottom Navigation Dock */}
          <BottomNav />
        </ResumeModalProvider>
      </body>
    </html>
  );
}
