"use client"

import {
  Users,
  BookOpen,
  Flag,
  Sparkles,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

/* =========================================================================
   DATA — edit everything below to update the dashboard.
   ========================================================================= */

// Top-line stat cards
const STATS = {
  totalUsers: 12847,
  totalPublicLessons: 3192,
  reportedLessons: 47,
  todaysNewLessons: 28,
};

// Optional month-over-month change (%) shown under each stat.
// For "reportedLessons" a decrease is treated as good (green).
const TRENDS = {
  totalUsers: 8.2,
  totalPublicLessons: 12.4,
  reportedLessons: -3.1,
  todaysNewLessons: 5.0,
};

// Cumulative public lessons over the trailing 12 months
const LESSON_GROWTH = [
  { month: 'Jul', lessons: 1180 },
  { month: 'Aug', lessons: 1420 },
  { month: 'Sep', lessons: 1680 },
  { month: 'Oct', lessons: 1910 },
  { month: 'Nov', lessons: 2160 },
  { month: 'Dec', lessons: 2380 },
  { month: 'Jan', lessons: 2560 },
  { month: 'Feb', lessons: 2710 },
  { month: 'Mar', lessons: 2860 },
  { month: 'Apr', lessons: 2980 },
  { month: 'May', lessons: 3090 },
  { month: 'Jun', lessons: 3192 },
];

// Cumulative users over the trailing 12 months
const USER_GROWTH = [
  { month: 'Jul', users: 6100 },
  { month: 'Aug', users: 6850 },
  { month: 'Sep', users: 7600 },
  { month: 'Oct', users: 8400 },
  { month: 'Nov', users: 9100 },
  { month: 'Dec', users: 9900 },
  { month: 'Jan', users: 10500 },
  { month: 'Feb', users: 11050 },
  { month: 'Mar', users: 11500 },
  { month: 'Apr', users: 11950 },
  { month: 'May', users: 12400 },
  { month: 'Jun', users: 12847 },
];

// Most active contributors (already sorted high → low)
const CONTRIBUTORS = [
  { name: 'Aisha Rahman', handle: '@aisha_r', lessons: 142 },
  { name: 'Marcus Lee', handle: '@marcuslee', lessons: 128 },
  { name: 'Sofia Alvarez', handle: '@sofia.codes', lessons: 115 },
  { name: 'David Okafor', handle: '@dokafor', lessons: 97 },
  { name: 'Priya Nair', handle: '@priya_n', lessons: 86 },
  { name: 'Tom Becker', handle: '@tombecker', lessons: 74 },
];

/* =========================================================================
   THEME TOKENS — chart hex colors (Nova-style indigo / sky accents)
   ========================================================================= */

const COLOR = {
  lessons: '#6366f1', // indigo-500
  users: '#0ea5e9', // sky-500
};

const AVATAR_TINTS = [
  'bg-indigo-100 text-indigo-700',
  'bg-sky-100 text-sky-700',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700',
  'bg-violet-100 text-violet-700',
];

/* =========================================================================
   HELPERS
   ========================================================================= */

const fmt = (n) => n.toLocaleString('en-US');
const compact = (n) =>
  n >= 1000 ? (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + 'k' : '' + n;
const initials = (name) =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

/* =========================================================================
   COMPONENTS
   ========================================================================= */

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
  trend,
  positiveIsGood = true,
}) {
  const up = trend >= 0;
  const good = positiveIsGood ? up : !up;
  const TrendIcon = up ? TrendingUp : TrendingDown;
  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-5">
      <div className="flex items-start justify-between">
        <span className="text-sm text-zinc-500">{label}</span>
        <div
          className={`h-9 w-9 rounded-lg flex items-center justify-center ${accent.bg}`}
        >
          <Icon className={`h-5 w-5 ${accent.text}`} strokeWidth={2} />
        </div>
      </div>
      <div className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900">
        {fmt(value)}
      </div>
      <div className="mt-2 flex items-center gap-1.5 text-xs">
        <span
          className={`inline-flex items-center gap-0.5 font-medium ${
            good ? 'text-emerald-600' : 'text-rose-600'
          }`}
        >
          <TrendIcon className="h-3.5 w-3.5" />
          {up ? '+' : ''}
          {trend}%
        </span>
        <span className="text-zinc-400">vs last month</span>
      </div>
    </div>
  );
}

