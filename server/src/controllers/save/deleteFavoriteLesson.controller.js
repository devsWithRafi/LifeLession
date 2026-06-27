import { Lesson } from '../../models/lessonModel.js';
import { SavedBy } from '../../models/savedByModel.js';
import { User } from '../../models/userModel.js';

export const deleteFavoriteLesson = async (req, res) => {
  try {
    const authUser = req.user;
    const { lessonId } = req.params;

    if (!lessonId) {
      return res.status(400).json({
        success: false,
        message: 'Lesson id is required',
      });
    }

    const lesson = await SavedBy.findOneAndDelete({
      user: authUser.id,
      lesson: lessonId,
    });

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found',
      });
    }

    await Lesson.findByIdAndUpdate(lessonId, {
      $pull: {
        savedBy: lesson._id,
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Lesson deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
