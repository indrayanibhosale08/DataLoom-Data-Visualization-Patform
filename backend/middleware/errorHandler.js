// backend/middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
  // Log the error for debugging purposes (you can use a more robust logger)
  console.error(err.stack);

  // Set a default status code if one isn't already set
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    message: err.message,
    // Show the stack trace in development mode for easier debugging
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { errorHandler };
