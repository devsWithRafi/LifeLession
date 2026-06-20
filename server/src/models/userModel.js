// models/userModel.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {},
  {
    strict: false,
    collection: 'user',
  },
);

export const User = mongoose.models.User || mongoose.model('User', userSchema);
