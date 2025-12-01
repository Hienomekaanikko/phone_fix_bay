import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Simple CORS - allow all origins
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`--> ${req.method} ${req.originalUrl}  Origin: ${req.headers.origin || "-"}`);
  next();
});

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Contribution Schema
const contributionSchema = new mongoose.Schema({
  phoneModel: String,
  issue: String,
  solution: String,
  createdAt: { type: Date, default: Date.now }
});

const Contribution = mongoose.model("Contribution", contributionSchema);

// POST endpoint to save contributions
app.post("/api/contributions", async (req, res) => {
  try {
    console.log("📨 Request received:", req.body);
    console.log("🔌 MongoDB connection state:", mongoose.connection.readyState); // 1 = connected
    
    const { phoneModel, issue, solution } = req.body;
    
    if (!phoneModel || !issue || !solution) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    
    const newContribution = new Contribution({ phoneModel, issue, solution });
    await newContribution.save();
    res.status(201).json({ message: "Contribution saved!" });
  } catch (err) {
    console.error("❌ Full Error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));