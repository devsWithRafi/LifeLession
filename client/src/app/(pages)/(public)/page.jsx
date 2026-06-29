import ExploreSection from '@/components/page-sections/ExploreSection';
import FeaturedSection from '@/components/page-sections/FeaturedSection';
import HeroSection from '@/components/page-sections/HeroSection';
import MostSavedLessonsSection from '@/components/page-sections/MostSavedLessonsSection';
import WhyLearningSection from '@/components/page-sections/WhyLearningSection';
import NavTransparent from '@/components/shared/navber/NavTransparent';

export const dynamic = 'force-dynamic';

const HomePage = () => {
  return (
    <>
      <NavTransparent />
      <section className="flex flex-col gap-20">
        <HeroSection />
        <FeaturedSection />
        <WhyLearningSection />
        <ExploreSection />
        <MostSavedLessonsSection />

      </section>
    </>
  );
};

export default HomePage;
