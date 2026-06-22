import { validateLessonBodyData } from '../../helpers/validateLessonBodyData.js';
import { Lesson } from '../../models/lessonModel.js';
import { Like } from '../../models/likeModel.js';
import { Comment } from '../../models/commentModel.js';
import { User } from '../../models/userModel.js';
import { SavedBy } from '../../models/savedByModel.js';

export const getFeaturedLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find({ isFeatured: true })
      .populate('author')
      .populate({
        path: 'comments',
        populate: { path: 'user', model: 'User' },
      })
      .populate({
        path: 'likes',
        populate: { path: 'user', model: 'User' },
      })
      .populate({ path: 'savedBy', populate: { path: 'user', model: 'User' } })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: lessons,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
