import { fetchLessons } from '@/actions/apis/fetchLessons';
import LessonCard from '../card/LessonCard';

const FeaturedSectionData = async () => {
  const { data } = await fetchLessons();

  const filter = data.filter((d) => d.isFeatured);

  return (
    <div className="grid grid-cols-3 gap-5">
      {filter.map((l) => (
        <LessonCard key={l._id} lesson={l} />
      ))}
    </div>
  );
};

export default FeaturedSectionData;
