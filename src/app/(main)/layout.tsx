'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

// Mock user data (replace with actual auth state)
const mockUser = {
  name: 'Amadou Diallo',
  avatar: undefined,
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-cream">
      <Header isAuthenticated={true} user={mockUser} />

      <div className="flex flex-1">
        {/* Sidebar - Hidden on mobile */}
        <div className="hidden lg:block">
          <Sidebar
            isCollapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </div>

        {/* Main Content */}
        <main
          className={cn(
            'flex-1 min-h-[calc(100vh-4rem)] transition-all duration-300',
            'lg:ml-64',
            sidebarCollapsed && 'lg:ml-16'
          )}
        >
          <div className="container mx-auto px-4 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
