import { validateLessonBodyData } from '../../helpers/validateLessonBodyData.js';
import { Lesson } from '../../models/lessonModel.js';

export const deleteLesson = async (req, res) => {
  try {
    const authUser = req.user;
    const { lessonId } = req.params;

    if (!lessonId) {
      return res
        .status(400)
        .json({ success: false, message: 'Lesson id is required' });
    }

    let lesson; // define the lesson

    if (authUser.role === 'admin') {
      lesson = await Lesson.findOneAndDelete({
        _id: lessonId,
      });
    } else {
      lesson = await Lesson.findOneAndDelete({
        _id: lessonId,
        author: authUser.id,
      });
    }

    if (!lesson) {
      return res
        .status(404)
        .json({ success: false, message: 'Lesson not found' });
    }

    return res.status(201).json({
      success: true,
      data: lesson,
      message: 'Your lesson has been deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
