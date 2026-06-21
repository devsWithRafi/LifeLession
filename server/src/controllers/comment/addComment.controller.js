import { Comment } from '../../models/commentModel.js';
import { Lesson } from '../../models/lessonModel.js';

export const addComment = async (req, res) => {
  try {
    const authUser = req.user;
    const { text, lessonId: id } = req.body;

    if (!text || !id) {
      return res
        .status(400)
        .json({ success: false, message: 'Comment and lessonId is required' });
    }

    const comment = await Comment.create({
      text,
      user: authUser.id,
      lesson: id,
    });

    await Lesson.findByIdAndUpdate(id, {
      $push: {
        comments: comment._id,
      },
    });

    return res.status(201).json({
      success: true,
      data: comment,
      message: 'Comment added successfully',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
