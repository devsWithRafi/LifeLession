'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { FiFlag } from 'react-icons/fi';
import LessonReportModal from './LessonReportModal';
import { useReport } from '@/context/report-context/ReportContextProvider';

const ReportButton = ({ lesson }) => {
  const [open, setOpen] = useState(false);
  const { reported } = useReport();

  return (
    <>
      <Button
        disabled={reported}
        onClick={() => setOpen(true)}
        variant="destructive"
      >
        <FiFlag />
        <span className="hidden sm:inline">
          {reported ? 'Reported' : 'Report'}
        </span>
      </Button>

      <LessonReportModal
        lesson={lesson}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default ReportButton;
