import { validateLessonBodyData } from '../../helpers/validateLessonBodyData.js';
import { Lesson } from '../../models/lessonModel.js';
import { Comment } from '../../models/commentModel.js';
import { User } from '../../models/userModel.js';
import { SavedBy } from '../../models/savedByModel.js';
import { Like } from '../../models/likeModel.js';
import { success } from 'zod';

export const getAllUsers = async (req, res) => {
  const authUser = req.user;

  if (authUser.role !== 'admin')
    return res
      .status(403)
      .json({
        success: false,
        message: 'You are not authorized to access this resource',
      });

  try {
    const users = await User.aggregate([
      {
        $project: {
          password: 0,
        },
      },
      {
        $lookup: {
          from: 'lessons',
          localField: '_id',
          foreignField: 'author',
          as: 'lesson',
        },
      },
    ]);

    return res.status(201).json({ success: true, data: users });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
