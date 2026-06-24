import { assets } from '@/assets/assets';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const Logo = ({ className }) => {
  return (
    <>
      <Image
        width={400}
        height={200}
        alt="logo"
        src={assets.logo.black}
        className={cn('select-none dark:hidden inline-block', className)}
      />
      <Image
        width={400}
        height={200}
        alt="logo"
        src={assets.logo.white}
        className={cn('select-none dark:inline-block hidden', className)}
      />
    </>
  );
};

export default Logo;
