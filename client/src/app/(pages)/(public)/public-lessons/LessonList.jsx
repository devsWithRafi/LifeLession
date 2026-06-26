import { fetchLessons } from '@/actions/apis/fetchLessons';
import LessonCard from '@/components/card/LessonCard';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import LessonsPagination from './LessonsPagination';

const LessonList = async ({ query }) => {
  const page = query?.page || 1;

  const res = await fetchLessons({ ...query, page, limit: 6 });

  if (!res.success) {
    return (
      <Card className="bg-red-500/2 h-70 border border-red-500/20 flex items-center justify-center capitalize text-red-500/80">
        <CardContent>
          {res.message || 'Error: Fetch failed.No lessons found'}
        </CardContent>
      </Card>
    );
  }

  const lessons = res.data;
  const pagination = res.pagination;

  return Array.isArray(lessons) && lessons.length > 0 ? (
    <div className="w-full">
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
        {Array.isArray(lessons) &&
          lessons.map((lesson) => (
            <LessonCard key={lesson._id} lesson={lesson} />
          ))}
      </div>
      {/* pagination */}
      <LessonsPagination pagination={pagination} />
    </div>
  ) : (
    <Card className="h-70 flex items-center justify-center">
      <CardContent className="flex flex-col items-center gap-2 text-muted-foreground">
        <BookOpen className="size-10 opacity-30" />
        <p className="text-sm">No lessons Found.</p>
      </CardContent>
    </Card>
  );
};

export default LessonList;
