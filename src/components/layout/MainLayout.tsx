
import React from 'react';
import BottomNav from './BottomNav';

interface MainLayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
}

export default function MainLayout({ children, hideNav = false }: MainLayoutProps) {
  return (
    <div className="min-h-screen relative pb-16">
      <main className="container px-4 py-6">
        {children}
      </main>
      {!hideNav && <BottomNav />}
    </div>
  );
}
