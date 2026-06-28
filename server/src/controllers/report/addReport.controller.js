import { Lesson } from '../../models/lessonModel.js';
import { Report } from '../../models/reportModel.js';

export const addReport = async (req, res) => {
  try {
    const authUser = req.user;
    const { lessonId, details, reason, reportedUserEmail } = req.body;

    if (!lessonId || !reason || !reportedUserEmail) {
      return res.status(400).json({
        success: false,
        message: 'lessonId, reason and reportedUserEmail is required',
      });
    }

    // Check if already reported
    const isReported = await Report.findOne({
      reporterUserId: authUser.id,
      lessonId: lessonId,
    });

    if (isReported) {
      return res.status(400).json({
        success: false,
        message: 'You have already reported this lesson',
      });
    }

    // Add report
    const report = await Report.create({
      reporter: authUser.id,
      reportedUserEmail: reportedUserEmail,
      lesson: lessonId,
      reason: reason,
      details: details,
    });

    await Lesson.findByIdAndUpdate(lessonId, {
      $addToSet: {
        reports: report._id,
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Report added successfully',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
