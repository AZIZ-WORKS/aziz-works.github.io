const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
const Registration = require("./models/Registration"); // Adjust the path as needed
const rigRoutes = require('./routes/rigs'); // Adjust the path as needed

dotenv.config();

// Initialize the app
const app = express();
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGODB_URI;

// Middleware setup
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use('/api/rigs', rigRoutes);

// MongoDB connection setup
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    cb(null, `${Date.now()}${fileExt}`);
  },
});

const upload = multer({ storage });

// Route for handling registrations with file upload
app.post("/api/registrations", upload.single("photo"), async (req, res) => {
  const { name, gender, phone, email, firstTime, raceType } = req.body;
  const photo = req.file ? req.file.filename : null;

  try {
    const registration = new Registration({
      name,
      gender,
      phone,
      email,
      firstTime,
      photo,
      raceType,
    });

    await registration.save();
    res.status(201).json({
      message: "Registration successful",
      registration,
    });
  } catch (err) {
    console.error("Error saving registration", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch all registrations
app.get("/api/registrations", async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.json(registrations);
  } catch (err) {
    console.error("Error fetching registrations", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch a specific registration by ID
app.get("/api/registrations/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const registration = await Registration.findById(id);
    if (!registration) {
      return res.status(404).json({ error: "Registration not found" });
    }
    res.json(registration);
  } catch (err) {
    console.error("Error fetching registration", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch a photo for a specific registration by ID
app.get("/api/registrations/:id/photo", async (req, res) => {
  const { id } = req.params;
  try {
    const registration = await Registration.findById(id).select("photo");

    if (!registration) {
      return res.status(404).json({ error: "Registration not found" });
    }
    if (!registration.photo) {
      return res.status(404).json({ error: "Photo not found" });
    }
    res.sendFile(path.resolve(`uploads/${registration.photo}`));
  } catch (err) {
    console.error("Error fetching registration", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Queue management
let queue = [];

// Get the queue
app.get("/api/queue", (req, res) => {
  res.json(queue);
});

// Add a registration to the queue
app.post("/api/queue", (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "Registration ID is required" });
  }

  queue.push({ userId });
  res.status(201).json({ message: "Added to queue", userId });
});

// Remove a registration from the queue
app.delete("/api/queue/:userId", (req, res) => {
  const { userId } = req.params;
  queue = queue.filter(user => user.userId !== userId);
  res.status(200).json({ message: "Removed from queue", userId });
});

// Rig management
const Rig = require("./models/Rig");

// Get all rigs
app.get("/api/rigs", async (req, res) => {
  try {
    const rigs = await Rig.find().populate("userId");
    res.json(rigs);
  } catch (err) {
    console.error("Error fetching rigs", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Assign a registration to a rig
app.post("/api/assign", async (req, res) => {
  const { userId, rigId } = req.body;

  if (!userId || !rigId) {
    return res.status(400).json({ error: "Registration ID and Rig ID are required" });
  }

  try {
    const rig = await Rig.findById(rigId);
    if (!rig) {
      return res.status(404).json({ error: "Rig not found" });
    }

    if (rig.status === "occupied") {
      return res.status(400).json({ error: "Rig is already occupied" });
    }

    rig.status = "occupied";
    rig.userId = userId;
    await rig.save();

    res.status(200).json({ message: "Registration assigned to rig", userId, rigId });
  } catch (err) {
    console.error("Error assigning registration to rig", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Release a rig
app.post("/api/release/:rigId", async (req, res) => {
  const { rigId } = req.params;

  try {
    const rig = await Rig.findById(rigId);
    if (!rig) {
      return res.status(404).json({ error: "Rig not found" });
    }

    rig.status = "available";
    rig.userId = null;
    await rig.save();

    res.status(200).json({ message: "Rig released", rigId });
  } catch (err) {
    console.error("Error releasing rig", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
