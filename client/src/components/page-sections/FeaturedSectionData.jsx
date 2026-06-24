import LessonCard from '../card/LessonCard';
import { fetchFeaturedLessons } from '@/actions/apis/fetchFeaturedLessons';
import { Card, CardContent } from '../ui/card';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';

const FeaturedSectionData = async () => {
  const result = await fetchFeaturedLessons();

  if (!result.success) {
    return (
      <Card className="rounded-md h-100 bg-red-500/5 border border-red-500/10">
        <CardContent className="text-red-400 text-center capitalize w-full h-full flex items-center justify-center">
          Error: Failed to fetch featured lessons
        </CardContent>
      </Card>
    );
  }
  const data = Array.isArray(result.data) ? result.data : [];

  return (
    <>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
        {data && data.map((l) => <LessonCard key={l._id} lesson={l} />)}
      </div>
      {data.length > 6 && (
        <Link
          href={'/public-lessons'}
          className={cn(buttonVariants(), 'rounded-full w-50 mx-auto')}
        >
          View all
        </Link>
      )}
    </>
  );
};

export default FeaturedSectionData;
