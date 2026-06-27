import CommentContextProvider from './comment-context/CommentContextProvider';
import LessonContextProvider from './lessonContext/LessonContextProvider';
import LikeContextProvider from './like-context/LikeContextProvider';
import MyLessonContextProvider from './my-lessons-context/MyLessonContextProvider';
import ReportContextProvider from './report-context/ReportContextProvider';
import SaveLessonContextProvider from './save-lesson-context/SaveLessonContextProvider';
import UserProfileContextProvider from './user-profile-cotext/UserProfileContextProvider';

const UnivercelContextProvider = ({ children }) => {
  return (
    <LessonContextProvider>
      <CommentContextProvider>
        <LikeContextProvider>
          <SaveLessonContextProvider>
            <MyLessonContextProvider>
              <UserProfileContextProvider>
                <ReportContextProvider>
                  {children}
                </ReportContextProvider>
              </UserProfileContextProvider>
            </MyLessonContextProvider>
          </SaveLessonContextProvider>
        </LikeContextProvider>
      </CommentContextProvider>
    </LessonContextProvider>
  );
};

export default UnivercelContextProvider;
