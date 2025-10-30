import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { mainRouter } from "./routes/index.js"
import { seedData } from "./test&seed/seed.js";

dotenv.config();

export const app = express();
const PORT = process.env.PORT || 5000;
// CORS configuration
const defaultAllowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://booking-platform-eight.vercel.app",
];

// Allow overriding via env (comma-separated)
const envOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const allowedOrigins = envOrigins.length ? envOrigins : defaultAllowedOrigins;

const corsOptions = {
  origin(origin, callback) {
    // Allow non-browser requests (like curl, health checks) with no origin
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Cache-Control",
    "Pragma",
    "X-Requested-With",
  ],
  optionsSuccessStatus: 204,
};

// Middleware
app.use(cors(corsOptions));
// Explicitly handle preflight for all routes
app.options("*", cors(corsOptions));
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// API Routes
app.use("/api",mainRouter);

// Seed Data
app.post("/api/seed",seedData);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
