// registrationRoutes.js

const express = require('express');
const mongoose = require('mongoose');  // Import mongoose to use ObjectId
const Registration = require('../models/Registration'); // Assuming you have a Registration model

const router = express.Router();

// Fetch all registrations
router.get('/', async (req, res) => {
  try {
    const registrations = await Registration.find({});
    res.json(registrations);
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Fetch a specific registration by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  // Validate the ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send('Invalid registration ID');
  }

  try {
    const registration = await Registration.findById(id);
    if (!registration) {
      return res.status(404).send('Registration not found');
    }
    res.json(registration);
  } catch (error) {
    console.error('Error fetching registration:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Create a new registration
router.post('/', async (req, res) => {
  try {
    const { name, gender, phone, email, firstTime, photo, raceType } = req.body;
    const newRegistration = new Registration({
      name,
      gender,
      phone,
      email,
      firstTime,
      photo,
      raceType
    });
    await newRegistration.save();
    res.status(201).json(newRegistration);
  } catch (error) {
    console.error('Error creating registration:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Update a registration by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  // Validate the ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send('Invalid registration ID');
  }

  try {
    const { name, gender, phone, email, firstTime, photo, raceType } = req.body;
    const updatedRegistration = await Registration.findByIdAndUpdate(
      id,
      { name, gender, phone, email, firstTime, photo, raceType },
      { new: true } // Return the updated document
    );
    if (!updatedRegistration) {
      return res.status(404).send('Registration not found');
    }
    res.json(updatedRegistration);
  } catch (error) {
    console.error('Error updating registration:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a registration by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  // Validate the ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send('Invalid registration ID');
  }

  try {
    const deletedRegistration = await Registration.findByIdAndDelete(id);
    if (!deletedRegistration) {
      return res.status(404).send('Registration not found');
    }
    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting registration:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
