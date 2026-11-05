
import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    // 1. Student who submitted the application
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 2. Application Type
    applicationType: {
      type: String,
      enum: ["Course", "Scholarship"],
      required: true,
    },

    // 3. Course Reference
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      default: null,
    },

    // 4. Scholarship Reference
    scholarship: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scholarship",
      default: null,
    },

    // 5. Application Status
    status: {
      type: String,
      enum: [
        "Pending",
        "Under Review",
        "Accepted",
        "Rejected",
        "Withdrawn",
      ],
      default: "Pending",
    },

    // 6. Application Date
    appliedAt: {
      type: Date,
      default: Date.now,
    },

    // 7. Student Message
    message: {
      type: String,
      default: "",
    },

    // 8. Admin Remarks
    adminRemarks: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model(
  "Application",
  applicationSchema
);

export default Application;
