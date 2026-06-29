'use client';

import NavLogo from '@/components/NavLogo';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { buttonVariants } from '@/components/ui/button';
import { useScrollNavBar } from '@/hooks/useScrollNavBar';
import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import { Crown, TextAlignJustify, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavProfileAvatar from './NavProfileAvatar';
import { HiOutlinePlus } from 'react-icons/hi2';
import SubscriptionBadge from '@/components/SubscriptionBadge';
import { useState } from 'react';
import MobileNav from './MobileNav';
import { navLinks } from './navLinks';

const NavTransparent = () => {
  const pathName = usePathname();
  const isScrolled = useScrollNavBar(10);
  const [navMobileOpen, setNavMobileOpen] = useState(false);

  const { data } = authClient.useSession();
  const user = data?.user;
  const isPremium = user?.plan === 'premium' || user?.role === 'admin';

  return (
    pathName === '/' && (
      <header
        className={cn(
          'fixed top-0 w-full z-20 duration-200 ease-in-out',
          (isScrolled || navMobileOpen) && 'bg-background/90 backdrop-blur-md',
        )}
      >
        <nav className="flex items-center justify-between gap-10 md:px-5 px-4 py-5 w-full">
          <div className="flex items-center md:gap-10 gap-3">
            {/* menu button */}
            <button
              onClick={() => setNavMobileOpen((prev) => !prev)}
              className={cn(
                'text-white md:hidden',
                (isScrolled || navMobileOpen) && 'dark:text-white text-black',
              )}
            >
              {navMobileOpen ? (
                <X className="size-6.5" />
              ) : (
                <TextAlignJustify className="size-6" />
              )}
            </button>

            {/* logo */}
            <Link
              href="/"
              className="relative flex items-center md:min-w-40 md:max-w-40 max-w-30"
            >
              <>
                <NavLogo
                  className={cn(
                    'w-full dark:block',
                    isScrolled || navMobileOpen ? 'hidden' : 'block',
                  )}
                  variant="white"
                />
                <NavLogo
                  className={cn(
                    'w-full dark:hidden block',
                    isScrolled || navMobileOpen ? 'block' : 'hidden',
                  )}
                  variant="black"
                />
              </>
            </Link>

            <div className="hidden items-center gap-4 text-sm font-medium text-white/90 md:flex">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.path}
                  className={cn(
                    'transition-colors whitespace-nowrap py-0.5 px-2 border-b border-transparent duration-200 text-white/60 hover:text-white text-sm ',
                    pathName === link.path
                      ? (isScrolled || navMobileOpen) &&
                          'dark:text-white text-black dark:border-white border-black'
                      : (isScrolled || navMobileOpen) &&
                          'dark:text-white/60 text-black/60',
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
              <div className="md:flex hidden items-center gap-1">
                <Link
                  href="/sign-in"
                  className={cn(
                    buttonVariants({
                      variant: isScrolled ? 'default' : 'secondary',
                    }),
                    'h-auto py-2 px-5 rounded-full',
                    !isScrolled && 'dark:bg-gray-200 dark:text-zinc-900',
                  )}
                >
                  Log In
                </Link>
                <Link
                  href="/sign-up"
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'h-auto py-2 px-5 rounded-full bg-transparent',
                    !isScrolled && 'text-white border-white/20',
                  )}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* nav mobile */}
        <MobileNav open={navMobileOpen} user={user} />
      </header>
    )
  );
};

export default NavTransparent;
