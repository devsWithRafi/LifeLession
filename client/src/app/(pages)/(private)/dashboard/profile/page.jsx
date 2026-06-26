import { getUserSession } from '@/lib/auth';
import AdminProfile from './_component/(admin)/AdminProfile';
import UserProfile from './_component/(user)/UserProfile';

export default async function AdminPage() {
  const user = await getUserSession();
  const isAdmin = user?.role === 'admin';

  return <>{isAdmin ? <AdminProfile /> : <UserProfile />}</>;
}
