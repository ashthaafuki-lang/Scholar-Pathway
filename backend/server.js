import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Scholar Pathway API');
});

// Home 
// app.use("/api/auth/register", authRoutes);

app.use("/api/auth", authRoutes);

// Test API route
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Scholar Pathway API is working!",
  });
});


// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


