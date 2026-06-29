'use client';

import { useRouter } from 'next/navigation';

const GoBackButton = ({ children }) => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return <div onClick={handleBack}>{children}</div>;
};

export default GoBackButton;
