// server/server.js
const path = require('path');

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // <-- Import DB connection
require('dotenv').config();

// Connect to Database
connectDB(); // <-- Execute DB connection

const app = express();

// Init Middleware
app.use(cors());
app.use(express.json()); // Allows us to accept JSON data in the body

// Define Routes
app.use('/api/users', require('./routes/userRoutes')); // <-- Use user routes

// Define Routes
app.use('/api/files', require('./routes/fileRoutes')); // <-- ADD THIS LINE

app.use('/api/history', require('./routes/historyRoutes')); 

app.use('/api/admin', require('./routes/adminRoutes'));

app.use('/api/ai', require('./routes/aiRoutes'));

// server/server.js

// ... (all your existing code, middleware, and API routes like app.use('/api/...'))

// ==============================================================
// --- SERVE FRONTEND IN PRODUCTION ---
// This section must be AFTER all your API routes
if (process.env.NODE_ENV === 'production') {
  // Define the path to the built frontend files.
  // This path navigates up one directory from 'server', then into 'client/frontend/dist'.
  const frontendDistPath = path.resolve(__dirname, '../client/frontend/dist');

  // Instruct Express to serve static files from this directory.
  app.use(express.static(frontendDistPath));

  // For any request that doesn't match an API route above,
  // send back the main index.html file from the React app.
  // This is crucial for React Router to work on a live server.
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
}
// --- END ---
// ==============================================================

app.get('/', (req, res) => {
  res.send('Excel Analytics Platform API is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));