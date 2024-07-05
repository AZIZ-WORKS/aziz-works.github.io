// ewc-dashboard/dashboard/routes/assignRoutes.js

const express = require('express');
const router = express.Router();
const Rig = require('../models/Rig');

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
