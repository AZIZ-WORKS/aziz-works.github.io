// ewc-dashboard/dashboard/server/routes/rigs.js
const express = require('express');
const router = express.Router();
const Rig = require('../models/Rig');

// Create
router.post('/', async (req, res) => {
  try {
    const rig = new Rig(req.body);
    await rig.save();
    res.status(201).json(rig);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read
router.get('/', async (req, res) => {
  try {
    const rigs = await Rig.find();
    res.status(200).json(rigs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const rig = await Rig.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!rig) return res.status(404).json({ message: 'Rig not found' });
    res.status(200).json(rig);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const rig = await Rig.findByIdAndDelete(req.params.id);
    if (!rig) return res.status(404).json({ message: 'Rig not found' });
    res.status(200).json({ message: 'Rig deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
