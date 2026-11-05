
import mongoose from "mongoose";

const instituteSchema = new mongoose.Schema(
  {
    // 1. Institute Name
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // 2. Institute Type
    type: {
      type: String,
      enum: [
        "Private Institute",
        "VTA",
        "NVQ",
        "IELTS Academy",
        "IT Training Centre",
        "Other",
      ],
      required: true,
    },

    // 3. Location
    address: {
      type: String,
      required: true,
    },

    district: {
      type: String,
      default: "",
    },

    // 4. Contact Details
    phone: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
      lowercase: true,
      trim: true,
    },

    website: {
      type: String,
      default: "",
    },

    // 5. Institute Information
    description: {
      type: String,
      default: "",
    },

    logo: {
      type: String,
      default: "",
    },

    // 6. Courses Offered
    courses: {
      type: [String],
      default: [],
    },

    // 7. Study Mode
    studyMode: {
      type: [String],
      enum: ["Full-time", "Part-time", "Online", "Hybrid"],
      default: [],
    },

    // 8. Verification
    isVerified: {
      type: Boolean,
      default: false,
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

const Institute = mongoose.model("Institute", instituteSchema);

export default Institute;
