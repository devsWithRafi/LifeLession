import CommentContextProvider from './comment-context/CommentContextProvider';
import LessonContextProvider from './lessonContext/LessonContextProvider';
import LikeContextProvider from './like-context/LikeContextProvider';
import MyLessonContextProvider from './my-lessons-context/MyLessonContextProvider';
import SaveLessonContextProvider from './save-lesson-context/SaveLessonContextProvider';

const UnivercelContextProvider = ({ children }) => {
  return (
    <LessonContextProvider>
      <CommentContextProvider>
        <LikeContextProvider>
          <SaveLessonContextProvider>
            <MyLessonContextProvider>
              {children}
            </MyLessonContextProvider>
          </SaveLessonContextProvider>
        </LikeContextProvider>
      </CommentContextProvider>
    </LessonContextProvider>
  );
};

export default UnivercelContextProvider;
