import { validateLessonBodyData } from '../../helpers/validateLessonBodyData.js';
import { Lesson } from '../../models/lessonModel.js';
import { Comment } from '../../models/commentModel.js';
import { User } from '../../models/userModel.js';
import { SavedBy } from '../../models/savedByModel.js';
import { Like } from '../../models/likeModel.js';
import mongoose from 'mongoose';

export const getUserDashboardData = async (req, res) => {
  const authUser = req.user;
  const userId = authUser.id;

  try {
    const lessons = await Lesson.find({ author: userId });
    const totalLessonsCreated = await Lesson.countDocuments({
      author: userId,
    });

    const totalSavedByMe = await SavedBy.countDocuments({
      user: userId,
    });

    const totalReactions = lessons.reduce(
      (acc, lesson) => acc + lesson.likes.length,
      0,
    );

    const newLessonsThisMonth = await Lesson.find({
      author: userId,
      createdAt: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
    })
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
      });

    const formateLessonData = newLessonsThisMonth.map((lesson) => {
      const obj = lesson.toObject();
      obj.likeCount = lesson.likes.length;
      obj.commentCount = lesson.comments.length;
      obj.savedCount = lesson.savedBy.length;
      return obj;
    });

    // ---- Weekly activity (Mon -> Sun of the current week) ----
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 = Sun ... 6 = Sat
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() + diffToMonday);
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7); // exclusive upper bound

    const dayMatch = {
      createdAt: { $gte: weekStart, $lt: weekEnd },
    };

    // Group lessons created per day
    const lessonsPerDay = await Lesson.aggregate([
      { $match: { author: new mongoose.Types.ObjectId(userId), ...dayMatch } },
      {
        $group: {
          _id: { $dayOfWeek: '$createdAt' }, // 1 = Sun ... 7 = Sat
          count: { $sum: 1 },
        },
      },
    ]);

    // Group lessons saved by me per day
    const savesPerDay = await SavedBy.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId), ...dayMatch } },
      {
        $group: {
          _id: { $dayOfWeek: '$createdAt' },
          count: { $sum: 1 },
        },
      },
    ]);

    // Map Mongo's $dayOfWeek (1=Sun..7=Sat) to our Mon-first labels
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const mongoDayToLabel = {
      2: 'Mon',
      3: 'Tue',
      4: 'Wed',
      5: 'Thu',
      6: 'Fri',
      7: 'Sat',
      1: 'Sun',
    };

    const lessonsMap = {};
    lessonsPerDay.forEach(
      (d) => (lessonsMap[mongoDayToLabel[d._id]] = d.count),
    );

    const savesMap = {};
    savesPerDay.forEach((d) => (savesMap[mongoDayToLabel[d._id]] = d.count));

    const weeklyActivity = labels.map((day) => ({
      day,
      lessons: lessonsMap[day] || 0,
      saves: savesMap[day] || 0,
    }));

    return res.status(200).json({
      success: true,
      data: {
        stats: {
          totalLessonsCreated,
          totalSavedByMe,
          totalReactions,
          newLessonsThisMonth: formateLessonData,
        },
        weeklyActivity,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
