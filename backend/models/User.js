import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    courses: {
      type: [String],
      default: [],
    },
    type: {
      type: String,
      enum: ["Government", "Private"],
      required: true,
    },
  },
  { timestamps: true }
);

const University = mongoose.model(
  "University",
  universitySchema
);

export default University;
