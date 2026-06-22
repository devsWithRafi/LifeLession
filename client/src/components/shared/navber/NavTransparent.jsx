'use client';

import NavLogo from '@/components/NavLogo';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { buttonVariants } from '@/components/ui/button';
import { useScrollNavBar } from '@/hooks/useScrollNavBar';
import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import { Crown, Search } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavProfileAvatar from './NavProfileAvatar';
import { HiOutlinePlus } from 'react-icons/hi2';
import SubscriptionBadge from '@/components/SubscriptionBadge';

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
  const isPremium = user?.plan === 'premium' || user?.role === 'admin';

  return (
    pathName === '/' && (
      <header
        className={cn(
          'fixed top-0 w-full z-20 duration-200 ease-in-out',
          isScrolled && 'bg-background backdrop-blur-md',
        )}
      >
        <nav className="flex items-center justify-between gap-10 md:px-10 px-4 py-5 w-full">
          <div className="flex items-center gap-10">
            <Link href="/">
              <NavLogo
                className={'md:min-w-40 max-w-40'}
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

          <div className="flex items-center md:gap-4 gap-2">
            {user && (
              <>
                <Link
                  href={'/dashboard/add-lesson'}
                  className={cn(
                    buttonVariants({}),
                    'rounded-full px-3 md:w-auto w-8 md:aspect-auto aspect-square',
                  )}
                >
                  <span className="hidden md:inline">Add Lesson</span>
                  <HiOutlinePlus />
                </Link>

                {!isPremium && (
                  <Link href={'/pricing'}>
                    <SubscriptionBadge
                      hoverMode
                      className="md:py-2 md:px-5 md:max-h-auto rounded-full md:w-auto w-8 p-3 max-h-8 md:aspect-auto aspect-square"
                    >
                      <span className="flex items-center gap-1">
                        <Crown size={16} />
                        <span className="hidden md:inline">Upgrade</span>
                      </span>
                    </SubscriptionBadge>
                  </Link>
                )}
              </>
            )}

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
