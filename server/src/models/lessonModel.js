import mongoose from 'mongoose';

const lessonModel = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    emotionalTone: { type: String, required: true },
    accessLevel: {
      type: String,
      required: false,
      enum: ['free', 'premium'],
      default: 'free',
    },
    image: { type: String, required: false, default: null },
    isFeatured: { type: Boolean, required: false, default: false },
    views: {
      type: Number,
      required: false,
      default: () => Math.round(Math.random() * 1000),
    },
    savedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SavedBy',
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like',
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Lesson =
  mongoose.models.Lesson || mongoose.model('Lesson', lessonModel);
