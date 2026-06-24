import NavLogo from '@/components/NavLogo';
import React from 'react';

const footerLinks = {
  explore: [
    { name: 'Home', path: '/', access: 'public' },
    { name: 'Public Lessons', path: '/public-lessons', access: 'public' },
    { name: 'Pricing', path: '/pricing', access: 'private' },
    { name: 'Favorites', path: '/favorites', access: 'private' },
  ],
  account: [
    { name: 'Dashboard', path: '/dashboard', access: 'private' },
    { name: 'Add Lesson', path: '/dashboard/add-lesson', access: 'public' },
    { name: 'My Lessons', path: '/dashboard/my-lessons', access: 'private' },
  ],
};

const Footer = () => {
  return (
    <footer className="p-4">
      <div className="bg-black p-5 relative w-full overflow-hidden h-70 rounded-xl">
        <NavLogo
          variant="white"
          className="absolute w-full opacity-5 pointer-events-none select-none"
        />
        <div>
          <NavLogo variant="white" className="w-40" />
          <p>
            Preserve the wisdom you've gained through life's experiences.
            Digital Life Lessons helps you capture meaningful insights, organize
            personal growth journeys, and learn from a community of shared
            experiences and reflections.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
