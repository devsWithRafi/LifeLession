import mongoose from 'mongoose';

const savedBySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  lesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    required: false,
  },
});

export const SavedBy =
  mongoose.models.Like || mongoose.model('SavedBy', savedBySchema);
