'use client';
import { usePathname, useRouter } from 'next/navigation';
import { navLinks } from './navLinks';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';

const MobileNav = ({ open, user }) => {
  const pathname = usePathname();

  const router = useRouter();

  const handleLogOut = async () => {
    await authClient.signOut({
      callbackUrl: '/sign-in',
      fetchOptions: {
        onSuccess: () => {
          toast.success('Signed out successfully');
          router.push('/sign-in');
        },
        onError: (ctx) => {
          toast.error(ctx.error.message ?? 'An error occurred!');
        },
      },
    });
  };

  return (
    <div className={cn("flex flex-col px-5 text-sm max-h-0 opacity-0 duration-200 ease-in-out overflow-hidden",
       open && "max-h-max opacity-100 py-5 pt-0"
    )}>
      {navLinks.map((item, index) => (
        <Link
          key={index}
          href={item.path}
          className={cn(
            'text-muted-foreground border-b py-2',
            pathname === item.path && 'text-primary',
          )}
        >
          {item.name}
        </Link>
      ))}
      <div className="flex flex-col items-center gap-1 mt-4">
        {!user ? (
          <>
            <Link
              href="/sign-in"
              className={cn(
                buttonVariants({}),
                'px-5 rounded-full w-full text-xs',
              )}
            >
              Log In
            </Link>
            <Link
              href="/sign-up"
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'px-5 rounded-full bg-transparent w-full text-xs',
              )}
            >
              Sign Up
            </Link>
          </>
        ) : (
          <Button onClick={handleLogOut} className="px-5 rounded-full w-full text-xs">LogOut</Button>
        )}
      </div>
    </div>
  );
};

export default MobileNav;
