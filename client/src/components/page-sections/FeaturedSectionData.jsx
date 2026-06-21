import LessonCard from '../card/LessonCard';
import { fetchFeaturedLessons } from '@/actions/apis/fetchFeaturedLessons';
import { Card, CardContent } from '../ui/card';

const FeaturedSectionData = async () => {
  const result = await fetchFeaturedLessons();

  if (!result.success) {
    return (
      <Card className="rounded-md">
        <CardContent className="text-red-400 text-center capitalize">
          Error fetching featured lessons
        </CardContent>
      </Card>
    );
  }
  const data = Array.isArray(result.data) && result.data;

  return (
    <>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
        {data && data.map((l) => <LessonCard key={l._id} lesson={l} />)}
      </div>
    </>
  );
};

export default FeaturedSectionData;
