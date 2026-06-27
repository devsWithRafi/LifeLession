import { Lesson } from '../../models/lessonModel.js';
import { SavedBy } from '../../models/savedByModel.js';

export const saveLesson = async (req, res) => {
  try {
    const authUser = req.user;
    const { lessonId } = req.body;

    if (!lessonId) {
      return res
        .status(400)
        .json({ success: false, message: 'Lesson id is required' });
    }

    // Check if already saved
    const isSaved = await SavedBy.findOne({
      user: authUser.id,
      lesson: lessonId,
    });

    if (isSaved) {
      await SavedBy.findByIdAndDelete(isSaved._id);
      await Lesson.findByIdAndUpdate(lessonId, {
        $pull: {
          savedBy: isSaved._id,
        },
      });

      return res.status(200).json({
        success: true,
        saved: false,
        message: 'Lesson removed successfully',
      });
    }

    // Add saved
    const savedBy = await SavedBy.create({
      user: authUser.id,
      lesson: lessonId,
    });

    await Lesson.findByIdAndUpdate(lessonId, {
      $addToSet: {
        savedBy: savedBy._id,
      },
    });

    return res.status(201).json({
      success: true,
      saved: true,
      message: 'Lesson added successfully',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
