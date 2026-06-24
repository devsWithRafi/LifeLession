import ExploreSection from '@/components/page-sections/ExploreSection';
import FeaturedSection from '@/components/page-sections/FeaturedSection';
import HeroSection from '@/components/page-sections/HeroSection';
import MostSavedLessonsSection from '@/components/page-sections/MostSavedLessonsSection';
import WhyLearningSection from '@/components/page-sections/WhyLearningSection';
import NavTransparent from '@/components/shared/navber/NavTransparent';

const HomePage = () => {
  return (
    <>
      <NavTransparent />
      <section className="flex flex-col gap-20">
        <HeroSection />
        <FeaturedSection />
        <WhyLearningSection />
        <MostSavedLessonsSection />
        <ExploreSection />
        <section className="w-full h-screen"></section>
      </section>
    </>
  );
};

export default HomePage;
