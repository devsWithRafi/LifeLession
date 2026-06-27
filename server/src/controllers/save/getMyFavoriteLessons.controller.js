import { Lesson } from '../../models/lessonModel.js';
import { SavedBy } from '../../models/savedByModel.js';
import { User } from '../../models/userModel.js';

export const getMyFavoriteLessons = async (req, res) => {
  try {
    const authUser = req.user;

    const saved = await SavedBy.find({ user: authUser.id }).populate('lesson');

    const lessons = saved.map((item) => {
      const obj = item.lesson.toObject();
      obj.likeCount = item.lesson.likes.length;
      obj.commentCount = item.lesson.comments.length;
      obj.savedCount = item.lesson.savedBy.length;
      return obj;
    });

    return res.status(201).json({
      success: true,
      data: lessons,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
