import AddLessonForm from './AddLessonForm';

export const metadata = {
  title: 'LifeLesson | Add Lesson',
  description: '',
};


const AddLesson = () => {
  return (
    <section className="w-full h-full">
      <AddLessonForm />
    </section>
  );
};

export default AddLesson;
