import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';
import React from 'react';

const DataLoader = ({ className }) => {
  return <Loader className={cn('animate-spin text-muted-foreground', className)} />;
};

export default DataLoader;
