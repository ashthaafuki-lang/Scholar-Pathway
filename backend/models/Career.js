
import mongoose from "mongoose";

const careerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "IT",
        "Engineering",
        "Business",
        "Healthcare",
        "Education",
        "Other",
      ],
    },

    description: {
      type: String,
      required: true,
    },

    requiredSkills: {
      type: [String],
      default: [],
    },

    qualifications: {
      type: [String],
      default: [],
    },

    educationPath: {
      type: [String],
      default: [],
    },

    relatedCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],

    salaryRange: {
      type: String,
      default: "",
    },

    demand: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    image: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Career = mongoose.model("Career", careerSchema);

export default Career;
