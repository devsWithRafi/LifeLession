'use client';

import NavLogo from '@/components/NavLogo';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useScrollNavBar } from '@/hooks/useScrollNavBar';
import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavProfileAvatar from './NavProfileAvatar';
import { HiOutlinePlus } from 'react-icons/hi2';

const NAV_LINKS = [
  { path: '/', name: 'Home' },
  { path: '/public-lessons', name: 'Public Lessons' },
  { path: '/pricing', name: 'Pricing' },
];

const NavTransparent = () => {
  const pathName = usePathname();
  const isScrolled = useScrollNavBar(10);
  const { theme } = useTheme();

  const { data } = authClient.useSession();
  const user = data?.user;

  return (
    pathName === '/' && (
      <header
        className={cn(
          'fixed top-0 w-full z-20 duration-200 ease-in-out',
          isScrolled && 'bg-background backdrop-blur-md',
        )}
      >
        <nav className="flex items-center justify-between gap-10 px-10 py-5 w-full">
          <div className="flex items-center gap-10">
            <Link href="/">
              <NavLogo
                className={'min-w-40 max-w-40'}
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
                    'transition-colors whitespace-nowrap py-0.5 px-2 border-b border-transparent duration-200',
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

          <div className="relative hidden md:block w-full">
            <Search
              className={cn(
                'pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground',
                !isScrolled && 'text-white/70',
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

          <div className="flex items-center gap-4">
            <Link href={'/add-lession'} className={cn(buttonVariants({}))}>
              Add Lesson
              <HiOutlinePlus />
            </Link>

            <ThemeToggle
              className={!isScrolled && 'border-white/20 text-white/70'}
            />

            {user ? (
              <NavProfileAvatar user={user} />
            ) : (
              <div className="flex items-center gap-1">
                <Link
                  href="/sign-in"
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
                  href="/sign-up"
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
            )}
          </div>
        </nav>
      </header>
    )
  );
};

export default NavTransparent;
