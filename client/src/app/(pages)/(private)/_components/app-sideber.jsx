'use client';

import Logo from '@/components/Logo';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { LuLayoutDashboard, LuLogOut } from 'react-icons/lu';
import { FaRegHeart } from 'react-icons/fa';
import { RiUserLine } from 'react-icons/ri';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { authClient } from '@/lib/auth-client';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { FaUserGear } from 'react-icons/fa6';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { BookOpen, BookMarked, Flag, Plus } from 'lucide-react';
import { toast } from 'sonner';

const dashboardLinks = [
  { path: '/dashboard', name: 'Overview', icon: LuLayoutDashboard },
  { path: '/dashboard/add-lesson', name: 'Add Lesson', icon: Plus },
  { path: '/dashboard/my-lessons', name: 'My Lessons', icon: BookOpen },
  { path: '/dashboard/my-favorites', name: 'My Favorites', icon: FaRegHeart },
  { path: '/dashboard/profile', name: 'Profile', icon: RiUserLine },
];

const adminDashboardLinks = [
  { path: '/dashboard/manage-users', name: 'Manage Users', icon: FaUserGear },
  {
    path: '/dashboard/manage-lessons',
    name: 'Manage Lessons',
    icon: BookMarked,
  },
  { path: '/dashboard/reported-lessons', name: 'Reported', icon: Flag },
];

const AppSidebar = () => {
  const pathname = usePathname();
  const { state } = useSidebar(); // "expanded" | "collapsed"
  const collapsed = state === 'collapsed';
  const router = useRouter();

  const { data } = authClient.useSession();
  const user = data?.user;
  const isAdmin = user?.role === 'admin';

  const handleSignOut = async () => {
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
    <TooltipProvider delayDuration={0}>
      <Sidebar collapsible="icon">
        {/* ── Header ── */}
        <SidebarHeader className="px-3 py-3">
          <div
            className={cn(
              'flex items-center gap-2',
              collapsed ? 'justify-center' : 'justify-between',
            )}
          >
            {!collapsed && (
              <Link href="/">
                <Logo />
              </Link>
            )}
            <ThemeToggle />
          </div>
        </SidebarHeader>

        <Separator />

        {/* ── Nav links ── */}
        <SidebarContent className="mt-6 px-2">
          <SidebarGroup className="p-0">
            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {dashboardLinks.map((item) => {
                  const active = pathname === item.path;

                  return (
                    <SidebarMenuItem key={item.path}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          {/* SidebarMenuButton handles icon-only vs icon+text automatically */}
                          <SidebarMenuButton
                            asChild
                            isActive={active}
                            className={cn(
                              'gap-3 rounded-sm px-3 py-2 text-sm font-medium transition-colors',
                              'text-muted-foreground hover:bg-muted hover:text-primary',
                              active && 'bg-muted text-primary',
                            )}
                          >
                            <Link href={item.path}>
                              <item.icon size={17} className="shrink-0" />
                              <span>{item.name}</span>
                            </Link>
                          </SidebarMenuButton>
                        </TooltipTrigger>
                        {/* Tooltip only visible when collapsed */}
                        {collapsed && (
                          <TooltipContent side="right">
                            {item.name}
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>

              {isAdmin && <Separator className="my-5" />}

              {isAdmin && (
                <SidebarMenu className="gap-1">
                  {adminDashboardLinks.map((item) => {
                    const active = pathname === item.path;

                    return (
                      <SidebarMenuItem key={item.path}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <SidebarMenuButton
                              asChild
                              isActive={active}
                              className={cn(
                                'gap-3 rounded-sm px-3 py-2 text-sm font-medium transition-colors',
                                'text-muted-foreground hover:bg-muted hover:text-primary',
                                active && 'bg-muted text-primary',
                              )}
                            >
                              <Link href={item.path}>
                                <item.icon size={17} className="shrink-0" />
                                <span>{item.name}</span>
                              </Link>
                            </SidebarMenuButton>
                          </TooltipTrigger>
                          {collapsed && (
                            <TooltipContent side="right">
                              {item.name}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              )}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* ── Footer ── */}
        <SidebarFooter className="px-2 py-3">
          <Separator className="mb-3" />

          {collapsed ? (
            /* Collapsed — avatar only, with tooltip */
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex justify-center">
                  <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-border">
                    <AvatarImage
                      src={user?.image ?? ''}
                      alt={user?.name ?? ''}
                    />
                    <AvatarFallback className="text-xs">
                      {user?.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            /* Expanded — full user card + sign-out */
            <div className="flex items-center justify-between gap-2 rounded-lg bg-muted/50 px-3 py-2">
              <div className="flex items-center gap-2 min-w-0">
                <Avatar className="h-8 w-8 shrink-0 ring-2 ring-border">
                  <AvatarImage src={user?.image ?? ''} alt={user?.name ?? ''} />
                  <AvatarFallback className="text-xs">
                    {user?.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium leading-none">
                    {user?.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground mt-0.5">
                    {user?.email}
                  </p>
                </div>
              </div>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleSignOut}
                    className="shrink-0 rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                  >
                    <LuLogOut size={15} />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top">Sign out</TooltipContent>
              </Tooltip>
            </div>
          )}
        </SidebarFooter>
      </Sidebar>
    </TooltipProvider>
  );
};

export default AppSidebar;
