import React, { Suspense } from 'react';
import FeaturedSectionData from './FeaturedSectionData';

const FeaturedSection = () => {
  return (
    <section className='w-full p-5 flex flex-col gap-10 mx-auto max-w-375'>
      <Suspense fallback={<div>Loading...</div>}>
        <FeaturedSectionData />
      </Suspense>
    </section>
  );
};

export default FeaturedSection;
