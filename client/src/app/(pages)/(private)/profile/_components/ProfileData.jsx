'use client';

import { BookOpen } from 'lucide-react';
import ProfileHeader from './ProfileHeader';
import { useUserProfileData } from '@/context/user-profile-cotext/UserProfileContextProvider';
import LessonCard from '@/components/card/LessonCard';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

const ProfileData = () => {
  const { loading, userData } = useUserProfileData();
  const [selectedCat, setSelectedCat] = useState('All');

  const { user, lessons, totalLikes, totalComments, totalSaved, totalViews } =
    userData;

  const categories =
    (lessons && ['All', ...new Set(lessons.map((l) => l.category))]) || [];
  const filterLessons =
    lessons &&
    (selectedCat === 'All'
      ? lessons
      : lessons.filter((l) => l.category === selectedCat));

  return (
    <>
      {/* Header */}
      <ProfileHeader
        user={user}
        lessons={lessons}
        totalLikes={totalLikes}
        totalSaved={totalSaved}
        totalViews={totalViews}
      />

      {/* Lessons */}
      {loading ? (
        <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
          <Spinner /> Loading...
        </div>
      ) : (
        <div>
          {lessons && lessons.length < 1 ? (
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border py-16 text-center">
              <BookOpen className="h-6 w-6 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                No lessons in this category yet.
              </p>
            </div>
          ) : (
            <div className="my-10 flex flex-col gap-5">
              <div className="flex items-center gap-2 max-w-full overflow-x-auto">
                {categories.map((item) => (
                  <Button
                    key={item}
                    onClick={() => setSelectedCat(item)}
                    variant={item === selectedCat ? 'default' : 'outline'}
                    className={'rounded-full px-4 capitalize'}
                  >
                    {item}
                  </Button>
                ))}
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {lessons &&
                  filterLessons.map((lesson) => (
                    <LessonCard key={lesson._id} lesson={lesson} />
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProfileData;
