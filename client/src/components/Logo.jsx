'use client';
import { assets } from '@/assets/assets';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import Image from 'next/image';

const Logo = ({ className }) => {
  const { theme } = useTheme();

  return theme === 'light' ? (
    <Image
      width={400}
      height={200}
      alt="logo"
      src={assets.logo.black}
      className={cn('select-none', className)}
    />
  ) : (
    <Image
      width={400}
      height={200}
      alt="logo"
      src={assets.logo.white}
      className={cn('select-none', className)}
    />
  );
};

export default Logo;
