const express = require('express');
const router = express.Router();
const Rig = require('../models/Rig');
const Registration = require('../models/Registration');  // Ensure the correct model name is used here

// Get all rigs
router.get('/', async (req, res) => {
  try {
    const rigs = await Rig.find();
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
    return res.status(400).json({ error: 'User ID and Rig ID are required' });
  }

  try {
    // Check if the registration exists
    const registration = await Registration.findById(userId);
    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    // Find the rig
    const rig = await Rig.findById(rigId);
    if (!rig) {
      return res.status(404).json({ error: 'Rig not found' });
    }

    // Check if the rig is available
    if (rig.status === 'occupied') {
      return res.status(400).json({ error: 'Rig is already occupied' });
    }

    // Update the rig status and assign the user
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

    if (rig.status !== 'occupied') {
      return res.status(400).json({ error: 'Rig is not occupied' });
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

// Initialize rigs
router.post('/initialize-rigs', async (req, res) => {
  const { rigCount, rigType } = req.body;

  if (!rigCount || !rigType) {
    return res.status(400).json({ error: 'Rig count and type are required' });
  }

  try {
    // Delete existing rigs
    await Rig.deleteMany({});

    // Create new rigs
    const rigs = [];
    for (let i = 0; i < rigCount; i++) {
      rigs.push({
        name: `Rig ${i + 1}`,
        type: rigType,
        status: 'available',
      });
    }

    await Rig.insertMany(rigs);
    res.status(200).json({ message: 'Rigs initialized', rigs });
  } catch (err) {
    console.error('Error initializing rigs', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update the type of a rig
router.post('/update-type', async (req, res) => {
  const { rigId, newType } = req.body;

  if (!rigId || !newType) {
    return res.status(400).json({ error: 'Rig ID and new type are required' });
  }

  try {
    const rig = await Rig.findById(rigId);
    if (!rig) {
      return res.status(404).json({ error: 'Rig not found' });
    }

    rig.type = newType;
    await rig.save();

    res.status(200).json({ message: 'Rig type updated', rig });
  } catch (err) {
    console.error('Error updating rig type', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a rig by ID
router.delete('/:rigId', async (req, res) => {
  const { rigId } = req.params;

  try {
    const rig = await Rig.findById(rigId);
    if (!rig) {
      return res.status(404).json({ error: 'Rig not found' });
    }

    if (rig.status === 'occupied') {
      return res.status(400).json({ error: 'Cannot delete an occupied rig' });
    }

    await Rig.findByIdAndDelete(rigId);
    res.status(200).json({ message: 'Rig deleted successfully' });
  } catch (err) {
    console.error('Error deleting rig', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
