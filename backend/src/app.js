// backend/src/app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// 1. Security & Request Parsing Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Turn off CSP during development to prevent asset loading blocks
}));
app.use(cors({
  origin: '*', // Allow all origins for testing/development
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(express.json());

// 2. Health & Warmup Route
const db = require('./config/db');
app.get('/api/health', async (req, res, next) => {
  try {
    const dbCheck = await db.query('SELECT NOW()');
    res.json({
      success: true,
      message: 'Node.js Express Server is running healthy.',
      databaseTime: dbCheck.rows[0].now
    });
  } catch (err) {
    next(err);
  }
});

// 3. Register Modular Routes
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

// 3. Serve React Production Build (SPA Static server fallback)
const frontendDistPath = path.join(__dirname, '../../frontend/dist');
app.use(express.static(frontendDistPath));

// 4. Default JSON fallback route
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Ascope Tech Enterprise Node.js API Service.'
  });
});

// 5. Catch-all routing fallback for client React SPA routes
app.get('*', (req, res, next) => {
  // If the request is for an API route that wasn't matched, return a 404 error
  if (req.originalUrl.startsWith('/api')) {
    const err = new Error('API Endpoint Not Found');
    err.statusCode = 404;
    return next(err);
  }
  // Otherwise, serve the compiled React SPA
  res.sendFile(path.join(frontendDistPath, 'index.html'), (err) => {
    if (err) {
      // If the index.html is missing (e.g., frontend has not been compiled), serve a greeting
      res.json({
        success: true,
        message: 'Welcome to Ascope Tech. Server is running. (Compile the frontend with "npm run build" to serve the SPA)'
      });
    }
  });
});

// 6. Mount Centralized Error Handler Middleware
app.use(errorHandler);

module.exports = app;
