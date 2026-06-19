import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from '../_components/app-sideber';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const DashboardLayout = async ({ children }) => {
  const { user } = await auth.api.getSession({
    headers: await headers(),
  });

  if (!user) redirect('/sign-in');
  return (
    <section>
      <SidebarProvider>
        <AppSidebar />
        <main className="sm:p-8 p-5 w-full flex flex-col gap-5">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </section>
  );
};

export default DashboardLayout;
