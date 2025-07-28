// index.js
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import tourRoute from "./routers/tour.js";
import userRoute from "./routers/user.js";
import authRoute from "./routers/auth.js";
import bookingRoute from "./routers/booking.js"; // ✅ Make sure this path is correct

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: "https://travel-website-85xf.onrender.com",
  credentials: true,
};

mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.log("MongoDB connection failed:", err);
  }
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Debug logger
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

// Routes
app.use("/tours", tourRoute);
app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/book", bookingRoute);

// 404 fallback handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API route not found: ${req.originalUrl}`,
  });
});

// Start server
app.listen(port,() => {
  connect();
  console.log(`Server running on port ${port}`);
});
