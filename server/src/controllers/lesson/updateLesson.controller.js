import { validateLessonBodyData } from '../../helpers/validateLessonBodyData.js';
import { Lesson } from '../../models/lessonModel.js';

export const updateLesson = async (req, res) => {
  try {
    const authUser = req.user;
    const { lessonId } = req.params;
    const data = validateLessonBodyData.parse(req.body);

    const isPremium = authUser.plan === 'premium' || authUser.role === 'admin';

    if (!isPremium && data.isPremium) {
      return res.status(403).json({
        success: false,
        message: 'You are not allowed to make this request',
      });
    }

    const lesson = await Lesson.findOneAndUpdate(
      { _id: lessonId },
      {
        ...data,
        author: authUser.id,
      },
      {
        new: true,
      },
    );

    return res.status(201).json({
      success: true,
      data: lesson,
      message: 'Your lesson has updated successfully',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
