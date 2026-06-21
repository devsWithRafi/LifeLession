import { Lesson } from '../../models/lessonModel.js';
import { Like } from '../../models/likeModel.js';

export const addLike = async (req, res) => {
  try {
    const authUser = req.user;
    const { lessonId } = req.body;

    if (!lessonId) {
      return res
        .status(400)
        .json({ success: false, message: 'Lesson id is required' });
    }

    // Check if already liked
    const isLiked = await Like.findOne({
      user: authUser.id,
      lesson: lessonId,
    });

    console.log('isLiked:', isLiked);

    if (isLiked) {
      await Like.findByIdAndDelete(isLiked._id);
      await Lesson.findByIdAndUpdate(lessonId, {
        $pull: {
          likes: isLiked._id,
        },
      });

      return res.status(200).json({
        success: true,
        liked: false,
        message: 'Like removed successfully',
      });
    }

    // Add like
    const like = await Like.create({
      user: authUser.id,
      lesson: lessonId,
    });

    await Lesson.findByIdAndUpdate(lessonId, {
      $addToSet: {
        likes: like._id,
      },
    });

    return res.status(201).json({
      success: true,
      liked: true,
      message: 'Like added successfully',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
