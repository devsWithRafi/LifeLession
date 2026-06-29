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
        <main className="w-full">
          <div className="w-full sm:px-5 px-4 h-10 flex items-center">
            <SidebarTrigger className={'p-4 text-muted-foreground'}/>
          </div>
          <div className="md:p-5 pt-0 p-4 min-w-full flex flex-col gap-5">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </section>
  );
};

export default DashboardLayout;
