import { validateLessonBodyData } from '../../helpers/validateLessonBodyData.js';
import { Lesson } from '../../models/lessonModel.js';
import { Comment } from '../../models/commentModel.js';
import { User } from '../../models/userModel.js';
import { SavedBy } from '../../models/savedByModel.js';
import { Like } from '../../models/likeModel.js';

export const getAllLessons = async (req, res) => {
  const { limit, page, category, emotionalTone, accessLevel, title } =
    req.query;

  const options = {};

  if (category) options.category = { $regex: category, $options: 'i' };
  if (title) options.title = { $regex: title, $options: 'i' };
  if (emotionalTone)
    options.emotionalTone = { $regex: emotionalTone, $options: 'i' };
  if (accessLevel) options.accessLevel = { $regex: accessLevel, $options: 'i' };

  const skip = (Number(page) - 1) * Number(limit);

  try {
    const total = await Lesson.countDocuments(options);

    const lessons = await Lesson.find(options)
      .skip(skip)
      .limit(Number(limit))
      .populate('author')
      .populate('reports')
      .populate({
        path: 'comments',
        populate: { path: 'user', model: 'User' },
      })
      .populate({
        path: 'likes',
        populate: { path: 'user', model: 'User' },
      })
      .populate({
        path: 'savedBy',
        populate: { path: 'user', model: 'User' },
      })
      .sort({ createdAt: -1 });

    const formateLessonData = lessons.map((lesson) => {
      const obj = lesson.toObject();
      obj.likeCount = lesson.likes.length;
      obj.commentCount = lesson.comments.length;
      obj.savedCount = lesson.savedBy.length;
      return obj;
    });

    const totalPage = Math.ceil(total / Number(limit));

    return res.status(200).json({
      success: true,
      data: formateLessonData,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPage,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
