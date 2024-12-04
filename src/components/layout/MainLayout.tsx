import React from 'react';
import { SideMenu } from './SideMenu';
import { MobileNavigation } from './MobileNavigation';
import { Background } from './Background';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <Background />
      <div className="relative md:pl-72">
        <div className="pb-20 md:pb-0">
          {children}
        </div>
      </div>
      <div className="hidden md:block">
        <SideMenu />
      </div>
      <MobileNavigation />
    </div>
  );
}