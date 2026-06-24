import { Suspense } from 'react';
import MostSavedLesson from './MostSavedLesson';
import TopContributors from './TopContributors';
import { Bookmark, Medal } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';

const MostSavedLessonsSection = () => {
  return (
    <section className="w-full mx-auto max-w-375 p-5">
      <div className="flex md:flex-row flex-col gap-5">
        {/* left side */}
        <Suspense fallback={<p>Loading...</p>}>
          <div className="flex flex-col gap-5">
            <h4 className="flex items-center gap-1 font-boldonse text-xl">
              <Bookmark className="size-8" /> Most Saved Lessons
            </h4>
            <div className="w-full flex flex-col gap-5">
              <MostSavedLesson />
            </div>
          </div>
        </Suspense>

        {/* right side */}
        <Suspense fallback={<p>Loading...</p>}>
          <div className="max-h-170 flex flex-col gap-5 md:min-w-100 md:max-w-100 bg-card p-5 rounded-xl">
            <h4 className="flex items-center gap-1 font-boldonse text-sm">
              <Medal className="size-6" /> Top Contributors
            </h4>
            <div className="flex flex-col gap-5 overflow-hidden overflow-y-auto h-full">
              <TopContributors />
            </div>
            <Link
              href={'/dashboard/add-lesson'}
              className={cn(buttonVariants(), "rounded-full h-auto py-2 w-full")}
            >
              Become a Contributor
            </Link>
          </div>
        </Suspense>
      </div>
    </section>
  );
};

export default MostSavedLessonsSection;
