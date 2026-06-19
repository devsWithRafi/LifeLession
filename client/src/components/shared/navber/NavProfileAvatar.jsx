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
import Link from 'next/link';

const NAV_LINKS = [
  { path: '/dashboard', name: 'Dashboard' },
  { path: '/dashboard/add-lesson', name: 'Add Lesson' },
  { path: '/dashboard/my-lessons', name: 'My Lessons' },
  { path: '/dashboard/profile', name: 'Profile' },
];

const NavProfileAvatar = ({ user }) => {
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
          <Button variant="destructive" className={'w-full rounded'}>
            Logout
          </Button>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavProfileAvatar;
