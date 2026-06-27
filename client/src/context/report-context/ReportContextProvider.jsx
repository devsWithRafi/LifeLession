'use client';
import { authClient, getToken } from '@/lib/auth-client';
import { useContext, useEffect, useState, useTransition } from 'react';
import { toast } from 'sonner';
import { useSingleLesson } from '../lessonContext/LessonContextProvider';
import { AddReportOnLessonAction } from '@/actions/AddReportOnLesson.action';
import { ReportContext } from './ReportContext';

const ReportContextProvider = ({ children }) => {
  const { data } = authClient.useSession();
  const user = data?.user;
  const { lesson } = useSingleLesson();
  const [reported, setReported] = useState(false);

  useEffect(() => {
    const alreadyReported =
      lesson && lesson.reports.some((r) => r.reporterUserId === user?.id);
    setReported(alreadyReported);
  }, [lesson]);

  const handleAddReport = async (data) => {
    if (!data) return;

    const token = await getToken();
    const result = await AddReportOnLessonAction(data, token);

    if (result.success) {
      setReported((prev) => !prev);
      return true;
    } else {
      toast.error(result.message ?? 'Error: Report failed');
      setReported(false);
      return false;
    }
  };
  return (
    <ReportContext.Provider
      value={{ reported, handleAddReport }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export const useReport = () => {
  const context = useContext(ReportContext);
  if (!context) throw new Error('useReport context not found');
  return context;
};

export default ReportContextProvider;
