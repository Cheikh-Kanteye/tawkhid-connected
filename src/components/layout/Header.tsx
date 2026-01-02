'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  User,
  LogOut,
  Settings,
  Home,
  Play,
  Users,
  Calendar,
  MessageCircle,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const publicNavItems: NavItem[] = [
  { label: 'Accueil', href: '/', icon: <Home className="w-4 h-4" /> },
  { label: 'À propos', href: '/about', icon: <Users className="w-4 h-4" /> },
];

const memberNavItems: NavItem[] = [
  { label: 'Tableau de bord', href: '/dashboard', icon: <Home className="w-4 h-4" /> },
  { label: 'Contenus', href: '/contents', icon: <Play className="w-4 h-4" /> },
  { label: 'Associations', href: '/associations', icon: <Users className="w-4 h-4" /> },
  { label: 'Événements', href: '/events', icon: <Calendar className="w-4 h-4" /> },
  { label: 'Questions', href: '/questions', icon: <MessageCircle className="w-4 h-4" /> },
];

interface HeaderProps {
  isAuthenticated?: boolean;
  user?: {
    name: string;
    avatar?: string;
  };
}

export function Header({ isAuthenticated = false, user }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = isAuthenticated ? memberNavItems : publicNavItems;

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Main Header */}
      <div className="header-islamic">
        {/* Pattern Overlay */}
        <div className="pattern-overlay" />

        <div className="relative container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <span className="text-white font-bold text-lg font-display">ت</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-white">Tawhid Connected</h1>
                <p className="text-xs text-white/70">Communauté Musulmane</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                    pathname === item.href
                      ? 'bg-white/20 text-white'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  )}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 p-1 rounded-full hover:bg-white/10 transition-colors">
                      <Avatar className="w-8 h-8 border-2 border-white/30">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback className="bg-secondary text-neutral-dark text-xs">
                          {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden sm:block text-sm text-white font-medium">
                        {user?.name}
                      </span>
                      <ChevronDown className="w-4 h-4 text-white/70" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <User className="w-4 h-4 mr-2" />
                        Mon profil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile/settings" className="cursor-pointer">
                        <Settings className="w-4 h-4 mr-2" />
                        Paramètres
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-error cursor-pointer">
                      <LogOut className="w-4 h-4 mr-2" />
                      Déconnexion
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="hidden sm:flex items-center gap-3">
                  <Button variant="ghost" asChild className="text-white hover:bg-white/10">
                    <Link href="/login">Connexion</Link>
                  </Button>
                  <Button variant="secondary" asChild>
                    <Link href="/register">S&apos;inscrire</Link>
                  </Button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b shadow-lg">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all',
                  pathname === item.href
                    ? 'bg-primary/10 text-primary'
                    : 'text-neutral-dark hover:bg-neutral-cream'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}

            {!isAuthenticated && (
              <div className="pt-4 border-t mt-4 space-y-2">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/login">Connexion</Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link href="/register">S&apos;inscrire</Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
