import { Lesson } from '../../models/lessonModel.js';
import { Report } from '../../models/reportModel.js';

export const deleteLessonsReports = async (req, res) => {
  try {
    const authUser = req.user;
    const { lessonId } = req.params;

    if (authUser.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You are not allowed to perform this action',
      });
    }

    if (!lessonId) {
      return res.status(400).json({
        success: false,
        message: 'lessonId, reason and reportedUserEmail is required',
      });
    }

    // Delete all reports
    await Report.deleteMany({ lesson: lessonId });

    await Lesson.findByIdAndUpdate(lessonId, {
      $set: {
        reports: [],
      },
    });

    return res.status(200).json({
      success: true,
      message: 'All Report deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
