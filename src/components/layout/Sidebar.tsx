'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Play,
  Users,
  Calendar,
  MessageCircle,
  User,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

const mainNavItems: NavItem[] = [
  { label: 'Tableau de bord', href: '/dashboard', icon: Home },
  { label: 'Contenus', href: '/contents', icon: Play },
  { label: 'Associations', href: '/associations', icon: Users },
  { label: 'Événements', href: '/events', icon: Calendar },
  { label: 'Questions', href: '/questions', icon: MessageCircle, badge: 3 },
];

const secondaryNavItems: NavItem[] = [
  { label: 'Mon profil', href: '/profile', icon: User },
  { label: 'Paramètres', href: '/profile/settings', icon: Settings },
  { label: 'Aide', href: '/help', icon: HelpCircle },
];

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ isCollapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r transition-all duration-300 z-40',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex flex-col h-full">
        {/* Toggle Button */}
        <button
          onClick={onToggle}
          className="absolute -right-3 top-6 w-6 h-6 rounded-full bg-primary shadow-md flex items-center justify-center text-white hover:bg-primary-light transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>

        {/* Navigation */}
        <ScrollArea className="flex-1 py-4">
          <nav className="px-2 space-y-1">
            {mainNavItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative',
                    isActive
                      ? 'bg-primary text-white shadow-md'
                      : 'text-neutral-gray hover:bg-neutral-cream hover:text-primary',
                    isCollapsed && 'justify-center'
                  )}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {!isCollapsed && (
                    <>
                      <span className="font-medium">{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto bg-secondary text-neutral-dark text-xs font-bold px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                  {isCollapsed && item.badge && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-neutral-dark text-xs font-bold flex items-center justify-center rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="px-4 my-4">
            <Separator />
          </div>

          <nav className="px-2 space-y-1">
            {secondaryNavItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-neutral-gray hover:bg-neutral-cream hover:text-primary',
                    isCollapsed && 'justify-center'
                  )}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {!isCollapsed && <span className="font-medium">{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className={cn(
              'w-full text-error hover:bg-error/10 hover:text-error',
              isCollapsed ? 'px-0' : 'justify-start'
            )}
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span className="ml-3">Déconnexion</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
