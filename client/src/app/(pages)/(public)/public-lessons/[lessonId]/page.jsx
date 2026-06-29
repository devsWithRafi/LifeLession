import LessonDetails from './_components/LessonDetails';

export const metadata = {
  title: 'LifeLessons | Lesson Details',
  description: '',
};

const LessonDetailsPage = () => {
  return (
    <section className="mt-20 w-full max-w-375 mx-auto min-h-screen p-4">
      <LessonDetails />
    </section>
  );
};

export default LessonDetailsPage;
