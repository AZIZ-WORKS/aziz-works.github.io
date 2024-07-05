// ewc-dashboard/dashboard/routes/rigRoutes.js

const express = require('express');
const router = express.Router();
const Rig = require('../models/Rig');

// Get all rigs
router.get('/', async (req, res) => {
  try {
    const rigs = await Rig.find().populate('userId');
    res.json(rigs);
  } catch (err) {
    console.error('Error fetching rigs', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
