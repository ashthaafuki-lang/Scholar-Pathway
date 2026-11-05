// import express from "express";
// import User from "../models/User.js";
// import { protect } from "../middleware/authMiddleware.js";
// import jwt from "jsonwebtoken";

// const router = express.Router();

// //Register 
// router.post("/register", async (req, res) => {
//   const { name, email, password, role } = req.body;
//   try {
//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "Please fill in all fields" });
//     }

//     // Check if the user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res
//       .status(400)
//       .json({ message: "User already exists" });
//     }

//     const user = await User.create({ name, email, password, role });
//     const token = generateToken(user._id);
//     res.status(201).json({ 
//         id: user._id,
//         username: user.name,
//         email: user.email,
//         token,
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Error registering user", error });
//   }
// });

// //Login
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     if (!email || !password) {  
//       return res
//       .status(400)
//       .json({ message: "Please fill in all fields" });
//     }
//     const user = await User.findOne({ email });

//     if (!user || !(await user.matchPassword(password))) {
//       return res
//       .status(401)
//       .json({ message: "Invalid email or password" });
//     }

//     const token = generateToken(user._id);

//     res.status(200).json({ 
//         id: user._id,
//         username: user.name,
//         email: user.email,
//         token,
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Error logging in", error });
//   }
// });

// //Me
// router.get("/me", protect, async (req, res) => {
//     res.status(200).json(req.user);
// });

// //Generate JWN Token
// const generateToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: "30d"});

// }


// export default router;


import express from "express";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill in all fields",
      });
    }

    // Only student and institution can register publicly
    const selectedRole = role || "student";

    if (!["student", "institution"].includes(selectedRole)) {
      return res.status(400).json({
        message: "Invalid account role",
      });
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      role: selectedRole,
      phone: phone || "",
      district: req.body.district || "",
});

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: "Error registering user",
      error: error.message,
    });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login email:", email);

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    console.log("User found:", !!user);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    const isMatch = await user.matchPassword(password);

    console.log("Password matched:", isMatch);

    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }

    const token = generateToken(user._id, user.role);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Login error:", error.message);

    return res.status(500).json({
      message: "Server login error",
    });
  }
});

// GET LOGGED-IN USER
router.get("/me", protect, async (req, res) => {
  res.status(200).json({
    user: req.user,
  });
});

export default router;
