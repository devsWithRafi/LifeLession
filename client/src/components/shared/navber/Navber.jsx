'use client';

import NavLogo from '@/components/NavLogo';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useScrollNavBar } from '@/hooks/useScrollNavBar';
import { cn } from '@/lib/utils';
import { Globe, Search } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NAV_LINKS = [
  { path: '/', name: 'Home', access: 'public' },
  { path: '/public-lessons', name: 'Public Lessons', access: 'public' },
  { path: '/my-lessons', name: 'My Lessons', access: 'private' },
  { path: '/dashboard/favorites', name: 'Favorites', access: 'Private' },
];

const Navber = () => {
  const pathName = usePathname();
  const { theme } = useTheme();

  return (
    pathName !== '/' && (
      <header className="fixed top-0 w-full z-20 duration-200 ease-in-out bg-background/90 backdrop-blur-md">
        <nav className="flex items-center justify-between gap-4 px-10 py-5 w-full">
          <div className="flex items-center gap-10">
            <Link href="/">
              <NavLogo
                className={'w-40'}
                variant={theme === 'light' ? 'black' : 'white'}
              />
            </Link>
            <div className="hidden items-center gap-4 text-sm font-medium text-white/90 lg:flex">
              {NAV_LINKS.map((link, index) => (
                <Link
                  key={index}
                  href={link.path}
                  className={cn(
                    'transition-colors text-muted-foreground py-0.5 px-2 border-b border-transparent duration-200',
                    pathName === link.path && 'border-primary text-primary',
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block w-100">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search destination..."
                className="pl-8 rounded-full h-auto py-1.5 w-full"
              />
            </div>

            <ThemeToggle />

            <div className="flex items-center gap-1">
              <Link
                href="/sign-in"
                className={cn(
                  buttonVariants(),
                  'h-auto py-2 px-5 rounded-full',
                )}
              >
                Log In
              </Link>
              <Link
                href="/sign-up"
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'h-auto py-2 px-5 rounded-full',
                )}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </nav>
      </header>
    )
  );
};

export default Navber;
