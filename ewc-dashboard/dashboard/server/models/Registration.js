// models/Registration.js

const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  firstTime: { type: Boolean, default: false },
  photo: { type: String },
  raceType: { type: String, enum: ['Daily Race', 'Practice'], required: true },
  createdAt: { type: Date, default: Date.now }
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
