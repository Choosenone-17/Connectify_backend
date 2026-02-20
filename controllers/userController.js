import User from "../models/User.js";

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    const { name, bio, role, profilePic } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, bio, role, profilePic },
      { new: true }
    );

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};