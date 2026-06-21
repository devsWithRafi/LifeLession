'use client';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useSavedLesson } from '@/context/save-lesson-context/SaveLessonContextProvider';
import { cn } from '@/lib/utils';
import { FiBookmark } from 'react-icons/fi';

const SaveButton = () => {
  const { handleSaveLesson, saved, loading } = useSavedLesson();

  return (
    <Button
      onClick={handleSaveLesson}
      variant="outline"
      className={cn(saved && '!border-primary')}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          <FiBookmark />
          <span className="hidden sm:inline">{saved ? 'Saved' : 'Save'}</span>
        </>
      )}
    </Button>
  );
};

export default SaveButton;
