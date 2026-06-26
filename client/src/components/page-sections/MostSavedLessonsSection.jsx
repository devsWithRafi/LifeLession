import { Suspense } from 'react';
import MostSavedLesson from './MostSavedLesson';
import TopContributors from './TopContributors';

const MostSavedLessonsSection = () => {
  return (
    <section className="w-full mx-auto max-w-375 p-5">
      <div className="flex md:flex-row flex-col gap-5 md:h-180">
        {/* left side */}
        <Suspense fallback={<p>Loading...</p>}>
          <MostSavedLesson />
        </Suspense>

        {/* right side */}
        <Suspense fallback={<p>Loading...</p>}>
          <TopContributors />
        </Suspense>
      </div>
    </section>
  );
};

export default MostSavedLessonsSection;
