// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Serve static frontend files
app.use(express.static(path.join(__dirname, "public")));

// ✅ API routes
app.use("/api/tasks", taskRoutes);

// ✅ Fallback route - serve index.html for any unmatched route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
