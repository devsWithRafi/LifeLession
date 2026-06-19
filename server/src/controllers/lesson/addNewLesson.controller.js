import { validateLessonBodyData } from '../../helpers/validateLessonBodyData.js';
import { Lesson } from '../../models/lessonModel.js';

export const addNewLesson = async (req, res) => {
  try {
    const authUser = req.user;
    const data = validateLessonBodyData.parse(req.body);
    const lesson = await Lesson.create({
      ...data,
      author: authUser.id,
    });

    return res.status(201).json({
      success: true,
      data: lesson,
      message: 'Your lesson has been published successfully',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Lesson validation failed: author: Path `author` is required.