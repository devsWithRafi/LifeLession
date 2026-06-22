import { User } from '../../models/userModel.js';

export const updateUserPlan = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: 'userId is required' });
    }

    const user = await User.findOneAndUpdate(
      {
        _id: userId,
        plan: 'free',
      },
      {
        $set: {
          plan: 'premium',
        },
      },
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({
      success: true,
      message: "Payment successful, you're now a premium user",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
