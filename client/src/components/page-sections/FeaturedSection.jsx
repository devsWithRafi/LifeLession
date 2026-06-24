import React, { Suspense } from 'react';
import FeaturedSectionData from './FeaturedSectionData';
import DataLoader from '../Loader';

const FeaturedSection = () => {
  return (
    <section className="w-full p-5 flex flex-col mx-auto max-w-375">
      <div className="py-10 flex flex-col items-center gap-3">
        <h2 className="font-boldonse text-3xl text-center">Featured Life Lessons</h2>
        <p className="text-sm text-muted-foreground font-medium md:max-w-1/2 text-center">
          Hand-picked by our curators for their depth, utility, and resonance.
          Wisdom that transcends time.
        </p>
      </div>
      <Suspense
        fallback={
          <div className="flex items-center justify-center w-full h-150">
            <DataLoader />
          </div>
        }
      >
        <FeaturedSectionData />
      </Suspense>
    </section>
  );
};

export default FeaturedSection;
