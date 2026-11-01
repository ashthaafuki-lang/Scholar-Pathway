import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["seeker","employer"],
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
