import HeroSection from '@/components/page-sections/HeroSection';
import NavTransparent from '@/components/shared/navber/NavTransparent';
import React from 'react';

const HomePage = () => {
  return (
    <>
      <NavTransparent />
      <section>
        <HeroSection />
        <section className="w-full h-screen"></section>
      </section>
    </>
  );
};

export default HomePage;
