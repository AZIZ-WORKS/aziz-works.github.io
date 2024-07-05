// ewc-dashboard/dashboard/routes/queueRoutes.js

const express = require('express');
const router = express.Router();

// Queue management
let queue = [];

// Get the queue
router.get('/', (req, res) => {
  res.json(queue);
});

// Add a registration to the queue
router.post('/', (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'Registration ID is required' });
  }

  queue.push({ userId });
  res.status(201).json({ message: 'Added to queue', userId });
});

// Remove a registration from the queue
router.delete('/:userId', (req, res) => {
  const { userId } = req.params;
  queue = queue.filter(user => user.userId !== userId);
  res.status(200).json({ message: 'Removed from queue', userId });
});

module.exports = router;
