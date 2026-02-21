import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import userStatusRoutes from "./routes/userStatusRoutes.js";
import UserMealPlanRoutes from "./routes/UserMealPlanRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();
const port = process.env.PORT || 5123;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors()); // allow frontend requests

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/user", userStatusRoutes);
app.use("/api/user", UserMealPlanRoutes);

// Root route for testing backend
app.get("/", (req, res) => {
  res.send("FitMate Backend is running!");
});

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
}

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start Server
app.listen(port, () => console.log(`Server running on port ${port}`));

export default app;
