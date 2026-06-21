'use client';
import { Button } from '@/components/ui/button';
import { LuShare2 } from 'react-icons/lu';

const ShareButton = ({ lesson }) => {
  return (
    <Button variant="outline">
      <LuShare2 />
      <span className="hidden sm:inline">Share</span>
    </Button>
  );
};

export default ShareButton;
