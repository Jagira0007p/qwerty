const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection - REMOVED deprecated options
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// Schemas
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String, default: "" },
  budget: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", contactSchema);
const Project = mongoose.model("Project", projectSchema);

// Routes
app.get("/", (req, res) => {
  res.send("Qwerty Dream Tech Solution API is running 🚀");
});

// Contact form
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const contact = new Contact({ name, email, message });
    await contact.save();

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Contact error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Project request
app.post("/api/project-request", async (req, res) => {
  try {
    const { name, company, budget, description } = req.body;

    if (!name || !budget || !description) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const project = new Project({ name, company, budget, description });
    await project.save();

    res.status(201).json({ message: "Project request submitted successfully" });
  } catch (error) {
    console.error("Project request error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Admin middleware
const adminAuth = (req, res, next) => {
  const adminPassword = req.headers["admin-password"];

  if (!adminPassword || adminPassword !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
};

// Admin routes
app.get("/api/admin/messages", adminAuth, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error("Admin messages error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/admin/projects", adminAuth, async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error("Admin projects error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📍 Local: http://localhost:${PORT}`);
});
