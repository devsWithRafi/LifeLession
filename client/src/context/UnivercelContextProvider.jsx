import CommentContextProvider from './comment-context/CommentContextProvider';
import LessonContextProvider from './lessonContext/LessonContextProvider';
import LikeContextProvider from './like-context/LikeContextProvider';
import SaveLessonContextProvider from './save-lesson-context/SaveLessonContextProvider';

const UnivercelContextProvider = ({ children }) => {
  return (
    <LessonContextProvider>
      <CommentContextProvider>
        <LikeContextProvider>
          <SaveLessonContextProvider>
            {children}
          </SaveLessonContextProvider>
        </LikeContextProvider>
      </CommentContextProvider>
    </LessonContextProvider>
  );
};

export default UnivercelContextProvider;
