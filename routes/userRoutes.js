import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import User from "../models/user.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

/* ==============================
   GET ALL BRANDS
================================= */
router.get("/brand", async (req, res) => {
  try {
    const brands = await User.find({ role: "brand" }).select("-password");
    res.json(brands);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ==============================
   GET ALL INFLUENCERS
================================= */
router.get("/influencer", async (req, res) => {
  try {
    const influencers = await User.find({ role: "influencer" }).select("-password");
    res.json(influencers);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ==============================
   UPDATE PROFILE
================================= */
router.put(
  "/update-profile",
  protect,
  upload.single("profilePic"),
  async (req, res) => {
    try {
      const {
        name,
        bio,
        role,
        followers,
        reach,
        pricePerReel,
        instagram,
        category,
        engagementRate,
      } = req.body;

      let imageUrl = null;

      // 🔥 Upload to Cloudinary if image exists
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "connectify_profiles",
        });

        imageUrl = result.secure_url;
      }

      // 🔥 Build update object
      const updateData = {
        name,
        bio,
        role,
      };

      // Only add influencer fields if role is influencer
      if (role === "influencer") {
        updateData.followers = Number(followers) || 0;
        updateData.reach = Number(reach) || 0;
        updateData.pricePerReel = Number(pricePerReel) || 0;
        updateData.instagram = instagram || "";
        updateData.category = category || "";
        updateData.engagementRate = Number(engagementRate) || 0;
      }

      if (imageUrl) {
        updateData.profilePic = imageUrl;
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        updateData,
        { new: true }
      ).select("-password");

      res.json(updatedUser);

    } catch (error) {
      console.error("Update Profile Error:", error);
      res.status(500).json({ message: "Update failed" });
    }
  }
);

export default router;