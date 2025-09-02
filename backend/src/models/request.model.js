import mongoose, { Schema } from "mongoose";

const bloodRequestSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // kis user ne request ki
      required: true,
    },
    hospital: {
      type: Schema.Types.ObjectId,
      ref: "Hospital", // kis hospital se request ki
      required: true,
    },
    bloodGroup: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    },
    units: {
      type: Number,
      required: true,
      min: 1,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const BloodRequest = mongoose.model("BloodRequest", bloodRequestSchema);
