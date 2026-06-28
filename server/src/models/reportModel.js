import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reportedUserEmail: String,
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson',
      required: true,
    },
    reason: String,
    details: String,
  },
  {
    timestamps: true,
  },
);

export const Report =
  mongoose.models.Report || mongoose.model('Report', reportSchema);
