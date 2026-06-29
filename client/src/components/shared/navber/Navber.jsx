'use client';

import NavLogo from '@/components/NavLogo';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { buttonVariants } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import { Crown, TextAlignJustify, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiOutlinePlus } from 'react-icons/hi2';
import NavProfileAvatar from './NavProfileAvatar';
import SubscriptionBadge from '@/components/SubscriptionBadge';
import { navLinks } from './navLinks';
import { useState } from 'react';
import MobileNav from './MobileNav';

const Navber = () => {
  const pathName = usePathname();
  const { data } = authClient.useSession();
  const user = data?.user;
  const isPremium = user?.plan === 'premium' || user?.role === 'admin';
  const [navMobileOpen, setNavMobileOpen] = useState(false);

  return (
    pathName !== '/' && (
      <header className="fixed top-0 w-full z-20 duration-200 ease-in-out bg-background/90 backdrop-blur-md">
        <nav className="flex items-center justify-between gap-4 md:px-10 px-4 py-5 w-full">
          <div className="flex items-center md:gap-10 gap-3">
            {/* menu button */}
            <button
              onClick={() => setNavMobileOpen((prev) => !prev)}
              className={cn('text-primary md:hidden')}
            >
              {navMobileOpen ? (
                <X className="size-6.5" />
              ) : (
                <TextAlignJustify className="size-6" />
              )}
            </button>

            <Link
              href="/"
              className="relative flex items-center md:min-w-40 md:max-w-40 max-w-30"
            >
              <NavLogo
                className={'w-full hidden dark:inline'}
                variant="white"
              />
              <NavLogo
                className={'w-full inline dark:hidden'}
                variant="black"
              />
            </Link>

            <div className="hidden items-center gap-4 text-sm font-medium text-white/90 lg:flex">
              {navLinks.map((link, index) => (
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

              <ThemeToggle />

              {user ? (
                <NavProfileAvatar user={user} />
              ) : (
                <div className="md:flex hidden items-center gap-1">
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
                      'h-auto py-2 px-5 rounded-full bg-transparent',
                    )}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* nav mobile */}
        <MobileNav open={navMobileOpen} user={user} />
      </header>
    )
  );
};

export default Navber;
