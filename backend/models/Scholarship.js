import mongoose from "mongoose";

const scholarshipSchema = new mongoose.Schema(
  {
    // 1. Scholarship Name
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // 2. Scholarship Provider
    provider: {
      type: String,
      required: true,
      trim: true,
    },

    // 3. Scholarship Type
    category: {
      type: String,
      enum: [
        "Government",
        "University",
        "International",
        "Other",
       
      ],
      required: true,
    },

    // 4. Country
    country: {
      type: String,
      required: true,
    },

    // 5. Scholarship Description
    description: {
      type: String,
      default: "",
    },

    // 6. Education Level
    educationLevel: {
      type: [String],
      enum: ["O/L", "A/L"],
      default: [],
    },

    // 7. Eligibility Requirements
    eligibility: {
      type: [String],
      default: [],
    },

    // 8. Scholarship Amount
    amount: {
      type: String,
      default: "",
    },

    // 9. Benefits
    benefits: {
      type: [String],
      default: [],
    },

    // 10. Application Deadline
    deadline: {
      type: Date,
      default: null,
    },

    // 11. Application Link
    applicationUrl: {
      type: String,
      default: "",
    },

    // 12. Scholarship Image
    image: {
      type: String,
      default: "",
    },

    // 13. Scholarship Status
    status: {
      type: String,
      enum: ["Open", "Closed", "Upcoming"],
      default: "Open",
    },

    // 14. Active Status
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Scholarship = mongoose.model(
  "Scholarship",
  scholarshipSchema
);

export default Scholarship;