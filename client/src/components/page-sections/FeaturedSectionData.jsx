import { toast } from 'sonner';
import LessonCard from '../card/LessonCard';
import { fetchFeaturedLessons } from '@/actions/apis/fetchFeaturedLessons';

const FeaturedSectionData = async () => {
  const result = await fetchFeaturedLessons();

  if (!result?.success) {
    toast.error(result.message ?? 'Error: Fetched failed');
    return;
  }
  const data = Array.isArray(result.data) && result.data;
  
  return (
    <div className="grid grid-cols-3 gap-5">
      {data && data.map((l) => <LessonCard key={l._id} lesson={l} />)}
    </div>
  );
};

export default FeaturedSectionData;
