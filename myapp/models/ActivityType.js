const mongoose = require('mongoose');

const activityTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  usesRigs: { type: Boolean, required: true, default: false },
  duration: {type: Number, required: true}, // how long the activity takes in minutes, used for queueing
});

const ActivityTypeModel = mongoose.model('ActivityType', activityTypeSchema);

module.exports = ActivityTypeModel;
