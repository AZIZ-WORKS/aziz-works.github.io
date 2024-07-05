// ewc-dashboard/dashboard/models/Rig.js

const mongoose = require('mongoose');

const rigSchema = new mongoose.Schema({
  type: { type: String, enum: ['practice', 'daily'], required: true },
  status: { type: String, enum: ['available', 'occupied'], default: 'available' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Registration' },
});

const Rig = mongoose.model('Rig', rigSchema);

module.exports = Rig;
