import FeaturedSection from '@/components/page-sections/FeaturedSection';
import HeroSection from '@/components/page-sections/HeroSection';
import NavTransparent from '@/components/shared/navber/NavTransparent';

const HomePage = () => {
  return (
    <>
      <NavTransparent />
      <section>
        <HeroSection />
        <FeaturedSection />
        <section className="w-full h-screen"></section>
      </section>
    </>
  );
};

export default HomePage;
