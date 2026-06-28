import { validateLessonBodyData } from '../../helpers/validateLessonBodyData.js';
import { Lesson } from '../../models/lessonModel.js';
import { Comment } from '../../models/commentModel.js';
import { User } from '../../models/userModel.js';
import { SavedBy } from '../../models/savedByModel.js';
import { Like } from '../../models/likeModel.js';
import { Report } from '../../models/reportModel.js';
import { success } from 'zod';

export const promoteUser = async (req, res) => {
  const authUser = req.user;
  const { userId } = req.params;

  if (authUser.role !== 'admin')
    return res.status(403).json({
      success: false,
      message: 'You are not authorized to access this resource',
    });

  try {
    let role;
    const user = await User.findById(userId);
    if (user.role === 'admin') role = 'user';
    else role = 'admin';

    await User.findByIdAndUpdate(user._id, { $set: { role: role } });

    return res.status(201).json({
      success: true,
      message: `User: "${user.name}" is promoted from ${user.role} to ${role} successfully`,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
