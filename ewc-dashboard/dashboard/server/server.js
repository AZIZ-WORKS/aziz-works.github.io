// server.js

require('dotenv').config(); // Load environment variables from .env file
const express = require('express'); // Import Express framework
const mongoose = require('mongoose'); // Import Mongoose for MongoDB interactions
const cors = require('cors'); // Import CORS for Cross-Origin Resource Sharing
const registrationRoutes = require('./routes/registrationRoutes'); // Import the registration routes

const app = express(); // Create an Express application

// Middleware setup
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing

// API Routes
app.use('/api/registrations', registrationRoutes); // Use registrationRoutes for /api/registrations endpoint

// Database connection
const { MONGODB_URI } = process.env; // Get MongoDB URI from environment variables

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true, // Deprecated option
  useUnifiedTopology: true, // Deprecated option
  // `useNewUrlParser` and `useUnifiedTopology` options are ignored, but it's fine to include them for now
})
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Server setup
const PORT = process.env.PORT || 3002; // Use PORT from environment variables or default to 3002

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
