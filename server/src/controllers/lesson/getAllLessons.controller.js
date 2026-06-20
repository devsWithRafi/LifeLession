import { validateLessonBodyData } from '../../helpers/validateLessonBodyData.js';
import { Lesson } from '../../models/lessonModel.js';
import '../../models/userModel.js';

export const getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find({}).populate('author');

    return res.status(200).json({
      success: true,
      data: lessons,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
