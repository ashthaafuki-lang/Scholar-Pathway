
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    // 1. Course Name
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // 2. University 
    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
      required: true,
    },

    // 3. Course Category
    category: {
      type: String,
      enum: [
        "Degree",
        "Diploma",
        "Higher Diploma",
        "Certificate",
        "Professional Course",
      ],
      required: true,
    },

    // 4. Course Field
    field: {
      type: String,
      required: true,
    },

    // 5. Course Description
    description: {
      type: String,
      default: "",
    },

    // 6. Course Duration
    duration: {
      type: String,
      default: "",
    },

    // 7. Course Fee
    fee: {
      type: Number,
      default: 0,
      min: 0,
    },

    // 8. Entry Requirements
    entryRequirements: {
      type: [String],
      default: [],
    },

    // 9. Study Mode
    studyMode: {
      type: String,
      enum: ["Full-time", "Part-time", "Online", "Hybrid"],
      default: "Full-time",
    },

    // 10. Course Image
    courseImage: {
      type: String,
      default: "",
    },

    // 11. Application Link
    applicationUrl: {
      type: String,
      default: "",
    },

    // 12. Course Status
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
