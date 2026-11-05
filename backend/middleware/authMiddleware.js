// import User from "../models/User.js";
// import jwt from "jsonwebtoken";

// export const protect = async (req, res, next) => {
//   let token;

//   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//     try {
//         token = req.headers.authorization.split(" ")[1];

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = await User.findById(decoded.id).select("-password");

//     return next();
//   } catch (error) {
//     console.error("Token verification failed:", error.message);
//     return res.status(401).json({ message: "Not authorized, token failed" });
//   }
// }

// };



import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Not authorized. No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Not authorized. Invalid or expired token",
    });
  }
};
