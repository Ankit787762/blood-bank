import mongoose, { Schema } from "mongoose";

const hospitalSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    bloodStock: {
      // 👇 blood group wise stock maintain hoga
      A_pos: { type: Number, default: 0 },
      A_neg: { type: Number, default: 0 },
      B_pos: { type: Number, default: 0 },
      B_neg: { type: Number, default: 0 },
      O_pos: { type: Number, default: 0 },
      O_neg: { type: Number, default: 0 },
      AB_pos: { type: Number, default: 0 },
      AB_neg: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export const Hospital = mongoose.model("Hospital", hospitalSchema);
