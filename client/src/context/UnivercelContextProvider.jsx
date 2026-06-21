import CommentContextProvider from './comment-context/CommentContextProvider';
import LessonContextProvider from './lessonContext/LessonContextProvider';

const UnivercelContextProvider = ({ children }) => {
  return (
    <LessonContextProvider>
      <CommentContextProvider>{children}</CommentContextProvider>
    </LessonContextProvider>
  );
};

export default UnivercelContextProvider;
