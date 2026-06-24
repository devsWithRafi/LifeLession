import { Lesson } from '../../models/lessonModel.js';

export const getTopContributors = async (req, res) => {
  try {
    const contributors = await Lesson.aggregate([
      {
        $group: {
          _id: '$author',
          totalLessons: { $sum: 1 },
        },
      },
      {
        $sort: {
          totalLessons: -1,
        },
      },
      {
        $limit: 10,
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
    ]);

    res.status(200).json({
      success: true,
      data: contributors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
