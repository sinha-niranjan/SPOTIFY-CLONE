import { User } from "../models/user.model.js";

export const authCallback = async (req, res) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    // check if user already exists
    const user = await User.findOne({ clerkId: id });

    if (!user) {
      // sign up
      await User.create({ fullName: `${firstName} ${lastName}`, imageUrl });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log("Error is auth callback", error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error ", error });
  }
};