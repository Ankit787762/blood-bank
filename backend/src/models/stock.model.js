import mongoose, { Schema } from "mongoose";

const stockSchema = new Schema(
  {
    hospital: {
      type: Schema.Types.ObjectId,
      ref: "Hospital", // kis hospital ka stock hai
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
      min: 0, // stock negative nahi ho sakta
      default: 0,
    },
  },
  { timestamps: true }
);

export const Stock = mongoose.model("Stock", stockSchema);
