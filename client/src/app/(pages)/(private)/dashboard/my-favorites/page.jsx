import MyFavoriteLessonData from './MyFavoriteLessonData';

export const metadata = {
  title: 'LifeLesson | My Favorites',
  description: '',
};


const MyFavoritePage = () => {
  return (
    <section>
      <MyFavoriteLessonData />
    </section>
  );
};

export default MyFavoritePage;
