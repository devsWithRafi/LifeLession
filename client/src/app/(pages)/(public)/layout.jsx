import Footer from '@/components/shared/footer/Footer';
import Navber from '@/components/shared/navber/Navber';
import React from 'react';

const PublicLayout = ({ children }) => {
  return (
    <main>
      <Navber />
      {children}
      <Footer />
    </main>
  );
};

export default PublicLayout;
