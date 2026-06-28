import { validateLessonBodyData } from '../../helpers/validateLessonBodyData.js';
import { Lesson } from '../../models/lessonModel.js';
import { Comment } from '../../models/commentModel.js';
import { User } from '../../models/userModel.js';
import { SavedBy } from '../../models/savedByModel.js';
import { Like } from '../../models/likeModel.js';
import { Report } from '../../models/reportModel.js';
import { success } from 'zod';

export const deleteUser = async (req, res) => {
  const authUser = req.user;
  const { userId } = req.params;

  if (authUser.role !== 'admin')
    return res.status(403).json({
      success: false,
      message: 'You are not authorized to access this resource',
    });

  try {
    await User.findByIdAndDelete(userId);
    await Promise.all([
      Lesson.deleteMany({ author: userId }),
      Comment.deleteMany({ user: userId }),
      SavedBy.deleteMany({ user: userId }),
      Like.deleteMany({ user: userId }),
      Report.deleteMany({ reporterUserId: userId }),
    ]);

    return res.status(201).json({ success: true, message: 'User deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
