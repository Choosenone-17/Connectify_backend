import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },

    email: { 
      type: String, 
      required: true, 
      unique: true 
    },

    password: { 
      type: String, 
      required: true 
    },

    role: {
      type: String,
      enum: ["brand", "influencer"],
      required: true,
    },

    bio: { 
      type: String 
    },

    profilePic: { 
      type: String 
    },

    /* 🔥 Influencer Professional Fields */

    followers: {
      type: Number,
      default: 0,
    },

    reach: {
      type: Number,
      default: 0,
    },

    pricePerReel: {
      type: Number,
      default: 0,
    },

    instagram: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "",
    },

    engagementRate: {
      type: Number,
      default: 0,
    },

    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// ✅ Prevent OverwriteModelError
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;