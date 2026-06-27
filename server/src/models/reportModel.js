import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    reporterUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reporterEmail: String,
    reportedUserEmail: String,
    lessonId: {
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
