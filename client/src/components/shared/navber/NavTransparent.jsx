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

const NavTransparent = () => {
  const pathName = usePathname();
  const isScrolled = useScrollNavBar(10);
  const { theme } = useTheme();

  return (
    pathName === '/' && (
      <header
        className={cn(
          'fixed top-0 w-full z-20 duration-200 ease-in-out',
          isScrolled && 'bg-background backdrop-blur-md',
        )}
      >
        <nav className="flex items-center justify-between gap-4 px-10 py-5 w-full">
          <div className="flex items-center gap-10">
            <Link href="/">
              <NavLogo
                className={'w-40'}
                variant={
                  isScrolled ? (theme === 'light' ? 'black' : 'white') : 'white'
                }
              />
            </Link>
            <div className="hidden items-center gap-4 text-sm font-medium text-white/90 lg:flex">
              {NAV_LINKS.map((link, index) => (
                <Link
                  key={index}
                  href={link.path}
                  className={cn(
                    'transition-colors py-0.5 px-2 border-b border-transparent duration-200',
                    pathName === link.path
                      ? isScrolled &&
                          (theme === 'light'
                            ? 'border-black text-black'
                            : 'border-white text-white')
                      : isScrolled && theme === 'light'
                        ? 'hover:text-black text-black/70'
                        : 'hover:text-white text-white/70',
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block w-100">
              <Search
                className={cn(
                  'pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground',
                  !isScrolled && "text-white/70"
                )}
              />
              <Input
                placeholder="Search destination..."
                className={cn(
                  'pl-8 rounded-full py-2 w-full',
                  !isScrolled &&
                    'text-white placeholder:text-white/70 border-white/20',
                )}
              />
            </div>

            <ThemeToggle className={!isScrolled && 'border-white/20 text-white/70'}/>

            <div className="flex items-center gap-1">
              <Link
                href="/auth/sign-in"
                className={cn(
                  buttonVariants({
                    variant: isScrolled ? 'default' : 'secondary',
                  }),
                  'h-auto py-2 px-5 rounded-full',
                  theme === 'dark' &&
                    !isScrolled &&
                    'bg-gray-200 text-zinc-900',
                )}
              >
                Log In
              </Link>
              <Link
                href="/auth/sign-up"
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'h-auto py-2 px-5 rounded-full bg-transparent',
                  theme === 'light' &&
                    !isScrolled &&
                    'text-white border-white/20',
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

export default NavTransparent;
