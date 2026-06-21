import { validateLessonBodyData } from '../../helpers/validateLessonBodyData.js';
import { Lesson } from '../../models/lessonModel.js';
import '../../models/userModel.js';
import '../../models/commentModel.js';

export const getSingleLesson = async (req, res) => {
  try {
    const { id } = req.params;
    const lesson = await Lesson.findById(id)
      .populate('author')
      .populate({
        path: 'comments',
        populate: { path: 'user', model: 'User' },
      });

    return res.status(200).json({
      success: true,
      data: lesson,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
