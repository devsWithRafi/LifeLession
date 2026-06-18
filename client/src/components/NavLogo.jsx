import { assets } from '@/assets/assets';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

const NavLogo = ({ className, variant = 'white' }) => {
  return variant === 'white' ? (
    <Image
      width={400}
      height={200}
      alt="logo"
      src={assets.logo.white}
      className={cn('select-none', className)}
    />
  ) : (
    <Image
      width={400}
      height={200}
      alt="logo"
      src={assets.logo.black}
      className={cn('select-none', className)}
    />
  );
};

export default NavLogo;
