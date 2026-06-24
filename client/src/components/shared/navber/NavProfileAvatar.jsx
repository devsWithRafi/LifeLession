'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const NAV_LINKS = [
  { path: '/dashboard', name: 'Dashboard' },
  { path: '/dashboard/add-lesson', name: 'Add Lesson' },
  { path: '/dashboard/my-lessons', name: 'My Lessons' },
  { path: '/dashboard/profile', name: 'Profile' },
];

const NavProfileAvatar = ({ user }) => {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={user.image} alt="@shadcn" />
          <AvatarFallback>{user.email.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <h3 className="font-medium font-poppins text-primary text-sm">
              {user?.name}
            </h3>
            <p className="text-xs text-muted-foreground font-poppins">
              {user?.email}
            </p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {NAV_LINKS.map(({ path, name }, index) => (
            <DropdownMenuItem key={index}>
              <Link href={path}>{name}</Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <Button
            onClick={handleLogOut}
            variant="destructive"
            className={'w-full rounded'}
          >
            Logout
          </Button>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavProfileAvatar;