function ChartTooltip({ active, payload, label, suffix }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="rounded-lg border border-zinc-200 bg-white px-3 py-2 shadow-sm">
      <p className="text-xs text-zinc-500 mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-zinc-900">
        {fmt(payload[0].value)}
        <span className="font-normal text-zinc-500"> {suffix}</span>
      </p>
    </div>
  );
}

function GrowthChart({
  title,
  subtitle,
  data,
  dataKey,
  color,
  gradId,
  suffix,
  total,
}) {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900">{title}</h3>
          <p className="text-xs text-zinc-500 mt-0.5">{subtitle}</p>
        </div>
        <div className="text-right">
          <div className="text-lg font-semibold tracking-tight text-zinc-900">
            {fmt(total)}
          </div>
          <div className="text-xs text-zinc-400">total</div>
        </div>
      </div>
      <div className="h-60 -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.22} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#f4f4f5" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: '#a1a1aa' }}
              dy={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={36}
              tick={{ fontSize: 12, fill: '#a1a1aa' }}
              tickFormatter={compact}
            />
            <Tooltip
              cursor={{ stroke: '#e4e4e7', strokeWidth: 1 }}
              content={<ChartTooltip suffix={suffix} />}
            />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              fill={`url(#${gradId})`}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Contributors({ data }) {
  const max = Math.max(...data.map((d) => d.lessons));
  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-5">
      <div className="mb-1">
        <h3 className="text-sm font-semibold text-zinc-900">
          Most active contributors
        </h3>
        <p className="text-xs text-zinc-500 mt-0.5">
          Ranked by published public lessons
        </p>
      </div>
      <ul className="mt-2">
        {data.map((c, i) => (
          <li
            key={c.handle}
            className="flex items-center gap-4 py-3 border-b border-zinc-100 last:border-0"
          >
            <span className="w-4 text-sm font-medium text-zinc-400 tabular-nums">
              {i + 1}
            </span>
            <div
              className={`h-9 w-9 shrink-0 rounded-full flex items-center justify-center text-xs font-semibold ${
                AVATAR_TINTS[i % AVATAR_TINTS.length]
              }`}
            >
              {initials(c.name)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-zinc-900 truncate">
                  {c.name}
                </p>
                <p className="text-sm font-semibold text-zinc-900 tabular-nums">
                  {c.lessons}
                  <span className="font-normal text-zinc-400"> lessons</span>
                </p>
              </div>
              <div className="mt-1.5 h-1.5 w-full rounded-full bg-zinc-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-indigo-500"
                  style={{ width: `${(c.lessons / max) * 100}%` }}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* =========================================================================
   PAGE
   ========================================================================= */

export default function LessonsDashboard() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 antialiased">
      <div className="max-w-7xl mx-auto px-5 py-8 sm:px-8">
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
          <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Live
          </span>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total users"
            value={STATS.totalUsers}
            icon={Users}
            accent={{ bg: 'bg-indigo-50', text: 'text-indigo-600' }}
            trend={TRENDS.totalUsers}
          />
          <StatCard
            label="Public lessons"
            value={STATS.totalPublicLessons}
            icon={BookOpen}
            accent={{ bg: 'bg-sky-50', text: 'text-sky-600' }}
            trend={TRENDS.totalPublicLessons}
          />
          <StatCard
            label="Reported / flagged"
            value={STATS.reportedLessons}
            icon={Flag}
            accent={{ bg: 'bg-amber-50', text: 'text-amber-600' }}
            trend={TRENDS.reportedLessons}
            positiveIsGood={false}
          />
          <StatCard
            label="New today"
            value={STATS.todaysNewLessons}
            icon={Sparkles}
            accent={{ bg: 'bg-emerald-50', text: 'text-emerald-600' }}
            trend={TRENDS.todaysNewLessons}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <GrowthChart
            title="Lesson growth"
            subtitle="Cumulative public lessons"
            data={LESSON_GROWTH}
            dataKey="lessons"
            color={COLOR.lessons}
            gradId="gradLessons"
            suffix="lessons"
            total={LESSON_GROWTH[LESSON_GROWTH.length - 1].lessons}
          />
          <GrowthChart
            title="User growth"
            subtitle="Cumulative registered users"
            data={USER_GROWTH}
            dataKey="users"
            color={COLOR.users}
            gradId="gradUsers"
            suffix="users"
            total={USER_GROWTH[USER_GROWTH.length - 1].users}
          />
        </div>

        {/* Contributors */}
        <div className="mt-4">
          <Contributors data={CONTRIBUTORS} />
        </div>
      </div>
    </div>
  );
}
