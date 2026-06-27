import { validateLessonBodyData } from '../../helpers/validateLessonBodyData.js';
import { Lesson } from '../../models/lessonModel.js';
import { Comment } from '../../models/commentModel.js';
import { User } from '../../models/userModel.js';
import { SavedBy } from '../../models/savedByModel.js';
import { Like } from '../../models/likeModel.js';
import { success } from 'zod';

export const getUserLessonsSummary = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found!',
      });
    }

    const lessons = await Lesson.find({ author: user._id })
      .populate('author')
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

    const totalLikes = formateLessonData.reduce(
      (acc, l) => acc + l.likeCount,
      0,
    );
    const totalComments = formateLessonData.reduce(
      (acc, l) => acc + l.commentCount,
      0,
    );
    const totalSaved = formateLessonData.reduce(
      (acc, l) => acc + l.savedCount,
      0,
    );
    const totalViews = formateLessonData.reduce((acc, l) => acc + l.views, 0);

    return res.status(200).json({
      success: true,
      data: {
        user,
        lessons: formateLessonData,
        totalLikes,
        totalComments,
        totalSaved,
        totalViews,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
