const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
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

// --- AUTHENTICATION ROUTES ---

// Login Route (Missing in your original code)
app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) {
    // In a real app, use JWT. Here we return the password as a simple token.
    res.json({ success: true, token: password });
  } else {
    res.status(401).json({ success: false, message: "Invalid password" });
  }
});

// Updated Admin middleware to check Bearer Token
const adminAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Get token from "Bearer <token>"

  if (!token || token !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

// --- PUBLIC ROUTES ---

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/project-request", async (req, res) => {
  try {
    const { name, company, budget, description } = req.body;
    const project = new Project({ name, company, budget, description });
    await project.save();
    res.status(201).json({ message: "Project request submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// --- ADMIN ROUTES (Protected) ---

app.get("/api/admin/messages", adminAuth, async (req, res) => {
  const messages = await Contact.find().sort({ createdAt: -1 });
  res.json(messages);
});

app.get("/api/admin/projects", adminAuth, async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
});

// Delete Routes (Added to match your frontend functionality)
app.delete("/api/admin/messages/:id", adminAuth, async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.delete("/api/admin/projects/:id", adminAuth, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
