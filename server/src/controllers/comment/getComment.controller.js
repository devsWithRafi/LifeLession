import { Comment } from '../../models/commentModel.js';
import { Lesson } from '../../models/lessonModel.js';
import '../../models/userModel.js';
import '../../models/commentModel.js';

export const getComment = async (req, res) => {
  try {
    const authUser = req.user;
    const { lessonId: id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: 'lessonId is required' });
    }

    const comment = await Comment.find({
      lesson: id,
    })
      .populate('user')
      .populate('lesson')
      .sort({ createdAt: -1 });

    return res.status(201).json({
      success: true,
      data: comment,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
