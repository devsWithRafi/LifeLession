import { validateLessonBodyData } from '../../helpers/validateLessonBodyData.js';
import { Lesson } from '../../models/lessonModel.js';
import '../../models/userModel.js';
import '../../models/commentModel.js';

export const getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find({})
      .populate('author')
      .populate({
        path: 'comments',
        populate: { path: 'user', model: 'User' },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: lessons,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
