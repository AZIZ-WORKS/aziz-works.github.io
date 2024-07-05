const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');

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

module.exports = router;
