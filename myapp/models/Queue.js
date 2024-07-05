const mongoose = require('mongoose');

const queueSchema = new mongoose.Schema({
  user: { type: String, required: true }, // registration id
  activity: { type: String, required: true }, // activity id
  rig: { type: String, required: true }, // rig id
  startTime: { type: Date, required: true }, // when the activity is scheduled to start
  endTime: { type: Date, required: true }, // when the activity is scheduled to end. Should be calculated automatically based on the activity type
});

const QueueModel = mongoose.model('Queue', queueSchema);

module.exports = QueueModel;
