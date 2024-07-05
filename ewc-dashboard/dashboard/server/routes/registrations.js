// ewc-dashboard/dashboard/server/routes/registrations.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Registration = require('../models/Registration');
const Rig = require('../models/Rig');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Destination folder for uploads
  },
  filename: (req, file, cb) => {
    const { name } = req.body; // Extract the name field from request body
    const fileExt = path.extname(file.originalname); // Get the file extension
    cb(null, `${name}-${Date.now()}${fileExt}`); // Custom filename using user's name
  }
});

// Multer upload instance
const upload = multer({ storage: storage });

// Add a new registration with photo upload
router.post('/', upload.single('photo'), async (req, res) => {
  const { name, gender, phone, email, firstTime, raceType } = req.body;
  const photo = req.file ? req.file.filename : null; // Filename of uploaded photo

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

    await registration.save(); // Save data to MongoDB
    res.status(201).json({ message: 'Registration successful', registration });
  } catch (err) {
    console.error('Error saving registration', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all registrations
router.get('/', async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.json(registrations);
  } catch (err) {
    console.error('Error fetching registrations', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a specific registration by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const registration = await Registration.findById(id);
    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    res.json(registration);
  } catch (err) {
    console.error('Error fetching registration', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a photo for a specific registration by ID
router.get('/:id/photo', async (req, res) => {
  const { id } = req.params;
  try {
    const registration = await Registration.findById(id).select('photo');

    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    if (!registration.photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }
    res.sendFile(path.resolve(`uploads/${registration.photo}`));
  } catch (err) {
    console.error('Error fetching registration', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Queue management
let queue = [];

// Get the queue
router.get('/queue', (req, res) => {
  res.json(queue);
});

// Add a registration to the queue
router.post('/queue', (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'Registration ID is required' });
  }

  queue.push({ userId });
  res.status(201).json({ message: 'Added to queue', userId });
});

// Remove a registration from the queue
router.delete('/queue/:userId', (req, res) => {
  const { userId } = req.params;
  queue = queue.filter(user => user.userId !== userId);
  res.status(200).json({ message: 'Removed from queue', userId });
});

// Rig management

// Get all rigs
router.get('/rigs', async (req, res) => {
  try {
    const rigs = await Rig.find().populate('userId');
    res.json(rigs);
  } catch (err) {
    console.error('Error fetching rigs', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Assign a registration to a rig
router.post('/assign', async (req, res) => {
  const { userId, rigId } = req.body;

  if (!userId || !rigId) {
    return res.status(400).json({ error: 'Registration ID and Rig ID are required' });
  }

  try {
    const rig = await Rig.findById(rigId);
    if (!rig) {
      return res.status(404).json({ error: 'Rig not found' });
    }

    if (rig.status === 'occupied') {
      return res.status(400).json({ error: 'Rig is already occupied' });
    }

    rig.status = 'occupied';
    rig.userId = userId;
    await rig.save();

    res.status(200).json({ message: 'Registration assigned to rig', userId, rigId });
  } catch (err) {
    console.error('Error assigning registration to rig', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Release a rig
router.post('/release/:rigId', async (req, res) => {
  const { rigId } = req.params;

  try {
    const rig = await Rig.findById(rigId);
    if (!rig) {
      return res.status(404).json({ error: 'Rig not found' });
    }

    rig.status = 'available';
    rig.userId = null;
    await rig.save();

    res.status(200).json({ message: 'Rig released', rigId });
  } catch (err) {
    console.error('Error releasing rig', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
