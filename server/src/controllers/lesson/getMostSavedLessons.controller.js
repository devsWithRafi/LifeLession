import { Lesson } from '../../models/lessonModel.js';

export const getMostSavedLessons = async (req, res) => {
  try {
    const lessons = await Lesson.aggregate([
      {
        $addFields: {
          totalSaved: {
            $size: {
              $ifNull: ['$savedBy', []],
            },
          },
        },
      },
      {
        $sort: {
          totalSaved: -1,
          createdAt: -1,
        },
      },
      {
        $limit: 10,
      },
      {
        $lookup: {
          from: 'user',
          localField: 'author',
          foreignField: '_id',
          as: 'author',
        },
      },
      {
        $unwind: '$author',
      },
      {
        $project: {
          title: 1,
          description: 1,
          image: 1,
          category: 1,
          totalSaved: 1,
          author: {
            _id: '$author._id',
            name: '$author.name',
            image: '$author.image',
          },
        },
      },
    ]);

    res.json({
      success: true,
      data: lessons,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};