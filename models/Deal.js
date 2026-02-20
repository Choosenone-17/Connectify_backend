import mongoose from "mongoose";

const dealSchema = new mongoose.Schema({
  brand: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  influencer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: Number,
  status: {
    type: String,
    enum: ["pending", "accepted", "completed"],
    default: "pending"
  }
}, { timestamps: true });

export default mongoose.model("Deal", dealSchema);