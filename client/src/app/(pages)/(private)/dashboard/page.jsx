import { getUserSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import DashboardDataLoader from '../_components/DashboardDataLoader';

export default async function LessonsDashboard() {
  const user = await getUserSession();
  const isAdmin = user?.role === 'admin';

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <>
      <DashboardDataLoader />
    </>
  );
}
