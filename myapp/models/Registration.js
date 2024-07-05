// models/registration.js

const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  firstTime: { type: String, required: true },
  photo: { type: String }, // Assuming 'photo' is a URL or file path saved from the frontend
  raceType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
