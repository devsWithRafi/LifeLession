'use client';

import { Button } from '@/components/ui/button';
import { FiFlag } from 'react-icons/fi';

const ReportButton = ({ lesson }) => {
  return (
    <Button variant="destructive">
      <FiFlag />
      <span className="hidden sm:inline">Report</span>
    </Button>
  );
};

export default ReportButton;
