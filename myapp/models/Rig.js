const mongoose = require('mongoose');

const rigSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['Daily Race', 'Practice'], default: 'Daily Race' },
  status: { type: String, enum: ['available', 'assigned'], default: 'available' },
});

const Rig = mongoose.model('Rig', rigSchema);

module.exports = Rig;
