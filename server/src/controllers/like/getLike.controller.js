import { Lesson } from '../../models/lessonModel.js';
import '../../models/userModel.js';
import '../../models/likeModel.js';
import { Like } from '../../models/likeModel.js';

export const getLike = async (req, res) => {
  try {
    const authUser = req.user;
    const { lessonId: id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: 'lessonId is required' });
    }

    const likes = await Like.find({
      lesson: id,
    })
      .populate('user')
      .populate('lesson')
      .sort({ createdAt: -1 });

    return res.status(201).json({
      success: true,
      data: likes,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};