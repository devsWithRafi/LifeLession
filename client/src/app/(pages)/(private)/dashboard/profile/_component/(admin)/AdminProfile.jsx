import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Award,
  BookOpen,
  Calendar,
  Camera,
  Check,
  Edit3,
  Eye,
  Mail,
  Shield,
  Users,
  X,
  Zap,
} from 'lucide-react';
import ActivityItem from './ActivityItem';
import StatCard from './StatCard';
import ProfileSetting from './ProfileSetting';
import ProfileHeader from './ProfileHeader';

const AdminProfile = () => {
  const recentActivity = [
    {
      action: 'Kindness is an underestimated strength',
      type: 'approve',
      time: '2 hours ago',
    },
    {
      action: 'Resilience in modern relationships',
      type: 'publish',
      time: '5 hours ago',
    },
    {
      action: 'Toxic productivity habits explained',
      type: 'edit',
      time: 'Yesterday, 3:40 PM',
    },
    {
      action: 'Spam submission from anonymous user',
      type: 'remove',
      time: 'Yesterday, 11:00 AM',
    },
    {
      action: 'Growth mindset for beginners',
      type: 'approve',
      time: '2 days ago',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground w-full">
      {/* Top accent bar */}
      <div className="max-w-300 mx-auto py-8 space-y-6">
        {/* Hero profile card */}
        <ProfileHeader />

        {/* Stats grid */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Activity Summary
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard
              icon={BookOpen}
              label="Lessons Moderated"
              value="142"
              color="bg-violet-500/10 text-violet-500"
              trend="+12%"
            />
            <StatCard
              icon={Zap}
              label="Actions Taken"
              value="389"
              color="bg-amber-500/10 text-amber-500"
              trend="+8%"
            />
            <StatCard
              icon={Users}
              label="Users Managed"
              value="67"
              color="bg-blue-500/10 text-blue-500"
            />
            <StatCard
              icon={Eye}
              label="Content Views"
              value="14.2k"
              color="bg-emerald-500/10 text-emerald-500"
              trend="+24%"
            />
          </div>
        </div>

        {/* Bottom two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Recent Activity */}
          <Card className="lg:col-span-3 p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-foreground">Recent Activity</h3>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                {recentActivity.length} recent
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Your latest moderation and publishing actions
            </p>
            <div className="divide-y divide-border">
              {recentActivity.map((item, i) => (
                <ActivityItem key={i} {...item} />
              ))}
            </div>
          </Card>

          {/* Profile settings + account info */}
          <ProfileSetting />
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
