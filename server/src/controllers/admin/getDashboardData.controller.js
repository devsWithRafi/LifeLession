import { Lesson } from '../../models/lessonModel.js';
import { User } from '../../models/userModel.js';
import { Report } from '../../models/reportModel.js';

export const getDashboardData = async (req, res) => {
  try {
    const authUser = req.user;
    const isAdmin = authUser.role === 'admin';
    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden. Only admin can access this route.',
      });
    }

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const [
      totalUsers,
      totalPublicLessons,
      totalReports,
      todayLessons,
      contributors,
      lessonGrowth,
      userGrowth,
    ] = await Promise.all([
      User.countDocuments(),
      Lesson.countDocuments({ isPublic: true }),
      Report.countDocuments(),
      Lesson.countDocuments({
        createdAt: {
          $gte: start,
          $lte: end,
        },
      }),
      Lesson.aggregate([
        {
          $group: {
            _id: '$author',
            lessons: { $sum: 1 },
          },
        },
        {
          $sort: { lessons: -1 },
        },
        {
          $limit: 5,
        },
        {
          $lookup: {
            from: 'user',
            localField: '_id',
            foreignField: '_id',
            as: 'author',
          },
        },
        {
          $unwind: '$author',
        },
      ]),
      Lesson.aggregate([
        {
          $group: {
            _id: {
              $dateToString: {
                format: '%Y-%m-%d',
                date: '$createdAt',
              },
            },
            total: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]),
      User.aggregate([
        {
          $group: {
            _id: {
              $dateToString: {
                format: '%Y-%m-%d',
                date: '$createdAt',
              },
            },
            total: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]),
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalPublicLessons,
        totalReports,
        todayLessons,
        contributors,
        lessonGrowth,
        userGrowth,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
