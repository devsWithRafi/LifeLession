'use client';

import { fetchDashboardStates } from '@/actions/apis/fetchDashboardStates';
import { getToken } from '@/lib/auth-client';
import { useEffect, useState } from 'react';
import GrowthChart from './GrowthChart';
import StatCard from './StatCard';
import { BookOpen, Flag, Sparkles, Users } from 'lucide-react';
import Contributors from './Contributor';

const COLOR = {
  lessons: '#6366f1',
  users: '#0ea5e9',
};

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];


const formatDay = (iso) => {
 if (!iso) return '';
 const parts = String(iso).split('-');
 const m = Number(parts[1]);
 const dd = Number(parts[2]);
 return m && dd ? `${MONTHS[m - 1]} ${dd}` : String(iso);
};

const buildCumulative = (arr, key) => {
  let running = 0;
  return (arr ?? []).map((item) => {
    running += item.total ?? 0;
    return { month: formatDay(item._id), [key]: running };
  });
};

const DashboardDataLoader = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const token = await getToken();
      const res = await fetchDashboardStates(token);
      setData(res.data);
    };
    loadData();
  }, []);

  const d = data?.data ?? data ?? {};

  const stats = {
    totalUsers: d.totalUsers ?? 0,
    totalPublicLessons: d.totalPublicLessons ?? 0,
    reportedLessons: d.reportedLessons ?? 0, // not returned by the API yet
    todaysNewLessons: d.todayLessons ?? 0,
  };

  const trends = {
    totalUsers: 0,
    totalPublicLessons: 0,
    reportedLessons: 0,
    todaysNewLessons: 0,
  };

  const lessonGrowth = buildCumulative(d.lessonGrowth, 'lessons');
  const userGrowth = buildCumulative(d.userGrowth, 'users');

  const contributors = (d.contributors ?? []).map((c) => ({
    id: c._id,
    name: c.author?.name ?? 'Unknown',
    email: c.author?.email ?? '',
    image: c.author?.image ?? '',
    lessons: c.lessons ?? 0,
  }));

  return (
    <div className="min-h-screen bg-background text-primary antialiased">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-7">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              Lessons dashboard
            </h1>
            <p className="text-sm text-zinc-500 mt-0.5">
              Overview of community lessons and contributors
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </span>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total users"
            value={stats.totalUsers}
            icon={Users}
            accent={{ bg: 'bg-muted', text: 'text-muted-foreground' }}
            trend={trends.totalUsers}
          />
          <StatCard
            label="Public lessons"
            value={stats.totalPublicLessons}
            icon={BookOpen}
            accent={{ bg: 'bg-muted', text: 'text-muted-foreground' }}
            trend={trends.totalPublicLessons}
          />
          <StatCard
            label="Reported / flagged"
            value={stats.reportedLessons}
            icon={Flag}
            accent={{ bg: 'bg-muted', text: 'text-muted-foreground' }}
            trend={trends.reportedLessons}
            positiveIsGood={false}
          />
          <StatCard
            label="New today"
            value={stats.todaysNewLessons}
            icon={Sparkles}
            accent={{ bg: 'bg-muted', text: 'text-muted-foreground' }}
            trend={trends.todaysNewLessons}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <GrowthChart
            title="Lesson growth"
            subtitle="Cumulative public lessons"
            data={lessonGrowth}
            dataKey="lessons"
            color={COLOR.lessons}
            gradId="gradLessons"
            suffix="lessons"
            total={stats.totalPublicLessons}
          />
          <GrowthChart
            title="User growth"
            subtitle="Cumulative registered users"
            data={userGrowth}
            dataKey="users"
            color={COLOR.users}
            gradId="gradUsers"
            suffix="users"
            total={stats.totalUsers}
          />
        </div>

        {/* Contributors */}
        <div className="mt-4">
          <Contributors data={contributors} />
        </div>
      </div>
    </div>
  );
};

export default DashboardDataLoader;
