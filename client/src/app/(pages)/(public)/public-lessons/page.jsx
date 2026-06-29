import { Suspense } from 'react';
import LessonList from './LessonList';
import SearchContainer from './SearchContainer';
import { Spinner } from '@/components/ui/spinner';

export const dynamic = 'force-dynamic';


export const metadata = {
  title: 'LifeLessons | Community Wisdom',
  description: '',
};

const PublicLessons = async ({ searchParams }) => {
  const query = await searchParams;

  return (
    <section className="w-full max-w-375 mx-auto p-5 mt-20 flex flex-col sm:gap-10 gap-5 min-h-screen">
      <span>
        <h2 className="font-boldonse sm:text-3xl text-xl">Community Wisdom</h2>
        <p className="text-muted-foreground font-medium md:max-w-1/2 mt-2 sm:text-sm text-xs">
          Explore lessons from around the world. A curated sanctuary of
          insights, reflections, and growth pathways shared by our community.
        </p>
      </span>

      {/* search */}
      <SearchContainer />

      {/* lessons */}
      <Suspense
        fallback={
          <div className="flex items-center gap-1 justify-center h-70 text-muted-foreground text-sm">
            <Spinner /> Loading...
          </div>
        }
      >
        <LessonList query={query} />
      </Suspense>
    </section>
  );
};

export default PublicLessons;
