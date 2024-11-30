import { User } from "../models/user.model.js";
export const getAllUsers = async (req, res, next) => {
  try {
    const currentUserId = req.auth.userId;
    const users = await User.find({ clerkId: { $ne: currentUserId } });

    res.status(200).json({ success: true, users });
  } catch (error) {
    next(error);
  }
};
