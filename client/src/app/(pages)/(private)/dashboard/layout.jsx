import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from '../_components/app-sideber';
import { getUserSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

const DashboardLayout = async ({ children }) => {
  const user = await getUserSession();

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <section>
      <SidebarProvider>
        <AppSidebar />
        <main className="sm:p-8 p-4 w-full flex flex-col gap-5">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </section>
  );
};

export default DashboardLayout;
