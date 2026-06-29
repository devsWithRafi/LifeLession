import { getUserSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import DashboardDataLoader from '../_components/DashboardDataLoader';
import UserDashboardDataLoader from '../_components/UserDashboardDataLoader';

export const metadata = {
  title: 'LifeLesson | Dashboard',
  description: '',
};

export default async function LessonsDashboard() {
  const user = await getUserSession();
  const isAdmin = user?.role === 'admin';

  if (!user) {
    redirect('/sign-in');
  }

  return isAdmin ? <DashboardDataLoader /> : <UserDashboardDataLoader />;
}
