// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     role: {
//       type: String,
//       enum: ["student", "institution", "admin"],
//       default: "student",
//     },
//     phone: {
//       type: String,
//       default: "",
//     },

//     interests: {
//       type: [String],
//       default: [],
//     },

//     profileImage: {
//       type: String,
//       default: "",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// userSchema.pre("save", async function (next) {
//   // Hash the password before saving
//   if (!this.isModified("password")) next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);

//   // Implement password hashing logic here
//   next();
// });

// userSchema.methods.matchPassword = async function (candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// const User = mongoose.model("User", userSchema);

// export default User;



import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "institution", "admin"],
      default: "student",
    },
    phone: {
      type: String,
      default: "",
    },

    district: {
      type: String,
      default: "",
    },

    interests: {
      type: [String],
      default: [],
    },

    profileImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);


userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//password hash
userSchema.methods.matchPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;