import Navber from '@/components/shared/navber/Navber';
import React from 'react';

const PublicLayout = ({ children }) => {
  return (
    <main>
      <Navber />
      {children}
    </main>
  );
};

export default PublicLayout;
