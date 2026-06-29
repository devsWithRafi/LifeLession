'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Bookmark, BookOpen, Heart, Plus, TrendingUp } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';
import { getToken, useSession } from '@/lib/auth-client';
import { fetchUserDashboardStates } from '@/actions/apis/fetchUserDashboardStates';
import { toast } from 'sonner';
import { formateNumber } from '@/lib/formateNumber';
import LessonCard from '@/components/card/LessonCard';
import { FaRegHeart } from 'react-icons/fa';
import { RiUserLine } from 'react-icons/ri';
import Link from 'next/link';
import { MdArrowForwardIos } from 'react-icons/md';
import { Spinner } from '@/components/ui/spinner';
import PageLoader from '@/components/PageLoader';

const chartConfig = {
  lessons: {
    label: 'Lessons Created',
    color: 'hsl(var(--chart-2))',
  },
  saves: {
    label: 'Saves Received',
    color: 'hsl(var(--chart-1))',
  },
};

const quickActionLinks = [
  {
    path: '/dashboard/add-lesson',
    name: 'Create New Lesson',
    description: 'Share a new insight',
    icon: Plus,
  },
  {
    path: '/dashboard/my-lessons',
    name: 'My Lessons',
    description: 'Manage your content',
    icon: BookOpen,
  },
  {
    path: '/dashboard/my-favorites',
    name: 'My Favorites',
    description: 'Saved for later',
    icon: FaRegHeart,
  },
  {
    path: '/dashboard/profile',
    name: 'Profile',
    description: 'Photo, name, bio, setting',
    icon: RiUserLine,
  },
];

const UserDashboardDataLoader = () => {
  const [fetching, startFetching] = useTransition();
  const [stateData, setStateData] = useState({});
  const { data: session } = useSession();
  const user = session?.user;
  const isUser = user?.role === 'user';

  const fetchUsersDashboardData = () => {
    startFetching(async () => {
      const token = await getToken();
      const res = await fetchUserDashboardStates(token);
      console.log(res);
      if (res.success) {
        setStateData(res.data);
      } else {
        toast.error(res.message || 'User dashboard data load failed!');
        return;
      }
    });
  };

  useEffect(() => {
    if (isUser) {
      fetchUsersDashboardData();
    }
  }, [isUser]);

  const chartData = stateData?.weeklyActivity || [];

  const states = [
    {
      title: 'Lessons Created',
      icon: <BookOpen className="size-5" />,
      value: formateNumber(stateData?.stats?.totalLessonsCreated),
      growth: 'Lessons created in this week',
    },
    {
      title: 'Saved by You',
      icon: <Bookmark className="size-5" />,
      value: formateNumber(stateData?.stats?.totalSavedByMe),
      growth: 'Saved valuabe insights',
    },
    {
      title: 'Total Reactions',
      icon: <Heart className="size-5" />,
      value: formateNumber(stateData?.stats?.totalReactions),
      growth: 'Reactions received in this week',
    },
    {
      title: 'Added This Month',
      icon: <TrendingUp className="size-5" />,
      value: formateNumber(stateData?.stats?.newLessonsThisMonth.length),
      growth: 'New insights shared',
    },
  ];

  return (
    <section className="w-full min-h-[calc(100vh-100px)] flex flex-col gap-5 relative">
      {fetching ? (
        <PageLoader className="w-full h-[calc(100vh-200px)]" />
      ) : (
        <>
          <span>
            <h2 className="font-boldonse sm:text-2xl text-xl">
              Welcome, {user?.name}
            </h2>
            <p className="text-muted-foreground font-medium md:max-w-1/2 mt-2 sm:text-sm text-xs">
              Here is what is happening with your lessons this week.
            </p>
          </span>

          {/* states */}
          <div className="w-full grid md:grid-cols-4 grid-cols-2 gap-5">
            {states.map((item, index) => (
              <Card key={index}>
                <CardHeader className="flex items-center justify-between gap-5">
                  <CardTitle className="uppercase text-muted-foreground text-sm">
                    {item.title}
                  </CardTitle>
                  <span className="bg-muted text-muted-foreground p-2 rounded-lg">
                    {item.icon}
                  </span>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-2xl font-semibold">
                    {item.value}
                  </CardTitle>
                  <CardDescription className="mt-3 font-normal">
                    {item.growth}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* charts */}
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 items-center">
            <Card className="lg:col-span-2 h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">
                  Weekly Activity
                </CardTitle>

                <span className="text-sm text-muted-foreground">
                  Jun 22 — Jun 28, 2025
                </span>
              </CardHeader>

              <CardContent>
                <ChartContainer
                  config={chartConfig}
                  className="h-[320px] w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={chartData}
                      margin={{
                        top: 20,
                        right: 10,
                        left: -15,
                        bottom: 20,
                      }}
                    >
                      <defs>
                        <linearGradient
                          id="fillSaves"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="currentColor"
                            stopOpacity={0.15}
                          />
                          <stop
                            offset="95%"
                            stopColor="currentColor"
                            stopOpacity={0}
                          />
                        </linearGradient>

                        <linearGradient
                          id="fillLessons"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="currentColor"
                            stopOpacity={0.08}
                          />
                          <stop
                            offset="95%"
                            stopColor="currentColor"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        vertical={true}
                        strokeDasharray="3 3"
                        stroke="hsl(var(--border))"
                      />

                      <XAxis dataKey="day" tickLine={false} axisLine={false} />

                      <YAxis tickLine={false} axisLine={false} width={30} />

                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent />}
                      />

                      <Area
                        dataKey="saves"
                        type="natural"
                        stroke="currentColor"
                        className="text-primary"
                        fill="url(#fillSaves)"
                        strokeWidth={3}
                      />

                      <Area
                        dataKey="lessons"
                        type="natural"
                        stroke="currentColor"
                        className="text-muted-foreground"
                        fill="url(#fillLessons)"
                        strokeWidth={3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>

                <div className="mt-6 flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-primary" />
                    <span className="text-muted-foreground">
                      Lessons Created
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-muted-foreground" />
                    <span className="text-muted-foreground">
                      Saves Received
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {quickActionLinks.map((item, index) => (
                  <Link
                    key={index}
                    href={item.path}
                    className="flex items-center gap-3 w-full hover:bg-muted group p-4 rounded-md duration-200"
                  >
                    <span className="bg-muted p-2 aspect-square text-muted-foreground rounded-lg duration-200 group-hover:bg-muted-foreground group-hover:text-primary">
                      <item.icon className="size-5 " />
                    </span>
                    <span className="flex items-center gap-5 justify-between w-full">
                      <span>
                        <CardTitle>{item.name}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </span>
                      <MdArrowForwardIos className="size-5 text-muted-foreground opacity-0 group-hover:opacity-100 duration-200" />
                    </span>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* recently added */}
          <h3 className="text-lg font-semibold my-5">Recently Added</h3>
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
            {stateData?.stats?.newLessonsThisMonth &&
              stateData?.stats?.newLessonsThisMonth.length > 0 &&
              stateData?.stats?.newLessonsThisMonth.map((lesson) => (
                <LessonCard key={lesson._id} lesson={lesson} />
              ))}
          </div>
        </>
      )}
    </section>
  );
};

export default UserDashboardDataLoader;
