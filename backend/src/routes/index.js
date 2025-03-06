const express = require('express');
const router = express.Router();

// Import routes
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');

// Apply routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;